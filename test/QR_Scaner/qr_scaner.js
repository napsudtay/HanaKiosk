const video = document.getElementById('video_area');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const closeButton = document.getElementById('close-button');

// Request access to the user's camera
navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
  video.srcObject = stream;
  video.play();
  closeButton.style.display = 'block'; // show the close button
}).catch((error) => {
  console.error('Could not access the camera: ', error);
});

// Stop the webcam stream and hide the close button
function stopWebcam() {
  video.srcObject.getTracks().forEach(track => track.stop());
  closeButton.style.display = 'none';
}

// Detect QR codes in each video frame
function tick() {
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const code = jsQR(imageData.data, imageData.width, imageData.height, {
    inversionAttempts: 'dontInvert',
  });
  if (code) {
    // QR code detected
    console.log('QR code detected: ', code.data);
    // do something with the code data, e.g. redirect to a URL
    // window.location.href = code.data;
    stopWebcam();
  }
  requestAnimationFrame(tick);
}

// Start scanning for QR codes when the camera is ready
video.addEventListener('playing', () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  tick();
});

// Add a click event listener to the close button
closeButton.addEventListener('click', stopWebcam);

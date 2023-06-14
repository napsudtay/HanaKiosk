let toggle = document.querySelector(".toggle");
let menu = document.querySelector(".menu");
let popupAct = document.getElementById("btnAction");

let ModalFillPhone = document.getElementById("modal-fillPhone");
let FormFillPhoneNumber = document.getElementById("formFillPhoneNumber");

let ModalLogin = document.getElementById("modal-login");
let ModalLoginShowDateTime = document.getElementById("show-date-time");
let ModalWarningWindows = document.getElementById("modal-warningwindows");
let ModalWarningWindowsContent = document.getElementById(
  "modal-warningwindows-content"
);

let ModalConfirmBooking = document.getElementById("modal-confirmbooking");
let ModalConfirmBookingContent = document.getElementById(
  "modal-confirmbooking-content"
);

let ModalScanCard = document.getElementById("modal-scancard");
let ModalScanCardTitle = document.getElementById("modal-scancard-title");
let ModalScancardHeaderWaitingCard = document.getElementById(
  "modal-scancard-header-waitingcard"
);
let ModalScancardHeaderComputing = document.getElementById(
  "modal-scancard-header-computing"
);

let ModalScanFace = document.getElementById("modal-scanface");
let ModalScanFaceTakePhoto = document.getElementById("take-photo");
let ModalScanFaceTakePhotoCountdown = document.getElementById(
  "take-photo-countdown"
);

let ModalScanfaceProcessing = document.getElementById(
  "modal-scanface-processing"
);
let ModalWarningWindowsScanface = document.getElementById(
  "modal-warningwindows-scanface"
);
let ModalWarningWindowsScanfaceContent = document.getElementById(
  "modal-warningwindows-scanface-content"
);

let ModalScanfaceSuccessfu = document.getElementById(
  "modal-scanface-successfu"
);
let ModalScanfaceSuccessfulContentToggle = document.getElementById(
  "modal-scanface-successful-content"
);
let ToggleSymbolScanfaceSuccessful = document.getElementById(
  "togglesymbol-scanface-successful"
);
let ModalScanfaceSuccessfulSendRoomNumber = document.getElementById(
  "modal-scanface-successful-sendroomnumber"
);
let ScanfaceSuccessfulContent = document.getElementById(
  "scanface-successful-content"
);
let ModalWarningIdcard = document.getElementById("modal-warning-idcard");
let ModalWarningRoomdetails = document.getElementById(
  "modal-warning-roomdetails"
);

let ModalCheckOut = document.getElementById("modal-checkout");
let ModalCheckOutShowDateTime = document.getElementById(
  "show-date-time-checkout"
);
let ModalCheckOutSuccess = document.getElementById("modal-checkout-success");
let ModalCheckOutSuccessContent = document.getElementById(
  "modal-checkout-success-content"
);
let NumCoundCheckOut = document.getElementById("numCoundCheckOut");

let formHomeFindBookingNumber = document.getElementById(
  "formHomeFindBookingNumber"
);
let formCheckOutFindBookingNumber = document.getElementById(
  "formCheckOutFindBookingNumber"
);

















let ContentLoading = document.getElementById("content-loading");
let CheckTimeout = document.getElementById("check-timeout");
let CheckTimeoutContent = document.getElementById("check-timeout-content");

let bookingNumber = "";
let IdCustomer = "";
let qantityRoom = "";
let ci = "";
let co = "";
let checkTimeOutAndCancleReadCard = true;

toggle.onclick = function () {
  menu.classList.toggle("active");
  popupAct.classList.remove("active");
};

function popupAction() {
  popupAct.classList.toggle("active");
}

function PopupCheckIn() {
  ModalLogin.classList.add("show-modal");
  menu.classList.remove("active"); //เก็บเมนูหมุนหลัก
  clearInterval(coundCheckTimeoutActive_goToScreenSaver);
  ShowDateTime();
  SetTimeOutAll(); //เรียกฟังก์ชั่นตั้งการหมดเวลาทำรายการ
  console.log("PopupCheckIn > triger_checkMail");
  
  triger_checkMail();
}






// show menu after 4s
setTimeout(function() {
  mainMenu.style.visibility = "visible";
}, 4000);







const url_api_checkMail = "https://script.google.com/macros/s/AKfycbzz43StYpJHe8ZsbsYnOZXiFvx2oVUlSQOasfMpAAHUNXUxxGp9OxSiFgLYVryjmzM/exec";

function triger_checkMail() {
  console.log("triger_checkMail");

  const requestOptions = {
    "content-type": "application/json",
    method: "GET",
    cache: "no-cache",
  };

  let getValue = fetch(url_api_checkMail, requestOptions)
    .then((response) => response.text())
    .then((data) => {
      // console.log("post = " , data);
      return data;
    });
  return getValue;
}

function ClosePopupCheckIn() {
  CloseAllPopup(); //เรียกใช้ฟังก์ชั่นปิดทุกหน้าต่าง
  formHomeFindBookingNumber.reset(); //clear value from input
}

function PopupWarningWindows() {
  ModalWarningWindows.classList.add("show-modal");
}
function ClosePopupWarningWindows() {
  formHomeFindBookingNumber.reset(); //clear value from input
  ModalWarningWindows.classList.remove("show-modal");
}

function PopupConfirmBooking() {
  formHomeFindBookingNumber.reset(); //clear value from input
  ModalScanCardTitle.innerText = `กรุณาเสียบบัตรประชาชน`; //เปลี่ยนข้อความสถานะการอ่านบัตร
  ModalScancardHeaderWaitingCard.classList.add("active"); //เปิดสัญลักษณ์รอเสียบบัตร
  ModalScancardHeaderComputing.classList.remove("active"); //ปิดสัญลักษณ์ประมวลผล
  ModalLogin.classList.remove("show-modal");
  ModalConfirmBooking.classList.add("show-modal");
}
function ClosePopupConfirmBooking() {
  formHomeFindBookingNumber.reset(); //clear value from input
  ModalConfirmBooking.classList.remove("show-modal");
  ModalLogin.classList.add("show-modal");
}

function PopupScanCard() {
  ModalConfirmBooking.classList.remove("show-modal");
  ModalScanCard.classList.add("show-modal");
  ReadSmartCard();
}

function ClosePopupScanCard() {
  ModalScanCard.classList.remove("show-modal");
  ModalLogin.classList.add("show-modal");
  checkTimeOutAndCancleReadCard = false;
}

function PopupScanFace() {
  ModalScanCard.classList.remove("show-modal");
  ModalScanFace.classList.add("show-modal");
  // startWebcam(); //เปิดกล้อง
  BTNTakePhoto(); //เริ่มนับถอยหลังถ่ายรูป
}
function PopupScanFaceTakePhoto() {
  ModalScanFace.classList.add("take-photo");
}
function ClosePopupScanFace() {
  ModalScanFace.classList.remove("show-modal");
  ModalConfirmBooking.classList.add("show-modal");
}
function PopupTakePhoto() {
  ModalWarningWindowsScanface.classList.remove("show-modal");
  ModalScanFace.classList.add("show-modal");
  // startWebcam(); //เปิดกล้อง
  BTNTakePhoto(); //เริ่มนับถอยหลังถ่ายรูป
}
function ClosePopupWindows() {
  ModalWarningWindowsScanface.classList.remove("show-modal");
  ModalLogin.classList.add("show-modal");
}
function SuccessfulToggleBTN() {
  ModalScanfaceSuccessfulContentToggle.classList.toggle("active");
  ToggleSymbolScanfaceSuccessful.classList.toggle("active");
}
function ClosePopupWarningIDcard() {
  ModalWarningIdcard.classList.remove("show-modal");
}
function ClosePopupScanfaceSuccessful() {
  ModalWarningRoomdetails.classList.add("show-modal"); //เรียกหน้าต่างเตือนจำรหัสขึ้นมา
}
function ClosePopupWarningRoomdetails() {
  ModalWarningRoomdetails.classList.remove("show-modal"); //ปิดหน้าต่างเตือนจำรหัสขึ้นมา
}

function PopupCheckOut() {

  formCheckOutFindBookingNumber.reset(); //clear value from input
  ModalCheckOut.classList.add("show-modal");
  menu.classList.remove("active"); //เก็บเมนูหมุนหลัก
  clearInterval(coundCheckTimeoutActive_goToScreenSaver);
  ShowDateTime();
  SetTimeOutAll(); //เรียกฟังก์ชั่นตั้งการหมดเวลาทำรายการ
}

function ClosePopupCheckOut() {
  // ModalCheckOut.classList.remove('show-modal');
  CloseAllPopup(); //เรียกใช้ฟังก์ชั่นปิดทุกหน้าต่าง
  formCheckOutFindBookingNumber.reset(); //clear value from input
}

function ClosePopupCheckoutSuccess() {
  // ModalCheckOutSuccess.classList.remove('show-modal');
  CloseAllPopup(); //เรียกใช้ฟังก์ชั่นปิดทุกหน้าต่าง
  formCheckOutFindBookingNumber.reset(); //clear value from input
}

function CloseAllPopup() {
  console.log('CloseAllPopup()');
  clearInterval(coundCheckTimeoutActive); //clear การตั้งวังวนเวลา
  // coundCheckTimeout = 600; //คืนค่าเวลาให้หน้าต่างปิดอัตโนมัติ
  CheckTimeoutContent.innerText = `กรุณาทำรายการภายใน ${coundCheckTimeout} วินาที`; //อัพเดทค่าของตัวหนังสือที่จะนับถอยหลัง
  CheckTimeout.classList.remove("show-modal"); //ปิดตัวหนังสือนับเวลา
  ModalLogin.classList.remove("show-modal");
  ModalWarningWindows.classList.remove("show-modal");
  ModalConfirmBooking.classList.remove("show-modal");
  ModalScanCard.classList.remove("show-modal");
  ModalScancardHeaderWaitingCard.classList.remove("active");
  ModalScancardHeaderComputing.classList.remove("active");
  ModalScanFace.classList.remove("take-photo");
  ModalScanFace.classList.remove("show-modal");
  ModalWarningWindowsScanface.classList.remove("show-modal");
  ModalWarningIdcard.classList.remove("show-modal");
  ModalScanfaceSuccessfu.classList.remove("show-modal");
  ModalScanfaceSuccessfulContentToggle.classList.remove("active");
  ModalWarningRoomdetails.classList.remove("show-modal");
  ToggleSymbolScanfaceSuccessful.classList.remove("active");
  ModalCheckOut.classList.remove("show-modal");
  ModalCheckOutSuccess.classList.remove("show-modal");
  ModalFillPhone.classList.remove("show-modal");


  document.getElementById("modal-select-unite").classList.remove("show-modal");
  document.getElementById("modal-reservation-calenda").classList.remove("show-modal");
  document.getElementById("modal-proof-reservation").classList.remove("show-modal");
  document.getElementById("modal-fillPhone-Reservation").classList.remove("show-modal");
  document.getElementById("modal-fillName-Reservation-Keyboard").classList.remove("show-modal");
  document.getElementById("modal-show-qrcode-pay").classList.remove("show-modal");
  document.getElementById("modal-reservation-successful").classList.remove("show-modal");


  SetTimeToScreenSaver(60);//ตั้งค่าเวลาให้ ไปหน้าพักหน้าจอ

}


var onStart = true;
if(onStart){
  onStart = false;
  console.log('onStart');
  SetTimeToScreenSaver(60);//ตั้งค่าเวลาให้ ไปหน้าพักหน้าจอ
}


// clearInterval(coundCheckTimeoutActive_goToScreenSaver);
var coundCheckTimeoutActive_goToScreenSaver;
function SetTimeToScreenSaver(coundCheckTimeout_goToScreenSaver) {
  console.log('SetTimeToScreenSaver');
  
  coundCheckTimeoutActive_goToScreenSaver = window.setInterval(function () {
    coundCheckTimeout_goToScreenSaver -= 1;
    console.log('SetTimeToScreenSaver = ',coundCheckTimeout_goToScreenSaver);

    if (coundCheckTimeout_goToScreenSaver <= 0) {
      window.location.href = 'http://127.0.0.1:3001/screen_saver.html';
    }

  }, 1000);
}






var coundCheckTimeoutActive;
var coundCheckTimeout = 600; //ตั้งค่าเวลาให้หน้าต่างปิดอัตโนมัติ
function SetTimeOutAll() {
  CheckTimeout.classList.add("show-modal");

  coundCheckTimeoutActive = window.setInterval(function () {
    coundCheckTimeout -= 1;
    CheckTimeoutContent.innerText = `กรุณาทำรายการภายใน ${coundCheckTimeout} วินาที`;
    // console.log(coundCheckTimeout);
    if (coundCheckTimeout <= 0) {
      console.log("time out....");
      ContentLoading.classList.remove("show-modal"); //ปิดหน้าต่างโหลดเนื้อหา
      CloseAllPopup(); //เรียกใช้ฟังก์ชั่นปิดทุกหน้าต่าง
    }
  }, 1000);
}

var coundCheckOutActive;
var coundCheckOut = 10; //ตั้งค่าเวลาให้หน้าต่างปิดอัตโนมัติ
function PopupConfirmBookingCheckOut() {
  formCheckOutFindBookingNumber.reset(); //clear value from input
  ModalCheckOut.classList.remove("show-modal");
  ModalCheckOutSuccess.classList.add("show-modal");

  coundCheckOutActive = window.setInterval(function () {
    coundCheckOut -= 1;
    // console.log(coundCheckOut);
    NumCoundCheckOut.innerText = `${coundCheckOut}`;

    if (coundCheckOut <= 0) {
      console.log("time out....");
      clearInterval(coundCheckOutActive); //clear การตั้งวังวนเวลา
      coundCheckOut = 10; //คืนค่าเวลาให้หน้าต่างปิดอัตโนมัติ
      ClosePopupCheckoutSuccess();
      NumCoundCheckOut.innerText = `${coundCheckOut}`; //อัพเดทค่าของตัวหนังสือที่จะนับถอยหลัง
    }
  }, 1000);
}

var coundDate = "";
var now = new Date();

function ShowDateTime() {
  coundDate = window.setInterval(function () {
    now = new Date();
    ModalLoginShowDateTime.innerText = `${now}`;
    ModalCheckOutShowDateTime.innerText = `${now}`;
  }, 1000);
}











var token;
let booking_uuid;
let booking_id;
let fullname;
let unit_uuid = []
let roomNumber = [];









let globalReadClipboard = "";
const timer = (ms) => new Promise((res) => setTimeout(res, ms)); // ตั้งขึ้นมาเพื่อใช้ในการ delay




// -------- เขียนค่า clipboard  ---------
function copyToClipboard(mytext) {
  let input = mytext; //document.getElementById('input').value;
  try {
    navigator.clipboard.writeText(input).then((res) => {
      // console.log("wirte = " + input);
    });
    // .catch(err => alert("Copy failed"))
  } catch (e) { }
}


// -------- อ่านค่า clipboard  ---------
async function readClipboard() {
  try {
    const readed = await navigator.clipboard.readText();
    return readed;
    // .catch(err => alert("Failed to read the clipboard: " + err));
  } catch (e) { }
}



















// formCheckOutFindBookingNumber.addEventListener(
//   "submit",
//   update_CheckOut_FindBookingNumber
// );





async function update_CheckOut_FindBookingNumber(e) {


  
  await getToken();
  ContentLoading.classList.add("show-modal"); //เปิดหน้าต่างโหลดเนื้อหา
  // const bookingValCheckOut = e.srcElement[0].value.toLowerCase();
  const bookingValCheckOut = e.toLowerCase();
  audio_next_page.play();

  if (bookingValCheckOut === "") {
    ContentLoading.classList.remove("show-modal"); //ปิดหน้าต่างโหลดเนื้อหา
    ModalWarningWindowsContent.innerText = `กรุณาระบุหมายเลขการจอง เพื่อทำการเช็คเอาท์`;
    PopupWarningWindows();
    audio_error.play();
    
  } else if (bookingValCheckOut === "0") {
    await getSite();
    ContentLoading.classList.remove("show-modal"); //ปิดหน้าต่างโหลดเนื้อหา
    PopupWarningWindows();




  } else if (bookingValCheckOut === "000000") {
    var testSiteName = await getSite();
    ContentLoading.classList.remove("show-modal"); //ปิดหน้าต่างโหลดเนื้อหา
    PopupWarningWindows();
    // location.reload();
    console.log('go to ..');
    window.location.replace("http://127.0.0.1:3001/index_offline.html?#");

  } else {
    var getDataFormCheckOut = await getBooking(bookingValCheckOut);

    if (getDataFormCheckOut === false) {
      console.log("error");
      formCheckOutFindBookingNumber.reset();
      ModalWarningWindowsContent.innerText = `ไม่พบหมายเลขบุ๊คกิ้งนี้\nกรุณาลองอีกครั้งหรือติดต่อพนักงาน`;
      ContentLoading.classList.remove("show-modal"); //ปิดหน้าต่างโหลดเนื้อหา
      PopupWarningWindows();
      audio_error.play();
      return;
    }


    console.log(getDataFormCheckOut);
    booking_uuid = getDataFormCheckOut["booking_uuid"];



    if (getDataFormCheckOut["reservations"] === null) {
      console.log("can not get data");
      formCheckOutFindBookingNumber.reset();
      ModalWarningWindowsContent.innerText = `หมายเลขบุ๊คกิ้งนี้ ได้ทำการยกเลิกไปแล้ว\nกรุณาลองอีกครั้งหรือติดต่อพนักงาน`;
      ContentLoading.classList.remove("show-modal"); //ปิดหน้าต่างโหลดเนื้อหา
      PopupWarningWindows();
      audio_error.play();
      return;
    }




    var getDataFormCheckOut = await api_checkOut(token, site_uuid, booking_uuid);
    console.log('change status check out = ' + JSON.stringify(getDataFormCheckOut));

    if (getDataFormCheckOut["checkout_status"] === "SUCCESS") {
      audio_success.play();

      var textRoomNumber = '';
      getDataFormCheckOut["units"].forEach((element) => {
        textRoomNumber += element['unit_code'] + ','
      });
      textRoomNumber = textRoomNumber.slice(0, -1); // ตัดเครื่องหมาย "," ตัวสุดท้ายออกไป
      console.log(textRoomNumber);

      const textShowCheckOut = "ห้อง " + textRoomNumber + "\nทำการเช็คเอาท์สำเร็จแล้ว\nขอให้ท่านเดินทางโดยสวัสดิภาพ";
      console.log(textShowCheckOut);
      ModalCheckOutSuccessContent.innerText = `${textShowCheckOut}`;
      ContentLoading.classList.remove('show-modal'); //ปิดหน้าต่างโหลดเนื้อหา
      PopupConfirmBookingCheckOut();
      await api_sendTextToLine(tokenGroup,"ห้อง " + textRoomNumber + " [ทำการ Check Out แล้ว]");
      if(allGroupCh){
        await api_sendTextToLine(tokenGroup_allGroup, "[สาขา " + branch + "] " + "ห้อง " + textRoomNumber + " [ทำการ Check Out แล้ว]");
      }
    }









  }
}















// const tokenGroup_allGroup = 'Shiba_All_Reservation'; // Shiba_All_Reservation
// const allGroupCh = true;

// const tokenGroup = 'Shiba_SUT_token'; // Shiba_SUT_token
// const branch = 'SUT';


// // const site_uuid = 'a0d07ab1-0af1-4ea0-b7f4-42a0e58a556e'; //Demo
// const site_uuid = "798af4ba-8758-4a89-a0e9-8ba178b687cb"; //SUT
// // const site_uuid = '17b74846-fa56-48e0-94cb-0da2eea7302c'; //VU



// async function getToken() {

//   // token = await api_request_token("Kiosk_shiba", "app-DEMO", "53OkPEkzILya1O23XZsd"); //Demo
//   token = await api_request_token("Kiosk_shiba", "app-SUT", "7I1fsMNyD7SC8pFxkJkv"); //SUT
//   // token = await api_request_token("Kiosk_shiba", "app-VU", "PYMIJUmcWjb1HQOyJmVj"); //VU
//   console.log('Get token');

// }


async function getSite() {
  await getToken();
  var site = await api_getSite(token, site_uuid);
  
  // console.log('site_uuid',site_uuid);
  // console.log('token',token);
  console.log(site);

  return site['site_name'];
}





async function getBooking(bookingVal) {

  const insert = (arr, index, newItem) => [
    // part of the array before the specified index
    ...arr.slice(0, index),
    // inserted item
    newItem,
    // part of the array after the specified index
    ...arr.slice(index)
  ]

  copyToClipboard('getbooking');





  if (bookingVal.length > 15) {
    bookingVal = insert(bookingVal, 6, '_');
    var bookingNumber = '';
    bookingVal.forEach((val) => {
      bookingNumber += val[0];
    })
    bookingVal = bookingNumber;
  }
  console.log('bookingVal = ' + bookingVal);

  // ค้นหาการจอง จากชื่อ เลขบุ๊กกิ้ง
  
  var getData = await api_getExBookingUUID(token, site_uuid, bookingVal); //'891340401');


  console.log(getData);

  if (getData['message'] === 'BOOKING_NOT_FOUND') {
    console.log('check not found booking');
    return false;
  }

  return getData;

}



var audio_waitCard = document.createElement("AUDIO");
document.body.appendChild(audio_waitCard);
audio_waitCard.src = "soundEffect/system/sound_waitCard.mp3";

var audio_lookCam = document.createElement("AUDIO");
document.body.appendChild(audio_lookCam);
audio_lookCam.src = "soundEffect/system/sound_lookCam.mp3";

var audio_next_page = document.createElement("AUDIO");
document.body.appendChild(audio_next_page);
audio_next_page.src = "soundEffect/system/next_page.wav";

var audio_error = document.createElement("AUDIO");
document.body.appendChild(audio_error);
audio_error.src = "soundEffect/system/error.wav";

var audio_success = document.createElement("AUDIO");
document.body.appendChild(audio_success);
audio_success.src = "soundEffect/system/success.wav";








// formHomeFindBookingNumber.addEventListener("submit", updateHomeFindBookingNumber);




//-------------- check in --------------

async function updateHomeFindBookingNumber(e) {
  // await api_sendTextToLine(tokenGroup_allGroup,"test");
  
  // e.preventDefault()
  unit_uuid = []
  roomNumber = [];
  ContentLoading.classList.add("show-modal"); //เปิดหน้าต่างโหลดเนื้อหา
  // const bookingVal = e.srcElement[0].value.toLowerCase();
  const bookingVal = e.toLowerCase();
  // console.log(bookingNumber);
  audio_next_page.play();

  if (bookingVal === "") {
    ContentLoading.classList.remove("show-modal"); //ปิดหน้าต่างโหลดเนื้อหา
    ModalWarningWindowsContent.innerText = `กรุณาระบุหมายเลขการจองที่ใช้ในการจองห้องพัก`;
    PopupWarningWindows();
    audio_error.play();
    
  } else if (bookingVal === "0") {
    var testSiteName = await getSite();
    ContentLoading.classList.remove("show-modal"); //ปิดหน้าต่างโหลดเนื้อหา
    ModalWarningWindowsContent.innerText = `ที่นี่คือสาขา ` + testSiteName;
    PopupWarningWindows();
    
  } else if (bookingVal === "000") {
    var testSiteName = await getSite();
    ContentLoading.classList.remove("show-modal"); //ปิดหน้าต่างโหลดเนื้อหา
    PopupWarningWindows();
    window.location.href = 'http://127.0.0.1:3001/testPage.html?id=' +id+ '&pass=' +pass ;
    // location.reload();
  } else {

    await getToken();
    var getDataFormCheckIn = await getBooking(bookingVal);

    if (getDataFormCheckIn === false) {
      console.log("error");
      ModalWarningWindowsContent.innerText = `ไม่พบหมายเลขบุ๊คกิ้งนี้\nกรุณาลองอีกครั้งหรือติดต่อพนักงาน`;
      ContentLoading.classList.remove("show-modal"); //ปิดหน้าต่างโหลดเนื้อหา
      PopupWarningWindows();
      audio_error.play();
      return;
    }

    console.log('getDataFormCheckIn = ' + getDataFormCheckIn);


    if (getDataFormCheckIn["reservations"] === null) {
      console.log("can not get data");
      formCheckOutFindBookingNumber.reset();
      ModalWarningWindowsContent.innerText = `หมายเลขบุ๊คกิ้งนี้ ได้ทำการยกเลิกไปแล้ว\nกรุณาลองอีกครั้งหรือติดต่อพนักงาน`;
      ContentLoading.classList.remove("show-modal"); //ปิดหน้าต่างโหลดเนื้อหา
      PopupWarningWindows();
      audio_error.play();
      return;
    }

    booking_uuid = getDataFormCheckIn["booking_uuid"];
    booking_id = getDataFormCheckIn["external_booking_id"];
    fullname = getDataFormCheckIn["booking_person_info"]["fullname"];
    const from_timestamp = getDataFormCheckIn["from_timestamp"].split(" ")[0];
    const to_timestamp = getDataFormCheckIn["to_timestamp"].split(" ")[0];
    const is_fully_paid = getDataFormCheckIn["is_fully_paid"];
    const email = getDataFormCheckIn["booking_person_info"]["email"];
    const checkin_at = getDataFormCheckIn["reservations"][0]["checkin_at"];
    const quantity_room = getDataFormCheckIn["reservations"].length;



    let unit_type_name = [];
    let unit_type_code = [];

    getDataFormCheckIn["reservations"].forEach((element) => {
      roomNumber.push(element["unit_code"]);
      unit_type_name.push(element["unit_type_info"]["unit_type_name"]);
      unit_type_code.push(element["unit_type_info"]["unit_type_code"]);
      unit_uuid.push(element["unit_uuid"]);
    });
    ContentLoading.classList.remove("show-modal"); //ปิดหน้าต่างโหลดเนื้อหา

    console.log('booking_uuid = ' + booking_uuid);
    console.log('roomNumber = ' + roomNumber);
    console.log('unit_type_name = ' + unit_type_name);
    console.log('unit_uuid = ' + unit_uuid);





    // var empty_room = await api_check_room_empty(
    //   token,
    //   site_uuid,
    //   "5d634e79-cfc1-4e64-9bc4-2e30fd758438",
    //   from_timestamp,
    //   to_timestamp
    // );
    // empty_room = empty_room["unallocated_quantity"];

    try {
      addon = getDataFormCheckIn["reservations"][0]["addon"][0]["qty"];
    } catch {
      addon = 0;
    }

    if (is_fully_paid !== true) {
      ModalWarningWindowsContent.innerText = `บุ๊คกิ้งนี้ยังชำระเงินไม่เสร็จสิ้น กรุณาติดต่อพนักงาน`;
      ContentLoading.classList.remove("show-modal"); //ปิดหน้าต่างโหลดเนื้อหา
      PopupWarningWindows();
      audio_error.play();
      return;
    }

    if (checkin_at !== null) {
      ModalWarningWindowsContent.innerText = `บุ๊คกิ้งนี้ได้ทำการเช็คอินไปเรียบร้อยแล้ว`;
      ContentLoading.classList.remove("show-modal"); //ปิดหน้าต่างโหลดเนื้อหา
      PopupWarningWindows();
      audio_error.play();
      return;
    }

    const checkDateTimeCheckin = checkDateAndTimeCheckin(
      from_timestamp,
      to_timestamp
    );
    console.log("checkDateTimeCheckin = " + checkDateTimeCheckin);
    if (checkDateTimeCheckin[0] == false) {
      ModalWarningWindowsContent.innerText =
        checkDateTimeCheckin[1] +
        "\n\n" +
        "วันเช็คอินของคุณคือ: " +
        reverseDateText(from_timestamp) +
        "\nวันเช็คเอ้าท์ของคุณคือ: " +
        reverseDateText(to_timestamp);

      ContentLoading.classList.remove("show-modal"); //ปิดหน้าต่างโหลดเนื้อหา
      PopupWarningWindows();
      return;
    }

    audio_success.play();

    let addbed = "";
    if (addon > 0) {
      addbed = " 🛌 มีการจองที่นอนเสริม " + addon + " ที่";
    } else {
      addbed = "ไม่มีการจองที่นอนเสริม";
    }
    ModalConfirmBookingContent.innerText = `
            📑 หมายเลขบุ๊คกิ้ง ${booking_id}
            คุณ ${fullname}
            จองห้องพักจำนวน ${quantity_room} ห้อง
            🕑 เช็คอิน    : ${reverseDateText(from_timestamp)}
            🕛 เช็คเอาท์ : ${reverseDateText(to_timestamp)}
            ${addbed}
            `;

    ContentLoading.classList.remove("show-modal"); //ปิดหน้าต่างโหลดเนื้อหา
    PopupConfirmBooking();
  }
}


//================= อ่านบัตร =========================
const timeEl = document.querySelectorAll("span");

var coundDownActive;
var count;

function setUpTime() {
  coundDownActive = window.setInterval(function () {
    count -= 1;
    if (count <= 1) {
      console.log("time out....");
      // copyToClipboard("time out....");
      checkTimeOutAndCancleReadCard = false;
    }

    console.log(count);
    timeEl[0].textContent = `${count}`;
  }, 1000);
}

var picture_fromIdCard;
var data_fromIdCard;

async function ReadSmartCard() {
  // historyLog("javaScript-ReadSmartCard", IdCustomer, "รออ่านบัตรประชาชน");
  count = 61; //ตัวตั้งค่าเวลาเริ่มต้นนับถอยหลัง
  checkTimeOutAndCancleReadCard = true;
  setUpTime();
  console.log("Reading Card");

  ModalScanCardTitle.innerText = `กรุณาเสียบประชาชน`;



  // -------- check ว่า python รันอยู่ไหม -------
  let writeClipboardVal = { method: "check" };
  let writeClipboard = JSON.stringify(writeClipboardVal);
  copyToClipboard(writeClipboard);


  let timer_checker = 0;

  while (true) {
    await timer(1000);
    timer_checker++;
    let readClipboardCheck;
    let readClipboardRaw = await readClipboard();

    try {
      readClipboardCheck = JSON.parse(readClipboardRaw);
    } catch (error) {
      console.log("can not JSON.parse while checking python");
      break;
    }

    if (readClipboardCheck["method"] == true) {
      break;
    } else if (timer_checker > 3) {
      console.log("Error python........");
      clearInterval(coundDownActive); //clear การตั้งวังวนเวลา
      ClosePopupScanCard();
      ModalWarningWindowsContent.innerText = `เครื่องอ่านบัตรมีปัญหา กรุณาติดต่อพนักงาน\nError:1`;
      ContentLoading.classList.remove("show-modal"); //ปิดหน้าต่างโหลดเนื้อหา
      PopupWarningWindows();
      return;
    }


  }



  writeClipboardVal = { method: "readCard" };
  writeClipboard = JSON.stringify(writeClipboardVal);
  copyToClipboard(writeClipboard);

  //เล่นเสียงเสียบบัตร...
  console.log('sound_waitCard ');
  audio_waitCard.play();

  while (true) {
    await timer(1000);
    let readClipboardRaw = await readClipboard();

    try {
      const readClipboard_ = JSON.parse(readClipboardRaw);

      // if(readClipboard_['method'] == "computing"){   // {"method": "computing"}
      //   console.log("computing........");
      //   ModalScancardHeaderWaitingCard.classList.remove('active'); //ปิดสัญลักษณ์รอเสียบบัตร
      //   ModalScancardHeaderComputing.classList.add('active'); //เปิดสัญลักษณ์ประมวลผลบัตร
      // }

      if (readClipboard_["method"] == "error") {
        // {"method": "read_Error","data": "Not Found Reader"}
        console.log("Error Reader........");
        clearInterval(coundDownActive); //clear การตั้งวังวนเวลา
        ClosePopupScanCard();
        ModalWarningWindowsContent.innerText = `เครื่องอ่านบัตรมีปัญหา กรุณาติดต่อพนักงาน`;
        ContentLoading.classList.remove("show-modal"); //ปิดหน้าต่างโหลดเนื้อหา
        PopupWarningWindows();
        break;
      }

      if (readClipboard_["method"] == "reading_idCard_ok") {
        // {"method": "reading_idCard_ok"}
        console.log("ok........a");
        picture_fromIdCard = readClipboard_["picRaw"];

        delete readClipboard_["method"];
        delete readClipboard_["picRaw"];

        data_fromIdCard = readClipboard_;
        // console.log("pic = " + picture_fromIdCard);
        data_fromIdCard = { ...data_fromIdCard, ...{ picRaw: picture_fromIdCard } }; //เพิ่มรูปเข้าไปใน object ของข้อมูลของลูกค้าที่จะเก็บ
        console.log("data_fromIdCard = " + JSON.stringify(data_fromIdCard));


        // historyLog("javaScript-ReadSmartCard", IdCustomer, "อ่านบัตรสำเร็จ");
        PopupScanFace();
        break;
      }
    } catch (error) {
      console.log("can not JSON.parse");
      break;
    }

    if (!checkTimeOutAndCancleReadCard) {
      console.log(">>> Cancle Read Card by timeout or btn");
      copyToClipboard('time out');
      // updateCustomer("id_customer",IdCustomer,["status"],["waiting"]); //ส่งค่าไปอัพเดท checkining ที่ status
      // historyLog("javaScript-ReadSmartCard", IdCustomer, "หมดเวลาอ่านบัตร");
      clearInterval(coundDownActive); //clear การตั้งวังวนเวลา
      ClosePopupScanCard();
      break;
    }
  }
  clearInterval(coundDownActive); //clear การตั้งวังวนเวลา

  //อัพค่าการ์ดเสร็จ ให้ทำไรต่อ
}




function BTNTakePhoto() {

  //เล่นเสียงให้ดูที่กล้อง...
  console.log('sound_lookCam ');
  audio_waitCard.pause();
  audio_lookCam.play();

  setUpTakePhotoCountdown();
  openWebcam();
  console.log("กดปุ่ม");
}


async function openWebcam(){
  const video = document.getElementById("webcam-vid");
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch (err) {
    console.error("Error starting webcam: " + err);
  }
}








//======================== นับถอยหลังถ่ายรูป =========================

var coundDownActiveTakePhoto;
var countTakePhoto = 10; //กำหนดเวลานับถอยหลังถ่ายรูป

function setUpTakePhotoCountdown() {
  ModalScanFaceTakePhotoCountdown.classList.add("active");
  coundDownActiveTakePhoto = window.setInterval(function () {
    countTakePhoto -= 1;
    console.log(countTakePhoto);
    ModalScanFaceTakePhotoCountdown.innerText = `${countTakePhoto}`;

    if (countTakePhoto <= 0) {
      afterTakePhotoCountdown();
      return;
    }
  }, 1000);
}

function afterTakePhotoCountdown() {
  countTakePhoto = 10;
  ModalScanFaceTakePhotoCountdown.innerText = `${countTakePhoto}`;
  ModalScanFaceTakePhoto.classList.add("active");
  clearInterval(coundDownActiveTakePhoto); //clear การตั้งวังวนเวลา
  ModalScanFaceTakePhotoCountdown.classList.remove("active");
  setTimeout(() => {
    takePhotoBT();
  }, 100); //หน่วงถ่ายรูปให้ตรงกับแสงขาว

  setTimeout(() => {
    ModalScanFaceTakePhoto.classList.remove("active"); //ปิดตัวเลขที่ไว้นับ
    ModalScanFace.classList.remove("show-modal"); //ปิดหน้าต่างถ่ายรูป
    // ModalScanfaceProcessing.classList.add("show-modal"); //เปิดหน้าต่างประมวลผล
  }, 2000);

  console.log("ถ่ายรูป");
}

async function takePhotoBT(){
  const video = document.getElementById("webcam-vid");
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0);
  const imgData = canvas.toDataURL("image/png");
  // Do something with the image data, e.g. upload to server
  console.log("Image captured = " + imgData);
  canvas.remove();

  resultBase64(imgData);

  //stop camera
  const tracks = stream.getTracks();
  tracks.forEach((track) => track.stop());
  video.srcObject = null;

  // // Resize the captured image
  // imgData = await resizeImage(imgData);

}





//======================== Do some thing หลังถ่ายรูป =========================

async function resultBase64(resultBase64) {
  console.log("in function resultBase64");

  const writeClipboardVal = {
    method: "ComparePhoto",
    data1: picture_fromIdCard,
    data2: resultBase64,
  };
  const writeClipboard = JSON.stringify(writeClipboardVal);
  copyToClipboard(writeClipboard);
  console.log("uploaded");

  let resultCompareFace = "";
  let PercentResultCompareFace = "";

  while (true) {
    await timer(1000);
    let readClipboardRaw = await readClipboard();
    try {
      const readClipboard_ = JSON.parse(readClipboardRaw);

      if (readClipboard_["method"] == "compared") {
        console.log(
          "compared........" +
          readClipboard_["data"]["result"] +
          readClipboard_["data"]["faceDis"]
        );
        resultCompareFace = readClipboard_["data"]["result"];
        PercentResultCompareFace = readClipboard_["data"]["faceDis"];
        break;
      }
    } catch (error) {
      console.log("can not JSON.parse");
      break;
    }
  }
  afterCompareFace(resultCompareFace, PercentResultCompareFace);
}





async function afterCompareFace(result, faceDis) {

  //เช็คว่าหน้าตรงไหมและให้ทำไรต่อ
  if (result) {
    FormFillPhoneNumber.reset();
    ModalFillPhone.classList.add("show-modal");
    ModalScanfaceProcessing.classList.remove("show-modal");
    audio_success.play();
  } else {
    if (faceDis > 0) {
      audio_error.play();
      ModalWarningWindowsScanface.classList.add("show-modal");
      ModalWarningWindowsScanfaceContent.innerText = `ใบหน้าไม่ตรงกัน ข้อแนะนำลองถอดแมส,แว่นตา และไม่ยิ้มขณะที่ถ่ายภาพ
                                                    ความตรงกันของใบหน้า ${faceDis}%`;
      ModalScanfaceProcessing.classList.remove("show-modal");
    }
    if (faceDis === 0) {
      audio_error.play();
      ModalWarningWindowsScanface.classList.add("show-modal");
      ModalWarningWindowsScanfaceContent.innerText = `ไม่พบใบหน้า กรุณาถ่ายรูปใหม่อีกครั้ง`;
      ModalScanfaceProcessing.classList.remove("show-modal");
    }
    if (faceDis === -1) {
      audio_error.play();
      ModalWarningWindowsScanface.classList.add("show-modal");
      ModalWarningWindowsScanfaceContent.innerText = `เกิดข้อผิดพลาดกรุณาติดต่อพนักงาน`;
      ModalScanfaceProcessing.classList.remove("show-modal");
    }
    ContentLoading.classList.remove("show-modal");


  }
}



// FormFillPhoneNumber.addEventListener("submit", afterFillPhoneNumber);

async function afterFillPhoneNumber(e) {
  // e.preventDefault()
  console.log(e)
  const phoneNumber = e;

  if (phoneNumber.length !== 10) { // หมายเลขโทรศัพท์ไม่ถูกต้องหรือไม่ถึง 10 ตัว
    ModalWarningWindowsContent.innerText = `หมายเลขโทรศัพท์ไม่ถูกต้อง`;
    FormFillPhoneNumber.reset();
    PopupWarningWindows();
    audio_error.play();
  } else {
    audio_next_page.play();



    // data_fromIdCard = { ...data_fromIdCard, ...{ phone: phoneNumber } }; //เพิ่มเบอร์โทรเข้าไปใน object ของข้อมูลของลูกค้าที่จะเก็บ

    data_fromIdCard = {
                      person_info: { phone_number: phoneNumber  },
                      identity_document_data: data_fromIdCard
                    }
  



    console.log('data_fromIdCard2 = ' + JSON.stringify(data_fromIdCard));

    var getData = await api_checkin(token, site_uuid, booking_uuid, data_fromIdCard);

    console.log('change status check in = ' + getData);

    ModalWarningIdcard.classList.add("show-modal"); //เรียกหน้าต่างเตือนให้เอาบัตรประชาชนออก

    ModalScanfaceSuccessfu.classList.add("show-modal");

    ModalFillPhone.classList.remove("show-modal");

    ScanfaceSuccessfulContent.innerText = `การยืนยันตัวสำเร็จ
  (กรุณาถ่ายรูปหมายเลขห้องพักและรหัสเก็บเอาไว้เพื่อช่วยในการจดจำ)`;





    var passcode = [];
    for await (item of unit_uuid) {
      var passcode_raw = await get_passcode(token, site_uuid, item)
      passcode.push(passcode_raw['passcode']);
    }
    // console.log('arr = ' + JSON.stringify( passcode ));


    var textShowRoom = '';
    roomNumber.forEach((room, index) => {
      textShowRoom = '\nประตูหน้ารหัส ' + pass + '\n';
      textShowRoom += 'ห้อง ' + room + ' รหัส ' + passcode[index] + '*\n';
    });
    textShowRoom += '\n-ขอให้มีความสุขในการเข้าพักที่ชิบะนะครับ-';
    
    // console.log('textShowRoom = ' + textShowRoom);

    const msg = "📑 BK:" + booking_id + '-' + fullname + "   ห้อง: " + roomNumber + " [ทำการ Check in แล้ว]"
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    await api_sendTextToLine(tokenGroup, msg);
    

    if(allGroupCh){
      const msg2 = "[สาขา " + branch + "]       " +"📑 BK:" + booking_id + '-' + fullname + "   ห้อง: " + roomNumber + " [ทำการ Check in แล้ว]"
      await api_sendTextToLine(tokenGroup_allGroup, msg2);
      console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
    }


    audio_success.play();
    ModalScanfaceSuccessfulSendRoomNumber.innerText = `${textShowRoom}`;








  }
}
























//======================== ส่งอีเมล์ และอัพเดทห้องไม่ว่าง =========================
async function sendEmailAndUpdateRoom() {
  const roomEmpty = await getAllRowRoomByHeader("status", "available");
  console.log("จำนวนห้องที่ว่าง " + roomEmpty["data"].length);

  let keepRoom = [];

  for (let i = 0; i < qantityRoom; i++) {
    // เก็บแยกห้องออกมาเก็บ เลขห้องกับรหัส
    if (qantityRoom > roomEmpty["data"].length) {
      break;
    } // เช็คว่าถ้ารอบจำนวนห้องที่จองมากกว่าห้องที่มีอยู่ให้ออกจากลูป
    keepRoom.push({
      room_number: roomEmpty["data"][i]["room_number"],
      password: roomEmpty["data"][i]["password"],
    });
    console.log(roomEmpty["data"][i]["room_number"]);
  }

  // console.log("goto send email");
  // console.log("keepRoom = " + keepRoom);   // [ {room_number:"1|1", password: "1111"}, {room_number:"1|2", password: "2222"} ]

  const subjectEmail = "<< รหัสเข้าห้องที่พักชิบะ >>";
  let numberRoomArray = [];
  let messageEmail = "รหัสประตูหน้าคือ 123456#\n";

  for (let i = 0; i < keepRoom.length; i++) {
    messageEmail +=
      "ห้อง " +
      keepRoom[i]["room_number"] +
      " รหัส " +
      keepRoom[i]["password"] +
      "*\n";
    numberRoomArray.push(keepRoom[i]["room_number"]);
  }
  messageEmail += "ขอให้มีความสุขในการเข้าพักที่ชิบะนะครับ";

  console.log(messageEmail);

  // sendEmail("namenap2@gmail.com", subjectEmail, messageEmail);
  updateRoom_ByKeyword_Array_checkin(
    numberRoomArray,
    "unavailable",
    "ลูกค้าเข้าพัก",
    IdCustomer,
    ci,
    co
  );
  // historyLog("javaScript-sendEmailAndUpdateRoom", IdCustomer, ("อัพเดท status ชีท Room ห้อง " + numberRoomArray + "ว่า unavailable" + ci +"-"+ co));
  updateFormHouseKeeper();
  // historyLog("javaScript-sendEmailAndUpdateRoom", IdCustomer, "อัพเดท Form House Keeper check in");

  return messageEmail;
}
//=======================================================================================




























































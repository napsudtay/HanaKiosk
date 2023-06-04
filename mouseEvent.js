function preventAction(e) {
  e.preventDefault();
}

function disableMouseEvents() {
  document.addEventListener('mousedown', preventAction, { passive: false });
  // document.addEventListener('mousemove', preventAction, { passive: false });
  // document.addEventListener('mouseup', preventAction, { passive: false });
  document.addEventListener('dblclick', preventAction, { passive: false });
  document.addEventListener('contextmenu', preventAction, { passive: false }); // Added to disable right-clicks
}

function disableTouchEvents() {
  // document.addEventListener('touchstart', preventAction, { passive: false });
  document.addEventListener('touchmove', preventAction, { passive: false });
  // document.addEventListener('touchend', preventAction, { passive: false });
}

function disableMultiTouchEvents() {
  document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) {
      e.preventDefault();
    }
  }, { passive: false });
}

function disableUserActions() {
  disableMouseEvents();
  disableTouchEvents();
  disableMultiTouchEvents();
}

// Call this function to disable user actions
disableUserActions();










function longPressHandler(e) {
  e.preventDefault();
  triggerClick(e.target);
}

function rightClickHandler(e) {
  e.preventDefault();
  triggerClick(e.target);
}

function triggerClick(target) {
  const clickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window
  });
  target.dispatchEvent(clickEvent);
}

function detectLongPress(element, duration = 100) {
  let timer;
  element.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    timer = setTimeout(() => longPressHandler(e), duration);
  }, { passive: false });
  element.addEventListener('mouseup', () => clearTimeout(timer));
  element.addEventListener('mouseleave', () => clearTimeout(timer));
}

function detectRightClick(element) {
  element.addEventListener('contextmenu', rightClickHandler, { passive: false });
}

function addListeners(element) {
  detectLongPress(element);
  detectRightClick(element);
}

// Apply the listeners to the entire document
addListeners(document);


// Google script >>> KioskToLine.gs

async function api_sendTextToLine(token, msg) {
  console.log('Line', token, msg);
  var url_apiShibaGoogleSC = 'https://script.google.com/macros/s/AKfycbyJFjnqvLyYkbI6f2mEcIiT2mw8RBx19WeMC645GU0e_THmegWYgmR8KSYBrs6eQvEo/exec?msg=';

  url_apiShibaGoogleSC += msg;
  url_apiShibaGoogleSC += '&token=';
  url_apiShibaGoogleSC += token;

  let res = await fetch(url_apiShibaGoogleSC)
    .then((response) => response.json())
    .then((body) => {
      return body;
    });
  return res;
}
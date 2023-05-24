let ModalReservation = document.getElementById("modal-reservation-calenda");

function PopupReservation() {
    // reservation_checkin = '';
    // reservation_checkout = '';
    whichMonth = 0;
    page_reservation = 1;
    hideDay = now.getDate(); //ซ่อนวันจนถึงวันที่กำหนดนี้
    hideDayInCalenda = now.getMonth();

    btn_check_reservation_checkin_or_checkout();
    showDayInCalendar_CheckIn(0);
    // ModalReservation.classList.add("show-modal");
    menu.classList.remove("active"); //เก็บเมนูหมุนหลัก
    ShowDateTime();
    SetTimeOutAll(); //เรียกฟังก์ชั่นตั้งการหมดเวลาทำรายการ
}


function ClosePopupReservation() {

    ModalReservation.classList.remove("show-modal");
    CloseAllPopup(); //เรียกใช้ฟังก์ชั่นปิดทุกหน้าต่าง
    formCheckOutFindBookingNumber.reset(); //clear value from input
}



//=====================================  Calenda check in - check out ========================================




var whichMonth = 0;
var page_reservation = 1;

var roomPirce_choose = 750;
var quantity_choose = 1;
var addBed_choose = 0;

var reservation_checkin = '13/03/2023';
var reservation_checkout = '14/03/2023';
var phoneNumberReservation;
var nameReservation = 'Sangtawan Onnuam';

var dance = 0;








async function btn_check_reservation_checkin_or_checkout() {  // อันนี้ให้ปุ่มมกดยืนยันข้อมูลเรียกใช้ เช็คให้ไปหน้าไหน


    if (page_reservation === 1) {
        // goto data fill form

        console.log("เข้าหน้าเลือกห้อง");
        
        document.getElementById("modal-select-unite").classList.add("show-modal");
        
        document.getElementById("quantity_input").value = 1;
        document.getElementById("addBed_input").value = 0;
        document.getElementById("nameBox").value = '';
        document.getElementById("phoneBox").value= '';




      

        
        // await getToken();
        // console.log(">>>>> ",await createBooking(token, 'dataJson'));

        // var units = await api_getUnitTypes(token, site_uuid);
        // units.forEach((nameUnitType) => {
        //     unit_type_name.push(nameUnitType['unit_type_name']);
        //     unit_type_uuid.push(nameUnitType['unit_type_uuid']);
        // })


        // console.log('units = ', units);
        // console.log('unit_type_name = ', unit_type_name);
        // console.log('unit_type_uuid = ', unit_type_uuid);

        // Show the first photo
        showCurrentPhoto();
        page_reservation = 2;

    } else if (page_reservation === 2) {

        console.log("เข้าหน้าเลือกวัน check in");
        
        // room_uuid_choose = unit_type_uuid[currentPhotoIndex];
        roomPirce_choose = roomPirce[currentPhotoIndex];
        quantity_choose = document.getElementById("quantity_input").value;
        addBed_choose = document.getElementById("addBed_input").value;

        // console.log('room_uuid_choose = ', room_uuid_choose , 'quantity_choose = ', quantity_choose, 'addBed_choose = ', addBed_choose);

        CloseAllPopup();
        document.getElementById("modal-reservation-calenda").classList.add("show-modal");
        // document.getElementById("modal-select-unite").remove("show-modal");

        document.getElementById("header_calenda").style.color = "#52BE80";
        document.getElementById("header_calenda").innerHTML = "เลือกวันเช็คอิน";
        chooseDate(now.getDate(), now.getMonth() + 1, now.getFullYear());
        page_reservation++;

        // console.log(hi);

        // await getToken();

        // api_check_room_empty(token, site_uuid, room_type, checkIn, checkOut) ;




    } else if (page_reservation === 3) {
        // goto check out
 
        console.log("เข้าหน้าเลือกวัน check out");
        reservation_checkin = document.getElementById("show_day_choose").innerHTML;
        // console.log('reservation_check in = ',reservation_checkin);

        // กำหนดวันที่ต้องการซ่อนใน calenda
        hideDay = changeToTwoDigi( parseInt(reservation_checkin.substring(0, 2)) + 1 );
        hideDayInCalenda = hideDayInCalenda + whichMonth;

        document.getElementById("show_day_choose").innerHTML = hideDay + reservation_checkin.substring(2);
        document.getElementById("header_calenda").style.color = "#F44336";
        document.getElementById("header_calenda").innerHTML = "เลือกวันเช็คเอ้าท์";

        page_reservation++;
        showDayInCalendar_CheckIn(whichMonth);
        
        
        
        
        
    } else if (page_reservation === 4) {
        console.log("เข้าหน้า show ข้อมูลห้องที่เลือก");
        
        reservation_checkout = document.getElementById("show_day_choose").innerHTML;
        
        document.getElementById("modal-proof-reservation").classList.add("show-modal");
        document.getElementById("modal-reservation-calenda").classList.remove("show-modal");
        

        var price_addBed = 150;
        
        
        var quantity_Date_Stay = calculateDate(reservation_checkin,reservation_checkout);

        console.log( 'quantity_Date_Stay=', quantity_Date_Stay );
        

        
        var total_price = ((roomPirce_choose * quantity_choose) + (price_addBed * addBed_choose)) * quantity_Date_Stay ;
        // console.log( 'total_price=', total_price );
        
        
        
        document.getElementById("detail-reservation1").innerHTML= '🕑 เช็คอิน : ' + reservation_checkin ;
        document.getElementById("detail-reservation2").innerHTML= '🕛 เช็คเอาท์ : ' + reservation_checkout ;
        document.getElementById("detail-reservation3").innerHTML= 'จองห้องพักจำนวน : ' + quantity_choose + ' ห้อง';
        document.getElementById("detail-reservation4").innerHTML= '🛌 ที่นอนเสริม : ' + addBed_choose + ' ที่';
        document.getElementById("detail-reservation5").innerHTML= 'ราคารวม : ' + total_price + ' บาท';
        page_reservation++;
        
        
    } else if (page_reservation === 5) {
        console.log('page_reservation 5 = ', page_reservation);
        console.log("เข้าหน้าเลือกใส่เบอร์โทร");
        document.getElementById("formFillPhoneNumberReservation").addEventListener("submit", btn_check_reservation_checkin_or_checkout); //เปลี่ยนปุ่มsubmit ให้ไปเรียกฟังค์ชั่นอื่นแทน
        document.getElementById("modal-fillPhone-Reservation").classList.add("show-modal");
        document.getElementById("modal-proof-reservation").classList.remove("show-modal");
        page_reservation++;
        
        
    } else if (page_reservation === 6) {
        console.log("เข้าหน้าเลือกกรอกชื่อ");
        
        phoneNumberReservation =  document.getElementById("phoneBox").value;
        
        if (phoneNumberReservation.length !== 10 && phoneNumberReservation.length !== 1) { // หมายเลขโทรศัพท์ไม่ถูกต้องหรือไม่ถึง 10 ตัว
            PopupWarningWindows();
            ModalWarningWindowsContent.innerText = `หมายเลขโทรศัพท์ไม่ถูกต้อง`;
            console.log('phoneNumberReservation.length=',phoneNumberReservation.length);
            FormFillPhoneNumber.reset();
        } else {
            console.log('phoneNumberReservation=',phoneNumberReservation);
            
            document.getElementById("formFillName").addEventListener("submit", btn_check_reservation_checkin_or_checkout);//เปลี่ยนปุ่มsubmit ให้ไปเรียกฟังค์ชั่นgเดิมของมัน
            document.getElementById("modal-fillName-Reservation-Keyboard").classList.add("show-modal");
            document.getElementById("modal-fillPhone-Reservation").classList.remove("show-modal");
            page_reservation++;
            
        }
        
        
    } else if (page_reservation === 7) {
        console.log("เข้าหน้า QR Code");
        nameReservation =  document.getElementById("nameBox").value;
        
        if (nameReservation.length <= 1) { // ชื่อน้อยกว่า 2 ตัว
            PopupWarningWindows();
            ModalWarningWindowsContent.innerText = `กรุณาใส่ชื่อใหม่อีกครั้ง`;
            document.getElementById("nameBox").reset;
        } else {
            console.log('nameReservation=',nameReservation);
            
            document.getElementById("form-show-qrcode-pay").addEventListener("submit", btn_check_reservation_checkin_or_checkout);//เปลี่ยนปุ่มsubmit ของnameBox เรียกฟังค์ชั่นที่ต้องการ
            document.getElementById("modal-fillName-Reservation-Keyboard").classList.remove("show-modal");
            document.getElementById("modal-show-qrcode-pay").classList.add("show-modal");
            page_reservation++;
            
        }
    }else if (page_reservation === 8) {
        console.log("สร้างการจอง");
        
        document.getElementById("modal-show-qrcode-pay").classList.remove("show-modal");
        document.getElementById("modal-reservation-successful").classList.add("show-modal");

        
        document.getElementById("modal-reservation-successful-content").classList.toggle("active");
        document.getElementById("togglesymbol-reservation-successful").classList.toggle("active");
        document.getElementById("modal-reservation-successful-sendroomnumber").innerText = '862445402';


    }

    console.log('page_reservation', page_reservation, 'checkIn = ', reservation_checkin, 'checkOut = ', reservation_checkout);

}




function generateRandomNumber() {
    // Generate a random number between 100000 and 999999 (inclusive)
    const randomNumber =
      Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    return randomNumber;
  }

//   console.log('generateRandomNumber= ' , generateRandomNumber());


function SuccessfulReservationToggleBTN() { 
    document.getElementById("modal-reservation-successful-content").classList.toggle("active");
    document.getElementById("togglesymbol-reservation-successful").classList.toggle("active");
    document.getElementById("modal-reservation-successful-sendroomnumber").innerText = "862445402";

    
}




function calculateDate(date1,date2) { 
     date1 = new Date( tranformDate(date1, "/") );
     date2 = new Date( tranformDate(date2, "/") );
      
      
    var Difference_In_Time = date2.getTime() - date1.getTime();
    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      
    //To display the final no. of days (result)
    // console.log("Difference_In_Days= " + Difference_In_Days);
    return Difference_In_Days;
}

















function chooseDate(day, month_, year_) {
    day = changeToTwoDigi(day);
    month_ = changeToTwoDigi(month_);
    document.getElementById("show_day_choose").innerHTML = day + "/" + month_ + "/" + year_;
}

function changeToTwoDigi(number) {
    if (number < 10) {
        return '0' + number.toString();
    } else {
        return number.toString();
    }
}



function tranformDate(dataVal, splitMark) {
    dataVal = dataVal.split(splitMark);
    return( dataVal[2] + '-' + dataVal[1] + '-' + dataVal[0]);
}



function nextMonth() {
    whichMonth++;
    showDayInCalendar_CheckIn(whichMonth);
}
function lastMonth() {
    whichMonth--;
    showDayInCalendar_CheckIn(whichMonth);
}









var hideDay = now.getDate(); //ซ่อนวันจนถึงวันที่กำหนดนี้
var hideDayInCalenda = now.getMonth();
chooseDate(now.getDate(), now.getMonth() + 1, now.getFullYear());

// showDayInCalendar_CheckIn(0);



function showDayInCalendar_CheckIn(whichMonth_) {
    if (whichMonth_ < 0) { whichMonth = 0, whichMonth_ = 0; }
    // console.log("whichMonth_ = " + whichMonth_, whichMonth);


    today = new Date();

    var month_raw = today.getMonth() + whichMonth_;
    month_ = (month_raw % 12); //จะทำให้เลขที่เกิน 12 วนกลับมานับ 0 ใหม่
    month = month_ + 1;

    // const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthNames = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];

    year = today.getFullYear() + Math.floor(month_raw / 12);



    // console.log(month_,month);

    document.getElementById("nameMonthOnCalenda").innerText = monthNames[month_] + ' ' + year;

    var daysInMonth = new Date(year, month, 0).getDate();
    var firstDay = new Date(year, month_, 1).getDay();
    var dates = [];


    var elementHtml = '';
    for (var i = 1; i <= daysInMonth; i++) { dates.push(i); }
    var sortedDates = dates.sort(function (a, b) { return a - b; });
    for (var i = 0; i < firstDay; i++) { elementHtml += "<td></td>"; }


    // console.log('month_', month_, 'hideDayInCalenda', hideDayInCalenda, 'whichMonth', whichMonth, 'hideDay', hideDay);

    for (var i = 0; i < sortedDates.length; i++) {
        if (month_ === hideDayInCalenda) {          // ถ้าเดือนที่เลือกอยู่ = เดือนที่จะซ่อน

            if (parseInt(sortedDates[i]) < parseInt(hideDay)) {   // ถ้าวันที่กำลังจัดเรียง น้อยกว่าวันที่ต้องการจะซ่อน
                elementHtml += "<td  style=\"color:#EAEDED \">" + sortedDates[i] + "</td>"; // ทำให้วันถูกซ่อน
            } else {
                elementHtml += "<td onclick=\"chooseDate(" + sortedDates[i] + "," + month + "," + year + ")\">" + sortedDates[i] + "</td>";
            }
        } else if (month_ < hideDayInCalenda) {          // ถ้าเดือนที่เลือกอยู่ < เดือนที่จะซ่อน{
            elementHtml += "<td  style=\"color:#EAEDED \">" + sortedDates[i] + "</td>"; // ทำให้วันถูกซ่อน
        } else {
            elementHtml += "<td onclick=\"chooseDate(" + sortedDates[i] + "," + month + "," + year + ")\">" + sortedDates[i] + "</td>";
        }


        if ((firstDay + i + 1) % 7 == 0) { elementHtml += ("</tr><tr>"); }

    }

    for (var i = 0; i < 7 - ((firstDay + daysInMonth) % 7); i++) { elementHtml += ("<td></td>"); }

    // console.log("elementHtml = " + elementHtml);
    document.getElementById("day_on_calenda").innerHTML = elementHtml;
}


//=======================================================================================






//=====================================  room type seclect  ========================================




var currentPhotoIndex = 0;

var unit_type_name = ['Delux Room','Standard Room'];
// var unit_type_uuid = [];
var photos = [
    "test/photo2.jpg",
    "test/photo1.jpg"
];

var roomPirce = [
    "750",
    "550"
];



var gallery = document.getElementById("gallery");
var prevBtn = document.getElementById("prevBtn");
var nextBtn = document.getElementById("nextBtn");
var nameRoomHtml = document.getElementById("nameRoom");
var roomPirceHtml = document.getElementById("roomPirce");


function showCurrentPhoto() {
    // Remove all photos from the gallery
    while (gallery.firstChild) {
        gallery.removeChild(gallery.firstChild);
    }

    // Create a new photo div for the current photo
    var photoDiv = document.createElement("div");
    photoDiv.className = "photo";
    photoDiv.style.backgroundImage = "url('" + photos[currentPhotoIndex] + "')";
    photoDiv.addEventListener("click", function () {
        // Return the current photo URL when clicked
        returnPhoto(photos[currentPhotoIndex]);
    });
    gallery.appendChild(photoDiv);
    nameRoomHtml.innerHTML = unit_type_name[currentPhotoIndex];
    roomPirceHtml.innerHTML = roomPirce[currentPhotoIndex];
}




function showNextPhoto() {
    currentPhotoIndex++;
    if (currentPhotoIndex >= unit_type_name.length) {
        currentPhotoIndex = 0;
    }
    showCurrentPhoto();
}

function showPrevPhoto() {
    currentPhotoIndex--;
    if (currentPhotoIndex < 0) {
        currentPhotoIndex = unit_type_name.length - 1;
    }
    showCurrentPhoto();
}



var quantity_input = 1;
function plush_quantity_input() {
    quantity_input++;
    if (quantity_input >= 20) { quantity_input = 20; }
    document.getElementById("quantity_input").value = quantity_input;
}

function minus_quantity_input() {
    quantity_input--;
    if (quantity_input <= 1) { quantity_input = 1; }
    document.getElementById("quantity_input").value = quantity_input;
}


var addBed_input = 0;
function plush_addBed_input() {
    addBed_input++;
    if (addBed_input >= 5) { addBed_input = 5; }
    document.getElementById("addBed_input").value = addBed_input;
}

function minus_addBed_input() {
    addBed_input--;
    if (addBed_input <= 0) { addBed_input = 0; }
    document.getElementById("addBed_input").value = addBed_input;
}







//=======================================================================================
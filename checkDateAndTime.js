function checkDateAndTimeCheckin(checkIn_Date_Raw, checkOut_Date_Raw){    // เช็ควันเวลาที่สามารถเช็คอิน ได้
 
       
    const time_can_checkIn = 14;          //เวลา ที่สามารถเข้าเช็คอินได้ 14.00
    const time_can_checkOut = 12;         // เวลา ที่ต้องเช็คเอ้าท์ 12.00
    const time_not_enough_for_stay = 6;  //เวลาที่เหลือไม่พอ ถ้านับเทียบกับที่จะต้องเช็คเอ้าท์ตอน 12.00
   
   
   
    // const checkout_Date_Raw_Array = ("2022#8#6").replace("#","-").replace("#","-");
    const checkout_Date_Raw_Array = checkOut_Date_Raw;//(checkOut_Date_Raw).replace("#","-").replace("#","-");
    const checkout_Date = new Date(checkout_Date_Raw_Array);
    checkout_Date.setHours(time_can_checkIn);
    // console.log("checkout_Date = " + checkout_Date);
   
   
   
    // const checkin_Date_Raw_Array = ("2022#8#5").replace("#","-").replace("#","-");
    const checkin_Date_Raw_Array = checkIn_Date_Raw;//(checkIn_Date_Raw).replace("#","-").replace("#","-");
    const checkin_Date = new Date(checkin_Date_Raw_Array);
    checkin_Date.setHours(time_can_checkOut);
    // console.log("checkin_Date = " + checkin_Date);
   
   
    // const now_date_Array = ("2022#8#4").replace("#","-").replace("#","-");
    // const now_date = new Date(now_date_Array);
    // now_date.setHours(8);
    // console.log("now_date = " + now_date);
    const now_date = new Date();
   
    var diffMS_checkIn =  now_date - checkin_Date;
    // console.log(diffMS + ' ms');
    var diffS_checkIn  = diffMS_checkIn  / 1000;    
    // console.log(diffS + ' ');
    var diffM_checkIn  = diffS_checkIn  / 60;
    // console.log(diffM + ' minutes');
    var diffH_checkIn  = diffM_checkIn  / 60;
    // console.log("diffH_checkIn = " + diffH_checkIn + ' hours');
                                     
    var diffD_checkIn  = diffH_checkIn  / 24;          // เลยวันที่จองแล้ว ค่าเป็น+ มาก่อนวันติด-
    // console.log("diffD_checkIn = " + diffD_checkIn + ' days');
   
   
    var diffH_checkout_from_now =  (checkout_Date - now_date) / 1000 / 60 / 60  // ชั่วโมงพักที่เหลืออยู่
    // console.log("diffH_checkout_from_now = " + diffH_checkout_from_now + ' hours');
   
   
    if(diffH_checkIn  < 0){   //ถ้าเอา วันปัจจุบันลบกับวันที่จอง แล้วชั่วโมงติดลบ แสดงว่า มาเช็คอินก่อนวันที่จองไว้
      if(diffD_checkIn  < -1){  // ถ้าติดลบเป็นวันเลย
        // console.log("คุณมาเช็คอินก่อนวันที่จองไว้ " + Math.abs(Math.ceil(diffD_checkIn )) + ' วัน');
        return [false,"คุณมาเช็คอินก่อนวันที่จองไว้ " + Math.abs( Math.ceil(diffD_checkIn) ) + ' วัน'];
      }else{
        // console.log("กรุณารออีก " + Math.abs(diffH_checkIn ) + " ชั่วโมง ถึงจะเช็คอินได้");
        return [false,"กรุณารออีก " + Math.abs( Math.round(diffH_checkIn) ) + " ชั่วโมง จะถึงเวลาเช็คอินได้\n(เวลาเช็คอินปกติคือ 14.00 น.)"];
      }
    }else if(diffH_checkIn  >= 18){ //ถ้าเอา วันปัจจุบันลบกับวันที่จอง แล้วชั่วโมงมากกว่า 18 แสดงว่ามาเช็คอินตอน 8 โมงเช้า ของวันที่จอง
      if(diffH_checkout_from_now <= time_not_enough_for_stay ){ //ชั่วโมงพักที่เหลืออยู่ เหลือเวลาที่สามารถพัก 6 ชั่วโมงไหม
        // console.log("คุณไม่สามารถเช็คอินได้ เนื่องจากเวลาพักคุณเหลือน้อยเกิน");
        if(diffH_checkout_from_now < 0){ //ชั่วโมงพักที่เหลืออยู่ ติดลบ แสดงว่าเลยวันเข้าพักแล้ว
          return [false,"คุณไม่สามารถเช็คอินได้ เนื่องจากเลยวันที่คุณทำการจองมาแล้ว"];
        }
        return [false,"คุณไม่สามารถเช็คอินได้ เนื่องจากเวลาพักคุณเหลือน้อยเกิน"];
      }
    }
    return [true,"สามารถเช็คอินได้ปกติ"];
  }




function reverseDateText(dateText){ // dateText : 2023-02-15
    dateText = dateText.split("-");
    return dateText[2] + "/" + dateText[1] + "/"  + dateText[0]
}
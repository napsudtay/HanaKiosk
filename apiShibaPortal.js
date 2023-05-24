const url_apiShibaPortal = "https://shiba-api.shibaroomth.com";




async function api_request_token(device, id, password) {
  const uri = "/auth/login/request_token";
  const data = { "device": { "id": device } };
  const base64Cre = stringToBase64(id + ':' + password);

  const options = {
    "async": true,
    "crossDomain": true,
    "method": "POST",
    "contentType": 'application/json',
    "headers": {
      "cache-control": "no-cache",
      "Authorization": "Basic " + base64Cre
    },
    "body": JSON.stringify(data)
  };

  let response = await fetch(url_apiShibaPortal + uri, options)
  .then((response) => response.json()) 
  .then((body) => {
    return body.token;
  });
  // console.log(response);
  return response;
}
function stringToBase64(string) {
  return btoa(string);
}





async function api_getChannels(token) {
  const uri = "/channel/channels";
  const options = {
    "async": true,
    "crossDomain": true,
    "method": "GET",
    "contentType": 'application/json',
    "headers": {
      "cache-control": "no-cache",
      "Authorization": "Bearer " + token
    },
  };

  let res = await fetch(url_apiShibaPortal + uri, options)
  .then((response) => response.json())
  .then((body) => {
    return body;
  });
  return res;
}






async function api_getSites(token) {
  const uri = "/site/sites";
  const options = {
    "async": true,
    "crossDomain": true,
    "method": "GET",
    "contentType": 'application/json',
    "headers": {
      "cache-control": "no-cache",
      "Authorization": "Bearer " + token
    },
  };

  let res = await fetch(url_apiShibaPortal + uri, options)
  .then((response) => response.json())
  .then((body) => {
    return body;
  });
  return res;
}






async function api_getSite(token, site_uuid) {
  const uri = "/site/" + site_uuid;
  const options = {
    "async": true,
    "crossDomain": true,
    "method": "GET",
    "contentType": 'application/json',
    "headers": {
      "cache-control": "no-cache",
      "Authorization": "Bearer " + token
    },
  };

  let res = await fetch(url_apiShibaPortal + uri, options)
  .then((response) => response.json())
  .then((body) => {
    return body;
  });
  return res;
}








async function api_getExBookingUUID(token, site_uuid, bookingNumber) {

  // token = request_token("check_email_ota", "app-booking-email-bridge", "6yA0z4Px6yOZbgcB6RJRAwX5o");
  // Logger.log(token);

  // site_uuid = 'a0d07ab1-0af1-4ea0-b7f4-42a0e58a556e'; //Demo
  // site_uuid = '798af4ba-8758-4a89-a0e9-8ba178b687cb'; //SUT
  // site_uuid = '17b74846-fa56-48e0-94cb-0da2eea7302c'; //VU

  // bookingNumber = '891340401';

  var options = {
    "async": true,
    "crossDomain": true,
    "method": "GET",
    "contentType": 'application/json',
    "headers": {
      "cache-control": "no-cache",
      "Authorization": "Bearer " + token
    },
  };

  const uri = '/booking/' + site_uuid + '/booking/external_id/' + bookingNumber;
  let res
  
  try{
    res= await fetch(url_apiShibaPortal + uri, options)
    .then((response) => response.json())
    .then((body) => {
      return body;
    });

  }
  catch{
    return {status:false}; 
  }
  
  return res;
  
}




async function api_check_room_empty(token, site_uuid, room_type, checkIn, checkOut) {
  checkIn += " 14:00:00%2B0700";
  checkOut += " 12:00:00%2B0700";

  
  const uri = "/booking/" + site_uuid + "/unit_type/" + room_type + "/unallocated_quantity?from_time=" + checkIn + "&to_time=" + checkOut;
  const options = {
    "async": true,
    "crossDomain": true,
    "method": "GET",
    "contentType": 'application/json',
    "headers": {
      "cache-control": "no-cache",
      "Authorization": "Bearer " + token
    },
  };

  let res = await fetch(url_apiShibaPortal + uri, options)
  .then((response) => response.json())
  .then((body) => {
    return body;
  });
  return res;
}






async function api_getUnitTypes(token, site_uuid) {
  const uri = "/site/" + site_uuid + "/unit_types";
  const options = {
    "async": true,
    "crossDomain": true,
    "method": "GET",
    "contentType": 'application/json',
    "headers": {
      "cache-control": "no-cache",
      "Authorization": "Bearer " + token
    },
  };

  let res = await fetch(url_apiShibaPortal + uri, options)
  .then((response) => response.json())
  .then((body) => {
    return body;
  });
  return res;
}



async function api_checkin(token, site_uuid, booking_uuid, data) {

  //  data = {
  //   person_info:{
  //     phone_number:"1234567899"
  //   },
  //   identity_document_data:{
  //     tax_id:"1102200112740",
  //     thfullname:"สุดท้าย อ่อนน่วม",
  //     fullname:"Sudtay Onnuam",
  //     birth:"1993-11-16",
  //     gender:"1",
  //     issuer:"อำเภอปักธงชัย/นครราชสีมา",
  //     issue:"2023-11-26",
  //     expire:"2015-10-15",
  //     address:"114/249-250,หมู่ที่ 3,ตำบลหนองจะบก,อำเภอเมืองนครราชสีมา,จังหวัดนครราชสีมา",
  //     }
  // }
  //  token = await api_request_token("Kiosk_shiba", "app-SUT", "7I1fsMNyD7SC8pFxkJkv");
  // console.log(token);
  // // token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImIyZWZkMjZhLTExNGYtNDVkYi05ODA0LTRiY2IxNzIyZmMwYSIsImlzcyI6IjgxYzE2MDQ0LTExZmYtNDZkZi1iOTMxLWExNjU5NzJjNmJhNiIsImRldmljZV9pZCI6ImRldmljZV9qYWtlIiwiY29uc3VtZXIiOnsidXNlcm5hbWUiOiJzeXN0ZW0ifSwidmFsIjoiZ0FBQUFBQmtHMExpLUVienloUk4zc1lOdG1odENEX3JIRW5JdGdrWE1SSmlMdmZUZ1hwU2xIV3RPOXRNVHpzM1pvRlRYcUd2azc2Mi1la2hpSDVIMnZ5eVVVVlJQZU5BbW00UlNSOXFjMlYybzAwSGhSSWluOVRucW9TdXlUWEZXNmx4S3RnQ2hEU0RCMEg1aUJwVE9SaHNHcXk1NkFtS0YyNVlWbnJoQXg1NjVxdTlPcWgtN1lHai14OUJWLUotVVNhaDlId09wQm9EZGJZa2x6UmFBdnVVT3ZkeG0yaEh5dEVuWkszV3ppN0Ziek1WaVZKMTJjT25kNUVVMFQ2MnBEeUdacF9CczhoNENNTUNLTEVqQUxjekYtRGd0RlBXRnpYbXZqTGlzLWtpNEo2U3VkNzBhNXc9IiwiZXhwIjoxNjc5NTExNzk0fQ.ezvLavGBUWzV0FJEQlCSAXpDaF0wJ9P4_EoYcXCqdGM';
  // // token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImUzNWMwMWJhLTliNzEtNDQ1Ny1hZWZkLTcxYTdkMGIyZTg3ZiIsImlzcyI6Ijc3ODM5MWQ3LTBjY2MtNGVhMS1iN2I2LTEwOTE1ZmY4NTdmYiIsImRldmljZV9pZCI6ImRldmljZV9hYmMiLCJjb25zdW1lciI6eyJ1c2VybmFtZSI6InN5c3RlbSJ9LCJ2YWwiOiJnQUFBQUFCa0d6MnJiU1Z4VkxoYkpCLTJuQkhRSmNLVTUyZGtTcGkyWXhtNXVPak9tUzhza2E3Q2dSX1R6aVB3S2g5WERLMVlSamRSV3lnZHlCa3Ztd2xubXp3LV9maXdYRGV0Xzh4V3hiWWNRN3ZIWWgyNldHNHdwd2R0bjZZaVB2QkM0NXFRenlDNnU0Y2l5S0dqaWVvSUVhbkFfRjQ0dFphdlU0NF9fcmJWR1hJLVp0bGFzSDVCWS10b0R5bVhMNXhya2txZFB3RUwxWExJdUFsN3BTSjVDbnEwY0t4NFVxM1FFWGdoejRfZ3FSZER6MUJHajNDdG1nNlkxYmVGWnJZSWVjYkZXMHR0aFhNMDRSemltdnZzVUNzTktpRl9BcW1WNDZWWU9xQlB5OFJ5dzUzQVpnYz0iLCJleHAiOjE2Nzk1MTA0NTl9.AMVLxQ-L_F92lZgC1rBNlmZsrDaW5MCCBu6RvRFVM6w';
  //  site_uuid = '798af4ba-8758-4a89-a0e9-8ba178b687cb'; //SUT
  // // site_uuid = 'a0d07ab1-0af1-4ea0-b7f4-42a0e58a556e'; //Demo
  // // booking_uuid = '82555bbb-6f65-4f0d-98a1-e38654200153';
  //  booking_uuid = '140b1945-3ef8-4485-81ec-02dacd533272';

  const uri = '/occupancy/' + site_uuid + '/booking/' + booking_uuid + '/checkin';
  const options = {
    async: true,
    crossDomain: true,
    method: "POST",
    headers: {
      "Content-Type": 'application/json',
      "cache-control": "no-cache",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify(data)
  };

  console.log(url_apiShibaPortal + uri, options);
  let res = await fetch(url_apiShibaPortal + uri, options)
  .then((response) => response.json())
  .then((body) => {
    return body;
  });
  console.log('>>>', res);
  return res;
}







async function api_checkOut(token, site_uuid, booking_uuid) {

  console.log(site_uuid, booking_uuid);

  const uri = '/occupancy/' + site_uuid + '/booking/' + booking_uuid + '/checkout';
  const options = {
    "async": true,
    "crossDomain": true,
    "method": "POST",
    "contentType": 'application/json',
    "headers": {
      "cache-control": "no-cache",
      "Authorization": "Bearer " + token
    },
    // "body": JSON.stringify(data)
  };

  let res = await fetch(url_apiShibaPortal + uri, options)
  .then((response) => response.json())
  .then((body) => {
    return body;
  });
  return res;
}







async function update_passcode(token, site_uuid, room_uuid, roomPassword) {

  const uri = '/site/' + site_uuid + '/unit/' + room_uuid + '/update_passcode';
  var options = {
    "async": true,
    "crossDomain": true,
    "method": "POST",
    "contentType": 'application/json',
    "headers": {
      "cache-control": "no-cache",
      "Authorization": "Bearer " + token
    },
    'payload': JSON.stringify({"passcode": roomPassword.toString()})
  };

  let res = await fetch(url_apiShibaPortal + uri, options)
  .then((response) => response.json())
  .then((body) => {
    return body;
  });
  return res;
}





async function get_passcode(token, site_uuid, room_uuid) {
  const uri = '/site/' + site_uuid + '/unit/' + room_uuid + '/passcode';
  const options = {
    "async": true,
    "crossDomain": true,
    "method": "GET",
    "contentType": 'application/json',
    "headers": {
      "cache-control": "no-cache",
      "Authorization": "Bearer " + token
    },
  };

  let res = await fetch(url_apiShibaPortal + uri, options)
  .then((response) => response.json())
  .then((body) => {
    return body;
  });
  return res;
}






async function get_DailyPrice(token, site_uuid, room_uuid, from_date, to_date) {

  // token = await api_request_token("Kiosk_shiba", "app-DEMO", "53OkPEkzILya1O23XZsd"); //Demo

  // site_uuid = 'a0d07ab1-0af1-4ea0-b7f4-42a0e58a556e'; //Demo
  //  room_uuid = '369fc09f-f11c-4b26-82ab-9a1ab0f2ca33';
  //  from_date = '2023-01-01';
  //  to_date = '2023-01-30';
  var kiosk_uuid ='9728b011-6fe6-4564-b8a7-f05ce4e67bb3';

  // console.log('token = ', token , '\nkiosk_uuid = ', kiosk_uuid , '\nsite_uuid = ', site_uuid, '\nroom_uuid = ', room_uuid, '\nfrom_date = ', from_date, '\nto_date = ', to_date)

  const uri = '/channelsite/'  + site_uuid + '/channel/' + kiosk_uuid + '/unit_type/' + room_uuid + '/get_daily_prices?from_date=' + from_date + '&to_date=' + to_date ;
  const options = {
    "async": true,
    "crossDomain": true,
    "method": "GET",
    "contentType": 'application/json',
    "headers": {
      "cache-control": "no-cache",
      "Authorization": "Bearer " + token
    },
  };

  // console.log(url_apiShibaPortal + uri, options);

  let res = await fetch(url_apiShibaPortal + uri, options)
  .then((response) => response.json())
  .then((body) => {
    return body;
  });
  return res;
}




async function createBooking(token, dataJson) {


  dataJson = {
            checkIn:"2023-03-05",
            checkOut:"2023-03-06",
            bookingID:"123456789",
            // channelUUID:"9728b011-6fe6-4564-b8a7-f05ce4e67bb3",
            channelUUID:"1051eec7-b48b-4c4e-abc7-b9d61e6eb8cd",
            from:"SHIBA_KIOSK",
            roomType_uuid:"369fc09f-f11c-4b26-82ab-9a1ab0f2ca33",
            fullPrice:"550",
            occupancy:"1",
            customerName:"sudtay onnuam",
            email:"",
            phone:"0875675578",
            datePay:"2023/03/05",
            branch_uuid:"a0d07ab1-0af1-4ea0-b7f4-42a0e58a556e"
  }

 
console.log(token);
console.log(dataJson);

// dataJson = JSON.parse(dataJson);

var check_in =  dataJson['checkIn'] + " 14:00:00+07:00";
var check_out =  dataJson['checkOut'] + " 11:59:59+07:00";


let data = {
  "booking": {
      "external_booking_id": dataJson['bookingID'],
      "sales_channel_uuid": dataJson['channelUUID'],
      "sales_channel_info": {
        "sales_channel_code": dataJson['from'],
        "sales_channel_name": dataJson['from']
      },
      "currency_code": "THB",
      "from_timestamp": check_in,
      "to_timestamp": check_out,
      "booking_lines": [
        {
          "unit_type_uuid": dataJson['roomType_uuid'],
          // "unit_type_info": {
            // "unit_type_code": "STANDARD",
            // "unit_type_name": "Standard",
            // "max_guests": 2,
            // "features": { "Bed": "1 bed" }
            // },
            "unit_price": dataJson['fullPrice'],
            "quantity": dataJson['occupancy'],
          "addon": [
            // { "item": "extra_bed", "qty": 1, "amount": 150 },
            // { "item": "flex", "qty": 1, "amount": 100 }
          ]
        }
      ],
      "booking_person_info": {
        "fullname": dataJson['customerName'],
        "email": dataJson['email'],
        "tax_id": null,
        "phone": dataJson['phone']
      },
      "note": ""
    },
    "payment": {
      "payment_reference": "PORTAL_BOOKING",
      "payment_type_code": "CREDIT_CARD",
      "total_amount": dataJson['fullPrice'],
      "currency_code": "THB",
      "is_paid": true,
      "paid_at": dataJson['datePay'] + " 14:00:00+07:00"
    }
  };
  

  console.log(data);

  
  

  
  

  
  const uri = "/booking/" + dataJson['branch_uuid'] + "/create_booking";
  var options = {
    "async": true,
    "crossDomain": true,
    "method": "POST",
    "contentType": 'application/json',
    "headers": {
      "cache-control": "no-cache",
      "Authorization": "Bearer " + token
    },
    'payload': JSON.stringify(data)
  };

  let res = await fetch(url_apiShibaPortal + uri, options)
  .then((response) => response.json())
  .then((body) => {
    return body;
  });
  return res;
}



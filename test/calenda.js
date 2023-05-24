

function showCalendar(day) {
  var calendar = document.getElementById("calendar");
  if (calendar.style.display === "none") {
    calendar.style.display = "block";
  } else {
    calendar.style.display = "none";
  }
}

function chooseDate(day, month_, year_) {
  day = changeToTwoDigi(day);
  month_ = changeToTwoDigi(month_);

  var btn = document.getElementById("btnDate");
  btn.innerHTML = "Selected Date: " + day + "/" + month_ + "/" + year_;
  var calendar = document.getElementById("calendar");
  calendar.style.display = "none";
}

function changeToTwoDigi(number) {
  // number = number.toString;

  console.log("length = " + number.toString().length);

  if (number < 10) {
    return "0" + number.toString();
  } else {
    return number.toString();
  }
}

var whichMonth = 0;

var day_choose;
var month_choose;
var year_choose;

function nextMonth() {
  whichMonth++;
  showDayInCalendar(whichMonth);
}
function lastMonth() {
  whichMonth--;
  showDayInCalendar(whichMonth);
}

showDayInCalendar(0);

function showDayInCalendar(whichMonth_) {
  if (whichMonth_ < 0) {
    whichMonth, (whichMonth_ = 0);
  }
  console.log("whichMonth_ = " + whichMonth_, whichMonth);

  var today = new Date();

  var month_raw = today.getMonth() + whichMonth_;
  month = month_raw % 12; //จะทำให้เลขที่เกิน 12 วนกลับมานับ 0 ใหม่
  month_choose = month + 1;
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  year = today.getFullYear() + Math.floor(month_raw / 12);
  year_choose = year;

  document.getElementById("calendar")
  document.getElementById("nameMonthOnCalenda").innerText =
    monthNames[month] + " " + year;

  var daysInMonth = new Date(year, month + 1, 0).getDate();
  var firstDay = new Date(year, month, 1).getDay();
  var dates = [];

  var elementHtml = "";

  // console.log("today = " + today.getDate());
  // console.log("firstDay = " + firstDay);

  for (var i = 1; i <= daysInMonth; i++) {
    dates.push(i);
  }

  var sortedDates = dates.sort(function (a, b) {
    return a - b;
  });
  // console.log('sortedDates = ' + sortedDates);

  for (var i = 0; i < firstDay; i++) {
    //   document.write("<td></td>");
    elementHtml += "<td></td>";
  }

  for (var i = 0; i < sortedDates.length; i++) {
    console.log("month_choose = " + month_choose);

    elementHtml +=
      '<td onclick="chooseDate(' +
      sortedDates[i] +
      "," +
      month_choose +
      "," +
      year_choose +
      ')">' +
      sortedDates[i] +
      "</td>";

    if ((firstDay + i + 1) % 7 == 0) {
      elementHtml += "</tr><tr>";
    }
  }

  for (var i = 0; i < 7 - ((firstDay + daysInMonth) % 7); i++) {
    elementHtml += "<td></td>";
  }

  // console.log("elementHtml = " + elementHtml);
  document.getElementById("day_on_calenda").innerHTML = elementHtml;
}

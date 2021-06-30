///
/// this is a function to get the week number of the month (range 1-6) of the given date string
// taken from this stack overflow
// https://stackoverflow.com/questions/55163345/get-week-number-of-the-month-from-date-weeks-starting-on-mondays

// dateString is format "YYYY-MM-DD"
const getWeekOfMonth = (dateString) => {
  console.log("getWeekOfMonth started -> " + dateString);
  let [year, month, day] = dateString.split("-"); // parse date string
  let date = new Date(year, month - 1, day); // create a date object
  date.setDate(day - ((date.getDay() + 6) % 7)); // adjust date to previous monday
  let weekOfMonth = Math.ceil(date.getDate() / 7); // return week number of the month
  console.log("...returning weekOfMonth = " + weekOfMonth);
  return weekOfMonth;
};

/// this function takes a dateString in format "YYYY-MM-DD" and returns a string of the form
/// Wed (07/30)
const getDisplayDate = (dateString) => {
  let d = new Date(dateString + " (CDT)");
  let dayOfWeek = d.getDay();
  let day = d.getDate();
  let month = d.getMonth() + 1;

  //convert day of week to string
  let dayOfWeekLong = "";
  switch (dayOfWeek) {
    case 0:
      dayOfWeekLong = "Sun";
      break;
    case 1:
      dayOfWeekLong = "Mon";
      break;
    case 2:
      dayOfWeekLong = "Tue";
      break;
    case 3:
      dayOfWeekLong = "Wed";
      break;
    case 4:
      dayOfWeekLong = "Thu";
      break;
    case 5:
      dayOfWeekLong = "Fri";
      break;
    case 6:
      dayOfWeekLong = "Sat";
      break;
    default:
      dayOfWeekLong = "Unknown";
      break;
  }

  let returnObject = {
    day_of_week: dayOfWeekLong,
    month_day: month.toString() + "/" + day.toString(),
  };
  console.log("date string -> ", dateString);
  console.log("return object -> ", returnObject);

  return returnObject;
};

module.exports = {
  getDisplayDate,
  getWeekOfMonth,
};

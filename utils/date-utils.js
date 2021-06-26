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

module.exports = getWeekOfMonth;

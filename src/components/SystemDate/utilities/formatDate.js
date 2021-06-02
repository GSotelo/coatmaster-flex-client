const months = [
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

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

export const formatDate = (date) => {
  if (date instanceof Date) {
    const weekdayName = days[date.getDay()];
    const weekdayNumber = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
    return (
      {
        weekdayNumber: weekdayNumber,
        weekdayName: weekdayName,
        month: month,
        year: year,
        hours: hours,
        minutes: minutes,
        seconds: seconds
      }
    );
  }
  return;
}


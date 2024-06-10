export const convertDate = (date) => {
  const originalDate = new Date(date);
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const day = originalDate.getUTCDate();
  const month = months[originalDate.getUTCMonth()];
  const year = originalDate.getUTCFullYear();
  const formattedDateString = `${day} ${month} ${year}`;
  return formattedDateString;
};

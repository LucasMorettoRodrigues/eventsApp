export const isDate = function (date: string) {
  const convertedDate = new Date(date);
  return convertedDate.toString() === "Invalid Date" ? false : true;
};

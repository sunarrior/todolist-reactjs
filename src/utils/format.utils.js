export const getYYYYMMDDString = (time = new Date().getTime()) => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const monthStan = month > 9 ? month : `0${month}`;
  const day = date.getDate();
  const dayStan = day > 9 ? day : `0${day}`;
  return `${year}-${monthStan}-${dayStan}`;
};

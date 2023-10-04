export const getDate = (date: Date) =>
  `${date.getFullYear()}-${
    date.getUTCMonth() + 1 < 10
      ? `0${date.getUTCMonth() + 1}`
      : date.getUTCMonth() + 1
  }-${
    date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate()
  } ${date.getUTCHours()}:${
    date.getUTCMinutes() < 10
      ? `0${date.getUTCMinutes()}`
      : date.getUTCMinutes()
  }:${
    date.getUTCSeconds() < 10
      ? `0${date.getUTCSeconds()}`
      : date.getUTCSeconds()
  }`;

export const getYearDate = (date: Date) =>
  `${date.getFullYear()}-${
    date.getUTCMonth() + 1 < 10
      ? `0${date.getUTCMonth() + 1}`
      : date.getUTCMonth() + 1
  }-${date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate()}`;

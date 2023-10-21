export const getDate = (date: string) => new Date(date + "Z").toLocaleString();

export const getYearDate = (date: Date) =>
  `${date.getFullYear()}-${
    date.getUTCMonth() + 1 < 10
      ? `0${date.getUTCMonth() + 1}`
      : date.getUTCMonth() + 1
  }-${date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate()}`;

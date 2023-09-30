export const textAbstract = (
  txt: string,
  maxLength: number,
  shortenName?: boolean
) =>
  !shortenName || txt.length <= maxLength
    ? txt
    : `${txt.substring(0, maxLength)}...`;

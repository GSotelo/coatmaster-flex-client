import * as dayjs from "dayjs";
import * as utc from "dayjs/plugin/utc";
import * as isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import * as customParseFormat from "dayjs/plugin/customParseFormat";
import * as toObject  from "dayjs/plugin/toObject";
import * as isBetween from "dayjs/plugin/isBetween";
import * as duration from "dayjs/plugin/duration";

// Extend "dayjs" configuration to use plugins
dayjs.extend(utc);
dayjs.extend(isSameOrBefore);
dayjs.extend(customParseFormat);
dayjs.extend(toObject);

// Create "dayjs" object
export const createDateObject = (dateAsString, format) => {
  if(format){
    return dayjs(dateAsString, format);
  }
  return dayjs.utc(dateAsString);
};

export const formatDate = (dateAsString) => {
  const createTwoDigits = (el) => el <= 9 ? `0${el}` : el;
  
  const dayjs = createDateObject(dateAsString);
  const { $y, $M, $D, $H, $m, $s } = dayjs;

  // Format each date component
  const day = createTwoDigits($D);
  const month = createTwoDigits($M + 1);
  const hour = createTwoDigits($H);
  const minute = createTwoDigits($m);
  const second = createTwoDigits($s);

  // Format
  return `${day}.${month}.${$y} ${hour}:${minute}:${second}`;
};


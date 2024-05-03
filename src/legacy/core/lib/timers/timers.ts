import dayjs from 'dayjs';

import { numberToStringPadStart } from '../utilities/utilities';

export function timers(): string {
  return 'timers';
}

export function formatDateToShortStringRevert(date: Date): string {
  return (
    [numberToStringPadStart(date.getHours()), numberToStringPadStart(date.getMinutes())].join(':') +
    ' ' +
    [numberToStringPadStart(date.getMonth() + 1), numberToStringPadStart(date.getDate()), date.getFullYear()].join('/')
  );
}

export type TDateTime = dayjs.Dayjs;

export function getDateTimeObject(date) {
  return dayjs(date);
}

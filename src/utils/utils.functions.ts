import * as moment from 'moment';

export const setTimeZone = ({ value }) => moment(value).format();

export const setDateLocal = ({ value }) => {
  if (!value) return undefined;
  const data = moment(value).format('yyyy-MM-DD HH:mm:ss');
  if (data === 'invalid Date') return null;
  return data;
};

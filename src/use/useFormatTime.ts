import moment from 'moment';

export const useFormatTime = () => {
  /**
   * Formats the elapsed time into a string in the format of "hours:minutes:seconds".
   * @param elapsedTime - The elapsed time in milliseconds.
   * @returns The formatted elapsed time.
   */
  const formatElapsedTime = (elapsedTime: number): string => {
    const duration = moment.duration(elapsedTime);
    const hours = duration.hours();
    const formatted = moment(elapsedTime).format('mm:ss');
    return `${hours}:${formatted}`;
  };

  /**
   * Formats the timestamp into a string in the format of "YYYY-MM-DD".
   * @param timestamp - The timestamp in milliseconds.
   * @returns The formatted date.
   */
  const formatDate = (timestamp: number): string => {
    return moment(timestamp).format('YYYY-MM-DD');
  };

  return { formatElapsedTime, formatDate };
};

import months from '../../data/months';

export default function calculateDuration(start, end) {
  if (start && end) {
    // Duration
    const y = Math.floor((end.seconds - start.seconds) / 31536000);
    const m = Math.floor(((end.seconds - start.seconds) % 31536000) / 2628003);
    // Tooltip
    const dateStart = new Date(start.seconds * 1000);
    const yearStart = dateStart.getYear() + 1900;
    const monthStart = months[dateStart.getMonth()];
    const dateEnd = new Date(end.seconds * 1000);
    const yearEnd = dateEnd.getYear() + 1900;
    const monthEnd = months[dateEnd.getMonth()];
    // Return
    return {
      countYears: y,
      countMonths: m,
      yearStart,
      monthStart,
      yearEnd,
      monthEnd,
    };
  }
  // Case if event not finished yet (end does not exist)
  // Duration
  const now = Date.now();
  const today = Math.floor(now / 1000);
  const y = Math.floor((today - start.seconds) / 31536000);
  const m = Math.floor(((today - start.seconds) % 31536000) / 2628003);
  // Tooltip
  const dateStart = new Date(start.seconds * 1000);
  const yearStart = dateStart.getYear() + 1900;
  const monthStart = months[dateStart.getMonth()];
  // Return
  return {
    countYears: y,
    countMonths: m,
    yearStart,
    monthStart,
  };
}

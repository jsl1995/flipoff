import { GRID_COLS } from './constants.js';

const ZONES = [
  { label: 'UK', tz: 'Europe/London' },
  { label: 'NEW YORK', tz: 'America/New_York' },
  { label: 'CALIFORNIA', tz: 'America/Los_Angeles' },
  { label: 'JAPAN', tz: 'Asia/Tokyo' },
  { label: 'AUSTRALIA', tz: 'Australia/Sydney' },
];

/**
 * Generate a world-clock message for the flipboard.
 * Each row shows a location name (left) and current local time (right),
 * padded to exactly GRID_COLS characters so the board centres correctly.
 */
export function getTimeMessage() {
  const now = new Date();
  return ZONES.map(({ label, tz }) => {
    const time = now.toLocaleTimeString('en-US', {
      timeZone: tz,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).toUpperCase();
    const gap = GRID_COLS - label.length - time.length;
    return label + ' '.repeat(Math.max(1, gap)) + time;
  });
}

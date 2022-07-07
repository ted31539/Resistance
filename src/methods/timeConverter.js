export function toNormalTime(timestamp = new Date() / 1000) {
  const date = new Date(timestamp * 1000).toISOString();
  const [localDate] = date.split('T');
  return localDate;
}
export function toTimestamp(time) {
  const timestamp = (new Date(time).getTime() / 1000);
  return timestamp;
}

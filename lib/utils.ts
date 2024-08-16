export function formatToWon(price: number): string {
  return price.toLocaleString('ko-KR');
}

export function formatToTimeAgo(date: string): string {
  const dayInMs = 1000 * 60 * 60 * 24; //하루동안의 밀리초임
  const time = new Date(date).getTime(); //unix Epoch 의 밀리초를 제공
  const now = new Date().getTime();
  const diff = Math.round((time - now) / dayInMs);

  const formatter = new Intl.RelativeTimeFormat('ko');

  return formatter.format(diff, 'days');
}

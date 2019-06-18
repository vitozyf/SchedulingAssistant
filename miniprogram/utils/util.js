export function numTransformWeek(num) {
  let weekstr = '';
  switch (num) {
    case 0:
      weekstr = '日';
      break;
    case 1:
      weekstr = '一';
      break;
    case 2:
      weekstr = '二';
      break;
    case 3:
      weekstr = '三';
      break;
    case 4:
      weekstr = '四';
      break;
    case 5:
      weekstr = '五';
      break;
    case 6:
      weekstr = '六';
      break;
    default:
      break;
  }
  if (weekstr) {
    return `周${weekstr}`;
  }
  return '';
}

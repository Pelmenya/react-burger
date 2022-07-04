export const normalizeTotalCount = (count: number | undefined): string => {
  if (count) {
    const arr = String(count).split('').reverse();
    const arrResult: string[] = [];
    arr.forEach((item, index) => {
      if (!((index + 1) % 3)) {
        arrResult.push(item);
        arrResult.push(' ');
      } else arrResult.push(item);
    });
    return arrResult.reverse().join('');
  }
  return '';
};
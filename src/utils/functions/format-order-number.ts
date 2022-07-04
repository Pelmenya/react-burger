export const formatOrderNumber = (numOrder: string) => {
  let arrNumbers = numOrder.split('');
  while (arrNumbers.length < 6) {
    arrNumbers.unshift('0');
  }
  return arrNumbers.join('');
};

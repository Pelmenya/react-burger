export const getOrderStatus = (status: string): string => {
  switch (status) {
    case 'created':
      return 'Создан';
    case 'pending':
      return 'Готовится';
    case 'done':
      return 'Выполнен';
    default:
      return 'Отменен';
  }
};

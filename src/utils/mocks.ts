export const userMock = { email: 'mock@email.com', name: 'Fedya', password: 'password' };
export const errorMessageMock = 'Error';
export const errorMock = new Error(errorMessageMock);
export const ingredientMock = {
  _id: '60666c42cc7b410027a1a9b1',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0,
};

export const ingredientsIdsMock = [
  '60d3b41abdacab0026a733c7',
  '60d3b41abdacab0026a733cf',
  '60d3b41abdacab0026a733cc',
  '60d3b41abdacab0026a733c7',
];

const order = {
  createdAt: '2022-06-29T16:04:41.149Z',
  ingredients: [
    '60d3b41abdacab0026a733c7',
    '60d3b41abdacab0026a733cf',
    '60d3b41abdacab0026a733cc',
    '60d3b41abdacab0026a733c7',
  ],
  name: 'Антарианский флюоресцентный spicy бургер',
  number: 18717,
  status: 'done',
  updatedAt: '2022-06-29T16:04:41.319Z',
  _id: '62bc781942d34a001c271072',
};

export const orderMock = {
  order: { ...order },
};

export const tokenMock =
  '6e5d51905927cac103c69f7870eb455e510b9b51d0848ee276ec138021914a6d189737c7205f33ce';

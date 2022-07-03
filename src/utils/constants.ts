import * as yup from 'yup';

export const maxCountBuns = 2;
export const countIngredientsOfOrdersCard = 6;
export const maxCountOrdersInFeed = 10;

export const ERRORS = {
  ERROR_NAME: 'Кириллица c заглавной буквы, от 2 символов',
  ERROR_CODE: 'Более одного символа',
  ERROR_EMAIL: 'Неправильный формат email',
  ERROR_PASSWORD: 'Пароль должен быть не меньше 6 символов',
  ERROR_REQUIRED_FIELD: 'Это обязательное поле',
};

export const JWT_EXPIRED = 'Bad request: 403 : jwt expired'

export const schemaProfileForm = yup
  .object({
    name: yup.string().min(2).required().matches(/^[А-ЯЁ][а-яё]+(-[А-ЯЁ][а-яё]*)?$/),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })
  .required();

import { Title } from '../../components/title/title';

import notFoundPage from './not-found.module.css';

export const NotFoundPage = () => (
    <div className={notFoundPage.container}>
      <div className={notFoundPage.content}>
        <Title type='h1'>Oops! 404 Error</Title>
      </div>
    </div>
);

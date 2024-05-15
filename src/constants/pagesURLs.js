import * as pages from './pages';
import config from 'config';

const result = {
  [pages.defaultPage]: `${config.UI_URL_PREFIX}/${pages.defaultPage}`,
  [pages.login]: `${config.UI_URL_PREFIX}/${pages.login}`,
  [pages.secretPage]: `${config.UI_URL_PREFIX}/${pages.secretPage}`,
  [pages.gameListPage]: `${config.UI_URL_PREFIX}/${pages.gameListPage}`,
  [pages.gameDetailsPage]: `${config.UI_URL_PREFIX}/${pages.gameDetailsPage}/:id`,
};

export default result;

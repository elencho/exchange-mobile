import store from '../redux/store';
import { saveGeneralError } from '../redux/profile/actions';
import { navigationRef } from '../navigation';
import { refreshToken } from './userProfileUtils';

export default async (err) => {
  if (err.response) {
    console.log(err.response.data);
    console.log(err.response.status);
    console.log(err.response.headers);

    if (err.response.status === 500)
      store.dispatch(saveGeneralError(err.response.data.errorMessage));
    if (err.response.status === 401) {
      const route = await refreshToken(err.config);
      if (route === 'Welcome') navigationRef.navigate(route);
    }
  } else if (err.request) {
    console.log(err.request);
  } else {
    console.log(err.message);
  }
  console.log(err.config);
};

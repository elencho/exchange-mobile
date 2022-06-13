import store from '../redux/store';
import { saveGeneralError } from '../redux/profile/actions';
import { navigationRef } from '../navigation';
import { refreshToken } from './userProfileUtils';

export default async (err) => {
  const {
    response: { status, headers },
    request,
    message,
    config,
  } = err;

  if (err.response) {
    console.log(err.response.data);
    console.log(status);
    console.log(headers);

    if (status === 500)
      store.dispatch(saveGeneralError(err.response.data.errorMessage));
    if (status === 401) {
      const route = await refreshToken(config);
      if (route === 'Welcome') navigationRef.navigate(route);
    }
  } else if (request) {
    console.log(request);
  } else {
    console.log(message);
  }
  console.log(config);
};

import store from '../redux/store';
import { saveGeneralError } from '../redux/profile/actions';

export default (err, name) => {
  if (err.response) {
    console.log(err.response.data);
    console.log(err.response.status);
    console.log(err.response.headers);
    if (err.response.status === 500) {
      store.dispatch(saveGeneralError(err.response.data.errorMessage));
    }
  } else if (err.request) {
    console.log(err.request);
  } else {
    console.log(err.message);
  }
  console.log(err.config);
  console.log(`Error in ${name}`);
};

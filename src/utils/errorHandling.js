export default (err, name) => {
  if (err.response) {
    console.log(err.response.data);
    console.log(err.response.status);
    console.log(err.response.headers);
  } else if (err.request) {
    console.log(err.request);
  } else {
    console.log(err.message);
  }
  console.log(err.config);
  console.log(`Error in ${name}`);
};

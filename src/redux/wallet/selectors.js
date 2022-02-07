export const getUserData = (state) => {
  const {
    profile: { userInfo },
  } = state;

  let formData = new FormData();
  formData.append('firstName', userInfo.firstName);
  formData.append('lastName', userInfo.lastName);
  formData.append('address', userInfo.address);
  formData.append('country', userInfo.countryCode);
  formData.append('city', userInfo.city);
  formData.append('postalCode', userInfo.postalCode);
  // formData.append('citizenship', userInfo.citizenship);

  return formData;
};

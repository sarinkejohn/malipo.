/* eslint-disable arrow-body-style */
export const getError = (error) => {
  return error.res && error.res.data.massage
    ? error.res.data.massage
    : error.massage;
};

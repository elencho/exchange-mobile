export const validateScale = (input, scale) => {
  if (!input) return true;

  const isNumber = (input * 1).toString() !== 'NaN';

  if (isNumber) {
    if (input.split('.').length === 2) {
      return input.split('.')[1].length <= scale;
    }
    if (!input.includes('.')) {
      return true;
    }
  }
  return false;
};

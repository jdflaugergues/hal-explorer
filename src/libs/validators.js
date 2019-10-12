const JSONValidator = (headers) => {
  if (!headers) {
    return true;
  }
  let isValid = true;
  try {
    JSON.parse(headers);
  } catch (e) {
    isValid = false;
  }
  return isValid;
}

export {
  JSONValidator
};

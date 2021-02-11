export function checkRegexPhone(value) {
  return (/^[0-9 ()+-]+$/.test(value)) ? true : false;
}

export function checkLengthPhone(value) {
  const phoneLength = value.replace(/\D/g, '');
  return phoneLength.length == 11 ? true : false;
}
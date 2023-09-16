export function truncateString(text, maxLength) {
  return text.slice(0, maxLength) + "...";
}

export function isValidAge(age) {
  const ageRegex = /^(?:[1-9][0-9]?|100)$/;

  return ageRegex.test(age);
}

export function isNameValid(age) {
  const nameRegex = /^[A-Za-z\s-']+$/;

  return nameRegex.test(age);
}

export function getValidTextArea(textarea){
  const maxLength = 100;
  if(maxLength - textarea.length < 0){
    // input textarea length exceeds max length
    return textarea.slice(0, maxLength);
  }
  return textarea;
}
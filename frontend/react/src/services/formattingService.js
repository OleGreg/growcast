//src/services/formattingService.js

export function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}

export function millimetersToInches(number) {
  return Math.round((number / 25.4) * 100) / 100;
}
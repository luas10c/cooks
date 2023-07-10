/** @type{import('lint-staged').Config}*/
module.exports = {
  '*.{ts,js}': ["eslint \"src/**\" --config .eslintrc.cjs --ext ts --fix"]
}
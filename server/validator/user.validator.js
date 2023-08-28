const validator = require("validator").default;

function validateInstagramUsername(username) {
  const trimmedUsername = username.trim();
  return (
    trimmedUsername.length > 0 &&
    validator.isAlpha(trimmedUsername.charAt(0)) &&
    validator.isAlphanumeric(trimmedUsername.replace("_", "")) &&
    validator.isLength(trimmedUsername, { min: 2, max: 30 })
  );
}

function validateEmail(email) {
  const trimEmail = email.trim();
  return (
    trimEmail.length > 0 &&
    validator.isEmail(trimEmail) &&
    validator.isLength(trimEmail, { min: 2, max: 30 })
  );
}

function validateWebsite(website) {
  const trimWebsite = website.trim();
  return (
    trimWebsite.length > 0 &&
    validator.isURL(trimWebsite) &&
    validator.isLength(trimWebsite, { min: 5, max: 40 })
  );
}

function validateBio(bio) {
  return validator.isLength(bio, { min: 1, max: 150 });
}

module.exports = {
  validateInstagramUsername,
  validateBio,
  validateWebsite,
  validateEmail,
};

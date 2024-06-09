// export function validateCredentials({
//   enteredEmail,
//   enteredPassword,
//   enteredSubdomain,
// }) {
//   enteredEmail = enteredEmail.trim();
//   enteredPassword = enteredPassword.trim();
//   enteredSubdomain = enteredSubdomain.trim();

//   const emailIsValid = enteredEmail.includes("@");
//   const passwordIsValid = enteredPassword.length > 6;
//   const subdomainIsValid = enteredSubdomain.length > 0;
//   return {
//     enteredEmail: emailIsValid,
//     enteredPassword: passwordIsValid,
//     enteredSubdomain: subdomainIsValid,
//     // Add more fields as needed
//   };
// }

export function validateCredentials(credentials) {
  const { enteredEmail, enteredPassword, enteredSubdomain, ...rest } =
    credentials;

  // Ensure these fields are trimmed
  const email = enteredEmail?.trim();
  const password = enteredPassword?.trim();
  const subdomain = enteredSubdomain?.trim();

  // Validate the necessary fields
  const emailIsValid = email ? email.includes("@") : false;
  const passwordIsValid = password ? password.length > 6 : false;
  const subdomainIsValid = subdomain ? subdomain.length > 0 : false;

  // Optionally, add validation for other fields from rest
  const additionalValidations = Object.keys(rest).reduce((acc, key) => {
    acc[key] = !!rest[key]; // Simple validation: checks if the field is truthy
    return acc;
  }, {});

  return {
    enteredEmail: emailIsValid,
    enteredPassword: passwordIsValid,
    enteredSubdomain: subdomainIsValid,
    ...additionalValidations, // Spread additional validations if needed
  };
}

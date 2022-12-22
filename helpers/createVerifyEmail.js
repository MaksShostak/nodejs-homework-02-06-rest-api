require("dotenv").config();
const { BASE_URL } = process.env;

const createVerifyEmail = (email, verificationToken) => {
  const verifyEmail = {
    to: email,
    subject: "Сonfirmation of registration",
    html: `<a target="_blank" href = "${BASE_URL}/api/users/verify/${verificationToken}"> Сlick here to confirm registration</a>`,
  };
  return verifyEmail;
};
module.exports = createVerifyEmail;

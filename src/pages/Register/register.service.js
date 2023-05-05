import Joi from "joi";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

import { auth } from "../../config/firebase.config";
import commonConstant from "../../constant/common.constant";
import registerConstant from "../../constant/register.constant";

async function createUser(registerInfo) {
  const { email, password, repeatPassword } = registerInfo;

  // Check if repeat password match provide password
  if (password.localeCompare(repeatPassword) !== 0) {
    throw new Error(registerConstant.PASSWORD.REPEAT_PASSWORD_NOT_MATCH);
  }

  // Validate password requirement
  const validateSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }),
    password: Joi.string().pattern(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&]).{8,}$/m
    ),
  });

  try {
    await validateSchema.validateAsync({ email, password });
  } catch (error) {
    let msg = "";
    switch (error.details[0].context.key) {
      case "email":
        msg = registerConstant.EMAIL_INVALID;
        break;
      case "password":
        msg = registerConstant.PASSWORD.PASSWORD_NOT_MATCH_REQUIREMENT;
        break;
      default:
        msg = commonConstant.SOMETHING_WENT_WRONG;
        break;
    }
    throw new Error(msg);
  }

  // Process register account to firebase
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const { user } = userCredential;

  try {
    sendEmailVerification(user);
  } catch (error) {
    throw new Error(error.message);
  }

  return registerConstant.REGISTER_SUCCESSFUL;
}

export { createUser };

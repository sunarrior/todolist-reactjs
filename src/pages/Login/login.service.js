import Joi from "joi";
import { signInWithEmailAndPassword } from "@firebase/auth";

import { auth } from "../../config/firebase.config";
import commonConstant from "../../constant/common.constant";
import loginConstant from "../../constant/login.constant";

async function authUser(loginInfo) {
  const { email, password } = loginInfo;

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
        msg = commonConstant.EMAIL_INVALID;
        break;
      case "password":
        msg = loginConstant.WRONG_PASSWORD;
        break;
      default:
        msg = commonConstant.SOMETHING_WENT_WRONG;
        break;
    }
    throw new Error(msg);
  }

  // Process login account to firebase
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uobj = {
      email,
      access_token: userCredential.user.accessToken,
      expiration_time: userCredential.user.stsTokenManager.expirationTime,
      refresh_token: userCredential.user.refreshToken,
    };
    return uobj;
  } catch (error) {
    throw new Error(error.message);
  }
}

export { authUser };

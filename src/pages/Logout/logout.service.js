import { signOut } from "firebase/auth";

import { auth } from "../../config/firebase.config";

async function logoutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(error.message);
  }
}

export { logoutUser };

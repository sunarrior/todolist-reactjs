import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

async function CreateUser(email, password) {
  const auth = getAuth();
  const userCredential = createUserWithEmailAndPassword(auth, email, password);
  const { user } = userCredential;
  user.sendEmailVerification();
}

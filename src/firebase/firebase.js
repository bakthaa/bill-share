import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const COLL_BILLING = "billing";
const COLL_PERSON = "person";
const COLL_TYPE = "eType";

const config = {
  apiKey: process.env.G_API_KEY,
  authDomain: process.env.G_AUTH_DOMAIN,
  databaseURL: process.env.G_DATABASE_URL,
  projectId: process.env.G_PROJECT_ID,
  storageBucket: process.env.G_STORAGE_BUCKET,
  messagingSenderId: process.env.G_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);
const db = firebase.firestore();
const auth = firebase.auth();

export const getAllPersons = () => db.collection(COLL_PERSON).get();

export const savePersonName = name => db.collection(COLL_PERSON).add(name);

export const saveExpenseType = name => db.collection(COLL_TYPE).add(name);

export const getAllExpenseTypes = () => db.collection(COLL_TYPE).get();

export const getAllBillings = () => db.collection(COLL_BILLING).get();

export const saveBilling = bill => db.collection(COLL_BILLING).add(bill);

export const doLogin = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);
//
// export const doLogin = (email, password) =>
//   auth
//     .setPersistence(firebase.auth.Auth.Persistence.SESSION)
//     .then(() => auth.signInWithEmailAndPassword(email, password));

import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { creds } from "./creds.js";

//Connects to our firebase PROJECT
initializeApp({
    credential: cert (creds)
});

export default getFirestore() //connects to our db
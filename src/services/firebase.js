// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  getDocs,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxAJ0fjIIIArPvh44bZoxxGmuC-wMvtVM",
  authDomain: "mayabazaar-bc9de.firebaseapp.com",
  databaseURL: "https://mayabazaar-bc9de-default-rtdb.firebaseio.com",
  projectId: "mayabazaar-bc9de",
  storageBucket: "mayabazaar-bc9de.appspot.com",
  messagingSenderId: "743901376780",
  appId: "1:743901376780:web:49d9cdfb67f12b4dd55929",
  measurementId: "G-E9HZDZFYYG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//create a function to get the orders from firebase where restaurantId is mayabazaar_1

export async function getAllOrders() {
  const citiesRef = collection(db, "orders");

  const restaurantOrders = query(
    citiesRef,
    where("status", "!=", "orderDelivered"),
    where("restaurantId", "==", "mayabazaar_1")
  );

  const querySnapshot = await getDocs(restaurantOrders);

  return querySnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
}

// create a function to update the restaurantId of all orders to mayabazaar_1
export async function updateRestaurantId() {
  //   const citiesRef = collection(db, "orders");
  //   const restaurantOrders = query(
  //     citiesRef,
  //     where("restaurantId", "==", "mayabazaar_1")
  //     // where("status", "==", "orderPlaced")
  //   );
  //   const querySnapshot = await getDocs(restaurantOrders);
  //   querySnapshot.docs.map((doc, i) => {
  //     if (i % 2 === 0) {
  //       updateDoc(doc.ref, { status: "orderPlaced" });
  //     } else {
  //       updateDoc(doc.ref, { status: "orderDelivered" });
  //     }
  //   });
}

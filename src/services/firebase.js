// Import the functions you need from the SDKs you need
import { ORDER_STATUS } from "@/constants/constants";
import { initializeApp } from "firebase/app";
import { getDoc, getFirestore } from "firebase/firestore";
import {
  collection,
  getDocs,
  updateDoc,
  query,
  where,
  onSnapshot,
  doc,
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

export async function getAllOrders(setOrders, setIncomingOrders) {
  const citiesRef = collection(db, "orders");

  const restaurantOrders = query(
    citiesRef,
    where("status", "!=", "orderDelivered"),
    where("restaurantId", "==", "qhEcTTJtAI7Lo8NqWHhS")
  );

  onSnapshot(restaurantOrders, (doc) => {
    doc.docChanges().forEach((change) => {
      if (change.type === "added") {
        let data = doc.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        let incomingordersData = [];
        let currentOrders = [];

        data.map((order) => {
          if (order.status === "orderPlaced") {
            incomingordersData.push(order);
          } else {
            currentOrders.push(order);
          }
        });
        setIncomingOrders(incomingordersData);
        setOrders(currentOrders);
      }
    });
  });

  const querySnapshot = await getDocs(restaurantOrders);

  return querySnapshot.docs.map((doc) => {
    console.log("snapping");
    return { ...doc.data(), id: doc.id };
  });
}

export const updateOrderStatus = async (orderId, status, callBack) => {
  const order = doc(db, "orders", orderId);
  if (status === ORDER_STATUS.ORDER_ACCEPTED) {
    const currentEpoch = Math.floor(new Date().getTime() / 1000.0);

    let res = await updateDoc(order, {
      status: status,
      accepted_timestamp: currentEpoch,
    }).then(() => {
      callBack();
    });

    console.log("res", res);
    return res;
  }

  let res = await updateDoc(order, { status: status }).then(() => {
    callBack();
  });

  console.log("res", res);
  return res;
};

// create a function to update the restaurantId of all orders to mayabazaar_1
export async function updateRestaurantId() {
  // const citiesRef = collection(db, "orders");
  // const restaurantOrders = query(
  //   citiesRef,
  //   where("restaurantId", "==", "mayabazaar_1")
  //   // where("status", "==", "orderPlaced")
  // );
  // const querySnapshot = await getDocs(restaurantOrders);
  // querySnapshot.docs.map((doc, i) => {
  //   console.log("snapping1");
  //   // if (i % 2 === 0) {
  //   //   updateDoc(doc.ref, { status: "orderPlaced" });
  //   // } else {
  //     updateDoc(doc.ref, { dunzoStatus: "deliveryNotAssigned" });
  //   // }
  // });
}

export async function getOrderById(orderId) {
  const order = doc(db, "orders", orderId);
  const docSnap = await getDoc(order);
  
  return { ...docSnap.data(), id: docSnap.id};
}

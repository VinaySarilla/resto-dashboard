"use client";

import { getAllOrders, updateRestaurantId } from "../services/firebase";
import { useEffect, useState } from "react";
import OrderCard from "@/components/OrderCard";
export default function Home() {
  // let orders = [
  //   {
  //     customerInfo: {
  //       name: "Ravi",
  //       number: 9999999999,
  //       address: "aaaa",
  //     },
  //     orderInfo: {
  //       items: [
  //         {
  //           quantity: 1,
  //           title: "Mushroom Manchuria",
  //         },
  //         {
  //           quantity: 1,
  //           title: "Paneer 65",
  //         },
  //         {
  //           quantity: 1,
  //           title: "Mushroom 65",
  //         },
  //       ],
  //       finalPrice: 2222,
  //       id: "MBK001",
  //       createdAt: "09.27PM",
  //     },
  //     status: "orderPlaced",
  //   },
  //   {
  //     customerInfo: {
  //       name: "Ravi",
  //       number: 9999999999,
  //       address: "aaaa",
  //     },
  //     orderInfo: {
  //       items: [
  //         {
  //           quantity: 1,
  //           title: "Mushroom Manchuria",
  //         },
  //       ],
  //       finalPrice: 2222,
  //       id: "MBK001",
  //       createdAt: "09.27PM",
  //     },
  //     status: "orderPlaced",
  //   },

  //   {
  //     customerInfo: {
  //       name: "Ravi",
  //       number: 9999999999,
  //       address: "aaaa",
  //     },
  //     orderInfo: {
  //       items: [
  //         {
  //           quantity: 1,
  //           title: "Mushroom Manchuria",
  //         },
  //         {
  //           quantity: 1,
  //           title: "Mushroom 65",
  //         },
  //         {
  //           quantity: 1,
  //           title: "Mushroom Manchuria",
  //         },
  //         {
  //           quantity: 1,
  //           title: "Mushroom Manchuria",
  //         },
  //       ],
  //       finalPrice: 2222,
  //       id: "MBK001",
  //       createdAt: "09.27PM",
  //     },
  //     status: "orderPlaced",
  //    dunzoInfo:{
  //      name:"Ravi",
  //  status:"orderPlaced",
  //}
  //   },
  // ];

  const [incomingorders, setIncomingOrders] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    let ordersData = await getAllOrders(setOrders, setIncomingOrders);
    let incomingordersData = [];
    let currentOrders = [];
    updateRestaurantId();
    console.log(orders);
    ordersData.map((order) => {
      if (order.status === "orderPlaced") {
        incomingordersData.push(order);
      } else {
        currentOrders.push(order);
      }
    });

    setIncomingOrders(incomingordersData);
    setOrders(currentOrders);
    // setOrders(orders);
  };
  return (
    <div className="h-screen bg-zinc-100 font-inter">
      <div className="flex items-center h-16 px-6 text-2xl bg-white">
        Maybazaar
      </div>

      <div>
        <p className="px-4 pt-4 text-xl">Incoming Orders</p>
        <div className="w-full overflow-scroll">
          <div className="flex w-[200vw] gap-4 p-4">
            {incomingorders.map((order) => {
              return <OrderCard order={order} key={order.id} />;
            })}
          </div>
        </div>
      </div>

      <div>
        <p className="px-4 pt-4 text-xl">Current Orders</p>

        <div className="grid grid-cols-3 gap-4 p-4 bg-zinc-100">
          {orders.map((order) => {
            return <OrderCard order={order} key={order.id} />;
          })}
        </div>
      </div>
    </div>
  );
}

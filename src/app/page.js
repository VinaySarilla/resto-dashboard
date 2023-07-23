"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { getAllOrders, updateRestaurantId } from "../services/firebase";
import { useEffect, useState } from "react";
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

  const [orders, setOrders] = useState([]);

  let orderIbj = {
    status: "orderPlaced",
    restaurantId: "mayabazaar_1",
    customerNumber: "9148102666",
    orderItems: {
      MBC001: {
        itemPrice: 240,
        itemQuantity: 1,
        itemName: "Mushroom 65",
      },
      MBC002: {
        itemName: "Mushroom Manchuria",
        itemPrice: 240,
        itemQuantity: 1,
      },
      MBC004: {
        itemName: "Paneer 65",
        itemQuantity: 1,
        itemPrice: 240,
      },
      MBC003: {
        itemPrice: 240,
        itemQuantity: 1,
        itemName: "Chili Mushroom",
      },
    },
    receivedAt: "08-04-23 09:27 AM",
    orderTotal: 960,
    totalItems: 4,
    customerName: "Test profile",
    id: "MBK001",
  };
  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    let orders = await getAllOrders();
    updateRestaurantId();
    console.log(orders);

    setOrders(orders);
  };
  return (
    <div className="h-screen bg-zinc-100 font-inter">
      <div className="flex items-center h-16 px-6 text-2xl bg-white">
        Maybazaar
      </div>

      <div className="grid grid-cols-4 gap-4 p-4">
        {orders.map((order) => {
          return (
            <div className="overflow-hidden rounded-lg shadow-sm">
              {order.dunzoStatus === "not_assigned" && <div className="p-2 text-sm font-bold text-center bg-amber-100 text-amber-600">Searching for Runner...</div>}                              
              {order.dunzoStatus === "assigned" && <div className="p-2 text-sm font-bold text-center text-green-600 bg-green-100">Runner Assigned</div>}
              {order.dunzoStatus === "waiting" && <div className="p-2 text-sm font-bold text-center text-red-600 bg-red-100">Runner Waiting</div>}              
              <div className="flex flex-col justify-between gap-5 p-6 bg-white ">
                <div className="flex justify-between pb-2 border-b-[1px] border-zinc-200">
                  <div className="flex flex-col justify-between text-sm">
                    <p>{order.customerName}</p>
                    <p className="text-zinc-400">{order.customerNumber}</p>
                  </div>

                  <div className="flex flex-col items-end justify-between text-sm">
                    <p className="p-1 px-2 text-white rounded-lg bg-slate-800 w-fit">
                      {order.id}
                    </p>
                    <p className="mt-1 text-zinc-400">{order.receivedAt}</p>
                  </div>
                </div>
                <ul>
                  {Object.keys(order.orderItems).map((item) => {
                    return (
                      <li className="flex justify-between my-1 text-sm">
                        <p>{order.orderItems[item].itemName}</p>
                        <p className="font-bold text-zinc-900">
                          {order.orderItems[item].itemPrice}/-
                        </p>
                      </li>
                    );
                  })}
                </ul>

                <div className="pt-2 border-t-[1px] border-zinc-200">
                  <div className="flex justify-between text-sm">
                    <p>{order.totalItems} items</p>
                    <p className="font-bold text-zinc-900">
                      {order.orderTotal}/-
                    </p>
                  </div>

                  <button className="w-full p-4 mt-2 text-white bg-green-600 rounded-lg hover:bg-green-700">
                    Accept Order
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

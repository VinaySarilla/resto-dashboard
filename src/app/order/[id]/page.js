"use client";

import { ORDER_STATUS } from "@/constants/constants";
import { getOrderById } from "@/services/firebase";
import React, { useEffect, useState } from "react";

export default function Page({ params }) {
  const [order, setOrder] = useState(null);
  useEffect(() => {
    getOrderData();
  }, []);

  const getOrderData = async () => {
    const order = await getOrderById(params.id);
    console.log("order", order);
    setOrder(order);
  };

  const getTime = (timestamp, min = 0) => {
    const date = new Date(timestamp * 1000 + min * 60 * 1000);
    // 12hr format
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  if (!order) return <div>Loading...</div>;
  return (
    <div>
      <div className="flex items-center justify-between p-4 border-b-[1px] border-zinc-100">
        <div>
          <p className="text-sm font-medium">ORDER #{order?.id}</p>
          <p className="flex items-center gap-1 mt-1 text-xs text-zinc-500">
            {order && getTime(order.receivedAt)}{" "}
            <div className="w-[1px] h-3 bg-zinc-500"></div>{" "}
            {order && Object.keys(order.orderItems).length} items
          </p>
        </div>

        <div className="text-sm font-medium text-green-700">HELP</div>
      </div>

      <div className="flex flex-col gap-4 p-4 bg-zinc-50">
        <div className="p-4 bg-white rounded-md shadow-sm">
          <div className="flex items-center gap-4">
            <div className="border-[1px] rounded-full border-zinc-200 w-fit p-2">
              <img src="/icons/cutlery.png" className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-medium">
                {order.restaurantDetails.name}
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                {order.restaurantDetails.location}
              </p>
            </div>

            <div className="p-2 text-red-400 border-[1px] rounded-full border-zinc-100 ml-auto">
              {/* phone button */}
              <a href={`tel:${order.restaurantDetails.phone}`}>
                <PhoneIcon />
              </a>
            </div>
          </div>
          {order.status === ORDER_STATUS.ORDER_PLACED && (
            <div className="p-2 m-1 my-3 mt-4 text-xs text-green-600 bg-green-50 border-[1px] border-green-400 rounded-lg">
              We have received your order
            </div>
          )}

          {order.status === ORDER_STATUS.ORDER_ACCEPTED && (
            <div className="p-2 m-1 my-3 mt-4 text-xs text-green-600 bg-green-50 border-[1px] border-green-400 rounded-lg">
              We are preparing your order
            </div>
          )}

          {order.status === ORDER_STATUS.ORDER_OUT_FOR_DELIVERY && (
            <div className="p-2 m-1 my-3 mt-4 text-xs text-amber-600 bg-amber-50 border-[1px] border-amber-400 rounded-lg flex justify-between items-center font-medium">
              <div>
                <p>Order Picked Up</p>
                <p className="text-[10px]">Delivery partner is on the way</p>
              </div>
              <a
                className=" text-[10px] p-1 px-3 text-white rounded-full bg-amber-700"
                href={order.dunzoDetails.trackingLink}
                target="_blank"
              >
                Track
              </a>
            </div>
          )}
          {/* {false ? (

          ) : (
            <div className="p-2 m-1 my-3 mt-4 text-xs text-amber-600 bg-amber-50 border-[1px] border-amber-400 rounded-lg flex justify-between items-center font-medium">
              Delivery partner is on the way{" "}
              <span className=" text-[10px] p-1 px-3 text-white rounded-full bg-amber-700 ">
                Track
              </span>
            </div>
          )} */}
          <div className="mt-4 border-t-[1px] border-zinc-100 py-4">
            <p className="text-xs">Your Delivery Details</p>
            <p className="flex items-center gap-2 my-2 mt-4">
              <div className="border-[1px] border-zinc-100 p-1 rounded-full">
                <PhoneIcon2 />
              </div>
              <span className="text-xs font-medium">
                {order.customerName}, {order.customerNumber}
              </span>
            </p>
            <p className="flex items-center gap-2 mt-2">
              <div className="border-[1px] border-zinc-100 p-1 rounded-full">
                <LocationIcon />
              </div>
              <span className="text-xs text-zinc-400">
                {order.deliveryAddress.apartment_address}
              </span>
            </p>
          </div>
          
          <div className="w-full p-3 text-xs text-center rounded-lg bg-zinc-50 border-[1px] border-zinc-200">
            We will reach you by {getTime(order.accepted_timestamp, order.dunzoDetails.dunzoETA)}
          </div>

        </div>

        <div className="p-4 bg-white rounded-md shadow-sm">
          <div className="flex items-center gap-4 ">
            <div className="border-[1px] rounded-full border-zinc-200 w-fit p-2">
              <DocIcon />
            </div>
            <div>
              <p className="text-sm font-medium">Order Summary</p>
            </div>
          </div>

          <div>
            {Object.keys(order?.orderItems).map((item) => {
              return (
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2 text-zinc-500">
                    <p className="text-xs text-zinc-600">
                      {order?.orderItems[item].itemName}
                    </p>
                    <div>
                      <p className="flex items-end text-sm">
                        x {order?.orderItems[item].itemQuantity}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs">
                    ₹
                    {order?.orderItems[item].itemQuantity *
                      order?.orderItems[item].itemPrice}
                  </div>
                </div>
              );
            })}

            <div className="my-2 border-t-[1.5px] border-dashed py-2 text-zinc-500 flex flex-col gap-1">
              <div className="flex justify-between text-xs">
                <p>Item Total</p>
                <p>₹{order.orderTotal}.00</p>
              </div>
              <div className="flex justify-between text-xs">
                <p>Delivery partner Fee</p>
                <p>₹{order.deliveryFee}.00</p>
              </div>
            </div>
            <div className="my-2 border-t-[1px] py-2 text-zinc-500 flex flex-col gap-1">
              <div className="flex justify-between text-xs">
                <p>Paid Online</p>
                <p className="font-medium text-zinc-800">
                  Bill Total{" "}
                  <span className="ml-2">
                    ₹{order.orderTotal + order.deliveryFee}.00
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const PhoneIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4"
    >
      <path
        fillRule="evenodd"
        d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const PhoneIcon2 = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
      />
    </svg>
  );
};

const DocIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
      />
    </svg>
  );
};

const LocationIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    </svg>
  );
};

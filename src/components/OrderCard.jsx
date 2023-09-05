import { DELIVERY_STATUS, ORDER_STATUS } from "@/constants/constants";
import { apiService } from "@/services/api-service";
import { getAllOrders, updateOrderStatus } from "@/services/firebase";
import React from "react";

const OrderCard = ({ order, fetchAllOrders }) => {
  const handleOrders = async (status) => {
    if (status === ORDER_STATUS.ORDER_READY) {
      //trigger dunzo api
      // let res = await apiService.fulfillOrder(order.id);

      // if (res) {
      //update order status in firebase
      let orderUpdated = await updateOrderStatus(order.id, status, () =>
        handleStatus()
      );
      // }
    } else {
      let orderUpdated = await updateOrderStatus(order.id, status, () =>
        handleStatus()
      );

      // console.log(orderUpdated);
      // if (orderUpdated) {
      //   await ;
      // }
    }
  };

  const handleStatus = async () => {
    const res = await apiService.updateStatus(order.id);

    console.log(res);
    if (res) {
      console.log(res);
      fetchAllOrders();
    }
  };

  return (
    <div className="overflow-hidden rounded-lg shadow-sm">
      {/* 
      {order.dunzoStatus === "not_assigned" && (
        <div className="p-2 text-sm font-bold text-center bg-amber-100 text-amber-600">
          Searching for Runner...
        </div>
      )}
      {order.dunzoStatus === "not_assigned" && (
        <div className="p-2 text-sm font-bold text-center bg-amber-100 text-amber-600">
          Searching for Runner...
        </div>
      )}
      {order.dunzoStatus === "assigned" && (
        <div className="p-2 text-sm font-bold text-center text-green-600 bg-green-100">
          Runner Assigned
        </div>
      )}
      {order.dunzoStatus === "waiting" && (
        <div className="p-2 text-sm font-bold text-center text-red-600 bg-red-100">
          Runner Waiting
        </div>
      )} */}
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
        <div
          className={`max-h-[120px] min-h-[120px] ${
            Object.keys(order.orderItems).length > 10 ? "overflow-scroll" : ""
          }`}
        >
          <div className="grid grid-cols-2">
            {Object.keys(order.orderItems).map((item) => {
              return (
                <div className="flex justify-between my-1 text-xs">
                  <p>
                    {order.orderItems[item].itemName} x{" "}
                    {order.orderItems[item].itemQuantity}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-2 border-t-[1px] border-zinc-200">
          <div className="flex justify-between text-sm">
            <p>{order.totalItems} items</p>
            <p className="font-bold text-zinc-900">{order.orderTotal}/-</p>
          </div>

          <div className="flex gap-2">
            {order.status !== ORDER_STATUS.ORDER_PLACED && (
              <button className="w-full gap-4 p-4 mt-2 text-xs rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700">
                00:01
                {order.dunzoStatus ===
                  DELIVERY_STATUS.DELIVERY_NOT_ASSIGNED && (
                  <span className="text-[10px] text-zinc-600 ml-2">
                    Delivery status
                  </span>
                )}
                {order.dunzoStatus === DELIVERY_STATUS.DELIVERY_REQUESTED && (
                  <span className="text-[10px] text-zinc-600 ml-2">
                    Searching for runner
                  </span>
                )}
                {order.dunzoStatus === DELIVERY_STATUS.DELIVERY_ACCEPTED && (
                  <span className="text-[10px] text-zinc-600 ml-2">
                    Runner Assigned
                  </span>
                )}
              </button>
            )}

            {order.status === ORDER_STATUS.ORDER_PLACED && (
              <button
                className="w-full p-4 mt-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
                onClick={() => {
                  handleOrders(ORDER_STATUS.ORDER_ACCEPTED);
                }}
              >
                Accept Order
              </button>
            )}

            {order.status === ORDER_STATUS.ORDER_ACCEPTED && (
              <button
                className="w-full p-4 mt-2 text-white rounded-lg bg-amber-500 hover:bg-amber-500"
                onClick={() => {
                  handleOrders(ORDER_STATUS.ORDER_READY);
                }}
              >
                Order Ready
              </button>
            )}

            {order.status === ORDER_STATUS.ORDER_READY && (
              <button
                className="w-full p-4 mt-2 text-white rounded-lg bg-amber-500 hover:bg-amber-500"
                onClick={() => {
                  handleOrders(ORDER_STATUS.ORDER_OUT_FOR_DELIVERY);
                }}
              >
                Order Picked Up
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;

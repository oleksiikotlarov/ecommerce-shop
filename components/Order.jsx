import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RiDeleteBin6Line } from "react-icons/ri";
import { db } from "./../config/fire";
import { doc, deleteDoc } from "firebase/firestore";

const Order = ({ data }) => {
  return (
    <div className="border mt-8 rounded-lg p-8">
      <div className="flex justify-between text-2xl mb-4">
        <div className="text-2xl">Order number: {data.id}</div>
        <div>
          <RiDeleteBin6Line
            onClick={() => {
              deleteDoc(doc(db, "orders", data.id));
            }}
            className="cursor-pointer text-white/[0.5] hover:text-white text-[20px] md:text-[24px] mt-1 m-2"
          />
        </div>
      </div>
      {data.attributes.cartItems.map((item) => (
        <div className="flex py-5 gap-3 md:gap-5 border-b bg-gray-200 p-8 rounded-md m-4">
          <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
            <Image
              src={item.thumbnail.data.attributes.url}
              alt={item.name}
              width={120}
              height={120}
            />
          </div>

          <div className="w-full flex flex-col">
            <div className="flex flex-col md:flex-row justify-between">
              <Link href={`/product/${item.slug}`}>
                <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
                  {item.name}
                </div>
              </Link>

              <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
                {item.subtitle}
              </div>

              <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
                ${item.price}
              </div>
            </div>

            <div className="text-md font-medium text-black/[0.5] hidden md:block">
              {item.subtitle}
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
                <div className="flex items-center gap-1">
                  <div className="font-semibold">Size: {item.selectedSize}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="m-4 p-4 bg-gray-800 rounded-md">
        <div className="text-lg font-bold">Order details</div>
        <div>First name: {data.attributes.name}</div>
        <div>Last name: {data.attributes.lastname}</div>
        <div>Phone number: {data.attributes.phoneNumber}</div>
        <div>Email: {data.attributes.email}</div>
        <div>Adress: {data.attributes.address}</div>
      </div>
      <div className="m-4 p-4 bg-gray-800 rounded-md">
        <div>Checkout info</div>
        <div>Card number: {data.attributes.cardNumber}</div>
        <div>Expiration date: {data.attributes.expirationDate}</div>
        <div>CVV: {data.attributes.cvv}</div>
      </div>
      <div className="m-4 font-bold text-2xl">
        Total: {data.attributes.subTotal}
      </div>
    </div>
  );
};

export default Order;

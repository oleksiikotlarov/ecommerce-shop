import Image from "next/image";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { updateCart, removeFromCart } from "@/store/cartSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";
const CartItem = ({ data }) => {

    const dispatch = useDispatch();

    const updateCartItem = (e, field) => {
        const newSize = e.target.value;
        dispatch(updateCart({ key: data.key, field, value: newSize }));
      };
    
    
    return (
        <div className="flex py-5 gap-3 md:gap-5 border-b">
            <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
                <Image
                    src={data.thumbnail.data.attributes.url}
                    alt={data.name}
                    width={120}
                    height={120}
                />
            </div>

            <div className="w-full flex flex-col">
                <div className="flex flex-col md:flex-row justify-between">
                    <Link href={`/product/${data.slug}`}>
                    <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
                        {data.name}
                    </div>
                    </Link>

                    <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
                        {data.subtitle}
                    </div>

                    <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
                        ${data.price}
                    </div>
                </div>

                <div className="text-md font-medium text-black/[0.5] hidden md:block">
                    {data.subtitle}
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
                        <div className="flex items-center gap-1">
                            <div className="font-semibold">Size:</div>
                            <select
                                className="hover:text-black"
                                onChange={(e) => updateCartItem(e, "selectedSize")}
                                value={data.selectedSize}
                            >
                                {data.sizes.map((item, i) => {
                                return (
                                    <option
                                    key={i}
                                    value={item}
                                    disabled={item.enabled}
                                    >
                                    {item}
                                    </option>
                                );
                                })}
                            </select>
                        </div>
                    </div>
                    <RiDeleteBin6Line
                        onClick={() =>
                            dispatch(removeFromCart({ key: data.key }))
                        }
                        className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]"
                    />
                </div>
            </div>
        </div>
    );
};

export default CartItem;

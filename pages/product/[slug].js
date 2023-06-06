import React, { useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import Wrapper from "@/components/Wrapper";
import ProductDetailsCarousel from "@/components/ProductDetailsCarousel";
import RelatedProducts from "@/components/RelatedProducts";
import { getDiscountedPricePercentage } from "@/utils/helper";
import ReactMarkdown from "react-markdown";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { v4 as uuidv4 } from "uuid";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { items } from "../items";
import { sizes } from "../items";

const ProductDetails = ({ product, products }) => {
    const [selectedSize, setSelectedSize] = useState("");
    const [showError, setShowError] = useState(false);
    const dispatch = useDispatch();

    const notify = () => {
        toast.success("Success. Check your cart!", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };

    return (
        <div className="w-full md:py-20">
            <ToastContainer />
            <Wrapper>
                <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
                    <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
                        <ProductDetailsCarousel images={product.attributes.images}/>
                    </div>

                    <div className="flex-[1] py-3">
                        <div className="text-[34px] font-semibold mb-2 leading-tight">
                        {product.attributes.name}
                        </div>

                        <div className="text-lg font-semibold mb-5">
                        {product.attributes.subtitle}
                        </div>

                        <div className="flex items-center">
                            <p className="mr-2 text-lg font-semibold">
                                Price : ${product.attributes.price}
                            </p>
                            {product.attributes.original_price && (
                                <>
                                    <p className="text-base  font-medium line-through">
                                        ${product.attributes.original_price}
                                    </p>
                                    <p className="ml-auto text-base font-medium text-green-500">
                                        {getDiscountedPricePercentage(
                                            product.attributes.original_price,
                                            product.attributes.price
                                        )}
                                        % off
                                    </p>
                                </>
                            )}
                        </div>

                        <div className="text-md font-medium text-black/[0.5]">
                            incl. of taxes
                        </div>
                        <div className="text-md font-medium text-black/[0.5] mb-20">
                            {`(Also includes all applicable duties)`}
                        </div>

                        <div className="mb-10">
                            <div className="flex justify-between mb-2">
                                <div className="text-md font-semibold">
                                    Select Size
                                </div>
                                <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                                    Select Guide
                                </div>
                            </div>

                            <div id="sizesGrid" className="grid grid-cols-3 gap-2">
                            {sizes.map((item, i) => (
                                <div
                                key={i}
                                className={`border rounded-md text-center py-3 font-medium ${
                                    product.attributes.sizes.includes(item) ? "hover:border-black cursor-pointer" : "cursor-not-allowed bg-black/[0.1] opacity-50"
                                } ${
                                    selectedSize === item ? "border-black" : ""
                                }`}
                                onClick={() => {
                                    if (product.attributes.sizes.includes(item)) {
                                    setSelectedSize(item);
                                    setShowError(false);
                                    }
                                }}
                                >
                                {item}
                                </div>
                            ))}
                            </div>

                            {showError && (
                                <div className="text-red-600 mt-1">
                                    Size selection is required
                                </div>
                            )}
                        </div>

                        <button
                            className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
                            onClick={() => {
                                if (!selectedSize) {
                                    setShowError(true);
                                    document
                                        .getElementById("sizesGrid")
                                        .scrollIntoView({
                                            block: "center",
                                            behavior: "smooth",
                                        });
                                } else {
                                    dispatch(
                                        addToCart({
                                            ...product.attributes, 
                                          selectedSize, 
                                          key: uuidv4(),
                                        })
                                      );
                                    
                                    notify();
                                    
                                }
                            }}
                        >
                            Add to Cart
                        </button>

                        <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10">
                            Whishlist
                            <IoMdHeartEmpty size={20} />
                        </button>
                        <div>
                            <div className="text-lg font-bold mb-5">
                                Product Details
                            </div>
                            <div className="markdown text-md mb-5">
                                <ReactMarkdown>{product.attributes.description}</ReactMarkdown>
                                
                            </div>
                        </div>
                    </div>
                </div>

                <RelatedProducts products={products} />
            </Wrapper>
        </div>
    );
};

export default ProductDetails;

export async function getStaticPaths() {
    const products = items

      const paths = products.map((p) => ({
        params: {
          slug: p.attributes.slug,
        },
      }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params: { slug } }) {
    const products = items;

    const product = products.find((p) => p.attributes.slug === slug);
    const filteredProducts = products.filter((p) => p.attributes.slug !== slug);

    return {
        props: {
            product,
            products: filteredProducts,
        },
    };
}

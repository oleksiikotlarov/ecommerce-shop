import Image from "next/image";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/fire";
import Wrapper from "@/components/Wrapper";
import Login from "../components/Login";
import { RiDeleteBin6Line } from "react-icons/ri";
import ProductUpload from "@/components/ProductUpload";
import { db } from "./../config/fire";
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  query,
  getDocs
} from "firebase/firestore";
import Order from "@/components/Order";
import EditProduct from "@/components/EditProduct";

const q = query(collection(db, "sizes"));

const Admin = ({ products, orders }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(true);
  const [toggleAdd, setToggleAdd] = useState(false);
  const [localSizes, setLocalSizes] = useState([]);
  const [sizeInput, setSizeInput] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const uid = user.email;
        console.log("User logged in:", uid);
        setIsLoggedIn(true);
      } else {
        // User is signed out
        console.log("User logged out");
        setIsLoggedIn(false);
      }
    });
  }, []);

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      setLocalSizes(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          item: doc.data(),
        }))
      );
    });
    
  }, [sizeInput]);

  const addSize = () => {
    addDoc(collection(db, "sizes"), {
      size: sizeInput,
    });
    setSizeInput("");
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="bg-black text-white">
          <Wrapper>
            <div className="flex items-center mx-20 py-10 text-xl">
              <div
                className="cursor-pointer py-4 px-8 hover:drop-shadow-lg hover:bg-gray-500 hover:bg-opacity-25 rounded-lg "
                onClick={() => {
                  setToggleMenu(true);
                }}>
                Orders
              </div>
              <div
                className="cursor-pointer py-4 px-8 hover:drop-shadow-lg hover:bg-gray-500 hover:bg-opacity-25 rounded-lg "
                onClick={() => {
                  setToggleMenu(false);
                }}>
                Edit
              </div>
            </div>
            <div>
              {toggleMenu ? (
                <div>
                  <div className="text-4xl font-bold">Orders</div>
                  <div>{orders.map((order) => (<Order key={order.id} data={order}/>))}</div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between mb-10">
                    <div
                      className="text-4xl font-bold cursor-pointer hover:drop-shadow-lg hover:bg-gray-500 hover:bg-opacity-25 rounded-lg p-2"
                      onClick={() => {
                        setToggleAdd(false);
                      }}>
                      Edit products
                    </div>
                    <div
                      className="cursor-pointer hover:drop-shadow-lg hover:bg-gray-500 hover:bg-opacity-25 rounded-lg p-2"
                      onClick={() => {
                        setToggleAdd(true);
                      }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </div>
                  </div>
                  {toggleAdd ? (
                    <ProductUpload sizes={localSizes}/>
                  ) : (
                    <div>
                      <form>
                        <div className="flex-[1] p-5 mt-10 bg-white text-black rounded-md">
                          <div className="flex flex-row justify-between items-center">
                            <div className="text-2xl font-bold">
                              Edit all avalible sizes
                            </div>
                            <input
                              type="email"
                              id="email"
                              className="bg-gray-50 border border-gray-300 text-gray-900 h-10 w-6/12 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
                              placeholder="Add new size"
                              required
                              value={sizeInput}
                              onChange={(e) => setSizeInput(e.target.value)}
                            />
                            <div
                              className="cursor-pointer hover:drop-shadow-lg hover:bg-gray-500 hover:bg-opacity-25 rounded-lg p-2"
                              onClick={() => {
                                addSize();
                              }}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 4.5v15m7.5-7.5h-15"
                                />
                              </svg>
                            </div>
                          </div>
                          <div className="flex flex-row flex-wrap justify-start mt-6 items-center">
                            {localSizes.map((item) => (
                              <div className="flex bg-gray-300 p-8 m-2 rounded-md">
                                <div className="text-lg font-bold mr-4">
                                  {item.item.size}
                                </div>
                                <RiDeleteBin6Line
                                  onClick={() => {
                                    deleteDoc(doc(db, "sizes", item.id));
                                  }}
                                  className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px] mt-1"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </form>
                      <div>
                        {products.map((product) => (<EditProduct key={product.id} product={product}/>))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Wrapper>
        </div>
      ) : (
        <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
          <Login />
        </div>
      )}
    </>
  );
};

export default Admin;

export async function getStaticProps() {
  const ordersSnapshot = await getDocs(collection(db, "orders"));
  const orders = ordersSnapshot.docs.map((doc) => doc.data());

  const productsSnapshot = await getDocs(collection(db, "products"));
  const products = productsSnapshot.docs.map((doc) => doc.data());
  
  return {
      props: { products, orders },
      revalidate: 10,
  };
}
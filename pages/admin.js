import Image from "next/image";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/fire";
import Wrapper from "@/components/Wrapper";
import Login from "../components/Login";
import { RiDeleteBin6Line } from "react-icons/ri";
import ProductUpload from "@/components/ProductUpload";
import { db, storage } from "./../config/fire";
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  query,
  getDocs,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  updateMetadata,
  deleteObject,
} from "firebase/storage";
import Order from "@/components/Order";
import EditProduct from "@/components/EditProduct";

const q = query(collection(db, "sizes"));
const img = query(collection(db, "images"));

const Admin = ({ products, orders }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(true);
  const [toggleAdd, setToggleAdd] = useState(false);
  const [localSizes, setLocalSizes] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [sizeInput, setSizeInput] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

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

  useEffect(() => {
    onSnapshot(img, (snapshot) => {
      setImageUrls(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          item: doc.data(),
        }))
      );
    });
  }, [selectedImage]);

  const handleImageUpload = async () => {
    try {
      const storageRef = ref(storage, `images/${selectedImage.name}`);
      const uploadTask = uploadBytes(storageRef, selectedImage);

      const newMetadata = {
        cacheControl: "public,max-age=2629800000",
        contentType: selectedImage.type,
      };
      await updateMetadata(storageRef, newMetadata);

      const imageUrl = await getDownloadURL(storageRef);

      await addDoc(collection(db, "images"), {
        url: imageUrl,
        name: selectedImage.name,
      });

      console.log("Image upload successful. URL:", imageUrl);
      URL.revokeObjectURL(selectedImage.preview);
      setSelectedImage(null);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleDeleteImage = async (img) => {
    try {
      const imageRef = ref(storage, `images/${img.item.name}`);
      await deleteObject(imageRef);

      await deleteDoc(doc(db, "images", img.id));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
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
                  {orders.length > 0 && (
                    <div>
                      {orders.map((order) => (
                        <Order key={order.id} data={order} />
                      ))}
                    </div>
                  )}
                  {orders.length < 1 && (
                    <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14 bg-white rounded-xl text-black">
                      <Image
                        src="/empty-cart.jpg"
                        width={300}
                        height={300}
                        className="w-[300px] md:w-[400px] "
                      />
                      <span className="text-2xl font-bold mt-4">
                        No orders yet
                      </span>
                    </div>
                  )}
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
                    <ProductUpload sizes={localSizes} images={imageUrls} />
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
                              <div className="flex bg-gray-300 p-2 md:p-4 m-2 rounded-md">
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
                      <form>
                        <div className="flex-[1] p-5 mt-10 bg-white text-black rounded-md">
                          <div className="flex flex-row justify-between items-center">
                            <div className="text-2xl font-bold">
                              Edit all avalible images
                            </div>
                            <input
                              className="m-2 rounded-sm border p-2 w-8/12"
                              type="file"
                              name="thumbnail"
                              accept=".png, .jpg, .jpeg"
                              onChange={(e) =>
                                setSelectedImage(e.target.files[0])
                              }
                              required
                            />
                            <div
                              className="cursor-pointer hover:drop-shadow-lg hover:bg-gray-500 hover:bg-opacity-25 rounded-lg p-2"
                              onClick={() => {
                                handleImageUpload();
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
                          <div className="flex flex-wrap text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
                            {imageUrls.map((img, key) => (
                              <div className="relative m-4">
                                <Image
                                  src={img.item.url}
                                  alt={img.id}
                                  key={key}
                                  width={200}
                                  height={120}
                                />
                                <div className="absolute bottom-0 right-0 m-1">
                                  <RiDeleteBin6Line
                                    onClick={() => handleDeleteImage(img)}
                                    className="cursor-pointer text-black/[0.5] hover:text-black text-[20px] md:text-[24px] mt-1"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </form>
                      <div>
                        {products.map((product) => (
                          <EditProduct key={product.id} product={product} sizes={localSizes} images={imageUrls} />
                        ))}
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

import React, { useState } from "react";
import { addDoc, updateDoc, collection } from "firebase/firestore";
import {db} from "./../config/fire"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetCart } from "./../store/cartSlice";
import { useDispatch } from "react-redux";

const uploadOrder = async (formFields, cartItems, subTotal) => {
  try {
    const {
      name,
      lastname,
      phoneNumber,
      email,
      address,
      cardNumber,
      expirationDate,
      cvv,
    } = formFields;

    const orderData = {
      id: Date.now(),
      attributes: {
        name: name,
        lastname: lastname,
        phoneNumber: phoneNumber,
        email: email,
        address: address,
        cardNumber: cardNumber,
        expirationDate: expirationDate,
        cvv: cvv,
        cartItems: cartItems,
        subTotal: subTotal,
      },
    };
    console.log(orderData)

    const prodRef = await addDoc(collection(db, "orders"), orderData);

    await updateDoc(prodRef, {
      id: prodRef.id,
    });
    return prodRef.id;
  } catch (error) {
    console.log(error);
  }
};

const defaultInputs = {
  name: "",
  lastname: "",
  phoneNumber: "",
  email: "",
  address: "",
  cardNumber: "",
  expirationDate: "",
  cvv: "",
};

const PaymentForm = ({ subTotal, cartItems }) => {
  const [formFields, setFormFields] = useState(defaultInputs);
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);

    const res = await uploadOrder(formFields, cartItems, subTotal);

    if (res) {
      setDisabled(false);
      setFormFields(defaultInputs);
      notify()
      dispatch(resetCart());
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const notify = () => {
    toast.success("Success, order submited", {
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
    <div className="flex-[1]">
      <ToastContainer />
      <div className="text-lg font-bold">Summary</div>

      <form onSubmit={handleSubmit}>
        <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
          <div className="flex justify-between">
            <div className="uppercase text-md md:text-lg font-medium text-black">
              Subtotal
            </div>
            <div className="text-md md:text-lg font-medium text-black">
              ${subTotal}
            </div>
          </div>
          <div className="text-sm md:text-md py-5 border-t mt-5">
            The subtotal reflects the total price of your order, including
            duties and taxes, before any applicable discounts. It does not
            include delivery costs and international transaction fees.
          </div>
          <div className="flex justify-between  pt-5">
            <div className="uppercase text-md md:text-lg font-medium text-black">
              Your details
            </div>
          </div>

          <div className="text-sm md:text-md py-5 border-t mt-5">
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                  placeholder=""
                  disabled={disabled}
                  required
                  onChange={handleChange}
                  value={formFields.name || ""}
                />
                <label
                  for="floating_last_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  First name
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="lastname"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                  placeholder=" "
                  disabled={disabled}
                  required
                  onChange={handleChange}
                  value={formFields.lastname || ""}
                />
                <label
                  for="floating_last_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Last name
                </label>
              </div>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="tel"
                name="phoneNumber"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-black peer"
                placeholder=" "
                disabled={disabled}
                required
                onChange={handleChange}
                value={formFields.phoneNumber || ""}
              />
              <label
                for="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Phone number
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="email"
                name="email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-black peer"
                placeholder=" "
                disabled={disabled}
                required
                onChange={handleChange}
                value={formFields.email || ""}
              />
              <label
                for="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Email address
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="address"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-black peer"
                placeholder=" "
                disabled={disabled}
                required
                onChange={handleChange}
                value={formFields.address || ""}
              />
              <label
                for="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Address
              </label>
            </div>
            <div className="flex justify-between border-b pb-5">
              <div className="uppercase text-md md:text-lg font-medium text-black">
                Payment information
              </div>
            </div>
            <div className="relative z-0 w-full mb-6 group mt-5">
              <input
                type="number"
                name="cardNumber"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-black peer"
                placeholder=" "
                disabled={disabled}
                required
                onChange={handleChange}
                value={formFields.cardNumber || ""}
              />
              <label
                for="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Credit card number
              </label>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="expirationDate"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                  placeholder=" "
                  disabled={disabled}
                  required
                  onChange={handleChange}
                  value={formFields.expirationDate || ""}
                />
                <label
                  for="floating_last_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Expiration Date
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                  required
                  type="tel"
                  name="cvv"
                  placeholder=" "
                  disabled={disabled}
                  pattern="\d{3}"
                  onChange={handleChange}
                  value={formFields.cvv || ""}
                />
                <label
                  for="floating_last_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  CVV
                </label>
              </div>
            </div>
          </div>
        </div>
        <button
          disabled={disabled}
          type="submit"
          className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center">
          {disabled ? <img src="/spinner.svg" /> : "Confirm order"}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;

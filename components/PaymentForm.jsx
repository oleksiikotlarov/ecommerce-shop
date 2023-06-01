import React, { useState } from "react";

const PaymentForm = ({ subTotal }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      name,
      surname,
      phoneNumber,
      email,
      address,
      paymentMethod,
      cardNumber,
      expirationDate,
      cvv,
    });
  };

  return (
    <div className="flex-[1]">
      <div className="text-lg font-bold">Summary</div>

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
          The subtotal reflects the total price of your order, including duties
          and taxes, before any applicable discounts. It does not include
          delivery costs and international transaction fees.
        </div>
        <div className="flex justify-between  pt-5">
          <div className="uppercase text-md md:text-lg font-medium text-black">
            Your details
          </div>
        </div>
      

      <div className="text-sm md:text-md py-5 border-t mt-5">
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="floating_last_name"
                id="floating_last_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                placeholder=" "
                required
                onChange={(e) => setName(e.target.value)}
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
                name="floating_last_name"
                id="floating_last_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                placeholder=" "
                required
                onChange={(e) => setSurname(e.target.value)}
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
              type="email"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-black peer"
              placeholder=" "
              required
              onChange={(e) => setPhoneNumber(e.target.value)}
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
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-black peer"
              placeholder=" "
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              for="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Email address
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-black peer"
              placeholder=" "
              required
              onChange={(e) => setAddress(e.target.value)}
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
              type="email"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-black peer"
              placeholder=" "
              required
              onChange={(e) => setCardNumber(e.target.value)}
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
                name="floating_last_name"
                id="floating_last_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                placeholder=" "
                required
                onChange={(e) => setExpirationDate(e.target.value)}
              />
              <label
                for="floating_last_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Expiration Date
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                id="floating_last_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                required
                type="tel"
                name="cvc"
                placeholder=" "
                pattern="\d{3}"
                onChange={(e) => setCvv(e.target.value)}
              />
              <label
                for="floating_last_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                CVV
              </label>
            </div>
          </div>
        </form>
      </div>
      </div>
      <button
        type="submit"
        className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center"
        onClick={() => {
            handleSubmit()
        }}>
        Pay
        {/* {loading && <img src="/spinner.svg" />} */}
      </button>
      {/* BUTTON END */}
    </div>
  );
};

export default PaymentForm;

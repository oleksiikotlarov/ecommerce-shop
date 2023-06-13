import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../config/fire";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function EditProduct({ product }) {
  const router = useRouter();
  const [formFields, setFormFields] = useState({
    name: "",
    price: "",
    subtitle: "",
    description: "",
  });

  useEffect(() => {
    setFormFields({
      name: product.attributes.name,
      price: product.attributes.price,
      subtitle: product.attributes.subtitle,
      description: product.attributes.description,
    });
  }, [product.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productRef = doc(db, "products", product.id);
      await updateDoc(productRef, {
        attributes: {
          name: formFields.name,
          price: formFields.price,
          thumbnail: {
            data: {
              attributes: {
                url: product.attributes.thumbnail.data.attributes.url,
              },
            },
          },
          slug: formFields.name.toLowerCase().replace(/\s/g, "-"),
          subtitle: formFields.subtitle,
          description: formFields.description,
          sizes: product.attributes.sizes,
          images: ["url1", "url2"],
        },
      });
      console.log("Product updated successfully!");
      router.push("/admin");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg mt-4 text-black p-4">
      <Image
        className="m-4"
        src={product.attributes.thumbnail.data.attributes.url}
        alt={product.attributes.name}
        width={200}
        height={200}
      />
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 md:gap-6 text-sm md:text-md py-5 border-t mt-5">
          <div className="relative z-0 w-full mb-6 group mt-4">
            <input
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
              type="text"
              name="name"
              value={formFields.name}
              onChange={handleInputChange}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Name:
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group mt-4">
            <input
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
              type="text"
              name="price"
              value={formFields.price}
              onChange={handleInputChange}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Price:
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group mt-4">
            <input
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
              type="text"
              name="subtitle"
              value={formFields.subtitle}
              onChange={handleInputChange}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Subtitle:
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group mt-4">
            <textarea
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
              name="description"
              value={formFields.description}
              onChange={handleInputChange}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Description:
            </label>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="px-12 py-6 m-4 text-xl bg-black text-white rounded-2xl hover:bg-opacity-75"
            type="submit">
            Update Product
          </button>
          <RiDeleteBin6Line
            onClick={() => {
              deleteDoc(doc(db, "products", product.id));
              router.push("/admin");
            }}
            className="cursor-pointer text-black/[0.5] hover:text-black text-[20px] md:text-[28px] mx-8 my-2"
          />
        </div>
      </form>
    </div>
  );
}

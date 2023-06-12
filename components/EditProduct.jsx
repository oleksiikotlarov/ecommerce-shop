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

  console.log(formFields);

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
        <div className="grid grid-cols-2">
          <div className="flex p-2 m-2 rounded-lg bg-gray-200">
            <label className="p-2 text-lg">Name:</label>
            <input
              className="text-black ml-2 w-full p-2"
              type="text"
              name="name"
              value={formFields.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex p-2 m-2 rounded-lg bg-gray-200">
            <label className="p-2 text-lg">Price:</label>
            <input
              className="text-black ml-2 w-full p-2"
              type="text"
              name="price"
              value={formFields.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center p-2 m-2 rounded-lg bg-gray-200">
            <label className="p-2 text-lg">Subtitle:</label>
            <input
              className="text-black ml-2 w-full p-2"
              type="text"
              name="subtitle"
              value={formFields.subtitle}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center p-2 m-2 rounded-lg bg-gray-200">
            <label className="p-2 text-lg">Description:</label>
            <textarea
              className="text-black ml-2 w-full p-2"
              name="description"
              value={formFields.description}
              onChange={handleInputChange}
            />
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

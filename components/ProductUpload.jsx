import { useState } from "react";
import { uploadProduct } from "./../config/fire";
import MultiSelector from "./MultiSelector";
import ImageSelector from "./ImageSelector";

const defaultInputs = {
  name: "",
  price: 0,
  subtitle: "",
  description: "",
};

export default function ProductUpload({ sizes, images }) {
  const [formFields, setFormFields] = useState(defaultInputs);
  const [disabled, setDisabled] = useState(false);

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleSelectionChange = (updatedOptions) => {
    setSelectedOptions(updatedOptions);
  };
  const options = sizes;
  const imgs = images;

  const handleImageChange = (updatedImages) => {
    setSelectedImages(updatedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setDisabled(true);

    const res = await uploadProduct(
      formFields,
      selectedOptions,
      selectedImages
    );

    if (res) {
      setDisabled(false);
      setFormFields(defaultInputs);

      setSelectedOptions([]);
      setSelectedImages([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <>
      <div className="flex-[1] p-5 mt-5 bg-white text-lg text-black rounded-md">
        <div className="text-2xl font-bold">Add new product</div>
        <form onSubmit={handleSubmit}>
          <div className="text-black flex flex-wrap">
            <input
              className="m-2 rounded-sm border p-2 w-full"
              type="text"
              name="name"
              value={formFields.name || ""}
              disabled={disabled}
              placeholder="Product Name"
              onChange={handleChange}
              required
            />
            <input
              className="m-2 rounded-sm border p-2 w-full"
              type="text"
              name="subtitle"
              value={formFields.subtitle || ""}
              disabled={disabled}
              placeholder="Subtitle"
              onChange={handleChange}
              required
            />
            <input
              className="m-2 rounded-sm border p-2 w-full"
              type="number"
              name="price"
              step="0.01"
              min="0"
              value={formFields.price || ""}
              disabled={disabled}
              placeholder="Price"
              onChange={handleChange}
              required
            />
            <textarea
              className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border my-8 border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              type="text"
              name="description"
              value={formFields.description || ""}
              disabled={disabled}
              placeholder="Description"
              onChange={handleChange}
              required
            />
            <div className="m-2 mt-4">
              <p>Choose avalible sizes</p>
              <MultiSelector
                options={options}
                selectedOptions={selectedOptions}
                onChange={handleSelectionChange}
              />
            </div>
            <div className="m-2 mt-4">
              <p>Choose images</p>
              <ImageSelector
                images={imgs}
                selectedImages={selectedImages}
                onChange={handleImageChange}
              />
            </div>
          </div>
          <div className="flex justify-start ml-3 mt-8">
            <button
              disabled={disabled}
              type="submit"
              className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center">
              {disabled ? <img src="/spinner.svg" /> : "Add product"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

import React from "react";
import Image from "next/image";

const ImageSelector = ({ images, selectedImages, onChange }) => {
  const handleOptionChange = (image) => {
    const updatedImages = selectedImages.includes(image)
      ? selectedImages.filter((selected) => selected !== image)
      : [...selectedImages, image];

    onChange(updatedImages);
  };

  return (
    <div className="">
      {images.map((image, key) => (
        <label
          key={image}
          className="bg-gray-200 mx-4 p-3 my-2 rounded-xl text-lg inline-flex items-center space-x-2 cursor-pointer">
          <Image
            src={image.item.url}
            alt={image.id}
            key={key}
            width={120}
            height={120}
          />
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-500"
            checked={selectedImages.includes(image.item.url)}
            onChange={() => handleOptionChange(image.item.url)}
          />
        </label>
      ))}
    </div>
  );
};

export default ImageSelector;

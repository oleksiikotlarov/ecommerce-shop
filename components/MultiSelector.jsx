const MultiSelector = ({ options, selectedOptions, onChange }) => {
  const handleOptionChange = (option) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((selected) => selected !== option)
      : [...selectedOptions, option];

    onChange(updatedOptions);
  };

  return (
    <div className="">
      {options.map((option) => (
        <label
          key={option}
          className="bg-gray-200 mx-4 p-3 my-2 rounded-xl text-lg inline-flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-500"
            checked={selectedOptions.includes(option.item.size)}
            onChange={() => handleOptionChange(option.item.size)}
          />
          <span className="text-gray-700">{option.item.size}</span>
        </label>
      ))}
    </div>
  );
};

export default MultiSelector;

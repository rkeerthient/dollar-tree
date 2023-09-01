import * as React from "react";
import { useState } from "react";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
type Ddprops = {
  price: number;
  sets: number[];
};
const Dropdown = ({ price, sets }: Ddprops) => {
  const options: number[] = sets; // Replace with your own options
  const [selectedOption, setSelectedOption] = useState<number>(options[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [currPrice, setPrice] = useState<number>(price * sets[0]);
  const handleOptionSelect = (option: number) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
    setPrice(option * price);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex gap-4">
      <div>
        {" "}
        <div className="relative inline-block text-left">
          <div
            className="border p-2 rounded-md cursor-pointer w-40 flex justify-between items-center"
            onClick={toggleDropdown}
          >
            {selectedOption}
            {isDropdownOpen ? (
              <FaCaretUp className="inline" />
            ) : (
              <FaCaretDown className="inline" />
            )}
          </div>
          {isDropdownOpen && (
            <div className="absolute mt-1 bg-white border border-gray-300 rounded-md shadow-lg w-40">
              {options.map((option, index) => (
                <div
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="text-3xl font-bold">
        <span className="text-base font-light align-top">$</span>
        {currPrice} <span className="text-base font-light mb-auto">Total</span>
      </div>
    </div>
  );
};

export default Dropdown;

import * as React from "react";
import { useState } from "react";

type RadioOption = {
  label: string;
  value: string;
  addVal?: string;
};

const RadioButtons: React.FC = () => {
  const radioOptions: RadioOption[] = [
    { label: "FREE Ship to Store", value: "FREE Ship to Store" },
    {
      label: "Ship To Home:",
      value: "Ship To Home:",
      addVal: "Usually arrives in 4 - 7 days",
    },
  ];

  const [selectedOption, setSelectedOption] = useState<string>(
    radioOptions[0].value
  );

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  return (
    <div>
      {radioOptions.map((option) => (
        <div key={option.value} className="mb-2 flex gap-2">
          <input
            type="radio"
            id={option.value}
            value={option.value}
            checked={selectedOption === option.value}
            onChange={() => handleOptionChange(option.value)}
          />
          <label htmlFor={option.value} className="ml-2 font-bold">
            <div className="flex flex-col">
              <div>{option.label}</div>
              <div className="ml-2 text-sm font-light">{option.addVal}</div>
            </div>
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioButtons;

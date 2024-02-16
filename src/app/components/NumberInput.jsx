"use client";

import { useState } from "react";

export default function NumberInput({ labelText, name, placeholder, onChangeFunc }) {
  const [number, setNumber] = useState(0);

  const onInputChange = (event) => {
    let newNum = event.target.value;
    if (event.target.value == "") {
      newNum = 0;
    }
    setNumber(newNum);
    onChangeFunc(name, newNum);
  };

  return (
    <div>
      <label htmlFor={name}>{labelText}</label>
      <br />
      <input
        className="p-2 text-lg rounded text-black border border-gray-500"
        type="number"
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={onInputChange}
      />
    </div>
  );
}

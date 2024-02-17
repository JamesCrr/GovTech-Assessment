"use client";
import { useState } from "react";
import NumberInput from "./components/NumberInput";

export default function Home() {
  const [numbers, setNumbers] = useState({});
  const [result, setResult] = useState(undefined);

  /**
   * Sends a POST Request to API endpoint with the numbers in the body
   * @param {String} operation The "add" or "subtract" operation to use
   */
  async function sendNumbers(operation) {
    const searchParams = new URLSearchParams();
    for (const numKey in numbers) {
      searchParams.set(numKey, numbers[numKey]);
    }

    // Send the POST request
    try {
      const response = await fetch("/api" + (operation == "add" ? "/add" : "/subtract"), {
        method: "POST",
        body: searchParams,
      });
      if (!response.ok) {
        throw new Error("Failed to send numbers");
      }
      // Set result state
      const resultJSON = await response.json();
      setResult(resultJSON.result);
    } catch (error) {
      console.error("Error sending numbers:", error.message);
    }
  }

  /**
   * Function to handle when the input's value changes
   * @param {String} name The key in the key-value pair of numbers
   * @param {Number} newNum The value in the key-value pair of numbers
   */
  const handleInputChange = (name, newNum) => {
    setNumbers((prev) => ({
      ...prev,
      [name]: newNum,
    }));
  };

  return (
    <div className="h-screen flex flex-col items-center">
      <form style={{ marginTop: "15rem" }}>
        <div className="space-y-4">
          <NumberInput labelText={"First Number"} name="num1" placeholder={0} onChangeFunc={handleInputChange} />
          <NumberInput labelText={"Second Number"} name="num2" placeholder={0} onChangeFunc={handleInputChange} />
        </div>

        <div className="mt-10 flex items-center justify-between">
          <button
            className="p-2 border rounded border-solid border-blue-600 border-opacity-100"
            type="button"
            onClick={() => sendNumbers("add")}
          >
            Add
          </button>
          <button
            className="p-2 border rounded border-solid border-blue-600 border-opacity-100"
            type="button"
            onClick={() => sendNumbers("subtract")}
          >
            Subtract
          </button>
        </div>
      </form>

      <div className="mt-10">
        <p className="text-3xl font-bold underline">{result !== undefined ? "Result: " + result : ""}</p>
      </div>
    </div>
  );
}

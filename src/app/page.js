"use client";
import { useState } from "react";

export default function Home() {
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [result, setResult] = useState(undefined);

  async function sendNumbers(operation) {
    const searchParams = new URLSearchParams();
    console.log(number1, number2);
    searchParams.set("num1", number1);
    searchParams.set("num2", number2);
    searchParams.set("operation", operation);

    try {
      const response = await fetch("/api", {
        method: "POST",
        body: searchParams,
      });
      if (!response.ok) {
        throw new Error("Failed to fetch number");
      }
      const resultJSON = await response.json();
      setResult(resultJSON.result);
    } catch (error) {
      console.error("Error fetching number:", error.message);
    }
  }

  return (
    <div className="h-screen flex flex-col items-center">
      <form style={{ marginTop: "15rem" }}>
        <div className="space-y-4">
          <div>
            <label htmlFor="num1">First number</label>
            <br />
            <input
              className="p-2 text-lg rounded text-black border border-gray-500"
              type="number"
              name="num1"
              onChange={(e) => (e.target.value == "" ? setNumber1(0) : setNumber1(e.target.value))}
            />
          </div>

          <div>
            <label htmlFor="num2">Second number</label>
            <br />
            <input
              className="p-2 text-lg rounded text-black border border-gray-500"
              type="number"
              name="num2"
              onChange={(e) => (e.target.value == "" ? setNumber2(0) : setNumber2(e.target.value))}
            />
          </div>
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

      <div className="mt-6">
        <p className="text-3xl font-bold underline">{result ? "Result: " + result : ""}</p>
      </div>
    </div>
  );
}

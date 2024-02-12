import Screen from "./components/screen";
import { useState } from "react";
import NumberButton from "./components/numberButton";
import { Mem } from "./types/mem";
import * as calc from "./utils/calculator";

function App() {
  const [mem, setMem] = useState<Mem>({
    history: null,
    curr: null,
    sav: null,
    isNegative: false,
  });

  return (
    <div className="w-screen h-screen grid place-items-center">
      <div className="border rounded-lg w-[90%] h-[90%] md:w-[480px] md:h-[600px] p-6 border-indigo-500 shadow-xl bg-sky-100">
        <h1 className="text-xl font-semibold mb-3 text-center">
          SimCa (Simple Calculator)
        </h1>
        <Screen mem={mem}></Screen>
        <div className="grid grid-cols-[3fr_1fr] gap-2 mt-3">
          <div className="grid grid-cols-3 gap-2">
            <NumberButton
              clickHandler={() => setMem(calc.setScreen(mem, "7"))}
              num={"7"}
            ></NumberButton>
            <NumberButton
              clickHandler={() => setMem(calc.setScreen(mem, "8"))}
              num={"8"}
            ></NumberButton>
            <NumberButton
              clickHandler={() => setMem(calc.setScreen(mem, "9"))}
              num={"9"}
            ></NumberButton>
            <NumberButton
              clickHandler={() => setMem(calc.setScreen(mem, "4"))}
              num={"4"}
            ></NumberButton>
            <NumberButton
              clickHandler={() => setMem(calc.setScreen(mem, "5"))}
              num={"5"}
            ></NumberButton>
            <NumberButton
              clickHandler={() => setMem(calc.setScreen(mem, "6"))}
              num={"6"}
            ></NumberButton>
            <NumberButton
              clickHandler={() => setMem(calc.setScreen(mem, "1"))}
              num={"1"}
            ></NumberButton>
            <NumberButton
              clickHandler={() => setMem(calc.setScreen(mem, "2"))}
              num={"2"}
            ></NumberButton>
            <NumberButton
              clickHandler={() => setMem(calc.setScreen(mem, "3"))}
              num={"3"}
            ></NumberButton>
            <NumberButton
              clickHandler={() => setMem(calc.percent(mem))}
              num={"%"}
            ></NumberButton>
            <NumberButton
              clickHandler={() => setMem(calc.setScreen(mem, "0"))}
              num={"0"}
            ></NumberButton>
            <NumberButton
              clickHandler={() => setMem(calc.setDecimal(mem))}
              num={"."}
            ></NumberButton>
            <NumberButton
              clickHandler={() => setMem(calc.clearAll())}
              num={"AC"}
            ></NumberButton>
            <NumberButton
              clickHandler={() => setMem(calc.backscape(mem))}
              num={"<<"}
            ></NumberButton>
            <NumberButton
              clickHandler={() => setMem(calc.negative(mem))}
              num={"+/-"}
            ></NumberButton>
          </div>
          <div className="flex flex-col gap-2">
            <NumberButton
              clickHandler={() => setMem(calc.operation(mem, "+"))}
              num="+"
              color="blue"
            ></NumberButton>
            <NumberButton
              clickHandler={() => setMem(calc.operation(mem, "-"))}
              num="-"
              color="red"
            ></NumberButton>
            <NumberButton
              clickHandler={() => setMem(calc.operation(mem, "*"))}
              num="*"
              color="yellow"
            ></NumberButton>
            <NumberButton
              clickHandler={() => setMem(calc.operation(mem, "/"))}
              num="/"
              color="indigo"
            ></NumberButton>
            <NumberButton
              clickHandler={() => setMem(calc.answer(mem))}
              num="="
              color="emerald"
            ></NumberButton>
          </div>
        </div>
        <div className="mt-3">
          <h1 className="text-center font-bold text-lg mb-2">About</h1>
          <p className="text-xs text-justify">
            This is a simple calculator that I use to learn how to use state in
            ReactJS. The idea of this work is simple, it store the operation in
            the state then calculate the operation when you click the answer
            button (=). It has limitation since it only can calculate 32 bit
            float. So, if you try to calculate number that higher than 32 bit it
            will return the maximum value that it can calculate.
          </p>
          <p className="mt-5 text-xs text-center">
            Crafted with{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 inline text-pink-400"
            >
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
            {" "}by <a className="font-semibold text-blue-500 underline" href="https://github.com/tripletTrouble">Deri Prasetyo</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;

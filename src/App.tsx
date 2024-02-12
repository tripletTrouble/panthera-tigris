import Screen from "./components/screen";
import { useState } from "react";
import NumberButton from "./components/numberButton";
import { Mem } from "./types/mem";
import * as calc from "./utils/calculator";

function App() {
  const [mem, setMem] = useState<Mem>({
    curr: null,
    sav: null,
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
              clickHandler={() => setMem(calc.clearEntry(mem))}
              num={"CE"}
            ></NumberButton>
            <NumberButton
              clickHandler={() => setMem(calc.backscape(mem))}
              num={"<<"}
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
      </div>
    </div>
  );
}

export default App;

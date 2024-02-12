import { expect, test } from "vitest"
import * as calc from "../src/utils/calculator"
import { Mem } from "../src/types/mem"

test("Input decimal with 10 digits state", () => {
    let mem: Mem = {
        curr: "9000000000",
        history: null,
        sav: null
    }

    mem =  calc.setDecimal(mem)

    expect("9000000000", "It must be same").toBe(mem.curr)
})

test("Input decimal with 9 digits state", () => {
    let mem: Mem = {
        curr: "900000000",
        history: null,
        sav: null
    }

    mem =  calc.setDecimal(mem)
    mem =  calc.setScreen(mem, "1")
    mem =  calc.setScreen(mem, "2")

    expect("900000000.1", "It must be 900000000.1").toBe(mem.curr)
})

test("Input decimal number 1.1", () => {
    let mem: Mem = {
        curr: null,
        history: null,
        sav: null
    }

    mem =  calc.setScreen(mem, "1")
    mem =  calc.setDecimal(mem)
    mem =  calc.setScreen(mem, "1")

    expect("1.1", "It must be 1.1").toBe(mem.curr)
})

test("Input decimal number 0.1", () => {
    let mem: Mem = {
        curr: null,
        history: null,
        sav: null
    }

    mem =  calc.setDecimal(mem)
    mem =  calc.setScreen(mem, "1")

    expect("0.1", "It must be 0.1").toBe(mem.curr)
})

test("Input decimal number 0.01", () => {
    let mem: Mem = {
        curr: null,
        history: null,
        sav: null
    }

    mem =  calc.setDecimal(mem)
    mem =  calc.setScreen(mem, "0")
    mem =  calc.setScreen(mem, "1")

    expect("0.01", "It must be 0.01").toBe(mem.curr)
})

test("Input decimal number 0.101", () => {
    let mem: Mem = {
        curr: null,
        history: null,
        sav: null
    }

    mem =  calc.setScreen(mem, "1")
    mem =  calc.setDecimal(mem)
    mem =  calc.setScreen(mem, "1")
    mem =  calc.setScreen(mem, "0")
    mem =  calc.setScreen(mem, "1")

    expect("1.101", "It must be 1.101").toBe(mem.curr)
})

test("Input decimal on decimal state", () => {
    let mem: Mem = {
        curr: "0.",
        history: null,
        sav: null
    }

    mem =  calc.setDecimal(mem)

    expect("0.", "It must be 0.").toBe(mem.curr)
})

test("Input decimal on decimal state", () => {
    let mem: Mem = {
        curr: "0.1",
        history: null,
        sav: null
    }

    mem =  calc.setDecimal(mem)

    expect("0.1", "It must be 0.1").toBe(mem.curr)
})

test("Create percent on null state", () => {
    let mem: Mem = {
        curr: null,
        history: null,
        sav: null
    }

    mem =  calc.percent(mem)

    expect(mem.sav, "It must be 0").toBe('0')
})

test("Create percent on zero state", () => {
    let mem: Mem = {
        curr: "0",
        history: null,
        sav: null
    }

    mem =  calc.percent(mem)

    expect(mem.sav, "It must be 0").toBe('0')
})

test("Create percent on number >0", () => {
    let mem: Mem = {
        curr: "10",
        history: null,
        sav: null
    }

    mem =  calc.percent(mem)

    expect(mem.sav, "It must be 0.1").toBe('0.1')
})
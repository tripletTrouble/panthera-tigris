import { expect, test } from "vitest"
import * as calc from "../src/utils/calculator"
import { Mem } from "../src/types/mem"

test("Input [0-9] test on null state", () => {
    const mem: Mem = {
        curr: null,
        history: null,
        sav: null
    }

    const res = calc.setScreen(mem, "1")

    expect("1", "It must be 1").toBe(res.curr)
})

test("Input [1-9] test on zero state", () => {
    const mem: Mem = {
        curr: "0",
        history: null,
        sav: null
    }

    const res = calc.setScreen(mem, "1")

    expect("1", "It must be 1").toBe(res.curr)
})


test("input [1-9] on not null and not zero state", () => {
    const mem: Mem = {
        curr: "1",
        history: null,
        sav: null
    }
    
    const res =  calc.setScreen(mem, "1")
    
    expect("11", "It must be 11").toBe(res.curr)
})

test("Input 0 on zero state", () => {
    const mem: Mem = {
        curr: "0",
        history: null,
        sav: null
    }

    const res =  calc.setScreen(mem, "0")

    expect("0", "It must be 0").toBe(res.curr)
})

test("Input 0 on not zero state", () => {
    const mem: Mem = {
        curr: "1",
        history: null,
        sav: null
    }

    const res =  calc.setScreen(mem, "0")

    expect("10", "It must be 10").toBe(res.curr)
})

test("Input 999 number", () => {
    let mem: Mem = {
        curr: null,
        history: null,
        sav: null
    }

    mem =  calc.setScreen(mem, "9")
    mem =  calc.setScreen(mem, "9")
    mem =  calc.setScreen(mem, "9")

    expect("999", "It must be 999").toBe(mem.curr)
})

test("Input 1000 number", () => {
    let mem: Mem = {
        curr: null,
        history: null,
        sav: null
    }

    mem =  calc.setScreen(mem, "1")
    mem =  calc.setScreen(mem, "0")
    mem =  calc.setScreen(mem, "0")
    mem =  calc.setScreen(mem, "0")

    expect("1000", "It must be 1000").toBe(mem.curr)
})

test("Input with maximum non decimal number", () => {
    let mem: Mem = {
        curr: "9000000000",
        history: null,
        sav: null
    }

    mem = calc.setScreen(mem, "1")

    expect("9000000000", "It must be same").toBe(mem.curr)
})

test("Input with maximum decimal number", () => {
    let mem: Mem = {
        curr: "0.900000001",
        history: null,
        sav: null
    }

    mem = calc.setScreen(mem, "1")

    expect("0.900000001", "It must be same").toBe(mem.curr)
})

test("Backscape on null state", () => {
    let mem: Mem = {
        curr: null,
        history: null,
        sav: null
    }

    mem = calc.backscape(mem)

    expect(null, "It must be null").toBe(mem.curr)
})

test("Backscape on 1 digit state", () => {
    let mem: Mem = {
        curr: "1",
        history: null,
        sav: null
    }

    mem = calc.backscape(mem)

    expect(null, "It must be null").toBe(mem.curr)
})

test("Backscape on >1 digit state", () => {
    let mem: Mem = {
        curr: "12",
        history: null,
        sav: null
    }

    mem = calc.backscape(mem)

    expect("1", "It must be 1").toBe(mem.curr)
})

test("Input negative button with undefined property", () => {
    let mem: Mem = {
        curr: "12",
        history: null,
        sav: null,
    }

    mem = calc.negative(mem)

    expect(true, "It must be 1").toBe(mem.isNegative)
})

test("Input negative button with true state", () => {
    let mem: Mem = {
        curr: "12",
        history: null,
        sav: null,
        isNegative: true
    }

    mem = calc.negative(mem)

    expect(false, "It must be 1").toBe(mem.isNegative)
})

test("Input negative button with false state", () => {
    let mem: Mem = {
        curr: "12",
        history: null,
        sav: null,
        isNegative: false
    }

    mem = calc.negative(mem)

    expect(true, "It must be 1").toBe(mem.isNegative)
})

test("Clear entry", () => {
    let mem: Mem = {
        curr: "12",
        history: "123",
        sav: null,
    }

    mem = calc.clearEntry(mem)

    expect(null, "It must be null").toBe(mem.curr)
})

test("Clear all", () => {
    let mem: Mem = {
        curr: "12",
        history: "123",
        sav: null,
    }

    mem = calc.clearAll()
    const exp: Mem = {curr: null, history: null, sav: null, isNegative: null, decimals: null}

    expect(exp, "It must be same").toStrictEqual(mem)
})
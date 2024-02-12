import { expect, test } from "vitest"
import * as calc from "../src/utils/calculator"
import { Mem } from "../src/types/mem"

test("Operation with null current state", () => {
    const mem: Mem = {
        curr: null,
        history: "123/",
        sav: null
    }

    const res =  calc.operation(mem, "/")

    expect(mem, "It must be same").toStrictEqual(res)
})

test("Operation with null current that change the operator", () => {
    let mem: Mem = {
        curr: null,
        history: null,
        sav: null
    }

    mem =  calc.setScreen(mem, "1")
    mem =  calc.operation(mem, "/")
    mem =  calc.operation(mem, "-")

    expect("1-", "It must be same").toStrictEqual(mem.history)
})

test("Operation with null history", () => {
    const mem: Mem = {
        curr: "1",
        history: null,
        sav: null
    }

    let res =  calc.operation(mem, "/")
    res =  calc.operation(res, "/")

    expect("1/", "It must be same").toStrictEqual(res.history)

    // Current state must be null
    expect(null, "It must be null").toStrictEqual(res.curr)
})

test("Operation with not null history", () => {
    let mem: Mem = {
        curr: "1",
        history: null,
        sav: null
    }

    mem =  calc.operation(mem, "/")
    mem =  calc.operation({...mem, curr: "2"}, "/")

    expect("1/2/", "It must be same").toStrictEqual(mem.history)

    // Current state must be null
    expect(null, "It must be null").toStrictEqual(mem.curr)
})

test("Operation negative number with null history", () => {
    let mem: Mem = {
        curr: null,
        history: null,
        sav: null
    }

    mem =  calc.setScreen(mem, "1")
    mem =  calc.setScreen(mem, "2")
    mem =  calc.negative(mem)
    mem =  calc.operation(mem, "/")

    expect("(-12)/", "It must be same").toStrictEqual(mem.history)
    expect(false, "It must be same").toStrictEqual(mem.isNegative)
    expect(null, "It must be null").toStrictEqual(mem.curr)
})

test("Operation negative number with positive number", () => {
    let mem: Mem = {
        curr: null,
        history: null,
        sav: null
    }

    mem =  calc.setScreen(mem, "1")
    mem =  calc.setScreen(mem, "2")
    mem =  calc.negative(mem)
    mem =  calc.operation(mem, "/")
    mem =  calc.setScreen(mem, "2")
    mem =  calc.operation(mem, "/")


    expect("(-12)/2/", "It must be same").toStrictEqual(mem.history)
    expect(false, "It must be same").toStrictEqual(mem.isNegative)
    expect(null, "It must be null").toStrictEqual(mem.curr)
})

test("Operation negative number with negative number", () => {
    let mem: Mem = {
        curr: null,
        history: null,
        sav: null
    }

    mem =  calc.setScreen(mem, "1")
    mem =  calc.setScreen(mem, "2")
    mem =  calc.negative(mem)
    mem =  calc.operation(mem, "-")
    mem =  calc.setScreen(mem, "2")
    mem =  calc.negative(mem)
    mem =  calc.operation(mem, "+")
    mem =  calc.operation(mem, "+")


    expect("(-12)-(-2)+", "It must be same").toStrictEqual(mem.history)
    expect(false, "It must be same").toStrictEqual(mem.isNegative)
    expect(null, "It must be null").toStrictEqual(mem.curr)
})

test("Operation decimal number with null history", () => {
    let mem: Mem = {
        curr: null,
        history: null,
        sav: null
    }

    mem =  calc.setDecimal(mem)
    mem =  calc.setScreen(mem, "2")
    mem =  calc.operation(mem, "/")


    expect("0.2/", "It must be same").toStrictEqual(mem.history)
    expect(mem.decimals, "It must be same").toStrictEqual(1)
    expect(null, "It must be null").toStrictEqual(mem.curr)
})

test("Operation decimal number with decimal with longer digits", () => {
    let mem: Mem = {
        curr: null,
        history: null,
        sav: null
    }

    mem = calc.setDecimal(mem)
    mem = calc.setScreen(mem, "2")
    mem = calc.operation(mem, "/")
    mem = calc.setDecimal(mem)
    mem = calc.setScreen(mem, "2")
    mem = calc.setScreen(mem, "0")
    mem = calc.setScreen(mem, "1")
    mem = calc.operation(mem, "/")


    expect("0.2/0.201/", "It must be same").toStrictEqual(mem.history)
    expect(mem.decimals, "It must be same").toStrictEqual(3)
    expect(null, "It must be null").toStrictEqual(mem.curr)
})

test("Operation decimal number with decimal with shorter digits", () => {
    let mem: Mem = {
        curr: null,
        history: null,
        sav: null
    }

    mem = calc.setDecimal(mem)
    mem =  calc.setScreen(mem, "2")
    mem =  calc.setScreen(mem, "0")
    mem =  calc.setScreen(mem, "1")
    mem =  calc.operation(mem, "/")
    mem =  calc.setDecimal(mem)
    mem =  calc.setScreen(mem, "2")
    mem =  calc.operation(mem, "/")


    expect("0.201/0.2/", "It must be same").toStrictEqual(mem.history)
    expect(mem.decimals, "It must be same").toStrictEqual(3)
    expect(null, "It must be null").toStrictEqual(mem.curr)
})

test("Percent operator", () => {
    let mem: Mem = {
        curr: null,
        history: null,
        sav: null
    }

    mem = calc.setScreen(mem, '10');
    mem = calc.percent(mem);

    expect(mem.sav, "It must be same").toStrictEqual('0.1')
    expect(mem.history, "It must be null").toStrictEqual(null)
    expect(mem.curr, "It must be null").toStrictEqual(null)
})
import { expect, test } from "vitest"
import * as calc from "../src/utils/calculator"
import { Mem } from "../src/types/mem"

test("Answer with null current state", () => {
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
    mem = calc.answer(mem)


    expect("0.201/0.2/", "It must be same").toStrictEqual(mem.history)
    expect(mem.decimals, "It must be same").toStrictEqual(3)
    expect(null, "It must be null").toStrictEqual(mem.curr)
})

test("Answer with integer result", () => {
    let mem: Mem = {
        curr: null,
        history: null,
        sav: null
    }

    mem =  calc.setScreen(mem, "2")
    mem =  calc.operation(mem, "+")
    mem =  calc.setScreen(mem, "2")
    mem = calc.answer(mem)


    expect("4", "It must be same").toStrictEqual(mem.sav)
    expect(null, "It must be null").toStrictEqual(mem.curr)
    expect(null, "It must be null").toStrictEqual(mem.history)
})

test("Answer with decimal result with same digits", () => {
    let mem: Mem = {
        curr: null,
        history: null,
        sav: null
    }

    mem = calc.setDecimal(mem)
    mem =  calc.setScreen(mem, "1")
    mem =  calc.operation(mem, "+")
    mem = calc.setDecimal(mem)
    mem =  calc.setScreen(mem, "2")
    mem = calc.answer(mem)


    expect("0.3", "It must be same").toStrictEqual(mem.sav)
    expect(null, "It must be null").toStrictEqual(mem.curr)
    expect(null, "It must be null").toStrictEqual(mem.history)
})

test("Answer with decimal result with different digits", () => {
    let mem: Mem = {
        curr: null,
        history: null,
        sav: null
    }

    mem = calc.setDecimal(mem)
    mem =  calc.setScreen(mem, "1")
    mem =  calc.setScreen(mem, "0")
    mem =  calc.setScreen(mem, "1")
    mem =  calc.operation(mem, "+")
    mem = calc.setDecimal(mem)
    mem =  calc.setScreen(mem, "2")
    mem = calc.answer(mem)


    expect("0.301", "It must be same").toStrictEqual(mem.sav)
    expect(null, "It must be null").toStrictEqual(mem.curr)
    expect(null, "It must be null").toStrictEqual(mem.history)
})

test("Answer with undefined answer", () => {
    let mem: Mem = {
        curr: null,
        history: null,
        sav: null
    }

    mem =  calc.setScreen(mem, "1")
    mem =  calc.setScreen(mem, "0")
    mem =  calc.setScreen(mem, "1")
    mem =  calc.operation(mem, "/")
    mem = calc.setDecimal(mem)
    mem =  calc.setScreen(mem, "0")
    mem = calc.answer(mem)


    expect("undefined", "It must be same").toStrictEqual(mem.sav)
    expect(null, "It must be null").toStrictEqual(mem.curr)
    expect(null, "It must be null").toStrictEqual(mem.history)
})

test("Answer with chained calculation", () => {
    let mem: Mem = {
        curr: null,
        history: null,
        sav: null
    }

    mem =  calc.setScreen(mem, "1")
    mem =  calc.operation(mem, "+")
    mem =  calc.setScreen(mem, "2")
    mem = calc.answer(mem)
    mem =  calc.operation(mem, "+")
    mem =  calc.setScreen(mem, "2")
    mem = calc.answer(mem)


    expect(mem.sav, "It must be same").toStrictEqual('5')
    expect(mem.curr, "It must be null").toStrictEqual(null)
    expect(mem.history, "It must be null").toStrictEqual(null)
})

test("Answer with decimal more than 9 digits", () => {
    let mem: Mem = {
        curr: null,
        history: null,
        sav: null
    }

    mem =  calc.setScreen(mem, "10")
    mem =  calc.operation(mem, "/")
    mem =  calc.setScreen(mem, "3")
    mem = calc.answer(mem)


    expect(mem.sav, "It must be same").toStrictEqual('3.333333333')
    expect(mem.curr, "It must be null").toStrictEqual(null)
    expect(mem.history, "It must be null").toStrictEqual(null)
})

test("Answer with decimal less than 9 digits", () => {
    let mem: Mem = {
        curr: null,
        history: null,
        sav: null
    }

    mem =  calc.setScreen(mem, "1")
    mem =  calc.operation(mem, "/")
    mem =  calc.setScreen(mem, "2")
    mem = calc.answer(mem)


    expect(mem.sav, "It must be same").toStrictEqual('0.5')
    expect(mem.curr, "It must be null").toStrictEqual(null)
    expect(mem.history, "It must be null").toStrictEqual(null)
})
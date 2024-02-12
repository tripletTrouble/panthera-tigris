import { Mem } from "../types/mem"

// int32 consist 10 digits only
const max = 10
const maxInt = (2**31)-1
const minInt = -1 * (2**31)

function setScreen (mem: Mem, input: string): Mem {
    // Has saved value from operation
    if (mem.sav) {
        mem.sav = null
    }

    // Input on null and zero state
    if (mem.curr === null || mem.curr === "0") {
        return {...mem, curr: input}
    }

    // Input on not null and not zero state
    const curr = mem.curr
    const currLen = curr.replace(/[^0-9]/, "").length

    // If space available
    if (currLen<max) {
        return {...mem, curr: mem.curr + input}
    }

    // No space avaliable
    return mem
}

function backscape (mem: Mem): Mem {
    // Has current state
    if (mem.curr) {
        const res = mem.curr.slice(0, -1)
        mem = {...mem, curr: res!=="" ? res : null}
    }

    // Does not have current state    
    return mem
}

function negative (mem: Mem): Mem {
    // Set negative value
    return {...mem, isNegative: !mem.isNegative}
}

function setDecimal(mem: Mem): Mem {
    // set decimal on null state
    if (mem.curr === null) {
        return {...mem, curr: "0."}
    }

    // Set decimal on decimal state
    if (mem.curr.includes('.')) {
        return mem
    }

    // Set decimal on non null and non decimal state
    const curr = mem.curr
    const currLen = curr.replace(/[^0-9]/, '').length

    // Space available
    if (currLen<max) {
        return {...mem, curr: `${mem.curr}.`}
    }

    // Space unavailable
    return mem
}

function transform(mem: Mem): Mem {
    if (mem.isNegative) {
        return {...mem, curr: `(-${mem.curr})`, isNegative: false}
    }

    return mem
}

function countDecimals(num: string, mem: Mem): Mem {
    if (num.includes(".")) {
        mem.decimals =  Math.max(Number(mem.decimals ?? 0), (num.length - num.indexOf(".") - 1))
    }

    return mem
}

function operation(mem: Mem, operation: string): Mem {
    // # Operation on null current state
    if (mem.curr === null) {
        if (mem.sav) {
            mem.curr = mem.sav.replace('-','')
            if (mem.sav.indexOf('-') != -1) {
                mem.isNegative = true
            }
            
            mem.sav = null

        }else {
            return {...mem, history: mem.history?.replace(/.$/, operation)}
        }
    }

    

    // Count decimal places for precision
    mem = countDecimals(mem.curr, mem)

    // Negative transformation
    mem = transform(mem)

    // # Operation on non null current state
    // ## Operation on null history
    if (mem.history === null) {
        return {...mem, history: `${mem.curr}${operation}`, sav: null, curr: null}
    }

    // ## Operation on non null history
    return {...mem, history: `${mem.history}${mem.curr}${operation}`, sav: null, curr: null}
}

function answer(mem: Mem): Mem {
    // Has history
    if (mem.history) {
        // Does not have current state
        if (!mem.curr) {
            return mem
        }

        // Evaluate the result
        let evaluated = eval(mem.history + String(Number(mem.curr)))
        
        if (evaluated != 'Infinity') {
            if (Number(mem.decimals) > 0) {
                // Calculate decimal point
                evaluated = Number(evaluated).toFixed(mem.decimals ?? 0)
            }else {
                // Check the result decimal or not
                const dec = String(evaluated).indexOf('.')
                // Check the result decimal places
                const decPl = String(evaluated).length - (dec > -1 ? dec : 0) - 1

                // if more than 9 digits
                if (decPl > 9) {
                    evaluated = Number(evaluated).toFixed(9)
                }
            }
            
            // More than max 32bit number
            if (evaluated > maxInt) {
                evaluated = maxInt
            }
    
            // less then mix 32bit number
            if (evaluated < minInt) {
                evaluated = minInt
            }
        }


        return {history: null, curr: null, sav: String(evaluated == 'Infinity' ? 'undefined' : evaluated)}
    }

    // Does not have history
    return mem
}

function clearEntry(mem: Mem): Mem {
    // Clear current state
    return {...mem, curr: null}
}

function clearAll(): Mem {
    // Clear all state
    return {curr: null, history: null, sav: null, isNegative: null, decimals: null}
}

function percent(mem: Mem): Mem {
    return {history: null, curr: null, sav: String((Number(mem.curr??mem.sav)/100))}
}

export {
    setScreen,
    backscape,
    setDecimal,
    clearEntry,
    clearAll,
    percent,
    negative,
    operation,
    answer
}
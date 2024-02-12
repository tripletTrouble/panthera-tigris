import React from "react";

type Prop = {
    clickHandler: () => void,
    num: string,
    color?: string
}

export default function NumberButton({clickHandler, num, color}: Prop): React.ReactNode {
    switch (color) {
        case "red":
            color = "bg-red-300 border-red-500"
            break;
        case "indigo":
            color = "bg-indigo-300 border-indigo-500"
            break;
        case "blue":
            color = "bg-blue-300 border-blue-500"
            break;
        case "emerald":
            color = "bg-emerald-300 border-emerald-500"
            break;
        case "yellow":
            color = "bg-yellow-300 border-yellow-500"
            break;
        default:
            color = "bg-pink-300 border-pink-500"
    }


    return (<button onClick={() => clickHandler()} className={`px-3 py-2 border ${color} rounded-lg`}>{num}</button>)
}
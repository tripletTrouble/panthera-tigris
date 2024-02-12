import React from "react";
import { Mem } from "../types/mem";

type Prop = {
    mem: Mem
}

export default function Screen({mem}: Prop): React.ReactNode {

    return (<div className="border p-2 bg-slate-50 border-black rounded-lg text-xl text-right font-mono">
        <p className="text-xs mb-2">{mem.history ?? '\xa0'}</p>
        <p>{(mem.curr ?? mem.sav ?? '\xa0')}</p>
    </div>)
}
export type Mem = {
    history?:string | null, 
    curr: string | null,
    sav: string | null,
    oper?: string | null
    decimals?: number | null,
    isNegative?: boolean | null
}
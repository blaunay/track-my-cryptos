import { CryptoMonnaie } from "./crypto.monnaie.enum";

export interface InfoCrypto {
    currency: CryptoMonnaie,
    unitPrice: number,
    quantity: number, 
    initialCost: number,
    currentValue: number,
    gain: number
}
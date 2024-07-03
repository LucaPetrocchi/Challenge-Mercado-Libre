import { Dispatch, SetStateAction } from "react"

export const addPunctuationToPrice = (price: string) => {

  const reverseString = (str: string) => {
    return str.split('').reverse().join('')
  }

  let [priceNoCents, cents] = price.split('.')
  let reversed = reverseString(priceNoCents)
  let modifiedPrice = reversed.match(/.{1,3}/g)

  if (modifiedPrice) {
    return (cents) 
      ? reverseString(modifiedPrice.join(',')) + `.${cents}`
      : reverseString(modifiedPrice.join(','))
  } else {
    return price
  }
}

export const productCountUp = (
  stateVal: number, 
  stateSetter: Dispatch<SetStateAction<number>>, 
  max: number,
) => {
  if (stateVal === max) return;
  stateSetter((prev: number) => prev + 1)
}

export const productCountDown = (
  stateVal: number,
  stateSetter: Dispatch<SetStateAction<number>>
) => {
  if (stateVal === 1) return
  stateSetter((prev: number) => prev - 1)
}
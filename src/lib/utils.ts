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

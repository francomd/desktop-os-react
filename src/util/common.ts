export const generateRandomNumbersBetweenRange = (
  len: number,
  min: number,
  max: number
) => {
  let toReturn = [],
    tempObj = new Map(),
    i = 0

  for (; i < len; i++) {
    const randomInt = Math.floor(Math.random() * (max - min)) + min

    let tmpObjIteration = tempObj.get('key_' + randomInt)

    if (tmpObjIteration === undefined) {
      tmpObjIteration = randomInt
      toReturn.push(randomInt)
    } else {
      i--
    }
  }

  return toReturn
}

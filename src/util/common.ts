export const generateRandomNumbersBetweenRange = (len, min, max) => {
  var toReturn = [],
    tempObj = {},
    i = 0

  for (; i < len; i++) {
    var randomInt = Math.floor(Math.random() * (max - min)) + min
    if (tempObj['key_' + randomInt] === undefined) {
      tempObj['key_' + randomInt] = randomInt
      toReturn.push(randomInt)
    } else {
      i--
    }
  }

  return toReturn
}

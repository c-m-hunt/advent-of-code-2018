var fs = require('fs')
var data = fs.readFileSync('./data/day1.txt', {encoding: 'utf-8'})
var startValue = 0
data = data.split('\n')

let result = data.reduce((x, y) => {
  return x + parseInt(y, 10)
}, startValue)

console.log(result)

startValue = 0
var prevVals = [startValue]
let found = false
while (!found) {
  startValue = data.reduce((x, y) => {
    let newValue = x + parseInt(y, 10)
    if (prevVals.indexOf(newValue) > -1 && !found) {
      found = true;
      console.log('DUPE VALUE ', newValue)
    }
    prevVals.push(newValue)
    return newValue
  }, startValue)
}

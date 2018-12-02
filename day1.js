var fs = require('fs')
var data = fs.readFileSync('./data/day1.txt', {encoding: 'utf-8'})
var startValue = 0
data = data.split('\n')

let result = data.reduce((x, y) => {
  return x + parseInt(y, 10)
}, startValue)

console.log(result)
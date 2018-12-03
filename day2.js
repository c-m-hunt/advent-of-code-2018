var fs = require('fs')
var data = fs.readFileSync('./data/day2.txt', {encoding: 'utf-8'})
var _ = require('lodash')
data = data.split('\n')

let counts = [0, 0, 0, 0]

data.map(row => {
  let letters = row.split('')
  let unique = Array.from(new Set(letters))
  let uniqueCount = []
  unique.map(uniqueLetter => {
    let count = letters.filter(letter => {
      return letter == uniqueLetter
    }).length
    if (!uniqueCount[count]) {
      uniqueCount[count] = 1
    } else {
      uniqueCount[count] ++
    }
  })

  counts[2] = counts[2] + (uniqueCount[2] ? 1 : 0)
  counts[3] = counts[3] + (uniqueCount[3] ? 1 : 0)
})

console.log(counts)
console.log(counts[2] * counts[3])

// Part 2
data.map(row => {
  data.map(row2 => {
    if (row !== row2) {
      let letters = row.split('')
      let letters2 = row2.split('')
      let same = letters.reduce((prevCount, next, i) => {
        return prevCount + (next === letters2[i] ? 1 : 0)
      }, 0)
      if (same === letters.length - 1) {
        console.log(row, row2)
      }
    }
  })
})

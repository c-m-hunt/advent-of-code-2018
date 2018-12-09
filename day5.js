let fs = require('fs')
let data = fs.readFileSync('./data/day5.txt', {encoding: 'utf-8'})

data = data.split('')
processedData = reduceData(data) 

console.log('Part 1')
console.log(processedData.length)

let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
let min = {letter: null, no: null}
alphabet.map(letter => {
  let res = reduceData(data.filter(dataLetter => {
    return dataLetter.toLowerCase() !== letter
  }))
  if (res.length < min.no || min.no === null) {
    min = {letter, no: res.length}
  }
})

console.log('Part 2')
console.log(min)

function processString(data) {
  //console.log(data)
  let prev = ''
  for (let i = 0; i < data.length; i ++) {
    if (data[i].toLowerCase() === prev.toLowerCase() && data[i] !== prev) {
      data[i] = '?'
      data[i - 1] = '?' 
    }
    prev = data[i]
  }
  return data.filter(i => {
    return i !== '?'
  })
}

function reduceData(data) {
  let stable = false
  while (!stable) {
    let dataLen = data.length
    data = processString(data)
    if (dataLen === data.length) {
      stable = true
    }
  }
  return data
}

let fs = require('fs')
let _ = require('lodash')
let data = fs.readFileSync('./data/day7.txt', {encoding: 'utf-8'})

data = parseData(data)

let route = process(data)
console.log('Part 1')
console.log(route.join(''))

function process(data) {
  let allDependencies = getAllDependencies(data)
  let route = []
  while (route.length < Object.keys(allDependencies).length) {
    route.push(getNext(allDependencies, route))
  }
  return route
}

function getNext(deps, route) {
  let keys = Object.keys(deps);
  for (let i = 0; i < keys.length; i ++ ) {
    deps[keys[i]] = deps[keys[i]].filter(letter => route.indexOf(letter) === -1)
  }
  let candidates = Object.keys(deps).filter(letter => deps[letter].length === 0 && route.indexOf(letter) === -1)
  candidates.sort()
  return candidates[0]
}

function getAllDependencies(data) {
  let dependencies = data.map(row => row[0])
  let hasDependencies = data.map(row => row[1])
  let allLetters = dependencies.concat(hasDependencies)
  allLetters = Array.from(new Set(allLetters))
  let allDependencies = {}
  allLetters.map(letter => {
    allDependencies[letter] = getDependencies(letter, data)
  })
  return allDependencies
}

function parseData(data) {
  data = data.split('\n')
  return data.map(row => {
    return row
      .replace('Step ', '')
      .replace(' must be finished before step ','')
      .replace(' can begin.', '')
      .split('')
  })
}

function getDependencies(letter, data) {
  let dependencies = data.filter(row => row[1] === letter)
    .map(row => row[0])
  return Array.from(new Set(dependencies))
}
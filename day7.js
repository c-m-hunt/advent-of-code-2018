let fs = require('fs')
let _ = require('lodash')
let data = fs.readFileSync('./data/day7.txt', {encoding: 'utf-8'})

data = parseData(data)

let route = processSingle(data)
console.log('Part 1')
console.log(route.join(''))

let timing = processMultiple(data, 5, 60)
console.log('Part 2')
console.log(timing)
function processSingle(data) {
  let allDependencies = getAllDependencies(data)
  let route = []
  while (route.length < Object.keys(allDependencies).length) {
    route.push(getNext(allDependencies, route))
  }
  return route
}

function alphaVal(letter) {
  return parseInt(letter, 36) - 9;
}

function processMultiple(data, workerCount, offset) {
  let allDependencies = getAllDependencies(data)
  let route = []
  let workers = []
  for (let i = 0; i < workerCount; i ++) {
    workers.push({ letter: null, finish: 0 })
  }
  let time = -1
  while (route.length < Object.keys(allDependencies).length) {
    time += 1
    for (let i = 0; i < workerCount; i ++) {
      if (workers[i].finish <= time) {
        if (workers[i].letter !== null) {
          route.push(workers[i].letter)
        }
      }
    }
    for (let i = 0; i < workerCount; i ++) {
      if (workers[i].finish <= time) {
        let nextLetter = getNext(allDependencies, route, workers.map(worker => worker.letter))
        if (nextLetter) {
          workers[i].letter = nextLetter
          workers[i].finish = time + alphaVal(workers[i].letter) + offset
        } else {
          workers[i].letter = null
        }
      }
    }
  }
  return time
}

function getNext(deps, route, pending) {
  let keys = Object.keys(deps);
  for (let i = 0; i < keys.length; i ++ ) {
    deps[keys[i]] = deps[keys[i]].filter(letter => route.indexOf(letter) === -1)
  }
  let candidates = Object.keys(deps).filter(letter => deps[letter].length === 0 && (route.concat(pending)).indexOf(letter) === -1)
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
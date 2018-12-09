var _ = require('lodash');

let timetable = getAndParseTimes()
timetable = parseActions(timetable)
processActions(timetable)


// console.log(timetable)

function findMax(sleepTotal) {
  let max = {guard: null, time: 0}
  Object.keys(sleepTotal).map(guard => {
    if (sleepTotal[guard] > max.time) {
      max = {guard, time: sleepTotal[guard]}
    }
  })
  return max
}


function processActions(timetable) {
  let guards = timetable.map(action => {
    return action.guard
  })
  guards = Array.from(new Set(guards))
  let sleepTotal = {}
  guards.map(guard => {
    sleepTotal[guard] = 0
  })
  
  timetable.map(row => {
    if (row.timeAsleep) {
      sleepTotal[row.guard] += row.timeAsleep
    }
  })

  let max = findMax(sleepTotal)
  let guardSleep = getGuardMinutes(timetable, guards)
  let maxMins = getGuardMax(guardSleep, max.guard)

  console.log('Part 1')
  console.log('-------------')
  console.log('Max guard: ', max)
  console.log('Max min: ', maxMins)
  console.log('Checksum: ', max.guard * maxMins.min)

  let maxGuardMin = {guard: null, min: null, occur: 0}
  guards.map(guard => {
    let guardMax = getGuardMax(guardSleep, guard)
    if (guardMax.occur > maxGuardMin.occur) {
      maxGuardMin = { ...guardMax, guard}
    }
  })

  console.log('Part 2')
  console.log('-------------')
  console.log('Max guard: ', maxGuardMin)
  console.log('Checksum: ', parseInt(maxGuardMin.guard) * maxGuardMin.min)
}

function getGuardMax(guardSleep, guard) {
  let maxMins = { min: null, occur: 0}
  guardSleep[guard].map((occur, i) => {
    if (occur > maxMins.occur) {
      maxMins = { min: i, occur}
    }
  })
  return maxMins
}

function getGuardMinutes(timetable, guards) {
  let sleepMins = {}
  guards.map(guard => {
    sleepMins[guard] = _.fill(Array(60), 0)
  })
  timetable.map(row => {
    for (let i = 1; i <= row.timeAsleep; i++) {
      sleepMins[row.guard][row.minute - i] ++
    }
  })
  return sleepMins
}

function parseActions(timetable) {
  timetable = _.sortBy(timetable, ['time'])
  let guard = null
  let lastSleep = null
  timetable = timetable.map(row => {
    let action
    let minute = parseInt(row.time.split(':')[1])
    let timeAsleep = null
    if (row.string.indexOf('falls asleep') > -1) {
      action = 'asleep'
      lastSleep = minute
    } else if (row.string.indexOf('wakes up') > -1) {
      action = 'wake'
      timeAsleep = minute - lastSleep
    } else {
      action = 'shift'
      guard = /(\d+)/.exec(row.string)[1]
    }
    
    delete row.string
    return {
      ...row,
      minute,
      action,
      guard,
      timeAsleep
    }
  })
  return timetable
}

function getAndParseTimes() {
  let fs = require('fs')
  let data = fs.readFileSync('./data/day4.txt', {encoding: 'utf-8'})
  let timeRegex = new RegExp(/\[([^\]]*)\]/)
  data = data.split('\n')
  let timetable = data.map(row => {
    let time = timeRegex.exec(row)[1];
    return {
      time,
      string: row.split(']')[1]
    }
  })
  return timetable
}
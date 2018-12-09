var _ = require('lodash');

let timetable = getAndParseTimes()
timetable = parseActions(timetable)
processActions(timetable)


// console.log(timetable)

function findMax(sleepTotal) {
  let max = {guard: null, time: 0}
  Object.keys(sleepTotal).map(guard => {
    console.log(sleepTotal[guard])
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
  guards = new Set(guards)
  let sleepTotal = {}
  Array.from(guards).map(guard => {
    sleepTotal[guard] = 0
  })
  
  timetable.map(row => {
    if (row.timeAsleep) {
      sleepTotal[row.guard] += row.timeAsleep
    }
  })

  let max = findMax(sleepTotal)
  

  let filteredTimetable = timetable.filter(row => {
    return row.guard === max.guard && row.timeAsleep
  })

  let sleepMins = _.fill(Array(60), 0)
  filteredTimetable.map(row => {
    for (let i = 1; i <= row.timeAsleep; i++) {
      sleepMins[row.minute - i] ++
    }
  })

  let maxMins = { min: null, occur: 0}
  sleepMins.map((occur, i) => {
    if (occur > maxMins.occur) {
      maxMins = { min: i, occur}
    }
  })
  console.log('Part 1')
  console.log('-------------')
  console.log('Max guard: ', max)
  console.log('Max min: ', maxMins)
  console.log('Checksum: ', max.guard * maxMins.min)

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
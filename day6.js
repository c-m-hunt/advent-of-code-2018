let fs = require('fs')
let data = fs.readFileSync('./data/day6.txt', {encoding: 'utf-8'})

data = data.split('\n')
data = data.map(row => {
  return [parseInt(row.split(',')[0]), parseInt(row.split(',')[1])]
})

let minX = data.reduce((x, y) => {
  return Math.min(x, y[0])
}, 999999999999)

let minY = data.reduce((x, y) => {
  return Math.min(x, y[1])
}, 999999999999)

let maxX = data.reduce((x, y) => {
  return Math.max(x, y[0])
}, 0)

let maxY = data.reduce((x, y) => {
  return Math.max(x, y[1])
}, 0)

let areas = {}

data.map((coord, i) => {
  if (coord[0] === minX || coord[0] === maxX || coord[1] === minY || coord[1] === maxY) {
    areas[i] = 0
  } else {
    areas[i] = getArea(coord, data, i)
  }
})

console.log('Part 1')
console.log(Math.max.apply(null, Object.values(areas)))

function getArea(coords, data, i) {
  let area = 0
  let infinite = false;
  for (let x = minX; x <= maxX; x ++) {
    for (let y = minY; y <= maxY; y ++) {
      let claim = true
      let dist = getDist(coords, [x,y])
      for (let z = 0; z < data.length; z ++) {
        if (z !== i) {
          if (getDist(data[z], [x,y]) <= dist) {
            claim = false
          }
        }
      }
      if (claim && (x === minX || x === maxX || y === minY || y === maxY)) {
        infinite = true
      }
      if (claim) {
        area ++
      }
    }
  }
  return infinite ? 0 : area
}

function getDist(pos1, pos2) {
  return Math.abs(pos1[0]-pos2[0]) + Math.abs(pos1[1]-pos2[1]);
}


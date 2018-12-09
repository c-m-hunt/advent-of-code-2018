let claims = getAndParseClaims()
let maxWidth = 0
let maxHeight = 0

claims.map(claim => {
  maxWidth = Math.max(maxWidth, claim.left + claim.width + 1)
  maxHeight = Math.max(maxHeight, claim.top + claim.height + 1)
})

let claimGrid = zeros([maxWidth, maxHeight])

// Add claims
claims.map(claim => {
  for (let x = claim.left; x < claim.left + claim.width; x ++) {
    for (let y = claim.top; y < claim.top + claim.height; y ++) {
      claimGrid[x][y] ++
    }
  }
})

// Count and print multi claims
let multiClaim = 0
for (let x = 0; x < maxWidth; x ++) {
  for (let y = 0; y < maxHeight; y ++) {
    if (claimGrid[x][y] > 1) {
      multiClaim ++
    }
  }
}

console.log(`Part 1: Multiple claimed parts - ${multiClaim}`)

// Find Unique claimeconsole
claims.map(claim => {
  let uniqueClaim = true
  for (let x = claim.left; x < claim.left + claim.width; x ++) {
    for (let y = claim.top; y < claim.top + claim.height; y ++) {
      if (claimGrid[x][y] > 1) {
        uniqueClaim = false
      }
    }
  }
  if (uniqueClaim) {
    console.log("Part 2: Unique claim - ", claim.claim)
  }
})

function getAndParseClaims() {
  var fs = require('fs')
  var data = fs.readFileSync('./data/day3.txt', {encoding: 'utf-8'})
  data = data.split('\n')
  let claims = data.map(row => {
    row = row.split('@')
    dims = row[1].split(':')
    pos = dims[0].split(',')
    size = dims[1].split('x') 
    return {
      claim: row[0].trim(),
      left: parseInt(pos[0], 10),
      top: parseInt(pos[1], 10),
      width: parseInt(size[0], 10),
      height: parseInt(size[1], 10)
    }
  })
  return claims
}

// Helpers
function zeros(dimensions) {
  var array = []
  for (var i = 0; i < dimensions[0]; ++i) {
      array.push(dimensions.length == 1 ? 0 : zeros(dimensions.slice(1)))
  }
  return array
}

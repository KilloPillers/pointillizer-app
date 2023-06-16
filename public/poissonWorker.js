
function dist(p1, p2) {
  return Math.sqrt(Math.pow((p2[0] - p1[0]), 2) + Math.pow(p2[1] - p1[1], 2))
}

function isValidPoint(grid, cellsize, width, height, gwidth, gheight, p, radius) {
  //Make sure point is withing the screen
  if (p[0] < 0 || p[0] >= width || p[1] < 0 || p[1] >= height)
    return false

  //Check Neighboring eight cells
  const xindex = Math.floor(p[0] / cellsize)
  const yindex = Math.floor(p[1] / cellsize)
  const i0 = Math.max(xindex - 1, 0)
  const i1 = Math.min(xindex + 1, gwidth - 1)
  const j0 = Math.max(yindex - 1, 0)
  const j1 = Math.min(yindex + 1, gheight - 1)

  for (let i = i0; i <= i1; i++)
    for (let j = j0; j <= j1; j++)
      if (grid[i][j] != null)
	      if (dist(grid[i][j], p) < radius)
	        return false
  
  return true
}

function insertPoint(grid, cellsize, point) {
  const xindex = Math.floor(point[0] / cellsize)
  const yindex = Math.floor(point[1] / cellsize)
  grid[xindex][yindex] = point
}

function poissondisksampling(radius, width, height, k, padding, pixels) {
  let points = [] // final points
  let active = [] // points being processed

  const minDist = 2*radius+padding

  //initialize our first point
  const rx = Math.random()*width
  const ry = Math.random()*height
  const p0 = [rx, ry, radius, pixels[(width * Math.floor(ry)) + Math.floor(rx)]] 
  let grid = []
  const cellsize = Math.floor(minDist/Math.sqrt(2))

  //figure out number of cells in our grid
  const ncells_width = Math.ceil(width/cellsize) + 1;
  const ncells_height = Math.ceil(height/cellsize) + 1;
  
  //initialize 2D array
  for (let i = 0; i < ncells_width; i++) {
    grid[i] = [];
    for (let j = 0; j < ncells_height; j++)
      grid[i][j] = null
  }

  insertPoint(grid, cellsize, p0)
  points.push(p0)
  active.push(p0)
  //Iterate through our active points
  while (active.length > 0) {
    //choose random point to "test"
    const random_index = Math.floor(Math.random()*active.length)
    const p = active[random_index]

    //Attempt k tries to find if another point could be added to p's surrounding
    let found = false
    for (let tries = 0; tries < k; tries++) {
      const theta = Math.random() * 360
      const new_radius = minDist + Math.random() * minDist 
      const pnewx = p[0] + new_radius * Math.cos( theta * (Math.PI / 180))
      const pnewy = p[1] + new_radius * Math.sin( theta * (Math.PI / 180))
      const pos = [pnewx, pnewy]
      const pnew  = [pnewx, pnewy, radius, pixels[(width * Math.floor(pnewy)) + Math.floor(pnewx)]]
      
      if (!isValidPoint(grid, cellsize, width, height, ncells_width, ncells_height, pos, minDist)) {
        //console.log("Point invalid: ", pnew)
        continue
      }
      points.push(pnew)
      insertPoint(grid, cellsize, pnew)
      active.push(pnew)
      found = true;
      break
    }

    //if no point was found remove p from active array
    if (!found) {
      active.splice(random_index, 1)
    }
  }
  return points
}

self.addEventListener('message', function(event) {
  const {radius, width, height, k, padding, pixels} = event.data;
  const points = poissondisksampling(radius, width, height, k, padding, pixels)
  //TODO fix algorithm's n=1 attribute to work with any number
  self.postMessage(points)
})

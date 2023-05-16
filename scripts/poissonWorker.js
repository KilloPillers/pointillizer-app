function dist(p1, p2) {
  return Math.sqrt(Math.pow((p2[0] - p1[0]), 2) + Math.pow(p2[1] - p1[1], 2))
}

function isValidPoint(grid, cellsize, gwidth, gheight, p, radius) {
  //Make sure point is withing the screen
  if (p[0] < 0 || p[0] >= gwidth || p[1] < 0 || p[1] >= gwidth)
    return false

  //Check Neighboring eight cells
  let xindex = Math.floor(p[0] / cellsize)
  let yindex = Math.floor(p[1] / cellsize)
  let i0 = Math.max(xindex - 1, 0)
  let i1 = Math.min(xindex + 1, gwidth - 1)
  let j0 = Math.max(yindex - 1, 0)
  let j1 = Math.min(yindex + 1, gheight - 1)

  for (let i = i0; i <= i1; i++)
    for (let j = j0; k <= j1; j++)
      if (dist(grid[i][j][1], p) < radius)
	return false
  return true
}

function insertPoint(grid, cellsize, point) {
  let xindex = Math.floor(point[0] / cellsize)
  let yindex = Math.floor(point[1] / cellsize)
  grid[xindex][yindex] = point
}

function poissonDiskSampling(radius, k, width, height, n) {
  let points = [] // final points
  let active = [] // points being processed

  //initialize our first point
  let p0 = [Math.random()*width, Math.random()*height]
  let grid = []
  let cellsize = floor(radius/Math.sqrt(n))

  //figure out number of cells in our grid
  let ncells_width = Math.ceil(width/cellsize) + 1;
  let ncells_height = Math.ceil(height/cellsize) + 1;
  
  //initialize 2D array
  for (let i = 0; i < ncells_width; i++)
    grid[i] = [];
    for (let j = 0; j < ncells_height; j++)
      grid[i][j] = null

  insertPoint(grid, cellsize, p0)
  points.push(p0)
  active.push(p0)

  //Iterate through our active points
  while (active.length() > 0) {
    //choose random point to "test"
    let random_index = Math.floor(Math.random()*active.length())
    let p = active[random_index]

    //Attempt k tries to find if another point could be added to p's surrounding
    let found = false
    for (int tries = 0; tries < k; tries++) {
      let theta = Math.random() * 360
      let new_radius = radius + Math.random() * radius
      let pnewx = p[0] + new_radius * Math.cos( theta * (Math.PI / 180))
      let pnewy = p[1] + new_radius * Math.sin( theta * (Math.PI / 180))
      let pnew  = [pnewx, pnewy]

      if (!isValidPoint(grid, cellsize, ncells_width, ncells_height, pnew, radius))
	continue
      points.push(pnew)
      insertPoint(grid, cellsize, pnew)
      active.push(pnew)
      found = true;
      break
    }

    //if no point was found remove p from active array
    if (!found)
      active.splice(random_index, 1)
  }

  return points
}

self.addEventListener('message', function(event) {
  const {lambda, numPoints} = event.data;

  const points = generatePoits(lambda, numPoints)

  self.postMessage(points)
})

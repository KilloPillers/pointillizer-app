// eslint-disable-line no-restricted-globals
function Grid(radius, width, height, is_recursive, pixels) {
    let points = []

    const max_col = Math.floor(width / (2*radius))
    const max_row = Math.floor(height / (2*radius))
    const x_offset = (width%(2*radius))/2
    const y_offset = (height%(2*radius))/2

    for (let x = x_offset+radius; x < x_offset + (max_col*2*radius); x += 2*radius)
        for (let y = y_offset+radius; y < y_offset + (max_row*2*radius); y += 2*radius)
            points.push([x, y, radius, pixels[(width * Math.floor(y)) + Math.floor(x)]])

    if (is_recursive) {
        const inner_radius = radius*(Math.sqrt(2)-1)
        for (let x = x_offset+(2*radius); x < x_offset + ((max_col)*2*radius); x += 2*radius)
            for (let y = y_offset+(2*radius); y < y_offset + ((max_row)*2*radius); y += 2*radius)
                points.push([x, y, inner_radius, pixels[(width * Math.floor(y)) + Math.floor(x)]])
    }
    
    return points
}

self.addEventListener('message', function(event) {
    const {radius, width, height, is_recursive, pixels} = event.data;
    const points = Grid(radius, width, height, is_recursive, pixels)
    self.postMessage(points)
})
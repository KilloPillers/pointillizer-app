// eslint-disable-line no-restricted-globals
function FibonacciSunflowerSpiral(radius, width, height, fillPercent, pixels) {
    let points = []

    const x0 = width/2
    const y0 = height/2
    const angle = Math.PI * (3 - Math.sqrt(5))
    const max_r = Math.sqrt(((width**2)/4)+((height**2)/4))*(fillPercent/100)
    let r = 0
    let i = 0

    while (r < max_r) {
        r = 5 * Math.sqrt(i)
        let theta = i * angle
        i++
        let x = x0 + r * Math.cos(theta)
        let y = y0 + r * Math.sin(theta)
        if (x < 0 || x >= width || y < 0 || y >= height)
            continue
        let pnew = [x, y, radius, pixels[(width * Math.floor(y)) + Math.floor(x)]]
        points.push(pnew)
    }

    return points
}

self.addEventListener('message', function(event) {
    const {radius, width, height, fillPercent, pixels} = event.data;
    const points = FibonacciSunflowerSpiral(radius, width, height, fillPercent, pixels)
    self.postMessage(points)
})
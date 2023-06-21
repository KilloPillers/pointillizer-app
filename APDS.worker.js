// Algorithm Sources
// https://www.cs.ubc.ca/~rbridson/docs/bridson-siggraph07-poissondisk.pdf
// http://devmag.org.za/2009/05/03/poisson-disk-sampling/
importScripts("/rbush.js")

class MyRBush extends RBush {
    toBBox([x, y]) { return {minX: x, minY: y, maxX: x, maxY: y}; }
    compareMinX(a, b) { return a.x - b.x; }
    compareMinY(a, b) { return a.y - b.y; }
}

function density(rgb){
    return (0.299*rgb[0] + 0.587*rgb[1] + 0.114*rgb[2])/255 
}

function inverted_density(rgb){
    return 1-((0.299*rgb[0] + 0.587*rgb[1] + 0.114*rgb[2])/255)
}

function poisson(width, height, min_radius, max_radius, k, is_inverted, pixels) {
    const density_func = is_inverted ? inverted_density : density
    const point_tree = new MyRBush(); // accept [x, y] points
    let out_points = [];
    let active_points = [];
    let attempts;
    const dimensions = [width, height]
    
    //add first point
    const x0 = Math.random()*width
    const y0 = Math.random()*height
    const c0 = pixels[(width * Math.floor(y0)) + Math.floor(x0)]
    const r0 = min_radius + density_func(c0) * (min_radius - max_radius); 
    const p0 = [x0, y0, r0, c0] 
    
    point_tree.insert(p0);
    out_points.push(p0);
    active_points.push(p0);

    while (active_points.length) {
        const current_point = active_points.splice(Math.floor(Math.random() * active_points.length), 1)[0];
        const point_color = pixels[(width * Math.floor(current_point[1])) + Math.floor(current_point[0])]
        const location_density = 2 * (min_radius + (density_func(point_color) * (max_radius - min_radius)));    // Evaluate the density at the current point
        //location_density  ==  minDist
        attempts = 0;
        while (attempts < k) {
            const range_reduction = attempts / k; // Reduce range of point choices as the attempts increase
            const radius = location_density + ( Math.sqrt(Math.random()) * location_density * range_reduction );
            const angle = 2 * Math.PI * Math.random();
            const pnewx = current_point[0] + radius * Math.cos(angle)
            const pnewy = current_point[1] + radius * Math.sin(angle)
            const new_point = [pnewx, pnewy];

            // Try the new point against the already generated points
            const closestDist = minDist(new_point, point_tree, location_density);
            if (inBox(dimensions, new_point) &&
                closestDist < location_density * 2    &&
                closestDist > location_density ) {
                const new_color = pixels[(width * Math.floor(pnewy)) + Math.floor(pnewx)]
                const point_radius = min_radius + (density_func(new_color) * (max_radius - min_radius))
                const point = [pnewx, pnewy, point_radius, new_color]
                point_tree.insert(point);
                out_points.push(point);
                active_points.push(point)
            }

            attempts++;
        }
    }

    return out_points;
}

// Get the minimum distance from position to a list of points
// within 2x the location_density. This function specifically
// works on the bounding box in the relevent range of points
function minDist(position, point_tree, location_density) {
    const local_points = point_tree.search({
        minX: position[0] - location_density,
        minY: position[1] - location_density,
        maxX: position[0] + location_density,
        maxY: position[1] + location_density,
    });
    if (local_points.length == 0) {
        return Infinity;
    }

    const min = local_points.reduce((prev, current) => {
        return Math.min(prev, pointDist2(position, current));
    }, Infinity);

    return Math.sqrt(min);
}

// Return the distance squared between two points
function pointDist2(v1, v2) {
    return Math.pow(v1[0] - v2[0], 2) + Math.pow(v1[1] - v2[1], 2);
}

function inBox(bbox, point) {
    return point[0] > 0 && point[0] < bbox[0] &&
         point[1] > 0 && point[1] < bbox[1];
}

self.addEventListener('message', function(event) {
    const {width, height, min_radius, max_radius, k, is_inverted, pixels} = event.data;
    const points = poisson(width, height, min_radius, max_radius, k, is_inverted, pixels)
    self.postMessage(points)
})
  
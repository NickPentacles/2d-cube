const COLOR_BG = 'black'
const COLOR_CUBE = 'red'

const SPEED_X = 0.05
const SPEED_Y = 0.15
const SPEED_Z = 0.10

const POINT3D = function(x, y, z) {
    this.x = x
    this.y = y
    this.z = z
}

const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')
document.body.appendChild(canvas)

const h = document.documentElement.clientHeight
const w = document.documentElement.clientWidth

canvas.height = h
canvas.width = w

ctx.fillStyle = COLOR_BG
ctx.strokeStyle = COLOR_CUBE
ctx.lineWidth = w / 100
ctx.lineCap = 'round'

const cx = w / 2
const cy = h / 2
const cz = 0
const size = h / 4
const corners = [
    new POINT3D(cx - size, cy - size, cz - size),
    new POINT3D(cx + size, cy - size, cz - size),
    new POINT3D(cx + size, cy + size, cz - size),
    new POINT3D(cx - size, cy + size, cz - size),
    new POINT3D(cx - size, cy - size, cz + size),
    new POINT3D(cx + size, cy - size, cz + size),
    new POINT3D(cx + size, cy + size, cz + size),
    new POINT3D(cx - size, cy + size, cz + size)
]

const edges = [
    [0,1], [1,2], [2,3], [3,0],
    [4,5], [5,6], [6,7], [7,4],
    [0,4], [1,5], [2,6], [3,7]
]

let timeDelta, timeLast = 0
requestAnimationFrame(loop)

function loop(timeNow) {
    timeDelta = timeNow - timeLast
    timeLast = timeNow

    ctx.fillRect(0, 0, w, h)
    
    let angle = timeDelta * 0.001 * SPEED_Z * Math.PI * 2
    for(let corner of corners) {
        let dx = corner.x - cx 
        let dy = corner.y - cy
        let x = dx * Math.cos(angle) - dy * Math.sin(angle)
        let y = dx * Math.sin(angle) + dy * Math.cos(angle)
        corner.x = x + cx
        corner.y = y + cy
    }

    angle = timeDelta * 0.001 * SPEED_X * Math.PI * 2
    for(let corner of corners) {
        let dy = corner.y - cy 
        let dz = corner.z - cz
        let y = dy * Math.cos(angle) - dz * Math.sin(angle)
        let z = dy * Math.sin(angle) + dz * Math.cos(angle)
        corner.y = y + cy
        corner.z = z + cz
    }

    angle = timeDelta * 0.001 * SPEED_Y * Math.PI * 2
    for(let corner of corners) {
        let dx = corner.x - cx 
        let dz = corner.z - cz
        let x = dz * Math.sin(angle) + dx * Math.cos(angle)
        let z = dz * Math.cos(angle) - dx * Math.sin(angle)
        corner.x = x + cx
        corner.z = z + cz
    }

    for(let edge of edges) {
        ctx.beginPath()
        ctx.moveTo(corners[edge[0]].x, corners[edge[0]].y)
        ctx.lineTo(corners[edge[1]].x, corners[edge[1]].y)
        ctx.stroke()
    }


    requestAnimationFrame(loop)
}

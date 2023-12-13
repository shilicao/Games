const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

class Boundary 
{
    //Property for map boundaries.
    constructor({position}){
        this.position = position
        this.width = 40
        this.height = 40
    }

    //function that prints the boundary 
    draw() {
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.position.width, 
            this.position.height)
    }
}

// const final_boundary = [
//     new map({ position: {x:0, y:0}}),
//     new map({ position: {x:51, y:0}})
// ]

// final_boundary.forEach(border =>{border.draw()})
const final_boundary = new Boundary({ 
    position: {
        x:0, 
        y:0
    }
})
final_boundary.draw()
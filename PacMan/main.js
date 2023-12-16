const canvas = document.querySelector("canvas")
const content = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

class Boundary 
{
    //Property for map boundaries.
    constructor({position}){
        this.position = position
        this.width = 40
        this.height = 40
    }

    //function that prints the boundary 
    print() {
        content.fillStyle = 'blue'
        content.fillRect(this.position.x, this.position.y, this.width, 
            this.height)
    }
}

const final_boundary = [
    new map({ position: {x:0, y:0}}),
    new map({ position: {x:51, y:0}})
]

final_boundary.forEach(border =>{border.print()})
// const final_boundary = new Boundary({ 
//     position: {
//         x:0, 
//         y:0
//     }
// })
// final_boundary.draw()

// const final_boundary2 = new Boundary({ 
//     position: {
//         x:41, 
//         y:0
//     }
// })
// final_boundary2.draw()
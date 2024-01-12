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

// used to generate new corresponding squares for boundaries. 
const map = [
    ['-','-','-','-','-','-',],
    ['-',' ',' ',' ',' ','-',],
    ['-',' ',' ',' ',' ','-',],
    ['-',' ',' ',' ',' ','-',],
    ['-','-','-','-','-','-',],
]

const tmp_boundary = []
map.forEach((row, index) => {
    row.forEach((symbol, index2) => {
        switch(symbol) {
            case '-':
                tmp_boundary.push(new Boundary({
                    positions:{
                        x:40 * index2,
                        y:40 * index
                    }
                }))
                break
        }
    })
})

tmp_boundary.forEach((square) => {square.print()})
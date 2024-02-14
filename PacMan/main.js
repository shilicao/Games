const canvas = document.querySelector("canvas")
const content = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

class Boundary 
{
    static width = 40
    static height = 40

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
    ['-', '-', '-', '-', '-', '-'],
    ['-', ' ', ' ', ' ', ' ', '-'],
    ['-', ' ', '-', '-', ' ', '-'],
    ['-', ' ', ' ', ' ', ' ', '-'],
    ['-', '-', '-', '-', '-', '-']
]
const tmp_boundaries =[]

//Following will generate boundary(a square) dynamically based on the map contents. 
//Switch statement used to handle different object cases. 
map.forEach((row, i) => {
    row.forEach ((object, j) => {
        switch (object) {
            case '-':
                tmp_boundaries.push(
                    new Boundary ({
                        position: {
                            x:Boundary.width*j,
                            y:Boundary.height*i
                        }
                    })
                )
                break
        }
    })
})

//prints the grid, like in a loop.
tmp_boundaries.forEach((boundary) => {
    boundary.print()
})
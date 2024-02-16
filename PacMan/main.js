const canvas = document.querySelector("canvas")
const content = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

//class for map generation.
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

//class for actual game contents
class pacman {
    constructor ({position, velocity}) {
        this.position = position
        this.velocity = velocity // pacman will have movements. 
        this.radius = 15 //circular figure. Number will be subject to change later on
    }

    print() {
        content.beginPath()
        content.arc(this.position.x, this.position.y,
                    this.radius, 0, Math.PI * 2)
        content.fillStyle = "yellow"
        content.fill()
        content.closePath()
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
const man = new pacman({
    position: {
        x: Boundary.width + Boundary.width / 2
        y: Boundary.height + Boundary.height / 2
    },
    velocity: {
        x: 0,
        y: 0
    }
})

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
tmp_boundaries.forEach((boundary) => {boundary.print()})
man.print()

window.addEventListener ('keydown,' ({key})=>{
    console.log(key)
    switch (key) {
        case 'w':
        man.velocity.y = -5
        break
        case 'a':
        man.velocity.y = -5
        break
        case 's':
        man.velocity.y = 5
        break
        case 'd':
        man.velocity.y = 5
        break
    }
})
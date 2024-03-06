const canvas = document.querySelector("canvas")
const content = canvas.getContext("2d")
const points = document.querySelector('#pts')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

//class for map generation.
class Boundary 
{
    static width = 40
    static height = 40

    //Property for map boundaries.
    constructor({position, pic}){
        this.position = position
        this.width = 40
        this.height = 40
        this.pic = pic
    }

    //function that prints the boundary 
    print() {
        // content.fillStyle = 'blue'
        // content.fillRect(this.position.x, this.position.y, this.width, 
        //     this.height)
        content.drawImage(this.pic, this.position.x, this.position.y)
    }
}

//class for actual game contents
class pacman 
{
    constructor ({position, velocity}) {
        this.position = position
        this.velocity = velocity // pacman will have movements. 
        this.radius = 15 //circular figure. Number will be subject to change later on
    }

    print() {
        //will draw out a perfect circle.
        content.beginPath()
        content.arc(this.position.x, this.position.y,
                    this.radius, 0, Math.PI * 2)
        content.fillStyle = "yellow"
        content.fill()
        content.closePath()
    }

    // a small function for every animation that are happening
    update(){
        this.print()
        this.position.x = this.position.x + this.velocity.x
        this.position.y = this.position.y + this.velocity.y
    }
}

class Ghosts 
{
    constructor ({position, velocity, color = "red"}) {
        this.position = position
        this.velocity = velocity // pacman will have movements. 
        this.radius = 15 //not sure about the image. may made some adjustment later on.
        this.color = color
    }

    print() {
        //will draw out a perfect circle.
        content.beginPath()
        content.arc(this.position.x, this.position.y,
                    this.radius, 0, Math.PI * 2)
        content.fillStyle = this.color
        content.fill()
        content.closePath()
    }

    // a small function for every animation that are happening
    update(){
        this.print()
        this.position.x = this.position.x + this.velocity.x
        this.position.y = this.position.y + this.velocity.y
    }
}

class Cookies 
{
    constructor ({position}) {
        this.position = position
        this.radius = 3 //circular figure. Number will be subject to change later on
    }

    print() {
        //will draw out a perfect circle.
        content.beginPath()
        content.arc(this.position.x, this.position.y,
                    this.radius, 0, Math.PI * 2)
        content.fillStyle = "yellow"
        content.fill()
        content.closePath()
    }
}
// used to generate new corresponding squares for boundaries. 
// const map = [
//     ['c1', '-', '-', '-', '-', '-','c2'],
//     ['|', ' ', ' ', ' ', ' ', ' ','|'],
//     ['|', ' ', 'square', ' ', 'square', ' ','|'],
//     ['|', ' ', ' ', ' ', ' ', ' ','|'],
//     ['|', ' ', 'square', ' ', 'square', ' ','|'],
//     ['|', ' ', ' ', ' ', ' ', ' ','|'],
//     ['c3', '-', '-', '-', '-', '-','c4']
// ]
const map = [
    ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '7', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
    ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
    ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '+', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
    ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
    ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '5', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '|'],
    ['3', '-', '-', '-', '-', '-', '-', '-', '-', '-', '4']
]

const dots = []
const tmp_boundaries =[]
const man = new pacman({
    position: {
        //formulas for the circle to spawn in the center.
        x: Boundary.width + Boundary.width / 2,
        y: Boundary.height + Boundary.height / 2
    },
    velocity: {
        x: 0,
        y: 0
    }
})
const ghosts = new Ghosts({
    position: {
        //formulas for the circle to spawn in the center.
        x: Boundary.width + Boundary.width / 2,
        y: Boundary.height + Boundary.height / 2
    },
    velocity: {
        x: 0,
        y: 0
    }
})

//tracks which keys are pressed when press 2 more keys
let final_key = ''
let scores = -10 // for some reason, my score would start at 10, not 0. 

const k = {
    w:{pressed: false},
    a:{pressed: false},
    s:{pressed: false},
    d:{pressed: false}
}

function importImg(src) 
{
    const img = new Image()
    img.src = src
    return img
}

//Following will generate boundary(a square) dynamically based on the map contents. 
//Switch statement used to handle different object cases. 
map.forEach((row, i) => {
    row.forEach ((object, j) => {
        switch (object) 
        {
            // case '-':
            //     tmp_boundaries.push(
            //         new Boundary ({
            //             position: {
            //                 x:Boundary.width*j,
            //                 y:Boundary.height*i
            //             },
            //             pic:importImg('./images/pipeHorizontal.png')
            //         })
            //     )
            //     break

            // case '|':
            //     tmp_boundaries.push(
            //         new Boundary ({
            //             position: {
            //                 x:Boundary.width*j,
            //                 y:Boundary.height*i
            //             },
            //             pic:importImg('./images/pipeVertical.png')
            //         })
            //     )
            //     break

            // case 'c1':
            //     tmp_boundaries.push(
            //         new Boundary ({
            //             position: {
            //                 x:Boundary.width*j,
            //                 y:Boundary.height*i
            //             },
            //             pic:importImg('./images/pipeCorner1.png')
            //         })
            //     )
            //     break

            // case 'c2':
            //     tmp_boundaries.push(
            //         new Boundary ({
            //             position: {
            //                 x:Boundary.width*j,
            //                 y:Boundary.height*i
            //             },
            //             pic:importImg('./images/pipeCorner2.png')
            //         })
            //     )
            //     break

            // case 'c3':
            //     tmp_boundaries.push(
            //         new Boundary ({
            //             position: {
            //                 x:Boundary.width*j,
            //                 y:Boundary.height*i
            //             },
            //             pic:importImg('./images/pipeCorner3.png')
            //         })
            //     )
            //     break

            // case 'c4':
            //     tmp_boundaries.push(
            //         new Boundary ({
            //             position: {
            //                 x:Boundary.width*j,
            //                 y:Boundary.height*i
            //             },
            //             pic:importImg('./images/pipeCorner4.png')
            //         })
            //     )
            //     break

            // case 'square':
            //     tmp_boundaries.push(
            //         new Boundary ({
            //             position: {
            //                 x:Boundary.width*j,
            //                 y:Boundary.height*i
            //             },
            //             pic:importImg('./images/block.png')
            //         })
            //     )
            //     break
            case '-':
                tmp_boundaries.push(
                  new Boundary({
                    position: {
                      x: Boundary.width * j,
                      y: Boundary.height * i
                    },
                    pic:importImg('./images/pipeHorizontal.png')
                  })
                )
                break
              case '|':
                tmp_boundaries.push(
                  new Boundary({
                    position: {
                      x: Boundary.width * j,
                      y: Boundary.height * i
                    },
                    pic:importImg('./images/pipeVertical.png')
                  })
                )
                break
              case '1':
                tmp_boundaries.push(
                  new Boundary({
                    position: {
                      x: Boundary.width * j,
                      y: Boundary.height * i
                    },
                    pic:importImg('./images/pipeCorner1.png')
                  })
                )
                break
              case '2':
                tmp_boundaries.push(
                  new Boundary({
                    position: {
                      x: Boundary.width * j,
                      y: Boundary.height * i
                    },
                    pic:importImg('./images/pipeCorner2.png')
                  })
                )
                break
              case '3':
                tmp_boundaries.push(
                  new Boundary({
                    position: {
                      x: Boundary.width * j,
                      y: Boundary.height * i
                    },
                    pic:importImg('./images/pipeCorner3.png')
                  })
                )
                break
              case '4':
                tmp_boundaries.push(
                  new Boundary({
                    position: {
                      x: Boundary.width * j,
                      y: Boundary.height * i
                    },
                    pic:importImg('./images/pipeCorner4.png')
                  })
                )
                break
              case 'b':
                tmp_boundaries.push(
                  new Boundary({
                    position: {
                      x: Boundary.width * j,
                      y: Boundary.height * i
                    },
                    pic:importImg('./images/block.png')
                  })
                )
                break
              case '[':
                tmp_boundaries.push(
                  new Boundary({
                    position: {
                      x: j * Boundary.width,
                      y: i * Boundary.height
                    },
                    pic:importImg('./images/capLeft.png')
                  })
                )
                break
              case ']':
                tmp_boundaries.push(
                  new Boundary({
                    position: {
                      x: j * Boundary.width,
                      y: i * Boundary.height
                    },
                    pic:importImg('./images/capRight.png')
                  })
                )
                break
              case '_':
                tmp_boundaries.push(
                  new Boundary({
                    position: {
                      x: j * Boundary.width,
                      y: i * Boundary.height
                    },
                    pic:importImg('./images/capBottom.png')
                  })
                )
                break
              case '^':
                tmp_boundaries.push(
                  new Boundary({
                    position: {
                      x: j * Boundary.width,
                      y: i * Boundary.height
                    },
                    pic:importImg('./images/capTop.png')
                  })
                )
                break
              case '+':
                tmp_boundaries.push(
                  new Boundary({
                    position: {
                      x: j * Boundary.width,
                      y: i * Boundary.height
                    },
                    pic:importImg('./images/pipeCross.png')
                  })
                )
                break
              case '5':
                tmp_boundaries.push(
                  new Boundary({
                    position: {
                      x: j * Boundary.width,
                      y: i * Boundary.height
                    },
                    color: 'blue',
                    pic:importImg('./images/pipeConnectorTop.png')
                  })
                )
                break
              case '6':
                tmp_boundaries.push(
                  new Boundary({
                    position: {
                      x: j * Boundary.width,
                      y: i * Boundary.height
                    },
                    color: 'blue',
                    pic:importImg('./images/pipeConnectorRight.png')
                  })
                )
                break
              case '7':
                tmp_boundaries.push(
                  new Boundary({
                    position: {
                      x: j * Boundary.width,
                      y: i * Boundary.height
                    },
                    color: 'blue',
                    pic:importImg('./images/pipeConnectorBottom.png')
                  })
                )
                break
              case '8':
                tmp_boundaries.push(
                  new Boundary({
                    position: {
                      x: j * Boundary.width,
                      y: i * Boundary.height
                    },
                    pic:importImg('./images/pipeConnectorLeft.png')
                  })
                )
                break
              case '.':
                dots.push(
                  new Cookies({
                    position: {
                      x: j * Boundary.width + Boundary.width/2,
                      y: i * Boundary.height + Boundary.height/2
                    }
                  })
                )
                break
        }
    })
})
function collsion({player, block}){
    return (player.position.y - player.radius + player.velocity.y <= block.position.y + block.height && 
        player.position.x + player.radius + player.velocity.x >= block.position.x && 
        player.position.y + player.radius + player.velocity.y>= block.position.y && 
        player.position.x - player.radius + player.velocity.x <= block.position.x + block.width)
}

function animation (){
    requestAnimationFrame(animation)
    content.clearRect(0, 0, canvas.width, canvas.height)

    //up direction
    if (k.w.pressed && final_key === 'w')
    {
        //{...man} = duplicating pacman objects into itself.
        for (let index = 0; index < tmp_boundaries.length; index++)
        {   
            const boundary = tmp_boundaries[index]
            if (collsion({player: {...man, velocity: {x:0, y:-5}}, block:boundary}))
            {
                man.velocity.y = 0
                break
            }
            else
            {
                man.velocity.y = -5
            }

        }
        
    }
    
    //left direction
    if (k.a.pressed && final_key === 'a')
    {
        for (let index = 0; index < tmp_boundaries.length; index++)
        {   
            const boundary = tmp_boundaries[index]
            if (collsion({player: {...man, velocity: {x:-5, y:0}}, block:boundary}))
            {
                man.velocity.x = 0
                break
            }
            else
            {
                man.velocity.x = -5
            }

        }
    }

    //down direction
    if (k.s.pressed && final_key === 's')
    {
        for (let index = 0; index < tmp_boundaries.length; index++)
        {   
            const boundary = tmp_boundaries[index]
            if (collsion({player: {...man, velocity: {x:0, y:5}}, block:boundary}))
            {
                man.velocity.y = 0
                break
            }
            else
            {
                man.velocity.y = 5
            }

        }
    }

    //right direction
    if (k.d.pressed && final_key === 'd')
    {
        for (let index = 0; index < tmp_boundaries.length; index++)
        {   
            const boundary = tmp_boundaries[index]
            if (collsion({player: {...man, velocity: {x:5, y:0}}, block:boundary}))
            {
                man.velocity.x = 0
                break
            }
            else
            {
                man.velocity.x = 5
            }

        }
    }

    //animation for consuming cookies.
    for (let pos = dots.length - 1; 0 <= pos; pos--) 
    {
      const dot = dots[pos]
      dot.print()
      if (Math.hypot(dot.position.x - man.position.x,
          dot.position.y - man.position.y) < dot.radius + man.radius) 
      {
        dots.splice(pos, 1)
        scores = scores + 10
        pts.innerHTML = scores
      }
    }
    
    //prints the grid, like in a loop.
    tmp_boundaries.forEach((boundary) => {
        boundary.print()

        //checks for overlapping, so the pacman does not go out of the designed boundary
        //velocity in this case will always be negative.
        if (collsion({player: man, block: boundary}))
        {
            //console.log ('colliding')
            //the following will make sure the pacman will stop when hits the wall.
            man.velocity.x = 0
            man.velocity.y = 0
        }
    })
    man.update()

    ghosts.forEach(gst => {
        gst.update()
        new collide = []
        if (collsion({player: {...gst, velocity: {x:0, y:5}}, block:boundary}))
        {
            collide.push("left")
        }
        if (collsion({player: {...gst, velocity: {x:0, y:5}}, block:boundary}))
        {
            collide.push("right")
        }
        if (collsion({player: {...gst, velocity: {x:0, y:5}}, block:boundary}))
        {
            collide.push("up")
        }
        if (collsion({player: {...gst, velocity: {x:0, y:5}}, block:boundary}))
        {
            collide.push("down")
        }
    })
    
}
animation()


//here comes to core part of the movements.
window.addEventListener ('keydown', ({key})=>{
    switch (key) {
        case 'w':
            k.w.pressed = true
            final_key = 'w'
            break
        case 'a':
            k.a.pressed = true
            final_key = 'a'
            break
        case 's':
            k.s.pressed = true
            final_key = 's'
            break
        case 'd':
            k.d.pressed = true
            final_key = 'd'
            break
    }
   
})
window.addEventListener ('keyup', ({key})=>{
    switch (key) {
        case 'w':
            k.w.pressed = false
            break
        case 'a':
            k.a.pressed = false
            break
        case 's':
            k.s.pressed = false
            break
        case 'd':
            k.d.pressed = false
            break
    }
})

//come back later
// window.addEventListener('keyup', ({key})=> {
//     console.log(key)
//     switch(key)
//     {
//         case 'ArrowLeft': //a
//             man.velocity.x = -5
//             break
//         case 'ArrowUp': //w
//             man.velocity.y = -5
//             break 
//         case 'ArrowDown'://s
//             man.velocity.y = 5
//             break
//         case 'ArrowRight'://d
//             man.velocity.x = 5
//             break
//     }
//     console.log(man.velocity)
// })


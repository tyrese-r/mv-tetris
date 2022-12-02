let shapes = {
    'O': [
        [0, 1, 1],
        [0, 1, 1],
        [0, 0, 0],
    ],
    'L': [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1],
    ],
    'J': [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
    ],
    'T': [
        [0, 0, 0],
        [0, 1, 0],
        [1, 1, 1],
    ],
    'S': [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
    ],
    'Z': [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
    ],

}
let shapeRotations = {}
let shapeRotationCoords = {}
Object.keys(shapes).forEach(key => {
    let shape = shapes[key]
    shapeRotations[key] = []
    shapeRotationCoords[key] = []


    shape.forEach((row, i) => {
        row.forEach((cell, j) => {
            
            if(cell == 1) {
                shapeRotationCoords[key].push({x: 1 - j, y: 1- i})
                return
            }
        })
    })
    // Get coordinates
    console.log(shape)

    for (let i = 0; i < 4; i++) {
        // Copied code for how to rotate a 2d array
        // https://stackoverflow.com/a/58668351
        shape = shape[0].map((val, index) => shape.map(row => row[index]).reverse())

        shapeRotations[key].push(`${shape[0].join('')}${shape[1].join('')}${shape[2].join('')}`)
       
    
    }
})
console.log(shapeRotationCoords)

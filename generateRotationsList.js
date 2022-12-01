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
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0],
    ],
    'Z': [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1],
    ],

}
let shapeRotations = {}
Object.keys(shapes).forEach(key => {
    let shape = shapes[key]
    shapeRotations[key] = []

    for (let i = 0; i < 4; i++) {
        // https://stackoverflow.com/a/58668351
        shape = shape[0].map((val, index) => shape.map(row => row[index]).reverse())
    
    
        console.log(`${key}`)
        console.log(shape[0])
        console.log(shape[1])
        console.log(shape[2])
        console.log(`\n`)

        
        // Convert to string
        console.log()

        shapeRotations[key].push(`${shape[0].join('')}${shape[1].join('')}${shape[2].join('')}`)
        console.log(shapeRotations)
    
    }
})


// FInd middle cell:
// Find adjacent cells then add to 2d array
// Find the pattern that matches
// Replace with next pattern / check for collisions first

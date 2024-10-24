async function readFiles(event) {
    const fileInputs = event.currentTarget.files;
    let result = await Promise.all(getFilesAsText(fileInputs));
    processInput(result);
}

function getFilesAsText(files) {
    let fileTasks = [];
    for (let i=0; i < files.length; i++) {
        const file = files[i];
        let reader = new FileReader();
        if (file.type === 'text/plain') {
            fileTasks[0] = new Promise(
                resolve => {
                reader.onload = () => {
                    resolve(reader.result);
                }
                reader.readAsText(file);
                }
            );
        } else if (file.type === 'application/json') {
            fileTasks[1] = new Promise(
                resolve => {
                reader.onload = () => {
                    resolve(reader.result);
                }
                reader.readAsText(file);
                }
            );
        }
    }
    return fileTasks;
}

function processInput(files) {
    const commandArr = files[0].split('\n');
    const coordinatesToAreaArray = JSON.parse(files[1]);
    let commands = [];
    for (let i = 0; i < commandArr.length; i++) {
        const commandParts = commandArr[i].split(' ');
        commands.push(
            {
                direction: commandParts[0],
                value: commandParts[1]
            }
        );
    }
    let depthY = 0;
    let horizontalX = 0;
    let aim = 0;
    let areaKeys = [];
    //set the values for a two dimensional matrix y * x
    let maxY = 0; //# of arrays needed (rows)
    let maxX = 0; //length of each array (columns)
    commands.forEach(command => {
        const intValue = parseInt(command.value);
        switch(command.direction) {
            case 'down':
                aim += intValue;
                break;
            case 'up':
                aim -= intValue;
                break;
            case 'forward':
                horizontalX += intValue;
                depthY += (aim*intValue);
                break;
        }
        if (horizontalX > maxX) {
            maxX = horizontalX;
        }
        if (depthY > maxY) {
            maxY = depthY;
        }
        if (coordinatesToAreaArray[`(${horizontalX},${depthY})`] && !areaKeys.find(k => k === `(${horizontalX},${depthY})`)) {
            areaKeys.push(`(${horizontalX},${depthY})`);
        }
    })
    maxY += 3; //+1 because array starts at 0; +2 for top and bottom scanner rows
    maxX += 3;

    let areaMatrixMap = new Array(maxY);
    for (let i = 0; i < maxY; i++) {
        areaMatrixMap[i] = new Array(maxX).fill(' ');
    }

    areaKeys.forEach(key => {
        const areaArray = coordinatesToAreaArray[key];
        if (areaArray) {
            const xy = key.slice(1,key.length-1).split(',');
            const x = parseInt(xy[0]) + 1;
            const y = parseInt(xy[1]) + 1;
            const areaTop = areaArray.slice(0,3);
            const areaMid = areaArray.slice(3,6);
            const areaBot = areaArray.slice(6,9);
            areaMatrixMap[y-1].splice(x, 3, ...areaTop);
            areaMatrixMap[y].splice(x, 3, ...areaMid);
            areaMatrixMap[y+1].splice(x, 3, ...areaBot);
        }
    });

    let finalAnswer = '';
    
    areaMatrixMap.forEach(row => 
        {
            var rowAnswer = '';
            row.forEach(col => rowAnswer += col);
            rowAnswer += '\n';
            finalAnswer += rowAnswer;
        }
    );

    console.log(finalAnswer);

}
function readFile(event) {
    const myfile = event.target.files[0];
    let reader = new FileReader();
    reader.onload = function() {
        processInput(reader.result);
    }
    reader.readAsText(myfile);
}

function processInput(input) {
    const inputArr = input.split('\n');
    let commands = [];
    console.log(inputArr)
    for (let i = 0; i < inputArr.length; i++) {
        const commandArr = inputArr[i].split(' ');
        commands.push(
            {
                direction: commandArr[0],
                value: commandArr[1]
            }
        );
    }
    let depth = 0;
    let horizontal = 0;
    commands.forEach(command => {
        const intValue = parseInt(command.value);
        switch(command.direction) {
            case 'down':
                depth += intValue;
                break;
            case 'up':
                depth -= intValue;
                break;
            case 'forward':
                horizontal += intValue;
                break;
        }
    })
    let multiple = depth*horizontal;
    //what happens when the result is 0? or negative?
    console.log(`final depth: ${depth}`);
    console.log(`final horizontal position: ${horizontal}`);
    console.log(`multiple: ${multiple}`);
}

processInput('down 1\nforward 19\nforward -9\nup 1\nup 1\nforward 3\ndown 1\nforward 12');
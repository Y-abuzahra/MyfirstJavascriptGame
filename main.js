const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(map) {
        this.map = map;
        this.line = 0;
        this.element = 0;
        this.playerPosition = map[this.line][this.element];
    }

    print() {
        for (let line of this.map) {
            console.log(line.join(''));
        }
    }

    getUserInput() {
        const input = prompt('Which way ')
        if (['w','s','a','d'].includes(input)) {
            return input
        }
        console.log('Ivalid input')
        return this.getUserInput()
    }
    
    movement(userInput) {
        if (userInput === 'd') {
            if (this.element + 1 >= this.map[this.line].length) {
                console.log("You can't get out of the feild")
            } else if (this.getCharcterType(this.map[this.line][this.element + 1]) === 'hat') {
                console.log('You won!');
            } else if (this.getCharcterType(this.map[this.line][this.element + 1]) === 'hole') {
                console.log('You fell into a hole');
            } else {
                this.element += 1
                this.map[this.line][this.element] = pathCharacter;
                this.print()
                return this.movement(this.getUserInput());
            }
            
        } else if (userInput === 'a') {
            if (this.element - 1 <= -1) {
                console.log("You can't get out of the feild")
            } else if (this.getCharcterType(this.map[this.line][this.element - 1]) === 'hat') {
                console.log('You won!');
            } else if (this.getCharcterType(this.map[this.line][this.element - 1]) === 'hole') {
                console.log('You fell into a hole');
            } else {
                this.element -= 1
                this.map[this.line][this.element] = pathCharacter;
                this.print()
                return this.movement(this.getUserInput());
            }
            
        } else if (userInput === 'w') {
            if (this.line - 1 <= -1) {
                console.log("You can't get out of the feild")
            } else if (this.getCharcterType(this.map[this.line - 1][this.element]) === 'hat') {
                console.log('You won!');
            } else if (this.getCharcterType(this.map[this.line - 1][this.element]) === 'hole') {
                console.log('You fell into a hole');
            } else {
                this.line -= 1
                this.map[this.line][this.element] = pathCharacter;
                this.print()
                return this.movement(this.getUserInput());
            }
            
        } else {
            if (this.line + 1 >= this.map.length) {
                console.log("You can't get out of the feild")
            } else if (this.getCharcterType(this.map[this.line + 1][this.element]) === 'hat') {
                console.log('You won!')
            } else if (this.getCharcterType(this.map[this.line + 1][this.element]) === 'hole') {
                console.log('You fell into a hole');
            } else {
                this.line += 1;
                this.map[this.line][this.element] = pathCharacter;
                this.print()
                return this.movement(this.getUserInput());
            }
            
        }
    }

    getCharcterType(playerPosition) {
        if (playerPosition === hat) {
            return 'hat';
        } else if (playerPosition === hole) {
            return 'hole';
        } else {
            return 'field';
        }
    }

    runGame() {
        this.print()
        this.movement(this.getUserInput())
    }
}
    
    

const game1Field = new Field([
    ['*', '░', '░', '░', '░', 'O', '░', 'O', '░', 'O'],
    ['O', 'O', '░', 'O', '░', 'O', 'O', 'O', '░', '░'],
    ['O', '░', '░', '░', '░', '░', '░', 'O', '░', '░'],
    ['░', '░', 'O', '░', '░', 'O', '░', '░', '░', 'O'],
    ['░', 'O', '░', 'O', '░', 'O', '░', 'O', 'O', '░'],
    ['O', '░', '░', '░', '░', '░', 'O', 'O', '░', '░'],
    ['░', '░', 'O', 'O', 'O', '░', '░', '░', '░', '░'],
    ['░', 'O', 'O', '░', '░', '░', '░', 'O', '░', '░'],
    ['░', '░', '░', '░', '░', '░', 'O', 'O', '░', '░'],
    ['░', 'O', '░', '░', 'O', '░', '░', '░', 'O', '^'],
  ]);



game1Field.runGame();
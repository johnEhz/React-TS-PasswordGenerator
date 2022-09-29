import { passOptions } from '../types'
import { characters, numbers, symbols } from '../data'


function randomIntFromInterval(min:number, max:number) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const getRandomPassword = (sttings: passOptions) => {
    let passWord = ''
    for (let i = 0; i < sttings.charLen; i++){
        switch (randomIntFromInterval(0, 2)) {
            case 0: // For Characters
                switch (randomIntFromInterval(0, 1)) { //0 for upperCase, 1 for LowerCase
                    case 0:
                        sttings.upperCase ? 
                        passWord += characters[randomIntFromInterval(0, characters.length - 1)].toUpperCase()
                        : i -= 1
                        break;
                    case 1:
                        sttings.lowerCase ? 
                        passWord += characters[randomIntFromInterval(0, characters.length - 1)].toLowerCase()
                        : i -= 1
                        break;
                    default:
                        break;
                }
                break;
            case 1: // For Numbers
                sttings.numbers ? 
                passWord += numbers[randomIntFromInterval(0, numbers.length - 1)]
                : i -= 1
                break;
            case 2: // For Symbols
                sttings.symbols ? 
                passWord += symbols[randomIntFromInterval(0, symbols.length - 1)]
                : i -= 1
                 break;
            default:
                break;
        }
    }
    return passWord;
}

export default getRandomPassword;
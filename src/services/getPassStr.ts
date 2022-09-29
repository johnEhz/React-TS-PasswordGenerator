import { symbols, characters } from "../data";

export const getUpperLetters = (pass: string) => {
    let upperLetters = 0;
    pass.split('').map(passChar => characters.toUpperCase().split('').find(upperChar => upperChar === passChar ? upperLetters += 1 : null))
    return upperLetters;
}


export const getLowerLetters = (pass: string) => {
    let LowerLetters = 0;
    pass.split('').map(passChar => characters.toLowerCase().split('').find(lowerChar => lowerChar === passChar ? LowerLetters += 1 : null))
    return LowerLetters;
}

export const getNumbers = (pass: string) => {
    let numbers = 0;
    pass.split('').map(letter => Number(letter) || letter === '0' ? numbers += 1: null)
    return numbers;
}

export const getSymbols = (pass: string) => {
    let symbolsAmount = 0;
    pass.split('').map(passChar => symbols.split('').find(symbol => symbol === passChar ? symbolsAmount += 1 : null))
    return symbolsAmount
}

export const getPassStr = (pass: string) => {
    let medidor = 0;

    //ADICIONES
    //Caracteres +(n*3)
    medidor += pass.length * 3;

    //Letras Mayusculas +((len-n)*3/2)
    medidor += (pass.length - getUpperLetters(pass)) * 1.5;

    //Letras Minusculas +((len-n)*3/2)
    medidor += (pass.length - getLowerLetters(pass)) * 1.5;

    //Números +(n*3)
    medidor += getNumbers(pass) * 3;

    //Símbolos +(n*5)
    medidor += getSymbols(pass) * 5;

    //DEDUCCIONES
    //Solo letras -n
    if (getLowerLetters(pass) + getUpperLetters(pass) === pass.length){
        medidor -= pass.length
    }
    //Solo numeros -n
    if (getNumbers(pass) === pass.length){
        medidor -= pass.length
    }


    return medidor >= 100 ? 100 : medidor;
}
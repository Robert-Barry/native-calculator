/*
 *  Function to test if a string is an operand
 *
 *  Arguments:
 *      str: the string to be tested
 * 
 *  Returns:
 *      True if str is an operand.
 */
export const isOperand = (str) => {
    return str === '+' || str === '-' || str === '*' || str === '/';
}

/*
 *  Function to add or concatenate a number to the equation array.
 *
 *  Arguments:
 *      equation: an array for the equation
 *      value: the number to add to the array
 *  
 *  Returns:
 *      An equation array with a potenital new number.
 */
export const numberForEquation = (equation, value) => {
    if (equation.length === 0 || isOperand(equation.at(-1))) {
        equation.push(value);
    } else {
    // Otherwise concat the value to the last index
        equation[equation.length - 1] += value;
    }
    return equation;
}

/*
 *  Function to add or concatenate an operand to the equation array.
 *
 *  Arguments:
 *      equation: an array for the equation
 *      value: the number to add to the array
 * 
 *  Returns:
 *      The equation array with a potential new operand.
 */
export const operandForEquation = (equation, value) => {
    // If the array is not empty
    if (equation.length > 0) {
        // If the final index of the array is an operand
        if (isOperand(equation.at(-1))) {
            // Replace the final value with a new operand
            equation[equation.length - 1] = value;
        } else {
            // Otherwise push the new value
            equation.push(value);
        }
        return equation;
    }
}
/*
 *  Function to handle a generic button press of the calculator

 *  Arguments:
 *      value: the value of the button being pressed
 * 
 *  Returns:
 *      An equation in the form of an array.
 */
export const equationBuilder = (equation, value) => {
    // If the value us a number
    if (!isNaN(value) && value !== ' ') {
        // If the array is empty or the last index is an operand,
        // simply push the value to the array.
        if (equation.length === 0 || isOperand(equation.at(-1))) {
            equation.push(value);
        } else {
            // Otherwise concat the value to the last index
            equation[equation.length - 1] += value;
        }
        // If the value is an operand
    } else if (isOperand(value)) {
        // If the array is not empty
        if (equation.length > 0) {
            // If the final index of the array is an operand
            if (isOperand(equation.at(-1))) {
                // Replace the final value with a new operand
                equation[equation.length - 1] = value;
            } else {
                // Otherwise push the new value
                equation.push(value);
            }
        }
    } else if (value == 'AC') {
        equation = [];
    }

    return equation;
}

/*
 *  Adds two numbers.
 * 
 *  Parameters:
 *      valueX: an addend
 *      ValueY: an addend
 *  
 *  Returns:
 *      The sum.
 */
const add = (valueX, valueY) => {
    return valueX + valueY;
}

/*
 *  Subtracts two numbers.
 * 
 *  Parameters:
 *      valueX: the minuend
 *      ValueY: the subtrahend
 *  
 *  Returns:
 *      The difference.
 */
const subtract = (valueX, valueY) => {
    return valueX - valueY;
}

/*
 *  Multiplies two numbers.
 * 
 *  Parameters:
 *      valueX: a factor
 *      ValueY: a factor
 *  
 *  Returns:
 *      The product.
 */
const multiply = (valueX, valueY) => {
    return valueX * valueY;
}

/*
 *  Divides two numbers.
 * 
 *  Parameters:
 *      valueX: the dividend
 *      ValueY: the divisor
 *  
 *  Returns:
 *      The quotient.
 */
const divide = (valueX, valueY) => {
    return valueX / valueY;
}

/*
 *  A convenience function to help with parsing an array.
 *  Parameters:
 *      arr: a reference to an array with an equation
 *      value: the value to be placed in an array
 *      index: the index being mutated in the array
 */
const mutateArray = (arr, value, index) => {
    // Convert the value to a string and place
    // it in an index that is one before the
    // given index
    arr[index - 1] = String(value);
    // Remove the operand and the next value.
    // This replaces 3 index valuse, for example:
    // '2', '+', '4' is replaced with '6' in the array.
    arr.splice(index, 2);
}

/*
 *  Function to parse an array of numbers and operands making up
 *  an equation. Uses the proper order of operations, but only
 *  for multiplication/division and addition/subtraction.
 * 
 *  Parameters:
 *      equationArray: an array of numbers and operands
 * 
 *  Returns:
 *      A single value array with the result of the equation.
 */
export const parseEquation = (equationArray) => {
    // We'll do 2 passes over the array
    // Copy into a new array
    let newArray = [...equationArray];
    // Pass 1.
    // Loop over the array
    for (let i = 0; i < newArray.length; i++) {
        // Find the multiplication symbol
        if (newArray[i] === '*') {
            // Multiply the previous value and the next value
            const newValue = multiply(Number(newArray[i - 1]), Number(newArray[i + 1]));
            // Replace the previous value with the new value
            mutateArray(newArray, newValue, i);
            i = i - 1;
        } else if (newArray[i] === '/') {
            // Multiply the previous value and the next value
            const newValue = divide(Number(newArray[i - 1]), Number(newArray[i + 1]));
            // Replace the previous value with the new value
            mutateArray(newArray, newValue, i);
            i = i - 1;
        }
    }
    // Pass 2.
    // Simply add and subtract all the remaining values
    for (let j = 0; j < newArray.length; j++) {
        if (newArray[j] === '+') {
            const newValue = add(Number(newArray[j - 1]), Number(newArray[j + 1]));
            mutateArray(newArray, newValue, j);
            j = j - 1;
        } else if (newArray[j] === '-') {
            const newValue = subtract(Number(newArray[j - 1]), Number(newArray[j + 1]));
            mutateArray(newArray, newValue, j);
            j = j - 1;
        }
    }
    return newArray;
}
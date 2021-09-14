class calculator {
    constructor() {
        this.equation = '';
        this.showConsole = false;
    }

    getResults(equation) {
        equation = equation.replace(/\s/g,'');
        try {
            // Creating empty arrays for storing
            // brackets, operators, operands
            let brackets = []
            let operators = []
            let operands = []
            let operandString = ""
        
            for (let index = 0, operatorIndex = 0, bracketIndex = 0; index < equation.length; index++) {
        
                // Checking for operators
                if (equation.charAt(index) == '+'
                    || equation.charAt(index) == '-'
                    || equation.charAt(index) == '*'
                    || equation.charAt(index) == '/') {
        
                    // Below condition is to deal with (a+b)+(c+d) this part of equation
                    if (equation.charAt(index - 1) == ')' && equation.charAt(index + 1) == '(') {
                        operators[operatorIndex++] = "*"
                        brackets[bracketIndex++] = null
                        operators[operatorIndex++] = equation.charAt(index)
                        operandString += " 1 "
                    }
                    // Fetching operators and storing into operators[] array
                    else {
                        operators[operatorIndex++] = equation.charAt(index)
                        brackets[bracketIndex++] = null
        
                        operandString += " "
                    }
                }
                // Fetching brackets and storing into brackets[] array
                else if (equation.charAt(index) == '(' || equation.charAt(index) == ')') {
                    brackets[bracketIndex++] = equation.charAt(index)
                    operators[operatorIndex++] = null
                }
                // Fetching operand digits and storing into operandString
                else {
                    operandString += equation.charAt(index)
                }
            }
        
            // Temp array of operands for further processing
            // before storing operands into operands[] array
            let operandsTemp = operandString.split(" ")
        
            // Storing operands into operands[] array
            let indexOperand = 0;
            for (let index = 0; index < operators.length; index++) {
                if (brackets[index] == null) {
                    operands[index] = Number(operandsTemp[indexOperand++])
                }
                else {
                    operands[index] = null
                }
            }
            operands[operands.length] = Number(operandsTemp[indexOperand])
        
            if (this.showConsole) {
                console.log(brackets);
                console.log(operators);
                console.log(operands);
            }
        
            // Result variables
            let finalResult = 0
        
            // Checking if brackets are present in the equation or not
            if (brackets.length > 0) {
        
                for (let index = 0; index < brackets.length; index++) {
        
                    // Checking for occurance of closing bracket
                    // and then searching for its corresponding
                    // opening bracket by reverse traversing
                    // and then evaluating that particular bracket equation
                    // PROCESSES NESTED BRACKETS AS WELL
                    if (brackets[index] == ')') {
                        let indexBracketEnd = index
                        for (let indexBracket = indexBracketEnd; indexBracket >= 0; indexBracket--) {
                            if (brackets[indexBracket] == '(') {
                                let indexBracketStart = indexBracket
                                this.evaluate(indexBracketStart, indexBracketEnd, operators, operands)
                                brackets[indexBracketStart] = null
                                brackets[indexBracketEnd] = null
                                break
                            }
                        }
                        if (this.showConsole) {
                            console.log(brackets);
                        }
                    }
                }
            }
        
        
        
            // This will evaluate remaining equation (without brackets)
            // after processing brackets (if available)
            finalResult = this.evaluate(0, operators.length, operators, operands)
        
        
            // FINAL RESULT
            if (this.showConsole) {
                console.log(`FINAL RESULT = ${finalResult}`)
            }

            return finalResult;
        } catch(err) {
            console.error(err);
            throw 'Equation is not valid';
        }
    }

    evaluate(indexStart, indexEnd, operators, operands) {

        let result = 0, finalResult = 0;
    
        // First evaluating MULTIPLICATION and DIVISION
        for (let index = indexStart; index < indexEnd; index++) {
    
            let indexFirstOperand = index
            let indexNextOperand = index + 1
            let indexNextOperator = index
    
            if (operators[indexNextOperator] == null) {
                for (let indexNext = indexNextOperator + 1; indexNext < operators.length; indexNext++) {
                    if (operators[indexNext] != null) {
                        indexNextOperator = indexNext
                        indexFirstOperand = indexNext
                        indexNextOperand = indexNext + 1
                        index = indexNext - 1
                        break
                    }
                }
            }
    
            if (operands[indexNextOperand] == null) {
                for (let indexNext = indexNextOperand + 1; indexNext < operands.length; indexNext++) {
                    if (operands[indexNext] != null) {
                        indexNextOperand = indexNext
                        index = indexNext - 1
                        break
                    }
                }
            }
    
            // MULTIPLICATION 
            if (operators[indexNextOperator] == '*') {
                result = operands[indexFirstOperand] * operands[indexNextOperand]
    
                operands[indexNextOperand] = result
                operands[indexFirstOperand] = null
                operators[indexNextOperator] = null
                finalResult = result
                result = 0
    
                if (this.showConsole) {
                    console.log(operands);
                    console.log(operators);
                }
            }
            // DIVISION
            else if (operators[indexNextOperator] == '/') {
                result = operands[indexFirstOperand] / operands[indexNextOperand]
    
                operands[indexNextOperand] = result
                operands[indexFirstOperand] = null
                operators[indexNextOperator] = null
                finalResult = result
                result = 0
    
                if (this.showConsole) {
                    console.log(operands);
                    console.log(operators);
                }
            }
        }
    
        // Next evaluating ADDITION and SUBSTRACTION
        for (let index = indexStart; index < indexEnd; index++) {
    
            let indexFirstOperand = index
            let indexNextOperand = index + 1
            let indexNextOperator = index
    
            if (operators[indexNextOperator] == null) {
                for (let indexNext = indexNextOperator + 1; indexNext < operators.length; indexNext++) {
                    if (operators[indexNext] != null) {
                        indexNextOperator = indexNext
                        indexFirstOperand = indexNext
                        indexNextOperand = indexNext + 1
                        index = indexNext - 1
                        break
                    }
                }
            }
    
            if (operands[indexNextOperand] == null) {
                for (let indexNext = indexNextOperand + 1; indexNext < operands.length; indexNext++) {
                    if (operands[indexNext] != null) {
                        indexNextOperand = indexNext
                        index = indexNext - 1
                        break
                    }
                }
            }
    
            // ADDITION 
            if (operators[indexNextOperator] == '+') {
                result = operands[indexFirstOperand] + operands[indexNextOperand]
    
                operands[indexNextOperand] = result
                operands[indexFirstOperand] = null
                operators[indexNextOperator] = null
                finalResult = result
                result = 0
    
                if (this.showConsole) {
                    console.log(operands);
                    console.log(operators);
                }
            }
            // SUBSTRACTION
            else if (operators[indexNextOperator] == '-') {
                result = operands[indexFirstOperand] - operands[indexNextOperand]
    
                operands[indexNextOperand] = result
                operands[indexFirstOperand] = null
                operators[indexNextOperator] = null
                finalResult = result
                result = 0
    
                if (this.showConsole) {
                    console.log(operands);
                    console.log(operators);
                }
            }
        }
    
        // Returning FINAL RESULT
        return finalResult
    }
}

export default new calculator();

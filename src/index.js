function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {    
    let first,
        second, 
        operator,
        operation;    
    const stackNum = [],
        stackOp = [];

    expr = expr.replace(/\s+/g, '');
    const arr = expr.match(/\W|\w+/g);
    const arrBr = expr.match(/\(|\)/g);

    const array = arr.map( e => {
        if(isNaN(+e)) {
            return e;
        } else {
            return +e;
        }
    });
    
        
    function checkBrackets(arrBr) {
        let checker = 0;
        if(arrBr !== null) {
            arrBr.forEach(e => {
                if(e === '(') {
                    checker++;
                }
                if(e === ')') {
                    checker--;
                    if(checker < 0) {
                        throw new Error("ExpressionError: Brackets must be paired");
                    }
                }
            });
            if(checker > 0) {
                throw new Error("ExpressionError: Brackets must be paired");
            } 
        }
        
    };

    checkBrackets (arrBr);
    

    function priority(operator){
        if(operator === '+' || operator === '-') return 1;
        if(operator === '*' || operator === '/') return 2;
    }
    
    function culcNeighbors(operator, first, second) {
        switch(operator) {
            case '+': return   first + second;
            case '-': return   first - second;
            case '*': return   first * second;
            case '/': if(second === 0){
                throw new Error('TypeError: Division by zero.');
            } else { 
                return   first / second ;
            }
        }
    };


    function implementCuIntegration(array) {
        array.forEach( (e, i) => {
            if(typeof (e) === 'number') {
                stackNum.push(e);
            } else if(e === '(') {
                stackOp.push(e);
            } else if(e === ')') {
                while(stackOp[stackOp.length-1] !== '(') {
                    operator = stackOp.pop();
                    first = stackNum.pop();
                    second = stackNum.pop();
                    operation = culcNeighbors(operator, second, first);
                    stackNum.push(operation);
                };
                stackOp.pop();

            } else if( e === '+' || e === '-' || e === '*' || e === '/' ) {
                while(stackOp.length > 0 && priority(e) <= priority(stackOp[stackOp.length - 1])){
                    operator = stackOp.pop();
                    first = stackNum.pop();
                    second = stackNum.pop();
                    operation = culcNeighbors(operator, second, first);
                    stackNum.push(operation);
                };
                stackOp.push(e);
            }
        });

        while(stackOp.length > 0 ){
            operator = stackOp.pop();
            first = stackNum.pop();
            second = stackNum.pop();
            operation = culcNeighbors(operator, second, first);
            stackNum.push(operation);
        };

        return stackNum[0];
    }
    const result = implementCuIntegration(array);

    return result;
    
}

module.exports = {
    expressionCalculator
}
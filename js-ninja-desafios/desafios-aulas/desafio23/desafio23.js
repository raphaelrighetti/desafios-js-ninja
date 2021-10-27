/*
Vamos desenvolver mais um projeto. A ideia é fazer uma mini-calculadora.
As regras são:
- Deve ter somente 1 input, mas não deve ser possível entrar dados nesse input
diretamente;
- O input deve iniciar com valor zero;
- Deve haver 10 botões para os números de 0 a 9. Cada botão deve ser um número;
- Deve haver 4 botões para as operações principais: soma (+), subtração(-),
multiplicação(x) e divisão(÷);
- Deve haver um botão de "igual" (=) que irá calcular os valores e um botão "CE"
que irá limpar o input, deixando-o com valor 0;
- A cada número pressionado, o input deve atualizar concatenando cada valor
digitado, como em uma calculadora real;
- Ao pressionar um botão com uma das 4 operações, deve aparecer o símbolo da
operação no input. Se o último caractere no input já for um símbolo de alguma
operação, esse caractere deve ser substituído pelo último pressionado.
Exemplo:
- Se o input tem os valores: "1+2+", e for pressionado o botão de
multiplicação (x), então no input deve aparecer "1+2x".
- Ao pressionar o botão de igual, o resultado do cálculo deve ser mostrado no
input;
- Ao pressionar o botão "CE", o input deve ficar zerado.
*/
(function(window, document) {
    var $tela = document.querySelector('[data-js="tela"]');
    var $numberButtons = document.querySelectorAll('[data-js="number-button"]');
    var $operatorButtons = document.querySelectorAll('[data-js="operator-button"]');
    var $equal = document.querySelector('[data-js="equal"]');
    var $CE = document.querySelector('[data-js="CE"]');
    var valorTela = '0';

    $tela.value = valorTela;

    Array.prototype.forEach.call($numberButtons, function(button) {
        button.addEventListener('click', handleClickNumber, false);
    });
    Array.prototype.forEach.call($operatorButtons, function(button) {
        button.addEventListener('click', handleClickOperator, false);
    });
    $operatorButtons[1].addEventListener('click', handleClickMinus, false);
    $equal.addEventListener('click', doOperation, false);
    $CE.addEventListener('click', clearEverything, false);

    function handleClickNumber() {
        if(valorTela === '0') {
            valorTela = this.value;
        } else {
            valorTela += this.value;
        }
        $tela.value = valorTela;
    }
    function handleClickOperator() {
        if(valorTela === '0') {
            return '';
        } else if(isStringOnlyAnOperator(valorTela) === true) {
            return '';
        } else if(isLastIndexAnOperator(valorTela) === true) {
            removeLastIndex(valorTela);
            valorTela += this.value;
        }  else {
            valorTela += this.value;
        }
        $tela.value = valorTela;
    }
    function handleClickMinus() {
        if(valorTela === '0') {
            valorTela = '-';
        } else if(isLastIndexAnOperator(valorTela) === true) {
            removeLastIndex(valorTela);
            valorTela += '-'
        } else {
            valorTela += '-';
        }
        $tela.value = valorTela;
    }
    function isLastIndexAnOperator(str) {
        return /[+x÷-]$/.test(str);
    }
    function isStringOnlyAnOperator(str) {
        return /^[+x÷-]$/.test(str)
    }
    function removeLastIndex(str) {
        valorTela = str.slice(0, -1);
    }
    function clearEverything() {
        valorTela = '0';
        $tela.value = valorTela;
    }
    function doOperation() {
        if(isLastIndexAnOperator(valorTela) === true) {
            removeLastIndex(valorTela)
        }
        var valores = valorTela.match(/-?\d+[+x÷-]?/g);
        valorTela = valores.reduce(function(acum, current) {
            var firstItem;
            if(isLastIndexAnOperator(acum) === true){
                firstItem = acum.slice(0, -1);
            } else {
                firstItem = acum;
            }
            var operator;
            if(isLastIndexAnOperator(acum) === true) {
                operator = acum.split('').pop();
            } else {
                operator = '';
            }
            var lastItem;
            if(isLastIndexAnOperator(current) === true) {
                lastItem = current.slice(0, -1);
            } else {
                lastItem = current;
            }
            var lastOperator;
            if(isLastIndexAnOperator(current) === true) {
                lastOperator = current.split('').pop();
            } else {
                lastOperator = '';
            }
            switch(operator) {
                case '+':
                    return (Number(firstItem) + Number(lastItem)) + lastOperator;
                case '-':
                    return (Number(firstItem) - Number(lastItem)) + lastOperator;
                case 'x':
                    return Number((firstItem) * Number(lastItem)) + lastOperator;
                case '÷':
                    return Number((firstItem) / Number(lastItem)) + lastOperator;
            }
        });
        $tela.value = valorTela;
    }
})(window, document);
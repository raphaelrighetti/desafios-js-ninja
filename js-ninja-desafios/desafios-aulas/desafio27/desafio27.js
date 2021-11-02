(function(window) {
    'use strict';
    /*
    Aproveitando a lib DOM que fizemos na semana anterior, crie agora para ela
    métodos semelhantes aos que existem no array, mas que sirvam para os
    elementos do DOM selecionados.
    Crie os seguintes métodos:
    - forEach, map, filter, reduce, reduceRight, every e some.
    Crie também métodos que verificam o tipo do objeto passado por parâmetro.
    Esses métodos não precisam depender de criar um novo elmento do DOM, podem
    ser métodos estáticos.
    Métodos estáticos não obrigam o uso do `new`, podendo ser usados diretamente
    no objeto, como nos exemplos abaixo:
    DOM.isArray([1, 2, 3]); // true
    DOM.isFunction(function() {}); // true
    DOM.isNumber('numero'); // false
    Crie os seguintes métodos para verificação de tipo:
    - isArray, isObject, isFunction, isNumber, isString, isBoolean, isNull.
    O método isNull deve retornar `true` se o valor for null ou undefined.
    */

    function DOM(seletor) {
        this.element = document.querySelectorAll(seletor);
    }

    DOM.prototype.on = function on(event, func) {
        Array.prototype.forEach.call(this.element, function(item) {
            item.addEventListener(event, func, false);
        });
    }
    DOM.prototype.off = function off(event, func) {
        Array.prototype.forEach.call(this.element, function(item) {
            item.removeEventListener(event, func, false);
        });
    }
    DOM.prototype.get = function get() {
        return this.element;
    }

    DOM.prototype.forEach = function forEach(func) {
        Array.prototype.forEach.call(this.element, func);
    }
    DOM.prototype.map = function map(func) {
        return Array.prototype.map.call(this.element, func);
    }
    DOM.prototype.filter = function filter(func) {
        return Array.prototype.filter.call(this.element, func);
    }
    DOM.prototype.reduce = function reduce() {
        return Array.prototype.reduce.apply(this.element, arguments);
    }
    DOM.prototype.reduceRight = function reduceRight() {
        return Array.prototype.reduceRight.apply(this.element, arguments);
    }
    DOM.prototype.every = function every(func) {
        return Array.prototype.every.call(this.element, func);
    }
    DOM.prototype.some = function some(func) {
        return Array.prototype.some.call(this.element, func);
    }

    DOM.is = function is(obj) {
        return Object.prototype.toString.call(obj);
    }
    DOM.isArray = function isArray(obj) {
        return DOM.is(obj) === '[object Array]';
    }
    DOM.isObject = function isObject(obj) {
        return DOM.is(obj) === '[object Object]';
    }
    DOM.isFunction = function isFunction(obj) {
        return DOM.is(obj) === '[object Function]';
    }
    DOM.isNumber = function isNumber(obj) {
        return DOM.is(obj) === '[object Number]';
    }
    DOM.isString = function isString(obj) {
        return DOM.is(obj) === '[object String]';
    }
    DOM.isBoolean =function isBoolean(obj) {
        return DOM.is(obj) === '[object Boolean]';
    }
    DOM.isNull = function isNull(obj) {
        return DOM.is(obj) === '[object Null]' || DOM.is(obj) === '[object Undefined]';
    }

    var $a = new DOM('[data-js="titulos"]');

    console.log($a.reduce(function(acum, current) {
        return acum + current;
    }));
})(window, document);
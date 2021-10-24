/*
O desafio de hoje será um pequeno projeto: um cronômetro!
As regras para criação do cronômetro são as seguintes:
1. Crie um arquivo index.html e adicione esse script a ele;
2. Crie um campo `input` do tipo `text`, e inicie-o com um valor 0 (zero).
Ele será o nosso cronômetro;
3. Crie 3 botões para as ações do cronômetro: Start, Stop e Reset;
4. Ao clicar em Start, o valor do campo deve ser incrementado de 1 em 1, a
cada segundo;
5. Ao clicar em Stop, o cronômetro deve parar de contar;
6. Ao clicar em Reset, o cronômetro deve zerar e parar de contar.
Utilize o atributo data-js para nomear o campo e os botões. Você pode
usar o nome que achar melhor, desde que ele seja semântico, ou seja, o nome
dado ao elemento HTML deve definir o que o elemento é ou o que ele faz.
*/
(function(window, document) {
    var $segundos = document.querySelector('[data-js="segundos"]');
    var $minutos = document.querySelector('[data-js="minutos"]');
    var $start = document.querySelector('[data-js="start"]');
    var $stop = document.querySelector('[data-js="stop"]');
    var $reset = document.querySelector('[data-js="reset"]');
    var intervalId;
    var segundos = 0;
    var minutos = 0;
    $segundos.value = segundos;
    $minutos.value = minutos;

    function startTimer() {
        segundos++;
        $segundos.value = segundos;
        if(segundos === 60) {
            minutos++;
            $minutos.value = minutos;
            resetSeconds();
        }
    }
    $start.addEventListener('click', function() {
        intervalId = setInterval(startTimer, 1000);
    }, false);
    function stopTimer() {
        clearInterval(intervalId);
    }
    $stop.addEventListener('click', stopTimer, false);
    function resetTimer() {
        segundos = 0;
        minutos = 0;
        $segundos.value = segundos;
        $minutos.value = minutos;
        stopTimer();
    }
    function resetSeconds() {
        segundos = 0;
        $segundos.value = segundos;
    }
    $reset.addEventListener('click', resetTimer, false);
})(window, document);
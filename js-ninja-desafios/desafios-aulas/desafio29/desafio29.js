(function(window, document, DOM) {
    'use strict';

    /*
    Vamos estruturar um pequeno app utilizando módulos.
    Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
    A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
    seguinte forma:
    - No início do arquivo, deverá ter as informações da sua empresa - nome e
    telefone (já vamos ver como isso vai ser feito)
    - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
    um formulário para cadastro do carro, com os seguintes campos:
    - Imagem do carro (deverá aceitar uma URL)
    - Marca / Modelo
    - Ano
    - Placa
    - Cor
    - e um botão "Cadastrar"
    Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
    carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
    aparecer no final da tabela.
    Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
    empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
    Dê um nome para a empresa e um telefone fictício, preechendo essas informações
    no arquivo company.json que já está criado.
    Essas informações devem ser adicionadas no HTML via Ajax.
    Parte técnica:
    Separe o nosso módulo de DOM criado nas últimas aulas em
    um arquivo DOM.js.
    E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
    que será nomeado de "app".
    */

    function app() {
        var $companyName = new DOM('[data-js="company-name"]');
        var $companyNumber = new DOM('[data-js="company-number"]');
        var $formCadastro = new DOM('[data-js="form-cadastro"]');
        var $imagemUrl = new DOM('[data-js="imagem-carro"]');
        var $marcaModelo = new DOM('[data-js="marca-modelo"]');
        var $ano = new DOM('[data-js="ano"]');
        var $placa = new DOM('[data-js="placa"]');
        var $cor = new DOM('[data-js="cor"]');
        var $tbody = new DOM('[data-js="tbody"]');
        var tdCarroImagem = document.createElement('td');
        var tdMarcaModelo = document.createElement('td');
        var tdAno = document.createElement('td');
        var tdPlaca = document.createElement('td');
        var tdCor = document.createElement('td');
        var arrTd = [tdCarroImagem, tdMarcaModelo, tdAno, tdPlaca, tdCor];
        var ajax = new XMLHttpRequest()
        var ajaxData;
    
        $formCadastro.on('submit', handleSubmit);
        $placa.on('input', formatLicensePlate);
        $ano.on('input', formatYear);
        ajax.addEventListener('readystatechange', handleAjaxStateChange, false);
    
        ajax.open('GET', 'company.json');
        ajax.send();
    
        function handleSubmit(event) {
            event.preventDefault();
            if(isImageUrlOk() !== true) {
                alert('Insira uma URL de imagem compatível!');
                return;
            }
            fillTableContent();
        }
    
        function fillTableContent() {
            var newTr = fillTr();
            $tbody.element[0].appendChild(newTr);
        }
    
        function fillTr() {
            var newTr = document.createElement('tr');
            var tdCarroImagem = document.createElement('td');
            var tdMarcaModelo = document.createElement('td');
            var tdAno = document.createElement('td');
            var tdPlaca = document.createElement('td');
            var tdCor = document.createElement('td');
            var carroImagem = document.createElement('img');
            var arrTd;
            carroImagem.src = $imagemUrl.element[0].value;
            tdCarroImagem.appendChild(carroImagem);
            tdMarcaModelo.textContent = $marcaModelo.element[0].value;
            tdAno.textContent = $ano.element[0].value;
            tdPlaca.textContent = $placa.element[0].value;
            tdCor.textContent = $cor.element[0].value;
            arrTd = [tdCarroImagem, tdMarcaModelo, tdAno, tdPlaca, tdCor];
            arrTd.forEach(function(item) {
                newTr.appendChild(item);
            });
            return newTr;
        }
    
        function isImageUrlOk() {
            return $imagemUrl.element[0].value.endsWith('.jpg')
            || $imagemUrl.element[0].value.endsWith('.png')
            || $imagemUrl.element[0].value.endsWith('.jpeg');
        }
    
        function formatLicensePlate() {
            if($placa.element[0].value.length === 4)
                $placa.element[0].value = $placa.element[0].value.replace(/(\w{3})(\w+)/, '$1-$2');
            $placa.element[0].value = $placa.element[0].value.toUpperCase();
        }
    
        function formatYear() {
            $ano.element[0].value = $ano.element[0].value.replace(/\D+/g, '');
        }
    
        function handleAjaxStateChange() {
            if(isRequestOk() === true) {
                ajaxData = JSON.parse(ajax.responseText);
                fillCompanyInformation();
            }
        }
    
        function isRequestOk() {
            return ajax.readyState === 4 && ajax.status === 200;
        }
    
        function fillCompanyInformation() {
            $companyName.element[0].textContent = ajaxData.name;
            $companyNumber.element[0].textContent = ajaxData.phone;
        }
    }
    
    window.app = app;
    app();
})(window, document, window.DOM);
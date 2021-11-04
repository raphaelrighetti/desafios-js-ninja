(function(window, document) {
    'use strict';
    /*
    No HTML:
    - Crie um formulário com um input de texto que receberá um CEP e um botão
    de submit;
    - Crie uma estrutura HTML para receber informações de endereço:
    "Logradouro, Bairro, Estado, Cidade e CEP." Essas informações serão
    preenchidas com os dados da requisição feita no JS.
    - Crie uma área que receberá mensagens com o status da requisição:
    "Carregando, sucesso ou erro."
    No JS:
    - O CEP pode ser entrado pelo usuário com qualquer tipo de caractere, mas
    deve ser limpo e enviado somente os números para a requisição abaixo;
    - Ao submeter esse formulário, deve ser feito um request Ajax para a URL:
    "https://viacep.com.br/ws/[CEP]/json/", onde [CEP] será o CEP passado
    no input criado no HTML;
    - Essa requisição trará dados de um CEP em JSON. Preencha campos na tela
    com os dados recebidos.
    - Enquanto os dados são buscados, na área de mensagens de status, deve mostrar
    a mensagem: "Buscando informações para o CEP [CEP]..."
    - Se não houver dados para o CEP entrado, mostrar a mensagem:
    "Não encontramos o endereço para o CEP [CEP]."
    - Se houver endereço para o CEP digitado, mostre a mensagem:
    "Endereço referente ao CEP [CEP]:"
    - Utilize a lib DOM criada anteriormente para facilitar a manipulação e
    adicionar as informações em tela.
    */
    var $cep = document.querySelector('[data-js="cep"]');
    var $submit = document.querySelector('[data-js="submit"]');
    var $estado = document.querySelector('[data-js="estado"]');
    var $cidade = document.querySelector('[data-js="cidade"]');
    var $bairro = document.querySelector('[data-js="bairro"]');
    var $endereco = document.querySelector('[data-js="endereco"]');
    var $numero = document.querySelector('[data-js="numero"]');
    var $status = document.querySelector('[data-js="status"]');
    var ajax = new XMLHttpRequest();
    var ajaxData;

    $cep.addEventListener('input', adjustCep, false);
    $numero.addEventListener('input', adjustNumber, false);
    $submit.addEventListener('click', ajaxRequisition, false);
    
    function adjustCep() {
        $cep.value = removeNotNumberOrTrace($cep.value);
        if($cep.value.length === 6)
            $cep.value = addTrace($cep.value);
    }
    function adjustNumber() {
        $numero.value = removeNotNumber($numero.value);
    }
    function removeNotNumberOrTrace(str) {
        return str.replace(/[^\d-]+/g, '');
    }
    function removeNotNumber(str) {
        return str.replace(/\D/g, '');
    }
    function addTrace(str) {
        return str.replace(/(\d{5})(\d+)/, '$1-$2');
    }
    function removeTrace(str) {
        return str.replace(/\D/g, '');
    }

    function getStatus(status) {
        switch(status) {
            case 0:
                return 'Esperando envio.';
            case 1:
                return 'Buscando informações para o CEP ' + $cep.value + '...';
            case 2:
                return 'Headers recebidos.';
            case 3:
                return 'Carregando o corpo da resquisição.';
            case 4:
                return 'Concluído!';
        }
    }
    function isRequestOk() {
        return ajax.readyState === 4 && ajax.status === 200;
    }
    function isCEPInvalid() {
        return ajaxData.erro;
    }

    function addAjaxEvent() {
        ajax.addEventListener('readystatechange', function() {
            $status.value = getStatus(ajax.readyState);
            if(isRequestOk() === true) {
                ajaxData = JSON.parse(ajax.responseText);
                if(isCEPInvalid() === true){
                    $status.value = 'Não encontramos o endereço para o CEP ' + $cep.value + '.';
                    removeInformation();
                    return '';
                }    
                $status.value = 'Endereço referente ao CEP ' + $cep.value + ':'
                addInformation();
            }
        }, false);
    }

    function addInformation() {
        $estado.value = ajaxData.uf;
        $cidade.value = ajaxData.localidade;
        $bairro.value = ajaxData.bairro;
        $endereco.value = ajaxData.logradouro;
        $numero.focus();
    }
    function removeInformation() {
        $estado.value = '';
        $cidade.value = '';
        $bairro.value = '';
        $endereco.value = '';
    }

    function ajaxRequisition(event) {
        event.preventDefault();
        var cepSemTraco = removeTrace($cep.value);
        ajax.open('GET', 'https://viacep.com.br/ws/' + cepSemTraco + '/json/');
        ajax.send();
        addAjaxEvent();
    }
})(window, document);
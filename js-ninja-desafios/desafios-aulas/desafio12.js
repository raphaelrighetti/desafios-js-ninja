(function() {
    /*
    Envolva todo o conteúdo desse arquivo em uma IIFE.
    */

    /*
    Crie um objeto chamado `person`, com as propriedades:
        `name`: String
        `lastname`: String
        `age`: Number
    Preencha cada propriedade com os seus dados pessoais, respeitando o tipo
    de valor para cada propriedade.
    */
    var person = {
        name: 'Raphael',
        lastName: 'Righetti',
        age: 18
    };
    console.log( 'Propriedades de "person":' );

    /*
    Mostre no console, em um array, todas as propriedades do objeto acima.
    Não use nenhuma estrutura de repetição, nem crie o array manualmente.
    */
    console.log(Object.keys(person));

    /*
    Crie um array vazio chamado `books`.
    */
    var books = [];

    /*
    Adicione nesse array 3 objetos, que serão 3 livros. Cada livro deve ter a
    seguintes propriedades:
    `name`: String
    `pages`: Number
    */
    var book1 = {name: 'Psicose', pages: 240}
    var book2 = {name: 'O Vilarejo', pages: 96}
    var book3 = {name: 'O Homem de Giz', pages: 272}
    books.push(book1);
    books.push(book2);
    books.push(book3);
    console.log( '\nLista de livros:' );

    /*
    Mostre no console todos os livros.
    */
    var bookNames = [];
    function getBookNames() {
        bookNames = [];
        for(var i in books) {
            bookNames.push(books[i].name);
        }
    }
    getBookNames();
    console.log(bookNames.join(', '));

    console.log( '\nLivro que está sendo removido:' );
    /*
    Remova o último livro, e mostre-o no console.
    */
    console.log(books.pop());

    console.log( '\nAgora sobraram somente os livros:' );
    /*
    Mostre no console os livros restantes.
    */
    getBookNames();
    console.log(bookNames.join(', '));

    /*
    Converta os objetos que ficaram em `books` para strings.
    */
    JSON.stringify(books);
    console.log( '\nLivros em formato string:' );

    /*
    Mostre os livros nesse formato no console:
    */
    console.log(JSON.stringify(books));

    /*
    Converta os livros novamente para objeto.
    */
    // Eles não deixaram de ser objetos
    console.log( '\nAgora os livros são objetos novamente:' );
    console.log(books);

    /*
    Mostre no console todas as propriedades e valores de todos os livros,
    no formato abaixo:
        "[PROPRIEDADE]: [VALOR]"
    */
    for(var i in books) {
        var bookProperties;
        bookProperties = Object.keys(books[i]);
        console.log('\n' + books[i].name);
        for(var i2 = 0; i2 < bookProperties.length; i2++) {
            var nameOrPages;
            i2 === 0 ? nameOrPages = 'name' : nameOrPages = 'pages';
            console.log('"' + bookProperties[i2] + ': ' + books[i][nameOrPages] + '"');
        }
    }

    /*
    Crie um array chamado `myName`. Cada item desse array deve ser uma letra do
    seu nome. Adicione seu nome completo no array.
    */
    var myName = ['R', 'A', 'P', 'H', 'A', 'E', 'L']
    console.log( '\nMeu nome é:' );

    /*
    Juntando todos os itens do array, mostre no console seu nome.
    */
    console.log(myName.join(''));

    console.log( '\nMeu nome invertido é:' );

    /*
    Ainda usando o objeto acima, mostre no console seu nome invertido.
    */
    myName.reverse();
    console.log(myName.join(''));

    console.log( '\nAgora em ordem alfabética:' );
    /*
    Mostre todos os itens do array acima, odenados alfabéticamente.
    */
    console.log(myName.sort());
})();
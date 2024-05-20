# PGATS_ProgramacaoParaAutomacaoDeTestes_TrabalhoDeConclusao

## [PGATS-2024-01] Programação para Automação de Testes

### Problema

Os usuários do sistema de compras têm uma lista onde podem ver nomes de ferramentas de automação de testes disponíveis para compra. Esta lista contém o nome, preço e fabricante das ferramentas. Eles também podem ter uma lista com os nomes das ferramentas que gostariam de comprar.

### Missão

- Receber a lista de ferramentas disponíveis para compra e a lista de ferramentas que deseja comprar.
- Calcular o total a ser pago pelas ferramentas que deseja comprar, retornando a mensagem: "O valor a pagar pelas ferramentas (Nome da Ferramenta, Nome da Ferramenta, Nome da Ferramenta) é R$ 999.99". A função e a mensagem retornada devem ser capazes de lidar com quantas ferramentas forem passadas como parâmetro.
- Se a lista de ferramentas disponíveis ou a lista de ferramentas para comprar estiverem vazias, um erro com a mensagem "Ambas as listas precisam ter ao menos um item." deve ser exibido.
- Se as ferramentas a comprar não forem encontradas na lista de ferramentas à venda, um erro com a mensagem "Nenhuma ferramenta desejada encontrada." deverá ser exibido.

### Testes

Os testes para esta atividade estão disponíveis [aqui](https://gist.github.com/juliointest/e65ec5820536d26735595fe6b258fdad).

### Instruções

1. Crie uma nova pasta em seu computador onde será armazenado o projeto.
2. Inicie o projeto com o comando `npm init`.
3. Instale o Mocha usando o comando `npm install -D mocha`.
4. Configure o arquivo `package.json` conforme aprendemos em aula para que o comando `npm test` possa executar os testes com Mocha.
5. Crie a pasta `test` e a pasta `src` dentro da raiz do projeto.
6. Crie uma pasta chamada `compras` em ambas as pastas.
7. Crie um arquivo chamado `compras.js` dentro da pasta `src/compras`.
8. Crie e exporte a função `calcularTotal`, que deve ter dois parâmetros: `ferramentas` e `comprar`.
9. Crie um arquivo chamado `compras.test.js` dentro da pasta `test/compras`.
10. Copie os testes contidos no Gist acima e cole dentro do arquivo `compras.test.js`.

### Estrutura do Projeto

PGATS_ProgramacaoParaAutomacaoDeTestes_TrabalhoDeConclusao/
├── node_modules/
├── src/
│ └── compras/
│ └── compras.js
├── test/
│ └── compras/
│ └── compras.test.js
├── package.json
└── README.md

### Instruções para Configuração do Projeto

1. Crie uma nova pasta em seu computador onde será armazenado o projeto.
2. Abra um terminal na raiz do projeto e execute o comando `npm install` para instalar as dependências necessárias.
3. Para rodar os testes, execute o comando `npm test`.

### Arquivo `compras.js`

const calcularTotal = (ferramentas, comprar) => {
    if (ferramentas.length === 0 || comprar.length === 0) {
        throw new Error("Ambas as listas precisam ter ao menos um item.");
    }

    let total = 0;
    let ferramentasCompradas = [];

    for (let item of comprar) {
        let ferramenta = ferramentas.find(f => f.nome === item);
        if (!ferramenta) {
            throw new Error("Nenhuma ferramenta desejada encontrada.");
        }
        total += ferramenta.preco;
        ferramentasCompradas.push(ferramenta.nome);
    }

    return `O valor a pagar pelas ferramentas (${ferramentasCompradas.join(', ')}) é R$ ${total.toFixed(2)}`;
};

module.exports = calcularTotal;

### Arquivo compras.test.js

const calcularTotal = require("../../src/compras/compras");
const assert = require("node:assert");

describe('Compras', () => {
    describe('#calcularTotal', () => {
        it('deve calcular o total a pagar pelas ferramentas', () => {
            const ferramentas = [
                { nome: "UFT", preco: 100, fabricante: "OpenText" },
                { nome: "TestComplete", preco: 200, fabricante: "Smartbear" },
                { nome: "TOSCA", preco: 300, fabricante: "Tricents" }
            ];
            const comprar = ["UFT", "TOSCA"];

            const resultado = calcularTotal(ferramentas, comprar);

            assert.strictEqual(resultado, "O valor a pagar pelas ferramentas (UFT, TOSCA) é R$ 400.00");
        });

        it('deve retornar "Nenhuma ferramenta desejada encontrada." se nenhuma ferramenta desejada estiver disponível', () => {
            const ferramentas = [
                { nome: "UFT", preco: 100, fabricante: "OpenText" },
                { nome: "TestComplete", preco: 200, fabricante: "Smartbear" },
                { nome: "TOSCA", preco: 300, fabricante: "Tricents" }
            ];

            const comprar = ["Selenium", "Cypress"];

            assert.throws(() => {
                calcularTotal(ferramentas, comprar);
            }, Error("Nenhuma ferramenta desejada encontrada."));
        });

        it('deve lançar uma exceção com a mensagem correta se a lista de ferramentas estiver vazia', () => {
            const ferramentas = [];
            const comprar = ["UFT", "TOSCA"];

            assert.throws(() => {
                calcularTotal(ferramentas, comprar);
            }, Error("Ambas as listas precisam ter ao menos um item."));
        });

        it('deve lançar uma exceção com a mensagem correta se a lista de tecnologias a comprar estiver vazia', () => {
            const ferramentas = [
                { nome: "UFT", preco: 100, fabricante: "OpenText" },
                { nome: "TestComplete", preco: 200, fabricante: "Smartbear" },
                { nome: "TOSCA", preco: 300, fabricante: "Tricents" }
            ];
            const comprar = [];

            assert.throws(() => {
                calcularTotal(ferramentas, comprar);
            }, Error("Ambas as listas precisam ter ao menos um item."));
        });

        it('deve lançar uma exceção com a mensagem correta se as duas listas de ferramentas estiverem vazias', () => {
            const ferramentas = [];
            const comprar = [];

            assert.throws(() => {
                calcularTotal(ferramentas, comprar);
            }, Error("Ambas as listas precisam ter ao menos um item."));
        });
    });
});

### Arquivo package.json

{
  "name": "pgats_programacaoparaautomacaodetestes_trabalhodeconclusao",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "directories": {
    "test": "test"
  },
  "scripts": {
    "test": "mocha 'test/**/*.test.js'"
  },
  "author": "Oliveira, Diogo",
  "license": "ISC",
  "devDependencies": {
    "mocha": "^9.0.0",
    "chai": "^4.0.0"
  }
}

### Exemplo de Uso da Função

const ferramentas = [
  { nome: "UFT", preco: 100, fabricante: "OpenText" },
  { nome: "TestComplete", preco: 200, fabricante: "Smartbear" },
  { nome: "TOSCA", preco: 300, fabricante: "Tricents" }
];

const comprar = ["UFT", "TOSCA"];

const resultado = calcularTotal(ferramentas, comprar);
console.log(resultado); // O valor a pagar pelas ferramentas (UFT, TOSCA) é R$ 400.00

### Professor da matéria: https://gist.github.com/juliointest
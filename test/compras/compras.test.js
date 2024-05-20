const  calcularTotal = require("../../src/compras/compras")
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

            const comprar = ["Selenium,", "Cypress"];

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
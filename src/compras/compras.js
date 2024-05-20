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

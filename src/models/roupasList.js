export class RoupasLista {
    constructor() {
        this.roupas = [];
    }
    //adicionar roupa
    adicionarRoupa(roupa) {
        this.roupas.push(roupa);
    }
    //pegar pelo id
    pegarRoupaPorId(id) {
        return this.roupas.find((roupa) => roupa.id == id);
    }
    //pegar todos
    pegarTodasRoupas() {
        return this.roupas;
    }

    //atualizar roupa
    atualizarRoupa(id, nome, tipo, tamanho, cor, imagem, quantidade,) {
        this.roupas = this.roupas.map((roupa) => {
            if (roupa.id == id) {
                roupa.nome = nome;
                roupa.tipo = tipo;
                roupa.tamanho = tamanho;
                roupa.cor = cor;
                roupa.imagem = imagem;
                roupa.quantidade = quantidade;
            }
            return roupa;
        });
        return this.pegarRoupaPorId(id);
    }
    //deletar roupa
    deletarRoupa(id) {
        this.roupas = this.roupas.
            filter((roupa) => roupa.id !== id);
    }


    //filtragens
    getByTipo(tipo) {
        return this.roupas.filter((roupa) => roupa.tipo == tipo);
    }
    getByTamanho(tamanho) {
        return this.roupas.filter((roupa) => roupa.tamanho == tamanho);
    }
    getByCor(cor) {
        return this.roupas.filter((roupa) => roupa.cor == cor);
    }
    getsizeandtype(tamanho, tipo) {
        return this.roupas.filter((roupa) => roupa.tamanho == tamanho && roupa.tipo == tipo);
}
}
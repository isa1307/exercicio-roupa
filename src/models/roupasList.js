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
 /*    //filtragens
    getByTipo(tipo) {
        return this.roupas.filter((roupa) => roupa.tipo == tipo);
    }
    getByTamanho(tamanho) {
        return this.roupas.filter((roupa) => roupa.tamanho == tamanho);
    }
    getByCor(cor) {
        return this.roupas.filter((roupa) => roupa.cor == cor);
    } */


    getByTipo(tipo) {
        const roupas = this.getByTipo(tipo);
        return roupas.reduce((acc, roupa) => acc + roupa.quantidade, 0);
    }
   getByTamanho(tamanho) {
        const roupas = this.getByTamanho(tamanho);
        return roupas.reduce((acc, roupa) => acc + roupa.quantidade, 0);
    }
    getByCor(cor) {
        const roupas = this.getByCor(cor);
        return roupas.reduce((acc, roupa) => acc + roupa.quantidade, 0);
    }


}
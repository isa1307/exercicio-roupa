import { Roupa } from "../models/roupa.js";
import { RoupasLista } from "../models/roupasList.js";


const list = new RoupasLista();

//pegar todas as roupas
export const pegarRoupas = (req, res) => {
    const roupas = list.pegarTodasRoupas();

    if (roupas.length) {
        return res.status(200).send({message: `voce tem ${roupas.length} roupas cadastradas`, roupas});
    }
    //filtragen

    const { tipo, tamanho, cor } = req.query;

    if (tipo) {
        const roupas = list.getByTipo(tipo);
        if (roupas.length) {
            filtrado.push(roupas)
        } else {
             return res.status(200).send({
                 message: `não há roupas cadastradas do tipo ${tipo}`
             });

        }
    }
    if (tamanho) {
        const roupas = list.getByTamanho(tamanho);
        if (roupas.length) {
            filtrado.push(roupas)
        }
        // return res.status(200).send({
        //     message: `não há roupas cadastradas do tamanho ${tamanho}`
        // });
    }
    if (cor) {
        const roupas = list.getByCor(cor);
        if (roupas.length) {
            filtrado.push(roupas)
        }

        if(roupas.length === 0) {
            return res.status(404).send({ message: "roupa não encontrada"})
        }
        // return res.status(200).send({
        //     message: `não há roupas cadastradas do cor ${cor}`
        // });
    }

    if (tamanho && tipo) {
        const roupas = list.getByTamanho(tamanho);
        if (roupas.length) {
            return res.status(200).send({ quantity: roupas.length, data: roupas })
        }
    }

    if (!tipo && !tamanho && !cor) {
        const roupas = list.pegarTodasRoupas();

        return res.status(200).send({ quantity: roupas.length, data: roupas })
    }

    return res.status(200).send({ quantity: list.length, data: filtrado})


    // if (roupas.length) {
    //     return res.status(200).send(roupas);
    // }

    // return res.status(200).send({
    //     message: "não há roupas cadastradas"
    // });


}

//pegar roupa por id
export const pegarRoupaPorId = (req, res) => {
    const { id } = req.params;

    const roupa = list.pegarRoupaPorId(id);
    if (!roupa) {
        return res.status(404).send({ message: `Roupa com ID ${id} não encontrada` });
    }
    return res.status(200).send(roupa);
};

//criar roupas
export const adicionarRoupa = (req, res) => {

    let { nome, tipo, tamanho, cor, imagem, quantidade } = req.body;
    tamanho = tamanho.toUpperCase();
    const erros = [];

    const isUrlValida = (url) => {
        const regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
        return regex.test(url);
    } 

    if (!nome || !tipo || !tamanho || !cor || !imagem || !quantidade) {
        return res.status(404).send(
            { message: "parametros invalidos!" });
    }
    //roupas com nome menor com 6 letras e maior que 40 letras
    if (nome.length > 40) {
        console.log("Tamanho maior 40");
        erros.push({ message: "Nome da roupa não pode ser maior que 40 caracteres!" });
    } else if (nome.length < 6) {
        console.log("Tamanho menor 6");
        erros.push({ message: "Nome da roupa não pode ser menor que 6 caracteres!" });
    }

    // tamanho ser somente PP, P , M, G e XG
    if (tamanho != "PP" && tamanho != "P" && tamanho != "M" && tamanho != "G" && tamanho != "XG") {
        erros.push({ message: "tamanho da roupa não pode ser diferente de PP, P, M, G e XG!" });
    }

    // tipo do item deve ser uma string com no máximo 50 caracteres.
    if (tipo.length > 50) {
        erros.push({ message: "Tipo da roupa não pode ser maior que 50 caracteres!" });
    }
    // cor do item deve ser uma string com no máximo 20 caracteres
    if (cor.length > 20) {
        erros.push({ message: "Cor da roupa não pode ser maior que 20 caracteres!" });
    }
    //quantidade em estoque deve ser um número inteiro positivo limitado a 15000
    if (quantidade > 15000) {
        erros.push({ message: "Quantidade da roupa não pode ser maior que 15000!" });
    }
    //imagem do item deve ser uma URL válida png, gif, jpg, jpeg
    if(!isUrlValida(imagem)){
        erros.push({ message: "Imagem da roupa não pode ser diferente de png, gif, jpg, jpeg!" });
    }
    if (erros.length) {
        console.log(erros);
        return res.status(404).send({ message: `corrija! voce tem ${erros.length}`, erros });
    }

    const roupa = new Roupa(nome, tipo, tamanho, cor, imagem, quantidade);

    list.adicionarRoupa(roupa);

    res.status(201).send({ message: "Roupa adicionada com sucesso!", roupa });
}

//atualizar roupa
export const atualizarRoupa = (req, res) => {
    const { id } = req.params;

    let { nome, tipo, tamanho, cor, imagem, quantidade } = req.body;
    tamanho = tamanho.toUpperCase();
    const erros = [];

    if (!nome || !tipo || !tamanho || !cor || !imagem || !quantidade) {
        return res.status(400).send(
            { message: `Roupa com ID ${id} não encontrada` });
    }
    const isUrlValida = (url) => {
        const regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
        return regex.test(url);
    } 

    //roupas com nome menor com 6 letras e maior que 40 letras
    if (nome.length > 40) {
        console.log("Tamanho maior 40");
        erros.push({ message: "Nome da roupa não pode ser maior que 40 caracteres!" });
    } else if (nome.length < 6) {
        console.log("Tamanho menor 6");
        erros.push({ message: "Nome da roupa não pode ser menor que 6 caracteres!" });
    }

    // tamanho ser somente PP, P , M, G e XG
    if (tamanho != "PP" && tamanho != "P" && tamanho != "M" && tamanho != "G" && tamanho != "XG") {
        erros.push({ message: "tamanho da roupa não pode ser diferente de PP, P, M, G e XG!" });
    }

    // tipo do item deve ser uma string com no máximo 50 caracteres.
    if (tipo.length > 50) {
        erros.push({ message: "Tipo da roupa não pode ser maior que 50 caracteres!" });
    }
    // cor do item deve ser uma string com no máximo 20 caracteres
    if (cor.length > 20) {
        erros.push({ message: "Cor da roupa não pode ser maior que 20 caracteres!" });
    }
    //quantidade em estoque deve ser um número inteiro positivo limitado a 15000
    if (quantidade > 15000) {
        erros.push({ message: "Quantidade da roupa não pode ser maior que 15000!" });
    }
      //imagem do item deve ser uma URL válida png, gif, jpg, jpeg
      if(!isUrlValida(imagem)){
        erros.push({ message: "Imagem da roupa não pode ser diferente de png, gif, jpg, jpeg!" });
    }
 
    const roupa = list.pegarRoupaPorId(id);

    if (!roupa) {
        return res.status(404).send(
            { message: `Roupa com ID ${id} não encontrada` });
    }



    const atualizarRoupa = list.atualizarRoupa(nome, tipo, tamanho, cor, imagem, quantidade);
    return res.status(200).send(
        { message: "Roupa atualizada com sucesso!", roupa: atualizarRoupa, roupa });
}

//deletar roupa

export const deletarRoupa = (req, res) => {
    const { id } = req.params;

    const roupa = list.pegarRoupaPorId(id);
    if (!roupa) {
        return res.status(404).send({ message: `Roupa com ID ${id} não encontrada` });
    }
    list.deletarRoupa(id);
    return res.status(200).send({ message: `Roupa ${roupa.nome} deletada com sucesso!` });
}



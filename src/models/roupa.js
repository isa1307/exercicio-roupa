import { v4 as uuidv4 } from 'uuid';

export class Roupa{
    constructor(nome, tipo, tamanho,cor,imagem, quantidade,){
        this.id = uuidv4();
        this.nome = nome;
        this.tipo = tipo;
        this.tamanho = tamanho;
        this.cor = cor;
        this.imagem = imagem;
        this.quantidade = quantidade;
       
    }
}
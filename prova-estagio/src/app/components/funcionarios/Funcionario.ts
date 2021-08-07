export class Funcionario {

    id: any;
    nome: string;
    email: string;
    sexo: string;
    nascimento: string;
    senioridade: string;
    areaDeAtuacao: string[];

    constructor(id, nome, email, sexo, nascimento, senioridade, areaDeAtuacao) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.sexo = sexo;
        this.nascimento = nascimento;
        this.senioridade = senioridade;
        this.areaDeAtuacao = areaDeAtuacao;
    }
}
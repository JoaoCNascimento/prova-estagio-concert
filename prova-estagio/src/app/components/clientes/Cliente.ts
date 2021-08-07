export class Cliente {
    id: any;
    nome: string;
    email: string;
    telefone: string;

    constructor(id, nome, email, telefone) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
    }
}
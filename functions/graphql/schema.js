const { buildSchema } = require('graphql');
module.exports = buildSchema(`

    type Usuario{
        usuarioID: ID!,
        nome: String,
        email:String!,
        senha: String,
        telefone: String,
        nascimento: String,
        endereco: String,
        RG: String,
        CPF: String,
        fotoUrl: String
    }

    type Fornecedor{
        fornecedorId: String!,
        imageUri: String,
        cnpj: String,
        razaoSocial: String,
        endereco: String,
        descricao: String,
        dataDeRegistro: String,
        tipo: String,
        botijao: [ID!],
    }

    type Botijao{
        botijaoId: String!,
        nome: String,
        imageUri: String,
        identificacao: String,
        descricao: String,
        dataDeRegistro: String,
        tipo: String,
        valor: String,
        estoque: String
    }
   
    type Query{
        login(email:String!, password:String!): String,
        usuarios(usuarioID: ID): [Usuario],
        usuarioID(usuarioID: ID): Usuario,
        botijoes(botijaoID: ID):[Botijao],
        fornecedores(fornecedorID: ID): [Fornecedor],
    }

    type Mutation{
        cadastrarUsuario(nome:String, email:String, senha: String, telefone: String ,nascimento: String, endereco: String, RG:String, CPF: String): Int,
        cadastrarFornecedor(imageUri: String, cnpj: String, razaoSocial: String, endereco: String, descricao: String, dataDeRegistro: String, tipo: String, botijao: [ID!]): Int,
        cadastrarBotijao(nome: String, imageUri: String, identificacao: String, descricao: String, dataDeRegistro: String, tipo: String, valor: String, estoque: String): Int,
        usuarioAtualizarSenha(password: String) : Int,
        usuarioAtualizarFotoUrl(fotoUrl: String) : Int,
        botijaoAtualizarImageUri(imageUri: String, botijaoID: ID) : Int,
        cancelarFornecedor(fornecedorID:String): String,
        cancelarBotijao(botijaoID:String): String,
        cancelarUsuario(usuarioID:String): String,
        atualizarFornecedor(fornecedorId: String, cnpj: String, razaoSocial: String, endereco: String, descricao: String, dataDeRegistro: String, tipo: String): Int,
        atualizarBotijao(botijaoId: String!, nome: String, identificacao: String, descricao: String, dataDeRegistro: String, tipo: String, valor: String, estoque: String): Int,
        atualizarUsuario(usuarioID:String, nome:String, email:String, senha: String, telefone: String ,nascimento: String, endereco: String, RG:String, CPF: String): Int,
    }
`)
const admin = require("firebase-admin");
const firebase = require("firebase");
const uniqid = require('uniqid');
const db = admin.firestore();
const usuariosDB = db.collection('usuarios');
const fornecedoresDB = db.collection('fornecedores');
const botijoesDB = db.collection('botijoes');

function returnData(snap) {
    let snapArray = [];
    snap.docs.forEach(doc => {
        snapArray.push(doc.data());
    })
    return snapArray;
}

module.exports = {

    usuarios: async (params, req) => {
        let usuarioID = params.usuarioID;
        let snap;

        if (usuarioID) {
            usuarioID = req.user.usuarioID;

            snap = await usuariosDB.where('usuarioID', '==', usuarioID).get();
        }
        else {
            snap = await usuariosDB.get();
        }
        let docs = returnData(snap);

        return docs;
    },
    usuarioID: async (params) => {
        let usuarioID = params.usuarioID;
        let snap = await usuariosDB.where('usuarioID', '==', usuarioID).get();
        let docs = returnData(snap)[0];

        return docs;
    },
    fornecedores: async (params) => {
        let fornecedorID = params.fornecedorID;
        let docs;

        if (fornecedorID) {
            let snap = await fornecedoresDB.doc(fornecedorID).get();
            docs = [snap.data()];
        }
        else {
            let snap = await fornecedoresDB.get();
            docs = returnData(snap);
        }

        return docs;
    },
    botijoes: async (params) => {
        let botijaoID = params.botijaoID;
        let docs;

        if (botijaoID) {
            let snap = await botijoesDB.doc(botijaoID).get();
            docs = [snap.data()];
        }
        else {
            let snap = await botijoesDB.get();
            docs = returnData(snap);
        }

        return docs;
    },
    login: async (params) => {
        let email = params.email;
        let password = params.password;
        let auth = await firebase.auth().signInWithEmailAndPassword(email, password);

        if (auth) {
            let uid = firebase.auth().currentUser.uid;
            let snap = await usuariosDB.where("email", "==", email).get();
            let usuario = returnData(snap)[0];
            let nome = usuario.nome;
            let usuarioID = usuario.usuarioID;
            let objeto = {
                nome,
                usuarioID,
            }

            let refreshToken = await admin.auth().createCustomToken(uid, objeto)

            return refreshToken;
        }
        else {
            return 400;
        }
    },
    cadastrarUsuario: async (params) => {
        let nome = params.nome || '';
        let telefone = params.telefone || '';
        let nascimento = params.nascimento || '';
        let RG = params.RG || '';
        let CPF = params.CPF || '';
        let email = params.email.trim().toLowerCase() || '';
        let password = params.password || '';
        let endereco = params.endereco || '';
        let snapQueryEmail = await usuariosDB.where('email', '==', email).get();
        let snapQueryrCPF = await usuariosDB.where('CPF', '==', CPF).get();
        let snapQueryRG = await usuariosDB.where('RG', '==', RG).get();
        let queryDocs = [...returnData(snapQueryEmail), ...returnData(snapQueryRG), ...returnData(snapQueryrCPF)];

        if (queryDocs.length == 0) {
 
            let auth = await firebase.auth().createUserWithEmailAndPassword(email, password);
            let uid = auth.user.uid;
            let usuarioID = "usuario-" + uid;
            let objeto = {
                usuarioID,
                nome,
                telefone,
                email,
                password,
                endereco,
                nascimento,
                RG,
                CPF
            }
            let snapCreate = await usuariosDB.doc(usuarioID).set(objeto);

            if (snapCreate) {
                return 200;
            }
            else {
                return 400;
            }
        }
    },
    cadastrarFornecedor: async (params) => {
        let razaoSocial = params.razaoSocial;
        let cnpj = params.cnpj;
        let dataDeRegistro = params.dataDeRegistro;
        let endereco = params.endereco;
        let descricao = params.descricao;
        let tipo = params.tipo;
        let fornecedorID = uniqid("fornecedor-");

        let objeto = {
            razaoSocial,
            cnpj,
            dataDeRegistro,
            endereco,
            descricao,
            tipo,
            fornecedorID,
        }

        let snap = await fornecedoresDB.doc(fornecedorID).set(objeto);

        if (snap) {
            return 200;
        }
        else {
            return 400;
        }
    },
    cadastrarBotijao: async (params) => {
        let nome = params.nome;
        let imageUri = params.imageUri;
        let identificacao = params.identificacao;
        let dataDeRegistro = params.dataDeRegistro;
        let descricao = params.descricao;
        let tipo = params.tipo;
        let estoque = params.estoque;
        let valor = params.valor;
        let botijaoID = uniqid("botijao-");

        let objeto = {
            nome,
            imageUri,
            identificacao,
            dataDeRegistro,
            descricao,
            tipo,
            estoque,
            valor,
            botijaoID
        }

        let snap = await botijoesDB.doc(botijaoID).set(objeto);

        if (snap) {
            return 200;
        }
        else {
            return 400;
        }
    },
    cancelarFonecedor: async (params) => {
        let fonecedorID = params.fonecedorID;
        let snapFornecedorBotijoes = await fornecedoresDB.doc(fonecedorID).get();
        let fonecedorData = snapFornecedorBotijoes.data();
        let botijoesList = fonecedorData.botijoes; // Verificar

        if (botijoesList) {
            await Promise.all(botijoesList.map(async (botijaoID) => {
                await botijoesDB.doc(botijaoID).delete()
            }));
        }

        await fornecedoresDB.doc(fonecedorID).delete();
        return "200";
    },
    cancelarBotijao: async (params) => {
        let botijaoID = params.botijaoID;
        let snapBotijaoEstoque = await botijoesDB.doc(botijaoID).get();
        let botijaoData = snapBotijaoEstoque.data();
 
        await botijoesDB.doc(botijaoID).delete();
        return "200";
    },
    cancelarUsuario: async (params) => {
        let usuarioID = params.usuarioID;
        let uid = usuarioID.split("-")[1];

        await usuariosDB.doc(usuarioID).delete();

        await admin.auth().deleteUser(uid);

        return "200";
    },
    atualizarFornecedor: async (params) => {
        let fornecedorID = params.fornecedorID;
        let razaoSocial = params.razaoSocial;
        let cnpj = params.cnpj;
        let dataDeRegistro = params.dataDeRegistro;
        let endereco = params.endereco;
        let descricao = params.descricao;
        let tipo = params.tipo;
        let objeto = {
            razaoSocial,
            cnpj,
            dataDeRegistro,
            endereco,
            descricao,
            tipo
        }
        let snap = await fornecedoresDB.doc(fornecedorID).update(objeto);

        if (snap) {
            return 200;
        }
        else {
            return 400;
        }
    },
    atualizarBotijao: async (params) => {
        let botijaoID = params.botijaoID;
        let nome = params.nome;
        let identificacao = params.identificacao;
        let dataDeRegistro = params.dataDeRegistro;
        let descricao = params.descricao;
        let tipo = params.tipo;
        let estoque = params.estoque;
        let valor = params.valor;
        let objeto = {
            nome,
            identificacao,
            dataDeRegistro,
            descricao,
            tipo,
            estoque,
            valor
        }
        let snap = await botijoesDB.doc(botijaoID).update(objeto);

        if (snap) {
            return 200;
        }
        else {
            return 400;
        }
    },
    atualizarUsuario: async (params) => {
        let usuarioID = params.usuarioID || '';
        let nome = params.nome || '';
        let telefone = params.telefone || '';
        let nascimento = params.nascimento || '';
        let RG = params.RG || '';
        let CPF = params.CPF || '';
        let email = params.email || '';
        let password = params.password || '';
        let endereco = params.endereco || '';
        let uid = usuarioID.split("-")[1];
        let objeto = {
            usuarioID,
            nome,
            telefone,
            email,
            password,
            endereco,
            nascimento,
            RG,
            CPF
        }
        let getCredentials = await admin.auth().getUser(uid);
        let emailAntigo = getCredentials.email
        let snapGetPass = await usuariosDB.doc(usuarioID).get()
        let snapData = snapGetPass.data();
        let senhaAntiga = snapData.password;

        if (senhaAntiga != password) {
            await admin.auth().updateUser(uid, { password: password })
        }

        if (emailAntigo != email) {
            await admin.auth().updateUser(uid, { email: email })
        }

        let snapCreate = await usuariosDB.doc(usuarioID).update(objeto);

        if (snapCreate) {
            return 200;
        }
        else {
            return 400;
        }

    },
    usuarioAtualizarFotoUrl: async (params, req) => {
        let usuarioID = req.user.usuarioID;
        let fotoUrl = params.fotoUrl;
        let snapDB = await usuariosDB.doc(usuarioID).update({ fotoUrl })
        return snapDB ? 200 : 400;
    },
    botijaoAtualizarImageUri: async (params, req) => {
        let botijaoID = params.botijaoID;
        let imageUri = params.imageUri;
        let snapDB = await botijoesDB.doc(botijaoID).update({ imageUri })
        return snapDB ? 200 : 400;
    },
    usuarioAtualizarSenha: async (params, req) => {
        let usuarioID = req.user.usuarioID;
        let uid = usuarioID.split('-')[1];
        let password = params.password;
        let snapAuth = await admin.auth().updateUser(uid, { password: password })
        let snapDB = await usuariosDB.doc(usuarioID).update({ password })

        return snapAuth && snapDB ? 200 : 400;
    }
}

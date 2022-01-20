const admin = require("firebase-admin");
const firebase = require("firebase");
const firebaseCredentials = require("../credentials/firebase.js");

admin.initializeApp({
    credential: admin.credential.cert(firebaseCredentials.cert),
    databaseURL: firebaseCredentials.databaseURL
});

firebase.initializeApp(firebaseCredentials.firebaseConfig);

let auth = async function authMiddleware(req, res, next) {

    var routersWithAuth = [
        "usuarios",
        "fronecedores",
    ];
    var regex = new RegExp(routersWithAuth.join("|"), "i");

    if (req.body.query.search(regex) != -1) {
        let userToken = req.headers.authorization;
        userToken = userToken.replace('Bearer ', '');

        await firebase.auth().signInWithCustomToken(userToken);

        let idToken = await firebase.auth().currentUser.getIdToken(true)
        let userInfos = await admin.auth().verifyIdToken(idToken);

        if (userInfos) {
            req.user = userInfos;
            next();
        }
    }
    else {
        next();
    }
}

module.exports = auth;
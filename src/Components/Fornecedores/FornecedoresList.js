import React, { useState, useEffect, Fragment } from 'react';
import {
    StyleSheet,
    View,
    Alert
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';
import FornecedoresListItem from './FornecedoresListItem';
import { GraphQLQuery, RetrieveData } from '../../util';
import { FlatList } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import fornecedoresJSON from './fornecedores_gas';

function FornecedoresList(){

    const [userToken, setUserToken] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fornecedores, setFornecedores] = useState("");
    const [toggleIndicator, setToggleIndicator] = useState(false);

    useEffect(() => {
        getUserToken();
        //setFornecedoresJSON();
    }, []);

    async function getUserToken() {
        setToggleIndicator(true);

        let userTokenRetrieve = await RetrieveData('userToken');

        setUserToken(userTokenRetrieve);

        if(userTokenRetrieve){
            let email = await RetrieveData('email');
            let password =await RetrieveData('password');
            await GraphQLQuery(`login(email:"${email}", password:"${password}")`);
        }else{
                Actions.login();
        }
        setToggleIndicator(false);
    }

    async function getFornecedores(){
        setToggleIndicator(true);

        await firestore().collection('fornecedores').get().then((querySnapshot) => {
            let fornecedores = [];
            querySnapshot.forEach((doc) => {
                fornecedores.push(doc.data());
            }); 
            setFornecedores(fornecedores);
        });    
        
        setToggleIndicator(false);
    }

    
    async function setFornecedoresJSON(){
        setToggleIndicator(true);

        let fornecedoresList = [];
        let fornecedorID = 1;
        let fornecedorObject = {};
        
        fornecedoresJSON.map(fornecedor => {
            fornecedoresList.push(fornecedor);
        });

        var bar = new Promise((resolve, reject) => {
            fornecedoresList.forEach(async fornecedor => {

                fornecedorObject = {
                    id: fornecedorID,
                    razaoSocial: fornecedor.razaoSocial,
                    cnpj: fornecedor.cnpj,
                    dataDeRegistro: fornecedor.dataDeRegistro,
                    descricao: fornecedor.descricao,
                    endereco: fornecedor.endereco,
                    tipo: fornecedor.tipo
                }
                //console.log('FornecedorID: ', fornecedorID);
                await firestore().collection('fornecedores').doc(fornecedorID).set(fornecedorObject);
                console.log('fornecedorObject: ', fornecedorObject);
                fornecedorID++;
            });
        });

        bar.then(() => {
            console.log('All done!');
        });
        
        setToggleIndicator(false);
    }

    cellHandler = (razaoSocial, cnpj, dataDeRegistro, descricao, endereco, tipo) => {
    }

    return (
        <Fragment>
            <View style={styles.container}>
                <FlatList
                    data={fornecedores}
                    renderItem={({ item }) =>
                        <FornecedoresListItem 
                            razaoSocial={item.razaoSocial}
                            cnpj={item.cnpj}
                            dataDeRegistro={item.dataDeRegistro}
                            descricao={item.descricao}
                            endereco={item.endereco}
                            tipo={item.tipo}
                            handler={cellHandler.bind(item.razaoSocial, item.cnpj, item.dataDeRegistro, item.descricao, item.endereco, item.tipo)} />
                        }
                    keyExtractor={(item, index) => index.toString()}
                />
                {toggleIndicator && 
                    <Spinner 
                        visible={toggleIndicator}
                        textContent={'Carregando...'}
                        textStyle={styles.spinnerTextStyle}
                    />
                }
            </View>
        </Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default FornecedoresList;
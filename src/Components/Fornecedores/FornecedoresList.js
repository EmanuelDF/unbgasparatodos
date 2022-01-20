import React, { useState, useEffect, Fragment } from 'react';
import {
    StyleSheet,
    View,
    Alert
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';
import { GraphQLQuery, StoreData, RetrieveData } from '../util';

function FornecedoresList(){

    const [userToken, setUserToken] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [toggleIndicator, setToggleIndicator] = useState(false);

    useEffect(() => {
        // Update the document title using the browser API
        
        async function getToken() {
        
            setToggleIndicator(true);

            setUserToken(await RetrieveData('userToken'));

        if(userToken){
                setEmail(await RetrieveData('email'));
                setPassword(await RetrieveData('password'));
                let query = await GraphQLQuery(`login(email:"${email}" password:"${password}")`);

                setUserToken(query.data.login);
                
                StoreData('userToken', userToken);
        }else{
                Actions.login();
        }

            setToggleIndicator(false);
        }
    });

    return (
        <Fragment>
            <View style={styles.container}>
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

import React, { useState, Fragment } from 'react';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    Text,
    TextInput,
    Button,
    Alert
} from 'react-native';
import Logomarca from '../assets/img/logomarca.jpg';
import { GraphQLQuery, StoreData } from '../util';
import { Actions } from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [toggleIndicator, setToggleIndicator] = useState(false);

    async function handleLogin(e) {
        setToggleIndicator(true);

        await GraphQLQuery(`login(email:"${email}" password:"${password}")`).then((query) => {
        
            var userToken = query.data;
        
            if (userToken) {
                StoreData('userToken', userToken);
                StoreData('email', email);
                StoreData('password', password);;
    
                Actions.tabBar();
            }else {
                Alert.alert(
                    'Login e/ou senha errado(s).',
                    'Tente novamente. Se persistir, contate a administração.'
                );
            }
        }).catch((error) => {
            console.log(error);
        }); 

        setToggleIndicator(false);
    }

    return (
        <Fragment>
            <DismissKeyboard>
                <View style={styles.container}>
                    <Image style={styles.logo} source={Logomarca}/>
                    <TextInput
                        style={styles.input}
                        onChangeText={setEmail}
                        placeholder="E-mail"
                        value={email}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setPassword}
                        value={password}
                        placeholder="Senha"
                    />
                    <View style={styles.button}>
                        <Button color={'#2C332C'} title='ENTRAR' onPress={() => handleLogin()}/>
                    </View>
                    <View style={styles.button}>
                        <Button color={'#2C332C'} title='Novo Usuário' onPress={() => Actions.adicionarusuario()}/>
                    </View>
                    <Text style={styles.version}>Versão: 1.0 </Text>
                    {toggleIndicator && 
                        <Spinner 
                        visible={toggleIndicator}
                        textContent={'Carregando...'}
                        textStyle={styles.spinnerTextStyle}
                        />
                    }
                </View>
            </DismissKeyboard >
        </Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    input: {
        color: '#2C332C',
        width: '80%',
        alignSelf: 'center',
        margin: 5,
        borderRadius: 8,
        borderWidth: 0.5,
    },
    button: {
        alignSelf: 'center',
        margin: 12,
        width: '50%',
    },
    logo: {
        marginTop: '20%',
        alignSelf: 'center',
        width: 300 / 2,
        height: 386 / 2
    },
    version: {
        alignSelf: 'center',
    },
    spinnerTextStyle: {
        color: '#000',
    }
});

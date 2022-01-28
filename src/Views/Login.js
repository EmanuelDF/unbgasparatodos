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
import Logomarca from '../assets/img/logomarca.png';
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

        await GraphQLQuery(`login(email:"${email}", password:"${password}")`).then((query) => {
        
            let userToken = query.data.login;

            console.log('userToken:', userToken);
        
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
                        placeholderTextColor={"#FFF"}
                        value={email}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setPassword}
                        placeholderTextColor={"#FFF"}
                        value={password}
                        placeholder="Senha"
                    />
                    <View style={styles.button}>
                        <Button color={'#fe9c00'} title='ENTRAR' onPress={() => handleLogin()}/>
                    </View>
                    <View style={styles.button}>
                        <Button color={'#fe9c00'} title='Novo Usuário' onPress={() => Actions.adicionarusuario()}/>
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
        backgroundColor: '#0061ae'
    },
    input: {
        color: '#FFF',
        width: '80%',
        alignSelf: 'center',
        margin: 5,
        borderColor: '#FFF',
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
        width: 400 / 2,
        height: 515 / 2
    },
    version: {
        alignSelf: 'center',
        color: '#FFF',
    },
    spinnerTextStyle: {
        color: '#FFF',
    }
});

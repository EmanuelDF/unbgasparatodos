import React, { Component, Fragment } from 'react';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    Text,
    TextInput,
    Button
} from 'react-native';
import Logomarca from '../assets/img/logomarca.jpg';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

export default function Login() {

    return (
        <Fragment>
            <DismissKeyboard>
                <View style={styles.container}>
                    <Image style={styles.logo} source={Logomarca}/>
                    <TextInput placeholder='Usuário (E-mail)' />
                    <TextInput placeholder='Senha' />
                    <Button title='ENTRAR'/>
                    <Text style={styles.version}>Versão: 1.0 </Text>
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
    logo: {
        marginTop: '40%',
        marginBottom: 10,
        alignSelf: 'center',
        width: 500 / 2,
        height: 500 / 2
    },
    version: {
        alignSelf: 'center',
    }
});

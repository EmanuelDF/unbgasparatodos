import React, {useState, Fragment} from "react";
import { View, TextInput, Alert, Button, StyleSheet, Image, ScrollView } from "react-native";
import Logomarca from '../assets/img/logomarca.jpg';
import { GraphQLMutation } from '../util';
import { Actions } from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';

function AdicionarUsuario() {
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [rg, setRG] = useState("");
  const [cpf, setCPF] = useState("");
  const [endereco, setEndereco] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toggleIndicator, setToggleIndicator] = useState(false);

  async function adicionarUsuario() {
    setToggleIndicator(true);

    let query = await GraphQLMutation(`cadastrarUsuario(nome:"${nome}", email:"${email}", password:"${password}", telefone:"${telefone}", nascimento:"${dataNascimento}", endereco:"${endereco}", rg:"${rg}", cpf:"${cpf}")`);

    console.log('Query:', query);

    if (query.data.cadastrarUsuario == 200) {
      Alert.alert(
        'Sucesso!','Cadastro Realizado!',
        [
          { text: 'OK', onPress: () => Actions.tabBar()}
        ]
      );
    }
    else {
        Alert.alert(
            'Erro no cadastro. Revise as informações.',
            [
                { text: 'OK' },
            ],
            { cancelable: false },
        );
    }
    setToggleIndicator(false);
}

  return (
    <Fragment>
       <ScrollView style={styles.container}>
          <View style={styles.container}>
            <Image style={styles.logo} source={Logomarca}/>
            <TextInput
              style={styles.input}
              onChangeText={setNome}
              value={nome}
              placeholder="Nome Completo"
            />
            <TextInput
              style={styles.input}
              onChangeText={setDataNascimento}
              value={dataNascimento}
              placeholder="Data de Nascimento"
            />
            <TextInput
              style={styles.input}
              onChangeText={setCPF}
              value={cpf}
              placeholder="CPF"
            />
            <TextInput
              style={styles.input}
              onChangeText={setRG}
              value={rg}
              placeholder="RG"
            />
            <TextInput
              style={styles.input}
              onChangeText={setTelefone}
              value={telefone}
              placeholder="Telefone"
            />
            <TextInput
              style={styles.input}
              onChangeText={setEndereco}
              value={endereco}
              placeholder="Endereço"
            />
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              placeholder="E-mail"
            />
            <TextInput
              style={styles.input}
              onChangeText={setPassword}
              value={password}
              placeholder="Senha"
            />
            <View style={styles.button}>
              <Button color={'#2C332C'} title='CADASTRAR' onPress={() => adicionarUsuario()}/>
            </View>
          </View>
          {toggleIndicator && 
            <Spinner 
              visible={toggleIndicator}
              textContent={'Carregando...'}
              textStyle={styles.spinnerTextStyle}
            />
          }
        </ScrollView>
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
      alignSelf: 'center',
      width: 300 / 2.5,
      height: 386 / 2.5
  },
  spinnerTextStyle: {
    color: '#000',
  }
});

export default AdicionarUsuario;
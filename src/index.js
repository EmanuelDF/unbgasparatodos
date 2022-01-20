import React, {useState, Fragment } from 'react';
import { StyleSheet, View, Image, LogBox } from 'react-native';
import {Router, Scene, Tabs } from 'react-native-router-flux';
import Login from './Views/Login';
import Fornecedores from './Views/Fornecedores';
import Marca from './assets/img/logo.png';
import FornecedoresTabBar from './assets/img/icons/fornecedores-tabbar.png';
import AdicionarUsuario from './Views/AdicionarUsuario';

function App(){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  LogBox.ignoreAllLogs();

  renderBackButton = () => {
    return (
      <View>
        {/* NADA DENTRO PARA ANULAR O BACK BUTTON*/}
      </View>
    );
  };

  return (
    <Fragment>
      <Router>
          <Scene key="root" headerLayoutPreset={'center'}>
            <Tabs key="tabBar" lazy hideNavBar activeBackgroundColor='#2C332C' activeTintColor='#FFF' inactiveTintColor='#FFF' labelStyle={{fontSize: 12}} tabBarStyle={styles.tabBar} navigationBarStyle={styles.tabBar}>
              <Scene
                key="fornecedores"
                title="Fornecedores"
                initial
                component={Fornecedores}
                navigationBarTitleImage={Marca}
                navigationBarTitleImageStyle={styles.navLogo}
                titleStyle={{ textAlign: 'center', flex: 1}}
                icon={() => (
                  <Image source={FornecedoresTabBar} style={styles.fornecedoresTabBar}/>
                )}
              />            
            </Tabs>
              <Scene key="login"
                component={Login}
                hideNavBar
              />
              <Scene key="adicionarusuario"
                component={AdicionarUsuario}
                hideNavBar
              />
          </Scene>
        </Router>
    </Fragment>
  )
}


const styles = StyleSheet.create({
  navLogo: {
    alignSelf: 'center',
    tintColor: 'white',
    width: 165 / 5,
    height: 232 / 5
  },
  tabBar:{
    backgroundColor: "#2C332C",
  },
  fornecedoresTabBar: {
    alignSelf: 'center',
    width: 128 / 3.5,
    height: 128 / 3.5
  }
});

export default App;
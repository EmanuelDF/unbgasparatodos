import React, { Fragment, Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import FornecedoresList from '../Components/Fornecedores/FornecedoresList';

export default class App extends Component {

    render() {
        return (
            <Fragment>
                <View style={styles.container}>
                    <FornecedoresList />
                </View>
            </Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});

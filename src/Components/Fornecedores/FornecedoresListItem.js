import React, { Component, Fragment } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

function FornecedoresListItem({ fornecedor }) {

    return (
        <Fragment>
            <TouchableOpacity onPress={this.props.handler}>
                <View style={styles.container}>
                        <Image source={{ uri: this.props.imageUri}} style={styles.profileImg}/>
                        <View style={styles.NomeELotacao}>
                            <Text style={styles.textCell}>{fornecedor.razaoSocial}</Text>
                            <Text style={styles.lotacaoTextStyle}>Tipo: {this.props.descricao}</Text>
                            <Text style={styles.lotacaoTextStyle}>Disponibilidade: {this.props.estoque}</Text>
                            <Text style={styles.lotacaoTextStyle}>Valor: {this.props.valor}</Text>
                        </View>
                </View>
            </TouchableOpacity>
        </Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        height: 100,
        marginTop: 5,
        marginBottom: 5,
        width: '95%',
        alignSelf:'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomColor: '#4091d4'
    },
    NomeELotacao:{
        flexDirection: 'column',
        alignSelf:'center',
        paddingLeft: 10
    },
    textCell: {
        fontSize: 19,
        width: '100%',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontFamily: 'Montserrat',
        fontWeight: '500',
        color: '#4a4a4a',        
    },
    profileImg: {
        alignSelf: 'center',
        height: 100,
        width: 100,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        overflow: 'hidden'
    },
    arrow: {
        width: 128 / 8,
        height: 128 / 8,
        alignSelf: 'center',
        marginLeft: '90%',
        position: 'absolute'
    },
    lotacaoTextStyle: {
        fontSize: 17,
        fontFamily: 'Montserrat',
        fontWeight: '500',
        justifyContent:'flex-start'
    },
});

export default FornecedoresListItem;
import React, { Component, Fragment } from 'react';
import {
    StyleSheet,
    View,
    Alert
} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class App extends Component{

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount = async () => {
        Actions.login();    
    }

    render() {
        return (
            <Fragment>
                <View style={styles.container}>

                </View>
            </Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

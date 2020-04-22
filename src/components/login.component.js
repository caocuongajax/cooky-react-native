import React, { Component } from 'react';
import { SafeAreaView, Text, TouchableHighlight, View, TextInput, ImageBackground, ScrollView, ActivityIndicator } from 'react-native';
import { Icon } from '@ui-kitten/components';
import FastImage from 'react-native-fast-image';

import { connect } from 'react-redux';
import { setClient } from '../actions/client';

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            username: 'admin@admin.com',
            password: 'password'
        };
    }
    _handleLogin = () => {
        let dulieuUser = {
            id: '1',
            token: '',
            email: 'admin@admin.com',
            img: '',
            name: 'Bùi Cao Cường',
            phone: '+84 902 855 377'
        };
        this.setState({ loading: true });
        console.log(this.props)
        //this.props.navigation.setOptions({tabBarVisible: false});
        setTimeout(() => {
            //console.log(dulieuUser, this.props.client, this.state);
            this.props.setClient(dulieuUser);
            this.setState({ loading: false });
        }, 2000);
    }
    _handleUsername = (e) => {
        this.setState({ username: e });
    }
    _handlePassword = (e) => {
        this.setState({ password: e });
    }
    render() {
        return (
            <>
                {this.state.loading ? (<View style={{ flex: 1, position: 'absolute', width: '100%', top: 0, left: 0, bottom: 0, zIndex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 20, paddingHorizontal: 40, borderRadius: 10, backgroundColor: 'white' }}>
                        <ActivityIndicator style={{
                            marginVertical: 20,
                        }} size='large' />
                        <Text>Loading....</Text>
                    </View>
                </View>) : null}
                <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ alignItems: 'center', padding: 30 }}>
                            <FastImage
                                style={{ width: 140, height: 140, borderRadius: 70, borderColor: '#f39731', borderWidth: 4 }}
                                resizeMode="cover"
                                source={{ uri: 'https://avatarfiles.alphacoders.com/108/108053.jpg' }}
                            />
                        </View>

                        <View style={{
                            alignItems: 'center',
                            margin: 20,
                            padding: 10,
                            backgroundColor: '#fff',
                            borderRadius: 5,
                            shadowColor: 'rgba(0,0,0,0.1)',
                            shadowOffset: { width: 0, height: 5 },
                            shadowOpacity: 0.8,
                            shadowRadius: 10,
                            borderWidth: 0
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 0 }}>
                                <Icon name="person-outline" width={24} height={24} fill="#f39731" style={{ marginLeft: 10, marginRight: 10 }} />
                                <TextInput style={{ flex: 1, fontSize: 17, padding: 10 }} placeholder={'Username'} value={this.state.username} onChangeText={this._handleUsername} />
                            </View>
                        </View>

                        <View style={{
                            alignItems: 'center',
                            margin: 20,
                            marginTop: 0,
                            padding: 10,
                            backgroundColor: '#fff',
                            borderRadius: 5,
                            shadowColor: 'rgba(0,0,0,0.1)',
                            shadowOffset: { width: 0, height: 5 },
                            shadowOpacity: 0.8,
                            shadowRadius: 10,
                            borderWidth: 0,
                            marginBottom: 10
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 0 }}>
                                <Icon name="shield-outline" width={24} height={24} fill="#f39731" style={{ marginLeft: 10, marginRight: 10 }} />
                                <TextInput secureTextEntry={true} style={{ flex: 1, fontSize: 17, padding: 10 }} placeholder={'Password'} value={this.state.password} onChangeText={this._handlePassword} />
                            </View>
                        </View>

                        <View style={{ backgroundColor: '#f39731', padding: 10, margin: 20, borderRadius: 10 }}>
                            <TouchableHighlight
                                onPress={(e) => { this._handleLogin() }}
                                activeOpacity={0.3}
                                underlayColor="#f39731"
                                style={{ padding: 10 }}>
                                <Text style={{ fontSize: 17, fontWeight: 'bold', textAlign: 'center', color: '#fff' }}>Login</Text>
                            </TouchableHighlight>
                        </View>

                        <View style={{ marginVertical: 20 }}>
                            <ImageBackground resizeMode="repeat" source={require('../assets/img/line.png')} style={{
                                height: 15,
                            }} />
                        </View>

                        <View style={{ backgroundColor: '#36f', padding: 10, margin: 20, borderRadius: 10 }}>
                            <TouchableHighlight
                                onPress={(e) => console.log(e)}
                                activeOpacity={0.3}
                                underlayColor="#36f"
                                style={{ padding: 10 }}>
                                <Text style={{ fontSize: 17, fontWeight: 'bold', textAlign: 'center', color: '#fff' }}>Login by Facebook</Text>
                            </TouchableHighlight>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        //products: state.product.products,
        //cart: state.cart.cart,
        //cartInfo: state.cartInfo,
        client: state.client
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setClient: (data) => {
            dispatch(setClient(data));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
//export default LoginComponent;
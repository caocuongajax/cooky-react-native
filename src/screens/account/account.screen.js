import React, { Component } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableHighlight, View, ImageBackground } from 'react-native';
import { Icon } from '@ui-kitten/components';
import FastImage from 'react-native-fast-image';
import LoginComponent from '../../components/login.component';

import { connect } from 'react-redux';
import { unsetClient } from '../../actions/client';

class AccountScreen extends Component {
    constructor(props) {
        super(props);
        //console.log(props.client);
        //props.unsetClient();
    }
    render() {
        if (!this.props.client.id) {
            return <LoginComponent navigation={this.props.navigation} />;
        }
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <ScrollView style={{ backgroundColor: '#fff' }}
                    showsVerticalScrollIndicator={false}>
                    <View style={{ alignItems: 'center', padding: 40 }}>
                        <FastImage
                            style={{ width: 140, height: 140, borderRadius: 70, borderColor: '#f39731', borderWidth: 4 }}
                            resizeMode="cover"
                            source={{ uri: 'https://avatarfiles.alphacoders.com/108/108053.jpg' }}
                        />
                    </View>


                    <View style={{ marginLeft: 20, flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="person-outline" width={24} height={24} fill="#f39731" />
                        <Text style={{ fontSize: 20, marginLeft: 10 }}>Name</Text>
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
                        <Text style={{ fontSize: 22 }}>Bùi Cao Cường</Text>
                    </View>


                    <View style={{ marginLeft: 20, marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="phone-outline" width={24} height={24} fill="#f39731" />
                        <Text style={{ fontSize: 20, marginLeft: 10 }}>Phone</Text>
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
                        <Text style={{ fontSize: 22 }}>+84 902 855 377</Text>
                    </View>


                    <View style={{ marginLeft: 20, marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="email-outline" width={24} height={24} fill="#f39731" />
                        <Text style={{ fontSize: 20, marginLeft: 10 }}>E-mail</Text>
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
                        <Text style={{ fontSize: 22 }}>bcc2qm@yahoo.com</Text>
                    </View>

                    <View style={{ marginVertical: 20 }}>
                        <ImageBackground resizeMode="repeat" source={require('../../assets/img/line.png')} style={{
                            height: 15,
                        }} />
                    </View>

                    <View style={{ backgroundColor: '#8bad18', padding: 10, margin: 20, borderRadius: 10 }}>
                        <TouchableHighlight
                            onPress={(e) => { this.props.unsetClient() }}
                            activeOpacity={0.3}
                            underlayColor="#8bad18"
                            style={{ padding: 10 }}>
                            <Text style={{ fontSize: 17, fontWeight: 'bold', textAlign: 'center', color: '#fff' }}>Logout</Text>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </SafeAreaView>
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
        unsetClient: () => {
            dispatch(unsetClient());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);
//export default AccountScreen;
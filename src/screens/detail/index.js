import React, { Component } from 'react';
import { SafeAreaView, Text, View, StyleSheet, ScrollView, ActivityIndicator, ImageBackground, FlatList, Dimensions } from 'react-native';
import { Icon, Button, ListItem } from '@ui-kitten/components';
import FastImage from 'react-native-fast-image';
import { Header } from '../../components/groupHeader';
import { getDetail, getUser } from '../../api/helper';
const { width: viewportWidth } = Dimensions.get('window');

class DetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            UserDesc: '-',
            params: this.props.route.params,
            items: [],
            nguyenlieu: [],
            cacbuoc: []
        };
    }
    async getUserInfo(id) {
        try {
            const response = await getUser(id);
            if (!response.data.error) {
                const tmp = response.data.userInfo.mon + ' món - ' + response.data.userInfo.nguoiquantam + ' người quan tâm';
                this.setState({ UserDesc: tmp });
            }
        } catch (error) {
            console.log(error)
        }
    }
    async loadData(id) {
        try {
            if (this.props.route.params.UserInfo.Id) {
                this.getUserInfo(this.props.route.params.UserInfo.Id);
            }
            const response = await getDetail(id);
            if (!response.data.error) {
                let tmp = this.state.params;
                if (this.props.route.params.UserInfo.Id == '') {
                    tmp.UserInfo.Id = response.data.userInfo.Id;
                    this.getUserInfo(tmp.UserInfo.Id);
                }
                tmp.Img = response.data.imgItem;

                this.setState({
                    nguyenlieu: response.data.nguyenlieu,
                    cacbuoc: response.data.cacbuoc,
                    params: tmp,
                    items: response.data.items,
                    loading: false
                });
            }
        } catch (err) {
            //console
        }
    }
    componentDidMount() {
        this.loadData(this.props.route.params.Id);
    }
    render() {
        return (
            <>
                <SafeAreaView style={{ flex: 0, backgroundColor: '#8bad18' }} />
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{
                        position: 'absolute', zIndex: 1, marginBottom: 20, right: 0, left: 0,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 5,
                        },
                        shadowOpacity: 0.12,
                        shadowRadius: 2.22,
                        elevation: 3,
                        backgroundColor: '#8bad18',
                        height: 65
                    }}>
                        <View style={{
                            padding: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent',
                        }}>
                            <View>
                                <Button
                                    appearance='ghost' size='tiny'
                                    accessoryLeft={() => (<Icon
                                        name='arrow-ios-back'
                                        width={32}
                                        height={32}
                                        fill='#fff'
                                    />)}
                                    onPress={() => this.props.navigation.pop()}
                                />
                            </View>
                            <View style={{ flex: 1, marginLeft: 10 }}>
                                <Text style={{ fontSize: 20, color: '#fff' }} numberOfLines={1}>{this.props.route.params.Name}</Text>
                            </View>
                            <View style={{ marginLeft: 10 }}>
                                <Button
                                    style={{ backgroundColor: 'transparent' }}
                                    appearance='ghost' size='tiny'
                                    accessoryLeft={() => (<Icon
                                        name='bookmark-outline'
                                        width={32}
                                        height={32}
                                        fill='#fff'
                                    />)}
                                />
                            </View>
                        </View>
                    </View>

                    <FlatList
                        style={{ backgroundColor: '#fff' }} showsVerticalScrollIndicator={false}
                        ListHeaderComponent={(
                            <>
                                <View style={{ flex: 1, marginBottom: 10, marginTop: 65 }}>
                                    <FastImage resizeMode="cover" style={{ width: '100%', height: 230 }} source={{ uri: this.props.route.params.Img }} />
                                    <Text style={{ fontSize: 22, margin: 5, textAlign: 'center' }} numberOfLines={2}>{this.props.route.params.Name}</Text>
                                </View>
                                <View style={{ borderTopWidth: 0, borderColor: 'gray', marginTop: 10 }}>
                                    <ListItem
                                        style={{ backgroundColor: '#fff', borderBottomWidth: 0, borderColor: 'gray' }}
                                        title={() => (
                                            <Text style={{ fontSize: 17, marginLeft: 10 }}>{this.props.route.params.UserInfo.DisplayName}</Text>
                                        )}
                                        description={() => (
                                            <Text style={{ color: 'gray', marginLeft: 10 }}>{this.state.UserDesc}</Text>
                                        )}
                                        accessoryLeft={() => (
                                            <FastImage
                                                resizeMode="cover"
                                                style={{ width: 40, height: 40, borderRadius: 20 }}
                                                source={{ uri: this.props.route.params.UserInfo.AvatarUrl }}
                                            />
                                        )}
                                        accessoryRight={() => (
                                            this.state.params.UserInfo.Id ? <Button size='tiny' onPress={() => this.props.navigation.push('Nguoidung', this.state.params)}>Xem thêm</Button> : null
                                        )}
                                    />
                                </View>
                                <Header style={{ marginHorizontal: 10, marginTop: 20, marginBottom: 10 }} name='Nguyên liệu' />
                                {this.state.nguyenlieu.length ? (
                                    this.state.nguyenlieu.map(item => (
                                        <View style={{ borderWidth: 0, marginHorizontal: 10, marginBottom: 5 }}>
                                            <Text style={{ flex: 1, fontSize: 17, fontFamily: 'Verdana-Italic' }}>- {item}</Text>
                                        </View>
                                    ))
                                ) : (
                                        <View>
                                            <ActivityIndicator style={{
                                                marginVertical: 20,
                                            }} size='large' />
                                        </View>
                                    )}
                                <View style={{ marginTop: 15 }}>
                                    <ImageBackground resizeMode="repeat" source={require('../../assets/img/line.png')} style={{
                                        height: 15,
                                    }} />
                                </View>
                                <Header style={{ marginHorizontal: 10, marginTop: 20, marginBottom: 10 }} name='Các bước' />
                                {this.state.cacbuoc.length ? (
                                    this.state.cacbuoc.map((item, index) => (
                                        <View style={{ borderBottomWidth: (this.state.cacbuoc.length - 1 == index) ? 0 : StyleSheet.hairlineWidth, marginBottom: 10, borderColor: 'gray' }}>
                                            <View style={{ borderWidth: 0, marginHorizontal: 10, marginBottom: 10 }}>
                                                <Text style={{ flex: 1, fontSize: 17, fontFamily: 'Verdana' }}>{index + 1}. {item.Text}</Text>
                                                {item.Images.length ? (
                                                    <View style={{ flexDirection: 'row', flex: 1 }}>
                                                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                                            {item.Images.map(img => (
                                                                <FastImage resizeMode="cover" style={{ width: 150, height: 113, margin: 10, borderRadius: 5 }} source={{ uri: img }} />
                                                            ))}
                                                        </ScrollView>
                                                    </View>
                                                ) : null}
                                            </View>
                                        </View>
                                    ))
                                ) : (
                                        <View>
                                            <ActivityIndicator style={{
                                                marginVertical: 20,
                                            }} size='large' />
                                        </View>
                                    )}
                                {this.state.items.length ? (
                                    <>
                                        <View>
                                            <ImageBackground resizeMode="repeat" source={require('../../assets/img/line.png')} style={{
                                                height: 15,
                                            }} />
                                        </View>
                                        <Header style={{ marginHorizontal: 10, marginTop: 20, marginBottom: 0 }} colorText={'#8bad18'} name={'Các món khác của ' + this.state.params.UserInfo.DisplayName} />
                                    </>
                                ) : null}
                            </>
                        )}
                        data={this.state.items}
                        renderItem={({ item }) => (
                            <ListItem
                                onPress={(e) => this.props.navigation.push('Detail', item)}
                                style={{ backgroundColor: '#fff', flex: 1, padding: 10 }}
                                children={(
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ width: (viewportWidth / 3) }}>
                                            <FastImage
                                                resizeMode="cover"
                                                style={{ borderRadius: 5, width: (viewportWidth / 3), height: (viewportWidth / 3) }}
                                                source={{ uri: item.Img }}
                                            />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <View style={{ flexDirection: "column", justifyContent: 'center', flex: 1 }}>
                                                <Text style={{ fontSize: 18, marginLeft: 10, fontWeight: 'bold' }}>{item.Name}</Text>
                                            </View>
                                        </View>
                                    </View>
                                )}
                                activeOpacity={0.3}
                            />
                        )}
                        keyExtractor={item => item.Id.toString()}
                    />
                </SafeAreaView>
            </>
        );
    }
}
export default DetailScreen;
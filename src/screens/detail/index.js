import React, { Component } from 'react';
import { SafeAreaView, Text, View, StyleSheet, ScrollView, TouchableHighlight, StatusBar, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import { Icon, Button, ListItem } from '@ui-kitten/components';
import FastImage from 'react-native-fast-image';
import Axios from 'axios';
import DOMParser from 'react-native-html-parser';
import { Header } from '../../components/groupHeader';

const { width: viewportWidth } = Dimensions.get('window');

class DetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            UserDesc: '-',
            items: [],
            nguyenlieu: [],
            cacbuoc: []
        };
    }
    componentDidMount() {
        /*fetch('http://localhost:8080/tastyigniter').then(response => response.text()).then(responseTxt => {
            console.log(responseTxt)
        })
        Axios.get('http://localhost:8080/tastyigniter').then(function(response) {
            console.log(response.data)
        })*/
        /*Axios.get('https://www.cooky.vn/directory/search?dt=140').then((response) => {
            this.setState({ items: response.data.recipes });
        }).catch(err => console.log(err))*/
        /*Axios.get('https://www.cooky.vn' + this.props.route.params.DetailUrl).then((response) => {
            const html = response.data;
            //const parser = new DOMParser.DOMParser();
            //const parsed = parser.parseFromString(html, 'text/html');
            //console.log(parsed.getElementsByAttribute('class', 'recipe-ingredient-list'));
        })*/
        /*Axios.get('https://cookpad.com/vn').then((response) => {
            try {
                const html = response.data;
                const parser = new DOMParser.DOMParser();
                const parsed = parser.parseFromString(html, 'text/html');
                const data = parsed.getElementsByClassName('masonry__item', false);
                let tmp = [];
                //console.log(data[0].getElementsByClassName('inline', false))
                for (let i = 0; i < data.length; i++) {
                    let tmp2 = {};
                    const data2 = data[i].getElementsByClassName('feed__photo', false);
                    Object.keys(data2[0].attributes).map((key, index) => {
                        if (data2[0].attributes[key].nodeName == 'alt') {
                            tmp2.Name = data2[0].attributes[key].value;
                        }
                        if (data2[0].attributes[key].nodeName == 'src') {
                            tmp2.Img = (data2[0].attributes[key].value[0] == 'h' ? '' : 'https:') + data2[0].attributes[key].value;
                        }
                    });
                    const data3 = data[i].getElementsByClassName('inline', false);
                    //console.log(data3[0].attributes);
                    tmp2.UserInfo = {};
                    Object.keys(data3[0].attributes).map((key, index) => {
                        if (data3[0].attributes[key].nodeName == 'alt') {
                            tmp2.UserInfo.DisplayName = data3[0].attributes[key].value;
                        }
                        if (data3[0].attributes[key].nodeName == 'src') {
                            tmp2.UserInfo.AvatarUrl = (data3[0].attributes[key].value[0] == 'h' ? '' : 'https:') + data3[0].attributes[key].value;
                        }
                    });
                    tmp.push(tmp2);
                }
                this.setState({ items: tmp });
            } catch (err) {
                console.log(err)
            }
        })*/
        Axios.get('https://cookpad.com' + this.props.route.params.UserInfo.Id).then((response) => {
            const html = response.data;
            const parser = new DOMParser.DOMParser({
                errorHandler: {
                    warning: w => console.warn(w),
                    error: e => console.log(e),
                    fatalError: e => console.log(e),
                },
            });
            const parsed = parser.parseFromString(html, 'text/html');
            const data = parsed.getElementsByClassName('user-header__profile-stats-item', false);
            const tmp = data[0].childNodes[0].nextSibling.childNodes[0].data + ' món - ' + data[1].childNodes[0].nextSibling.childNodes[0].data + ' người quan tâm';// + data[1].childNodes[2].nextSibling.childNodes[0].data;
            //console.log(tmp)
            this.setState({UserDesc: tmp})
            //console.log(data[0].childNodes[0].nextSibling.childNodes[0].data)
            //console.log(data[0].childNodes[2].nextSibling.childNodes[0].data)
            //console.log(data[1].childNodes[0].nextSibling.childNodes[0].data)
            //console.log(data[1].childNodes[2].nextSibling.childNodes[0].data)
        })
        Axios.get('https://cookpad.com' + this.props.route.params.Id).then((response) => {
            const html = response.data;
            const parser = new DOMParser.DOMParser({
                errorHandler: {
                    warning: w => console.warn(w),
                    error: e => console.log(e),
                    fatalError: e => console.log(e),
                },
            });
            const parsed = parser.parseFromString(html, 'text/html');
            const data = parsed.getElementsByClassName('ingredient__details', false);
            let tmp = [];
            for (let i = 0; i < data.length; i++) {
                tmp.push((data[i].childNodes[1].childNodes[0] ? data[i].childNodes[1].childNodes[0].data : '') + data[i].childNodes[2].data);
            }
            this.setState({ nguyenlieu: tmp });
            const data2 = parsed.getElementsByClassName('step', false);
            tmp = [];
            for (let i = 0; i < data2.length; i++) {
                const hinhanh = data2[i].getElementsByClassName('lazy-image', false);
                let tmp2 = [];
                if (hinhanh.length) {
                    for (let j = 0; j < hinhanh.length; j++) {
                        Object.keys(hinhanh[j].attributes).map((key, index) => {
                            if (hinhanh[j].attributes[key].nodeName == 'data-src') {
                                tmp2.push((hinhanh[j].attributes[key].value[0] == 'h' ? '' : 'https:') + hinhanh[j].attributes[key].value);
                            }
                        });
                    }
                }
                const noidung = data2[i].getElementsByClassName('mb-2', false);
                tmp.push({
                    Text: noidung[0].childNodes[0] ? noidung[0].childNodes[0].data : '',
                    Images: tmp2
                });
            }
            this.setState({ cacbuoc: tmp });
        }).catch(err => console.log(err))
    }
    render() {
        return (
            <>
                {/*<SafeAreaView style={{ flex: 0, backgroundColor: 'red' }} />*/}
                <SafeAreaView style={{ flex: 1 }}>
                    {/*<StatusBar barStyle="light-content" />*/}
                    <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent' }}>
                        <View>
                            <Button
                                //style={{ backgroundColor: 'transparent' }}
                                appearance='ghost' size='tiny'
                                accessoryLeft={() => (<Icon
                                    name='arrow-ios-back'
                                    width={32}
                                    height={32}
                                    fill='gray'
                                />)}
                                onPress={() => this.props.navigation.pop()}
                            />
                        </View>
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <Text style={{ fontSize: 20 }} numberOfLines={1}>{this.props.route.params.Name}</Text>
                        </View>
                        <View style={{ marginLeft: 10 }}>
                            <Button
                                style={{ backgroundColor: 'transparent' }}
                                appearance='ghost' size='tiny'
                                accessoryLeft={() => (<Icon
                                    name='bookmark-outline'
                                    width={32}
                                    height={32}
                                    fill='gray'
                                />)}
                            />
                        </View>
                    </View>
                    {/*<View style={{ borderWidth: 1 }}></View>*/}
                    <ScrollView style={{ backgroundColor: '#fff' }} showsVerticalScrollIndicator={false}>
                        <View style={{ flex: 1, marginBottom: 10 }}>
                            <FastImage resizeMode="cover" style={{ width: '100%', height: 230 }} source={{ uri: this.props.route.params.Img }} />
                            <Text style={{ fontSize: 22, margin: 5, textAlign: 'center' }} numberOfLines={2}>{this.props.route.params.Name}</Text>
                            {/*<View>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                                    <Icon name="star" width={20} height={20} fill={'#FFC94D'} />
                                    <Icon name="star" width={20} height={20} fill={'#FFC94D'} />
                                    <Icon name="star" width={20} height={20} fill={'#FFC94D'} />
                                    <Icon name="star" width={20} height={20} fill={'gray'} />
                                    <Icon name="star" width={20} height={20} fill={'gray'} />
                                </View>
                            </View>*/}
                            {/*<View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name='person' width={20} height={20} fill={'#0095FF'} />
                            <Text style={{ fontSize: 17, fontWeight: 'bold', marginLeft: 5, flex: 1 }}>Cooky</Text>
                            </View>*/}
                        </View>
                        {this.props.route.params.Source ? null : (
                            <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 10 }}>
                                    <View style={{ flex: 1, alignItems: 'center', borderRightWidth: StyleSheet.hairlineWidth, borderColor: 'gray' }}>
                                        <Icon name="clock-outline" width={40} height={40} fill={'gray'} />
                                        <Text>{this.props.route.params.CookTime} ph</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'center', borderRightWidth: StyleSheet.hairlineWidth, borderColor: 'gray' }}>
                                        <Icon name="flash-outline" width={40} height={40} fill={'gray'} />
                                        <Text>{this.props.route.params.Level}</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'center' }}>
                                        <Icon name="bar-chart-outline" width={40} height={40} fill={'gray'} />
                                        <Text>{this.props.route.params.TotalView}</Text>
                                    </View>
                                </View>
                            </View>
                        )}
                        <View style={{ borderTopWidth: 0, borderColor: 'gray', marginTop: 10 }}>
                            <ListItem
                                style={{ backgroundColor: '#fff', borderBottomWidth: 0, borderColor: 'gray' }}
                                title={() => (
                                    <Text style={{ fontSize: 17, marginLeft: 10 }}>{this.props.route.params.UserInfo.DisplayName}</Text>
                                )}
                                description={() => (
                                    <Text style={{ color: 'gray', marginLeft: 10 }}>{this.state.UserDesc}{/*35 công thức 188 quan tâm*/}</Text>
                                )}
                                accessoryLeft={() => (
                                    <FastImage
                                        resizeMode="cover"
                                        style={{ width: 40, height: 40, borderRadius: 20 }}
                                        source={{ uri: this.props.route.params.UserInfo.AvatarUrl }}
                                    />
                                )}
                                /*accessoryRight={() => (
                                    <Button size='tiny'>Quan tâm</Button>
                                )}*/
                            />
                        </View>
                        <Header style={{ marginHorizontal: 10, marginTop: 20, marginBottom: 10 }} name='Nguyên liệu' />
                        {this.state.nguyenlieu.length ? (
                            this.state.nguyenlieu.map(item => (
                                <View style={{ borderWidth: 0, marginHorizontal: 10 }}>
                                    <Text style={{ flex: 1, fontSize: 16 }}>- {item}</Text>
                                </View>
                            ))
                        ) : (
                                <View>
                                    <ActivityIndicator style={{
                                        marginVertical: 20,
                                    }} size='large' />
                                </View>
                            )}
                        <Header style={{ marginHorizontal: 10, marginTop: 20, marginBottom: 10 }} name='Các bước' />
                        {this.state.cacbuoc.length ? (
                            this.state.cacbuoc.map((item, index) => (
                                <View style={{ borderBottomWidth: (this.state.cacbuoc.length - 1 == index) ? 0 : StyleSheet.hairlineWidth, marginBottom: 10, borderColor: 'gray' }}>
                                    <View style={{ borderWidth: 0, marginHorizontal: 10, marginBottom: 10 }}>
                                        <Text style={{ flex: 1, fontSize: 16 }}>{index + 1}. {item.Text}</Text>
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
                        {/** example from cooky.vn */}
                        {/*this.state.items.map(item => (
                            <TouchableHighlight
                                //onPress={(e) => this.props.navigation.push('Detail', item)}
                                activeOpacity={0.6}
                                underlayColor="#fff"
                            >
                                <View style={{ flex: 1, margin: 10 }}>
                                    <FastImage resizeMode="cover" style={{ width: '100%', height: 200, borderRadius: 5 }} source={{ uri: item.Img }} />
                                    <Text style={{ fontSize: 18, marginTop: 5 }} numberOfLines={1}>{item.Name}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Icon name='person' width={20} height={20} fill={'#0095FF'} />
                                        <Text style={{ fontSize: 17, fontWeight: 'bold', marginLeft: 5, flex: 1 }}>{item.UserInfo.DisplayName}</Text>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        ))*/}
                        {/** end - example from cooky.vn */}
                        {/*this.state.items.length ? (
                            <FlatList
                                data={this.state.items}
                                renderItem={({ item }) => (
                                    <ListItem
                                        onPress={(e) => this.props.navigation.push('Detail', item)}
                                        style={{ backgroundColor: '#fff', flex: 1, padding: 10 }}
                                        children={(
                                            <View style={{ flex: 1 }}>
                                                {item.Img ? <FastImage resizeMode="cover" style={{ borderRadius: 5, width: (viewportWidth / 2) - 20, height: (viewportWidth / 2) - 20 }} source={{ uri: item.Img }} /> : null}
                                                <Text style={{ fontSize: 16, marginTop: 5, flex: 1 }} numberOfLines={1}>{item.Name}</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <FastImage resizeMode="cover" style={{ borderRadius: 10, width: 20, height: 20 }} source={{ uri: item.UserInfo.AvatarUrl }} />
                                                    <Text style={{ fontSize: 16, marginLeft: 5, flex: 1 }} numberOfLines={1}>{item.UserInfo.DisplayName}</Text>
                                                </View>
                                            </View>
                                        )}
                                        activeOpacity={0.3}
                                    />
                                )}
                                numColumns={2}
                            />
                        ) : (
                                <View>
                                    <ActivityIndicator style={{
                                        marginVertical: 20,
                                    }} size='large' />
                                </View>
                                )*/}

                    </ScrollView>
                </SafeAreaView>
            </>
        );
    }
}
export default DetailScreen;
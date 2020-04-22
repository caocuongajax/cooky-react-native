import React, { Component } from 'react';
import { SafeAreaView, Text, FlatList, View, StyleSheet, ActivityIndicator, Dimensions, ImageBackground } from 'react-native';
import { ListItem, Icon, Button } from '@ui-kitten/components';
import FastImage from 'react-native-fast-image';
import { Header } from '../../components/groupHeader';
import { getUser } from '../../api/helper';
const { width: viewportWidth } = Dimensions.get('window');

class NguoidungScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            nextPage: '',
            loading: true,
            AvatarUrl: props.route.params.UserInfo.AvatarUrl.replace('28x28cq50', '120x120cq100').replace('32x32cq50', '120x120cq100'),
            UserDesc: {
                mon: '-',
                nguoiquantam: '-',
                banbep: '-'
            },
            UserBg: '',
            items: []
        };
    }
    async loadData(id) {
        try {
            const response = await getUser(id);
            if (!response.data.error) {
                this.setState({
                    UserDesc: {
                        mon: response.data.userInfo.mon,// + ' món',
                        nguoiquantam: response.data.userInfo.nguoiquantam,// + ' người quan tâm',
                        banbep: response.data.userInfo.banbep// + ' bạn bếp'
                    },
                    items: response.data.items,
                    UserBg: response.data.bgUer,
                    loading: false,
                    nextPage: response.data.nextPage
                });
            }
        } catch (error) {
            console.log(error)
        }
    }
    async loadNextPage(id, page) {
        try {
            const response = await getUser(id, page);
            this.setState({ items: [...this.state.items, ...response.data.items], nextPage: response.data.nextPage, isLoading: false });
        } catch (error) {
            this.setState({ isLoading: false });
        }
    }
    _handleLoadMore = (ev) => {
        if (this.state.nextPage) {
            this.setState({ isLoading: true });
            this.loadNextPage(this.props.route.params.UserInfo.Id, this.state.nextPage);
        }
    }
    componentDidMount() {
        this.loadData(this.props.route.params.UserInfo.Id);
    }
    render() {
        return (
            <>
                <SafeAreaView style={{ flex: 0, backgroundColor: '#f39731' }} />
                <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
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
                        backgroundColor: '#f39731',
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
                                <Text style={{ fontSize: 20, color: '#fff' }} numberOfLines={1}>{this.props.route.params.UserInfo.DisplayName}</Text>
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
                                <View style={{ marginTop: 65 }}>
                                    <ImageBackground resizeMode="cover" blurRadius={10} source={{ uri: this.state.UserBg }} style={{
                                        height: viewportWidth / 1.5,
                                    }}>
                                        <View style={{ padding: 20, marginTop: viewportWidth / 3.5 }}>
                                            <View style={{
                                                width: viewportWidth / 1.1, paddingVertical: 40, paddingHorizontal: 10, borderRadius: 10, backgroundColor: '#fff',
                                                shadowColor: "#000",
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 5,
                                                },
                                                shadowOpacity: 0.12,
                                                shadowRadius: 2.22,
                                                elevation: 3,
                                            }}>
                                                <View style={{ alignItems: 'center', height: 170 }}>
                                                    <FastImage
                                                        style={{ width: 140, height: 140, borderRadius: 70, borderColor: '#f39731', borderWidth: 4 }}
                                                        resizeMode="cover"
                                                        source={{ uri: this.state.AvatarUrl }}
                                                    />
                                                    <Text style={{ fontSize: 20, color: '#f39731', marginTop: 10 }} numberOfLines={1}>{this.props.route.params.UserInfo.DisplayName}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </ImageBackground>
                                </View>
                                <View style={{ marginTop: viewportWidth / 3 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                        <View style={{ flex: 1, padding: 10, alignItems: 'center', borderRightWidth: StyleSheet.hairlineWidth, borderColor: 'gray' }}>
                                            <Icon name="clock-outline" width={40} height={40} fill={'#f39731'} />
                                            <Text style={{ textAlign: 'center', fontSize: 16, margin: 5 }}>{this.state.UserDesc.mon}</Text>
                                            <Text style={{ textAlign: 'center', color: '#f39731' }}>món</Text>
                                        </View>
                                        <View style={{ flex: 1, padding: 10, alignItems: 'center', borderRightWidth: StyleSheet.hairlineWidth, borderColor: 'gray' }}>
                                            <Icon name="flash-outline" width={40} height={40} fill={'#f39731'} />
                                            <Text style={{ textAlign: 'center', fontSize: 16, margin: 5 }}>{this.state.UserDesc.nguoiquantam}</Text>
                                            <Text style={{ textAlign: 'center', color: '#f39731' }}>người quan tâm</Text>
                                        </View>
                                        <View style={{ flex: 1, padding: 10, alignItems: 'center' }}>
                                            <Icon name="bar-chart-outline" width={40} height={40} fill={'#f39731'} />
                                            <Text style={{ textAlign: 'center', fontSize: 16, margin: 5 }}>{this.state.UserDesc.banbep}</Text>
                                            <Text style={{ textAlign: 'center', color: '#f39731' }}>bạn bếp</Text>
                                        </View>
                                    </View>
                                </View>
                                <Header style={{ marginHorizontal: 10, marginTop: 20 }} colorText={'#f39731'} name={'Các món của ' + this.props.route.params.UserInfo.DisplayName} />
                            </>
                        )}
                        data={this.state.items}
                        renderItem={({ item }) => (
                            <ListItem
                                onPress={(e) => this.props.navigation.push('Detail', item)}
                                style={{ backgroundColor: '#fff', flex: 1, padding: 10 }}
                                children={(
                                    <View style={{ flex: 1 }}>
                                        {item.Img ? <FastImage resizeMode="cover" style={{ borderRadius: 5, width: (viewportWidth / 2) - 20, height: (viewportWidth / 2) - 20 }} source={{ uri: item.Img }} /> : null}
                                        <Text style={{ fontSize: 18, marginTop: 5, flex: 1 }} numberOfLines={1}>{item.Name}</Text>
                                    </View>
                                )}
                                activeOpacity={0.3}
                            />
                        )}
                        numColumns={2}
                        ListFooterComponent={(
                            this.state.isLoading || this.state.loading ? (
                                <View>
                                    <ActivityIndicator animating size="large" style={{
                                        marginVertical: 20,
                                    }} />
                                </View>
                            ) : (
                                    this.state.items.length ? (
                                        this.state.nextPage ? (
                                            <View style={{ margin: 20 }}>
                                                <ListItem
                                                    title={(<Text style={{ textAlign: 'center' }}>Load more...</Text>)}
                                                    onPress={this._handleLoadMore}
                                                />
                                            </View>
                                        ) : null
                                    ) : null
                                )
                        )}
                    />
                </SafeAreaView>
            </>
        )
    }
}
export default NguoidungScreen;
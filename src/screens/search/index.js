import React, { Component } from 'react';
import { SafeAreaView, Text, FlatList, View, StyleSheet, Image, ActivityIndicator, Dimensions, TextInput } from 'react-native';
import { ListItem, Icon, Button } from '@ui-kitten/components';
import FastImage from 'react-native-fast-image';
import { Header } from '../../components/groupHeader';
import { getSearch } from '../../api/helper';
const { width: viewportWidth } = Dimensions.get('window');

const debounce = (fn, delay) => {
    let timer = null;
    return function (...args) {
        const context = this;
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    };
}

class SearchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    name: 'Ăn sáng',
                    img: require('../../assets/img/icons/cat/breakfast.png')
                },
                {
                    name: 'Ăn vặt',
                    img: require('../../assets/img/icons/cat/popcorn.png')
                },
                {
                    name: 'Khai vị',
                    img: require('../../assets/img/icons/cat/dessert.png')
                },
                {
                    name: 'Món chay',
                    img: require('../../assets/img/icons/cat/vegetable.png')
                },
                {
                    name: 'Món chính',
                    img: require('../../assets/img/icons/cat/maincourse.png')
                },
                {
                    name: 'Nhanh - Dễ',
                    img: require('../../assets/img/icons/cat/quickeasy.png')
                },
                {
                    name: 'Làm bánh',
                    img: require('../../assets/img/icons/cat/baking.png')
                },
                {
                    name: 'Healthy',
                    img: require('../../assets/img/icons/cat/healthy.png')
                },
                {
                    name: 'Thức uống',
                    img: require('../../assets/img/icons/cat/drinks.png')
                },
                {
                    name: 'Salad',
                    img: require('../../assets/img/icons/cat/salad.png')
                },
                {
                    name: 'Nước chấm',
                    img: require('../../assets/img/icons/cat/sauce.png')
                },
                {
                    name: 'Pasta - Spaghetti',
                    img: require('../../assets/img/icons/cat/pasta.png')
                },
                {
                    name: 'Gà',
                    img: require('../../assets/img/icons/cat/chicken.png')
                },
                {
                    name: 'Snacks',
                    img: require('../../assets/img/icons/cat/snack.png')
                },
                {
                    name: 'Bún - Mì - Phở',
                    img: require('../../assets/img/icons/cat/noodle.png')
                },
                {
                    name: 'Lẩu',
                    img: require('../../assets/img/icons/cat/hotspot.png')
                }
            ],
            loading: true,
            nextPage: '',
            isLoading: false,
            signature: props.route.params ? props.route.params.name : '',
            soluong: '-',
            items: []
        }
        this.onSearchChange = this.onSearchChange.bind(this);
        this.fetchPlaces = debounce(this.fetchPlaces, 1000);
    }
    async fetchPlaces(q) {
        try {
            const response = await getSearch(q);
            this.setState({ items: response.data.items, soluong: response.data.soluong, nextPage: response.data.nextPage, loading: false, isLoading: false });
        } catch (error) {
            this.setState({ loading: false, isLoading: false });
        }
    }
    onSearchChange(ev) {
        this.setState({ signature: ev, isLoading: true, items: [] });
        this.fetchPlaces(ev);
    }
    componentDidMount() {
        if (this.props.route.params) {
            this.setState({ signature: this.props.route.params.name });
            this.fetchPlaces(this.props.route.params.name)
        } else {
            this.setState({ loading: false });
        }
    }
    async loadNextPage(q, page) {
        try {
            const response = await getSearch(q, page);
            this.setState({ items: [...this.state.items, ...response.data.items], nextPage: response.data.nextPage, isLoading: false });
        } catch (error) {
            this.setState({ isLoading: false });
        }
    }
    _handleLoadMore = (ev) => {
        if (this.state.nextPage) {
            this.setState({ isLoading: true });
            this.loadNextPage(this.state.signature, this.state.nextPage);
        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
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
                    <View
                        style={{
                            flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', paddingLeft: 10,
                            borderWidth: StyleSheet.hairlineWidth,
                            borderColor: '#b3b3b3',
                            shadowColor: 'rgba(0,0,0,0.1)',
                            shadowOffset: { width: 0, height: 5 },
                            shadowOpacity: 0.8,
                            shadowRadius: 10,
                            borderRadius: 3, marginLeft: 10
                        }}>
                        <Icon
                            name="search-outline"
                            width={20}
                            height={20}
                            fill='#919191'
                        />
                        {/*<Text style={{ padding: 10 }}>Search...</Text>*/}
                        <TextInput style={{ padding: 10, flex: 1 }} placeholder={'Search...'}
                            onChangeText={this.onSearchChange}
                            defaultValue={this.state.signature}
                            value={this.state.signature}
                        />
                    </View>
                </View>
                {this.state.loading ? (
                    <View style={{backgroundColor: '#fff', flex: 1}}>
                        <ActivityIndicator style={{
                            marginVertical: 20,
                        }} size='large' />
                    </View>
                ) : (
                        this.state.items.length ? (
                            <FlatList
                                style={{ backgroundColor: '#fff' }}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={item => item.Id.toString()}
                                ListHeaderComponent={(
                                    <Header style={{ marginHorizontal: 10, marginTop: 10 }} name={'Kết quả tìm kiếm ' + this.state.soluong} />
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
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <FastImage resizeMode="center" style={{ borderRadius: 10, width: 20, height: 20 }} source={{ uri: item.UserInfo.AvatarUrl }} />
                                                    <Text style={{ fontSize: 16, marginLeft: 5, flex: 1 }} numberOfLines={1}>{item.UserInfo.DisplayName}</Text>
                                                </View>
                                            </View>
                                        )}
                                        activeOpacity={0.3}
                                    />
                                )}
                                numColumns={2}
                                ListEmptyComponent={(
                                    !this.isLoading ? (
                                        <View style={{ marginTop: 30 }}>
                                            <Text style={{ textAlign: 'center', fontSize: 18 }}>Không có dữ liệu.</Text>
                                        </View>
                                    ) : null
                                )}
                                ListFooterComponent={(
                                    this.state.isLoading ? (
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
                        ) : (
                                <View style={{ backgroundColor: '#fff', flex: 1 }}>
                                    {this.state.isLoading ? (
                                        <View>
                                            <ActivityIndicator animating size="large" style={{
                                                marginVertical: 20,
                                            }} />
                                        </View>
                                    ) : (
                                            this.state.signature ? (
                                                <View style={{ marginTop: 30 }}>
                                                    <Text style={{ textAlign: 'center', fontSize: 18 }}>Không có dữ liệu.</Text>
                                                </View>
                                            ) : (
                                                    <View>
                                                        <FlatList
                                                            data={this.state.data}
                                                            keyExtractor={item => item.name.toString()}
                                                            renderItem={({ item }) => (
                                                                <ListItem
                                                                    style={{ backgroundColor: '#fff', flex: 1 }}
                                                                    children={(
                                                                        <View style={{ alignContent: 'center', alignItems: 'center', flex: 1 }}>
                                                                            {item.img ? <Image style={{ width: 36, height: 36 }} source={item.img} /> : null}
                                                                            <Text style={{ textAlign: 'center' }}>{item.name}</Text>
                                                                        </View>
                                                                    )}
                                                                    onPress={(e) => this.onSearchChange(item.name)}
                                                                    activeOpacity={0.3}
                                                                />
                                                            )}
                                                            numColumns={3}
                                                        />
                                                    </View>
                                                )/** vao dau tien */
                                        )}
                                </View>
                            )
                    )}
            </SafeAreaView>
        )
    }
}
export default SearchScreen;
import React, { Component } from 'react';
import { SafeAreaView, FlatList, Text, View, StyleSheet, Dimensions, Image, ActivityIndicator, RefreshControl, Modal, TouchableWithoutFeedback } from 'react-native';
import { ListItem, Icon } from '@ui-kitten/components';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import FastImage from 'react-native-fast-image';
import { getAll } from '../../api/helper';
const { width: viewportWidth } = Dimensions.get('window');

console.disableYellowBox = true;

const Header = (props) => (
  <View {...props}>
    {/*<Text category='h6'>Maldives</Text>*/}
    <Text style={{ fontSize: 18, fontWeight: '500', color: '#FF3D71' }}>{props.name}</Text>
  </View>
);

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      nextPage: '',
      loading: true,
      modalVisible: false,
      refreshing: false,
      activeSlide: 0,
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
      items: [],
      noibat: [],
      sliders: [
        {
          img: 'https://media.cooky.vn/ads/s/cooky-ads-637223976948251031.jpg'
        },
        {
          img: 'https://media.cooky.vn/ads/s/cooky-ads-637209188010878683.jpg'
        },
        {
          img: 'https://media.cooky.vn/ads/s/cooky-ads-637209188951193368.jpg'
        }
      ]
    };
  }
  componentDidMount() {
    this.loadData();
  }
  async loadData() {
    try {
      const response = await getAll();
      this.setState({ items: response.data.items, nextPage: response.data.nextPage, refreshing: false, loading: false });
    } catch (error) {
      this.setState({ refreshing: false, loading: false });
    }
  }
  async loadNextPage(id) {
    try {
      const response = await getAll(id);
      this.setState({ items: [...this.state.items, ...response.data.items], nextPage: response.data.nextPage, isLoading: false });
    } catch (error) {
      this.setState({ isLoading: false });
    }
  }
  _handleLoadMore = (ev) => {
    this.setState({ isLoading: true });
    this.loadNextPage(this.state.nextPage);
  }
  onRefresh = () => {
    this.setState({ refreshing: true });
    this.loadData();
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={() => this.props.navigation.push('Search')}>
          <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
            {/*<FastImage style={{ marginRight: 10, width: 32, height: 32 }} source={{ uri: 'https://www.cooky.vn/Content/img/icons/cat/vegetable.png' }} />*/}
            <View
              style={{
                flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', paddingLeft: 10,
                borderWidth: StyleSheet.hairlineWidth,
                borderColor: '#b3b3b3',
                shadowColor: 'rgba(0,0,0,0.1)',
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.8,
                shadowRadius: 10,
                borderRadius: 3,
              }}>
              <Icon
                name="search-outline"
                width={20}
                height={20}
                fill='#919191'
              />
              <Text style={{ padding: 10, color: 'gray' }}>Search...</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <FlatList
          style={{ backgroundColor: '#fff' }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
          }
          ListHeaderComponent={(
            <>
              <Carousel
                ref={(c) => { this._carousel = c; }}
                data={this.state.sliders}
                renderItem={({ item }) => (
                  <View style={{ width: viewportWidth }}>
                    <FastImage resizeMode="contain" style={{ height: 140, }} source={{ uri: item.img }} />
                  </View>
                )}
                sliderWidth={viewportWidth}
                itemWidth={viewportWidth}
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
                firstItem={0}
                loop={false}
                autoplay={false}
                autoplayDelay={500}
                autoplayInterval={3000}
                onSnapToItem={index => this.setState({ activeSlide: index })}
              />
              <Pagination
                dotsLength={this.state.sliders.length}
                activeDotIndex={this.state.activeSlide}
                containerStyle={{
                  flex: 1,
                  position: 'absolute',
                  alignSelf: 'center',
                  paddingVertical: 8,
                  marginTop: 115
                }}
                dotColor="rgba(255, 255, 255, 0.92)"
                dotStyle={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  marginHorizontal: 0
                }}
                inactiveDotColor="white"
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                carouselRef={this._carousel}
              />
              <View style={{ margin: 10 }}>
                <FlatList
                  data={this.state.data}
                  keyExtractor={item => item.name.toString()}
                  renderItem={({ item, index }) => (
                    index < 9 ? (
                      <ListItem
                        style={{ backgroundColor: '#fff', flex: 1, }}
                        children={(
                          <View style={{ alignContent: 'center', alignItems: 'center', flex: 1 }}>
                            {item.img ? <Image style={{ width: 36, height: 36 }} source={item.img} /> : null}
                            <Text style={{ textAlign: 'center' }}>{item.name}</Text>
                          </View>
                        )}
                        onPress={(e) => this.props.navigation.push('Search', { name: item.name })}
                        activeOpacity={0.3}
                      />
                    ) : null
                  )}
                  numColumns={3}
                />
                <ListItem
                  style={{ backgroundColor: '#fff', flex: 1 }}
                  children={(
                    <View style={{ alignContent: 'center', alignItems: 'center', flex: 1 }}>
                      <Text>More...</Text>
                    </View>
                  )}
                  onPress={(e) => this.setState({ modalVisible: true })}
                  activeOpacity={0.3}
                />
              </View>
              <Header style={{ marginHorizontal: 10, marginTop: 20 }} name='Các món trên Cookpad' />
            </>
          )}
          data={this.state.items}
          keyExtractor={item => item.Id.toString()}
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
          ListFooterComponent={(
            this.state.isLoading || this.state.loading ? (
              <View>
                <ActivityIndicator animating size="large" style={{
                  marginVertical: 20,
                }} />
              </View>
            ) : (
                  <View style={{ margin: 20 }}>
                    <ListItem
                      title={(<Text style={{ textAlign: 'center' }}>Load more...</Text>)}
                      onPress={this._handleLoadMore}
                    />
                  </View>
              )
          )}
        />
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setState({ modalVisible: false })}
        >
          <TouchableWithoutFeedback onPress={() => this.setState({ modalVisible: false })}>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' }}>
              <View style={{
                flex: 1,
                //justifyContent: "center",
                //alignItems: "center",
                marginHorizontal: 20,
                marginVertical: 190,
                backgroundColor: '#fff',
                borderRadius: 10
              }}>
                <View style={{ margin: 10, }}>
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
                        onPress={(e) => {
                          this.setState({ modalVisible: false });
                          this.props.navigation.push('Search', { name: item.name });
                        }}
                        activeOpacity={0.3}
                      />
                    )}
                    numColumns={3}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </SafeAreaView>
    );
  }
}
export default HomeScreen;
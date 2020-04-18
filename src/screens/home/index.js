import React, { Component } from 'react';
import { SafeAreaView, FlatList, Text, View, StyleSheet, ScrollView, Dimensions, TouchableHighlight, ActivityIndicator, RefreshControl } from 'react-native';
import { ListItem, Icon } from '@ui-kitten/components';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import FastImage from 'react-native-fast-image';
import Axios from 'axios';
import DOMParser from 'react-native-html-parser';
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
      refreshing: false,
      activeSlide: 0,
      data: [
        {
          name: 'Ăn sáng',
          img: 'https://www.cooky.vn/Content/img/icons/cat/breakfast.png'
        },
        {
          name: 'Ăn vặt',
          img: 'https://www.cooky.vn/Content/img/icons/cat/popcorn.png'
        },
        {
          name: 'Khai vị',
          img: 'https://www.cooky.vn/Content/img/icons/cat/dessert.png'
        },
        {
          name: 'Món chính',
          img: 'https://www.cooky.vn/Content/img/icons/cat/maincourse.png'
        },
        {
          name: 'Làm bánh',
          img: 'https://www.cooky.vn/Content/img/icons/cat/baking.png'
        },
        {
          name: 'Thức uống',
          img: 'https://www.cooky.vn/Content/img/icons/cat/drinks.png'
        },
        {
          name: 'Salad',
          img: 'https://www.cooky.vn/Content/img/icons/cat/salad.png'
        },
        {
          name: 'Nước chấm',
          img: 'https://www.cooky.vn/Content/img/icons/cat/sauce.png'
        },
        {
          name: 'Nhanh - Dễ',
          img: 'https://www.cooky.vn/Content/img/icons/cat/quickeasy.png'
        },
        {
          name: 'More...'
        }
        /*{
          name: 'Gà',
          img: 'https://www.cooky.vn/Content/img/icons/cat/chicken.png'
        },
        {
          name: 'Snacks',
          img: 'https://www.cooky.vn/Content/img/icons/cat/snack.png'
        },
        {
          name: 'Lẩu',
          img: 'https://www.cooky.vn/Content/img/icons/cat/hotspot.png'
        }*/
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
    this.onRefresh = this.onRefresh.bind(this);
  }
  componentDidMount() {
    /*Axios.get('https://www.cooky.vn/directory/search').then((response) => {
      this.setState({ noibat: response.data.recipes });
    })*/
    /*Axios.get('https://www.cooky.vn/directory/search?dt=140').then((response) => {
        this.setState({ items: response.data.recipes });
    })*/
    this.loadData();
  }
  loadData() {
    Axios.get('https://cookpad.com/vn').then((response) => {
      try {
        const html = response.data;
        const parser = new DOMParser.DOMParser();
        const parsed = parser.parseFromString(html, 'text/html');
        const data = parsed.getElementsByClassName('masonry__item', false);
        let tmp = [];
        //console.log(data[0].getElementsByClassName('inline', false))
        for (let i = 0; i < data.length; i++) {
          let tmp2 = {
            Source: 'cookpad'
          };
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
          const data4 = data[i].getElementsByClassName('card', false);
          //console.log(data4[0].childNodes[0].nextSibling.attributes)
          Object.keys(data4[0].childNodes[0].nextSibling.attributes).map((key, index) => {
            if (data4[0].childNodes[0].nextSibling.attributes[key].nodeName == 'href') {
              tmp2.Id = data4[0].childNodes[0].nextSibling.attributes[key].value;
            }
          });
          const data5 = data[i].getElementsByClassName('feed__justification', false);
          //console.log(data4[0].childNodes[0].nextSibling.attributes)
          Object.keys(data5[0].childNodes[0].nextSibling.attributes).map((key, index) => {
            if (data5[0].childNodes[0].nextSibling.attributes[key].nodeName == 'href') {
              tmp2.UserInfo.Id = data5[0].childNodes[0].nextSibling.attributes[key].value;
            }
          });
          tmp.push(tmp2);
        }
        //console.log(tmp)
        this.setState({ items: tmp, refreshing: false });
      } catch (err) {
        console.log(err)
        this.setState({ refreshing: false });
      }
    })
  }
  onRefresh() {
    this.setState({ refreshing: true, items: [] });
    this.loadData();
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
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
            <Text style={{ padding: 10 }}>Search...</Text>
          </View>
        </View>
        {/*<ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ width: viewportWidth }}>
            <FastImage resizeMode="contain" style={{ height: 140, }} source={{ uri: 'https://media.cooky.vn/ads/s/cooky-ads-637223976948251031.jpg' }} />
          </View>
          <View style={{ width: viewportWidth }}>
            <FastImage resizeMode="contain" style={{ height: 140, }} source={{ uri: 'https://media.cooky.vn/ads/s/cooky-ads-637209188010878683.jpg' }} />
          </View>
        </ScrollView>*/}
        {/*<FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              style={{ borderWidth: StyleSheet.hairlineWidth, flex: 1, borderColor: '#ddd' }}
              children={(
                <View style={{ alignContent: 'center', alignItems: 'center', flex: 1 }}>
                  {item.img ? <FastImage style={{ width: 36, height: 36 }} source={{ uri: item.img }} /> : null}
                  <Text>{item.name}</Text>
                </View>
              )}
            />
          )}
          numColumns={3}
              />*/}
        {/*<FlatList
          data={this.state.items}
          renderItem={({ item }) => (
            <ListItem
              style={{ backgroundColor: '#fff' }}
              children={(
                <View style={{ flex: 1 }}>
                  <FastImage resizeMode="cover" style={{ width: '100%', height: 200, borderRadius: 5 }} source={{ uri: item.img }} />
                  <Text style={{ fontSize: 18, marginTop: 5 }} numberOfLines={1}>{item.name}</Text>
                </View>
              )}
            />
          )}
              />*/}
        <ScrollView
          style={{ backgroundColor: '#fff' }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
          }
        >
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
              renderItem={({ item }) => (
                <ListItem
                  style={{ backgroundColor: '#fff', flex: 1, }}
                  children={(
                    <View style={{ alignContent: 'center', alignItems: 'center', flex: 1 }}>
                      {item.img ? <FastImage style={{ width: 36, height: 36 }} source={{ uri: item.img }} /> : null}
                      <Text>{item.name}</Text>
                    </View>
                  )}
                  onPress={(e) => this.props.navigation.navigate('Login')}
                  activeOpacity={0.3}
                />
              )}
              numColumns={3}
            />
          </View>
          {/*<View style={{ marginBottom: 10 }}>
            <Header style={{ margin: 10 }} name='Công thức bởi Cooky' />
            {this.state.noibat.length ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginHorizontal: 10 }}
              >
                {this.state.noibat.map(item => (
                  <TouchableHighlight
                    onPress={(e) => this.props.navigation.push('Detail', item)}
                    activeOpacity={0.6}
                    underlayColor="#fff"
                  >
                    <View style={{ width: 170, marginRight: 10, justifyContent: 'center' }}>
                      <FastImage resizeMode="cover" style={{ height: 128, borderRadius: 5 }} source={{ uri: item.Img }} />
                      <Text style={{ fontSize: 17 }} numberOfLines={1}>{item.Name}</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FastImage resizeMode="center" style={{ borderRadius: 10, width: 20, height: 20 }} source={{ uri: item.UserInfo.AvatarUrl }} />
                        <Text style={{ fontSize: 16, marginLeft: 5, flex: 1 }} numberOfLines={1}>{item.UserInfo.DisplayName}</Text>
                      </View>
                    </View>
                  </TouchableHighlight>
                ))}
              </ScrollView>
            ) : (
                <View>
                  <ActivityIndicator style={{
                    marginVertical: 20,
                  }} size='large' />
                </View>
              )}
                </View>*/}
          <Header style={{ marginHorizontal: 10, marginTop: 20 }} name='Công thức bởi Cookpad' />
          {this.state.items.length ? (
            <FlatList
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
                        {/*<Icon name='person' width={20} height={20} fill={'#0095FF'} />*/}
                        <FastImage resizeMode="center" style={{ borderRadius: 10, width: 20, height: 20 }} source={{ uri: item.UserInfo.AvatarUrl }} />
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
            )}
          {/*this.state.items.map(item => (
            <TouchableHighlight
              onPress={(e) => this.props.navigation.push('Detail', item)}
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
        </ScrollView>
      </SafeAreaView>
    );
  }
}
export default HomeScreen;
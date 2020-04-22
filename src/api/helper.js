import { API_URL } from './constants';
import Axios from 'axios';
import DOMParser from 'react-native-html-parser';
const cheerio = require('react-native-cheerio');

export const getAll = (id) => {
  return Axios({
    url: API_URL + (id ? id : '/vn'),
    method: 'get',
    transformResponse: [function (data) {
      try {
        const parser = new DOMParser.DOMParser({
          errorHandler: {
            warning: w => console.warn(w),
            error: e => console.log(e),
            fatalError: e => console.log(e),
          },
        });
        const parsed = parser.parseFromString(data, 'text/html');
        const items = parsed.getElementsByClassName('masonry__item', false);
        let tmp = [];
        for (let i = 0; i < items.length; i++) {
          let tmp2 = {
            Source: 'cookpad'
          };
          const data2 = items[i].getElementsByClassName('feed__photo', false);
          Object.keys(data2[0].attributes).map((key, index) => {
            if (data2[0].attributes[key].nodeName == 'alt') {
              tmp2.Name = data2[0].attributes[key].value;
            }
            if (data2[0].attributes[key].nodeName == 'src') {
              tmp2.Img = (data2[0].attributes[key].value[0] == 'h' ? '' : 'https:') + data2[0].attributes[key].value;
            }
          });
          const data3 = items[i].getElementsByClassName('inline', false);
          tmp2.UserInfo = {};
          Object.keys(data3[0].attributes).map((key, index) => {
            if (data3[0].attributes[key].nodeName == 'alt') {
              tmp2.UserInfo.DisplayName = data3[0].attributes[key].value;
            }
            if (data3[0].attributes[key].nodeName == 'src') {
              tmp2.UserInfo.AvatarUrl = (data3[0].attributes[key].value[0] == 'h' ? '' : 'https:') + data3[0].attributes[key].value;
            }
          });
          const data4 = items[i].getElementsByClassName('card', false);
          Object.keys(data4[0].childNodes[0].nextSibling.attributes).map((key, index) => {
            if (data4[0].childNodes[0].nextSibling.attributes[key].nodeName == 'href') {
              tmp2.Id = data4[0].childNodes[0].nextSibling.attributes[key].value;
            }
          });
          const data5 = items[i].getElementsByClassName('feed__justification', false);
          Object.keys(data5[0].childNodes[0].nextSibling.attributes).map((key, index) => {
            if (data5[0].childNodes[0].nextSibling.attributes[key].nodeName == 'href') {
              tmp2.UserInfo.Id = data5[0].childNodes[0].nextSibling.attributes[key].value;
            }
          });
          tmp.push(tmp2);
        }
        const data6 = parsed.getElementsByAttribute('id', 'feed_pagination');
        let nextPage = '';
        Object.keys(data6[0].childNodes[0].nextSibling.attributes).map((key, index) => {
          if (data6[0].childNodes[0].nextSibling.attributes[key].nodeName == 'href') {
            nextPage = data6[0].childNodes[0].nextSibling.attributes[key].value;
          }
        });
        return { items: tmp, nextPage: nextPage };
      } catch (error) {
        return { items: [], nextPage: '' };
      }
    }],
  });
};

export const getSearch = (q, page) => {
  return Axios({
    url: API_URL + '/vn/tim-kiem/' + q + (page ? ('?page=' + page) : ''),
    method: 'get',
    transformResponse: [function (data) {
      try {
        const parser = new DOMParser.DOMParser({
          errorHandler: {
            warning: w => console.warn(w),
            error: e => console.log(e),
            fatalError: e => console.log(e),
          },
        });
        const parsed = parser.parseFromString(data, 'text/html');
        const dataSoluong = parsed.getElementsByClassName('results-header__count', false);
        const soluong = dataSoluong[0].childNodes[0].data;

        const items = parsed.getElementsByClassName('items-start', false);
        let tmp = [];
        for (let i = 0; i < items.length; i++) {
          let tmp2 = {
            Img: 'https://assets-global.cpcdn.com/assets/blank_logo-66f12ec6151fd5055601867856c705c89750e759667b4b2da3967c4eba2b3e5b.png',
            Name: '',
            Id: '',
            Source: 'cookpad',
            UserInfo: {
              AvatarUrl: '',//this.props.route.params.UserInfo.AvatarUrl,
              DisplayName: '',//this.props.route.params.UserInfo.DisplayName,
              Id: '',//this.props.route.params.UserInfo.Id
            }
          };
          const InfoUser = items[i].getElementsByClassName('rounded-full', false);
          Object.keys(InfoUser[0].attributes).map((key, index) => {
            if (InfoUser[0].attributes[key].nodeName == 'alt') {
              tmp2.UserInfo.DisplayName = InfoUser[0].attributes[key].value;
            }
            if (InfoUser[0].attributes[key].nodeName == 'src') {
              tmp2.UserInfo.AvatarUrl = InfoUser[0].attributes[key].value[0] == 'h' ? InfoUser[0].attributes[key].value : ('https:' + InfoUser[0].attributes[key].value);
            }
          });
          const title = items[i].getElementsByClassName('recipe-title', false);
          tmp2.Name = title[0].childNodes[0].nextSibling.childNodes[0].data;
          const link = items[i].getElementsByClassName('media', false);
          Object.keys(link[0].attributes).map((key, index) => {
            if (link[0].attributes[key].nodeName == 'href') {
              tmp2.Id = link[0].attributes[key].value;
            }
          });
          const hinhanh = items[i].getElementsByClassName('lazy-image', false);
          if (hinhanh.length) {
            Object.keys(hinhanh[0].attributes).map((key, index) => {
              if (hinhanh[0].attributes[key].nodeName == 'data-src') {
                tmp2.Img = hinhanh[0].attributes[key].value;
              }
            });
          }
          tmp.push(tmp2);
        }

        /*const data3 = parsed.getElementsByAttribute('class', 'pagination__page page current');
        const currentPage = data3[0].childNodes[0].data;
        //console.log(data3[0].childNodes[0].data, page)//current page
        const data4 = parsed.getElementsByAttribute('class', 'pagination__page page');
        //console.log(data4[0].childNodes[0].nextSibling.childNodes[0].data)//first page*/

        const data5 = parsed.getElementsByAttribute('class', 'pagination__next');
        let nextPage = '';
        if (data5.length) {
          Object.keys(data5[0].attributes).map((key, index) => {
            if (data5[0].attributes[key].nodeName == 'href') {
              nextPage = data5[0].attributes[key].value.split('page=');
              //console.log(nextPage[1])
              nextPage = nextPage[1];
            }
          });
        }

        return { items: tmp, soluong: soluong, nextPage: nextPage };
      } catch (error) {
        return { items: [], soluong: '-', nextPage: '' };
      }
    }],
  });
};

export const getUser = (id, page) => {
  return Axios({
    url: API_URL + id + (page ? ('?page=' + page) : ''),
    method: 'get',
    transformResponse: [function (data) {
      try {
        const parser = new DOMParser.DOMParser({
          errorHandler: {
            warning: w => console.warn(w, 'err'),
            error: e => console.log(e, 'err'),
            fatalError: e => console.log(e, 'err'),
          },
        });
        const parsed = parser.parseFromString(data, 'text/html');
        const dataDesc = parsed.getElementsByClassName('user-header__profile-stats-item', false);
        const userDesc = {
          mon: dataDesc[0].childNodes[0].nextSibling.childNodes[0].data,// + ' món',
          nguoiquantam: dataDesc[1].childNodes[0].nextSibling.childNodes[0].data,// + ' người quan tâm',
          banbep: dataDesc[2].childNodes[0].nextSibling.childNodes[0].data// + ' bạn bếp'
        };
        const thongtinUser = parsed.getElementsByClassName('user-header__avatar', false);
        let userInfo = {
          AvatarUrl: '',
          DisplayName: '',
        };
        Object.keys(thongtinUser[0].attributes).map((key, index) => {
          if (thongtinUser[0].attributes[key].nodeName == 'src') {
            userInfo.AvatarUrl = thongtinUser[0].attributes[key].value;
          }
          if (thongtinUser[0].attributes[key].nodeName == 'alt') {
            userInfo.DisplayName = thongtinUser[0].attributes[key].value;
          }
        });
        const data2 = parsed.getElementsByClassName('items-start', false);
        let tmp = [];
        for (let i = 0; i < data2.length; i++) {
          let tmp2 = {
            Img: 'https://assets-global.cpcdn.com/assets/blank_logo-66f12ec6151fd5055601867856c705c89750e759667b4b2da3967c4eba2b3e5b.png',
            Name: '',
            Id: '',
            Source: 'cookpad',
            UserInfo: {
              AvatarUrl: userInfo.AvatarUrl,
              DisplayName: userInfo.DisplayName,
              Id: id
            }
          };
          const title = data2[i].getElementsByClassName('recipe-title', false);
          tmp2.Name = title[0].childNodes[0].nextSibling.childNodes[0].data;
          const link = data2[i].getElementsByClassName('media', false);
          Object.keys(link[0].attributes).map((key, index) => {
            if (link[0].attributes[key].nodeName == 'href') {
              tmp2.Id = link[0].attributes[key].value;
            }
          });
          const hinhanh = data2[i].getElementsByClassName('lazy-image', false);
          if (hinhanh.length) {
            Object.keys(hinhanh[0].attributes).map((key, index) => {
              if (hinhanh[0].attributes[key].nodeName == 'data-src') {
                tmp2.Img = hinhanh[0].attributes[key].value;
              }
            });
          }
          tmp.push(tmp2);
        }
        const data3 = parsed.getElementsByClassName('user-background__image', false);
        let bgUer = '';
        Object.keys(data3[0].attributes).map((key, index) => {
          if (data3[0].attributes[key].nodeName == 'style') {
            bgUer = data3[0].attributes[key].value.replace("background-image: url('", '').replace("');", '');
          }
        });

        const data5 = parsed.getElementsByAttribute('class', 'pagination__next');
        let nextPage = '';
        if (data5.length) {
          Object.keys(data5[0].attributes).map((key, index) => {
            if (data5[0].attributes[key].nodeName == 'href') {
              nextPage = data5[0].attributes[key].value.split('page=');
              nextPage = nextPage[1];
            }
          });
        }

        return { userInfo: userDesc, items: tmp, bgUer: bgUer, nextPage: nextPage };
      } catch (error) {
        console.log(API_URL + id)
        return { error: error };
      }
    }],
  });
};

export const getDetail = (id) => {
  return Axios({
    url: API_URL + id,
    method: 'get',
    transformResponse: [function (data) {
      try {
        const $ = cheerio.load(data);
        let nguyenlieu = [];
        $('.ingredient__details').map((index, el) => {
          nguyenlieu.push($(el).text().trim());
        })
        let cacbuoc = [];
        $('.step').map((index, el) => {
          let tmp2 = [];
          const hinhanh = $(el).find('img.lazy-image');
          if (hinhanh.length) {
            hinhanh.map((index2, el2) => {
              tmp2.push($(el2).attr('data-src'));
            })
          }

          const noidung = $(el).find('p.mb-2');
          const noidungText = $(noidung).text().trim();

          cacbuoc.push({
            Text: noidungText,
            Images: tmp2
          });
        });
        let userInfo = {
          Id: '',
          DisplayName: '',
          AvatarUrl: ''
        };
        let userData = $('#author_profile').find('a');
        userInfo.Id = $(userData[0]).attr('href');
        userData = $('#author_profile').find('img.lazy-image');
        userInfo.DisplayName = $(userData[0]).attr('title');
        userInfo.AvatarUrl = $(userData[0]).attr('data-src');
        let tmp = [];
        $('.masonry__item').map((index, el) => {
          let tmp2 = {
            Img: 'https://assets-global.cpcdn.com/assets/blank_logo-66f12ec6151fd5055601867856c705c89750e759667b4b2da3967c4eba2b3e5b.png',
            Name: '',
            Id: '',
            Source: 'cookpad',
            UserInfo: {
              AvatarUrl: userInfo.AvatarUrl,
              DisplayName: userInfo.DisplayName,
              Id: userInfo.Id
            }
          };
          const link = $(el).find('a');
          tmp2.Id = $(link[0]).attr('href');
          const hinhanh2 = $(el).find('img');
          if (hinhanh2.length) {
            tmp2.Img = $(hinhanh2[0]).attr('data-src');
            tmp2.Name = $(hinhanh2[0]).attr('alt');
          } else {
            const title = $(el).find('.feed__title');
            tmp2.Name = $(title).text().trim();
          }
          tmp.push(tmp2);
        });
        let imgItem = '';
        $('.tofu_image').map((index, el) => {
          if (index==0) {
            const hinhanh3 = $(el).find('img');
            imgItem = $(hinhanh3[0]).attr('src');
          }
        })
        return { nguyenlieu: nguyenlieu, cacbuoc: cacbuoc, userInfo: userInfo, items: tmp, imgItem: imgItem };
      } catch (error) {
        console.log(API_URL + id, error)
        return {error: error};
      }
    }],
  });
}
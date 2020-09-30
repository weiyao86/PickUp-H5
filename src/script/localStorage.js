// 预设系统localStorage列表,不在此列表则提示
const keys = {
  lng: "经度",
  lat: "纬度",
  userToken: "用户token",
  lastFullPath: "登录前最后页面",
  userInfo: "用户信息需要JSON.parse转换",
  secret: "随机数",
   //仅提货卡系统
  wechatAuth:"微信是否授权",  //仅提货卡系统使用
  lastPathListForPickUp:"提货卡系统最后面",
  pickUpUserInfo:"用户信息"
};

let Cache = {
  /**
   * duration  过期时间(ms) 0:不过期
   */
  setStorage: (key, val, duration = 0) => {
    if (!localStorage) {
      return console.log("不支持此localStorage方法!");
    }
    if (keys[key]) {
      let curTime = +new Date();
      curTime = isNaN(duration) || !duration ? 0 : curTime + duration;
      let data = {
        value: JSON.stringify(val),
        expiryTime: curTime
      };
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      console.log(`请正确配置存储set:${key}值!`);
    }
  },
  getStorage: key => {
    if (!localStorage) {
      console.log("不支持此localStorage方法!");
      return "";
    }

    if (keys[key]) {
      let data = localStorage.getItem(key),
        curTime = +new Date();

      if (data) {
        try {
          let tempData = JSON.parse(data);
          let { value, expiryTime } = tempData;
          if (expiryTime == 0 || expiryTime >= curTime) {
            return JSON.parse(value);
          }
        } catch (err) {
          console.log(err);
          return "";
        }
      }
    } else {
      console.log(`请正确配置存储get:${key}值!`);
    }
    return "";
  },
  //clear single value by key
  rmStorage: keys => {
    !Array.isArray(keys) && (keys = [keys]);

    keys.forEach(key => {
      localStorage.removeItem(key);
    });
  },
  //clear all
  rmClearAll: () => localStorage.clear(),

  setSessionStorage: (key, val) => {
    if (!sessionStorage) {
      return console.log("不支持此sessionStorage方法!");
    }
    if (keys[key]) {
      let data = {
        value: JSON.stringify(val)
      };
      sessionStorage.setItem(key, JSON.stringify(data));
    } else {
      console.log(`请正确配置存储set:${key}值!`);
    }
  },

  getSessionStorage: key => {
    if (!sessionStorage) {
      console.log("不支持此sessionStorage方法!");
      return "";
    }

    if (keys[key]) {
      let data = sessionStorage.getItem(key);

      if (data) {
        try {
          let tempData = JSON.parse(data);
          let { value } = tempData;
          return JSON.parse(value);
        } catch (err) {
          console.log(err);
          return "";
        }
      }
    } else {
      console.log(`请正确配置存储get:${key}值!`);
    }
    return "";
  }
};

export default Cache;

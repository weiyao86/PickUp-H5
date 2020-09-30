import Vue from "vue";
import axios from "axios";
import Cache from "./localStorage";
/**
 * [config description]
 * @type {Object}
 */

const URL_IDX = process.env.NODE_ENV == "production" ? 0 : 1;
const URL_OPTS = ["http://172.16.30.234/", "http://zgwjapi.xinyingtong.cn/"];

const config = {
  baseURL: URL_OPTS[URL_IDX],
  timeout: 30 * 1000,
  isLoading: true,
  retry: 1,
  retryDelay: 1000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    Accept: "application/json"
  }
};

//dev与prod环境baseURL配置
if (process.env.NODE_ENV === "development") {
  //开发环境
  config.baseURL = "/api";
} else if (process.env.NODE_ENV === "production") {
  //生产环境
  config.baseURL = URL_OPTS[URL_IDX];
}

//token取消实例
const CancelToken = axios.CancelToken;
// let source = CancelToken.source();

//新建axios实例
const instance = axios.create(config);

/**
 * [description]请求拦截器
 * @param  {[type]} config){                 return   config;    }    [description]
 * @param  {[type]} function(error){                                                      return Promise.reject(error); } [description]
 * @return {[type]}                       [description]
 */
let interceptors = instance.interceptors.request.use(
  function(config) {
    
    // 在发送请求之前做些什么
    if (config.isLoading) {
      window.__GlobalVue.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: "加载中...",
        loadingType: "spinner"
      });
      
    }

    //请求头携带token
    config.headers['uToken']= Cache.getStorage("userToken");
    // config.cancelToken = source.token;
    config.cancelToken = new CancelToken(cancel => {
      //传入当前所有请求状态，由切换路由时处理
      if (window.__GlobalVue) {
        window.__GlobalVue.$store.commit("setCancelToken", cancel);
      }
    });

    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

/**
 * [description]响应拦截器
 * @param  {[type]} res)          {          return    res;}                 [description]
 * @param  {[type]} function(err) {          return    Promise.reject(err);} [description]
 * @return {[type]}               [description]
 */
instance.interceptors.response.use(
  function(res) {
    // 对响应数据做点什么
    if (res.config.isLoading) {
      window.__GlobalVue.$toast.clear();
    }
    return res;
  },
  function(error) {
    
    if (typeof error == "string") {
      error = {
        msg: error
      };
    }
    if (error && error.config && error.config.isLoading) {
      window.__GlobalVue.$toast.clear();
    }

    // 对响应错误做点什么
    switch (error && error.response && error.response.status) {
      case 400:
        error.msg = "请求错误";
        break;
      case 401:
        error.msg = "未授权，请登录";
        break;
      case 403:
        error.msg = "拒绝访问";
        break;
      case 404:
        error.msg = "未找到访问地址";
        break;
      case 408:
        error.msg = "请求超时";
        break;
      case 500:
        error.msg = "服务器内部错误";
        break;
      case 501:
        error.msg = "服务未实现";
        break;
      case 502:
        error.msg = "网关错误";
        break;
      case 503:
        error.msg = "服务不可用";
        break;
      case 504:
        error.msg = "网关超时";
        break;
      case 505:
        error.msg = "HTTP版本不受支持";
        break;
      default:
        error.msg = "未知错误";
        break;
    }
    return Promise.reject(error);
  }
);

/**
 *
 */

let http = {
  cmpName: "axios",

  isObject: obj => {
    Object.prototype.toString.apply(obj) == "[object Object]";
  },

  baseUrl: URL_OPTS[URL_IDX],

  axios: function(options) {
    if (options) return instance(options);
    else return instance;
  },

  //POST
  post(url, options) {
    let me = this;

    return new Promise((resolve, reject) => {
      let cfg = {
        method: "post",
        url: url,
        isLoading: true
      };

      cfg = Object.assign({}, cfg, options);

      instance(cfg)
        .then(rst => {
          let data = rst.data;

          me.handlerSuccess({
            data: data,
            resolve: resolve,
            reject: reject
          });
        })
        .catch(error => {
          
          window.__GlobalVue.$toast.fail(error.msg);
          reject(error);
        })
        .finally(() => {});
    });
  },

  //GET
  get(url, options) {
    let me = this;

    return new Promise((resolve, reject) => {
      let cfg = {
        method: "get",
        url: url,
        isLoading: true
      };

      cfg = Object.assign({}, cfg, options);

      instance(cfg)
        .then(rst => {
          let data = rst.data;

          me.handlerSuccess({
            data: data,
            resolve: resolve,
            reject: reject
          });
        })
        .catch(error => {
          window.__GlobalVue.$toast.fail(error.msg);
          reject(error);
        })
        .finally(() => {});
    });
  },

  //无需返回promise对象时使用
  axiosBackCall: function(options) {
    let me = this;
    // options = Object.assign({}, config, options);

    return instance(options)
      .then(res => {
        if (typeof options.onSuccess == "function") {
          options.onSuccess.call(null, res);
        }
      })
      .catch(err => {
        if (typeof options.onError == "function") {
          options.onError.call(null, err);
        }

        me.handlerError(err.response.data.code);
      })
      .finally(function() {
        if (typeof options.onCallBack == "function") {
          options.onCallBack.call(null, null);
        }
      });
  },

  handlerSuccess(rst) {
    let me = this,
      data = rst.data;
    if (typeof data == "string") {
      data = {
        msg: data
      };
    }
    !data["msg"] && (data["msg"] = "未知错误!");

    switch (data.code) {
      case 200:
        rst.resolve(data);
        break;
      case 401:
        me.handlerError(data.code);
        break;
      default:
        window.__GlobalVue.$toast.fail(data.msg);
        rst.reject(data);
        break;
    }
  },

  //请求返回状态码
  handlerError(code) {
    if (code == 401) {
      window.__GlobalVue.$dialog
        .alert({
          title: "提示",
          message: "未授权或登录过期,请重新登录!"
        })
        .then(res => {
          //跳转登录页
          // Cache.setStorage("lastFullPath", window.__GlobalVue.$route.fullPath);
          // window.__GlobalVue.$router.replace("/user/auth");
          //清除token缓存，刷新页面，统一由路由处理回跳页
          Cache.rmStorage("userToken");
          window.location.reload();
        });
    }
  },

  setInterceptors() {},
  /**
   * [cancelInterceptors description]移除拦截器
   * @return {[type]} [description]
   */
  cancelInterceptors() {
    instance.interceptors.request.eject(interceptors);
  }
};

export default { http };

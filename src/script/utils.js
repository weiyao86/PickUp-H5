import Vue from "vue";
import CommonHttp from "./commonHttp";
import Methods from "./methods";
import Cache from "./localStorage";
import Config from "./config";
import VantCmp from "./vantCmp";
import "./awesome";
import Icon from "vue-awesome/components/Icon";
import Directive from "./directive";
import NavBar from "@components/NavBar";
import MescrollVue from "mescroll.js/mescroll.vue";

export default {
  install(vue, options) {
    let serverImgUrl = "http://tihuoapi.xinyingtong.cn/uploads";
    //ui 按需加载
    vue.use(VantCmp);

    //定义全局方法/变量
    // Vue.myGlobalMethod=(){}

    //定义全局指令
    let dirt = Object.keys(Directive);
    dirt.forEach((key, val, obj) => {
      vue.directive(key, Directive[key]());
    });
  
    //全局组件 Awesome
    vue.component("v-icon", Icon);

    //定义全局过滤器
    vue.filter("httpImage", Methods["utils"]["httpImage"]);
    vue.filter("dateFormat", Methods["utils"]["dateFormat"]);
    vue.filter("decimalKeep", Methods["utils"]["decimalKeep"]);

    //注入组件选项
    vue.mixin({
      data() {
        return {
          transitionName: "slide-fade", //"slide-fade-left" //"slide-left"
          //上拉下拉分页公共对象
          mescroll: null,
          mescrollDown: {},
          mescrollUp: {
            callback: this.upCallback,
            page: {
              num: 0,
              size: 10
            },
            loadFull: {
              use: true,
              delay: 500
            },
            empty: {
              warpId: "empty_list",
              icon: "images/mescroll-no-result.png",
              tip: "暂无相关数据"
            }
          },
          pageNum: 1,
          limit: 10
        };
      },

      components: {
        NavBar,
        MescrollVue
      },

      watch: {
        //TODO:页面过渡
        $route(to, from) {
          let me = this;

          // if (to.meta.keepAlive) {
          //   if (to.meta.index > from.meta.index) {
          //     me.transitionName = "slide-fade-right";
          //   } else {
          //     me.transitionName = "slide-fade-left";
          //   }
          // }
        }
      },
      //处理mescroll插件恢复到原有滚动位置
      beforeRouteEnter(to, from, next) {
        next(vm => {
          vm.$refs.mescroll && vm.$refs.mescroll.beforeRouteEnter();
        });
      },
      // 离开路由时,记录列表状态
      beforeRouteLeave(to, from, next) {
        let me = this;

        me.$refs.mescroll && me.$refs.mescroll.beforeRouteLeave();

        next();
      }
    });

    //添加实例方法
    //Vue.prototype.$myMethod=()=>{}
    let props = {};
    let commonCfg = Object.assign(
      {
        emptyImg: "images/mescroll-no-result.png"
      },
      Config,
      Methods,
      Cache,
      CommonHttp
    );

    let cfg = Object.keys(commonCfg);
    cfg.forEach((key, val, obj) => {
      props["$" + key] = {
        get() {
          return commonCfg[key];
        }
      };
    });

    Object.defineProperties(Vue.prototype, props);
  }
};

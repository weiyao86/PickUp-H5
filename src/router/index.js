import Vue from "vue";
import VueRouter from "vue-router";
import Cache from "../script/localStorage";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

Vue.use(VueRouter);

const whiteList = [];

const routes = [
  {
    path: "/",
    redirect: "/pickUp"
  },
  {
    path: "/pickUp",
    name: "PickUp",
    redirect: "/pickUp/detail",
    component: () => import("@views/pickUp/Main"),
    children: [
      {
        path: "auth",
        name: "Auth",
        component: () => import("@views/pickUp/Auth"),
        meta: {
          title: "授权",
          index: 60
        }
      },
      {
        path: "detail",
        name: "Detail",
        component: () => import("@views/pickUp/Detail"),
        meta: {
          title: "职工自选提货单",
          isNavBar: true,
          index: 61
        }
      },
      {
        path: "addGoods",
        name: "AddGoods",
        component: () => import("@views/pickUp/AddGoods"),
        meta: {
          title: "添加商品",
          index: 62
        }
      },
      {
        path: "confirmAddress",
        name: "ConfirmAddress",
        component: () => import("@views/pickUp/ConfirmAddress"),
        meta: {
          title: "确认地址",
          index: 63
        }
      },
      {
        path: "cardList",
        name: "CardList",
        component: () => import("@views/pickUp/CardList"),
        meta: {
          title: "我的提货单",
          index: 64
        }
      },
      {
        path: "logistics",
        name: "Logistics",
        component: () => import("@views/pickUp/Logistics"),
        meta: {
          title: "物流",
          index: 65
        }
      },
      {
        path: "cardDetail",
        name: "CardDetail",
        component: () => import("@views/pickUp/CardDetail"),
        meta: {
          title: "提货单详情",
          index: 66
        }
      },
      {
        path: "cardExpire",
        name: "CardExpire",
        component: () => import("@views/pickUp/CardExpire"),
        meta: {
          title: "卡已过期",
          index: 67
        }
      },
      {
        path: "cardUseLess",
        name: "CardUseLess",
        component: () => import("@views/pickUp/CardUseLess"),
        meta: {
          title: "卡不可用",
          index: 68
        }
      },
      {
        path: "qrError",
        name: "QrError",
        component: () => import("@views/pickUp/QrError"),
        meta: {
          title: "二维码错误",
          index: 69
        }
      }
    ]
  },
  {
    path: "*",
    name: "404",
    component: () => import("@views/404")
  }
];

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push;
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const router = new VueRouter({
  routes
});

//
let lastPathListForPickUp = ["/pickUp/auth", "/open.weixin.qq.com"];
//1验证登录.2设置进度条.3中断上个页面未加载完成请求.4记录当前页地址
router.beforeEach((to, from, next) => {
  NProgress.start();
  /*离开keepAlive组件可单独处理 */
  if (window.__GlobalVue) {
    window.__GlobalVue.$store.commit("removeCancelToken");
  }

  
  //提货卡系统无需登录，仅微信授权
  if (Cache.getStorage("wechatAuth")) {
    next();
  } else {
    if (to.path == lastPathListForPickUp[0]) {
      next();
    } else {
      let lastPath = to.fullPath;

      let hasPath =
        lastPath == lastPathListForPickUp[0] ||
        lastPath.indexOf(lastPathListForPickUp[1]) > -1;
      //如果是登录或wechat则不记录
      if (!hasPath) {
        console.log(lastPath);
        Cache.setStorage("lastPathListForPickUp", lastPath);
      }

      next({ path: lastPathListForPickUp[0] });
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;

import {
  Search,
  Icon,
  Cell,
  CellGroup,
  IndexBar,
  IndexAnchor,
  NavBar,
  Button,
  Tab,
  Tabs,
  Tabbar,
  TabbarItem,
  Toast,
  Empty,
  Swipe,
  SwipeItem,
  Lazyload,
  Field,
  Form,
  Dialog,
  Switch,
  Popup,
  Tag,
  List,
  Divider,
  Stepper,
  Checkbox,
  SubmitBar,
  SwipeCell,
  Steps,
  Step,
  Uploader,
  Collapse,
  CollapseItem 
} from "vant";

// //vant ui cmp
export default {
  install(vue, options) {
    const vantCmp = [
      Search,
      Icon,
      Cell,
      CellGroup,
      IndexBar,
      IndexAnchor,
      NavBar,
      Button,
      Tab,
      Tabs,
      Tabbar,
      TabbarItem,
      Toast,
      Empty,
      Swipe,
      SwipeItem,
      Field,
      Form,
      Dialog,
      Switch,
      Popup,
      Tag,
      List,
      Divider,
      Stepper,
      Checkbox,
      SubmitBar,
      SwipeCell,
      Steps,
      Step,
      Uploader,
      Collapse,
      CollapseItem 
    ];

    Toast.setDefaultOptions({ duration: 2000,forbidClick:true });

    //重置失败icon
    let fail = Toast.fail;
    Toast.fail = opts => {
      if (typeof opts == "string") {
        fail({
          icon: "warning-o",
          message: opts
        });
      } else {
        fail(opts);
      }
    };
    vantCmp.forEach(function(item) {
      vue.use(item);
    });

    vue.use(Lazyload, {
      loading: require("@/assets/images/loading-lazy.png"),
      error: require("@/assets/images/empty.png"),
      adapter: {
        loaded({
          bindType,
          el,
          naturalHeight,
          naturalWidth,
          $parent,
          src,
          loading,
          error,
          Init
        }) {
          // do something here
          // example for call LoadedHandler
          // LoadedHandler(el)
        },
        loading(listender, Init) {
          // console.log('loading')
        },
        error(listender, Init) {
          // console.log('error')
        }
      }
    });
  }
};

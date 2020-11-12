import Methods from "./methods";

let directives = {
  iosFixScroll() {
    if (Methods.utils.isIOS()) {
      return {
        bind: function() {},
        inserted: function(el, binding) {
          let startY = 0;
          let prevent = e =>
            e.cancelable && !e.defaultPrevented && e.preventDefault();

          el.addEventListener(
            "touchstart",
            function(evt) {
              startY = evt.changedTouches[0].pageY;
            },
            {
              passive: false
            }
          );

          el.addEventListener(
            "touchmove",
            function(evt) {
              let moveY = evt.changedTouches[0].pageY,
                top = el.scrollTop,
                ch = el.clientHeight,
                sh = el.scrollHeight;

              if (top === 0 && moveY > startY) {
                prevent(evt);
                el.scrollTop = 1;
              }
              if (top + ch === sh && moveY < startY) {
                prevent(evt);
                el.scrollTop -= 1;
              }
            },
            {
              passive: false
            }
          );

          el.classList.add("fix-ios-scroll");
        },
        update: function() {},
        componentUpdated: function() {},
        unbind: function() {}
      };
    }

    return () => {};
  },

  safeAreaInsetBottom() {
    return function(el, bind, vnode, oldVnode) {
      el.classList.add("custom-safe-area-inset-bottom");
    };
  }
};

export default directives;

//在微信且IOS中注册此事件，作用于带滚动区域不拖拽整个webview
// if (me.$utils.isIOS() && me.$utils.isWechat()) {
//   body.addEventListener(
//     "touchstart",
//     (e) => {
//       me.switchTouch("touchstart", e);
//     },
//     { passive: false }
//   );
//   body.addEventListener(
//     "touchmove",
//     (e) => {
//       me.switchTouch("touchmove", e);
//     },
//     { passive: false }
//   );
// }
// switchTouch(name, evt) {
//   let me = this,
//     contentWrap = document.querySelector(".content-wrap");

//   switch (name) {
//     case "touchstart":
//       me.startY = evt.changedTouches[0].pageY;
//       break;
//     case "touchmove":
//       var moveY = evt.changedTouches[0].pageY;
//       var top = contentWrap.scrollTop;
//       var ch = contentWrap.clientHeight;
//       var sh = contentWrap.scrollHeight;
//       if (!me.includeTarget(evt.target, contentWrap)) {
//         me.$toast("body")
//         evt.preventDefault();
//       } else if ((top === 0 && moveY > me.startY) || (top + ch === sh && moveY < me.startY)) {
//         me.$toast("hasbody")
//         evt.preventDefault();
//       }
//       break;
//     default:
//       break;
//   }
// },

// includeTarget(child, parent) {
//   let me = this,
//     node = child;

//   if (child && parent) {
//     while (node) {
//       if (parent == node) {
//         return true;
//       }
//       node = node.parentNode;
//     }
//   }
//   return false;
// },

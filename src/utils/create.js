import Vue from "vue"
export default function (Component, props) {
  const instance = new Vue({
    render (h) {
      return h(Component, { props });
    }
  }).$mount();
  //将生成的dom元素追加到body上，因为$mount不能挂在body
  document.body.appendChild(instance.$el);
  //操作组件实例
  const comp = instance.$children[0];
  comp.remove = () => {
    //移除dom
    document.body.removeChild(instance.$el);
    //移除vue实例
    instance.$destroy;
  };
  return comp;
}
<template>
  <div id="app" @click="changeContextmenuOnOff" @contextmenu="preventDefault">
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["contextmenuOnOff", "eleLi"]),
  },
  mounted() {
    //点击浏览器滚动条或者更改窗口大小时，隐藏自定义右键菜单
    window.addEventListener("resize", this.changeContextmenuOnOff);
    window.addEventListener("scroll", this.changeContextmenuOnOff);
  },
  methods: {
    changeContextmenuOnOff(e) {
      e.stopPropagation();
      e.preventDefault();
      if (this.contextmenuOnOff) {
        this.$store.commit("changeContextmenuOnOff", {
          bool: false,
          left: 0,
          top: 0,
        });
      }
    },
    preventDefault(e) {
      e.preventDefault();
    },
  },
};
</script>
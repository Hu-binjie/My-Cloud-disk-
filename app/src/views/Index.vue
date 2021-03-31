/**主页 */
<template>
  <div>
    <main id="page">
    <!-- 顶部菜单-->
      <Header></Header>
      <!--内容区-->
      <Content></Content>
    </main>
    <!--右键菜单-->
    <Contextmenu></Contextmenu>
    <!--成功提示弹窗-->
    <div
      :class="{
        alert: true,
        'alert-success': true,
        'alert-show': succAlertOnoff,
      }"
    >
      {{ succPromptText }}
    </div>
    <!--失败警告提示弹窗-->
    <div
      :class="{
        alert: true,
        'alert-warning': true,
        'alert-show': faiAlertOnoff,
      }"
    >
      {{ faiPromptText }}
    </div>
    <!--遮罩层-->
    <div id="mask" :style="{ display: maskBool }"></div>
    <!--移动弹窗-->
    <Movealert></Movealert>
    <!--操作确认弹窗-->
    <Confirm></Confirm>
  </div>
</template>

<script>
import Confirm from "../components/Confirm";
import Movealert from "../components/Movealert";
import Content from "../components/Content";
import Contextmenu from "../components/Contextmenu";
import Header from "../components/Header";
import { mapState } from "vuex";
export default {
  components: {
    Header,
    Content,
    Contextmenu,
    Movealert,
    Confirm,
  },
  computed: {
    ...mapState([
      "contextmenuOnOff",
      "succPromptText",
      "succAlertOnoff",
      "faiPromptText",
      "faiAlertOnoff",
      "maskBool",
    ]),
  },
  data() {
    return {};
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
</style>
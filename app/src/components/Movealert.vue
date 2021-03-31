<template>
  <div :class="{ 'move-alert': true, 'move-alert-show': moveAlertShow }">
    <h2 class="move-alert-title">选择存储位置</h2>
    <a class="clos iconfont icon-guanbi" @click="clos"></a>
    <div class="move-alert-menu tree-menu">
      <ul @click="updateNowId">
        <Movecontent
          v-if="moveType == 1"
          :allParent="data"
          :newData="topData"
          :newId="topId"
          :i="leve"
          :nowId="alertId"
          :contextmenuId="contextmenuId"
        ></Movecontent>
        <Movecontent2
          v-if="moveType == 2"
          :allParent="data"
          :newData="topData"
          :newId="topId"
          :i="leve"
          :nowId="alertId"
          :contextmenuId="contextmenuId"
        ></Movecontent2>
      </ul>
    </div>
    <nav class="confirm-btns">
      <a @click="moveSure">确定</a>
      <a @click="clos">取消</a>
    </nav>
  </div>
</template>

<script>
import Movecontent from "./Movecontent.vue";
import Movecontent2 from "./Movecontent2.vue";
import { mapState, mapGetters } from "vuex";
export default {
  components: {
    Movecontent,
    Movecontent2,
  },
  computed: {
    ...mapState([
      "moveAlertShow",
      "data",
      "topId",
      "leve",
      "alertId",
      "contextmenuId",
      "moveType",
    ]),
    ...mapGetters(["getSelfAlert", "topData", "getAllParent"]),
  },
  methods: {
    clos() {
      this.$store.commit("changeMoveAlertShow", {
        bool: false,
      });
      this.$store.commit("changeMaskBool", {
        display: "none",
      });
      this.$store.commit("removeCheckChild");
    },
    updateNowId(e) {
      this.$store.commit("changeAlertId", {
        id: e.target.dataset.id ? e.target.dataset.id : this.alertId,
      });
    },
    moveSure() {
      if (this.alertId != this.contextmenuId) {
        this.$store.commit("moveSure", {
          id: this.alertId,
          type: this.moveType,
        });
        this.$store.commit("changeMoveAlertShow", {
          bool: false,
        });
        this.$store.commit("changeSuccAlertOnoff", {
          info: "移动成功",
          bool: true,
        });
        this.$store.dispatch("changeSuccAlertOnoffAsync", {
          bool: false,
        });
        this.$parent.$children[1].updateAllParent();
         
        this.$store.commit("changeMaskBool", {
          display: "none",
        });
        this.$store.commit("removeCheckChild");
      } else {
        this.$store.commit("changeFaiAlertOnoff", {
          info: "请选择目标文件夹",
          bool: true,
        });
        this.$store.dispatch("changeFaiAlertOnoffAsync", {
          bool: false,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
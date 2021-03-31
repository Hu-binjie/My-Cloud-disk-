<template>
  <div :class="{ confirm: true, 'confirm-show': confirm.confirmOnoff }">
    <a class="clos iconfont icon-guanbi" @click="closConfirm"></a>
    <p class="confirm-text iconfont icon-yiwen">{{ confirm.confirmText }}</p>
    <nav class="confirm-btns">
      <a @click="sure">确定</a>
      <a @click="closConfirm">取消</a>
    </nav>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["confirm"]),
  },
  methods: {
    closConfirm() {
      this.$store.commit("changeConfirm", {
        bool: false,
        info: "",
        type: "",
      });
      this.$store.commit("changeMaskBool", {
        boodisplayl: "none",
      });
      this.$store.commit("removeCheckChild");
    },
    sure() {
      if (this.confirm.confirmType == "删除") {
        this.$store.commit("contextmenuDelete");
      }
      if (this.confirm.confirmType == "删除选中") {
        this.$store.commit("delCheckChild", {});
        this.$store.commit("changeSuccAlertOnoff", {
          info: "删除成功",
          bool: true,
        });
      }
      this.$store.commit("changeConfirm", {
        bool: false,
        info: "",
        type: "",
      });
      this.$store.dispatch("changeSuccAlertOnoffAsync", {
        bool: false,
      });
      this.$store.commit("changeMaskBool", {
        boodisplayl: "none",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
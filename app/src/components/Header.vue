<template>
  <header id="header">
    <h1 id="logo">
      <img src="../assets/img/logo.png" />
    </h1>
    <nav class="top-nav">
      <a @click="createHandle" class="create-btn iconfont icon-xinjian"
        >新建文件夹</a
      >
      <a class="del-btn iconfont icon-lajitong" @click="delHandle">删除</a>
      <a class="move-btn iconfont icon-yidong" @click="moveHandle">移动到</a>
    </nav>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["allParent", "checkChild", "data", "contextmenuId", "nowId"]),
  },
  methods: {
    moveHandle() {
      if (this.checkChild.length == 0) {
        this.$store.commit("changeFaiAlertOnoff", {
          info: "请选择要操作的文件",
          bool: true,
        });
        this.$store.dispatch("changeFaiAlertOnoffAsync", {
          bool: false,
        });
      } else {
        this.$store.commit("changeContextmenuId", {
          id: this.nowId,
        });
        this.$store.commit("changeMoveAlertShow", {
          bool: true,
          type: 2,
        });
        this.$store.commit("changeMaskBool", {
          display: "block",
        });
      }
    },
    delHandle() {
      if (this.checkChild.length == 0) {
        this.$store.commit("changeFaiAlertOnoff", {
          info: "请选择要操作的文件",
          bool: true,
        });
        this.$store.dispatch("changeFaiAlertOnoffAsync", {
          bool: false,
        });
      } else {
        this.$store.commit("changeConfirm", {
          bool: true,
          info: "确定要删除选中的文件吗？",
          type: "删除选中",
        });
        this.$store.commit("changeMaskBool", {
          display: "block",
        });
      }
    },
    createHandle() {
      let title = this.$store.getters.getTitle;
      this.$store.commit("createHandle", {
        id: Date.now(),
        title: title,
      });
      this.$store.commit("changeSuccAlertOnoff", {
        info: "创建成功",
        bool: true,
      });
      this.$store.dispatch("changeSuccAlertOnoffAsync", {
        bool: false,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
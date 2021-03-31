<template>
  <ul
    id="contextmenu"
    :style="{
      display: contextmenuOnOff ? 'block' : 'none',
      left: contextmenuLeft + 'px',
      top: contextmenuTop + 'px',
    }"
  >
    <li class="iconfont icon-lajitong" @click="deleteHandle">删除</li>
    <li class="iconfont icon-yidong" @click="move">移动到</li>
    <li class="iconfont icon-zhongmingming" @click="changeDisplay">重命名</li>
  </ul>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Contextmenu",
  computed: {
    ...mapState(["contextmenuOnOff", "contextmenuTop", "contextmenuLeft","eleLi",]),
  },
  methods: {
      move(){
          this.$store.commit("changeMoveAlertShow",{
              bool:true,
              type:1
          })
          this.$store.commit("changeMaskBool",{
              display:'block',
          })
      },
    deleteHandle() {
        this.$store.commit("changeConfirm",{
            bool:true,
            info:"确定要删除该文件吗？",
            type:"删除"
        });
        this.$store.commit("changeMaskBool",{
            display:'block',
          })
    },
    changeDisplay(){
        this.eleLi.children[1].style.display="none";
        this.eleLi.children[2].style.display="block";
        this.eleLi.children[2].focus();
        this.eleLi.children[2].select();
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
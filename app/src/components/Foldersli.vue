<template>
  <li :data-id="item.id" :class="{'active':checkChild.includes(item)}">
    <img src="../assets/img/folder-b.png" alt="" :data-id="item.id" />
    <span class="folder-name" :data-id="item.id">{{ item.title }}</span>
    <input type="text" class="editor" :value="item.title" @blur="changeTitle" />
    <label class="checked">
      <input type="checkbox" :checked="checkChild.includes(item)"/>
      <span class="iconfont icon-checkbox-checked" @click="changeCheck"></span>
    </label>
  </li>
</template>

<script>
export default {
  props: [ "item","innerData", "activeId","eleLi","checkChild"],
  data() {
      return {
      }
  },
  computed: {
    getChild(){
        return this.$store.getters.getChild
    },
  },
  methods: {
      changeCheck(){
          this.$store.commit("changeCheckChild",{
              child:this.item,
              getChild:this.getChild
          })

      },
    changeTitle() {
      this.eleLi.children[2].style.display = "none";
      this.eleLi.children[1].style.display = "block";
      if (this.eleLi.children[2].value.trim()) {
        this.$store.commit("changeTitle", {
          newTitle: this.eleLi.children[2].value,
          id: this.eleLi.dataset.id,
        });
        this.$store.commit("changeSuccAlertOnoff", {
          bool: true,
          info:"重命名成功"
        });
        this.$store.dispatch("changeSuccAlertOnoffAsync", {
          bool: false,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
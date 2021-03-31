<template>
  <div id="breadmenu">
    <label class="checked-all checked">
      <input type="checkbox" id="checked-all" 
      :checked="allPicked"
      />
      <span class="iconfont icon-checkbox-checked" @click="changeAllPicked"></span>
    </label>
    <nav class="bread-nav">
      <span class="navA" v-if="allParent.length>1">
        <a
          v-for="item in allParent"
          :key="item.id"
          v-show="item.id != textData.id"
          :data-id="item.id"
          :style="{ width: newWidth + 'px' }"
          >{{ item.title }}</a
        >
      </span>

      <span class="now">{{ textData.title }}</span>
    </nav>
  </div>
</template>

<script>
import {mapState,mapGetters} from "vuex";
export default {
  props: ["allParent", "textData"],
  data() {
    return {
      length: 1,
      width: 64,
    };
  },
  computed: {
      ...mapState(["allPicked","nowId"]),
      ...mapGetters(["getChild"]),
    newWidth() {
      let l;
      if (this.length >= 8) {
        l = 630 / this.length;
      } else {
        l = this.width;
      }
      return l;
    },
  },
  methods: {
      changeAllPicked() {
          this.$store.commit('changeAllPicked',{
              checkChild:this.getChild,
              null:[]
          })
      }
  },
  //:style="{width:length+'px'}"
  updated() {
    this.length = this.$el.querySelectorAll("a").length;
    console.log(this.allPicked);
  },
};
</script>

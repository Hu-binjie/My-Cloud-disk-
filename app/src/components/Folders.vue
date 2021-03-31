<template>
  <ul
    id="folders"
    :class="{ 'folders-empty': innerData.length == 0 }"
    @contextmenu="contextmenuHandle"
  >
  <foldersli 
  v-for="item in innerData"
      :key="item.id"
      :class="{ 'folder-item': true, }"
      :item="item"
      :innerData="innerData"
      :activeId="activeId"
      :eleLi="eleLi"
      :allPicked="allPicked"
      :checkChild="checkChild"
  ></foldersli>
  </ul>
</template>

<script>
import Foldersli from "./Foldersli"
import { mapState } from "vuex";
export default {
  props: ["innerData", "activeId"],
  components: {
      Foldersli,
  },
  data() {
      return {
      }
  },
  computed: {
    ...mapState(["eleLi","allPicked","checkChild"]),
   
  },
  methods: {
    contextmenuHandle(e) {
        if(this.checkChild.length>0){
            this.$store.commit("removeCheckChild")
        }else{
            if (e.target.tagName == "LI" || e.target.parentNode.tagName == "LI") {
        let l = e.clientX;
        let t = e.clientY;
        let maxT = document.documentElement.clientHeight - 98;
        let maxL = document.documentElement.clientWidth - 98;
        l = Math.min(l, maxL);
        t = Math.min(t, maxT);
        this.$store.commit("changeContextmenuOnOff", {
          bool: true,
          left: l,
          top: t,
        });
        this.$store.commit("changeContextmenuId", {
          id: e.target.dataset.id,
        });
        this.$store.commit("changeEle", {
          eleLi: e.target.tagName == "LI" ? e.target : e.target.parentNode,
        });
      }
        }
      
      e.preventDefault();
    },
    
  },
};
</script>


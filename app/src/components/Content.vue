<template>
  <div id="content">
    <!-- 侧边栏导航 -->
    <aside id="tree-menu" class="tree-menu">
      <ul @click="updateNowId">
        <Tree
          :allParent="allParent"
          :newData="topData"
          :newId="topId"
          :i="leve"
          :nowId="nowId"
        ></Tree>
      </ul>
    </aside>
    <!-- 右侧内容 -->
    <article id="folder-content" @click="updateNowId">
      <!-- 路径导航 -->
      <breadmenu
        :allParent="allParent"
        :textData="getSelf"
        :nowId="nowId"
      ></breadmenu>
      <!-- 文件夹区域 -->
      <Folders :innerData="getChild" :activeId="nowId"></Folders>
    </article>
  </div>
</template>
<script>
import Tree from "./Tree.vue";
import Folders from "./Folders.vue";
import Breadmenu from "./Breadmenu.vue";

import { mapState, mapGetters } from "vuex";

export default {
  name: "Content",
  components: { Tree, Folders, Breadmenu },
  data() {
    return {
      allParent: [this.$store.getters.getSelf],
    };
  },

  computed: {
    ...mapState(["data", "topId", "leve", "nowId","checkChild"]),
    ...mapGetters(["getSelf", "topData", "getChild", "getAllParent"]),
  },
  methods: {
    //点击视图，更新nowId
    updateNowId(e) {
      this.$store.commit("changeNowId", {
        id: e.target.dataset.id ? e.target.dataset.id : this.nowId,
      });
      //获取点击元素对应的上层数据
      //每次都要先清空
      this.allParent = this.getAllParent
      if(![...e.target.classList].includes('iconfont')){
          this.$store.commit("removeCheckChild");
      }
    },
    updateAllParent() {
      this.allParent = this.getAllParent;
    },
  },
};
</script>


<template>
  <li :class="{'open':[...allParent].includes(newData)}" :data-id="newData.id">
    <p :class="{ 'has-child': nowChild.length,'active': newData.id==nowId }"
        :style="{paddingLeft:(i*20)+'px'}"
        :data-id="newData.id"
    >
      <span :data-id="newData.id">{{ newData.title }}</span>
      
    </p>
    <ul v-if="nowChild">
      <li class="open" v-for="item in nowChild" :key="item.id">
        <Tree :newData="item" :newId="item.id" :allParent="allParent" :i="i+1" :nowId="nowId"></Tree>
      </li>
    </ul>
  </li>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Tree",
  props: ["newData", "newId","i","nowId","allParent"],
  
  
  computed: {
      ...mapState(['data']),
    nowChild() {
      var child = [];
      for (var i = 0; i < this.data.length; i++) {
        if (this.data[i].pid == this.newId) {
          child.push(this.data[i]);
        }
      }
      return child;
    },
  },
    

};
</script>

<template>
  <li class="open" :data-id="newData.id">
    <p
      :class="{ 'has-child': nowChild.length, active: newData.id == nowId }"
      :style="{ paddingLeft: i * 20 + 'px' }"
      :data-id="newData.id"
    >
      <span :data-id="newData.id">{{ newData.title }}</span>
    </p>
    <ul v-if="newData.id != contextmenuId">
      <li class="open" v-for="item in nowChild" :key="item.id">
        <Movecontent
          :newData="item"
          :newId="item.id"
          :allParent="allParent"
          :i="i + 1"
          :nowId="nowId"
          v-if="item.id != contextmenuId || !checkChild.includes(item)"
          :contextmenuId="contextmenuId"
        ></Movecontent>
      </li>
    </ul>
  </li>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Movecontent",
  props: ["newData", "newId", "i", "nowId", "allParent", "contextmenuId"],
  computed: {
    ...mapState(["data", "checkChild"]),
    indexNowId() {
      return this.$store.state.nowId;
    },
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

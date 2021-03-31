<template>
  <li class="open" :data-id="newData.id" v-if="!checkChild.includes(newData)">
    <p
      :class="{ 'has-child': nowChild.length, active: newData.id == nowId }"
      :style="{ paddingLeft: i * 20 + 'px' }"
      :data-id="newData.id"
    >
      <span :data-id="newData.id">{{ newData.title }}</span>
    </p>
    <ul v-if="!checkChild.includes(newData)">
      <li class="open" v-for="item in nowChild" :key="item.id">
        <Movecontent2
          :newData="item"
          :newId="item.id"
          :allParent="allParent"
          :i="i + 1"
          :nowId="nowId"
          v-if="item.id != contextmenuId || !checkChild.includes(item)"
          :contextmenuId="contextmenuId"
        ></Movecontent2>
      </li>
    </ul>
  </li>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Movecontent2",
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

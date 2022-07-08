<template>
  <div class="cnt">
    <page-header></page-header>
    <a href="/a">回到首页</a>
    <button @click="onClickOpen">回到首页</button>
    <page-footer></page-footer>
  </div>
</template>

<script>
import { onMounted, onUnmounted } from 'vue';
import PageHeader from '../components/PageHeader.vue';
import PageFooter from '../components/PageFooter.vue';

export default {
  components: {
    PageHeader,
    PageFooter,
  },
  setup() {
    const onClickOpen = () => {
      window.open('/a');
    };

    onMounted(() => {
      console.log('page2 mounted');
    });

    onUnmounted(() => {
      console.log('page2 unmounted');
    });

    return {
      onClickOpen,
    };
  },
};
</script>

<style>
.cnt {
  margin-top: 20px;
}
a,
button {
  display: block;
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 20px;
  border: 1px solid #ddd;
}
</style>

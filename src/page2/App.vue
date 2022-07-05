<template>
  <div class="cnt">
    <Header></Header>
    <a href="/a">回到首页</a>
    <button @click="onClickOpen">回到首页</button>
    <Footer></Footer>
  </div>
</template>

<script>
  import { onMounted, onUnmounted } from 'vue';
  import Header from '../components/Header.vue';
  import Footer from '../components/Footer.vue';

  export default {
    components: {
      Header,
      Footer,
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

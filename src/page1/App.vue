<template>
  <div class="cnt">
    <page-header></page-header>
    <a href="/b">a标签当前页跳转</a>
    <a href="/b" target="_blank">a标签新开页面跳转</a>
    <button @click="onClickJump">修改location.href当前页跳转</button>
    <canvas
      ref="canvasRef"
      type="2d"
      width="300"
      height="200"
      @touchstart="log('normal', $event)"
      @canvastouchstart="log('canvas', $event)"
    ></canvas>
    <page-footer></page-footer>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import PageHeader from '../components/PageHeader.vue';
import PageFooter from '../components/PageFooter.vue';

export default {
  components: {
    PageHeader,
    PageFooter,
  },
  setup() {
    const canvasRef = ref(null);

    const onClickJump = () => {
      window.location.href = '/b';
    };

    const log = async (...args) => {
      console.log(...args);
    };

    onMounted(() => {
      console.log('page1 mounted');

      // 不要问为什么不用 $$prepare，vue3 把所有挂在 dom 上的东西都加了一层 proxy，导致基于 this 的 weakmap 全都没法用
      const canvas = canvasRef.value;
      canvas
        .$$getNodesRef()
        .then((nodesRef) =>
          nodesRef
            .node((res) => {
              const { width, height } = canvas;
              const node = res.node;

              // 设置 canvas 宽高
              node.width = width;
              node.height = height;

              const context = node.getContext('2d');

              context.strokeStyle = '#00ff00';
              context.lineWidth = 5;
              context.rect(0, 0, 200, 200);
              context.stroke();
              context.strokeStyle = '#ff0000';
              context.lineWidth = 2;
              context.moveTo(160, 100);
              context.arc(100, 100, 60, 0, 2 * Math.PI, true);
              context.moveTo(140, 100);
              context.arc(100, 100, 40, 0, Math.PI, false);
              context.moveTo(85, 80);
              context.arc(80, 80, 5, 0, 2 * Math.PI, true);
              context.moveTo(125, 80);
              context.arc(120, 80, 5, 0, 2 * Math.PI, true);
              context.stroke();
            })
            .exec(),
        )
        .catch(console.error);
    });

    onUnmounted(() => {
      console.log('page1 unmounted');
    });

    return {
      canvasRef,
      onClickJump,
      log,
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

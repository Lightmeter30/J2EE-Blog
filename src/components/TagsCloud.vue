<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue';
import * as echarts from "echarts";
import 'echarts-wordcloud';
import { emit } from 'process';
import { getHotTagsAPI } from '@/request/api';
const wordcloudRef = ref()
const emits = defineEmits(['tagClick']);

async function getHotTags() {
  const res = await getHotTagsAPI(); 
  if(res.data.status === 0) {
    // TODO:
    console.log(res.data.data);
    initWordCloud(res.data.data);
  } else {
    console.log(res.data);
  }
}
onMounted(() => {
  getHotTags();
})
// 初始化词云
const initWordCloud = (data: any, max = 42) => {
  var myChart = echarts.init(wordcloudRef.value);
  const option = {
    title: {
      text: '关键词',
      show: false
    },
    tooltip: {},
    series: [{
      type: 'wordCloud',
      shape: 'circle',
      left: 'center',
      top: 'center',
      width: '100%',
      height: '100%',
      right: null,
      bottom: null,
      sizeRange: [14, max],
      rotationRange: [-45, 45],
      rotationStep: 15, // 0 15 30 45 度倾斜
      gridSize: 8,
      drawOutOfBound: false,
        // 这是全局的文字样式，相对应的还可以对每个词设置字体样式
        textStyle: {
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
          // 颜色可以用一个函数来返回字符串
          color: function () {
            const colorList: string[] = [
              "#39c5bb",
              "#C70002",
              "#6FA802",
              "#CFD0CF",
              "#D30325",
              "#D0990C",
              "#0F375B",
              "#F5B6A4",
              "#184995",
              "#E290BD",
              "4D739A"
            ]
            // Random color
            // return 'rgb(' + [
            //   Math.round(Math.random() * 160),
            //   Math.round(Math.random() * 160),
            //   Math.round(Math.random() * 160)
            // ].join(',') + ')';
            const x = Math.round(Math.random() * 9 + 1);
            return colorList[x === 11 ? 10 : x ];
          },
          emphasis: {
            shadowBlur: 2,
            shadowColor: '#333'
          }
        },
        // Data is an array. Each array item must have name and value property.
        data: data
      }]
  }
  option && myChart.setOption(option);
  window.addEventListener("resize", () => {
    if (myChart) {
      myChart.resize();
    }
  });
  myChart.on('click', (param: any) => {
    emits('tagClick', param.data.id);
  })
}
</script>

<template>
  <div ref="wordcloudRef" class="wordcloud"></div>
</template>

<style lang="scss" scoped>
.wordcloud {
  width: 250px;
  height: 250px;
}
</style>

<template>
  <div class="main_container">
    <div class="title_container">
      <span class="title">Horizon用户数据一览</span>
    </div>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView } from "vue-router";

</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  color: #333;
  min-height: 100vh;
}
</style>
<style lang="less" scoped>
.main_container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
}

.title_container {}

.title {
  font-size: 30px;
  font-weight: bolder;
  -webkit-text-fill-color: transparent;
  background-image: -webkit-linear-gradient(left, #93b5cf, #57c3c2 25%, #f8df70 50%, #ea517f 75%, #93b5cf);
  background-size: 200%, 100%;
  -webkit-background-clip: text;
  -webkit-animation: word 12s linear infinite;
}

@keyframes word {
  0% {
    background-position: 0 0
  }

  25% {
    background-position: -100% 0
  }

  50% {
    background-position: 0 0
  }

  75% {
    background-position: 100% 0
  }

  100% {
    background-position: 0 0
  }
}
</style>

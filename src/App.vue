<template>
  <div class="main_container">
    <div class="title_container">
      <span class="title">Horizon用户数据一览</span>
      <el-menu :default-active="route.name" mode="horizontal" background-color="transparent" class="main_menu" :ellipsis="false">
        <el-menu-item index="练度观察">练度观察</el-menu-item>
        <el-menu-item index="推图进度" disabled>推图进度</el-menu-item>
      </el-menu>
    </div>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";

const router = useRouter()
const route = useRoute()

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

.title_container {
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 30px;
  font-weight: bolder;
  -webkit-text-fill-color: transparent;
  background-image: -webkit-linear-gradient(left, #93b5cf, #57c3c2 25%, #f8df70 50%, #ea517f 75%, #93b5cf);
  background-size: 200%, 100%;
  -webkit-background-clip: text;
  -webkit-animation: word 12s linear infinite;
}

.main_menu {
  &:deep(.el-menu-item) {
    font-size: 16px !important;
    font-weight: bolder;
    color: rgba(0, 0, 0, 0.4);
    &:hover{
      color: #fff;
      background-color: #b0d5df;
    }
    &:focus{
      background-color: unset;
    }
  }
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

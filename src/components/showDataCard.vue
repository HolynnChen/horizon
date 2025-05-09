<template>
  <div class="cardDataContainer" v-if="props.data">
    <div class="block">
      <div>等级</div>
      <div>{{ props.data.等级 }}</div>
    </div>
    <div class="block">
      <div>优越</div>
      <div :class="{ good: props.data.优越 > 80 }">{{ props.data.优越 }}</div>
    </div>
    <div class="block">
      <div>技能1</div>
      <div>{{ props.data.技能1等级 }}</div>
    </div>
    <div class="block">
      <div>突破数</div>
      <div>{{ props.data.突破数 }}</div>
    </div>
    <div class="block">
      <div>攻击</div>
      <div :class="{ good: props.data.攻击 > 40 }">{{ props.data.攻击 }}</div>
    </div>
    <div class="block">
      <div>技能2</div>
      <div>{{ props.data.技能2等级 }}</div>
    </div>
    <div class="block">
      <div>收藏品</div>
      <div>{{ props.data.收藏品阶段 < 0 ? '未持有' : `${translate1(props.data.收藏品阶段)}-${props.data.收藏品等级}` }}</div>
      </div>
      <div class="block">
        <div>优越</div>
        <div>{{ props.data.优越 }}</div>
      </div>
      <div class="block">
        <div>优越</div>
        <div>{{ props.data.优越 }}</div>
      </div>
    </div>
    <div class="empty" v-else>
      <span>未持有</span>
    </div>
</template>

<script lang="ts" setup>

type NikkeData = {
  优越: number,
  攻击: number,
  装弹: number,
  等级: number,
  技能1等级: number,
  技能2等级: number,
  爆裂技能等级: number,
  突破数: number,
  收藏品等级: number,
  收藏品阶段: number
}

const props = defineProps<{
  data: NikkeData | null
}>()

const translate1 = (num: number) => {
  switch (num) {
    case 0:
      return 'R'
    case 1:
      return 'SR'
    case 2:
      return '珍藏'
  }
  return '未知'
}

</script>
<style lang="less" scoped>
.cardDataContainer {
  width: 330px;
  display: grid;
  grid-template-columns: repeat(3, 110px);
  transition: all 0.3s;

  &:hover {
    background-color: rgba(81, 196, 211, 0.15);
  }

  .block {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    border: 0.5px solid rgba(0, 0, 0, 0.1);

    &>:nth-child(1) {
      width: 53px;
      background-color: #f7e8aa;
      padding: 0 5px;
    }

    &>:nth-child(2) {
      display: flex;
      justify-content: flex-end;
      width: calc(100% - 53px);
      padding-right: 5px;
    }
  }
}

.good {
  background-color: #20a162;
  color: #fff;
}

.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
}
</style>
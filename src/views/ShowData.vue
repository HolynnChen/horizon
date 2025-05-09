<template>
    <div class="container" v-loading="loading">
        <div class="searchBar">
            <el-select v-model="searchNikke" placeholder="请选择想查看的妮姬" multiple filterable clearable
                style="max-width: 200px;">
                <el-option v-for="item in selectedAbledNikke" :key="item" :label="item" :value="item" />
            </el-select>
            <el-select v-model="searchUser" placeholder="请选择想查看的玩家" multiple filterable clearable
                style="max-width: 200px;">
                <el-option v-for="item in selectedAbledPlayer" :key="item" :label="item" :value="item" />
            </el-select>
        </div>
        <div class="dataContainer" style="margin-top: 20px;width: 100%;">
            <el-table :data="Object.entries(showData.data).map(([k, v]) => ({ username: k, nikkes: v }))" height="calc(100vh - 150px)">
                <el-table-column fixed>
                    <template #header>
                        <span class="baseHeader">{{ (new Date(showData.update_time)).toLocaleDateString() }}</span>
                    </template>
                    <el-table-column prop="username" width="120px">
                        <template #header>
                            <span class="baseHeader">用户名</span>
                        </template>
                        <template #default="{ row }">
                            <span style="display:flex;justify-content: center;">{{ row.username }}</span>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column v-for="label in showAttribute">
                    <template #header>
                        <div :class="['baseHeader', label]">{{ label + '优' }}</div>
                    </template>
                    <el-table-column :label="nikke" v-for="nikke in showNikke[label]" width="330px">
                        <template #header>
                            <span class="baseHeader">{{ nikke }}</span>
                        </template>
                        <template #default="{ row }">
                            <showDataCard :data="row.nikkes[nikke]" />
                        </template>
                    </el-table-column>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, unref } from 'vue'
import { tradToSimple } from 'simptrad'
import showDataCard from '@/components/showDataCard.vue'

type DataWraper = {
    update_time: number,
    data: Record<string, Record<string, NikkeData | null>>,
    nikke_order: Record<string, string[]>,
    attribute_order: string[]
}
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

const data = ref<DataWraper | null>(null)
const loading = ref(false)
const selectedAbledNikke = computed(() => {
    return (Object.values(data.value?.nikke_order || {}).flat()).sort((a, b) => a.localeCompare(b))
})
const selectedAbledPlayer = computed(() => {
    return Object.keys(data.value?.data || {}).sort((a, b) => a.localeCompare(b))
})
const searchUser = ref<string[]>([])
const searchNikke = ref<string[]>([])
const showData = computed((): DataWraper => {
    if (!data.value) {
        return {
            update_time: 0,
            data: {},
            nikke_order: {},
            attribute_order: []
        }
    }
    let beforeData = JSON.parse(JSON.stringify(data.value)) as DataWraper
    if (searchUser.value.length > 0) {
        beforeData.data = Object.fromEntries(Object.entries(beforeData.data).filter(([k, v]) => searchUser.value.includes(k)))
    }
    if (searchNikke.value.length > 0) {
        beforeData.data = Object.fromEntries(Object.entries(beforeData.data).map(([k, v]) => [k, Object.fromEntries(Object.entries(v).filter(([k, v]) => searchNikke.value.includes(k)))]))
    }
    return beforeData
})

const showAttribute = computed(() => {
    if (searchNikke.value.length == 0) {
        return showData.value.attribute_order
    }
    return showData.value.attribute_order.filter(i => showData.value.nikke_order[i].some(j => searchNikke.value.includes(j)))
})

const showNikke = computed(() => {
    if (searchNikke.value.length == 0) {
        return showData.value.nikke_order
    }
    return Object.fromEntries(Object.entries(showData.value.nikke_order).map(([k, v]) => [k, v.filter(i => searchNikke.value.includes(i))]))
})

const loadData = async () => {
    loading.value = true
    try {
        const getData = await fetch("/user_nikke_data.json").then((res) => res.json()) as DataWraper
        // 数据处理，简繁转换
        for (const key in getData.data) {
            getData.data[key] = Object.fromEntries(Object.entries(getData.data[key]).map(([k, v]) => [tradToSimple(k), v as NikkeData]))
        }
        getData.nikke_order = Object.fromEntries(Object.entries(getData.nikke_order).map(([k, v]) => [k, v.map(tradToSimple)]))
        data.value = getData
    } catch (e) {
        console.log(e)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    loadData()
})
</script>

<style lang="less" scoped>
.searchBar {
    display: flex;
    column-gap: 20px;
}

.baseHeader {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}

.dataContainer {
    &:deep(.el-table){
        --el-table-row-hover-bg-color: #fff;
        position: relative;
    }
    &:deep(.el-table__header>.is-group>tr>th.el-table__cell) {
        padding: 0 !important;
        border: 0.5px solid #000;
        border-collapse: collapse;
        position: relative;

        &>div.cell {
            padding: 0;
        }
    }
    &:deep(.el-table__body>tbody>tr>td) {
        padding: 0 !important;
        border: 0.5px solid #000;
        border-collapse: collapse;
    }

    &:deep(.el-table__body>tbody>tr>td:nth-child(n+2)) {
        padding: 0 !important;

        &>div.cell {
            padding: 0;
        }
    }
}

.铁 {
    background-color: #e9b156;
    color: #fff;
}

.火 {
    background-color: #d24434;
    color: #fff;
}

.电 {
    background-color: #d745ec;
    color: #fff;
}

.风 {
    background-color: #3c9566;
    color: #fff;
}

.水 {
    background-color: #4a7bef;
    color: #fff;
}
</style>
<script setup lang="ts">
import { useRoute } from "vue-router";
const router = useRoute();
</script>
<template>
    <router-view :key="router.fullPath"></router-view>
</template>

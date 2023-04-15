<script setup lang="ts">
import { useLayout } from "./composables/layout";
const layout = useLayout();
</script>
<template>
    <component :is="layout.componentLayout.value"></component>
</template>

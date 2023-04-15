<script setup lang="ts">
import Navbar from "../components/Navbar.vue";
import SideBar from "../components/SideBar.vue";
import { useRoute } from "vue-router";

const router = useRoute();
</script>
<template>
    <div class="wrapper">
        <Navbar />
        <SideBar />
        <div class="content-wrapper" style="min-height: 511px">
            <router-view :key="router.fullPath"></router-view>
        </div>
    </div>
</template>

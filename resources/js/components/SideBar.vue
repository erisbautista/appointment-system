<script setup lang="ts">
import { onMounted } from "vue";
import { useUsers } from "../stores/users";
const usersStore = useUsers();
</script>

<template>
    <!-- Main Sidebar Container -->
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <!-- Brand Logo -->
        <router-link to="/" class="brand-link">
            <img
                src="../../img/AdminLTELogo.png"
                alt="AdminLTE Logo"
                class="brand-image img-circle elevation-3"
                style="opacity: 0.8"
            />
            <span class="brand-text font-weight-light">APS</span>
        </router-link>
        <!-- Sidebar -->
        <div class="sidebar">
            <!-- Sidebar user panel (optional) -->
            <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                <div class="image">
                    <img
                        src="../../img/user2-160x160.jpg"
                        class="img-circle elevation-2"
                        alt="User Image"
                    />
                </div>
                <div class="info">
                    <router-link to="/" class="d-block"
                        >Alexander Pierce</router-link
                    >
                </div>
            </div>

            <!-- Sidebar Menu -->
            <nav class="mt-2">
                <ul
                    class="nav nav-pills nav-sidebar flex-column"
                    data-widget="treeview"
                    role="menu"
                >
                    <li
                        v-if="usersStore.currentUser.role === 'admin'"
                        class="nav-item"
                    >
                        <router-link to="/users" class="nav-link">
                            <i class="nav-icon fas fa-users"></i>
                            <p>Users</p>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/appointments" class="nav-link">
                            <i class="nav-icon fas fa-calendar-check"></i>
                            <p>Appointments</p>
                        </router-link>
                    </li>
                </ul>
            </nav>
            <!-- /.sidebar-menu -->
        </div>
        <!-- /.sidebar -->
    </aside>
</template>

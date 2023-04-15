<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useUsers } from "../stores/users";
import { useRouter } from "vue-router";

const showProfile = ref(false);
const usersStore = useUsers();
const router = useRouter();

function handleShowProfile() {
    showProfile.value = !showProfile.value;
}

function handleSignout() {
    usersStore.removeToken();
    router.replace("/login");
}
</script>

<template>
    <!-- Navbar -->
    <nav
        v-if="usersStore.currentUser !== undefined"
        class="main-header navbar navbar-expand navbar-white navbar-light"
    >
        <!-- Left navbar links -->
        <ul class="navbar-nav">
            <li class="nav-item">
                <a
                    class="nav-link"
                    data-widget="pushmenu"
                    href="#"
                    role="button"
                    ><i class="fas fa-bars"></i
                ></a>
            </li>
        </ul>
        <!-- Right navbar links -->
        <ul class="navbar-nav ml-auto">
            <!-- Notifications Dropdown Menu -->
            <li
                class="nav-item me-3 dropdown user-menu"
                :class="{ show: showProfile === true }"
            >
                <a
                    href="#"
                    class="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                    @click="handleShowProfile"
                    aria-expanded="false"
                >
                    <img
                        src="../../img/user2-160x160.jpg"
                        class="user-image img-circle elevation-2"
                        alt="User Image"
                    />
                    <span class="d-none d-md-inline">{{
                        usersStore.currentUser.name
                    }}</span>
                </a>
                <ul
                    class="dropdown-menu dropdown-menu-lg dropdown-menu-right"
                    :class="{ show: showProfile === true }"
                    style="left: inherit; right: 0px"
                >
                    <li class="user-header bg-primary">
                        <img
                            src="../../img/user2-160x160.jpg"
                            class="img-circle elevation-2"
                            alt="User Image"
                        />
                        <p>{{ usersStore.currentUser.name }}</p>
                    </li>
                    <li class="user-footer">
                        <button href="#" class="btn btn-default btn-flat">
                            Profile
                        </button>
                        <button
                            @click="handleSignout"
                            class="btn btn-default btn-flat float-right"
                        >
                            Sign out
                        </button>
                    </li>
                </ul>
            </li>
        </ul>
    </nav>
    <!-- /.navbar -->
</template>

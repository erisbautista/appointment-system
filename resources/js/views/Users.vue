<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Header, Item } from "vue3-easy-data-table";
import { useUsers } from "../stores/users";
const usersStore = useUsers();

const headers: Header[] = [
    { text: "Name", value: "name" },
    { text: "Email", value: "email", sortable: true },
    { text: "Total appointment", value: "appointment_count", sortable: true },
    { text: "Created at", value: "created_at", sortable: true },
];

const searchField = ["name", "email", "created_at"];
const searchValue = ref("");

onMounted(() => {
    usersStore.fetchUsers();
});
</script>

<template>
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Users</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item">
                            <router-link to="/">Home</router-link>
                        </li>
                        <li class="breadcrumb-item active">Users</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
    <section class="content">
        <div class="container-fluid">
            <div class="card p-3">
                <div class="input-group col-md-4 offset-md-8">
                    <input
                        type="search"
                        class="form-control"
                        v-model="searchValue"
                        placeholder="Type your keywords here"
                    />
                    <div class="input-group-append">
                        <button type="submit" class="btn btn-default mb-2">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                </div>
                <EasyDataTable
                    :headers="headers"
                    :items="usersStore.filteredUsers"
                    :search-field="searchField"
                    :search-value="searchValue"
                >
                </EasyDataTable>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import FormInput from "./reusables/FormInput.vue";
import { useUsers } from "../stores/users";
import { useRouter } from "vue-router";
import { validate, required, Status } from "../validation";
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({
    position: "top-right",
    duration: "2000",
});
const usersStore = useUsers();
const router = useRouter();

const username = ref("");
const password = ref("");
const usernameStatus = ref<Status>({ valid: true });
const passwordStatus = ref<Status>({ valid: true });

function handleLogin() {
    usersStore
        .loginUser({
            username: username.value,
            password: password.value,
        })
        .then((result) => {
            if ([403, 404].includes(result.code)) {
                toaster.error(result.message);
                return 0;
            }
            usersStore.setToken(result.users);
            router.push({ path: "/" });
            usersStore.authenticate();
        });
}

watch(username, () => {
    usernameStatus.value = validate(username.value, [required]);
});
watch(password, () => {
    passwordStatus.value = validate(password.value, [required]);
});
</script>

<template>
    <div class="login-page" style="min-height: 466px">
        <div class="login-box">
            <div class="card card-outline card-primary">
                <div class="card-header text-center">
                    <router-link to="/" class="h1"><b>Admin</b>LTE</router-link>
                </div>
                <div class="card-body">
                    <p class="login-box-msg">Sign in to start your session</p>
                    <form @submit.prevent="handleLogin">
                        <FormInput
                            :status="usernameStatus"
                            placeholder="Username"
                            type="text"
                            icon="fas fa-user"
                            v-model="username"
                        ></FormInput>
                        <FormInput
                            :status="passwordStatus"
                            placeholder="Password"
                            type="password"
                            icon="fas fa-lock"
                            v-model="password"
                        ></FormInput>
                        <div class="row justify-content-center">
                            <div class="col-6">
                                <button
                                    type="submit"
                                    class="btn btn-primary btn-block"
                                >
                                    Sign In
                                </button>
                            </div>
                        </div>
                    </form>

                    <p class="mb-1">
                        <a href="forgot-password.html">I forgot my password</a>
                    </p>
                    <p class="mb-0">
                        <router-link to="/register" class="text-center"
                            >Register a new membership</router-link
                        >
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import * as dayjs from "dayjs";
import { computed, ref, watch } from "vue";
import FormInput from "./reusables/FormInput.vue";
import {
    validate,
    length,
    required,
    passwordMatch,
    Status,
} from "../validation";
import { User } from "../types/users";
import { useUsers } from "../stores/users";

const usersStore = useUsers();

const name = ref("");
const username = ref("");
const email = ref("");
const password = ref("");
const confirm_password = ref("");

const nameStatus = ref<Status>({ valid: true });
const usernameStatus = ref<Status>({ valid: true });
const emailStatus = ref<Status>({ valid: true });
const passwordStatus = ref<Status>({ valid: true });
const confirmPasswordStatus = ref<Status>({ valid: true });

function handleRegistration() {
    const NewUser: User = {
        name: name.value,
        username: username.value,
        email: email.value,
        password: password.value,
        created_at: dayjs().toISOString(),
        role: "member",
    };
    usersStore.RegisterUser(NewUser).then((result) => {
        console.log(result);
    });
}

watch(name, () => {
    nameStatus.value = validate(name.value, [required]);
});
watch(username, () => {
    usernameStatus.value = validate(username.value, [
        required,
        length({ min: 5, max: 10 }),
    ]);
});
watch(email, () => {
    emailStatus.value = validate(email.value, [required]);
});
watch(password, () => {
    passwordStatus.value = validate(
        password.value,
        [required, length({ min: 5, max: 10 })],
        confirm_password.value
    );
});
watch(confirm_password, () => {
    confirmPasswordStatus.value = validate(
        confirm_password.value,
        [required, length({ min: 5, max: 10 }), passwordMatch],
        password.value
    );
});
</script>

<template>
    <div class="register-page" style="min-height: 542px">
        <div class="register-box">
            <div class="card card-outline card-primary">
                <div class="card-header text-center">
                    <router-link to="/" class="h1"><b>Admin</b>LTE</router-link>
                </div>
                <div class="card-body">
                    <p class="login-box-msg">Register a new membership</p>
                    <form @submit.prevent="handleRegistration" method="post">
                        <FormInput
                            :status="nameStatus"
                            v-model="name"
                            placeholder="Full name"
                            type="text"
                            icon="fas fa-user"
                        ></FormInput>
                        <FormInput
                            :status="usernameStatus"
                            v-model="username"
                            placeholder="Username"
                            type="text"
                            icon="fas fa-user"
                        ></FormInput>
                        <FormInput
                            :status="emailStatus"
                            v-model="email"
                            placeholder="Email"
                            type="email"
                            icon="fas fa-envelope"
                        ></FormInput>
                        <FormInput
                            :status="passwordStatus"
                            v-model="password"
                            placeholder="Password"
                            type="password"
                            icon="fas fa-lock"
                        ></FormInput>
                        <FormInput
                            :status="confirmPasswordStatus"
                            v-model="confirm_password"
                            placeholder="Retype password"
                            type="password"
                            icon="fas fa-lock"
                        ></FormInput>
                        <div class="row justify-content-center">
                            <div class="col-6">
                                <button
                                    type="submit"
                                    class="btn btn-primary btn-block"
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                    </form>
                    <router-link to="/login" class="text-center"
                        >I already have a membership</router-link
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Status } from "../../validation";
import { ref, watch } from "vue";
const props = defineProps<{
    placeholder: string;
    modelValue: string;
    type: string;
    icon: string;
    status: Status;
}>();

const emit = defineEmits<{
    (event: "update:modelValue", value: string): void;
}>();

function handleInput(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    emit("update:modelValue", value);
}
</script>

<template>
    <div class="input-group mb-3">
        <input
            :type="type"
            class="form-control"
            :class="{ 'is-invalid': status.valid === false }"
            @input="handleInput"
            :placeholder="placeholder"
        />
        <div class="input-group-append">
            <div class="input-group-text">
                <span :class="icon"></span>
            </div>
        </div>
        <span v-if="status.valid === false" class="error invalid-feedback">{{
            status.message
        }}</span>
    </div>
</template>

<script setup lang="ts">
import { useModal } from "../../composables/modal";
import AddAppointmentModal from "./Modals/AddAppointmentModal.vue";
import ViewAppointmentModal from "./Modals/ViewAppointmentModal.vue";
import { computed } from "vue";
const modal = useModal();
const modalStyle = computed(() => {
    return {
        display: modal.show.value ? "block" : "none",
    };
});
</script>

<template>
    <div
        class="modal fade"
        id="modal-default"
        :class="{ show: modal.show.value === true }"
        :style="modalStyle"
    >
        <div class="modal-dialog" :class="modal.modalSize.value">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">{{ modal.modalTitle.value }}</h4>
                    <button
                        type="button"
                        class="close"
                        @click="modal.hideModal()"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <AddAppointmentModal
                    v-if="modal.modalType.value === 'add'"
                ></AddAppointmentModal>
                <ViewAppointmentModal
                    v-if="modal.modalType.value === 'view'"
                ></ViewAppointmentModal>
            </div>
        </div>
    </div>
</template>

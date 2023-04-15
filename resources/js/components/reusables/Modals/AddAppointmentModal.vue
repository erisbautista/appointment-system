<script setup lang="ts">
import dayjs from "dayjs";
import { ref } from "vue";
import { useModal } from "../../../composables/modal";
import { useUsers } from "../../../stores/users";
import { useAppointments } from "../../../stores/appointment";
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({
    position: "top-right",
    duration: 2000,
});

const users = useUsers();
const modal = useModal();
const appointment = useAppointments();

const appointmentDate = ref(dayjs());
const appointmentTitle = ref("");
const appointmentDescription = ref("");

function addAppointment() {
    const appointmentParam = {
        title: appointmentTitle.value,
        description: appointmentDescription.value,
        appointment_date: dayjs(appointmentDate.value).format(
            "YYYY-MM-DD HH:mm:ss"
        ),
        user_id: users.currentUser.user_id,
    };
    appointment
        .addAppointment(appointmentParam)
        .then(() => {
            toaster.success("Successfully added");
            appointmentTitle.value = "";
            appointmentDescription.value = "";
            appointmentDate.value = dayjs();
            modal.hideModal();
        })
        .catch(() => {
            toaster.error(
                "Error while adding appointment. Please try again later"
            );
        })
        .finally(() => {
            appointment.fetchAppointments();
        });
}
</script>

<template>
    <div class="modal-body">
        <form>
            <div class="card-body">
                <div class="form-group">
                    <label for="appointmentTitle">Title</label>
                    <input
                        type="email"
                        class="form-control"
                        id="appointmentTitle"
                        v-model="appointmentTitle"
                        placeholder="Appointment Title"
                    />
                </div>
                <div class="form-group">
                    <label for="appointmentDescription">Description</label>
                    <textarea
                        class="form-control"
                        rows="3"
                        id="appointmentDescription"
                        v-model="appointmentDescription"
                        placeholder="Detailed description"
                        style="height: 77px"
                    ></textarea>
                </div>
                <div class="form-group">
                    <label for="appointmentDate">Date Of Appointment</label>
                    <div class="input-group">
                        <div class="custom-file">
                            <VueDatePicker
                                id="appointmentDate"
                                v-model="appointmentDate"
                            ></VueDatePicker>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <div class="modal-footer justify-content-center">
        <!-- <button
                        type="button"
                        class="btn btn-default"
                        @click="modal.hideModal()"
                    >
                        Close
                    </button> -->
        <button
            type="button"
            @click="addAppointment()"
            class="btn btn-primary col-md-4"
        >
            {{ modal.modalButtonText.value }}
        </button>
    </div>
</template>

<style lang="scss">
@import "@vuepic/vue-datepicker/src/VueDatePicker/style/main.scss";
</style>

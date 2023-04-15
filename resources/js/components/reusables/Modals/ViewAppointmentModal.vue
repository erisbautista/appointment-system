<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useModal } from "../../../composables/modal";
import { useAppointments } from "../../../stores/appointment";
import { storeToRefs } from "pinia";
import dayjs from "dayjs";

const modal = useModal();
const appointmentStore = useAppointments();
const { appointmentID } = storeToRefs(appointmentStore);

onMounted(() => {
    appointmentStore
        .getAppointmentDetails(appointmentStore.appointmentID)
        .then((result) => {
            console.log(result);
        });
});

watch(appointmentID, () => {
    appointmentStore.getAppointmentDetails(appointmentStore.appointmentID);
});
</script>

<template>
    <div class="modal-body">
        <div class="card-body">
            <div class="row">
                <div class="col">
                    <h6>Appointment Information</h6>
                    <div class="text-wrap">
                        <b>Title</b>
                        {{ appointmentStore.appointmentDetails.title }}
                    </div>
                    <div class="text-wrap">
                        <b>Description</b>
                        {{ appointmentStore.appointmentDetails.description }}
                    </div>
                    <div class="text-wrap">
                        <b>Appointment Date</b>
                        {{
                            appointmentStore.appointmentDetails.appointment_date
                        }}
                    </div>
                </div>
                <div class="col border-left border-1">
                    <h6>Customer Information</h6>
                    <div class="text-wrap">
                        <b>Name</b>
                        {{ appointmentStore.appointmentDetails.users.name }}
                    </div>
                    <div class="text-wrap">
                        <b>Email</b>
                        {{ appointmentStore.appointmentDetails.users.email }}
                    </div>
                </div>
            </div>
            <!-- <form>
                <div class="form-group">
                    <label for="appointmentTitle">Title</label>
                    <input
                        type="email"
                        class="form-control"
                        disabled
                        id="appointmentTitle"
                        :value="appointmentStore.appointmentDetails.title"
                        placeholder="Appointment Title"
                    />
                </div>
                <div class="form-group">
                    <label for="appointmentDescription">Description</label>
                    <textarea
                        class="form-control"
                        rows="3"
                        disabled
                        id="appointmentDescription"
                        :value="appointmentStore.appointmentDetails.description"
                        placeholder="Detailed description"
                        style="height: 77px"
                    ></textarea>
                </div>
                <div class="form-group">
                    <label for="appointmentDate">Date Of Appointment</label>
                    <div class="input-group">
                        <div class="custom-file">
                            <input
                                type="email"
                                class="form-control"
                                disabled
                                id="appointmentTitle"
                                :value="
                                    dayjs(
                                        appointmentStore.appointmentDetails
                                            .appointment_date
                                    ).format('YYYY-MM-DD HH:mm')
                                "
                                placeholder="Appointment Title"
                            />
                        </div>
                    </div>
                </div>
            </form> -->
        </div>
    </div>
    <div class="modal-footer justify-content-center">
        <button
            type="button"
            class="btn btn-default col-md-4"
            @click="modal.hideModal()"
        >
            Close
        </button>
    </div>
</template>

<style lang="scss">
@import "@vuepic/vue-datepicker/src/VueDatePicker/style/main.scss";
</style>

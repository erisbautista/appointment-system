<script setup lang="ts">
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useAppointments } from "../stores/appointment";
import Modal from "../components/reusables/Modal.vue";
import { useModal } from "../composables/modal";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { useUsers } from "../stores/users";

const modal = useModal();
const userStore = useUsers();
const appointmentStore = useAppointments();
const { filterAppointments } = storeToRefs(appointmentStore);

const calendarOptions = ref({
    plugins: [dayGridPlugin, interactionPlugin],
    customButtons: {
        addAppointment: {
            text: "Add Appointment",
            click: function () {
                modal.setModalType("add");
                modal.setTitle("Set up an appointment");
                modal.setButtonText("Save");
                modal.setSize("");
                modal.showModal();
            },
        },
    },
    headerToolbar: {
        left: "prev",
        center: "title",
        right: "addAppointment next",
    },
    initialView: "dayGridMonth",
    events: appointmentStore.filterAppointments,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    eventClick: function (clickInfo) {
        appointmentStore.appointmentID = clickInfo.event.id;
        modal.setModalType("view");
        modal.setTitle("Appointment Details");
        modal.setSize("modal-lg");
        modal.showModal();
        // if (
        //     confirm(
        //         `Are you sure you want to delete the event '${clickInfo.event.title}'`
        //     )
        // ) {
        //     clickInfo.event.remove();
        // }
    },
});

onMounted(() => {
    appointmentStore
        .fetchAppointments({
            role: userStore.currentUser.role,
            user_id: userStore.currentUser.user_id,
        })
        .then(() => {
            calendarOptions.value.events = appointmentStore.filterAppointments;
        });
    appointmentStore.appointmentID = 1;
});

watch(filterAppointments, (appointments) => {
    calendarOptions.value.events = appointmentStore.filterAppointments;
});
</script>
<template>
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Appointments</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item">
                            <router-link to="/">Home</router-link>
                        </li>
                        <li class="breadcrumb-item active">Appointments</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
    <section class="content">
        <div class="container-fluid">
            <div class="card p-3">
                <FullCalendar :options="calendarOptions">
                    <template v-slot:eventContent="arg">
                        <b>{{ arg.event.title }}</b>
                    </template>
                </FullCalendar>
            </div>
        </div>
    </section>
    <Modal></Modal>
</template>

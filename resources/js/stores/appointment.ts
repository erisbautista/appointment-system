import { defineStore } from "pinia";
import { useApi } from "../api/adapter";
import { Appointments, AppointmentsDashboard } from "../types/appointment";
import dayjs from "dayjs";
const api = useApi();

interface appointmentState {
    appointments: AppointmentsDashboard[];
    appointmentID: number;
    appointmentDetails: Appointments;
}

export const useAppointments = defineStore("appointments", {
    state: (): appointmentState => ({
        appointments: [],
        appointmentID: 0,
        appointmentDetails: {
            appointment_date: "",
            description: "",
            title: "",
            user_id: 0,
            users: {
                name: "",
                email: "",
            },
        },
    }),
    actions: {
        fetchAppointments(data: { role: string; user_id: number }) {
            const param = new URLSearchParams(data);
            return new Promise((resolve, reject) => {
                api.get("/appointments", param)
                    .then((result) => {
                        this.appointments = result.data;
                        resolve(result.data);
                    })
                    .catch((error) => {
                        reject(error.response);
                    });
            });
        },
        addAppointment(Appointments: Appointments) {
            return new Promise((resolve, reject) => {
                api.post("/appointments", Appointments)
                    .then((result) => {
                        resolve(result.data);
                    })
                    .catch((error) => {
                        reject(error.response);
                    });
            });
        },
        getAppointmentDetails(id: number) {
            return new Promise((resolve, reject) => {
                api.get(`/appointments/${id}`)
                    .then((result) => {
                        this.appointmentDetails = result.data;
                        resolve(result.data);
                    })
                    .catch((error) => {
                        reject(error.response);
                    });
            });
        },
    },
    getters: {
        filterAppointments: (state): AppointmentsDashboard[] => {
            const appointments = state.appointments;
            for (let i = 0; i < appointments.length; i++) {
                appointments[i].start = appointments[i].appointment_date;
                appointments[i].id = appointments[i].appointment_id;
            }
            return appointments;
        },
    },
});

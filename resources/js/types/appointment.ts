export interface Appointments {
    title: string;
    description: string;
    user_id: number;
    appointment_date: string;
    users: {
        name: string;
        email: string;
    };
}

export interface AppointmentsDashboard extends Omit<Appointments, "created"> {
    start: string;
    id: number;
    appointment_id: number;
}

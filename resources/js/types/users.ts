export interface User {
    name: String;
    username: String;
    password: String;
    email: string;
    created_at: string;
    role: string;
}

export interface NewUser extends User {
    user_id: number;
}

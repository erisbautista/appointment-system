import { defineStore } from "pinia";
import { useApi } from "../api/adapter";
import CryptoJS from "crypto-js";
import { NewUser, User } from "../types/users";
import * as dayjs from "dayjs";

const api = useApi();

interface UsersState {
    users: User[];
    currentUser: NewUser;
}

interface LoginUser {
    username: string;
    password: string;
}

export const useUsers = defineStore("users", {
    state: (): UsersState => ({
        currentUser: {
            username: "",
            email: "",
            role: "",
            password: "",
            created_at: "",
            name: "",
            user_id: 1,
        },
        users: [],
    }),
    actions: {
        loginUser(User: LoginUser) {
            return new Promise((resolve, reject) => {
                api.post("/login", User)
                    .then((result) => {
                        resolve(result.data);
                    })
                    .catch((error) => {
                        reject(error.response);
                    });
            });
        },
        RegisterUser(User: User) {
            return new Promise((resolve, reject) => {
                api.post("/register", User)
                    .then((result) => {
                        resolve(result.data);
                    })
                    .catch((error) => {
                        reject(error.response);
                    });
            });
        },
        setToken(user: User) {
            this.currentUser = user;
            const token = CryptoJS.AES.encrypt(
                JSON.stringify(user),
                "secret-token"
            ).toString();
            localStorage.setItem("user-token", token);
        },
        authenticate() {
            let token = localStorage.getItem("user-token");
            if (!token) {
                return false;
            }
            var users = CryptoJS.AES.decrypt(token, "secret-token");
            users = JSON.parse(users.toString(CryptoJS.enc.Utf8));
            this.currentUser = users;
            return true;
        },
        removeToken() {
            localStorage.removeItem("user-token");
            this.currentUser = {
                username: "",
                email: "",
                role: "",
                password: "",
                created_at: "",
                name: "",
                user_id: -1,
            };
        },
        fetchUsers() {
            return new Promise((resolve, reject) => {
                api.get("/users")
                    .then((result) => {
                        this.users = result.data;
                        resolve(result.data);
                    })
                    .catch((error) => {
                        reject(error.response);
                    });
            });
        },
    },
    getters: {
        filteredUsers: (state): User[] => {
            const users = state.users;
            for (let i = 0; i < users.length; i++) {
                users[i].created_at = dayjs(users[i].created_at).format(
                    "MMM DD, YYYY HH:mm:ss"
                );
            }
            return users;
        },
    },
});

import { shallowRef } from "vue";
import AdminLayout from "../views/AdminLayout.vue";
import SimpleLayout from "../views/SimpleLayout.vue";

const componentLayout = shallowRef(AdminLayout);

export function useLayout() {
    return {
        componentLayout,
        setLayout: (type: "admin" | "simple") => {
            switch (type) {
                case "admin":
                    return (componentLayout.value = AdminLayout);
                case "simple":
                    return (componentLayout.value = SimpleLayout);
            }
        },
    };
}

import { ref, shallowRef } from "vue";

const show = ref(false);
const modalTitle = ref("");
const modalButtonText = ref("");
const component = shallowRef();
const modalType = ref("");
const modalSize = ref("");

export function useModal() {
    return {
        show,
        modalTitle,
        modalButtonText,
        component,
        modalSize,
        modalType,
        showModal: () => {
            show.value = true;
        },
        hideModal: () => {
            show.value = false;
            modalType.value = "";
            modalButtonText.value = "";
            modalTitle.value = "";
            modalSize.value = "";
        },
        setTitle: (title: string) => {
            modalTitle.value = title;
        },
        setButtonText: (buttonText: string) => {
            modalButtonText.value = buttonText;
        },
        setModalType: (type: "add" | "view") => {
            modalType.value = type;
        },
        setSize: (type: "" | "modal-lg") => {
            modalSize.value = type;
        },
    };
}

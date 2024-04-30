import { ref } from "vue";

export function useInitStore(apiCall) {
    const isInitialized = ref(false);
    const isLoading = ref(false);

    (async function () {
        isLoading.value = true;
        await apiCall();
        isInitialized.value = true;
        isLoading.value = false;
    })();

    return { isInitialized, isLoading };
}

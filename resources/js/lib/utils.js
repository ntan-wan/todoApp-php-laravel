export const clearObjData = (obj) => {
    for (const key in obj) {
        obj[key] = "";
    }
};

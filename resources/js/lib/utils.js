export const clearObjData = (obj) => {
    for (const key in obj) {
        obj[key] = "";
    }
};

export const capitalizeFirstLetter = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

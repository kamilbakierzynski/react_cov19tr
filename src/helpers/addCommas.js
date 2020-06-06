const addCommas = function (string) {
    if (string === null) {
        return string;
    }
    return string.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,').slice(0, -2);
}

export default addCommas;
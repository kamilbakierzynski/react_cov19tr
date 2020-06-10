const addCommas = function (string) {
    // If string undefined skip
    let newFlag = false;
    if (string === null || string === undefined) {
        return string;
    }

    // Display empty field rather than +0 or 0
    if (string === 0 || string === '+') return null;

    // Delete + from the start if in case of 'New Cases'
    if (typeof string === 'string' && string.startsWith('+')) {
        string = string.slice(1);
        newFlag = true;
    }
    return `${newFlag ? '+' : ''}${Math.floor(string).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,').slice(0, -2)}`;
}

export default addCommas;
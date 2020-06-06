const preetifyTime = (time) => {
    const secs = Math.floor(time / 1000);
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs - (hours * 3600)) / 60)
    if (minutes === 0 && hours === 0) {
        return 'now';
    }
    if (hours === 0) {
        if (minutes === 1) {
            return `${minutes} minute ago`;
        }
        return `${minutes} minutes ago`;
    }
    if (hours === 1) {
        if (minutes === 0) {
            return `${hours} hour ago`;
        }
        else {
            return `${hours} hour ${minutes} minutes ago`;
        }
    }
    if (minutes === 0) {
        return `${hours} hours ago`;
    }
    return `${hours} hours ${minutes} minutes ago`;
}

export default preetifyTime;
const sortBy = (sortedList, fieldName, setFunc, reverse) => {
    let listCopy = [...sortedList.list];
    const mode = reverse ? !sortedList.params.asc : sortedList.params.asc;
    const numericalMode = mode ? 1 : -1;
    switch (fieldName) {
        case "Country":
            listCopy.sort((a, b) => numericalMode * a.country.localeCompare(b.country));
            break;
        case "New Cases":
            listCopy.sort((a, b) => {
                if (a.cases.new === null) {
                    return numericalMode * -1;
                }
                if (b.cases.new === null) {
                    return numericalMode * 1;
                }
                return numericalMode * (+a.cases.new - +b.cases.new);
            });
            break;
        case "Active":
        case "Recovered":
        case "Total":
            const fieldToLower = fieldName.toLowerCase();
            listCopy.sort((a, b) => {
                if (a.cases[fieldToLower] === null) {
                    return numericalMode * -1;
                }
                if (b.cases[fieldToLower] === null) {
                    return numericalMode * 1;
                }
                return numericalMode * (+a.cases[fieldToLower] - +b.cases[fieldToLower]);
            });
            break;
        case "Deaths":
            listCopy.sort((a, b) => {
                if (a.deaths.total === null) {
                    return numericalMode * -1;
                }
                if (b.deaths.total === null) {
                    return numericalMode * 1;
                }
                return numericalMode * (+a.deaths.total - +b.deaths.total);
            });
            break;
        case "Tests":
            listCopy.sort((a, b) => {
                if (a.tests.total === null) {
                    return numericalMode * -1;
                }
                if (b.tests.total === null) {
                    return numericalMode * 1;
                }
                return numericalMode * (+a.tests.total - +b.tests.total);
            });
            break;
        default:
            console.log(`Case fail ${fieldName}`);
    }
    setFunc({ params: { ...sortedList.params, fieldName, asc: mode }, list: listCopy });
}

export default sortBy;
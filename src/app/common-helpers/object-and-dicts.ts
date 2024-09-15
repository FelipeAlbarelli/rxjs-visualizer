

export const deepCompare = (a : Object , b = Object) => {
    const sa = JSON.stringify(a);
    const sb = JSON.stringify(b);
    return sa === sb;
}
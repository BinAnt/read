function v1() {
    return 'v1'
}
function v2() {
    return 'v2'
}

export {
    v1 as streamV1,
    v2 as streamV2,
    v2 as streamNewV2
}
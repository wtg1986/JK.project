const myState= {
    myMobile : '097.365.1368'
}
const reduer = (state = myState, action) => {
    if (action.type === 'UPDATE')
        return state;
    return state;
}

export default reduer;
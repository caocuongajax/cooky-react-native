const initialState = {
    id: null,
    token: null
}
function clientReducer(state = initialState, action) {
    switch (action.type) {
        case 'CLIENT_SET':
            /*return {
                id: action.token.id,
                token: action.token.token
            }*/
            return action.token
        case 'CLIENT_UNSET':
            return {
                id: null,
                token: null
            }
        default:
            return state
    }
}
export default clientReducer;
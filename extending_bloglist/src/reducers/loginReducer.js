export const getUser = (user) => {
    return async dispatch => {
        dispatch({
            type: 'GET',
            id: '',
            content: user

        })
    }

}

const loginReducer = (state = null, action) => {

    switch (action.type) {
        case 'GET':

            return action.content
        case 'LOGIN':
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(action.content)
            )
            return state
        default: return state

    }
}

export default loginReducer

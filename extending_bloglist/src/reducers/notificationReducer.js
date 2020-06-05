
export const setNotification = (notif, n) => {
    return async dispatch => {
        dispatch({ type: 'SHOW_NOTIFICATION', text: notif })

        

    }
}

const notificationReducer = (state = ' ', action) => {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
          //  clearTimeout(t)
            return `${action.text}`
        case 'HIDE_NOTIFICATION':
            return ' '
        default:
            return ' '
    }
}

export default notificationReducer
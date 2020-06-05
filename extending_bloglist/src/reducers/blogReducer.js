import blogService from '../services/blogs'

export const createBlog = (content) => {
    return ({
        type: 'NEW',
        id: '',
        content: content
    })
}



export const initializeBlogs = () => {
    return async dispatch => {

        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT',
            id: '',
            content: blogs,
        })
    }
}

export const getBlogs = (user) => {
    return async dispatch => {
        blogService.setToken(user.token)
        const blogs = await blogService.getAll()
        dispatch({
            type: 'BLOG',
            id: '',
            content:
            {
                blogs: blogs,
                user: user
            }

        })
    }
}



export function data(blogs, user) {
    var blogsD = []
    for (let index = 0; index < blogs.length; index++) {
        const element = blogs[index]

        if (element.user) {
            if (element.user.username === user.username) {
                blogsD = blogsD.concat({ id: element.id, title: element.title, author: element.author, likes: element.likes, url: element.url })
            }
        }
    }

    blogsD.sort(function (a, b) {
        return b.likes - a.likes
    })
    return blogsD
}

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'NEW':
            var newState1 = [...state]
            var newS = newState1.concat(
                action.content)
            blogService.create(
                action.content
            )
            return newS
        case 'INIT':
            return action.content
        case 'BLOG':
            var blogsU = data(action.content.blogs, action.content.user)


            return blogsU
        case 'LIKE':
            blogService.updateBlog(action.id, action.content)
            return state
        case 'REMOVE':
            blogService.delBlog(action.id)
            return state
        case 'COMMENT':
            blogService.postComment(action.id,action.content)
            return state
        default: return state

    }
}

export default blogReducer

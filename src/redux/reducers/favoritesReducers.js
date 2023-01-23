import {
    REMOVE_FAVORITE_USER,
    GET_FROM_LOCAL_STORAGE,
    SAVE_FAVORITE_USER,
    CONSTANT_LOCAL_STORAGE_NAME
} from "../actions/favoritesActions"

// update the current state of favorite users
// manage adding, removing & passing data to different components

// state set to default value [] cause we didn't get users

const favoritesReducers = (state = [], action) => {
    const {type,payload} = action;
    switch (type) {
        
        case GET_FROM_LOCAL_STORAGE:
            return payload;

        case SAVE_FAVORITE_USER:
            if (!state.includes(payload))
            {
                const newUsers = state.concat(payload)
                localStorage.setItem(CONSTANT_LOCAL_STORAGE_NAME, JSON.stringify(newUsers));
                return newUsers;
            }
            else {
                return state;
            }

        case REMOVE_FAVORITE_USER:
            const newUsers = state.filter(favUser => favUser !== payload);
            localStorage.setItem(CONSTANT_LOCAL_STORAGE_NAME, JSON.stringify(newUsers));
            return newUsers;

        default:
            return state;
    }

}
export default favoritesReducers;
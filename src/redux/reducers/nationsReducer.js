import { ADD_NATION, REMOVE_NATION } from "redux/actions/nationsActions";

// update the current state of nations 
// manage adding, removing to fetch the requested type of users

// state set to default value [] cause we didn't get filters
const nationsReducer = (state = [] , action) => {
    switch(action.type)
    {
        case ADD_NATION:
            const newNations = [...state, action.payload];
            return newNations;

        case REMOVE_NATION:
            return state.filter(item => item !== action.payload);
 
        default:
            return state;
    }
}


export default nationsReducer;
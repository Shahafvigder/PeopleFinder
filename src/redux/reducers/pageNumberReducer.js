import { INCREASE_PAGE_NUM, RESET_PAGES } from "redux/actions/pageNumberActions";

// update the current state of pages from the API
// incase got to the last user -> increase page & fetch new users.

// state set to default value of 1 for the first users page
 
const pageNumberReducer = (state = 1, action) => {
    const {type} = action;
    switch (type) {
        // filter changed
        case RESET_PAGES:
            return 1;

        // fetch more
        case INCREASE_PAGE_NUM:
            return ++state;
        default:
            return state;
    }

}
export default pageNumberReducer;
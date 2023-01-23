import { useState, useEffect } from "react";
import axios from "axios";
import {useSelector, useDispatch} from 'react-redux';
import {RESET_PAGES} from "../redux/actions/pageNumberActions";

export const usePeopleFetch = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // get access to redux states & and dispatching actions
  const dispatch = useDispatch();
  const nations = useSelector((state) => 
  {
    return state.nations;
  });
  const pageNum = useSelector((state) => 
  {
    return state.pageNum
  });


  // for every new nation filter fetch new users
  useEffect(() => {
    users.length = 0;
    dispatch({ type: RESET_PAGES })
    fetchUsers();
  }, [nations]);

  // fetch more user to current settings
  useEffect(() => {
    fetchUsers();
  }, [pageNum]);
  
  // default fetching 
  useEffect(() => {
    fetchUsers();
  }, []);

  
  // fetch functions with params from redux-state
  async function fetchUsers() {
    setIsLoading(true);
    const response = await axios.get(`https://randomuser.me/api`,{
      params: {
        results: 25,
        page: pageNum,
        nat: nations.length !== 0 ? nations.join() : '',
      },
    })
    setIsLoading(false);
    setUsers([...users, ...response.data.results]);
  }

  return { users, isLoading };
};

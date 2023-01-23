import React, { useEffect, useState, useRef, useCallback } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { checkboxes } from "components/CheckBox/checkboxes";
import { ADD_NATION, REMOVE_NATION } from "redux/actions/nationsActions";
import { SAVE_FAVORITE_USER, REMOVE_FAVORITE_USER , GET_FROM_LOCAL_STORAGE , CONSTANT_LOCAL_STORAGE_NAME} from "redux/actions/favoritesActions";
import { INCREASE_PAGE_NUM } from "redux/actions/pageNumberActions";
import * as S from "./style";

const UserList = ({ users, isLoading }) => {

  // * set a dispatch to trigger a change to global state.
  const dispatch = useDispatch();

  const [hoveredUserId, setHoveredUserId] = useState();

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  // get current nations & favorites users from redux-state
  const nations = useSelector((state) => {
    return state.nations
  });
  const favoritesUsers = useSelector((state) => {
    return state.favoritesUsers
  })

  // Task 1 - Nations checkbox filters
  const handleCheckBoxChange = (checkBoxValue, isChecked) => {
    dispatch({ type: isChecked ? ADD_NATION : REMOVE_NATION, payload: checkBoxValue })
  }

  // Task 2 - Favorite users
  // fetching favorites from local storage for every change in users state
  useEffect(() => {
    const favoritesLocalStorage = JSON.parse(localStorage.getItem(CONSTANT_LOCAL_STORAGE_NAME)) || favoritesUsers;
    favoritesLocalStorage.forEach( _ => dispatch({ type: GET_FROM_LOCAL_STORAGE, payload: favoritesLocalStorage }))
  }, [users]);

  const handleClickOnUser = (user) => {
    dispatch({ type: favoritesUsers.includes(user) ? REMOVE_FAVORITE_USER : SAVE_FAVORITE_USER, payload: user })
  };

  // Task 3 - Infinity Scroll
  const userRef = useRef();
  // set logic for last user on list
  const lastUserRef = useCallback(node => {
    if (userRef.current) 
    {
      // remove last reference
      userRef.current.disconnect();
    }
    userRef.current = new IntersectionObserver(entries => {
      // incase the last user show up on screen 
      if (entries[0].isIntersecting) {
        dispatch({ type: INCREASE_PAGE_NUM });
      }
    })
    if (node) userRef.current.observe(node);
  }, []);

  return (
    <S.UserList>
      <S.Filters>
       {
        checkboxes.map(checkbox => 
          <CheckBox 
          value={checkbox.value}
          label={checkbox.label}
          key={checkbox.value}
          onChange={handleCheckBoxChange}
          isChecked={nations.includes(checkbox.value)}/>)
       }
      </S.Filters>
      <S.List>
        {users.map((user, index) => {
          return (
            <S.User
              ref={index + 1 === users.length ? lastUserRef : null}
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => {handleClickOnUser(user)}}
            >
              <S.UserPicture src={user?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name.first} {user?.name.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location.street.number} {user?.location.street.name}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper isVisible={index === hoveredUserId || favoritesUsers.includes(user)}>
                <IconButton>
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;

import React, { useEffect, useState } from "react";
import Text from "components/Text";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useDispatch, useSelector } from "react-redux";
import {REMOVE_FAVORITE_USER , CONSTANT_LOCAL_STORAGE_NAME} from "redux/actions/favoritesActions"
import * as S from "./style";

const FavoritesList = () => {

  // get from local storage  
  const [usersToDisplay, setUsersToDisplay] = useState(JSON.parse(localStorage.getItem(CONSTANT_LOCAL_STORAGE_NAME)));
  const dispatch = useDispatch();

  // get from redux-state
  const favoritesUsers = useSelector((state) => {
    return state.favoritesUsers
  });

  // incase there are changes make sure i got the updated users
  useEffect(() => {
    setUsersToDisplay(favoritesUsers);
  }, [usersToDisplay, favoritesUsers]);

  // remove user from favorite page
  const handleUserClick = (user) => {
    dispatch({ type: REMOVE_FAVORITE_USER, payload: user })
  };

  return (
    <S.UserList>
      <S.List>
        {usersToDisplay?.map((user, index) => {
          return (
            <S.User
              key={index}
              onClick={() => handleUserClick(user)}
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
              <S.IconButtonWrapper isVisible={favoritesUsers.includes(user)} >
                <IconButton>
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}

      </S.List>
    </S.UserList>
  );
};

export default FavoritesList;

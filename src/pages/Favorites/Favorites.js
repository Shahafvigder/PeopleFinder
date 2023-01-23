import React from "react";
import Text from "components/Text";
import FavoritesList from "components/FavoritesList";
import * as S from "./style";

const Favorites = () => {
  return (
    <S.Favorite>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            My Favorites
          </Text>
        </S.Header>
        <FavoritesList />
      </S.Content>
    </S.Favorite>
  );
};

export default Favorites;

import React, { memo, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Card, Paragraph } from "react-native-paper";
import Button from "./Button";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../store/actions/users";

const AdvertCard = ({ advert, showDetails }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const [author, setAuthor] = useState(null);

  useEffect(() => {
    if (users.length) {
      setAuthor(users.find((item) => item.id === advert.author_id));
    } else {
      dispatch(
        getUsers((responseData) => {
          setAuthor(responseData.find((item) => item.id === advert.author_id));
        })
      );
    }
  }, []);

  const openDetails = () => showDetails(advert.id);

  return (
    <Card onPress={openDetails} style={styles.container}>
      <Card.Title title={advert.title} subtitle={`${advert.date} - ${author?.name || ""} ${author?.surname || ""}`} />
      <Card.Content>
        <Paragraph numberOfLines={2} ellipsizeMode="tail">
          {advert.content}
        </Paragraph>
      </Card.Content>
      <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
      <Card.Actions>
        <Button mode="contained">{author?.phone_number || ""}</Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    marginBottom: 30,
  },
});

export default memo(AdvertCard);

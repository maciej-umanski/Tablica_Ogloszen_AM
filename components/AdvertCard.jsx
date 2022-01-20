import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SERVER_HOST } from "../conf";

import { StyleSheet } from "react-native";
import { Card, Paragraph } from "react-native-paper";
import Button from "./Button";

import { getUsers } from "../store/actions/users";
import { getDateString } from "../utils/utils";

const AdvertCard = ({ advert, showDetails, editMode, editPost }) => {
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
  const handleEdit = () => editPost(advert.id);

  return (
    <Card style={styles.container}>
      <Card.Title
        title={advert.title}
        subtitle={`${getDateString(advert?.date)} - ${author?.name || ""} ${author?.surname || ""}`}
        titleStyle={styles.text}
        subtitleStyle={styles.subText}
      />
      <Card.Content style={styles.content}>
        <Paragraph numberOfLines={2} ellipsizeMode="tail" style={styles.text}>
          {advert.content}
        </Paragraph>
      </Card.Content>
      <Card.Cover
        source={advert?.photo ? { uri: `${SERVER_HOST}/uploads/${advert.photo}` } : require("../assets/no-photo.jpg")}
      />
      <Card.Actions>
        {editMode ? (
          <Button mode="contained" onPress={handleEdit}>
            Edit post
          </Button>
        ) : (
          <Button mode="contained" onPress={openDetails}>
            View more...
          </Button>
        )}
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    marginBottom: 30,
    backgroundColor: "white",
  },
  content: {
    width: "80%",
    marginBottom: 7,
  },
  text: {
    color: "black",
  },
  subText: {
    color: "#595959",
  },
});

export default memo(AdvertCard);

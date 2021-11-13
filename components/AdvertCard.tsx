import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { Card, Paragraph } from "react-native-paper";
import Button from "./Button";
import { Advert } from "../types";

type Props = {
  advert: Advert;
  showDetails: (advertId: string) => void;
};

const AdvertCard = ({ advert, showDetails }: Props) => (
  <Card onPress={() => showDetails(advert.id)}>
    <Card.Title title={advert.title} subtitle={`${advert.postTime} - ${advert.author.name} ${advert.author.surname}`} />
    <Card.Content>
      <Paragraph numberOfLines={2} ellipsizeMode="tail">
        {advert.content}
      </Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
    <Card.Actions>
      <Button mode="contained" onPress={() => null}>
        {advert.phoneNumber}
      </Button>
    </Card.Actions>
  </Card>
);

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
  },
  button: {
    width: "100%",
    marginVertical: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 26,
  },
});

export default memo(AdvertCard);

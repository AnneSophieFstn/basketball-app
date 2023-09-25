import * as React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import Playground from "../../../assets/playground.jpg";
import { Button } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";

export default function CardComponent({
  navigation,
  id,
  name,
  type,
  payant,
  date,
  heure,
  adresse,
  latitude,
  longitude,
  description,
  nbrTerrains,
  nbrPaniers,
  nbrPlaces,
  nbrParticipants,
  terrain_id,
  user_id,
  routeApi,
  routeName,
  title,
  titleBtn,
}) {
  const handleShowDetails = () => {
    const data = {
      id,
      name,
      type,
      payant,
      date,
      heure,
      adresse,
      latitude,
      longitude,
      description,
      nbrTerrains,
      nbrPaniers,
      nbrPlaces,
      nbrParticipants,
      terrain_id,
      user_id,
      title,
      titleBtn,
      routeApi,
    };
    navigation.navigate(routeName, { data });
  };

  return (
    <View style={{ marginBottom: 5 }}>
      <View style={styles.card}>
        <Image source={Playground} style={{ width: "100%", height: 150 }} />

        <View style={styles.infos}>
          <View>
            <Text style={{ fontSize: 23, paddingTop: 8, paddingBottom: 10 }}>
              {name}
            </Text>
            {type && date && heure && (
              <Text>
                <Text style={{ color: "#FF9A62" }}>{type}</Text>
                <Text> le </Text>
                <Text style={{ color: "#FF9A62" }}>{date}</Text>
                <Text> à </Text>
                <Text style={{ color: "#FF9A62" }}>{heure}</Text>
              </Text>
            )}
            <Text style={{ fontSize: 13, color: "#595959" }}>
              24 avenue de Chicago, Saint-Denis - La Réunion
            </Text>
          </View>

          <View style={{ alignItems: "center" }}>
            {nbrParticipants && (
              <View style={{ margin: 8 }}>
                <Text style={{ fontSize: 12, color: "#FF9A62" }}>
                  {nbrParticipants} places
                </Text>
                <Text style={{ fontSize: 12 }}>restantes!</Text>
              </View>
            )}
            <Button
              radius={"sm"}
              type="outline"
              buttonStyle={{
                backgroundColor: "rgba(220, 88, 25, 0.05)",
                borderColor: "#FF9A62",
                borderWidth: 2,
                height: 30,
                padding: 0,
              }}
              titleStyle={{ color: "#FF9A62", fontSize: 12 }}
              onPress={handleShowDetails}
            >
              <Ionicons
                name="basketball"
                size={15}
                color="#FF9A62"
                style={{ marginRight: 5 }}
              />
              Voir plus
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 240,
    margin: 5,
    borderRadius: 15,
    backgroundColor: "#EDEDED",
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.4)",
    shadowOffset: { width: 0, height: 2 }, // Décalage horizontal et vertical de l'ombre
    shadowOpacity: 3,
    shadowRadius: 4,
    elevation: 5,
  },

  infos: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
});

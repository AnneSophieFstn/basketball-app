import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import { Button } from "react-native-paper";

import { useNavigation } from "@react-navigation/native";

import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";

export default function Match({ matchs }) {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignSelf: "stretch" }}>
      {matchs.map((match) => {
        return (
          <View key={match.id} style={styles.global_match}>
            <View style={styles.dimension_match}>
              <Image
                style={styles.size_img}
                source={require("../../../assets/basketball-court.png")}
              />
              <View style={styles.details_match}>
                <Text style={styles.titleText}>{match.name}</Text>

                <View style={styles.info_match}>
                  <Ionicons
                    name="md-basketball-outline"
                    size={24}
                    color="orange"
                  />
                  <Text style={styles.matchtext}>{match.typeMatch}</Text>
                </View>
                <View style={styles.info_match}>
                  <Ionicons name="calendar" size={24} color="orange" />
                  <Text style={styles.matchtext}>{match.date}</Text>
                </View>
                <View style={styles.info_match}>
                  <Ionicons name="time-outline" size={24} color="orange" />
                  <Text style={styles.matchtext}>{match.heure}</Text>
                </View>
                <View style={styles.info_match}>
                  <MaterialCommunityIcons
                    name="google-maps"
                    size={24}
                    color="orange"
                  />
                  <Text style={styles.matchtext}>{match.terrain_id}</Text>
                </View>
              </View>
              <View>
                <Text> {match.nbrParticipants} places restantes!</Text>

                <Button
                  icon="basketball"
                  mode="contained"
                  style={styles.button}
                  onPress={() => navigation.navigate("Match", { match })}
                >
                  Voir plus
                </Button>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    backgroundColor: "orange",
    color: "white",
  },

  global_match: {
    flexDirection: "column",
    marginTop: 5,
    padding: 5,
    borderBottomColor: "black",
    elevation: 2,
  },

  dimension_match: {
    width: "auto",
    height: "auto",
    flexDirection: "row",
    alignItems: "center",
  },

  details_match: {
    flex: 1,
    marginLeft: 15,
  },

  info_match: {
    flexDirection: "row",
    alignItems: "center",
  },

  titleText: {
    textDecorationLine: "underline",
    fontSize: 15,
    fontWeight: "bold",
  },

  matchtext: {
    fontSize: 15,
    paddingLeft: 5,
  },

  size_img: {
    width: 80,
    height: 80,
    padding: 10,
  },
});

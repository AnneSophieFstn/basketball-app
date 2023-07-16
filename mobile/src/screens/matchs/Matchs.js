import React, { Component, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import Match from "../../components/match/Match";
import configDB from "../../database/database";

export default function Matchs() {
  const [matchs, setMatchs] = useState([]);

  useEffect(() => {
    configDB.get("/matchs").then((response) => {
      setMatchs(response.data);
    });
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Button
          icon="home-group"
          color="orange"
          onPress={() => navigation.navigate("Ajouter un match")}
        >
          Ajouter un match
        </Button>

        {matchs.length > 0 ? (
          <Match matchs={matchs} />
        ) : (
          <Text>Pas de matchs</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

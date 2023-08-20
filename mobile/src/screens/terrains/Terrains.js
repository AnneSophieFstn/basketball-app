import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import configDB from "../../database/database";
import { Button } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import CardComponent from "../../components/card/CardComponent";

export default function Terrains({ navigation }) {
  const [terrains, setTerrains] = useState([]);

  useEffect(() => {
    configDB.get("/terrains").then((response) => {
      setTerrains(response.data);
    });
  }, []);

  return (
    <View>
      <Button
        titleStyle={{ color: "white" }}
        buttonStyle={{
          backgroundColor: "red",
        }}
        onPress={() => navigation.navigate("Ajouter un terrain")}
      >
        <Ionicons
          name="basketball"
          size={15}
          color="#FF9A62"
          style={{ marginRight: 5 }}
        />
        Ajouter un terrain
      </Button>
      <ScrollView>
        <View>
          {terrains.map((terrain) => (
            <CardComponent
              navigation={navigation}
              key={terrain.id}
              id={terrain.id}
              name={terrain.name}
              adresse={terrain.adresse}
              latitude={terrain.latitude}
              longitude={terrain.longitude}
              nbrTerrains={terrain.nbrTerrains}
              nbrPaniers={terrain.nbrPaniers}
              routeApi="terrains"
              routeName="VueCard"
              title="Terrain"
              titleBtn="SIGNALER MA PRÉSENCE"
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

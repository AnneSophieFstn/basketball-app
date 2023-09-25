import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import configDB from "../../database/database";
import CardComponent from "../../components/card/CardComponent";
import { Button } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";

export default function Evenements({ navigation }) {
  const [evenements, setEvenements] = useState([]);

  useEffect(() => {
    configDB.get("/evenements").then((response) => {
      setEvenements(response.data);
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Button
        titleStyle={{ color: "white" }}
        buttonStyle={{
          backgroundColor: "red",
        }}
        onPress={() => navigation.navigate("Ajouter un evenement")}
      >
        <Ionicons
          name="basketball"
          size={15}
          color="#FF9A62"
          style={{ marginRight: 5 }}
        />
        Ajouter un évènement
      </Button>
      <ScrollView>
        <View>
          {evenements.map((evenement) => (
            <CardComponent
              navigation={navigation}
              key={evenement.id}
              id={evenement.id}
              name={evenement.name}
              type={evenement.type}
              date={evenement.date}
              heure={evenement.heure}
              payant={evenement.payant}
              description={evenement.description}
              nbrPlaces={evenement.nbrPlaces}
              terrain_id={evenement.terrain_id}
              user_id={evenement.user_id}
              routeApi="evenements"
              routeName="VueCard"
              title="Evenement"
              titleBtn="PARTICIPER À L'ÉVÈNEMENT"
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

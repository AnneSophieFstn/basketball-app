import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Button } from "@rneui/themed";
import configDB from "../../database/database";
import CardComponent from "../../components/card/CardComponent";
import { Ionicons } from "@expo/vector-icons";

export default function Matchs({ navigation }) {
  const [matchs, setMatchs] = useState([]);

  useEffect(() => {
    configDB.get("/matchs").then((response) => {
      console.log(response.data[0]);
      setMatchs(response.data);
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Button
        titleStyle={{ color: "white" }}
        buttonStyle={{
          backgroundColor: "red",
        }}
        onPress={() => navigation.navigate("Ajouter un match")}
      >
        <Ionicons
          name="basketball"
          size={15}
          color="#FF9A62"
          style={{ marginRight: 5 }}
        />
        Ajouter un match
      </Button>
      <ScrollView>
        <View>
          {matchs.map((match) => (
            <CardComponent
              navigation={navigation}
              key={match.id}
              id={match.id}
              image={match.terrain.image}
              name={match.name}
              type={match.type}
              date={match.date}
              heure={match.heure}
              description={match.description}
              nbrParticipants={match.nbrParticipants}
              terrain_id={match.terrain_id}
              user_id={match.user_id}
              routeApi="matchs"
              routeName="VueCard"
              title="Match"
              titleBtn="PARTICIPER AU MATCH"
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

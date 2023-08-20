import * as React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import Playground from "../../../assets/playground.jpg";
import { Button } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import ButtonComponent from "../button/ButtonComponent";
import DeleteComponent from "./DeleteComponent";
import configDB from "../../database/database";

export default function VueCard({ navigation, route }) {
  const { data } = route.params;
  const [visible, setVisible] = React.useState(false);
  const [adresseT, setAdresseT] = React.useState(data.terrain_id);

  console.log("TERRAIN DATA: ", data);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  React.useEffect(() => {
    navigation.setOptions({ title: data.title });

    configDB.get(`/terrains/${data.terrain_id}`).then((response) => {
      setAdresseT(response.data.adresse);
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Image source={Playground} style={{ width: "100%", height: 250 }} />
      </View>
      <View
        style={{
          alignItems: "center",
          position: "absolute",
          left: 0,
          right: 0,
          top: "28%",
          bottom: 0,
          backgroundColor: "white",
          borderRadius: 30,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            padding: 15,
            width: "100%",
          }}
        >
          {data.title == "Evenement" ? (
            <Button
              buttonStyle={{
                borderRadius: 50,
              }}
              color="#F24E1E"
              onPress={() =>
                navigation.navigate("Modifier un evenement", { data: data })
              }
            >
              <Ionicons name="pencil" size={15} color="white" />
            </Button>
          ) : null}

          {data.title == "Match" ? (
            <Button
              buttonStyle={{
                borderRadius: 50,
              }}
              color="#F24E1E"
              onPress={() =>
                navigation.navigate("Modifier un match", { data: data })
              }
            >
              <Ionicons name="pencil" size={15} color="white" />
            </Button>
          ) : null}

          {data.title == "Terrain" ? (
            <Button
              buttonStyle={{
                borderRadius: 50,
              }}
              color="#F24E1E"
              onPress={() =>
                navigation.navigate("Modifier un terrain", { data: data })
              }
            >
              <Ionicons name="pencil" size={15} color="white" />
            </Button>
          ) : null}
          <Text>{data.name}</Text>
          <Button
            onPress={() => {
              toggleOverlay();
            }}
            buttonStyle={{
              borderRadius: 50,
            }}
            color="#ED1C25"
          >
            <Ionicons name="trash" size={15} color="white" />
          </Button>
          <DeleteComponent
            visible={visible}
            toggleOverlay={toggleOverlay}
            data={data}
            navigation={navigation}
          />
        </View>
        <View style={{ alignItems: "center", padding: 5 }}>
          <Text style={{ color: "#595959" }}>
            {adresseT} {data.adresse}
          </Text>
        </View>

        <View
          style={{
            borderWidth: 0.5,
            borderColor: "rgba(0, 0, 0, 0.1)",
            width: "50%",
            justifyContent: "center",
            alignItems: "center",
            margin: 20,
          }}
        ></View>
        {data.nbrPaniers && data.nbrTerrains && (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
              margin: 30,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#595959" }}>Nombre de panier(s)</Text>
              <Text style={{ color: "#EF6C32" }}>{data.nbrPaniers}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#595959" }}>Nombre de terrain(s)</Text>
              <Text style={{ color: "#EF6C32" }}>{data.nbrTerrains}</Text>
            </View>
          </View>
        )}

        {/* EVENEMENTS & MATCHS */}
        {data.type && data.date && data.heure && (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
              margin: 20,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#595959" }}>Type</Text>
              <Text style={{ color: "#EF6C32" }}>{data.type}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#595959" }}>Date</Text>
              <Text style={{ color: "#EF6C32" }}>{data.date}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#595959" }}>Heure</Text>
              <Text style={{ color: "#EF6C32" }}>{data.heure}</Text>
            </View>
          </View>
        )}
        {data.payant && (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
              margin: 30,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#595959" }}>Payant</Text>
              <Text style={{ color: "#EF6C32" }}>{data.payant}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#595959" }}>Accessible</Text>
              <Text style={{ color: "#EF6C32" }}>Tout âge</Text>
            </View>
          </View>
        )}
        <View
          style={{
            borderWidth: 0.5,
            borderColor: "rgba(0, 0, 0, 0.1)",
            width: "50%",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></View>
        <View style={{ marginTop: 30 }}>
          <Text>{data.description}</Text>
        </View>
        <View style={{ margin: 50 }}>
          <ButtonComponent titleBtn={data.titleBtn} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#eaeaea",
  },
});

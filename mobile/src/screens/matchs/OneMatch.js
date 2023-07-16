import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import {
  successToast,
  errorToast,
} from "../../components/Toast/ToastMessage.js";
import configDB from "../../database/database";

export default function OneMatch({ route, navigation }) {
  const { match } = route.params;

  const deleteData = (id) => {
    configDB({
      url: "/matchs/supprimer/" + match.id,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        id: match.id,
      }),
    })
      .then((response) => {
        //response.text();
        successToast();
        navigation.push("Home", { screen: "Matchs" });
      })
      .catch(() => {
        errorToast();
      });
  };
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const deleteModal = (deleteModalVisible) => {
    setDeleteModalVisible(deleteModalVisible);
  };
  return (
    <View style={styles.container}>
      {/* <DeleteButton
        deleteModalVisible={deleteModalVisible}
        deleteModal={deleteModal}
        deleteData={deleteData}
        dataId={match}
      /> */}

      <View>
        <Pressable
          style={[
            styles.buttonDelete,
            styles.buttonOpen,
            styles.roundButtonEdit,
            { top: 0, right: 35, zIndex: 0.5 },
          ]}
          onPress={() =>
            navigation.navigate("Modifier match", { match: match })
          }
        >
          <MaterialCommunityIcons name="pencil" size={20} color="white" />
        </Pressable>

        <Pressable
          style={[
            styles.buttonDelete,
            styles.buttonOpen,
            styles.roundButtonDelete,
            { top: 0, right: 0, zIndex: 0.5 },
          ]}
          onPress={() => setDeleteModalVisible(true)}
        >
          <MaterialCommunityIcons
            name="delete-forever"
            size={20}
            color="white"
          />
        </Pressable>
      </View>

      {/* Image */}
      <Image
        style={styles.size_img}
        source={require("../../../assets/street-basketball.jpg")}
      />

      {/* name */}
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textDecorationLine: "underline",
          }}
        >
          {match.name}
        </Text>
      </View>

      <View style={{ paddingLeft: 5 }}>
        <Text
          style={{
            color: "orange",
            fontSize: 15,
            fontWeight: "bold",
            textDecorationLine: "underline",
          }}
        >
          Informations:
        </Text>
      </View>

      {/* date */}
      <View style={{}}>
        <View style={styles.inputSection1}>
          <MaterialCommunityIcons
            style={{ paddingRight: 5 }}
            name="calendar-range"
            size={24}
            color="orange"
          />

          <Text style={styles.infoText}>Date & Heure:</Text>
        </View>
        <View style={{ paddingLeft: 15 }}>
          <Text>
            {match.date} à {match.heure}
          </Text>
        </View>
      </View>

      {/* adresse */}
      <View style={{}}>
        <View style={styles.inputSection1}>
          <MaterialCommunityIcons
            style={{ paddingRight: 5 }}
            name="google-maps"
            size={24}
            color="orange"
          />
          <Text style={styles.infoText}>Adresse du match:</Text>
        </View>
        <View style={{ margin: 1, padding: 5 }}>
          <Text>{match.terrain_id.adresse}</Text>
        </View>
      </View>

      {/* type */}
      <View style={{}}>
        <View style={styles.inputSection1}>
          <MaterialCommunityIcons
            style={{ paddingRight: 5 }}
            name="text-box-check-outline"
            size={24}
            color="orange"
          />
          <Text style={styles.infoText}>Type de match:</Text>
        </View>
        <View style={{ paddingLeft: 15 }}>
          <Text>{match.typeMatch}</Text>
        </View>
      </View>

      {/* nbrPlaces */}
      <View style={{}}>
        <View style={styles.inputSection1}>
          <MaterialCommunityIcons
            style={{ paddingRight: 5 }}
            name="counter"
            size={24}
            color="orange"
          />

          <Text style={styles.infoText}>Place disponible:</Text>
        </View>
        <View style={{ paddingLeft: 15 }}>
          <Text>{match.nbrParticipants}</Text>
        </View>
      </View>

      {/* description */}
      <View style={{}}>
        <View style={styles.inputSection1}>
          <MaterialCommunityIcons
            style={{ paddingRight: 5 }}
            name="party-popper"
            size={24}
            color="orange"
          />

          <Text style={styles.infoText}>Description du match:</Text>
        </View>
        <View style={{ paddingLeft: 15 }}>
          <Text>{match.description}</Text>
        </View>
      </View>

      <View>
        <View>
          <Button
            color="orange"
            mode="outlined"
            style={styles.button}
            onPress={() => console.log("Pressed")}
          >
            Participer au match
          </Button>
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  button: {
    margin: 20,
    borderRadius: 50,
    backgroundColor: "rgba(240, 254, 255, .2)",
  },

  buttonDelete: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  roundButtonEdit: {
    position: "absolute",
    backgroundColor: "rgba(0, 255, 0, .9)",
    padding: 5,
    borderRadius: 25,
  },

  roundButtonDelete: {
    position: "absolute",
    backgroundColor: "rgba(255, 0, 0, .9)",
    padding: 5,
    borderRadius: 25,
  },

  inputSection1: {
    flexDirection: "row",
    alignItems: "center",
    margin: 1,
    padding: 5,
  },
  size_img: {
    width: "auto",
    height: "auto",
    padding: 50,
  },

  infoText: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },

  popo: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-end",
  },
});

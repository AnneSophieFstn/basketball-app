import React, { useState } from "react";
import { Overlay, Button } from "@rneui/themed";
import { Text } from "@rneui/themed";

import { Dimensions, View } from "react-native";
import ButtonComponent from "../button/ButtonComponent";
import configDB from "../../database/database";

function DeleteComponent({ visible, toggleOverlay, data, navigation }) {
  const deleteData = async () => {
    try {
      const response = await configDB.delete(
        "/" + data.routeApi + "/" + data.id
      );
      navigation.push("Accueil", { screen: data.title + "s" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={toggleOverlay}
      overlayStyle={{ borderRadius: 30 }}
    >
      <View
        style={{
          height: Dimensions.get("window").width - 60,
          width: Dimensions.get("window").width - 40,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text h3 style={{ marginBottom: 15 }}>
          ATTENTION
        </Text>
        <View style={{ alignItems: "center", lineHeight: 20 }}>
          <Text
            style={{
              lineHeight: 40,
            }}
          >
            Vous êtes sur le point de supprimer le terrain:
          </Text>
          <Text
            style={{
              color: "#FF9A62",
              lineHeight: 40,
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            "{data.name}"
          </Text>
          <Text>Cette action est irréversible !!!</Text>
          <Text>Êtes vous sûr de votre choix ?</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 30,
          }}
        >
          <View style={{ marginRight: 20 }}>
            <ButtonComponent titleBtn="Supprimer" action={deleteData} />
          </View>
          <View>
            <Button
              type="solid"
              titleStyle={{ color: "#FF9A62" }}
              onPress={toggleOverlay}
              buttonStyle={{
                borderRadius: 30,
                backgroundColor: "rgba(240, 240, 240, 0.47)",
                paddingLeft: 30,
                paddingRight: 30,
                paddingBottom: 10,
                paddingTop: 10,
              }}
            >
              Annuler
            </Button>
          </View>
        </View>
      </View>
    </Overlay>
  );
}

export default DeleteComponent;

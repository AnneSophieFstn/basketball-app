import React, { useState } from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import configDB from "../../../database/database";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Input } from "@rneui/base";
import ButtonComponent from "../../button/ButtonComponent";

function AddTerrain() {
  const [region, setRegion] = useState({
    latitude: -21.1088145,
    longitude: 55.5380413,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0521,
  });

  const [name, setName] = useState("");
  const [adresse, setAdresse] = useState("");
  const [nbrTerrains, setNbrTerrains] = useState("");
  const [nbrPaniers, setNbrPaniers] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [user_id, setUser_id] = useState("");

  const AddTerrain = async () => {
    console.log("name", name);
    console.log("adresse", adresse.adresse);
    console.log("nbrTerrains", nbrTerrains);
    console.log("nbrPaniers", nbrPaniers);
    console.log("latitude", latitude.latitude);
    console.log("longitude", longitude.longitude);
    console.log("user_id", user_id);

    const data = {
      name: name,
      adresse: adresse.adresse,
      nbrTerrains: nbrTerrains,
      nbrPaniers: nbrPaniers,
      latitude: latitude.latitude,
      longitude: longitude.longitude,
      user_id: 1,
    };

    try {
      const response = await configDB.post("/terrains", data);
      console.log("Réponse du serveur :", response.data);
    } catch (error) {
      console.error("error", error.response.data);
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      horizontal={false}
      style={{ margin: 10 }}
    >
      <View
        style={{
          height: Dimensions.get("window").height,
          marginBottom: 50,
        }}
      >
        <View>
          <Text style={{ marginLeft: 5, marginBottom: 5, fontWeight: "bold" }}>
            Informations sur le terrain
          </Text>
          <Text style={{ marginLeft: 10, marginBottom: 5 }}>
            Donnez des infos sur ce terrain. S'il est ajouté à la carte, il sera
            visible par tout le monde.
          </Text>
        </View>
        <View>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            horizontal={true}
            contentContainerStyle={{ flex: 1, width: "100%", height: "100%" }}
          >
            <GooglePlacesAutocomplete
              placeholder="Entrer l'adresse du terrain"
              fetchDetails={true}
              onFail={(error) => console.log(error)}
              GooglePlacesSearchQuery={{
                rankby: "distance",
              }}
              onNotFound={(test) => console.log(test)}
              onTimeout={(test) => console.log(test)}
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                setRegion({
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0521,
                });
                setAdresse({ adresse: details.formatted_address });
                setLatitude({ latitude: details.geometry.location.lat });
                setLongitude({ longitude: details.geometry.location.lng });
              }}
              textInputProps={{
                leftIcon: { type: "font-awesome", name: "chevron-left" },
                errorStyle: { color: "red" },
              }}
              query={{
                key: "AIzaSyB9SoT_juNnkEbdulmO20AAfoHKyRcBvYw",
                language: "fr",
                components: "country:re",
                location: `${region.latitude}, ${region.longitude}`,
              }}
              styles={{
                //container: { flex: 0, position: "absolute", width: "100%", zIndex: 1, padding: 20 },
                listView: { backgroundColor: "white" },
              }}
            />
          </ScrollView>
        </View>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{
            width: "auto",
            height: "40%",
            margin: 10,
          }}
          region={region}
          showsUserLocation={true}
          /* ref = {ref => this.map = ref} */
        >
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            draggable={true}
          >
            <Callout>
              <Text>Je suis ici</Text>
            </Callout>
          </Marker>
        </MapView>

        <View>
          <Text>Nom du terrain</Text>
          <Input
            placeholder="Nom du terrain"
            onChangeText={(name) => setName(name)}
            value={name}
            leftIcon={<Ionicons name="basketball" size={18} color="black" />}
            containerStyle={{
              padding: 0,
              margin: 5,
            }}
            inputContainerStyle={{
              borderBottomWidth: 0,
              backgroundColor: "rgba(217, 217, 217, 0.24)",
              borderRadius: 25,
              paddingLeft: 15,
              paddingRight: 15,
            }}
          />
        </View>

        <View>
          <Text>Nombre de terrain(s)</Text>
          <Input
            keyboardType="number-pad"
            placeholder="0"
            onChangeText={(nbrTerrains) => setNbrTerrains(nbrTerrains)}
            underlineColorAndroid="transparent"
            value={nbrTerrains}
            leftIcon={
              <MaterialCommunityIcons name="numeric" size={18} color="black" />
            }
            containerStyle={{
              padding: 0,
              margin: 5,
            }}
            inputContainerStyle={{
              borderBottomWidth: 0,
              backgroundColor: "rgba(217, 217, 217, 0.24)",
              borderRadius: 25,
              paddingLeft: 15,
              paddingRight: 15,
            }}
          />
        </View>
        <View>
          <Text>Nombre de panier(s)</Text>
          <Input
            keyboardType="number-pad"
            placeholder="0"
            onChangeText={(nbrPaniers) => setNbrPaniers(nbrPaniers)}
            underlineColorAndroid="transparent"
            value={nbrPaniers}
            leftIcon={
              <MaterialCommunityIcons name="numeric" size={18} color="black" />
            }
            containerStyle={{
              padding: 0,
              margin: 5,
            }}
            inputContainerStyle={{
              borderBottomWidth: 0,
              backgroundColor: "rgba(217, 217, 217, 0.24)",
              borderRadius: 25,
              paddingLeft: 15,
              paddingRight: 15,
            }}
          />
        </View>
        <ButtonComponent titleBtn="AJOUTER" action={AddTerrain} />
      </View>
    </ScrollView>
  );
}

export default AddTerrain;

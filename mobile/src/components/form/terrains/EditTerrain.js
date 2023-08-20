import { useEffect, useRef, useState } from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import ButtonComponent from "../../button/ButtonComponent";
import { Input } from "@rneui/base";
import configDB from "../../../database/database";

function EditTerrain({ route, navigation }) {
  const { data } = route.params;
  const ref = useRef();

  const [region, setRegion] = useState({
    latitude: data.latitude,
    longitude: data.longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const [terrain, setTerrain] = useState({
    id: data["id"],
    name: data["name"],
    nbrPaniers: data["nbrPaniers"],
    adresse: data["adresse"],
    nbrTerrains: data["nbrTerrains"],
    latitude: data["latitude"],
    longitude: data["longitude"],
    user_id: data["user_id"],
  });

  const onChangeName = (value) => {
    setTerrain({ ...terrain, name: value });
  };
  const onChangeNbrPaniers = (value) => {
    setTerrain({ ...terrain, nbrPaniers: value });
  };
  const onChangeAdresse = (value) => {
    setTerrain({ ...terrain, adresse: value });
  };
  const onChangeNbrTerrains = (value) => {
    setTerrain({ ...terrain, nbrTerrains: value });
  };
  const onChangeLatitude = (value) => {
    setTerrain({ ...terrain, latitude: value });
  };
  const onChangeLongitude = (value) => {
    setTerrain({ ...terrain, longitude: value });
  };

  const EditTerrain = async () => {
    console.log(terrain.id);
    console.log(terrain.name);
    console.log(ref.current?.getAddressText());
    console.log(terrain.latitude);
    console.log(terrain.longitude.longitude);
    console.log(terrain.nbrTerrains);

    const data = {
      id: terrain.id,
      name: terrain.name,
      adresse: ref.current?.getAddressText(),
      latitude: terrain.latitude,
      longitude: terrain.longitude.longitude,
      nbrPaniers: terrain.nbrPaniers,
      nbrTerrains: terrain.nbrTerrains,
      user_id: 1,
    };
    //console.log("data inside editTerrain", data);

    try {
      const response = await configDB.put(`/terrains/${data.id}`, data);
      console.log("Réponse du serveur : ", response.data);
      navigation.push("Accueil", { screen: "Terrains" });
    } catch (error) {
      console.error("error: ", error.response);
    }
  };

  useEffect(() => {
    ref.current?.setAddressText(terrain.adresse);
  }, []);

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
            Modifier les infroamtions à propos de ce terrain. Attention, votre
            demande va être envoyé à notre administrateur pour confirmer les
            modifications.
          </Text>
        </View>

        <View>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            horizontal={true}
            contentContainerStyle={{ flex: 1, width: "100%", height: "100%" }}
          >
            <GooglePlacesAutocomplete
              ref={ref}
              placeholder="Modifier l'adresse du terrain"
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
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                });
                onChangeAdresse({ adresse: details.formatted_address });
                onChangeLatitude({ latitude: details.geometry.location.lat });
                onChangeLongitude({ longitude: details.geometry.location.lng });
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
            onChangeText={(value) => onChangeName(value)}
            value={terrain.name}
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
            onChangeText={(value) => onChangeNbrTerrains(value)}
            underlineColorAndroid="transparent"
            value={terrain.nbrTerrains.toString()}
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
            onChangeText={(value) => onChangeNbrPaniers(value)}
            underlineColorAndroid="transparent"
            value={terrain.nbrPaniers.toString()}
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
        <ButtonComponent titleBtn="MODIFIER" action={EditTerrain} />
      </View>
    </ScrollView>
  );
}

export default EditTerrain;

import MapView from "react-native-maps";
import { StyleSheet, Text, View } from "react-native";
import { PROVIDER_GOOGLE } from "react-native-maps";

export default function Maps() {
  let initialState = {
    latitude: -21.1088145,
    longitude: 55.5380413,
    latitudeDelta: 0.7,
    longitudeDelta: 0.7,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={initialState}
        showsUserLocation={true}
      />
    </View>
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

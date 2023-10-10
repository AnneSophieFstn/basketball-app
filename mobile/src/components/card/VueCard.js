import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import Playground from "../../../assets/playground.jpg";
import { Button, Card, Icon } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import ButtonComponent from "../button/ButtonComponent";
import DeleteComponent from "./DeleteComponent";
import configDB from "../../database/database";

export default function VueCard({ navigation, route }) {
  const { data } = route.params;
  const [visible, setVisible] = React.useState(false);

  const [matchs, setMatchs] = React.useState([]);
  const [evenements, setEvenements] = React.useState([]);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  React.useEffect(() => {
    navigation.setOptions({ title: data.title });

    configDB.get(`/matchs/terrain/${data.id}`).then((response) => {
      setMatchs(response.data);
    });

    configDB.get(`/evenements/terrain/${data.id}`).then((response) => {
      setEvenements(response.data);
    });
  }, []);

  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <View>
          <Image
            source={{
              uri: `${configDB.defaults.baseURL}/${data.image}`,
            }}
            style={{ width: "100%", height: 250 }}
          />
        </View>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 30,
            alignItems: "center",
            left: 0,
            right: 0,
            top: -28,
            bottom: 0,
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
            <Text style={{ color: "#595959" }}>{data.adresse}</Text>
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

          {data.title == "Match" && data.title == "Evenement" ? (
            <View style={{ margin: 50 }}>
              <ButtonComponent titleBtn={data.titleBtn} />
            </View>
          ) : null}

          {/* TERRAINS MATCHS // EVENEMENTS */}
          {data.title == "Terrain" ? (
            <View
              style={{
                width: Dimensions.get("window").width - 20,
              }}
            >
              <Text>MATCH PRÉVUS</Text>
              {/* BLOC PRINCIPALE */}
              {matchs.slice(0, 1).map((match, index) => (
                <View
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 10,
                    marginBottom: 10,
                    padding: 5,
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: "rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {/* BLOC IMAGE */}
                  <View>
                    <Image
                      style={{
                        width: 90,
                        height: 90,
                        padding: 0,
                        borderRadius: 10,
                      }}
                      source={{
                        uri: "https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg",
                      }}
                    />
                  </View>
                  {/* BLOC INFOS */}
                  <View
                    style={{
                      marginLeft: 8,
                    }}
                  >
                    <Text style={{ fontSize: 20 }}>{match.name}</Text>

                    <Text>
                      <Text style={{ color: "#FF9A62" }}>{match.type}</Text>
                      <Text> le </Text>
                      <Text style={{ color: "#FF9A62" }}>{match.date}</Text>
                      <Text> à </Text>
                      <Text style={{ color: "#FF9A62" }}>{match.heure}</Text>
                    </Text>

                    <Text>
                      <Text style={{ fontSize: 12, color: "#FF9A62" }}>
                        {match.nbrParticipants} places
                      </Text>
                      <Text style={{ fontSize: 12 }}> restantes!</Text>
                    </Text>

                    <Text style={{ fontSize: 13, color: "#595959" }}>
                      24 avenue de Chicago, Saint-Denis - La Réunion
                    </Text>
                  </View>
                </View>
              ))}

              {/* Affichez le bouton "Voir plus" uniquement s'il y a plus de 1 match */}
              {matchs.length > 1 && (
                <Button
                  type="outline"
                  onPress={() => {
                    // Redirigez vers une autre page pour afficher tous les matchs
                    navigation.navigate("PageTousLesMatchs", {
                      matchs: matchs,
                    });
                  }}
                  titleStyle={{ color: "#FF9A62" }}
                  buttonStyle={{
                    borderColor: "#FF9A62",
                    borderRadius: 30,
                    backgroundColor: "transparent",
                    paddingLeft: 30,
                    paddingRight: 30,
                    paddingBottom: 10,
                    paddingTop: 10,
                  }}
                >
                  Voir plus...
                </Button>
              )}

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

              {/* EVENEMENTS */}
              <Text>ÉVENEMENTS PRÉVUS</Text>
              {/* BLOC PRINCIPALE */}
              {evenements.slice(0, 1).map((evenement, index) => (
                <View
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 10,
                    marginBottom: 10,
                    padding: 5,
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: "rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {/* BLOC IMAGE */}
                  <View>
                    <Image
                      style={{
                        width: 90,
                        height: 90,
                        padding: 0,
                        borderRadius: 10,
                      }}
                      source={{
                        uri: "https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg",
                      }}
                    />
                  </View>
                  {/* BLOC INFOS */}
                  <View
                    style={{
                      marginLeft: 8,
                    }}
                  >
                    <Text style={{ fontSize: 20 }}>{evenement.name}</Text>

                    <Text>
                      <Text style={{ color: "#FF9A62" }}>{evenement.type}</Text>
                      <Text> le </Text>
                      <Text style={{ color: "#FF9A62" }}>{evenement.date}</Text>
                      <Text> à </Text>
                      <Text style={{ color: "#FF9A62" }}>
                        {evenement.heure}
                      </Text>
                    </Text>

                    <Text>
                      <Text style={{ fontSize: 12, color: "#FF9A62" }}>
                        {evenement.nbrParticipants} places
                      </Text>
                      <Text style={{ fontSize: 12 }}> restantes!</Text>
                    </Text>

                    <Text style={{ fontSize: 13, color: "#595959" }}>
                      24 avenue de Chicago, Saint-Denis - La Réunion
                    </Text>
                  </View>
                </View>
              ))}

              {/* Affichez le bouton "Voir plus" uniquement s'il y a plus de 1 evenement */}
              {evenements.length > 1 && (
                <Button
                  type="outline"
                  onPress={() => {
                    // Redirigez vers une autre page pour afficher tous les evenements
                    navigation.navigate("PageTousLesMatchs", {
                      evenements: evenements,
                    });
                  }}
                  titleStyle={{ color: "#FF9A62" }}
                  buttonStyle={{
                    borderColor: "#FF9A62",
                    borderRadius: 30,
                    backgroundColor: "transparent",
                    paddingLeft: 30,
                    paddingRight: 30,
                    paddingBottom: 10,
                    paddingTop: 10,
                  }}
                >
                  Voir plus
                </Button>
              )}
            </View>
          ) : null}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#eaeaea",
  },
});

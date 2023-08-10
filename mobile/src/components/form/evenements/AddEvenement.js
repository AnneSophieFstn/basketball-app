import * as React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Input } from "@rneui/themed";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SelectList } from "react-native-dropdown-select-list";
import ButtonComponent from "../../button/ButtonComponent";
import configDB from "../../../database/database";

function AddEvenement() {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [nbrPlaces, setNbrPlaces] = React.useState("");
  const [payant, setPayant] = React.useState("");
  const [typeEvenement, setTypeEvenement] = React.useState("");
  const [terrain_id, setTerrain_id] = React.useState("");
  const [date, setDate] = React.useState(new Date());
  const [originalfullDate, setOriginalfullDate] = React.useState("");
  const [fullDate, setfullDate] = React.useState("");
  const [heure, setHeure] = React.useState("");
  const [time, setTime] = React.useState(new Date());

  const [dataListTerrains, setDataListTerrains] = React.useState([]);
  const [selected, setSelected] = React.useState("");

  const [show, setShow] = React.useState(false);
  const [showTime, setShowTime] = React.useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getFullYear() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getDate();

    setDate(currentDate);
    setfullDate(fDate);
    setOriginalfullDate(fDate);
    setShow(false);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;

    let tempTime = new Date(currentTime);
    let fTime =
      tempTime.getHours() +
      ":" +
      tempTime.getMinutes() +
      ":" +
      tempTime.getSeconds();

    setTime(selectedTime);
    setHeure(fTime);
    setShowTime(false);
  };

  const listTypeEvenement = [
    { key: "1v1", value: "1v1" },
    { key: "2v2", value: "2v2" },
    { key: "3v3", value: "3v3" },
    { key: "4v4", value: "4v4" },
    { key: "5v5", value: "5v5" },
  ];

  const estPayant = [
    { key: "Oui", value: "Oui" },
    { key: "Non", value: "Non" },
  ];

  const addDataEvenement = async () => {
    const data = {
      name: name,
      date: originalfullDate,
      heure: heure,
      description: description,
      nbrPlaces: nbrPlaces,
      payant: payant,
      type: typeEvenement,
      terrain_id: selected,
      user_id: 1,
    };

    try {
      const response = await configDB.post("/evenements", data);
      console.log("Réponse du serveur :", response.data);
    } catch (error) {
      console.error("error", error.response.data);
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await configDB.get("/terrains");
        let listTerrains = response.data.map((item) => {
          return { key: item.id, value: item.name };
        });
        setDataListTerrains(listTerrains);
      } catch (error) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView style={{ margin: 10 }}>
      <View>
        <View>
          <Text>Localisation du terrain</Text>
          <SelectList
            searchPlaceholder="Rechercher le nom du terrain"
            placeholder="Rechercher le nom du terrain"
            setSelected={(valType) => setSelected(valType)}
            data={dataListTerrains}
            inputStyles={{ color: "gray" }}
            boxStyles={{
              borderRadius: 30,
              backgroundColor: "rgba(217, 217, 217, 0.24)",
              borderColor: "rgba(217, 217, 217, 0.24)",
              margin: 5,
            }}
          />
        </View>
        <View>
          <Text>Nom de l'évènement</Text>
          <Input
            placeholder="Entrer le nom de votre évènement"
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
          <Text>Date</Text>
          <TouchableOpacity activeOpaticy={1} onPress={() => setShow(true)}>
            <Input
              placeholder="Selectionner la Date"
              value={fullDate}
              editable={false}
              leftIcon={<Ionicons name="calendar" size={18} color="black" />}
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
          </TouchableOpacity>
          {show && (
            <DateTimePicker mode="date" value={date} onChange={onChange} />
          )}
        </View>
        <View>
          <Text>Heure</Text>
          <TouchableOpacity activeOpaticy={1} onPress={() => setShowTime(true)}>
            <Input
              placeholder="Choisisser votre heure"
              value={heure}
              editable={false}
              leftIcon={<Ionicons name="time" size={18} color="black" />}
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
          </TouchableOpacity>
          {showTime && (
            <DateTimePicker mode="time" value={time} onChange={onChangeTime} />
          )}
        </View>
        <View>
          <Text>Payant</Text>
          <SelectList
            setSelected={(valType) => setPayant(valType)}
            search={false}
            data={estPayant}
            save="value"
            defaultOption={{ key: "Oui", value: "Oui" }}
            inputStyles={{ color: "gray" }}
            boxStyles={{
              borderRadius: 30,
              backgroundColor: "rgba(217, 217, 217, 0.24)",
              borderColor: "rgba(217, 217, 217, 0.24)",
              margin: 5,
            }}
          />
        </View>
        <View>
          <Text>Nombre de places</Text>
          <Input
            placeholder="0"
            keyboardType="number-pad"
            onChangeText={(nbrPlaces) => setNbrPlaces(nbrPlaces)}
            value={nbrPlaces}
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
          <Text>Type d'évènement</Text>
          <SelectList
            setSelected={(valType) => setTypeEvenement(valType)}
            search={false}
            data={listTypeEvenement}
            save="value"
            defaultOption={{ key: "1v1", value: "1v1" }}
            inputStyles={{ color: "gray" }}
            boxStyles={{
              borderRadius: 30,
              backgroundColor: "rgba(217, 217, 217, 0.24)",
              borderColor: "rgba(217, 217, 217, 0.24)",
              margin: 5,
            }}
          />
        </View>
        <View>
          <Text>Description</Text>
          <Input
            multiline
            textAlignVertical="top"
            style={{ fontSize: 16, height: 120 }}
            placeholder="Dites nous quelques mots à propos de votre évènement..."
            onChangeText={(description) => setDescription(description)}
            value={description}
            leftIcon={<Ionicons name="text" size={18} color="black" />}
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
        <ButtonComponent titleBtn="AJOUTER" action={addDataEvenement} />
      </View>
    </ScrollView>
  );
}

export default AddEvenement;

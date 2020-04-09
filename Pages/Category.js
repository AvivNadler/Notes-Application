import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
  AsyncStorage
} from "react-native";
import { Card } from "react-native-elements";
import { Avatar, Badge, Icon, withBadge } from "react-native-elements";

export default class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cat: this.props.navigation.getParam("category", "no category"),
      noteArr: [],
      length: 0
    };
  }

  componentDidMount() {
    this.retrieveData();
  }
  retrieveData = async () => {
    let temp = JSON.parse(await AsyncStorage.getItem("NOTES"));
    this.setState({ noteArr: temp === null ? [] : temp });
  };

  removeNote = data => {
    let tempArr = this.state.noteArr;
    for (var i = 0; i < this.state.noteArr.length; i++) {
      if (i == data) {
        tempArr.splice(i, 1);
      }
    }
    this.storeData(tempArr);
    this.setState({ noteArr: tempArr });
  };

  storeData = arr => {
    AsyncStorage.setItem("NOTES", JSON.stringify(arr));
  };

  btnOpenGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({});
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ color: "black", fontSize: 40, marginTop: 20 }}>
          {this.state.cat}
        </Text>
        <Badge value={this.state.noteArr.length} status="error"></Badge>
        <Text>Notes in the current category</Text>
        <ScrollView>
          {this.state.noteArr.map(
            (value, key) =>
              value.id === this.state.cat && (
                <Card title={value.title}>
                  <Image
                    style={{ width: 200, height: 150, alignSelf: "center" }}
                    source={{ uri: value.image }}
                  ></Image>
                  <Text style={{ marginBottom: 10 }}>{value.description}</Text>

                  <TouchableOpacity onPress={() => this.removeNote(key)}>
                    <Image
                      style={{ width: 40, height: 40, alignSelf: "center" }}
                      source={{ uri: "https://i.imgur.com/czLII89.png" }}
                    />
                  </TouchableOpacity>
                </Card>
              )
          )}
          <Text>Click the green + to add a new note</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Note", {
                category: this.state.cat
              });
            }}
          >
            <Image
              style={{ width: 40, height: 40, alignSelf: "center" }}
              source={{ uri: "https://i.imgur.com/RP7aD2M.png" }}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start"
  }
});

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  AsyncStorage,
  ScrollView
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Image } from "react-native";
import CategoryClass from './Classes/NoteClass';
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'



export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesArr: [],
      newCategory: "",
      catNotes:[],
      index:0
    };
  }
  

  componentDidMount() {
    this.retrieveData();
  }
  retrieveData = async () => {
    let tempCat = JSON.parse(await AsyncStorage.getItem("Categories"));
    this.setState({ categoriesArr: tempCat === null ? [] : tempCat});
  };

  textChanged = event => {
    this.setState({ newCategory: event });
  };

  addCategory = () => {
    if(this.state.newCategory=="")
    {
      alert("Please insert category name!")
    }
    else
    {
    let tempCat = this.state.categoriesArr;
    tempCat.push(this.state.newCategory);
    this.storeData(tempCat);
    this.setState({ categoriesArr: tempCat });
    }
  };

  storeData = arr => {
    AsyncStorage.setItem("Categories", JSON.stringify(arr));
  };

  removeCategory = data => {
    let tempArr = this.state.categoriesArr;
    for (var i = 0; i < this.state.categoriesArr.length; i++) {
      if (i == data) {
        tempArr.splice(i, 1);
      }
    }
    this.storeData(tempArr);
    this.setState({ noteArr: tempArr });
  };


  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20
          }}
        >
          <Text style={{ color: "Black", fontSize: 40, fontWeight: "bold" }}>
            Igroup17 Notes{" "}
          </Text>
          <Image
            source={{ uri: "https://i.imgur.com/x1ckCwN.jpg" }}
            style={{ width: 40, height: 40 }}
          />
 
        </View>
        <Text style={{ color: "Black", fontSize: 20, marginTop:10 }}>
There are <Badge status='warning' value={this.state.categoriesArr.length}></Badge> Categories of Notes          </Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ margin: 20, justifyContent: "space-between" }}>
            {this.state.categoriesArr.map((value, key) => (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.push("Category", { category: value });
                  }}
                >
                  <Text style={styles.button}>{value}</Text>
                                 </TouchableOpacity>
                <TouchableOpacity onPress={() => this.removeCategory(key)}>
                  <Image
                    style={{ width: 40, height: 40, alignSelf: "center" }}
                    source={{ uri: "https://i.imgur.com/czLII89.png" }}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TextInput
              style={{ height: 40, borderColor: "#ADD8E6", borderWidth: 3 }}
              onChangeText={this.textChanged}
              placeholder="Add New Category"
            ></TextInput>

            <TouchableOpacity onPress={this.addCategory}>
              <Image
                style={{
                  width: 40,
                  height: 40,
                  alignSelf: "center",
                  marginLeft: 20
                }}
                source={{ uri: "https://i.imgur.com/RP7aD2M.png" }}
              />
            </TouchableOpacity>
          </View>
          <View></View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  button: {
    color: "black",
    fontSize: 20,
    margin: 5,
    borderColor: "steelblue",
    borderWidth: 2,
    padding: 15,
    backgroundColor: "powderblue",
    textAlign: "center"
  }
});

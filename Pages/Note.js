import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, AsyncStorage, ScrollView, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import noteClass from './Classes/NoteClass';
import CameraGo from './CameraGo';


export default class Note extends React.Component {
    static navigationOptions = {
        title: 'New Note',
    };

    constructor(props) {      
        super(props);
        this.state = {
            image:  null,
            title: "",
            desc: "",
            id: this.props.navigation.getParam('category', "no category"),
            noteArr: [],
            showCamera:false
        }
        
    }

    componentDidMount(){     
        
        this.retrieveData();
    }

    retrieveData = async () => {
        let temp = JSON.parse(await AsyncStorage.getItem('NOTES'));
        this.setState({ noteArr: temp === null ? [] : temp })
    }

    titleChanged = (event) => {
        this.setState({ title: event })
    }

    descChanged = (event) => {
        
        this.setState({ desc: event })
    }

    btnOpenGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        });
        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };

    btnSave = () => {
        if(this.state.titl=="" || this.state.desc=="")
        {alert("Please insert title and description")}
        else{
        let newNote = new noteClass(this.state.id, this.state.title, this.state.desc, this.state.image);
        let tempArr = this.state.noteArr;
        tempArr.push(newNote);
        this.storeData(tempArr);
        this.setState({ noteArr: tempArr });
        alert("Your Note Has Been Saved!")
        this.props.navigation.navigate('Home');         
    }
    }

    storeData = (arr) => {   
        AsyncStorage.setItem('NOTES', JSON.stringify(arr));
    }
    setCamera = ()=>{
        this.setState({showCamera:true})
    }
    getImage=(imageUri)=>{
        this.setState({
            image:imageUri,
            showCamera:false
        })
    }
    render() {
        let { image,showCamera } = this.state;
        if (showCamera) {
            return (<CameraGo getImage={this.getImage} />)
        }
        return (
            <View style={styles.container}>
                <Text style={{ color: 'black', fontSize: 28, margin: 15 }}>Create New Note</Text>
                < ScrollView>
                    <View style={{ flexDirection: "row", marginBottom: 30 }}>
                        <Text style={{ fontSize: 20, marginRight: 20 }}>Note Title:</Text>
                        <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 200 }} onChangeText={text=>this.titleChanged(text)}></TextInput>
                    </View>
                    <View style={{ flexDirection: "columb" }}>
                        <Text style={{ fontSize: 20, marginRight: 20 }}>Note Description:</Text>
                        <TextInput style={{ height: 200, borderColor: 'gray', borderWidth: 1, width: 350,paddingTop:0 }} onChangeText={text=>this.descChanged(text)}></TextInput>
                    </View>
                    <View style={styles.Content}>
                        <Text style={{ fontSize: 20, marginTop: 20 }}>Note Picture:</Text>
                        

                        <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "left"
            }}
          >
            <Text
              style={{color: 'rgb(100,150,250)',fontSize:20, height: 40, width:200 , borderColor: "powderblue", borderWidth: 3 }}
              
            >Upload From Gallery</Text>

            <TouchableOpacity onPress={this.btnOpenGallery}>
              <Image
                style={{
                  width: 40,
                  height: 40,
                  alignSelf: "center",
                  marginLeft: 20
                }}
                source={{ uri: "https://i.imgur.com/pDSaqvx.png" }}
              />
            </TouchableOpacity>
          </View>
                        
                        
                        
                        

                  
                        
                        <TouchableOpacity onPress={this.setCamera}>
                        <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "left",
              marginTop:20
            }}
          >
                            <Text style={{ color: 'rgb(100,150,250)', fontSize: 20, alignSelf: "center", marginTop:20 }} >Take A picture</Text>
                            <Image
                style={{
                  width: 40,
                  height: 40,
                  alignSelf: "center",
                  marginLeft: 20
                }}
                source={{ uri: "https://i.imgur.com/1na5RKU.png" }}
              /></View>
                        </TouchableOpacity>
                        {image &&
                            <Image source={{ uri: image }} style={{ width: 200, height: 200, alignSelf: "center" }} />}
                    </View>
                    <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop:20
            }}
          ><Text style={{ color: 'rgb(100,150,250)', fontSize: 20, alignSelf: "center", marginTop:20 }} >Save</Text>
                    <TouchableOpacity onPress={this.btnSave}>
                    <Image style={{width: 50, height: 50, alignSelf:'center',marginLeft: 20}} source={{uri:'https://i.imgur.com/ighN9Gm.png'}}/>
                        </TouchableOpacity>
                        </View>
                </ScrollView>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});
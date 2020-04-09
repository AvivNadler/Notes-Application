import React from 'react';
import { StyleSheet, Button, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import styles from './pageStyle';
import { Camera } from 'expo-camera';

export default class CameraGo extends React.Component {
    static navigationOptions = {
        title: 'CAMERA',
    };
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            photoUri: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
        }
    }

    async componentDidMount() {
        const { status } = await Camera.requestPermissionsAsync();
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    btnSnap = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync({ quality: 0.2 });
            this.setState({ photoUri: photo.uri },()=>{
                this.props.getImage(this.state.photoUri)
            });
            
        }
    };

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.Content}>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{
                                flex: 1, width: 420,
                                justifyContent: 'flex-end', borderColor: 'black', borderWidth: 1
                            }}>
                                <Camera
                                    ref={ref => { this.camera = ref; }}
                                    style={{ flex: 1 }}
                                    type={this.state.type}>
                                    <View
                                        style={{
                                            flex: 1,
                                            backgroundColor: 'transparent',
                                            flexDirection: 'row',
                                        }}>
                                        <TouchableOpacity
                                            style={{
                                                flex: 0.2,
                                                alignSelf: 'flex-end',
                                                alignItems: 'center',
                                            }}
                                            onPress={() => {
                                                this.setState({
                                                    type: this.state.type === Camera.Constants.Type.back
                                                        ? Camera.Constants.Type.front
                                                        : Camera.Constants.Type.back,
                                                });
                                            }}>
                                            <Text
                                                style={{ fontSize: 18, color: 'white' }}>
                                                {' '}Flip{' '}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </Camera>
                            </View>

                        </View>
                        <View>
                            <TouchableOpacity onPress={this.btnSnap}>
                                <View style={{
                                    width: 420,
                                    height: 55,
                                    justifyContent: 'center',
                                    backgroundColor: 'lightblue'
                                }}>
                                    <Text style={{alignSelf:"center",fontSize:20}}>Press To Take A Picture</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        }
    }
}

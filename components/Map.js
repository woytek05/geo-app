import React, { Component } from "react";
import {
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    Alert,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import Settings from "./Settings";
const styles = require("../Styles/Styles");

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMarkers: JSON.parse(
                this.props.route.params.selectedMarkers
            ),
        };
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <StatusBar />
                <View style={styles.flex1}>
                    <MapView
                        style={{ flex: 1 }}
                        initialRegion={{
                            latitude: this.state.selectedMarkers[0].latitude,
                            longitude: this.state.selectedMarkers[0].longitude,
                            latitudeDelta: 0.001,
                            longitudeDelta: 0.001,
                        }}
                    >
                        {this.state.selectedMarkers.map((el, index) => (
                            <Marker
                                key={index}
                                coordinate={{
                                    latitude: el.latitude,
                                    longitude: el.longitude,
                                }}
                                title={"Marker"}
                                description={`${el.latitude}, ${el.longitude}`}
                                image={require("../assets/pin.png")}
                            ></Marker>
                        ))}
                    </MapView>
                </View>
            </View>
        );
    }
}

export default Map;

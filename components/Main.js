import React, { Component } from "react";
import {
    View,
    Text,
    Button,
    FlatList,
    StatusBar,
    Alert,
    Switch,
} from "react-native";
import MyButton from "./MyButton";
import ListItem from "./ListItem";
import margin from "../Styles/Margin";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
const styles = require("../Styles/Styles");
const colors = require("../Styles/Colors");

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSwitchEnabled: false,
            markers: [],
            selectedMarkers: [],
        };
    }

    findYourPosition = async () => {
        const pos = await Location.getCurrentPositionAsync({});
        const timestamp = pos.timestamp;
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;
        Alert.alert(
            "Find Your Position",
            `Timestamp: ${timestamp}\nLatitude: ${latitude}\nLongitude: ${longitude}\nSave it?`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "OK",
                    onPress: async () => {
                        const id = uuid.v4();
                        await AsyncStorage.setItem(
                            id,
                            JSON.stringify(
                                {
                                    id: id,
                                    timestamp: timestamp,
                                    latitude: latitude,
                                    longitude: longitude,
                                    isSwitchEnabled: this.state.isSwitchEnabled,
                                },
                                null,
                                5
                            )
                        );
                        await this.updateMarkers();
                        this.updateSelectedMarkers();
                    },
                },
            ]
        );
    };

    getAllData = async () => {
        const keys = await AsyncStorage.getAllKeys();
        const stores = await AsyncStorage.multiGet(keys);
        const markers = stores.map((result, i, store) => {
            let key = store[i][0];
            let value = store[i][1];
            return JSON.parse(value);
        });
        return markers;
    };

    deleteData = async () => {
        Alert.alert(
            "Delete Data",
            "Are you sure you want to delete all your data?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "OK",
                    onPress: async () => {
                        AsyncStorage.clear();
                        await this.updateMarkers();
                        this.updateSelectedMarkers();
                    },
                },
            ]
        );
    };

    updateMarkers = async () => {
        this.setState({
            markers: await this.getAllData(),
        });
    };

    updateSelectedMarkers = () => {
        const selectedMarkers = this.state.markers.filter(
            (el) => el.isSwitchEnabled === true
        );
        console.log(selectedMarkers.length);

        this.setState({
            selectedMarkers: selectedMarkers,
        });
    };

    onSwitchValueChange = async (value) => {
        this.setState({ isSwitchEnabled: value });
        const keys = await AsyncStorage.getAllKeys();
        const stores = await AsyncStorage.multiGet(keys);
        stores.map((result, i, store) => {
            const key = store[i][0];
            const storeValue = store[i][1];
            let obj = JSON.parse(storeValue);
            obj["isSwitchEnabled"] = value;
            AsyncStorage.setItem(key, JSON.stringify(obj, null, 5));
            return obj;
        });

        this.setState({ markers: [] });
        await this.updateMarkers();
        this.updateSelectedMarkers();
    };

    onItemSwitchValueChange = async (item) => {
        let val = await AsyncStorage.getItem(item.id);
        let obj = JSON.parse(val);
        obj["isSwitchEnabled"] = item.isSwitchEnabled;
        AsyncStorage.setItem(item.id, JSON.stringify(obj, null, 5));

        await this.updateMarkers();
        this.updateSelectedMarkers();
    };

    componentDidMount = async () => {
        await Location.requestForegroundPermissionsAsync();
        await this.updateMarkers();
        this.updateSelectedMarkers();
    };

    render() {
        return (
            <View style={styles.mainContainer}>
                <StatusBar />
                <View style={styles.flex1}>
                    <View style={styles.flex1}>
                        <View
                            style={[
                                styles.center,
                                styles.row,
                                styles.marginTop,
                            ]}
                        >
                            <MyButton
                                text="Find Your Position"
                                width={150}
                                margin={margin(0, 10, 0, 0)}
                                backgroundColor={colors.darkPrimaryColor}
                                onPress={this.findYourPosition}
                            ></MyButton>
                            <MyButton
                                text="Delete Data"
                                width={150}
                                margin={margin(0)}
                                backgroundColor={colors.darkPrimaryColor}
                                onPress={this.deleteData}
                            ></MyButton>
                        </View>
                        <View style={[styles.center, styles.row]}>
                            <MyButton
                                text="Go To Map"
                                width={150}
                                margin={margin(0, 10, 0, 0)}
                                backgroundColor={colors.darkPrimaryColor}
                                onPress={() => {
                                    if (this.state.selectedMarkers.length > 0) {
                                        this.props.navigation.navigate("map", {
                                            selectedMarkers: JSON.stringify(
                                                this.state.selectedMarkers,
                                                null,
                                                5
                                            ),
                                        });
                                    } else {
                                        Alert.alert(
                                            "Go To Map",
                                            "Select at least one marker"
                                        );
                                    }
                                }}
                            ></MyButton>
                            <Switch
                                trackColor={{
                                    false: "#767577",
                                    true: colors.lightPrimaryColor,
                                }}
                                thumbColor={
                                    this.state.isSwitchEnabled
                                        ? colors.darkPrimaryColor
                                        : colors.white
                                }
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={this.onSwitchValueChange}
                                value={this.state.isSwitchEnabled}
                            />
                        </View>
                    </View>
                    <View style={styles.flex4}>
                        <FlatList
                            data={this.state.markers}
                            renderItem={({ item }) => (
                                <ListItem
                                    id={item.id}
                                    timestamp={item.timestamp}
                                    latitude={item.latitude}
                                    longitude={item.longitude}
                                    isSwitchEnabled={item.isSwitchEnabled}
                                    onItemSwitchValueChange={
                                        this.onItemSwitchValueChange
                                    }
                                ></ListItem>
                            )}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

export default Main;

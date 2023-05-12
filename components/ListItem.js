import React, { Component } from "react";
import { View, Text, Image, Alert, Switch } from "react-native";
import MyButton from "./MyButton";
import margin from "../Styles/Margin";
import colors from "../Styles/Colors";

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSwitchEnabled: this.props.isSwitchEnabled
                ? this.props.isSwitchEnabled
                : false,
        };
    }

    handleSwitchValueChange = (value) => {
        this.setState({
            isSwitchEnabled: value,
        });
        this.props.onItemSwitchValueChange({
            id: this.props.id,
            timestamp: this.props.timestamp,
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            isSwitchEnabled: value,
        });
    };

    render() {
        return (
            <View style={[styles.flex1, styles.marginTop]}>
                <View style={[styles.flex1, styles.row]}>
                    <View style={styles.center}>
                        <Image
                            style={styles.avatar}
                            source={require("../assets/marker.png")}
                        />
                    </View>
                    <View style={styles.flex2}>
                        <Text style={styles.text}>
                            Timestamp: {this.props.timestamp}
                        </Text>
                        <Text style={{ color: "white" }}>
                            Latitude: {this.props.latitude}
                        </Text>
                        <Text style={{ color: "white" }}>
                            Longitude: {this.props.longitude}
                        </Text>
                    </View>
                    <View style={styles.center}>
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
                            onValueChange={this.handleSwitchValueChange}
                            value={this.state.isSwitchEnabled}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = require("../Styles/Styles");

export default ListItem;

import React, { Component } from "react"
import {
    Text,
    StyleSheet,
    Animated,
    Dimensions,
    Platform,
    Button,
    View
} from "react-native"
import { connect } from "react-redux"
import { show, hide } from "../action/home.js"
import AMap from 'react-native-smart-amap'
const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "blue"
    },
    view: {
        flexDirection: "row" 
    }
})
@connect(state => ({
    status: state.home.status
}), dispatch => ({
    showFunc: () => dispatch(show()),
    hideFunc: () => dispatch(hide())
}))
export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            shake: new Animated.Value(0)
        }    
    }
    pressFunc() {
        if(this.props.status == "show") {
            this.props.hideFunc()
            this.setState({shake: new Animated.Value(0)})
        } else {
            this.props.showFunc()
            Animated.timing(
                this.state.shake,
                {
                    toValue: 1,
                    duration: 1000
                }
            ).start()      
        }
    }
    _onDidMoveByUser() {
        console.log('hahahh')
    }
    render() {
        return (
            <View style={styles.container}>
                        <AMap
                        style={{
                            flex: 1,
                            height: deviceHeight,
                            width: deviceWidth,
                            backgroundColor: 'red'
                        }}
                        options={{
                            frame: {
                                width: deviceWidth,
                                height: deviceHeight,
                            }
                        }}
                        onLayout={this._onLayout}
                        onDidMoveByUser={this._onDidMoveByUser}                       
                        >                
                        </AMap>
            </View>
        )
    }
}
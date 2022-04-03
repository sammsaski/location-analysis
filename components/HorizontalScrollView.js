import React, { Component } from 'react';
import {
    AppRegistry,
    ScrollView,
    Text, View,
    Dimensions
} from 'react-native';

export default class HorizontalScrollView extends Component {
    render() {
        let screenWidth = Dimensions.get('window').width;
        let screenHeight = Dimensions.get('window').height;
        return(
            <ScrollView
                horizontal={true}
                pagingEnabled={true}
            >
                <View style={{
                    /* 
                     * Screen 1
                     */
                    backgroundColor: '#5f9ea0',
                    flex: 1,
                    marginTop: 20,
                    width: screenWidth,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text
                    style={{
                        fontSize: 20,
                        padding: 15,
                        color: 'white',
                        textAlign: 'center'
                    }}>
                        Screen 1
                    </Text>
                </View>

                <View style={{
                    /* 
                     * Screen 2
                     */
                    backgroundColor: 'tomato',
                    flex: 1,
                    marginTop: 20,
                    width: screenWidth,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text
                    style={{
                        fontSize: 20,
                        padding: 15,
                        color: 'white',
                        textAlign: 'center'
                    }}>
                        Screen 2
                    </Text>
                </View>

                <View style={{
                    /* 
                     * Screen 3
                     */
                    backgroundColor: '#663399',
                    flex: 1,
                    marginTop: 20,
                    width: screenWidth,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text
                    style={{
                        fontSize: 20,
                        padding: 15,
                        color: 'white',
                        textAlign: 'center'
                    }}>
                        Screen 3
                    </Text>
                </View>

            </ScrollView>
        )
    }
}
import React, { Component } from 'react';
import {
  StyleSheet,
  PropTypes,
  Dimensions,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import MapView from 'react-native-maps';

import { characters } from './data';


let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 40.77096;
const LONGITUDE = -73.97702;

const LATITUDE_DELTA = 0.0491;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Map extends Component {

  constructor() {
    super();
    this.state = {
      showGoodOnly: false,
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        region: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }
      });
    }, 
    (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  componentWillUnmount() {
    //navigator.geolocation.clearWatch(this.watchID);
  }

  onRegionChange(region) {
    this.setState({region});
  }

  render () {
    return (
      <View style={styles.container}>
        {/* Map*/}
        <MapView
          style={styles.map}
          // Position on Manhattan, New York
          region= {this.state.region}
          //onRegionChange={this.onRegionChange}
        >
          {/* Loop through characters and add pins on the map */}
          {characters.map((character, index) =>
            // If showGoodOnly is true, but the character is bad - do not show it
            this.state.showGoodOnly && !character.good || <MapView.Marker
              coordinate={{
                latitude: character.coordinate[0],
                longitude: character.coordinate[1],
              }}
              // Greed color for good characters and red for others
              pinColor={character.good ? '#009688' : '#f44336'}
              key={index}
            />
          )}
        </MapView>
        {/* Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            // Toggle this.state.showGoodOnly
            onPress={() => this.setState({
              showGoodOnly: !this.state.showGoodOnly
            })}
          >
            <Text>{this.state.showGoodOnly ? 'Show All' : 'Show Good Only'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bubble}>
          <Text style={{ textAlign: 'center'}}>
            {`${this.state.region.latitude.toPrecision(7)}, ${this.state.region.longitude.toPrecision(7)}`}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                            // Take up the whole screen
    justifyContent: 'flex-end',         // Arrange button at the bottom
    alignItems: 'center',               // Center button horizontally
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    marginVertical: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 20,
    padding: 12,
    width: 160,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
});

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
const LATITUDE = 43.089019;
const LONGITUDE = -88.008032;

//const LATITUDE_DELTA = 0.0491;
const LATITUDE_DELTA = 0.0922;
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
      },
      currentMarkerPosition: {
        latitude: 0,
        longitude: 0
      }
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      let lat = parseFloat(position.coords.latitude);
      let long = parseFloat(position.coords.longitude);

      let initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      };

      this.setState({region: initialRegion});
      //this.setState({currentMarkerPosition: initialRegion});
    }, 
    (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

    /*this.watchID = navigator.geolocation.watchPosition((position) => {
      let lat = parseFloat(position.coords.latitude);
      let long = parseFloat(position.coords.longitude);

      let lastRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      };

      this.setState({region: lastRegion});
      this.setState({currentMarkerPosition: lastRegion});
    })*/
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
          region={this.state.region}
          showsUserLocation={true}
          showsTraffic={false}
          minZoomLevel={16}
          maxZoomLevel={20}
          //onRegionChange={this.onRegionChange.bind(this)}
        >
          {/*<MapView.Marker
            coordinate={this.state.currentMarkerPosition}>
            <View style={styles.radius}>
              <View style={styles.currentMarker}>
              </View>
            </View>
          </MapView.Marker>*/}
          {/* Loop through characters and add pins on the map */}
          {/*characters.map((character, index) =>
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
          )*/}
        </MapView>
        {/* Button */}
        {/*<View style={styles.buttonContainer}>
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
        </View>*/}
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
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50/2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 112, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  currentMarker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20/2,
    overflow: 'hidden',
    backgroundColor: '#007AFF'
  },
});

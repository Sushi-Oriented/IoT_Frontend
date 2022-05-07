import React from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow, } from '@react-google-maps/api';
// import { formatRelative } from 'date-fns';
// import '@reach/combobox/styles.css';
import mapStyles from './mapStyles';
import pin from '../../assets/img/maps-and-flags.png'
// import panic from '../../assets/panicLogo.png'
import PropTypes from 'prop-types';
import {  GoogleApiWrapper } from 'google-maps-react';

const libraries = ["places"];
const mapContainerStyle =
{
    width: "100%",
    objectFit: "cover",
    // height: 500
    width: window.innerWidth|| document.documentElement.clientWidth || 
    document.body.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight|| 
    document.body.clientHeight,
    width: window.screen.width,
    // heigh: window.screen.height
}
const center = {
    lat: 1.5594,
    lng: 103.6386
}
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
    mapTypeId: 'satellite'
}

const MapContainer = ({
    current,
}) =>  {
    
    // const { isLoaded, loadError } = useLoadScript({
    //     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    //     libraries,
    // });

    // const [markers, setMarkers] = React.useState([]);
    // const [selected, setSelected] = React.useState(null);

    // const mapRef = React.useRef();
    // const onMapLoad = React.useCallback((map) => {
    //     mapRef.current = map;
    // }, [])

    // if (loadError) return "Error loading maps";
    // if (!isLoaded) return "Loading Maps";
    const google = window.google;
    var image = {
        url: pin,
        scaledSize: new google.maps.Size(41, 43)
    };

    // var panicImage = {
    //     // url: panic,
    //     scaledSize: new google.maps.Size(31, 43)
    // };


    return <div>
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={18}
            center={center}
            options={options}
            // onLoad={onMapLoad}
        >
            {/* <Marker
                position={{ lat: 1.5594, lng: 103.6386 }}
                icon={image} 
                // position={{ lat: -34.397, lng: 150.644 }}
                // labelAnchor={new google.maps.Point(0, 0)}
                labelStyle={{ backgroundColor: "yellow", fontSize: "32px", padding: "16px" }}
            >
                <div>Hello There</div>
            </Marker> */}

            <Marker
                // google={this.props.google}
                name={'Dolores park'}
                draggable={true}
                // onDragEnd={this.onMarkerDragEnd}
                position={{lat: 1.5594, lng: 103.6386}}
            />

            <InfoWindow
                            // onClose={this.onInfoWindowClose}
                            position={{lat: 1.55967, lng: 103.6386  }}
                        >
                            <div>
                                {/* <span style={{ padding: 0, margin: 0 }}>{this.state.address}</span> */}
                                <b>Collar 1</b><br/>
                                Latitude {'\u00A0'}{'\u00A0'}{'\u00A0'}: 1.55967<br/>
                                Longitude{'\u00A0'}: 103.638<br/>
                                Energy {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}: 80%<br/>
                                Speed{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}: 8
                            </div>
                        </InfoWindow>

            {/* {current.isPanic &&
            <Marker
                    position={{ lat: current.latPanic,  lng: current.lngPanic }}
                    // icon={panicImage}
                    animation= {google.maps.Animation.BOUNCE}
                   
                />
            }         */}
            
        </GoogleMap>
    </div>
}

MapContainer.propTypes = {
    current: PropTypes.object,
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyC6oQCEcKbgMQ38_EoiudIgZ413ugM1WmA' })
    (MapContainer);

// export default MapContainer;
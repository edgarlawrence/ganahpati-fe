import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Popup, Marker } from 'react-leaflet';

const Map = (props) => {
    return (
        <>
            <MapContainer center={[40.7128, -74.0060]} zoom={12} style={{ height: '50vh', width: '50%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {props.selectedTrip && (
                    <>
                        <Polyline
                            positions={[
                                [props.selectedTrip.pickup_latitude, props.selectedTrip.pickup_longitude],
                                [props.selectedTrip.dropoff_latitude, props.selectedTrip.dropoff_longitude],
                            ]}
                            color="red" weight={2}></Polyline>
                        <Marker
                            position={[props.selectedTrip.pickup_latitude, props.selectedTrip.pickup_longitude]}
                            eventHandlers={{
                                mouseover: (e) => e.target.openPopup(),
                                mouseout: (e) => e.target.closePopup(),
                            }}
                        >
                            <Popup>
                                <div>
                                    <strong>Pickup Location</strong>
                                    <p>Latitude: {props.selectedTrip.pickup_latitude}</p>
                                    <p>Longitude: {props.selectedTrip.pickup_longitude}</p>
                                </div>
                            </Popup>
                        </Marker>
                        <Marker
                            position={[props.selectedTrip.dropoff_latitude, props.selectedTrip.dropoff_longitude]}
                            eventHandlers={{
                                mouseover: (e) => e.target.openPopup(),
                                mouseout: (e) => e.target.closePopup(),
                            }}
                        >
                            <Popup>
                                <div>
                                    <strong>Dropoff Location</strong>
                                    <p>Latitude: {props.selectedTrip.dropoff_latitude}</p>
                                    <p>Longitude: {props.selectedTrip.dropoff_longitude}</p>
                                </div>
                            </Popup>
                        </Marker>
                    </>
                )}
            </MapContainer>
        </>
    )
}

export default Map
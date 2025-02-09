import React, { useMemo } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Appointment } from '../models/Appointment';

type Props = {
  appointments: Appointment[];
};

export default function AppointmentMap({ appointments }: Props) {
  const initialRegion = useMemo(() => {
    if (appointments.length === 0) {
      // Default to Madison, WI area if no appointments
      return {
        latitude: 43.0731,
        longitude: -89.4012,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
    }

    // Calculate the center point of all appointments
    const lats = appointments.map(apt => apt.location.coordinates.latitude);
    const lngs = appointments.map(apt => apt.location.coordinates.longitude);
    
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    
    return {
      latitude: (minLat + maxLat) / 2,
      longitude: (minLng + maxLng) / 2,
      latitudeDelta: Math.max(0.0922, (maxLat - minLat) * 1.5),
      longitudeDelta: Math.max(0.0421, (maxLng - minLng) * 1.5),
    };
  }, [appointments]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
      >
        {appointments.map((appointment) => (
          <Marker
            key={appointment.id}
            coordinate={appointment.location.coordinates}
            title={appointment.title}
            description={appointment.location.address}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
}); 
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Appointment, formatTimeRange } from '../models/Appointment';
import { useTheme } from '../theme/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
  appointment: Appointment;
  onPress?: () => void;
};

export default function AppointmentCard({ appointment, onPress }: Props) {
  const { theme } = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: theme.secondary,
          borderColor: theme.textSecondary + '20',
        },
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>
            {appointment.title}
          </Text>
          <View style={[
            styles.statusBadge, 
            { 
              backgroundColor: theme.accent + '15',
              borderWidth: 1,
              borderColor: theme.accent + '30',
            }
          ]}>
            <Text style={[styles.statusText, { color: theme.accent }]}>
              {appointment.status}
            </Text>
          </View>
        </View>

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <MaterialIcons name="schedule" size={16} color={theme.textSecondary} />
            <Text style={[styles.detailText, { color: theme.textSecondary }]}>
              {formatTimeRange(appointment.timeRange)}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <MaterialIcons name="location-on" size={16} color={theme.textSecondary} />
            <Text style={[styles.detailText, { color: theme.textSecondary }]}>
              {appointment.location.address}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.7,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  details: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    flex: 1,
  },
}); 
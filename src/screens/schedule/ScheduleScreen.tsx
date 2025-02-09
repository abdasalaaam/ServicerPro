import React, { useState, useMemo, useCallback } from 'react';
import { View, StyleSheet, SectionList, Text, Dimensions, Pressable } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import DateSelector from '../../components/DateSelector';
import AppointmentCard from '../../components/AppointmentCard';
import { mockAppointments, groupAppointmentsByDate } from '../../models/mockData';
import { Appointment } from '../../models/Appointment';
import EmptyState from '../../components/EmptyState';
import AppointmentMap from '../../components/AppointmentMap';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const DATE_SELECTOR_HEIGHT = 90; // Height of our DateSelector component

type Section = {
  title: string;
  data: Appointment[];
};

export default function ScheduleScreen() {
  const { theme } = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showMap, setShowMap] = useState(false);
  const navigation = useNavigation();

  // Set up the header with map toggle
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Schedule',
      headerTitleAlign: 'center',
      headerLeft: () => (
        <Pressable
          onPress={() => setShowMap(!showMap)}
          style={({ pressed }) => [
            styles.mapButton,
            pressed && styles.mapButtonPressed,
          ]}
        >
          <MaterialIcons
            name={showMap ? 'format-list-bulleted' : 'map'}
            size={24}
            color={theme.accent}
          />
        </Pressable>
      ),
    });
  }, [navigation, showMap, theme]);

  const groupedAppointments = useMemo(() => 
    groupAppointmentsByDate(mockAppointments as Appointment[]),
    []
  );

  const sections = useMemo(() => {
    const selectedDateStr = selectedDate.toDateString();
    const appointments = groupedAppointments.get(selectedDateStr) || [];
    
    // Only create a section if there are appointments
    return appointments.length > 0 ? [{
      title: selectedDateStr,
      data: appointments
    }] : [];
  }, [selectedDate, groupedAppointments]);

  const currentDayAppointments = useMemo(() => {
    const selectedDateStr = selectedDate.toDateString();
    return groupedAppointments.get(selectedDateStr) || [];
  }, [selectedDate, groupedAppointments]);

  const renderSectionHeader = useCallback(({ 
    section: { title } 
  }: {
    section: Section;
  }) => (
    <View style={[styles.sectionHeader, { backgroundColor: theme.background }]}>
      <Text style={[styles.sectionHeaderText, { color: theme.text }]}>
        {new Date(title).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </Text>
    </View>
  ), [theme]);

  const renderEmptyComponent = useCallback(() => (
    <View style={styles.emptyStateWrapper}>
      <EmptyState message="No appointments scheduled for this day" />
    </View>
  ), []);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <DateSelector
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        appointments={groupedAppointments}
      />
      
      <View style={[styles.divider, { backgroundColor: theme.textSecondary + '20' }]} />
      
      {showMap ? (
        <AppointmentMap appointments={currentDayAppointments} />
      ) : sections.length > 0 ? (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <AppointmentCard appointment={item} />}
          renderSectionHeader={renderSectionHeader}
          stickySectionHeadersEnabled
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyStateContainer}>
          <EmptyState message="No appointments scheduled for this day" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -350, // Adjust this to fine-tune vertical position
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: '600',
  },
  emptyStateWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    width: '100%',
    marginBottom: 8,
  },
  mapButton: {
    paddingVertical: 8,
    paddingRight: 16,
    marginLeft: 8,
  },
  mapButtonPressed: {
    opacity: 0.7,
  },
});

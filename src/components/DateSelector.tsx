import React, {
    memo,
    useMemo,
    useRef,
    useEffect,
    useCallback
  } from 'react';
  import {
    ScrollView,
    Text,
    TouchableOpacity,
    StyleSheet,
    View,
    Dimensions
  } from 'react-native';
  import { useTheme } from '../theme/ThemeContext';
  
  type DateSelectorProps = {
    selectedDate: Date;
    onSelectDate: (date: Date) => void;
    appointments: Map<string, any[]>; // Using any[] for brevity
  };
  
  const ITEM_WIDTH = 60;
  const ITEM_MARGIN = 4;
  const TOTAL_ITEM_WIDTH = ITEM_WIDTH + (ITEM_MARGIN * 2);
  const WINDOW_WIDTH = Dimensions.get('window').width;
  
  // Use TOTAL_ITEM_WIDTH here to include margins in the calculation
  const CENTER_OFFSET = (WINDOW_WIDTH - TOTAL_ITEM_WIDTH) / 2;
  
  function DateSelector({ selectedDate, onSelectDate, appointments }: DateSelectorProps) {
    const { theme } = useTheme();
    const scrollViewRef = useRef<ScrollView>(null);
    const initialScrollDone = useRef(false);
  
    // Generate dates: 3 months before today up to 3 months after today
    const dates = useMemo(() => {
      const today = new Date();
      const startDate = new Date(today);
      startDate.setMonth(today.getMonth() - 3);
      
      const totalDays = 6 * 30; // 3 months before and after (approx)
      return Array.from({ length: totalDays }, (_, i) => {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        return date;
      });
    }, []);
  
    // Scroll to "today" on mount
    useEffect(() => {
      if (!initialScrollDone.current && scrollViewRef.current) {
        const todayStr = new Date().toDateString();
        const initialIndex = dates.findIndex(date => date.toDateString() === todayStr);
        
        if (initialIndex !== -1) {
          const scrollToX = initialIndex * TOTAL_ITEM_WIDTH;
          
          // Slight timeout to ensure layout is ready
          setTimeout(() => {
            scrollViewRef.current?.scrollTo({
              x: scrollToX,
              animated: false, // no animation for initial scroll
            });
            initialScrollDone.current = true;
          }, 50);
        }
      }
    }, [dates]);
  
    // When the user presses a date, select it AND scroll immediately
    const handlePressDate = useCallback((date: Date) => {
      onSelectDate(date);
      // Find index in dates array
      const selectedIndex = dates.findIndex(d => d.toDateString() === date.toDateString());
      if (selectedIndex !== -1 && scrollViewRef.current) {
        const scrollToX = selectedIndex * TOTAL_ITEM_WIDTH;
        scrollViewRef.current.scrollTo({
          x: scrollToX,
          animated: true,
        });
      }
    }, [dates, onSelectDate]);
  
    // Helpers
    const formatDate = (date: Date) => {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      return {
        day: days[date.getDay()],
        date: date.getDate(),
        month: date.toLocaleString('default', { month: 'short' }),
      };
    };
  
    const isSelected = (date: Date) => 
      date.toDateString() === selectedDate.toDateString();
  
    const hasAppointments = (date: Date) => 
      appointments.has(date.toDateString());
  
    return (
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingHorizontal: CENTER_OFFSET }
        ]}
        scrollEventThrottle={16}
      >
        {dates.map((date, index) => {
          const { day, date: dateNum, month } = formatDate(date);
          const selected = isSelected(date);
          const hasAppts = hasAppointments(date);
  
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handlePressDate(date)}
              style={[
                styles.dateContainer,
                selected && { backgroundColor: theme.accent },
                {
                  borderColor: hasAppts ? theme.accent : 'transparent',
                  width: ITEM_WIDTH,
                  marginHorizontal: ITEM_MARGIN,
                }
              ]}
            >
              <Text
                style={[
                  styles.dayText,
                  { color: selected ? theme.primary : theme.textSecondary }
                ]}
              >
                {day}
              </Text>
              <Text
                style={[
                  styles.dateText,
                  { color: selected ? theme.primary : theme.text }
                ]}
              >
                {dateNum}
              </Text>
              <Text
                style={[
                  styles.monthText,
                  { color: selected ? theme.primary : theme.textSecondary }
                ]}
              >
                {month}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      maxHeight: 90,
    },
    contentContainer: {
      paddingVertical: 8,
      // paddingHorizontal is set dynamically via CENTER_OFFSET
    },
    dateContainer: {
      height: 74,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
    },
    dayText: {
      fontSize: 12,
      fontWeight: '500',
    },
    dateText: {
      fontSize: 20,
      fontWeight: '600',
      marginVertical: 2,
    },
    monthText: {
      fontSize: 12,
    },
  });
  
  export default memo(DateSelector);
  
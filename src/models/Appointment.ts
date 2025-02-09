export type TimeRange = {
  start: Date;
  end: Date;
};

export type Location = {
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
};

export type Appointment = {
  id: string;
  title: string;
  location: Location;
  timeRange: TimeRange;
  customerId: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
};

// Helper function to format time range
export function formatTimeRange(timeRange: TimeRange): string {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };
  return `${formatTime(timeRange.start)}-${formatTime(timeRange.end)}`;
} 
import { Appointment } from './Appointment';

// Helper to create dates relative to today
const getRelativeDate = (dayOffset: number, hour: number, minute = 0): Date => {
  const date = new Date();
  date.setDate(date.getDate() + dayOffset);
  date.setHours(hour, minute, 0, 0);
  return date;
};

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    title: 'HVAC Repair',
    location: {
      address: '1979 Milky Way, Verona, WI 53593',
      coordinates: {
        latitude: 43.0088,
        longitude: -89.5321
      }
    },
    timeRange: {
      start: getRelativeDate(0, 9), // Today at 9 AM
      end: getRelativeDate(0, 11),
    },
    customerId: 'cust1',
    status: 'scheduled',
  },
  {
    id: '2',
    title: 'Water Heater Installation',
    location: {
      address: '6514 Watts Rd, Madison, WI 53719',
      coordinates: {
        latitude: 43.0521,
        longitude: -89.4984
      }
    },
    timeRange: {
      start: getRelativeDate(0, 14), // Today at 2 PM
      end: getRelativeDate(0, 17),
    },
    customerId: 'cust2',
    status: 'scheduled',
  },
  {
    id: '3',
    title: 'Plumbing Maintenance',
    location: {
      address: '4602 East Washington Ave, Madison, WI 53704',
      coordinates: {
        latitude: 43.1289,
        longitude: -89.3269
      }
    },
    timeRange: {
      start: getRelativeDate(1, 10), // Tomorrow at 10 AM
      end: getRelativeDate(1, 12),
    },
    customerId: 'cust3',
    status: 'scheduled',
  },
  // Add more appointments...
] as const;

// Helper function to group appointments by date
export function groupAppointmentsByDate(appointments: Appointment[]): Map<string, Appointment[]> {
  const grouped = new Map<string, Appointment[]>();
  
  appointments.forEach(appointment => {
    const dateKey = appointment.timeRange.start.toDateString();
    if (!grouped.has(dateKey)) {
      grouped.set(dateKey, []);
    }
    grouped.get(dateKey)?.push(appointment);
  });
  
  return grouped;
} 
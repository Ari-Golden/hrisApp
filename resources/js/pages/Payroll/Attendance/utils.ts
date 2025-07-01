import { Attendance } from "@/types";

interface Summary {
  present: number;
  late: number;
  leave: number;
  sick: number;
  absent: number;
}

export function calculateSummaryForEmployee(attendanceRecords: Attendance[]): Summary {
  let present = 0;
  let late = 0;
  let leave = 0;
  let sick = 0;
  let absent = 0;

  const dailyStatus = new Map<string, Set<string>>(); // Key: 'date', Value: Set of statuses for that day

  attendanceRecords.forEach(record => {
    const date = record.date;
    if (!dailyStatus.has(date)) {
      dailyStatus.set(date, new Set<string>());
    }
    dailyStatus.get(date)?.add(record.status);
  });

  dailyStatus.forEach(statuses => {
    if (statuses.has('in') && statuses.has('out')) {
      present++;
    } else if (statuses.has('late')) {
      late++;
    } else if (statuses.has('leave')) {
      leave++;
    } else if (statuses.has('sick')) {
      sick++;
    } else if (statuses.has('absent')) {
      absent++;
    }
  });

  return {
    present,
    late,
    leave,
    sick,
    absent,
  };
}

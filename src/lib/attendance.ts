import { sanityClient } from './sanity'

export interface AttendanceRecord {
  studentId: string
  date: string
  status: 'present' | 'absent' | 'late'
  notes?: string
}

export async function submitAttendance(records: AttendanceRecord[]) {
  try {
    const promises = records.map(record => {
      return sanityClient.create({
        _type: 'attendance',
        student: {
          _type: 'reference',
          _ref: record.studentId
        },
        date: record.date,
        status: record.status,
        notes: record.notes,
        markedBy: 'staff-id' // TODO: Get from authentication
      })
    })

    await Promise.all(promises)
    return { success: true }
  } catch (error) {
    console.error('Error submitting attendance:', error)
    return { success: false, error }
  }
}

export async function getAttendanceByStudent(studentId: string, startDate: string, endDate: string) {
  try {
    const records = await sanityClient.fetch(
      `*[_type == "attendance" && student._ref == $studentId && date >= $startDate && date <= $endDate] {
        date,
        status,
        notes
      }`,
      { studentId, startDate, endDate }
    )
    return { success: true, data: records }
  } catch (error) {
    console.error('Error fetching attendance:', error)
    return { success: false, error }
  }
}

export async function getStudentsByClass(grade: string, section: string) {
  try {
    const students = await sanityClient.fetch(
      `*[_type == "student" && grade == $grade && section == $section] {
        _id,
        name,
        grade,
        section
      }`,
      { grade, section }
    )
    return { success: true, data: students }
  } catch (error) {
    console.error('Error fetching students:', error)
    return { success: false, error }
  }
}

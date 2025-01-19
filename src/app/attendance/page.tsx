'use client'

import { useState } from 'react'
import { format } from 'date-fns'

interface Student {
  id: string
  name: string
  grade: string
  section: string
}

interface AttendanceRecord {
  studentId: string
  date: string
  status: 'present' | 'absent' | 'late'
}

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [selectedGrade, setSelectedGrade] = useState('')
  const [selectedSection, setSelectedSection] = useState('')
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([])

  // Mock data for demonstration
  const students: Student[] = [
    { id: '1', name: 'John Doe', grade: '10', section: 'A' },
    { id: '2', name: 'Jane Smith', grade: '10', section: 'A' },
    { id: '3', name: 'Bob Wilson', grade: '10', section: 'B' },
  ]

  const handleAttendanceChange = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendanceRecords(prev => {
      const existing = prev.find(record => record.studentId === studentId && record.date === selectedDate)
      if (existing) {
        return prev.map(record =>
          record.studentId === studentId && record.date === selectedDate
            ? { ...record, status }
            : record
        )
      }
      return [...prev, { studentId, date: selectedDate, status }]
    })
  }

  const handleSubmit = async () => {
    try {
      // TODO: Submit attendance records to Sanity
      console.log('Submitting attendance:', attendanceRecords)
      alert('Attendance submitted successfully!')
    } catch (error) {
      console.error('Error submitting attendance:', error)
      alert('Error submitting attendance')
    }
  }

  const filteredStudents = students.filter(student => 
    (!selectedGrade || student.grade === selectedGrade) &&
    (!selectedSection || student.section === selectedSection)
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Attendance Management</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="grade" className="block text-sm font-medium text-gray-700">
                Grade
              </label>
              <select
                id="grade"
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">All Grades</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={String(i + 1)}>
                    Grade {i + 1}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="section" className="block text-sm font-medium text-gray-700">
                Section
              </label>
              <select
                id="section"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">All Sections</option>
                {['A', 'B', 'C', 'D'].map((section) => (
                  <option key={section} value={section}>
                    Section {section}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Grade
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Section
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attendance
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.grade}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.section}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        {['present', 'absent', 'late'].map((status) => (
                          <button
                            key={status}
                            onClick={() => handleAttendanceChange(student.id, status as 'present' | 'absent' | 'late')}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              attendanceRecords.find(
                                record => record.studentId === student.id && 
                                record.date === selectedDate && 
                                record.status === status
                              )
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSubmit}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Attendance
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns'

interface AttendanceRecord {
  date: string
  status: 'present' | 'absent' | 'late'
}

export default function ViewAttendance() {
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'))
  const [studentId, setStudentId] = useState('1') // This would come from authentication

  // Mock data for demonstration
  const mockAttendance: AttendanceRecord[] = [
    { date: '2025-01-01', status: 'present' },
    { date: '2025-01-02', status: 'absent' },
    { date: '2025-01-03', status: 'late' },
  ]

  const getDaysInMonth = () => {
    const date = new Date(selectedMonth)
    const start = startOfMonth(date)
    const end = endOfMonth(date)
    return eachDayOfInterval({ start, end })
  }

  const getAttendanceStatus = (date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd')
    return mockAttendance.find(record => record.date === formattedDate)?.status || 'no-record'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800'
      case 'absent':
        return 'bg-red-100 text-red-800'
      case 'late':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Attendance Record</h1>

          <div className="mb-6">
            <label htmlFor="month" className="block text-sm font-medium text-gray-700">
              Select Month
            </label>
            <input
              type="month"
              id="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center font-medium text-gray-500 text-sm py-2">
                {day}
              </div>
            ))}
            
            {getDaysInMonth().map((date) => {
              const status = getAttendanceStatus(date)
              return (
                <div
                  key={date.toString()}
                  className={`p-2 text-center border rounded-lg ${getStatusColor(status)}`}
                >
                  <div className="text-sm">{format(date, 'd')}</div>
                  <div className="text-xs capitalize">{status !== 'no-record' ? status : ''}</div>
                </div>
              )
            })}
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Summary</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-green-800 font-medium">Present</div>
                <div className="text-2xl font-bold text-green-900">
                  {mockAttendance.filter(record => record.status === 'present').length}
                </div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-red-800 font-medium">Absent</div>
                <div className="text-2xl font-bold text-red-900">
                  {mockAttendance.filter(record => record.status === 'absent').length}
                </div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="text-yellow-800 font-medium">Late</div>
                <div className="text-2xl font-bold text-yellow-900">
                  {mockAttendance.filter(record => record.status === 'late').length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

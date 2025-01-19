'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface Subject {
  name: string;
  marks: number;
  totalMarks: number;
}

interface StudentResult {
  studentName: string;
  rollNumber: string;
  class: string;
  section: string;
  subjects: Subject[];
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  grade: string;
  examType: string;
}

export default function ResultCard() {
  const [rollNumber, setRollNumber] = useState('')
  const [result, setResult] = useState<StudentResult | null>(null)
  const [loading, setLoading] = useState(false)

  // Mock result data
  const mockResult: StudentResult = {
    studentName: 'Ahmed Khan',
    rollNumber: '2024-001',
    class: '10',
    section: 'A',
    examType: 'Final Term 2024',
    subjects: [
      { name: 'Sindhi', marks: 85, totalMarks: 100 },
      { name: 'English', marks: 78, totalMarks: 100 },
      { name: 'Mathematics', marks: 90, totalMarks: 100 },
      { name: 'Science', marks: 88, totalMarks: 100 },
      { name: 'Social Studies', marks: 82, totalMarks: 100 },
      { name: 'Islamiat', marks: 95, totalMarks: 100 }
    ],
    totalMarks: 600,
    obtainedMarks: 518,
    percentage: 86.33,
    grade: 'A'
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setResult(mockResult)
      setLoading(false)
    }, 1000)
  }

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'text-green-600'
      case 'B':
        return 'text-blue-600'
      case 'C':
        return 'text-yellow-600'
      default:
        return 'text-red-600'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 sindhi-pattern">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* School Header */}
        <div className="text-center mb-8">
          <div className="mb-4">
            {/* Replace with actual school logo */}
            <div className="w-24 h-24 mx-auto bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              LGBSS
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">LUBNA G.B.S.S 2/C LANDHI</h1>
          <p className="text-gray-600">Result Card</p>
        </div>

        {/* Search Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm mb-8"
        >
          <form onSubmit={handleSearch} className="flex gap-4">
            <input
              type="text"
              placeholder="Enter Roll Number"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>
        </motion.div>

        {/* Result Card */}
        {result && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            {/* Student Info */}
            <div className="p-6 border-b ajrak-pattern">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Student Name</p>
                  <p className="font-medium">{result.studentName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Roll Number</p>
                  <p className="font-medium">{result.rollNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Class</p>
                  <p className="font-medium">{result.class}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Section</p>
                  <p className="font-medium">{result.section}</p>
                </div>
              </div>
            </div>

            {/* Marks Table */}
            <div className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Subject</th>
                    <th className="text-center py-2">Marks Obtained</th>
                    <th className="text-center py-2">Total Marks</th>
                    <th className="text-center py-2">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {result.subjects.map((subject) => (
                    <tr key={subject.name} className="border-b">
                      <td className="py-2">{subject.name}</td>
                      <td className="text-center">{subject.marks}</td>
                      <td className="text-center">{subject.totalMarks}</td>
                      <td className="text-center">
                        {((subject.marks / subject.totalMarks) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Result Summary */}
            <div className="p-6 bg-gray-50">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Total Marks</p>
                  <p className="font-medium">{result.totalMarks}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Marks Obtained</p>
                  <p className="font-medium">{result.obtainedMarks}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Percentage</p>
                  <p className="font-medium">{result.percentage.toFixed(2)}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Grade</p>
                  <p className={`font-bold ${getGradeColor(result.grade)}`}>
                    {result.grade}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

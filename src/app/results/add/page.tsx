'use client'

import { useState, FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Define the structure for a subject's result
interface SubjectResult {
  name: string
  marks: number
  totalMarks: number
}

export default function AddResultPage() {
  // State for student information
  const [studentName, setStudentName] = useState('')
  const [rollNumber, setRollNumber] = useState('')
  const [className, setClassName] = useState('')
  const [section, setSection] = useState('')
  const [examType, setExamType] = useState('')

  // State for subjects
  const [subjects, setSubjects] = useState<SubjectResult[]>([
    { name: 'Sindhi', marks: 0, totalMarks: 100 },
    { name: 'English', marks: 0, totalMarks: 100 },
    { name: 'Mathematics', marks: 0, totalMarks: 100 },
    { name: 'Science', marks: 0, totalMarks: 100 },
    { name: 'Social Studies', marks: 0, totalMarks: 100 },
    { name: 'Islamiat', marks: 0, totalMarks: 100 }
  ])

  // Update marks for a specific subject
  const updateSubjectMarks = (index: number, marks: number) => {
    const newSubjects = [...subjects]
    newSubjects[index].marks = marks
    setSubjects(newSubjects)
  }

  // Calculate total marks and percentage
  const calculateResults = () => {
    const totalMarks = subjects.reduce((sum, subject) => sum + subject.totalMarks, 0)
    const obtainedMarks = subjects.reduce((sum, subject) => sum + subject.marks, 0)
    const percentage = (obtainedMarks / totalMarks) * 100

    // Determine grade based on percentage
    const getGrade = (percent: number) => {
      if (percent >= 90) return 'A+'
      if (percent >= 80) return 'A'
      if (percent >= 70) return 'B'
      if (percent >= 60) return 'C'
      if (percent >= 50) return 'D'
      return 'F'
    }

    return {
      totalMarks,
      obtainedMarks,
      percentage,
      grade: getGrade(percentage)
    }
  }

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    const resultSummary = calculateResults()
    
    const completeResult = {
      studentName,
      rollNumber,
      class: className,
      section,
      examType,
      subjects,
      ...resultSummary
    }

    // TODO: Implement actual API call to save result
    console.log('Submitting Result:', completeResult)
    alert('Result submitted successfully!')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Add Student Result</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Student Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Student Name</label>
                <Input 
                  type="text" 
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter student name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Roll Number</label>
                <Input 
                  type="text" 
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  placeholder="Enter roll number"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Class</label>
                <Input 
                  type="text" 
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  placeholder="Enter class"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Section</label>
                <Input 
                  type="text" 
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  placeholder="Enter section"
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Exam Type</label>
                <Input 
                  type="text" 
                  value={examType}
                  onChange={(e) => setExamType(e.target.value)}
                  placeholder="Enter exam type (e.g., Final Term 2024)"
                  required
                />
              </div>
            </div>

            {/* Subject Marks Input */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Subject-wise Marks</h3>
              <div className="space-y-3">
                {subjects.map((subject, index) => (
                  <div key={subject.name} className="flex items-center space-x-4">
                    <span className="w-1/3">{subject.name}</span>
                    <Input 
                      type="number" 
                      min="0" 
                      max={subject.totalMarks}
                      value={subject.marks}
                      onChange={(e) => updateSubjectMarks(index, Number(e.target.value))}
                      placeholder={`Marks out of ${subject.totalMarks}`}
                      className="w-1/3"
                      required
                    />
                    <span>/ {subject.totalMarks}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <Button type="submit" className="w-full">
                Submit Result
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

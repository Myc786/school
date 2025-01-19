'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

interface StudentProfile {
  applicationNumber: string
  status: string
  profileImage: any
  studentName: {
    first: string
    middle?: string
    last: string
  }
  dateOfBirth: string
  gender: string
  appliedClass: number
  academicYear: string
  parentInfo: {
    father: {
      name: string
      occupation: string
      phone: string
      email: string
    }
    mother: {
      name: string
      occupation: string
      phone: string
      email: string
    }
  }
  previousSchool: {
    name: string
    board: string
    grade: string
    percentage: string
  }
  submittedAt: string
}

export default function StudentProfile() {
  const params = useParams()
  const [student, setStudent] = useState<StudentProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`/api/student/${params.id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch student details')
        }
        const data = await response.json()
        setStudent(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchStudent()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    )
  }

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Student not found</div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header with Status and Profile Image */}
        <div className="bg-indigo-600 text-white px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="shrink-0">
              {student.profileImage ? (
                <Image
                  src={urlFor(student.profileImage).width(128).height(128).url()}
                  alt={`${student.studentName.first}'s profile`}
                  width={128}
                  height={128}
                  className="h-32 w-32 rounded-full object-cover border-4 border-white"
                />
              ) : (
                <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white">
                  <svg
                    className="h-16 w-16 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">
                {student.studentName.first} {student.studentName.middle} {student.studentName.last}
              </h1>
              <p className="text-sm mt-1">Application #{student.applicationNumber}</p>
              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
                student.status === 'accepted' ? 'bg-green-500' :
                student.status === 'rejected' ? 'bg-red-500' :
                'bg-yellow-500'
              }`}>
                {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Student Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Student Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Date of Birth</p>
                <p className="font-medium">{new Date(student.dateOfBirth).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Gender</p>
                <p className="font-medium">{student.gender}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Applied for Class</p>
                <p className="font-medium">{student.appliedClass}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Academic Year</p>
                <p className="font-medium">{student.academicYear}</p>
              </div>
            </div>
          </div>

          {/* Parent Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Parent Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Father's Details */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-800">Father's Details</h3>
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium">{student.parentInfo.father.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Occupation</p>
                  <p className="font-medium">{student.parentInfo.father.occupation}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Contact</p>
                  <p className="font-medium">{student.parentInfo.father.phone}</p>
                  <p className="text-sm">{student.parentInfo.father.email}</p>
                </div>
              </div>

              {/* Mother's Details */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-800">Mother's Details</h3>
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium">{student.parentInfo.mother.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Occupation</p>
                  <p className="font-medium">{student.parentInfo.mother.occupation}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Contact</p>
                  <p className="font-medium">{student.parentInfo.mother.phone}</p>
                  <p className="text-sm">{student.parentInfo.mother.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Previous School Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Previous School Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">School Name</p>
                <p className="font-medium">{student.previousSchool.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Board</p>
                <p className="font-medium">{student.previousSchool.board}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Grade Completed</p>
                <p className="font-medium">{student.previousSchool.grade}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Percentage/Grade</p>
                <p className="font-medium">{student.previousSchool.percentage}</p>
              </div>
            </div>
          </div>

          {/* Application Details */}
          <div className="border-t pt-4 mt-6">
            <div className="text-sm text-gray-600">
              Application submitted on {new Date(student.submittedAt).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

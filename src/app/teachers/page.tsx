'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getTeachers } from '@/lib/sanity-queries'

interface Teacher {
  name: string
  imageUrl: string
  designation: string
  department: string
  qualifications: string[]
  experience: number
}

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTeachers() {
      try {
        const fetchedTeachers = await getTeachers()
        setTeachers(fetchedTeachers)
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch teachers', error)
        setLoading(false)
      }
    }
    fetchTeachers()
  }, [])

  // Get unique departments
  const departments = Array.from(new Set(
    teachers
      .map(teacher => teacher.department)
      .filter(dept => dept && dept.trim() !== '')
  ))

  // Filter teachers by department
  const filteredTeachers = selectedDepartment
    ? teachers.filter(teacher => 
        teacher.department?.trim().toLowerCase() === selectedDepartment.trim().toLowerCase()
      )
    : teachers

  useEffect(() => {
    console.log('All Teachers:', teachers)
    console.log('Departments Found:', departments)
    console.log('Selected Department:', selectedDepartment)
    console.log('Filtered Teachers:', filteredTeachers)
  }, [teachers, selectedDepartment])

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Our Exceptional Faculty
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-indigo-100">
            Meet the dedicated educators who inspire, guide, and transform student lives.
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Department Filter */}
        <div className="mb-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setSelectedDepartment(null)}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              selectedDepartment === null 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Departments
          </button>
          {departments.map(dept => (
            <button
              key={dept}
              onClick={() => setSelectedDepartment(dept)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                selectedDepartment === dept 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Teachers Grid */}
        {loading ? (
          <div className="text-center text-xl text-gray-600">Loading teachers...</div>
        ) : filteredTeachers.length === 0 ? (
          <div className="text-center text-xl text-gray-600">
            No teachers found in {selectedDepartment} department
          </div>
        ) : (
          <motion.div 
            initial="hidden" 
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { 
                  delayChildren: 0.2,
                  staggerChildren: 0.1 
                }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredTeachers.map((teacher, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300"
              >
                <div className="relative h-64 w-full">
                  <Image 
                    src={teacher.imageUrl || '/default-avatar.png'} 
                    alt={teacher.name} 
                    layout="fill" 
                    objectFit="cover" 
                    className="transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{teacher.name}</h3>
                  <p className="text-indigo-600 font-medium mb-1">{teacher.designation}</p>
                  <p className="text-gray-500 text-sm mb-4">{teacher.department}</p>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-semibold mb-2">Qualifications:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {teacher.qualifications?.map((qual, idx) => (
                        <li key={idx}>{qual}</li>
                      ))}
                    </ul>
                    <p className="mt-2 text-sm text-gray-500">
                      Experience: {teacher.experience} years
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

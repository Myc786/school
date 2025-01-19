'use client'

import Image from 'next/image'
import { getTeachers } from '@/lib/sanity-queries'
import { getAboutPageContent } from '@/lib/sanity-queries'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Teacher {
  name: string
  imageUrl: string
  designation: string
  department: string
  qualifications: string[]
  experience: number
}

interface AboutContent {
  mission: string
  vision: string
  keyFeatures: Array<{
    title: string
    description: string
    icon: string
  }>
  academicPrograms: Array<{
    title: string
    description: string
    grade: string
  }>
  statistics: {
    students: number
    teachers: number
    successRate: number
    yearsOfExcellence: number
  }
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function AboutUs() {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(true)
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const [fetchedTeachers, fetchedAboutContent] = await Promise.all([
          getTeachers(),
          getAboutPageContent()
        ])
        setTeachers(fetchedTeachers)
        setAboutContent(fetchedAboutContent)
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch data', error)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white"
      >
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              About Our School
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
              Empowering minds and building futures since 1990. We provide quality education with modern facilities and experienced faculty.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Mission and Vision */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-indigo-900 mb-4">Our Mission</h2>
              <p className="text-indigo-800">
                {aboutContent?.mission || "To provide comprehensive education that develops critical thinking, creativity, and character, preparing students for success in a rapidly evolving global society."}
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">Our Vision</h2>
              <p className="text-blue-800">
                {aboutContent?.vision || "To be a leading educational institution that nurtures innovative thinkers, ethical leaders, and responsible global citizens."}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Key Features */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(aboutContent?.keyFeatures || [
              {
                title: "Expert Faculty",
                description: "Highly qualified professionals with years of experience in their respective fields.",
                icon: "book"
              },
              {
                title: "Modern Facilities",
                description: "State-of-the-art infrastructure including labs, library, sports facilities, and smart classrooms.",
                icon: "building"
              },
              {
                title: "Holistic Development",
                description: "Focus on academic excellence along with co-curricular activities for overall student development.",
                icon: "star"
              }
            ]).map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  {/* You might want to replace this with actual icon rendering */}
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {feature.icon === 'book' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    )}
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Academic Programs */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
            Academic Programs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(aboutContent?.academicPrograms || [
              {
                title: "Primary Education",
                description: "Foundational learning with focus on literacy, numeracy, and creative development.",
                grade: "Grades 1-5"
              },
              {
                title: "Middle School",
                description: "Comprehensive education covering core subjects and electives.",
                grade: "Grades 6-8"
              },
              {
                title: "High School",
                description: "Advanced curriculum preparing students for higher education.",
                grade: "Grades 9-12"
              }
            ]).map((program, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }}
                className={`
                  bg-gradient-to-br 
                  ${index === 0 ? 'from-blue-50 to-indigo-50' : 
                    index === 1 ? 'from-purple-50 to-pink-50' : 
                    'from-green-50 to-teal-50'} 
                  p-6 rounded-lg shadow-sm
                `}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{program.title}</h3>
                <p className="text-gray-600 mb-2">{program.description}</p>
                <p className="text-sm text-gray-500 font-medium">{program.grade}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Faculty Preview Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="py-16 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Meet Our Exceptional Faculty
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Dedicated educators who inspire, guide, and transform student lives
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full text-center">Loading teachers...</div>
            ) : teachers.slice(0, 3).map((teacher, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative h-48 w-full">
                  <Image 
                    src={teacher.imageUrl || '/default-avatar.png'} 
                    alt={teacher.name} 
                    layout="fill" 
                    objectFit="cover" 
                    className="transition-transform duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-900">{teacher.name}</h3>
                  <p className="text-indigo-600 font-medium">{teacher.designation}</p>
                  <p className="text-gray-500 text-sm">{teacher.department}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/teachers" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 ease-in-out"
            >
              View All Faculty
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 ml-2" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Statistics with animations */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="bg-indigo-700 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">
                {aboutContent?.statistics.students || 500}+
              </div>
              <div className="text-indigo-100">Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">
                {aboutContent?.statistics.teachers || 50}+
              </div>
              <div className="text-indigo-100">Teachers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">
                {aboutContent?.statistics.successRate || 95}%
              </div>
              <div className="text-indigo-100">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">
                {aboutContent?.statistics.yearsOfExcellence || 30}+
              </div>
              <div className="text-indigo-100">Years of Excellence</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

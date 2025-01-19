'use client'

import Image from 'next/image'
import Link from 'next/link'
import ImageSlider from '@/components/ImageSlider'
import { 
  BookOpenIcon, 
  GraduationCapIcon, 
  ShieldCheckIcon, 
  UsersIcon, 
  ClockIcon, 
  TrophyIcon 
} from 'lucide-react'
import { UserButton, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'

interface HomeClientProps {
  campusHeroImage: string;
  isAuthenticated: boolean;
}

export default function HomeClient({ campusHeroImage, isAuthenticated }: HomeClientProps) {
  const features = [
    {
      icon: BookOpenIcon,
      title: "Innovative Learning",
      description: "Transforming education through cutting-edge pedagogical approaches and technology-enhanced learning experiences.",
      color: "bg-emerald-100 text-emerald-600"
    },
    {
      icon: GraduationCapIcon,
      title: "Holistic Development",
      description: "Nurturing not just academic excellence, but also emotional intelligence, creativity, and leadership skills.",
      color: "bg-sky-100 text-sky-600"
    },
    {
      icon: ShieldCheckIcon,
      title: "Safe & Inclusive Environment",
      description: "Creating a supportive, respectful, and secure learning ecosystem that celebrates diversity and individual potential.",
      color: "bg-purple-100 text-purple-600"
    }
  ]

  const achievements = [
    { icon: UsersIcon, number: "1500+", label: "Students" },
    { icon: ClockIcon, number: "50+", label: "Years of Excellence" },
    { icon: TrophyIcon, number: "100+", label: "Academic Awards" }
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="relative max-w-lg mx-auto lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-8">
            {/* Text Content */}
            <div className="mt-12 lg:m-0 lg:col-span-1 flex items-center">
              <div>
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  LUBNA G.B.S.S
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  Empowering minds, shaping futures. A center of academic excellence and holistic education.
                </p>
                <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                  <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
                    <SignedIn>
                      <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                    <SignedOut>
                      <SignInButton>
                        <Link 
                          href="/login" 
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                        >
                          Login
                        </Link>
                      </SignInButton>
                    </SignedOut>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Content */}
            <div className="mt-12 lg:m-0 lg:col-span-1 relative h-64 sm:h-72 lg:h-full">
              <Image 
                src="/images/campus/school.jpeg"
                alt="Campus Image"
                width={500}
                height={300}
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Image Slider Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Campus Highlights</h2>
        <ImageSlider />
      </section>

      {/* Redesigned Our Commitment Section */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Our Commitment to Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are dedicated to creating transformative educational experiences that empower students to become lifelong learners, critical thinkers, and compassionate global citizens.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              >
                <div className="p-6">
                  <div className={`mb-4 w-16 h-16 rounded-full flex items-center justify-center ${feature.color}`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <div className="bg-indigo-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Our Achievements
            </h2>
            <p className="mt-4 text-lg text-indigo-200">
              A legacy of excellence, growth, and continuous improvement
            </p>
          </div>
          <div className="mt-10 text-center grid grid-cols-1 gap-8 sm:grid-cols-3">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex flex-col items-center">
                <achievement.icon className="h-12 w-12 text-white mb-4" />
                <span className="text-4xl font-extrabold text-white">{achievement.number}</span>
                <span className="mt-2 text-base text-indigo-200">{achievement.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

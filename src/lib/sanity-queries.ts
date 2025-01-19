import { client } from './sanity-client'

// Define the Teacher interface
interface Teacher {
  name: string;
  imageUrl: string;
  designation: string;
  department: string;
  qualifications: string[];
  experience: number;
  _rawDocument?: any;
}

interface SanityQueryResult {
  teacherDocuments: any[];
  documentTypes: any[];
}

export async function getTeachers() {
  try {
    const query = `{
      "teacherDocuments": *[_type in ["teacher", "Teacher", "Staff", "Faculty"]] {
        name, 
        "imageUrl": image.asset->url,
        designation,
        department,
        qualifications[],
        experience,
        "_rawDocument": .
      },
      "documentTypes": *[true]._type
    }`

    console.log('Sanity Query:', query)
    console.log('Sanity Client Configuration:', {
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION
    })

    const result: SanityQueryResult = await client.fetch(query)

    console.group('Sanity Teacher Query Diagnostic Information')
    console.log('All Document Types:', result.documentTypes)
    console.log('Raw Teacher Documents:', result.teacherDocuments)
    console.groupEnd()

    // If no teachers found, log all document types for debugging
    if (!result.teacherDocuments || result.teacherDocuments.length === 0) {
      console.warn('No teachers found. Available document types:', result.documentTypes)
      return []
    }

    // Transform and validate teachers data
    const teachers = result.teacherDocuments.map((teacher: any): Teacher => {
      // Log each teacher document for detailed inspection
      console.log('Processing Teacher:', teacher)

      return {
        name: teacher.name || 'Unknown Teacher',
        imageUrl: teacher.imageUrl || '/default-teacher-image.png',
        designation: teacher.designation || 'Faculty',
        department: teacher.department || 'General',
        qualifications: teacher.qualifications || [],
        experience: teacher.experience || 0,
        // Include raw document for debugging
        _rawDocument: teacher._rawDocument
      }
    })

    // Log final processed teachers
    console.log('Processed Teachers:', teachers)

    // Additional validation
    const departmentsFound = Array.from(new Set(teachers.map(t => t.department)))
    console.log('Departments Found:', departmentsFound)

    return teachers
  } catch (error) {
    console.error('Critical Error in getTeachers():', error)
    
    // Detailed error logging
    if (error instanceof Error) {
      console.error('Error Name:', error.name)
      console.error('Error Message:', error.message)
      console.error('Error Stack:', error.stack)
    }

    // If it's a Sanity client error, log additional details
    if (error instanceof Error && 'response' in error) {
      const sanityError = error as any
      console.error('Sanity API Error Details:', {
        status: sanityError.response?.status,
        statusText: sanityError.response?.statusText,
        url: sanityError.response?.url,
        body: sanityError.response?.body
      })
    }

    return []
  }
}

export async function getAboutPageContent() {
  try {
    const query = `{
      "mission": *[_type == "aboutPage"][0].mission,
      "vision": *[_type == "aboutPage"][0].vision,
      "keyFeatures": *[_type == "aboutPage"][0].keyFeatures[]{
        title,
        description,
        icon
      },
      "academicPrograms": *[_type == "aboutPage"][0].academicPrograms[]{
        title,
        description,
        grade
      },
      "statistics": *[_type == "aboutPage"][0].statistics{
        students,
        teachers,
        successRate,
        yearsOfExcellence
      }
    }`

    const result = await client.fetch(query)

    return {
      mission: result.mission || "To provide comprehensive education that develops critical thinking, creativity, and character, preparing students for success in a rapidly evolving global society.",
      vision: result.vision || "To be a leading educational institution that nurtures innovative thinkers, ethical leaders, and responsible global citizens.",
      keyFeatures: result.keyFeatures?.map((feature: any) => ({
        title: feature.title || "Expert Faculty",
        description: feature.description || "Highly qualified professionals with years of experience in their respective fields.",
        icon: feature.icon || "book"
      })) || [
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
      ],
      academicPrograms: result.academicPrograms?.map((program: any) => ({
        title: program.title || "Primary Education",
        description: program.description || "Foundational learning with focus on literacy, numeracy, and creative development.",
        grade: program.grade || "Grades 1-5"
      })) || [
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
      ],
      statistics: result.statistics || {
        students: 500,
        teachers: 50,
        successRate: 95,
        yearsOfExcellence: 30
      }
    }
  } catch (error) {
    console.error('Failed to fetch About page content:', error)
    
    // Return default content if fetch fails
    return {
      mission: "To provide comprehensive education that develops critical thinking, creativity, and character, preparing students for success in a rapidly evolving global society.",
      vision: "To be a leading educational institution that nurtures innovative thinkers, ethical leaders, and responsible global citizens.",
      keyFeatures: [
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
      ],
      academicPrograms: [
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
      ],
      statistics: {
        students: 500,
        teachers: 50,
        successRate: 95,
        yearsOfExcellence: 30
      }
    }
  }
}

export const sliderImagesQuery = `*[_type == "slider"] | order(order asc) {
  title,
  description,
  "imageUrl": image.asset->url
}`;

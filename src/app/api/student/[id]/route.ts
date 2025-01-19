import { NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity'
import { groq } from 'next-sanity'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const query = groq`*[_type == "admission" && applicationNumber == $id][0]{
      applicationNumber,
      status,
      studentName,
      dateOfBirth,
      gender,
      appliedClass,
      academicYear,
      parentInfo,
      address,
      previousSchool,
      submittedAt
    }`

    const student = await sanityClient.fetch(query, { id: params.id })

    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(student)
  } catch (error) {
    console.error('Error fetching student:', error)
    return NextResponse.json(
      { error: 'Failed to fetch student details' },
      { status: 500 }
    )
  }
}

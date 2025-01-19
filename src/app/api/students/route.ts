import { NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity'
import { groq } from 'next-sanity'

export async function GET() {
  try {
    const query = groq`*[_type == "admission"] | order(submittedAt desc) {
      applicationNumber,
      studentName,
      appliedClass,
      status,
      submittedAt
    }`

    const students = await sanityClient.fetch(query)

    return NextResponse.json(students)
  } catch (error) {
    console.error('Error fetching students:', error)
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    )
  }
}

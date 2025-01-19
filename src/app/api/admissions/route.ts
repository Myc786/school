import { NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Generate application number (you can customize this format)
    const applicationNumber = `APP${Date.now()}`
    
    // Prepare the document
    const doc = {
      _type: 'admission',
      applicationNumber,
      submittedAt: new Date().toISOString(),
      status: 'pending',
      studentName: {
        first: body.studentName.first,
        middle: body.studentName.middle || '',
        last: body.studentName.last
      },
      dateOfBirth: body.dateOfBirth,
      gender: body.gender,
      appliedClass: parseInt(body.appliedClass),
      academicYear: new Date().getFullYear().toString(),
      parentInfo: {
        father: {
          name: body.parentInfo.father.name,
          occupation: body.parentInfo.father.occupation,
          phone: body.parentInfo.father.phone,
          email: body.parentInfo.father.email
        },
        mother: {
          name: body.parentInfo.mother.name,
          occupation: body.parentInfo.mother.occupation,
          phone: body.parentInfo.mother.phone,
          email: body.parentInfo.mother.email
        }
      },
      previousSchool: {
        name: body.previousSchool.name,
        board: body.previousSchool.board,
        grade: body.previousSchool.grade,
        percentage: body.previousSchool.percentage
      }
    }

    console.log('Attempting to create document:', doc)

    // Save to Sanity
    const result = await sanityClient.create(doc)
    console.log('Document created:', result)

    return NextResponse.json({ 
      success: true, 
      applicationNumber: result.applicationNumber 
    })
  } catch (error) {
    console.error('Error submitting admission form:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to submit application',
        details: error
      },
      { status: 500 }
    )
  }
}

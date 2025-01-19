export default {
  name: 'student',
  title: 'Student',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'studentId',
      title: 'Student ID',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'grade',
      title: 'Grade',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(1).max(12),
    },
    {
      name: 'section',
      title: 'Section',
      type: 'string',
    },
    {
      name: 'dateOfBirth',
      title: 'Date of Birth',
      type: 'date',
    },
    {
      name: 'parentName',
      title: 'Parent/Guardian Name',
      type: 'string',
    },
    {
      name: 'parentEmail',
      title: 'Parent/Guardian Email',
      type: 'string',
    },
    {
      name: 'parentPhone',
      title: 'Parent/Guardian Phone',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'text',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'studentId',
    },
  },
}

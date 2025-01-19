export default {
  name: 'teacher',
  title: 'Teachers',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      }
    },
    {
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      }
    },
    {
      name: 'designation',
      title: 'Designation',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'department',
      title: 'Department',
      type: 'string'
    },
    {
      name: 'qualifications',
      title: 'Qualifications',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'experience',
      title: 'Years of Experience',
      type: 'number'
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'text'
    },
    {
      name: 'subjects',
      title: 'Subjects Taught',
      type: 'array',
      of: [{ type: 'string' }]
    }
  ]
}

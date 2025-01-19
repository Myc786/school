export default {
  name: 'admission',
  title: 'Admission',
  type: 'document',
  fields: [
    {
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'dateOfBirth',
      title: 'Date of Birth',
      type: 'date',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'gradeApplying',
      title: 'Grade Applying For',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(1).max(12),
    },
    {
      name: 'parentName',
      title: 'Parent/Guardian Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'parentEmail',
      title: 'Parent/Guardian Email',
      type: 'string',
      validation: (Rule: any) => Rule.required().email(),
    },
    {
      name: 'parentPhone',
      title: 'Parent/Guardian Phone',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'address',
      title: 'Address',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'documents',
      title: 'Documents',
      type: 'array',
      of: [{ type: 'file' }],
    },
    {
      name: 'status',
      title: 'Application Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Approved', value: 'approved' },
          { title: 'Rejected', value: 'rejected' },
        ],
      },
      initialValue: 'pending',
    },
    {
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: (new Date()).toISOString(),
    },
  ],
}

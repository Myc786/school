export default {
  name: 'attendance',
  title: 'Attendance',
  type: 'document',
  fields: [
    {
      name: 'student',
      title: 'Student',
      type: 'reference',
      to: [{ type: 'student' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'status',
      title: 'Attendance Status',
      type: 'string',
      options: {
        list: [
          { title: 'Present', value: 'present' },
          { title: 'Absent', value: 'absent' },
          { title: 'Late', value: 'late' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'notes',
      title: 'Notes',
      type: 'text',
    },
    {
      name: 'markedBy',
      title: 'Marked By',
      type: 'reference',
      to: [{ type: 'staff' }],
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'student.name',
      subtitle: 'date',
      status: 'status',
    },
    prepare(selection: any) {
      const { title, subtitle, status } = selection
      return {
        title: title,
        subtitle: `${subtitle} - ${status}`,
      }
    },
  },
}

export default {
  name: 'class',
  title: 'Classes',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Class Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'grade',
      title: 'Grade Level',
      type: 'number',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'section',
      title: 'Section',
      type: 'string'
    },
    {
      name: 'subjects',
      title: 'Subjects',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Subject Name',
              type: 'string'
            },
            {
              name: 'teacher',
              title: 'Teacher',
              type: 'reference',
              to: [{ type: 'teacher' }]
            }
          ]
        }
      ]
    },
    {
      name: 'schedule',
      title: 'Class Schedule',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'day',
              title: 'Day',
              type: 'string',
              options: {
                list: [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday'
                ]
              }
            },
            {
              name: 'periods',
              title: 'Periods',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'subject',
                      title: 'Subject',
                      type: 'string'
                    },
                    {
                      name: 'startTime',
                      title: 'Start Time',
                      type: 'string'
                    },
                    {
                      name: 'endTime',
                      title: 'End Time',
                      type: 'string'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

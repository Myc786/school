export default {
  name: 'slider',
  title: 'Slider Images',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Order of appearance in slider',
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
}

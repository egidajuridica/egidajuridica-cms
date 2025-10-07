import { CollectionConfig } from 'payload'
import { slugify } from '../../utils/slug'

const Tags: CollectionConfig = {
  slug: 'tags',
  labels: {
    singular: 'Etiqueta',
    plural: 'Etiquetas',
  },
  admin: {
    useAsTitle: 'name',
    description: 'Etiquetas unificadas pero con ámbito definido.',
  },
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'super-admin',
    update: ({ req }) => req.user?.role === 'super-admin',
    delete: ({ req }) => req.user?.role === 'super-admin',
  },
  fields: [
    {
      name: 'name',
      label: 'Nombre del Tag',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      unique: true,
      admin: { readOnly: true },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.name) {
              return slugify(data.name)
            }
            return value
          },
        ],
      },
    },
    {
      name: 'type',
      label: 'Tipo de Etiqueta',
      type: 'select',
      required: true,
      options: [
        { label: 'Blog', value: 'blog' },
        { label: 'Recursos Legales', value: 'resource' },
        { label: 'Buscador', value: 'search' },
      ],
    },
  ],
}

export default Tags

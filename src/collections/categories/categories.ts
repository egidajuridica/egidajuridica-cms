import { CollectionConfig } from 'payload'
import { slugify } from '../../utils/slug'

const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: 'Categoría',
    plural: 'Categorías',
  },
  admin: {
    useAsTitle: 'name',
    hidden: false,
  },
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'super-admin',
    update: ({ req }) => req.user?.role === 'super-admin',
    delete: ({ req }) => req.user?.role === 'super-admin',
  },
  fields: [
    {
      name: 'scope',
      label: 'Ámbito',
      type: 'select',
      required: true,
      options: [
        { label: 'Blog', value: 'blog' },
        { label: 'Recursos Legales', value: 'legal' },
      ],
      defaultValue: 'blog',
    },
    {
      name: 'name',
      label: 'Nombre',
      type: 'text',
      required: true,
      unique: true,
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
      name: 'tags',
      label: 'Etiquetas relacionadas',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      admin: {
        condition: (data) => ['blog', 'legal'].includes(data?.scope),
        description: 'Selecciona las etiquetas que pertenecen a esta categoría.',
      },
      filterOptions: ({ data }) => {
        if (data?.scope === 'blog') {
          return { type: { equals: 'blog' } }
        }
        if (data?.scope === 'legal') {
          return { type: { equals: 'resource' } }
        }
        return false
      },
    },
  ],
}

export default Categories

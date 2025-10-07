import { CollectionConfig } from 'payload'

const ContentTypes: CollectionConfig = {
  slug: 'content-types',
  labels: {
    singular: 'Tipo de Contenido',
    plural: 'Tipos de Contenido',
  },
  admin: {
    useAsTitle: 'name',
    description: 'Define los tipos de contenido disponibles para el buscador.',
    hidden: true,
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
      label: 'Nombre',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
}

export default ContentTypes

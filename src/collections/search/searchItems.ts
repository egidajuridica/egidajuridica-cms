import { CollectionConfig, CollectionSlug } from 'payload'

const SearchItems: CollectionConfig = {
  slug: 'search-items',
  labels: {
    singular: 'Ítem de Búsqueda',
    plural: 'Ítems de Búsqueda',
  },
  admin: {
    useAsTitle: 'title',
    description: 'Índice centralizado de búsqueda. Contiene elementos automáticos y manuales.',
    defaultColumns: ['title', 'type', 'sourceIndicator', 'category', 'isActive', 'priority'],
  },
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'super-admin',
    update: ({ req }) => req.user?.role === 'super-admin',
    delete: ({ req }) => req.user?.role === 'super-admin',
  },
  fields: [
    {
      name: 'type',
      label: 'Tipo de Contenido',
      type: 'relationship',
      relationTo: 'content-types' as CollectionSlug,
      required: true,
    },
    {
      name: 'title',
      label: 'Título',
      type: 'text',
      required: true,
    },
    {
      name: 'excerpt',
      label: 'Resumen',
      type: 'textarea',
      required: true,
    },
    {
      name: 'url',
      label: 'Enlace al Contenido',
      type: 'text',
      required: true,
    },
    {
      name: 'tags',
      label: 'Etiquetas',
      type: 'relationship',
      relationTo: 'tags' as CollectionSlug,
      hasMany: true,
      required: false,
      filterOptions: {
        type: { in: ['search'] },
      },
    },
    {
      name: 'priority',
      label: 'Prioridad de Búsqueda',
      type: 'number',
      defaultValue: 5,
      min: 0,
      max: 10,
      admin: {
        description: 'Un número más alto (0-10) aparecerá primero en los resultados.',
      },
    },
    {
      name: 'isActive',
      label: 'Activo en Búsquedas',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}

export default SearchItems

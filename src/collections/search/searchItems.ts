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
      type: 'select',
      required: true,
      options: [
        { label: 'Blog', value: 'blog' },
        { label: 'Documento', value: 'document' },
        { label: 'Área', value: 'area' },
        { label: 'Servicio', value: 'service' },
        { label: 'Recurso', value: 'resource' },
      ],
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

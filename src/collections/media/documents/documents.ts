import type { CollectionConfig } from 'payload'
const Documents: CollectionConfig = {
  slug: 'documents',
  labels: {
    singular: 'Documento',
    plural: 'Documentos',
  },
  access: { read: () => true },
  upload: {
    disableLocalStorage: true,
    mimeTypes: [
      // Documentos PDF
      'application/pdf',
      // Microsoft Word
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      // Microsoft Excel
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      // Microsoft PowerPoint
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      // Texto plano
      'text/plain',
      'text/csv',
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
    ],
  },
  hooks: {
    afterRead: [
      ({ doc }) => {
        if (doc?.filename) {
          const bucket = process.env.S3_BUCKET!
          const region = process.env.AWS_REGION || process.env.S3_REGION!
          const prefix = process.env.S3_PREFIX_DOCUMENTOS || 'storage-recursos/'
          const baseUrl = `https://${bucket}.s3.${region}.amazonaws.com`
          const filename = doc.filename.startsWith(prefix)
            ? doc.filename
            : `${prefix}${doc.filename}`
          doc.url = `${baseUrl}/${filename}`

          if (doc.sizes) {
            for (const sizeKey of Object.keys(doc.sizes)) {
              const sizeData = doc.sizes[sizeKey]
              if (sizeData?.filename) {
                const sizeFilename = sizeData.filename.startsWith(prefix)
                  ? sizeData.filename
                  : `${prefix}${sizeData.filename}`
                sizeData.url = `${baseUrl}/${sizeFilename}`
              }
            }
          }
        }
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'titulo',
      type: 'text',
      label: 'Título del documento',
      required: true,
    },
    {
      name: 'descripcion',
      type: 'textarea',
      label: 'Descripción',
      required: true,
    },
    {
      name: 'categoria',
      type: 'select',
      label: 'Categoría',
      options: [
        { label: 'Guías Laborales', value: 'guias-laborales' },
        { label: 'Formatos', value: 'formatos' },
        { label: 'Manuales', value: 'manuales' },
        { label: 'Documentos Legales', value: 'documentos-legales' },
        { label: 'Recursos', value: 'recursos' },
        { label: 'Otros', value: 'otros' },
      ],
      required: true,
    },
  ],
}

export default Documents

import { Blog as PrismaBlog } from '@prisma/client'

// Extend the Prisma Blog type to include editorData field
export interface Blog extends PrismaBlog {
    editorData?: string | null
}
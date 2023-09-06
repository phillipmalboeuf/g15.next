import { createClient } from 'contentful'

const preview = true

export const contentful = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: preview ? process.env.CONTENTFUL_PREVIEW_TOKEN : process.env.CONTENTFUL_ACCESS_TOKEN,
  host: preview ? "preview.contentful.com" : undefined
}).withoutUnresolvableLinks
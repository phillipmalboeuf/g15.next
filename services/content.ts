
import type { Asset, Entry, EntryCollection } from 'contentful'
import type { Document } from '@contentful/rich-text-types'
import { createClient } from 'contentful'

export const contentful = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})

export interface NavigationLink {
  titre: string
  link: string
  external?: boolean
  emphasize: boolean
  subLinks: Entry<NavigationLink>[]
  // photo?: Asset
}

export interface Navigation {
  titre: string
  id: string
  links: Entry<NavigationLink>[]
}

export interface Page {
  titre: string
  id: string
  description: string
  contenu: Entry<any>[]
}

export interface ArticleCategory {
  titre: string
  id: string
  description: string
  photo: Asset
}

export interface Article {
  titre: string
  id: string
  category: string
  excerpt: string
  publishedAt: Date
  text: Document
}

export interface Navigations {
  header: Entry<Navigation>
  footer: Entry<Navigation>
  social: Entry<Navigation>
  legal: Entry<Navigation>
}

const limit = 12

export const ContentService = {
  navigation: async (locale: string): Promise<Navigations> => {
    const [navs] = await Promise.all([
      contentful.getEntries<Navigation>({ content_type: 'navigation', locale, include: 2 }),
      // contentful.getEntries<NavigationLink>({ content_type: 'navigationLink', locale, include: 2 })
    ])
    return {
      header: navs.items.find(nav => nav.fields.id === 'header'),
      footer: navs.items.find(nav => nav.fields.id === 'footer'),
      social: navs.items.find(nav => nav.fields.id === 'social'),
      legal: navs.items.find(nav => nav.fields.id === 'legal'),
    }
  },
  page: async (id: string, locale: string) => {
    const pages = await contentful.getEntries<Page>({ content_type: 'page', locale, include: 2,
      'fields.id': id })
      console.log(pages)
    return pages.items[0]
  },
  article: async (id: string, locale: string) => {
    const articles = await contentful.getEntries<Article>({ content_type: 'article', locale, include: 2,
      'fields.id': id })
    return articles.items[0]
  },
  articles: async (category: string, page: string, sort: string, locale: string) => {
    const articles = await contentful.getEntries<Article>({ content_type: 'article', locale, include: 3,
      'fields.category': category,
      'fields.publishedAt[lte]': new Date().toISOString(),
      limit,
      skip: page ? parseInt(page) * limit : 0,
      order: {
        'newest': '-fields.publishedAt',
        'oldest': 'fields.publishedAt'
      }[sort as string || 'newest'] })
    return articles
  },
  categories: async (locale: string) => {
    const categories = await contentful.getEntries<ArticleCategory>({ content_type: 'articleCategory', locale })
    return categories.items.reduce((reduction, category)=> {
      reduction[category.fields.id] = category
      return reduction
    }, {} as {[identifier: string]: Entry<ArticleCategory>})
  },
}

import type { Asset, Entry, EntryCollection } from 'contentful'
import type { Document } from '@contentful/rich-text-types'
import { contentful } from '../clients/contentful'


export interface NavigationLink {
  titre: string
  link: string
  external?: boolean
  emphasize: boolean
  subLinks: Entry<NavigationLink>[]
  photo?: Asset
  ctaButton?: string
}

export interface Navigation {
  titre: string
  identifier: string
  links: Entry<NavigationLink>[]
}

export interface Page {
  titre: string
  id: string
  description: string
  body: Document
  showDiscount?: boolean
  hidePopup?: boolean
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
  body: Document
}

export interface Navigations {
  navs: Entry<Navigation>[]
}

const limit = 9

export const ContentService = {
  navigation: async (locale: string): Promise<Navigations> => {
    const [navs] = await Promise.all([
      contentful.getEntries<Navigation>({ content_type: 'navigation', locale, include: 2 }),
      // contentful.getEntries<NavigationLink>({ content_type: 'navigationLink', locale, include: 2 })
    ])
    return {
      navs: navs.items
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
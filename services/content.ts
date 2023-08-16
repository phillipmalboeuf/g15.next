
import type { Asset, Entry, EntryCollection } from 'contentful'
import { contentful } from '@/clients/contentful'
import { GetStaticPropsContext } from 'next'

import { TypeArticleSkeleton, TypeArticlesFields, TypeArticlesSkeleton, TypeLinkSkeleton, TypeNavigationSkeleton, TypePageSkeleton } from '@/clients/content_types'

export interface Navigations {
  header: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  footer: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  social: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  legal: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
}

const limit = 42

export const ContentService = {
  navigation: async (locale: string) => {
    const [navs] = await Promise.all([
      contentful.getEntries<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">({ content_type: 'navigation', locale, include: 2 }),
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
    const pages = await contentful.getEntries<TypePageSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">({ content_type: 'page', locale, include: 4,
      'fields.id': id })
    return pages.items[0]
  },
  article: async (id: string, locale: string) => {
    const articles = await contentful.getEntries<TypeArticleSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">({ content_type: 'article', locale, include: 2,
      'fields.id': id })
    return articles.items[0]
  },
  articles: async (tag: string, page: number, sort: string, locale: string, limitOverride?: number) => {
    const articles = await contentful.getEntries<TypeArticleSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">({ content_type: 'article', locale, include: 3,
      'fields.tags': tag,
      'fields.publishedAt[lte]': new Date().toISOString(),
      limit: (limitOverride || limit),
      skip: page ? page * (limitOverride || limit) : 0,
      order: {
        'newest': '-fields.publishedAt',
        'oldest': 'fields.publishedAt'
      }[sort as string || 'newest'] })
    return articles
  },
  // categories: async (locale: string) => {
  //   const categories = await contentful.getEntries<ArticleCategory>({ content_type: 'articleCategory', locale })
  //   return categories.items.reduce((reduction, category)=> {
  //     reduction[category.fields.id] = category
  //     return reduction
  //   }, {} as {[identifier: string]: Entry<ArticleCategory>})
  // },
}

export const getPageProps = async (context: GetStaticPropsContext, id: string) => {
  const [page, navigation] = await Promise.all([
    ContentService.page(id, context.locale),
    ContentService.navigation(context.locale),
  ])

  if (page?.fields.contenu) {
    for (let index = 0; index < page.fields.contenu.length; index++) {
      const item = page.fields.contenu[index]
      if (item.sys.contentType.sys.id === 'articles') {
        item.fields.articles = (await ContentService.articles(item.fields.tag, 0, 'newest', context.locale, 4)).items
      }
    }
  }
  
  return {
    ...!page && { notFound: true },
    props: {
      id,
      title: 'g15plus.quebec',
      page,
      navigation,
    },
    revalidate: 1
  }
}
import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeArticleFields {
    titre?: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    publishedAt?: EntryFieldTypes.Date;
    tags?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    photo?: EntryFieldTypes.AssetLink;
    excerpt?: EntryFieldTypes.Text;
    text?: EntryFieldTypes.RichText;
}

export type TypeArticleSkeleton = EntrySkeletonType<TypeArticleFields, "article">;
export type TypeArticle<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeArticleSkeleton, Modifiers, Locales>;

export interface TypeArticlesFields {
    titre?: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    tag: EntryFieldTypes.Symbol;
}

export type TypeArticlesSkeleton = EntrySkeletonType<TypeArticlesFields, "articles">;
export type TypeArticles<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeArticlesSkeleton, Modifiers, Locales>;

export interface TypeCardFields {
    titre?: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    text?: EntryFieldTypes.RichText;
    icon?: EntryFieldTypes.AssetLink;
}

export type TypeCardSkeleton = EntrySkeletonType<TypeCardFields, "card">;
export type TypeCard<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeCardSkeleton, Modifiers, Locales>;

export interface TypeCardsFields {
    titre?: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    cards?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeCardSkeleton>>;
}

export type TypeCardsSkeleton = EntrySkeletonType<TypeCardsFields, "cards">;
export type TypeCards<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeCardsSkeleton, Modifiers, Locales>;

export interface TypeHeroFields {
    id?: EntryFieldTypes.Symbol;
    media?: EntryFieldTypes.AssetLink;
    dark?: EntryFieldTypes.Boolean;
    caption?: EntryFieldTypes.RichText;
}

export type TypeHeroSkeleton = EntrySkeletonType<TypeHeroFields, "hero">;
export type TypeHero<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeHeroSkeleton, Modifiers, Locales>;

export interface TypeLinkFields {
    titre?: EntryFieldTypes.Symbol;
    link?: EntryFieldTypes.Symbol;
    external?: EntryFieldTypes.Boolean;
    emphasize?: EntryFieldTypes.Boolean;
    subLinks?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLinkSkeleton>>;
}

export type TypeLinkSkeleton = EntrySkeletonType<TypeLinkFields, "link">;
export type TypeLink<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeLinkSkeleton, Modifiers, Locales>;

export interface TypeMembreFields {
    nom: EntryFieldTypes.Symbol;
    titre?: EntryFieldTypes.Symbol;
    photo?: EntryFieldTypes.AssetLink;
    entreprise?: EntryFieldTypes.Symbol;
    entrepriseLink?: EntryFieldTypes.Symbol;
}

export type TypeMembreSkeleton = EntrySkeletonType<TypeMembreFields, "membre">;
export type TypeMembre<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeMembreSkeleton, Modifiers, Locales>;

export interface TypeMembresFields {
    titre?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    membres?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeMembreSkeleton>>;
}

export type TypeMembresSkeleton = EntrySkeletonType<TypeMembresFields, "membres">;
export type TypeMembres<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeMembresSkeleton, Modifiers, Locales>;

export interface TypeNavigationFields {
    titre?: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    links?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLinkSkeleton>>;
}

export type TypeNavigationSkeleton = EntrySkeletonType<TypeNavigationFields, "navigation">;
export type TypeNavigation<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeNavigationSkeleton, Modifiers, Locales>;

export interface TypePageFields {
    titre: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    description?: EntryFieldTypes.Text;
    contenu?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeArticlesSkeleton | TypeCardsSkeleton | TypeHeroSkeleton | TypeMembresSkeleton | TypePiliersSkeleton | TypeTextSkeleton | TypeTextsSkeleton>>;
}

export type TypePageSkeleton = EntrySkeletonType<TypePageFields, "page">;
export type TypePage<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypePageSkeleton, Modifiers, Locales>;

export interface TypePilierFields {
    titre?: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    media?: EntryFieldTypes.AssetLink;
    cta?: EntryFieldTypes.Symbol;
    propositions?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeTextSkeleton>>;
}

export type TypePilierSkeleton = EntrySkeletonType<TypePilierFields, "pilier">;
export type TypePilier<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypePilierSkeleton, Modifiers, Locales>;

export interface TypePiliersFields {
    id?: EntryFieldTypes.Symbol;
    piliers?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypePilierSkeleton>>;
}

export type TypePiliersSkeleton = EntrySkeletonType<TypePiliersFields, "piliers">;
export type TypePiliers<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypePiliersSkeleton, Modifiers, Locales>;

export interface TypeTextFields {
    titre?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    layout?: EntryFieldTypes.Symbol<"Big" | "Hero" | "Small">;
    text?: EntryFieldTypes.RichText;
    couleur?: EntryFieldTypes.Symbol;
    background?: EntryFieldTypes.AssetLink;
    dark?: EntryFieldTypes.Boolean;
    links?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLinkSkeleton>>;
}

export type TypeTextSkeleton = EntrySkeletonType<TypeTextFields, "text">;
export type TypeText<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeTextSkeleton, Modifiers, Locales>;

export interface TypeTextsFields {
    titre?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    intro?: EntryFieldTypes.RichText;
    texts?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeCardsSkeleton | TypeTextSkeleton>>;
}

export type TypeTextsSkeleton = EntrySkeletonType<TypeTextsFields, "texts">;
export type TypeTexts<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeTextsSkeleton, Modifiers, Locales>;

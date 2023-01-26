import { Asset, Entry } from 'contentful'
import { Fragment, FunctionComponent } from 'react'

export const Media: FunctionComponent<{
  media: Asset
  eager?: boolean
  ar?: number
}> = ({ media, eager, ar }) => {

  function cdn(url: string) {
    return url.replace(`//images.ctfassets.net/fpl9h4np0egs`, '//g15.imgix.net')
  }

  if (!media) return

  if (media.fields.file.contentType?.startsWith('video/')) {
    return <video src={media.fields.file.url} autoPlay={eager} muted={eager} loop={eager}></video>
  }

  if (media.fields.file.contentType?.startsWith('audio/')) {
    return <audio src={media.fields.file.url} controls />
  }

  return  <picture>
    <source srcSet={cdn(media.fields.file.url) + "?auto=compress,format&w=900" + (ar ? `&h=${Math.round(ar * 900)}&fit=fill` : '')} media="(max-width: 900px)" />
    <source srcSet={cdn(media.fields.file.url) + "?auto=compress,format&w=1200" + (ar ? `&h=${Math.round(ar * 1200)}&fit=fill` : '')} media="(max-width: 1200px)" />
    <img src={cdn(media.fields.file.url) + "?auto=compress,format&w=1200" + (ar ? `&h=${Math.round(ar * 1200)}&fit=fill` : '')} style={ar && { aspectRatio: 1800 / Math.round(ar * 1800) }} alt={`${media.fields.title} ${media.fields.description}`} loading={eager ? "eager" : "lazy"} />
  </picture>
}
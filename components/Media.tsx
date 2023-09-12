import { Asset, Entry } from 'contentful'
import { Fragment, FunctionComponent } from 'react'

export const Media: FunctionComponent<{
  media: Asset<"WITHOUT_UNRESOLVABLE_LINKS">
  eager?: boolean
  ar?: number
  contain?: boolean
  padding?: number
}> = ({ media, eager, ar, contain, padding }) => {

  function cdn(url: string) {
    return url.replace(`//images.ctfassets.net/fpl9h4np0egs`, '//g15.imgix.net')
  }

  if (!media) return

  if (media.fields.file.contentType?.startsWith('video/')) {
    return <picture><video src={media.fields.file.url} autoPlay={eager} muted={eager} loop={eager} playsInline={eager} controls={!eager} style={ar && { aspectRatio: 1800 / Math.round(ar * 1800), objectFit: "cover" }}></video></picture>
  }

  if (media.fields.file.contentType?.startsWith('audio/')) {
    return <audio src={media.fields.file.url} controls />
  }

  if (media.fields.file.contentType?.startsWith('application/pdf')) {
    return <>
      <object data={media.fields.file.url} type="application/pdf" aria-label={media.fields.title}></object><a id={media.sys.id} href={media.fields.file.url} target='_blank'>{media.fields.title}</a> <a href={media.fields.file.url} download aria-describedby={media.sys.id}>Download</a>
    </>
  }

  return (
    <picture>
      <source srcSet={cdn(media.fields.file.url) + "?auto=compress,format&w=900" + (ar ? `&h=${Math.round(ar * 900)}&fit=${contain ? 'fill' : 'crop'}` : '') + (padding ? `&pad=${padding}` : '')} media="(max-width: 900px)" />
      <source srcSet={cdn(media.fields.file.url) + "?auto=compress,format&w=1200" + (ar ? `&h=${Math.round(ar * 1200)}&fit=${contain ? 'fill' : 'crop'}` : '') + (padding ? `&pad=${padding}` : '')} media="(max-width: 1200px)" />
      <img src={cdn(media.fields.file.url) + "?auto=compress,format&w=1800" + (ar ? `&h=${Math.round(ar * 1800)}&fit=${contain ? 'fill' : 'crop'}` : '') + (padding ? `&pad=${padding}` : '')} style={ar && { aspectRatio: 1800 / Math.round(ar * 1800) }} alt={`${media.fields.title} ${media.fields.description}`} loading={eager ? "eager" : "lazy"} />
    </picture>
  );
}
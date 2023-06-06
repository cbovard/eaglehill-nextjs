import { DrupalJsonApiParams } from "drupal-jsonapi-params"

// A helper function to build params for a resource type.
export function getParams(
  name: string,
  mode: string = null
): DrupalJsonApiParams {
  const params = new DrupalJsonApiParams()

  name = mode ? `${name}--${mode}` : name

  // console.log(name, 'name');

  // if (name === "node--home-page") {
  //   return params
  //     .addFilter("status", "1")
  //     .addInclude(["field_page_images.field_media_image"])
  //     .addFields("node--page", ["title", "body", "status", "field_page_images"])
  //     .addFields("media--image", ["field_media_image"])
  //     .addFields("file--file", ["uri", "resourceIdObjMeta"])
  // }

  if (name === "node--page") {
    return params
      .addFilter("status", "1")
      .addInclude(["field_page_images.field_media_image"])
      .addFields("node--page", ["title", "body", "status", "field_page_images"])
      .addFields("media--image", ["field_media_image"])
      .addFields("file--file", ["uri", "resourceIdObjMeta"])
  }

  if (name === "node--news--teaser") {
    return params
      .addFilter("status", "1")
      .addInclude(["field_news_images.field_media_image"])
      .addFields("node--news", ["title", "body", "path", "field_news_images"])
      .addFields("media--image", ["field_media_image"])
      .addFields("file--file", ["uri", "resourceIdObjMeta"])
      .addPageLimit(5)
  }

  // if (name === "node--article") {
  //   return params
  //     .addInclude([
  //       "field_media_image.field_media_image",
  //       "uid.user_picture",
  //       "field_tags",
  //     ])
  //     .addFields("node--article", [
  //       "title",
  //       "status",
  //       "path",
  //       "field_media_image",
  //       "body",
  //       "created",
  //       "uid",
  //       "field_tags",
  //     ])
  //     .addFields("user--user", ["display_name", "user_picture"])
  //     .addFields("media--image", ["field_media_image"])
  //     .addFields("file--file", ["uri", "resourceIdObjMeta"])
  //     .addFields("taxonomy_term--tags", ["name", "path"])
  // }

  if (name === "block_content--banner_block") {
    return params
      .addInclude(["field_media_image.field_media_image"])
      .addFields("block_content--banner_block", [
        "field_title",
        "field_summary",
        "field_content_link",
        "field_media_image",
      ])
      .addFields("media--image", ["field_media_image"])
      .addFields("file--file", ["uri", "resourceIdObjMeta"])
  }

  if (name === "block_content--footer_promo_block") {
    return params
      .addInclude(["field_media_image.field_media_image"])
      .addFields("block_content--footer_promo_block", [
        "field_title",
        "field_summary",
        "field_content_link",
        "field_media_image",
      ])
      .addFields("media--image", ["field_media_image"])
      .addFields("file--file", ["uri", "resourceIdObjMeta"])
  }

  if (name === "block_content--disclaimer_block") {
    return params.addFields("block_content--disclaimer_block", [
      "field_copyright",
      "field_disclaimer",
    ])
  }

  if (name === "menu_link_content--menu_link_content") {
    return params.addFields("menu_link_content--menu_link_content", [
      "title,url",
    ])
  }

}

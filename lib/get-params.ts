import { DrupalJsonApiParams } from "drupal-jsonapi-params";

// A helper function to build params for a resource type.
export function getParams(
  name: string,
  mode: string = null,
): DrupalJsonApiParams {
  const params = new DrupalJsonApiParams();

  name = mode ? `${name}--${mode}` : name;

  if (name === "node--page") {
    return params
      .addFilter("status", "1")
      .addInclude(["field_page_images.field_media_image"])
      .addFields("node--page", ["title", "body", "status", "field_page_images"])
      .addFields("media--image", ["field_media_image"])
      .addFields("file--file", ["uri", "resourceIdObjMeta", "image_style_uri"]);
  }

  if (name === "node--news") {
    return params
      .addFilter("status", "1")
      .addInclude(["field_news_images.field_media_image"])
      .addFields("node--news", ["title", "body", "status", "field_news_images"])
      .addFields("media--image", ["field_media_image"])
      .addFields("file--file", ["uri", "resourceIdObjMeta", "image_style_uri"]);
  }

  if (name === "node--livestock") {
    return params
      .addFilter("status", "1")
      .addInclude(["field_livestock_images.field_media_image"])
      .addFields("node--livestock", [
        "title",
        "body",
        "status",
        "field_livestock_images",
        "field_price_fee",
      ])
      .addFields("media--image", ["field_media_image"])
      .addFields("file--file", ["uri", "resourceIdObjMeta", "image_style_uri"]);
  }

  if (name === "slideshows--slideshow_block") {
    return params.addInclude(["field_slideshow_image.field_media_image"]);
  }

  if (name === "front_page_ctas--front_page_ctas_block") {
    return params.addInclude(["field_cta_image.field_media_image"]);
  }

  if (name === "block_content--news_block") {
    return params.addFields("node--news", ["title", "body", "path"]);
  }

  if (name === "menu_link_content--menu_link_content") {
    return params.addFields("menu_link_content--menu_link_content", [
      "title,url",
    ]);
  }
}

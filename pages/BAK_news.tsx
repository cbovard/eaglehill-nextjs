import { GetStaticPropsContext, GetStaticPropsResult, GetStaticPathsResult } from "next"
import { DrupalNode } from "next-drupal"
import { useRouter } from 'next/router'

import { drupal } from "lib/drupal"
import { getGlobalElements } from "lib/get-global-elements"
import { getParams } from "lib/get-params"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { Layout, LayoutProps } from "components/layout"
import { PageHeader } from "components/page-header"
import { NodeNewsTeaser} from "components/node--news--teaser"
import { Pager, PagerProps } from "components/pager"

export const NUMBER_OF_POSTS_PER_PAGE = 10


interface NewsPageProps extends LayoutProps {
  news: any
  page: Pick<PagerProps, "current" | "total">
}

export default function NewsPage({
  menus,
  blocks,
  news,
  page,
}: NewsPageProps) {

  const paths = Array(5).fill(0)
    .map((_, page) => ({
      params: {
        page: `${page + 1}`,
      },
  }))

  // console.log(page, 'page');

  console.log(news, 'results 2');


  return (
    <Layout meta={{ title: "News" }} menus={menus} blocks={blocks}>
      <PageHeader
        heading={"News"}
        breadcrumbs={[
          {
            title: "News",
          },
        ]}
      />
      <div className="container">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {news.data.map((news_node: DrupalNode) => (
            <NodeNewsTeaser key={news_node.id} node={news_node} />
          ))}
        </div>
        {page ? (
          <Pager
            current={page.current}
            total={page.total}
            href={(page) => (page === 0 ? `/news` : `/news/${page}`)}
            className="py-8 mt-8"
          />
        ) : null}
      </div>
    </Layout>
  )
}



export async function getStaticProps(
  context,
): Promise<GetStaticPropsResult<NewsPageProps>> {

  // todo need to move this more to a global.
  // /jsonapi/views/news/page_news_1?fields%5Bnode--news%5D=title%2Cbody%2Cpath%2Cfield_news_images&fields%5Bmedia--image%5D=field_media_image&fields%5Bfile--file%5D=uri%2CresourceIdObjMeta&include=field_news_images.field_media_image
  // const params = new DrupalJsonApiParams()
  //   .addInclude(["field_news_images.field_media_image"])
  //   .addFields("node--news", ["title", "body", "path", "field_news_images"])
  //   .addFields("media--image", ["field_media_image"])
  //   .addFields("file--file", ["uri", "resourceIdObjMeta"])
  // const news = await drupal.getView("news--page_news_1", {
  //   params: params.getQueryObject(),
  // })

  // old
  // /jsonapi/views/news/page_news_1?fields[node--news]=title,body,path,field_news_images&fields[media--image]=field_media_image&fields[file--file]=uri,resourceIdObjMeta&include=field_news_images.field_media_image

  // /jsonapi/views/news/page_news_1?fields[node--news]=title,body,path,field_news_images&fields[file--file]=uri,resourceIdObjMeta&include=field_news_images.field_media_image

  const newsViewJSONPath = `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/views/news/page_news_1?fields[node--news]=title,body,path,field_news_images&fields[file--file]=uri,resourceIdObjMeta&include=field_news_images.field_media_image`
  const res = await fetch(newsViewJSONPath)
  const news = await res.json()

  //console.log(newsViewJSONPath);

  // console.log(news.links)

  // Need to get the json self url here.
  const jsonSelfURL = JSON.stringify(news.links.self);
  // Initialize the Current page for our check.
  let currentPage;

  // Need to check if this is the 1st page and does not contain the ?page=.
  if (!jsonSelfURL.includes('?page=')) {
    currentPage = 1;
  } else {

  }

  //console.log(currentPage, 'current page 2');
  //console.log(jsonSelfURL, 'json url 3');

  return {
    props: {
      ...(await getGlobalElements(context)),
      news,
      page: {
        current: currentPage,
        total: Math.ceil(news.meta.count / NUMBER_OF_POSTS_PER_PAGE),
      },
    },
  }
}

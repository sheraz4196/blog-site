import { getFilteredBlogsByAuthorData, getSlugPageData } from "@/lib/api";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Seo from "@/components/common/seo";
import BlogsList from "@/components/Home/BlogsList";
const safeJsonStringify = require("safe-json-stringify");
export default function Slug({ authorData, blogs }) {
  const imgUrl = authorData?.image?.fields?.file?.url;
  console.log(blogs, "authors blogs are here");
  return (
    <>
      <Seo data={authorData?.seo?.fields} />
      <main className="flex items-center justify-center mt-32">
        <div className="max-container flex items-center justify-center">
          <div className="mx-auto max-w-4xl">
            <section className="py-6 border-b lg:pt-12 border-gray-100 flex flex-col gap-6">
              {imgUrl && (
                <div>
                  <Image
                    src={`https:${imgUrl}`}
                    alt={authorData?.image?.fields?.title || "author"}
                    width={110}
                    height={110}
                    className="rounded-full mx-auto md:mx-0"
                  />
                </div>
              )}
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                <div>
                  <h1 className="text-muted-2 dark:text-white text-4xl md:text-6xl leading-tight font-semibold text-center md:text-left">
                    {authorData?.name}
                  </h1>
                  <h2 className="text-muted-1 my-2">
                    {authorData?.shortDescription}
                  </h2>
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 text-muted-1 uppercase py-1.5 text-xs">
                    <div className="flex items-center gap-4 md:gap-6">
                      <p>{authorData?.address}</p>
                      <p>{blogs?.length} posts</p>
                    </div>
                    <div className="flex items-center gap-4 md:gap-6">
                      {authorData?.links?.map((item) => {
                        return (
                          <Link
                            href={item?.link || ""}
                            target="_blank"
                            className="text-gray-900 dark:text-white font-semibold hover:underline"
                          >
                            {item?.text}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="pt-10 pb-5 lg:-mx-5">
              <BlogsList blogs={blogs} />
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
export async function getServerSideProps({ params }) {
  const slug = params["slug"];
  const authorData = await getSlugPageData("author", slug);

  if (!authorData[0]?.fields) {
    return {
      redirect: {
        destination: `/500?url=/author/${slug}`,
        permanent: true,
      },
    };
  }

  const blogs = await getFilteredBlogsByAuthorData(authorData[0]?.sys?.id);

  return {
    props: {
      authorData: JSON.parse(safeJsonStringify(authorData[0]?.fields)) || null,
      blogs: JSON.parse(safeJsonStringify(blogs)) || null,
    },
  };
}

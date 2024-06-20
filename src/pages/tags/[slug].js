import BlogCard from "@/components/Blog/BlogCard";
import Seo from "@/components/common/seo";
import { getFilteredBlogsByTagData, getSlugPageData } from "@/lib/api";
import React from "react";
import safeJsonStringify from "safe-json-stringify";

export default function Slug({ tagData, blogs }) {
  return (
    <>
      <Seo data={tagData?.seo?.fields} />
      <main className="mt-16 max-container">
        <section className="py-6 lg:pt-12 border-b border-gray-100">
          <h1 className="text-muted-2 dark:text-white text-4xl lg:text-6xl leading-tight font-semibold">
            {tagData?.title}
          </h1>
          <h2 className="text-muted-1 my-6">{tagData?.description}</h2>
          <h2 className="text-muted-1 my-2">
            A collection of {blogs?.length} posts
          </h2>
        </section>
        <section className="pt-10 pb-5 flex flex-wrap lg:-mx-5">
          {blogs?.map((blog, index) => (
            <BlogCard data={blog} key={index} />
          ))}
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const slug = params["slug"];
  const tagData = await getSlugPageData("tag", slug);
  if (!tagData[0]?.fields) {
    return {
      redirect: {
        destination: `/500?url=/tags/${slug}`,
        permanent: true,
      },
    };
  }
  const blogs = await getFilteredBlogsByTagData(tagData[0]?.sys?.id);

  return {
    props: {
      tagData: JSON.parse(safeJsonStringify(tagData[0]?.fields || null)),
      blogs: JSON.parse(safeJsonStringify(blogs || null)),
    },
  };
}

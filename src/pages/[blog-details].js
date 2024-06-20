import React, { useContext, useEffect } from "react";
import { AppContext } from "@/context/AppContextProvider";
import BlogDetails from "@/components/Blog/BlogDetails";
import { getSimilarBlogs, getSlugPageData } from "@/lib/api";
import SimilarBlogs from "@/components/Blog/SimilarBlogs";
import Seo from "@/components/common/seo";
const safeJsonStringify = require("safe-json-stringify");
export default function BlogDetailsPage({ slug, blogData, similarBlogData }) {
  const { setCurrentBlog } = useContext(AppContext);

  useEffect(() => {
    setCurrentBlog(blogData?.fields?.title);
  }, [blogData]); // to avoid unnecessary re-renders

  return (
    <>
      <Seo data={blogData?.fields} />
      <main className="mt-16 blog-details max-w-full relative">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <svg
            className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 dark:stroke-gray-700 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                width="200"
                height="200"
                x="50%"
                y="-1"
                patternUnits="userSpaceOnUse"
              >
                <path d="M100 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <svg
              x="50%"
              y="-1"
              className="overflow-visible fill-gray-50 dark:fill-gray-900"
            >
              <path
                d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                strokeWidth="0"
              />
            </svg>
            <rect
              width="100%"
              height="100%"
              strokeWidth="0"
              fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
            />
          </svg>
        </div>
        <BlogDetails data={blogData} />
        {similarBlogData?.length > 0 && (
          <SimilarBlogs similarBlogData={similarBlogData} />
        )}
      </main>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const slug = params["blog-details"];
  const [blogData, similarBlogData] = await Promise.all([
    getSlugPageData("blogPost", slug),
    getSimilarBlogs(slug),
  ]);

  if (!blogData[0]?.fields) {
    return {
      redirect: {
        destination: `/500?url=${slug}`,
        permanent: false, // Changed to false, as redirects to 500 are usually not permanent
      },
    };
  }

  // Safely stringify the data
  const blogDataString = safeJsonStringify(blogData[0]);
  const similarBlogDataString = safeJsonStringify(similarBlogData?.items);

  return {
    props: {
      slug: slug || null,
      blogData: JSON.parse(blogDataString) || null,
      similarBlogData: JSON.parse(similarBlogDataString) || [],
    },
  };
}

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
      <main className="mt-16 blog-details max-w-full relative dark:bg-black">
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

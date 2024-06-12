import React, { useContext, useEffect } from "react";
import { AppContext } from "@/context/AppContextProvider";
import BlogDetails from "@/components/Blog/BlogDetails";
import { getSimilarBlogs, getSlugPagData } from "@/lib/api";
import SimilarBlogs from "@/components/Blog/SimilarBlogs";
import Seo from "@/components/common/seo";

export default function BlogDetailsPage({ slug, blogData, similarBlogData }) {
  const { setCurrentBlog } = useContext(AppContext);

  useEffect(() => {
    setCurrentBlog(blogData?.fields?.title);
  }, [blogData]); // Make sure to use blogData to avoid unnecessary re-renders

  return (
    <>
      <Seo data={blogData?.fields} />
      <main className="mt-16 blog-details">
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
    getSlugPagData("blogPost", slug),
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

  return {
    props: {
      slug: slug || null,
      blogData: blogData[0] || null,
      similarBlogData: similarBlogData?.items || [],
    },
  };
}

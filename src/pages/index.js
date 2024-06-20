import BlogsList from "@/components/Home/BlogsList";
import dynamic from "next/dynamic";
const Hero = dynamic(() => import("@/components/Home/Hero"));
import Pagination from "@/components/common/Pagination";
import Seo from "@/components/common/seo";
import { getPagesData, getPagesDataWithPagination } from "@/lib/api";
import { useState } from "react";
const safeJsonStringify = require("safe-json-stringify");

export default function Home({ blogsData, homeData }) {
  const [blogs, setBlogs] = useState(blogsData?.items || []);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  const currentBlogs = blogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  return (
    <>
      <Seo data={homeData?.seo.fields} />

      <section className="pb-5 dark:bg-black">
        {homeData && <Hero homeData={homeData} blogs={blogs} />}
        <BlogsList blogs={currentBlogs} currentPage={currentPage} />
        <div className="max-container">
          <Pagination
            totalPages={Math.ceil(blogs.length / blogsPerPage)}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps({}) {
  // All requests at the same time
  const [blogsData, homeData] = await Promise.all([
    getPagesDataWithPagination("blogPost", 1),
    getPagesData("home"),
  ]);

  if (!blogsData?.items && !homeData?.items[0]?.fields) {
    return {
      redirect: {
        destination: `/500?url=/`,
        permanent: true,
      },
    };
  }

  // Safely stringify the data
  const blogsDataString = safeJsonStringify(blogsData);
  const homeDataString = safeJsonStringify(homeData?.items[0]?.fields);

  return {
    props: {
      blogsData: JSON.parse(blogsDataString) || null,
      homeData: JSON.parse(homeDataString) || null,
    },
  };
}

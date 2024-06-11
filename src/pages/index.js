import BlogsList from "@/components/Home/BlogsList";
import dynamic from "next/dynamic";
const Hero = dynamic(() => import("@/components/Home/Hero"));
import Pagination from "@/components/common/Pagination";
import Seo from "@/components/common/seo";
import { getPagesData, getPagesDataWithPagination } from "@/lib/api";
import { useEffect, useState } from "react";

export default function Home({ blogsData, homeData }) {
  const [blogs, setBlogs] = useState(blogsData?.items || []);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    if (currentPage === 1 && blogsData?.items) {
      return; // Initial load already has the data
    }
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getPagesDataWithPagination("blogPost", currentPage);
        setBlogs(data?.items || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Seo data={homeData?.seo.fields} />

      <section className="pb-5">
        {homeData && <Hero homeData={homeData} />}
        <BlogsList blogs={blogs} currentPage={currentPage} />
        {loading ? (
          <p className="text-7xl">Loading</p>
        ) : (
          <div className="max-container">
            <Pagination
              totalPages={Math.ceil(blogsData?.total / 4)}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </section>
    </>
  );
}
export async function getServerSideProps({}) {
  // All request at same time
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
  return {
    props: {
      blogsData: blogsData || null,
      homeData: homeData?.items[0]?.fields || null,
    },
  };
}

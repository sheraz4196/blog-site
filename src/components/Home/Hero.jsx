import React, { useEffect, useState } from "react";
import Image from "next/image";
import { searchBlogsData } from "@/lib/api";
import { IoClose } from "react-icons/io5";
import Link from "next/link";

export default function Hero({ homeData, blogs }) {
  const [search, setSearch] = useState("");
  const [blogsList, setBlogsList] = useState([]);
  console.log(blogs, "Blogs");
  const handleChange = (e) => {
    let value = e.target.value;
    setSearch(value);

    if (value?.length > 0) {
      const filteredBlogs = blogs.filter((blog) =>
        blog.fields.title.toLowerCase().includes(value.toLowerCase())
      );
      setBlogsList(filteredBlogs);
    } else {
      setBlogsList(blogs);
    }
  };

  return (
    <section className="pb-3 text-white pt-16 relative home-hero-section">
      <div class="absolute inset-0 -z-10 overflow-hidden">
        <svg
          class="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 dark:stroke-gray-700 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
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
            class="overflow-visible fill-gray-50 dark:fill-gray-900"
          >
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              stroke-width="0"
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            stroke-width="0"
            fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
          />
        </svg>
      </div>
      <div className="max-container min-h-52 pt-5 pb-10 relative">
        {homeData?.image?.fields?.file?.url && (
          <Image
            src={"https:" + homeData?.image?.fields?.file?.url}
            alt={homeData?.image?.fields?.title || "logo"}
            width={230}
            height={230}
            className="!h-44 md:h-56 w-auto mx-auto"
          />
        )}
        {homeData?.shortDescription && (
          <h2 className="text-xl opacity-80 py-2 my-0 text-center text-gray-700 dark:text-white">
            {homeData?.shortDescription}
          </h2>
        )}
        <div className="relative max-w-sm mx-auto mt-7 text-black z-50">
          <div className="w-full relative">
            <input
              type="text"
              placeholder="Search"
              value={search}
              className="outline-none p-2 pr-9 w-full dark:bg-gray-100 border border-gray-400 placeholder:text-gray-400 dark:placeholder:text-gray-700 focus:ring-[1px] focus:ring-gray-400"
              onChange={(e) => handleChange(e)}
            />
            {(search?.length > 0 || blogsList?.length > 0) && (
              <button
                onClick={() => {
                  setSearch("");
                  setBlogsList([]);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xl"
              >
                <IoClose />
              </button>
            )}
          </div>
          {(blogsList?.length > 0 || search?.length > 0) && (
            <div className="absolute top-10 left-0 w-full bg-white h-max shadow-md shadow-black/35 rounded-b-sm">
              {search?.length > 0 && blogsList?.length === 0 ? (
                <div className="w-full h-custom-100 flex items-center justify-center">
                  <p>No search results found.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-2 px-5 py-2 max-h-60 overflow-y-auto z-[200]">
                  {blogsList?.map((item, index) => (
                    <Link
                      key={index}
                      onClick={() => {
                        setSearch("");
                        setBlogsList([]);
                      }}
                      href={`/${item?.fields?.slug}`}
                      className="text-left py-2 border-b last:border-none hover:text-link-hover"
                    >
                      {item?.fields?.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

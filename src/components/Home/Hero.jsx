import React, { useEffect, useState } from "react";
import Image from "next/image";
import { searchBlogsData } from "@/lib/api";
import { IoClose } from "react-icons/io5";
import Link from "next/link";

export default function Hero({ homeData }) {
  const [search, setSearch] = useState("");
  const [blogsList, setBlogsList] = useState([]);

  const handleChange = async (e) => {
    let value = e.target.value;
    if (value?.length > 0) {
      setSearch(value);
      const data = await searchBlogsData(value);
      value?.length !== 0 && setBlogsList(data);
    } else {
      setSearch("");
      setBlogsList([]);
    }
  };

  useEffect(() => {
    if (search?.length === 0 || !search) {
      setBlogsList([]);
    }
  }, [search]);

  return (
    <section className="pb-3 text-white pt-16 bg-zinc-950 relative home-hero-section">
      <Image
        src={"/images/home-hero-bg.png"}
        alt="hero-background-image"
        priority
        // loading="lazy"
        width={2000}
        height={500}
        className="absolute w-full h-full top-0 left-0 object-cover"
      />
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
          <h2 className="text-xl opacity-80 py-2 my-0 text-center">
            {homeData?.shortDescription}
          </h2>
        )}
        <div className="relative max-w-sm mx-auto mt-7 text-black">
          <div className="w-full relative">
            <input
              type="text"
              placeholder="Search"
              value={search}
              className="outline-none p-2 pr-9 w-full bg-white"
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
                <div className="flex flex-col gap-2 px-5 py-2 max-h-60 overflow-y-auto">
                  {blogsList?.map((item, i) => {
                    return (
                      <Link
                        key={i}
                        onClick={() => {
                          setSearch("");
                          setBlogsList([]);
                        }}
                        href={`/${item?.fields?.slug}`}
                        className="text-left py-2 border-b last:border-none hover:text-link-hover"
                      >
                        {item?.fields?.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

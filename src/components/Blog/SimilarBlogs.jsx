import React from "react";
import BlogCard from "./BlogCard";

export default function SimilarBlogs({ similarBlogData }) {
  return (
    <section className="bg-zinc-950 border-b border-white/10 pb-cutom-4">
      <div className="max-container">
        <div className="flex flex-wrap lg:flex-nowrap similar-blogs pt-14 lg:-mx-6">
          {similarBlogData?.map((blog, index) => (
            <BlogCard data={blog} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

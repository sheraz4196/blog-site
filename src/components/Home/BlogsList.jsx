import React from "react";
import BlogCard from "../Blog/BlogCard";

export default function BlogsList({ blogs, currentPage }) {
  return (
    <section className="max-w-7xl py-24 sm:py-32 flex flex-wrap mx-auto">
      {blogs?.map((blog, index) => (
        <BlogCard
          data={blog}
          key={index}
          className={index === 0 && currentPage === 1 && "first-blog-card"}
        />
      ))}
    </section>
  );
}

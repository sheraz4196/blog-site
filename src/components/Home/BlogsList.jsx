import React from "react";
import BlogCard from "../Blog/BlogCard";

export default function BlogsList({ blogs, currentPage }) {
  return (
    <section className="max-container pt-10 flex flex-wrap">
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

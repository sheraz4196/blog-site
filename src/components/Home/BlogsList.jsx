import React from "react";
import BlogCard from "../Blog/BlogCard";

export default function BlogsList({ blogs, currentPage }) {
  return (
    <section className="max-container pt-10 flex flex-wrap">
      {blogs?.map((blog, i) => {
        return (
          <BlogCard
            data={blog}
            key={i}
            className={i === 0 && currentPage === 1 && "first-blog-card"}
          />
        );
      })}
    </section>
  );
}

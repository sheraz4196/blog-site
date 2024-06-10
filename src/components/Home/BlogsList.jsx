import React from "react";
import BlogCard from "../Blog/BlogCard";

export default function BlogsList({ blogs, currentPage }) {
  return (
    <div className="flex items-center justify-center">
      <div className="max-container">
        <div className="mx-auto mt-16 grid grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 max-w-7xl">
          {blogs?.map((blog, index) => (
            <BlogCard data={blog} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

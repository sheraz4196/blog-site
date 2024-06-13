import React from "react";
import BlogCard from "../Blog/BlogCard";

export default function BlogsList({ blogs, currentPage }) {
  return (
    <div className="flex items-center justify-center -z-10">
      <div className="max-container">
        <div className="mx-auto mt-16 grid grid-cols-1 gap-x-7 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 max-w-7xl">
          {blogs?.map((blog, index) => (
            <BlogCard className={"-z-10"} data={blog} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

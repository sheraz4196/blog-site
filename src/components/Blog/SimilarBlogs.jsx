import React from "react";
import BlogCard from "./BlogCard";

export default function SimilarBlogs({ similarBlogData }) {
  return (
    <div className="max-container mx-auto mb-9">
      <div className="mx-auto mt-16 grid grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 max-w-7xl">
        {similarBlogData?.map((blog, index) => (
          <BlogCard data={blog} key={index} />
        ))}
      </div>
    </div>
  );
}

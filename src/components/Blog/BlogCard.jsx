import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Richtext from "../common/Richtext";
import { convertDate } from "../../utils/convertdate";
import { calculateReadingTime } from "../../utils/calculateReadingTime";
import { Tooltip } from "react-tooltip";

export default function BlogCard({ data, className }) {
  const router = useRouter();

  return (
    <div className={`blog-card ${className}`}>
      <div className="blog-card-image-wrap">
        <div>
          {data?.fields?.image?.fields?.file?.url && (
            <Link href={`/${data?.fields?.slug}`}>
              <Image
                src={"https:" + data?.fields?.image?.fields?.file?.url}
                alt={data?.fields?.image?.fields?.title || "blog"}
                width={className ? 800 : 310}
                height={className ? 400 : 200}
                className="h-full w-full object-cover rounded-t-sm cursor-pointer"
              />
            </Link>
          )}
        </div>
      </div>
      <div className="blog-card-content">
        <div className="flex flex-wrap uppercase text-xs font-medium mt-4">
          {data?.fields?.tags?.map((tag, index) => (
            <span key={index}>
              {index !== 0 && <span className="mr-1">, </span>}
              <Link
                href={`/tags/${tag?.fields?.slug}`}
                className="hover:underline text-primary hover:text-primary"
              >
                {tag?.fields?.title}
              </Link>
            </span>
          ))}
        </div>
        <Link href={`/${data?.fields?.slug}`} className="hover:text-current">
          <h2 className="mt-0 text-2xl font-semibold leading-5 cursor-pointer">
            {data?.fields?.title}
          </h2>
        </Link>
        {data?.fields?.description && (
          <Link
            href={`/${data?.fields?.slug}`}
            className="font-georgia hover:text-current mb-6 text-base leading-normal cursor-pointer"
          >
            <Richtext data={data?.fields?.description} truncate />
          </Link>
        )}
        {data?.fields?.authors?.length > 0 && (
          <div className="flex items-center gap-2.5">
            <div className="flex flex-wrap pl-1 author">
              {data?.fields?.authors?.map((item, index) => (
                <Link
                  href={`/author/${item?.fields?.slug}`}
                  key={index}
                  data-tooltip-id="author-tooltip"
                  data-tooltip-content={item?.fields?.name}
                  className="author-image border-2 border-white h-10 w-10 -mx-1 rounded-full cursor-pointer"
                >
                  <Image
                    src={"https:" + item?.fields?.image?.fields?.file?.url}
                    alt="author"
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                </Link>
              ))}
            </div>
            <div className="author-details">
              <div className="flex flex-wrap">
                {data?.fields?.authors?.map((item, index) => (
                  <span key={index}>
                    {index !== 0 && <span className="mr-1">, </span>}
                    <Link
                      href={`/author/${item?.fields?.slug}`}
                      className="text-muted-3 dark:text-muted-5 hover:text-secondary dark:hover:text-secondary hover:underline font-semibold text-xs uppercase"
                    >
                      {item?.fields?.name}
                    </Link>
                  </span>
                ))}
              </div>
              <div className="gap-1 text-muted-4 text-xs uppercase  ">
                <span>{convertDate(data?.sys?.createdAt)}</span>
                <span className="mx-1">•</span>
                <span>
                  {calculateReadingTime(data?.fields?.description?.content)} min
                  read
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      <Tooltip id="author-tooltip" />
    </div>
  );
}

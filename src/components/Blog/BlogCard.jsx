import React from "react";
import Link from "next/link";
import Image from "next/image";
import Richtext from "../common/Richtext";
import { convertDate } from "../../utils/convertdate";
import { calculateReadingTime } from "../../utils/calculateReadingTime";
import { Tooltip } from "react-tooltip";

export default function BlogCard({ data, className }) {
  return (
    <article
      className={`flex flex-col items-start justify-between ${className}`}
    >
      <div className="relative w-full">
        {data?.fields?.image?.fields?.file?.url && (
          <Link href={`/${data?.fields?.slug}`}>
            <Image
              src={"https:" + data?.fields?.image?.fields?.file?.url}
              alt={data?.fields?.image?.fields?.title || "blog"}
              layout="responsive"
              width={800}
              height={450}
              className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2] cursor-pointer"
            />
          </Link>
        )}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div>
      </div>
      <div className="max-w-xl">
        <div className="mt-8 flex items-center gap-x-4 text-xs">
          <time
            dateTime={data?.sys?.createdAt}
            className="text-gray-500 dark:text-gray-400"
          >
            {convertDate(data?.sys?.createdAt)}
          </time>
          {data?.fields?.tags?.map((tag, index) => (
            <Link
              key={index}
              href={`/tags/${tag?.fields?.slug}`}
              className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
            >
              {tag?.fields?.title}
            </Link>
          ))}
        </div>
        <div className="group relative">
          <Link href={`/${data?.fields?.slug}`}>
            <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 dark:text-gray-100 dark:group-hover:text-gray-300 cursor-pointer">
              <span className="absolute inset-0"></span>
              {data?.fields?.title}
            </h3>
          </Link>
          {data?.fields?.description && (
            <Link
              href={`/${data?.fields?.slug}`}
              className="hover:text-current"
            >
              <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300 cursor-pointer">
                <Richtext data={data?.fields?.description} truncate />
              </p>
            </Link>
          )}
        </div>
        {data?.fields?.authors?.length > 0 && (
          <div className="relative mt-8 flex items-center gap-x-4">
            {data?.fields?.authors?.map((item, index) => (
              <Link
                key={index}
                href={`/author/${item?.fields?.slug}`}
                data-tooltip-id="author-tooltip"
                data-tooltip-content={item?.fields?.name}
              >
                <Image
                  src={"https:" + item?.fields?.image?.fields?.file?.url}
                  alt="author"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700"
                />
              </Link>
            ))}
            <div className="text-sm leading-6">
              {data?.fields?.authors?.map((item, index) => (
                <p
                  key={index}
                  className="font-semibold text-gray-900 dark:text-gray-100"
                >
                  <Link href={`/author/${item?.fields?.slug}`}>
                    <span className="absolute inset-0"></span>
                    {item?.fields?.name}
                  </Link>
                </p>
              ))}
              <p className="text-gray-600 dark:text-gray-400">
                Co-Founder / CTO
              </p>
              <div className="gap-1 text-muted-4 text-xs uppercase dark:text-gray-400">
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
    </article>
  );
}

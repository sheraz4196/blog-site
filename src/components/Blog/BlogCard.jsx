import React from "react";
import Link from "next/link";
import Image from "next/image";
import Richtext from "../common/Richtext";
import { convertDate } from "../../utils/convertdate";
import { calculateReadingTime } from "../../utils/calculateReadingTime";
import { Tooltip } from "react-tooltip";

export default function BlogCard({ data, className }) {
  console.log("Data", data);
  return (
    <article className={`flex flex-col items-start ${className}`}>
      <div className="relative w-full">
        {data?.fields?.image?.fields?.file?.url && (
          <Link href={`/${data?.fields?.slug}`}>
            <Image
              src={"https:" + data?.fields?.image?.fields?.file?.url}
              alt={data?.fields?.image?.fields?.title || "blog"}
              layout="responsive"
              width={800}
              height={450}
              className="aspect-[3/2] w-full bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[16/10] cursor-pointer"
            />
          </Link>
        )}
        {/* <div className="absolute inset-0 ring-1 ring-inset ring-gray-900/10"></div> */}
      </div>
      <div className="max-w-xl p-1">
        <div className="mt-5 flex items-center gap-x-2.5 text-xs">
          {data?.fields?.tags?.map((tag, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span>•</span>}
              <Link
                href={`/tags/${tag?.fields?.slug}`}
                className="relative z-10 font-medium text-ternary"
              >
                {tag?.fields?.title}
              </Link>
            </React.Fragment>
          ))}
        </div>
        <div className="group relative w-full flex flex-col gap-1">
          <Link href={`/${data?.fields?.slug}`}>
            <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 dark:text-gray-100 dark:group-hover:text-gray-300 cursor-pointer">
              {data?.fields?.title}
            </h3>
          </Link>
          {data?.fields?.description && data.fields.description !== "" && (
            <Link
              href={`/${data?.fields?.slug}`}
              className="hover:text-current max-h-10 overflow-hidden"
            >
              <div className="line-clamp-2 text-sm leading-5 text-gray-600 dark:text-gray-300 cursor-pointer">
                <Richtext data={data?.fields?.description} truncate />
              </div>
            </Link>
          )}
        </div>
        {data?.fields?.authors?.length > 0 && (
          <div className="relative mt-5 flex items-center gap-x-4">
            <div className="flex justify-center items-center">
              {data?.fields?.authors?.map((item, index) => (
                <Link
                  key={index}
                  href={`/author/${item?.fields?.slug}`}
                  data-tooltip-id="author-tooltip"
                  data-tooltip-content={item?.fields?.name}
                  className={
                    index === 0
                      ? `relative z-10 !rounded-full bg-gray-100 dark:bg-gray-700`
                      : index === 1
                      ? `relative z-10 !rounded-full bg-gray-100 dark:bg-gray-700 -ml-3 p-[2px]`
                      : `relative z-10 !rounded-full bg-gray-100 dark:bg-gray-700`
                  }
                >
                  {item?.fields?.image?.fields?.file?.url ? (
                    <Image
                      src={"https:" + item?.fields?.image?.fields?.file?.url}
                      alt="author"
                      width={40}
                      height={40}
                      className={
                        index === 0
                          ? "h-10 w-10 !rounded-full bg-gray-100 dark:bg-gray-700"
                          : index === 1
                          ? "h-10 w-10 !rounded-full bg-gray-100 dark:bg-gray-700"
                          : "h-10 w-10 !rounded-full bg-gray-100 dark:bg-gray-700"
                      }
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-9"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  )}
                </Link>
              ))}
            </div>
            <div className="text-sm leading-5">
              <div className="flex gap-1">
                {data?.fields?.authors?.length > 1 ? (
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {data.fields.authors.map((item, index) => (
                      <span key={index} className="font-semibold">
                        <Link href={`/author/${item?.fields?.slug}`}>
                          <span className="absolute inset-0"></span>
                          {item?.fields?.name}
                        </Link>
                        {index < data.fields.authors.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </p>
                ) : (
                  data.fields.authors?.map((item, index) => (
                    <p
                      key={index}
                      className="font-semibold text-gray-900 dark:text-gray-100"
                    >
                      <Link href={`/author/${item?.fields?.slug}`}>
                        <span className="absolute inset-0"></span>
                        {item?.fields?.name}
                      </Link>
                    </p>
                  ))
                )}
              </div>
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

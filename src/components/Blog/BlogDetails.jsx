import React from "react";
import Link from "next/link";
import Image from "next/image";
import Richtext from "../common/Richtext";
import { convertDate } from "../../utils/convertdate";
import { calculateReadingTime } from "../../utils/calculateReadingTime";
import { Tooltip } from "react-tooltip";

export default function BlogDetails({ data }) {
  const tableOfContent = data?.fields?.tableOfContent;
  return (
      <div className="max-container flex items-center justify-between mx-auto">
        <div className="w-screen overflow-x-hidden sm:max-w-5xl md::px-10 mx-auto">
          <div className="pt-16 pb-5">
            <div className="flex flex-wrap uppercase text-sm font-semibold text-primary">
              {data?.fields?.tags?.map((tag, index) => (
                <span key={index}>
                  {index !== 0 && <span className="mr-1">, </span>}
                  <Link
                    href={`/tags/${tag?.fields?.slug}`}
                    className="hover:underline"
                  >
                    {tag?.fields?.title}
                  </Link>
                </span>
              ))}
            </div>
            <h1 className="text-muted-2 dark:text-white  text-4xl tracking-tight font-semibold mb-0.5 mt-6 sm:text-5xl">
              {data?.fields?.title}
            </h1>
            {data?.fields?.authors?.length > 0 && (
              <div className="flex items-center gap-2.5 mt-9 pt-4 border-t border-muted-5">
                <div className="flex flex-wrap pl-1 author">
                  {data?.fields?.authors?.map((item, index) => (
                    <>
                      {item?.fields?.image?.fields?.file?.url && (
                        <Link
                          href={`author/${item?.fields?.slug}`}
                          key={index}
                          data-tooltip-id={`author-details-tooltip-${index}`}
                          className="border-2 border-white h-9 md:h-10 w-9 md:w-10 -mx-1 rounded-full"
                        >
                          <Image
                            src={
                              "https:" + item?.fields?.image?.fields?.file?.url
                            }
                            alt={item?.fields?.image?.fields?.title || "author"}
                            width={36}
                            height={36}
                            className="rounded-full w-9 lg:w-9"
                          />
                          <Tooltip
                            id={`author-details-tooltip-${index}`}
                            className="author-details-tooltip"
                            clickable
                          >
                            <div className="flex items-start justify-between gap-5">
                              <Image
                                src={
                                  "https:" +
                                  item?.fields?.image?.fields?.file?.url
                                }
                                alt={
                                  item?.fields?.image?.fields?.title || "author"
                                }
                                width={58}
                                height={58}
                                className="rounded-full w-12 lg:w-14"
                              />
                              <div>
                                <div className="text-base font-semibold capitalize m-0">
                                  {item?.fields?.name}
                                </div>
                                <div className="my-2">
                                  {item?.fields?.shortDescription}
                                </div>
                                <div>
                                  <Link
                                    className="text-blue-500 hover:underline"
                                    href={`author/${item?.fields?.slug}`}
                                  >
                                    More posts
                                  </Link>{" "}
                                  by{" "}
                                  <span className="capitalize">
                                    {item?.fields?.name}
                                  </span>
                                  .
                                </div>
                              </div>
                            </div>
                          </Tooltip>
                        </Link>
                      )}
                    </>
                  ))}
                </div>
                <div>
                  <div className="flex flex-wrap">
                    {data?.fields?.authors?.map((item, index) => (
                      <span key={index}>
                        {index !== 0 && <span className="mr-1">, </span>}
                        <Link
                          href={`author/${item?.fields?.slug}`}
                          className="text-muted-3 dark:text-muted-5 hover:text-secondary dark:hover:text-secondary hover:underline font-semibold text-xs uppercase"
                        >
                          {item?.fields?.name}
                        </Link>
                      </span>
                    ))}
                  </div>
                  <div className="gap-1 text-muted-4 text-xs uppercase">
                    <span>{convertDate(data?.sys?.createdAt)}</span>
                    <span className="mx-1">•</span>
                    <span>
                      {calculateReadingTime(data?.fields?.description?.content)}{" "}
                      min read
                    </span>
                  </div>
                </div>
              </div>
            )}
            {tableOfContent && (
              <div className="w-full flex-shrink-0 table-of-content mt-12">
                <Richtext data={tableOfContent} />
              </div>
            )}
          </div>
          <div>
            {data?.fields?.image?.fields?.file?.url && (
              <div className="blog-details-image-wrap">
                <Image
                  src={"https:" + data?.fields?.image?.fields?.file?.url}
                  alt={data?.fields?.image?.fields?.title || "blog-image"}
                  width={1040}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {data?.fields?.description && (
              <div className={`pb-12 lg:pb-20 min-h-64 font-georgia text-xl`}>
                <Richtext data={data?.fields?.description} />
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

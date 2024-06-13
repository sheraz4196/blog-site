"use client";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import React, { useMemo } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import CopyButton from "./CopyButton";
import { arta, docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import Image from "next/image";
import getYoutubeVideoId from "@/utils/getYouTubeVideoId";
import getHeadingString from "@/utils/getHedingString";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function Richtext({ data, truncate }) {
  const { theme } = useTheme();
  const codeStyle = theme === "dark" ? docco : arta;
  console.log(theme);
  const options = useMemo(() => ({
    renderMark: {
      [MARKS.BOLD]: (text) => <b className="font-bold">{text}</b>,
      [MARKS.CODE]: (text) => {
        return (
          <div className="CodeBlockClass">
            <CopyButton code={text?.props?.children || text || ""} />
            <SyntaxHighlighter
              wrapLines={true}
              style={codeStyle}
              language={"javascript"}
              wrapLongLines={true}
              showLineNumbers={true}
              showInlineLineNumbers={false}
            >
              {text?.props?.children || text || ""}
            </SyntaxHighlighter>
          </div>
        );
      },
    },
    renderNode: {
      [INLINES.EMBEDDED_ENTRY]: (node) => {
        const { position, image } = node.data.target.fields;
        return (
          <Image
            src={"https:" + image?.fields?.file?.url}
            alt={image?.fields?.title || "image"}
            width={500}
            height={500}
            className={`w-full max-w-lg object-cover ${
              position === "right"
                ? "ml-auto"
                : position === "center"
                ? "mx-auto"
                : ""
            }`}
          />
        );
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        const { position, image } = node.data.target.fields;
        return (
          <div className="">
            <Image
              src={"https:" + image?.fields?.file?.url}
              alt={image?.fields?.title || "image"}
              width={500}
              height={500}
              className={`w-full max-w-lg object-cover ${
                position === "right"
                  ? "ml-auto"
                  : position === "center"
                  ? "mx-auto"
                  : ""
              }`}
            />
          </div>
        );
      },
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { file, title } = node?.data?.target?.fields;
        const fileType = file.contentType.split("/")[0];
        switch (fileType) {
          case "video":
            return (
              <video controls className="my- 10">
                <source src={`https://${file?.url}`} type={file.contentType} />
                Your browser does not support the video tag.
              </video>
            );
          case "image":
            return (
              <img
                src={`https://${file?.url}`}
                alt={title}
                className="my-5"
                loading="lazy"
              />
            );
          case "audio":
            return (
              <audio controls className="my-10">
                <source src={`https://${file?.url}`} type={file.contentType} />
                Your browser does not support the audio tag.
              </audio>
            );
          default:
            return <p>Unsupported file type</p>;
        }
      },

      [INLINES.HYPERLINK]: ({ data }, children) => {
        let videoId;
        if (data?.uri.includes("youtube"))
          videoId = getYoutubeVideoId(data?.uri);
        if (videoId) {
          return (
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${videoId}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded YouTube video"
              loading="lazy"
              className="w-full max-w-3xl mx-auto h-60 md:h-custom-450 my-10"
            />
          );
        } else {
          return (
            <>
              <Link
                href={
                  data?.uri && data?.uri.startsWith("https://")
                    ? data?.uri
                    : `https://${data?.uri}`
                }
                target="_blank"
                className="max-w-full break-words hover:underline text-secondary"
              >
                {children}
              </Link>
            </>
          );
        }
      },
      [BLOCKS.QUOTE]: (node, children) => {
        return (
          <blockquote className="p-4 my-4 border-s-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800">
            <p className="text-xl italic font-medium leading-relaxed text-gray-900 dark:text-white">
              {children}
            </p>
          </blockquote>
        );
      },
      [BLOCKS.TABLE]: (node, children) => {
        return (
          <div className="max-w-full overflow-x-auto hide-scrollbar">
            <table className="my-7">{children}</table>
          </div>
        );
      },
      [BLOCKS.TABLE_HEADER_CELL]: (node, children) => {
        return (
          <th className="text-center border border-zinc-300 text-zinc-100 dark:border-zinc-400 px-3 py-1.5 uppercase bg-zinc-950 dark:text-black dark:bg-zinc-100 font-bold font-apple_system text-xs tracking-wide leading-8">
            {children}
          </th>
        );
      },
      [BLOCKS.TABLE_CELL]: (node, children) => {
        return (
          <td className="text-center border border-zinc-300 text-zinc-300 dark:text-zinc-950 dark:border-zinc-400 px-3 py-1.5 font-apple_system text-base leading-8 bg-zinc-700 dark:bg-white">
            {children}
          </td>
        );
      },
      [BLOCKS.PARAGRAPH]: (node, children) => {
        const containsIframe = /<iframe.*<\/iframe>/i.test(children[0]);
        if (containsIframe && typeof document !== "undefined") {
          const iframeHTML = children[0];
          const embedElement = document.querySelector("#Embed");
          if (embedElement) {
            embedElement.innerHTML = iframeHTML;
          }

          if (typeof children[0] === "string") {
            return (
              <div className="mb-6">
                <div id="Embed"></div>
              </div>
            );
          } else {
            return <p>{children}</p>;
          }
        }

        const paragraphContent = children.reduce((acc, child) => {
          if (typeof child === "string") {
            const parts = child.split(/(<\/?br\s*\/?>|<c>.*?<\/c>)/);
            acc.push(...parts);
          } else {
            acc.push(child);
          }
          return acc;
        }, []);

        const styledChildren = paragraphContent.map((part, index) => {
          if (typeof part === "string") {
            if (part.startsWith("<c>") && part.endsWith("</c>")) {
              const text = part.substring(3, part.length - 4);
              return (
                <span
                  key={index}
                  className="bg-zinc-50 text-red-500 rounded-full px-2.5 py-0.5"
                >
                  {text}
                </span>
              );
            } else {
              return <span key={index}>{part}</span>;
            }
          } else {
            return part;
          }
        });

        return <div className="mb-6">{styledChildren}</div>;
      },

      [BLOCKS.HEADING_1]: (node, children) => {
        const headingId = getHeadingString(children[0]);
        return (
          <h2 id={headingId} className="mb-r mt-20">
            {children}
          </h2>
        );
      },
      [BLOCKS.HEADING_2]: (node, children) => {
        const headingId = getHeadingString(children[0]);
        return (
          <h2 id={headingId} className="mb-6">
            {children}
          </h2>
        );
      },
      [BLOCKS.HEADING_3]: (node, children) => {
        const headingId = getHeadingString(children[0]);
        return (
          <h3 id={headingId} className="mb-5">
            {children}
          </h3>
        );
      },
      [BLOCKS.HEADING_4]: (node, children) => {
        const headingId = getHeadingString(children[0]);
        return (
          <h4 id={headingId} className="mb-4">
            {children}
          </h4>
        );
      },
      [BLOCKS.HEADING_5]: (node, children) => {
        const headingId = getHeadingString(children[0]);
        return (
          <h5 id={headingId} className="mb-3">
            {children}
          </h5>
        );
      },
      [BLOCKS.HEADING_6]: (node, children) => {
        const headingId = getHeadingString(children[0]);
        return (
          <h6 id={headingId} className="mb-2">
            {children}
          </h6>
        );
      },
    },
  }));

  return (
    <>
      <div className="rich-text">
        {data
          ? truncate
            ? data?.content?.map((rtNode, index) => {
                // Truncate the description text to 130 characters
                let truncatedText = "";
                if (rtNode?.nodeType === "paragraph" && index === 0) {
                  truncatedText = rtNode?.content.reduce((acc, textNode) => {
                    if (acc.length < 130 && textNode?.nodeType === "text") {
                      const remainingCharacters = 130 - acc.length;
                      acc += textNode?.value?.substring(0, remainingCharacters);
                    }
                    return acc;
                  }, "");
                  if (rtNode?.content.length > 0) {
                    truncatedText += "...";
                  }
                }
                return (
                  <React.Fragment key={index}>
                    {documentToReactComponents(
                      {
                        nodeType: "document",
                        data: {},
                        content: [
                          {
                            nodeType: "paragraph",
                            data: {},
                            content: [
                              {
                                nodeType: "text",
                                value: truncatedText,
                                marks: [],
                                data: {},
                              },
                            ],
                          },
                        ],
                      },
                      options
                    )}
                  </React.Fragment>
                );
              })
            : data?.content?.map((rtNode, index) => {
                return (
                  <React.Fragment key={index}>
                    {documentToReactComponents(rtNode, options)}
                  </React.Fragment>
                );
              })
          : ""}
      </div>
    </>
  );
}

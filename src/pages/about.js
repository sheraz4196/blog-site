import Seo from "@/components/common/seo";
import { getPagesData } from "@/lib/api";
import Image from "next/image";
import React from "react";

export default function about({ data }) {
  return (
    <>
      <Seo data={data?.seo?.fields} />
      <div className="relative isolate overflow-hidden bg-white dark:bg-black px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <svg
            className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 dark:stroke-gray-700 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                width="200"
                height="200"
                x="50%"
                y="-1"
                patternUnits="userSpaceOnUse"
              >
                <path d="M100 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <svg
              x="50%"
              y="-1"
              className="overflow-visible fill-gray-50 dark:fill-gray-900"
            >
              <path
                d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                strokeWidth="0"
              />
            </svg>
            <rect
              width="100%"
              height="100%"
              strokeWidth="0"
              fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
            />
          </svg>
        </div>
        <div className="mx-auto grid grid-cols-1 gap-x-8 gap-y-16 lg:mx-auto lg:max-w-6xl lg:grid-cols-2 lg:items-start lg:gap-y-10">
          <div className="order-2 sm:order-1 lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="lg:max-w-lg">
                <p className="text-base font-semibold leading-7 text-primary">
                  Welcome to
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                  Tech & Sec — where technology meets security, and chaos meets
                  order!
                </h1>
                <p className="mt-6 text-base leading-7 text-gray-700 dark:text-white lg:max-w-lg">
                  Are you fascinated by the digital world but find yourself
                  bewildered by its complexities? Fear not! Tech & Sec is your
                  trusty guide through the labyrinth of modern technology and
                  cyber security. We break down high-tech gibberish into fun,
                  digestible pieces—even your tech-phobic aunt could understand
                  (maybe).
                </p>
              </div>
            </div>
          </div>
          <div className="order-1 sm:order-2 sm:-ml-12 mt-12 sm:p-12 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
            <Image
              src={
                "https://images.ctfassets.net/og4jsxsu76rm/35gpuzr5Ki5FqLnuKqorfL/1c110bff2538bd696d710bc1f46b2e5c/giphy.gif"
              }
              alt="image"
              width={768}
              height={500}
              className="w-full sm:w-[38rem] md:max-w-lg max-w-none bg-gray-900 shadow-xl ring-1 ring-gray-400/10"
            />
          </div>
          <div className="order-3 sm:order-3 lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="max-w-xl text-base leading-7 text-gray-700 dark:text-white lg:max-w-lg">
                <p>
                  Here at Tech & Sec, we believe everyone should get a kick out
                  of conquering Hack The Box challenges or untangling the wires
                  of technical configurations. Whether you're aiming to be the
                  next cyber security overlord or just trying to figure out why
                  your router keeps blinking at you menacingly, we’ve got your
                  back. Dive into a variety of topics including:
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 dark:text-white lg:max-w-none">
                  <div className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900 dark:text-primary">
                      <svg
                        className="absolute left-1 top-1 h-5 w-5 text-primary"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      Cyber Security Shenanigans:
                    </dt>
                    <dd className="inline pl-2">
                      Uncover the secrets to keeping the digital gremlins at
                      bay.
                    </dd>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900 dark:text-primary">
                      <svg
                        className="absolute left-1 top-1 h-5 w-5 text-primary"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M4.632 3.533A2 2 0 016.577 2h6.846a2 2 0 011.945 1.533l1.976 8.234A3.489 3.489 0 0016 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234z" />
                        <path
                          fill-rule="evenodd"
                          d="M4 13a2 2 0 100 4h12a2 2 0 100-4H4zm11.24 2a.75.75 0 01.75-.75H16a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V15zm-2.25-.75a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75h-.01z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      Techie How-tos:
                    </dt>
                    <dd className="inline pl-2">
                      Follow our step-by-step guides that even the
                      technologically impaired can follow.
                    </dd>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900 dark:text-primary">
                      <svg
                        className="absolute left-1 top-1 h-5 w-5 text-primary"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      Future Stuff:
                    </dt>
                    <dd className="inline pl-2 dark:text-white">
                      Get a sneak peek at technologies that promise to make
                      everything better (or just more complicated).
                    </dd>
                  </div>
                </dl>
                <p className="mt-8 dark:text-white">
                  Join us on this whimsical journey to master the art of turning
                  tech terror into tech triumph. At Tech & Sec, we’re serious
                  about security, passionate about technology, and occasionally
                  funny.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps({}) {
  const data = await getPagesData("about");
  if (!data?.items[0]?.fields) {
    return {
      redirect: {
        destination: `/500?url=/`,
        permanent: true,
      },
    };
  }
  return {
    props: { data: data?.items[0]?.fields || null },
  };
}

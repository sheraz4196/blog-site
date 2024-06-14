import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AppContext } from "@/context/AppContextProvider";
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import SunIcon from "../icons/sun-icon";
import MoonIcon from "../icons/moon-icon";
export default function Navbar({ commonData }) {
  library.add(fab);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [showBlogTitle, setShowBlogTitle] = useState(false);
  const { currentBlog } = useContext(AppContext);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setShowBlogTitle(scrollTop > 120 ? true : false);
    };
    router.pathname === "/[blog-details]" &&
      window.addEventListener("scroll", handleScroll, {
        passive: true,
        capture: true,
      });
    return () => {
      router.pathname === "/[blog-details]" &&
        window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const logo = commonData?.logo?.fields;

  return (
    <nav
      className={`${
        router.pathname === "/"
          ? "bg-transparent absolute"
          : "fixed bg-white border-b dark:border-gray-800 dark:bg-zinc-950"
      } top-0 z-20 h-20 text-white w-full left-0`}
    >
      <div className="mx-auto max-w-6xl px-4 h-full flex items-center justify-between gap-2.5 text-xs font-medium uppercase tracking-wide leading-6">
        <div className="flex items-center w-full max-w-full overflow-x-auto overflow-y-hidden hide-scrollbar relative">
          {router.pathname !== "/" && logo?.file?.url && (
            <Link href={"/"} className="mr-2.5 md:mr-5">
              <Image
                src={"https:" + logo?.file?.url}
                alt={logo?.title || "logo"}
                width={75}
                height={75}
                className="w-14 md:w-20"
              />
            </Link>
          )}
          <div className={`flex items-center max-w-full `}>
            <Link
              href={"/"}
              className={`${
                router.pathname === "/"
                  ? "text-secondary"
                  : "text-gray-900 dark:text-white"
              } nav-link`}
            >
              Home
            </Link>
            <Link
              href={"/about"}
              className={`${
                router.pathname === "/about"
                  ? "text-secondary"
                  : "text-gray-900 dark:text-white"
              } nav-link`}
            >
              About
            </Link>
          </div>
          {router.pathname === "/[blog-details]" && (
            <span
              className={`absolute !font-normal text-black dark:text-white top-1/2 left-20 ml-12 lg:ml-6 md:left-28 flex items-center max-w-full transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] ${
                showBlogTitle
                  ? "opacity-100 visible -translate-y-1/2"
                  : "opacity-0 invisible translate-y-[175%]"
              }`}
            >
              {currentBlog}
            </span>
          )}
        </div>
        <button
          type="button"
          className="group rounded-full bg-white/90 px-2 py-1 sm:px-3 sm:py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
          onClick={() =>
            theme == "dark" ? setTheme("light") : setTheme("dark")
          }
        >
          <SunIcon className="h-5 w-5 sm:h-6 sm:w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-teal-50 [@media(prefers-color-scheme:dark)]:stroke-secondary [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-secondary/70" />
          <MoonIcon className="hidden h-5 w-5 sm:h-6 sm:w-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400 [@media_not_(prefers-color-scheme:dark)]:fill-teal-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-secondary" />
        </button>
        <div className="hidden md:flex items-center flex-shrink-0">
          {commonData?.topSocialLinks?.map((item, index) => (
            <Link
              href={item?.link || ""}
              key={index}
              target={item?.target || "_blank"}
              className="nav-social-link"
            >
              {item?.icon ? <FontAwesomeIcon icon={item?.icon} /> : ""}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

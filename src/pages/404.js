import Link from "next/link";
import React from "react";

export default function Error404() {
  return (
    <main className="pt-52 md:pt-36 pb-24 max-container text-center min-h-[90vh]">
      <h1 className="m-0 text-muted-4 text-8xl md:text-9xl opacity-75 font-semibold">
        404
      </h1>
      <p className="text-2xl md:text-3xl text-muted-5">Page not found</p>
      <Link href={"/"} className="mt-2 text-text-ternary hover:underline">
        Go to the front page →
      </Link>
    </main>
  );
}

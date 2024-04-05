import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-cols-2 h-[40rem]">
      <h1 className="text-center col-span-2 self-end font-josefin text-3xl">Welcome to Verinote</h1>
      <Link href="/home" className="col-span-2 grid">
        <div className="bg-yellow-400 text-center h-16 w-48 justify-self-center rounded-lg text-3xl font-josefin">
          Click to view the entire site
        </div>
      </Link>
    </div>
  );
}

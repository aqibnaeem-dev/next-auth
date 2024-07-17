import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="h-[100px] my-20 flex flex-col justify-between items-center">
      <h1 className="text-2xl text-green-800 font-bold">
        You are accessing the protected route
      </h1>

      <Link
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        href="/"
      >
        Goto Profile page
      </Link>
    </div>
  );
};

export default page;

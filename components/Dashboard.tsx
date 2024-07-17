"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Dashboard = () => {
  const { data: session } = useSession();
  const accessToken = (session as any)?.accessToken;

  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const handleSignIn = () => {
    signIn("google", { prompt: "select_account" });
  };

  return (
    <>
      {session?.user ? (
        <div>
          <div className="flex items-center space-x-4">
            <img
              src={session.user.image as string}
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="text-xl">{session.user.name}</p>
              <p className="text-gray-600">{session.user.email}</p>
              <p className="text-gray-600">
                Expires: {new Date(session.expires).toLocaleString()}
              </p>
              <p className="text-gray-600">
                Access Token: {accessToken.slice(0, 14)}...
              </p>
            </div>
          </div>
          <button
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={() => handleSignOut()}
          >
            Sign Out
          </button>

          <Link
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            href="/protected"
          >
            Goto Protected route
          </Link>
        </div>
      ) : (
        <div className="h-[200px] flex flex-col justify-evenly items-center border-2 border-black rounded-xl px-10">
          <h1 className="text-2xl text-red-800 font-bold">
            You are not logged in
          </h1>
          <div>
            <button
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={() => handleSignIn()}
            >
              Sign in with Google
            </button>

            <Link
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              href="/protected"
            >
              Goto Protected route
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

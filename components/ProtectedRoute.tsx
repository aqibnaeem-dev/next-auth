import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const checkTokenExpiry = () => {
      if (session && session.expires) {
        const currentTime = Math.floor(Date.now() / 1000);

        if (+session.expires < +currentTime) {
          signOut({ callbackUrl: "/" });
        }
      }
    };

    checkTokenExpiry();
  }, [session]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/access-denied");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return <>{session ? children : null}</>;
};

export default ProtectedRoute;

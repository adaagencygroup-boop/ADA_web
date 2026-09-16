"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LoadingScreen from "@/src/components/common/LoadingScreen";

export default function PageLoaderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsFadingOut(false);

    let isCancelled = false;

    const checkAllImagesLoaded = () => {
      const images = Array.from(document.querySelectorAll("img"));
      if (images.length === 0) {
        return Promise.resolve();
      }

      const imagePromises = images.map((img) => {
        if (img.complete && img.naturalWidth !== 0) {
          return Promise.resolve();
        }
        return new Promise<void>((resolve) => {
          const handleDone = () => {
            img.removeEventListener("load", handleDone);
            img.removeEventListener("error", handleDone);
            resolve();
          };
          img.addEventListener("load", handleDone);
          img.addEventListener("error", handleDone);
        });
      });

      return Promise.all(imagePromises);
    };

    const handlePageLoad = async () => {
      // Small tick to allow DOM elements and Next.js Image components to render
      await new Promise((r) => setTimeout(r, 150));

      if (document.readyState === "complete") {
        await checkAllImagesLoaded();
      } else {
        await new Promise<void>((resolve) => {
          const onWinLoad = () => {
            window.removeEventListener("load", onWinLoad);
            resolve();
          };
          window.addEventListener("load", onWinLoad);
        });
        await checkAllImagesLoaded();
      }

      if (!isCancelled) {
        setIsFadingOut(true);
        setTimeout(() => {
          if (!isCancelled) {
            setIsLoading(false);
            setIsFadingOut(false);
          }
        }, 500);
      }
    };

    // Safety timeout: maximum 3 seconds to avoid blocking user indefinitely
    const safetyTimer = setTimeout(() => {
      if (!isCancelled) {
        setIsFadingOut(true);
        setTimeout(() => {
          if (!isCancelled) {
            setIsLoading(false);
            setIsFadingOut(false);
          }
        }, 500);
      }
    }, 3000);

    handlePageLoad();

    return () => {
      isCancelled = true;
      clearTimeout(safetyTimer);
    };
  }, [pathname]);

  return (
    <>
      {children}
      {isLoading && (
        <LoadingScreen
          fullScreen
          className={`transition-opacity duration-500 ease-out ${
            isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        />
      )}
    </>
  );
}

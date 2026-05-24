"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function UserSync() {
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    fetch("/api/user/sync", {
      method: "POST",
    }).catch((error) => {
      console.error("User sync failed:", error);
    });
  }, [isLoaded, isSignedIn]);

  return null;
}
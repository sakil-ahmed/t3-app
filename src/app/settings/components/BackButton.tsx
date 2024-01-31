"use client";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa6";

import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      variant={"ghost"}
      className="flex items-center gap-2"
      onClick={() => router.push(`/projects`)}
    >
      Back
      <FaArrowRight />
    </Button>
  );
};

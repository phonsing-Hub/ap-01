"use client";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

export function ImageUploader({
  preview,
  onChange,
}: {
  preview: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="size-40 relative">
      <img
        className="w-full h-full p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
        src={preview ?? "#"}
        alt="Bordered avatar"
      />
      <input
        ref={fileInputRef}
        id="image-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onChange}
      />
      <Button
        type="button"
        size="sm"
        onClick={() => fileInputRef.current?.click()}
        className=" absolute bottom-2 right-1"
      >
        <Camera />
      </Button>
    </div>
  );
}

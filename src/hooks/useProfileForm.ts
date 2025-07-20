"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useFetchApi } from "@/hooks/useFetchApi";
import { useAuth } from "@/lib/auth/AuthContext";
import { FromUserSchema, userSchema } from "@/lib/auth/user";
import { useLoading } from "@/components/LoadingProvider";

const baseUrlimg = process.env.NEXT_PUBLIC_API_IMG || "https://mygoapi";

export function useProfileForm() {
  const { user, getCurrentUser, token } = useAuth();
  const { loading, setLoading } = useLoading();
  const ApiCall = useFetchApi();

  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<FromUserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      ...user,
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (user) {
      form.reset(user);
      if (user.avatar) {
        setPreview(`${baseUrlimg}${user.avatar}`);
      }
    }
  }, [user, form]);

  const uploadAvatar = async (avatarFile: File) => {
    const formData = new FormData();
    formData.append("avatar", avatarFile);

    await ApiCall(`/users/${user?.id}/avatar`, {
      method: "POST",
      body: formData,
    });
    setFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

const handleSubmit = async (data: FromUserSchema) => {
  const hasFormChanges = form.formState.isDirty;
  const hasNewAvatar = file !== null;
  setLoading(true);

  try {
    if (hasNewAvatar) {
      toast.info("Uploading avatar...");
      await uploadAvatar(file!);
      setFile(null);
    }

    if (hasFormChanges) {
      await ApiCall(`/users/${user?.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      await getCurrentUser(token!);
      toast.success("Profile updated successfully!", {
        description: "Your changes have been saved.",
      });
    } else if (hasNewAvatar) {
      toast.success("Avatar updated successfully!");
    }

  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred.";
    toast.error("Failed to update profile", {
      description: errorMessage,
    });
  } finally {
    setLoading(false);
  }
};

  return {
    form,
    loading,
    preview,
    user,
    file,
    handleSubmit,
    handleFileChange,
  };
}

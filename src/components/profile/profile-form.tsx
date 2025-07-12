"use client";
import { Loader2Icon } from "lucide-react";
import { useProfileForm } from "@/hooks/useProfileForm";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "./ImageUploader";

export function ProfileForm() {
  const { form,file, loading, preview, user, handleSubmit, handleFileChange } =
    useProfileForm();
  
  const isFormChanged = form.formState.isDirty || file !== null;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
       <div className="flex justify-center">
         <ImageUploader preview={preview} onChange={handleFileChange} />
       </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input
                    placeholder={user?.first_name || "Enter first name"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input
                    placeholder={user?.last_name || "Enter last name"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          disabled
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder={user?.email} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="display_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display name</FormLabel>
              <FormControl>
                <Input
                  placeholder={user?.display_name || "Enter display name"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={user?.bio || "Tell us about yourself"}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations to
                link to them.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={!isFormChanged || loading}>
          Update profile
          {loading && <Loader2Icon className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
}

"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "next-themes";
import { FONT_OPTIONS, FontKey } from "@/lib/fonts";

const appearanceFormSchema = z.object({
  mode: z.enum(["light", "dark", "system"], {
    required_error: "Please select a theme.",
  }),
  font: z.string(),
  theme: z.string(),
});

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

const THEME_COLORS = [
  { key: "theme-default", label: "Default" },
  { key: "theme-red", label: "Red" },
  { key: "theme-rose", label: "Rose" },
  { key: "theme-orange", label: "Orange" },
  { key: "theme-green", label: "Green" },
  { key: "theme-blue", label: "Blue" },
  { key: "theme-yellow", label: "Yellow" },
  { key: "theme-violet", label: "Violet" },
];

export function AppearanceForm() {
  const { setTheme } = useTheme();
  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      mode: "system",
      font:
        typeof window !== "undefined"
          ? (localStorage.getItem("font") as FontKey) || "geist-sans"
          : "geist-sans",
      theme:
        typeof window !== "undefined"
          ? localStorage.getItem("theme-color") || "theme-default"
          : "theme-default",
    },
  });

  function onSubmit(data: AppearanceFormValues) {
    const fontDef = FONT_OPTIONS[data.font as FontKey];
    if (!fontDef) return;

    localStorage.setItem("font", data.font);
    document.documentElement.style.setProperty(
      "--font-sans",
      fontDef.var === "system-ui" ? fontDef.var : `var(${fontDef.var})`
    );
    setTheme(data.mode);
    const themeColor = data.theme;
    localStorage.setItem("theme-color", themeColor);
    const html = document.documentElement;
    html.classList.remove(...THEME_COLORS.map((t) => t.key));
    html.classList.add(themeColor);

    toast("Appearance updated", {
      description: `Theme: ${data.theme} Mode: ${data.mode} Font: ${fontDef.label}`,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="font"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Font</FormLabel>
              <div className="relative w-max">
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-xs ">
                      <SelectValue placeholder="Font" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(FONT_OPTIONS).map(([key, val]) => (
                        <SelectItem key={key} value={key}>
                          {val.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
              </div>
              <FormDescription>
                Select the font to apply to the App.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Theme Color</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-xs ">
                    <SelectValue placeholder="Theme Color" />
                  </SelectTrigger>
                  <SelectContent>
                    {THEME_COLORS.map((t) => (
                      <SelectItem key={t.key} value={t.key}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>Pick your color theme.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mode"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Mode</FormLabel>
              <FormDescription>
                Select the mode to apply to the App.
              </FormDescription>
              <FormMessage />
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-3 gap-8 pt-2"
              >
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary flex-col">
                    <FormControl>
                      <RadioGroupItem value="system" className="sr-only" />
                    </FormControl>
                    <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                      <div className="space-y-2 rounded-sm bg-sidebar p-2">
                        <div className="space-y-2 rounded-md bg-background p-2 shadow-sm">
                          <div className="h-2 w-[80px] rounded-lg bg-sidebar" />
                          <div className="h-2 w-[100px] rounded-lg bg-sidebar" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-background p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-sidebar" />
                          <div className="h-2 w-[100px] rounded-lg bg-sidebar" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-background p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-sidebar" />
                          <div className="h-2 w-[100px] rounded-lg bg-sidebar" />
                        </div>
                      </div>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">
                      System
                    </span>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary flex-col">
                    <FormControl>
                      <RadioGroupItem value="light" className="sr-only" />
                    </FormControl>
                    <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                      <div className="space-y-2 rounded-sm bg-[oklch(0.985_0_0)] p-2">
                        <div className="space-y-2 rounded-md bg-[oklch(1_0_0)] p-2 shadow-sm">
                          <div className="h-2 w-[80px] rounded-lg bg-[oklch(0.985_0_0)]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[oklch(0.985_0_0)]" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-[oklch(1_0_0)] p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-[oklch(0.985_0_0)]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[oklch(0.985_0_0)]" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-[oklch(1_0_0)] p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-[oklch(0.985_0_0)]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[oklch(0.985_0_0)]" />
                        </div>
                      </div>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">
                      Light
                    </span>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary flex-col">
                    <FormControl>
                      <RadioGroupItem value="dark" className="sr-only" />
                    </FormControl>
                    <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                      <div className="space-y-2 rounded-sm bg-[oklch(0.205_0_0)] p-2">
                        <div className="space-y-2 rounded-md bg-[oklch(0%_0_0)] p-2 shadow-sm">
                          <div className="h-2 w-[80px] rounded-lg bg-[oklch(0.205_0_0)]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[oklch(0.205_0_0)]" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-[oklch(0%_0_0)] p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-[oklch(0.205_0_0)]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[oklch(0.205_0_0)]" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-[oklch(0%_0_0)] p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-[oklch(0.205_0_0)]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[oklch(0.205_0_0)]" />
                        </div>
                      </div>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">
                      Dark
                    </span>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormItem>
          )}
        />

        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}

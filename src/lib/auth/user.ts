import { z } from "zod";

export interface User {
  id: number;
  email: string;
  is_email_verified: boolean;
  first_name: string;
  last_name: string;
  display_name: string;
  avatar?: string;
}

export interface Location {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  user_id: number;
  location_type: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state_province: string;
  postal_code: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
  is_default: boolean;
}

export const userStatusSchema = z.object({
  id: z.number(),
  status_name: z.string(),
  description: z.string(),
});

export const locationSchema = z.object({
  ID: z.number(),
  CreatedAt: z.string(),
  UpdatedAt: z.string(),
  DeletedAt: z.string().nullable(),
  user_id: z.number(),
  location_type: z.string(),
  address_line1: z.string(),
  address_line2: z.string(),
  city: z.string(),
  state_province: z.string(),
  postal_code: z.string(),
  country: z.string(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  is_default: z.boolean(),
});

export const userSchema = z.object({
  ID: z.number(),
  email: z.string().email(),
  is_email_verified: z.boolean(),
  phone_number: z.string(),
  is_phone_verified: z.boolean(),
  first_name: z.string(),
  last_name: z.string(),
  display_name: z.string(),
  bio: z.string(),
  date_of_birth: z.string(), // ISO datetime format
  gender: z.enum(["male", "female", "other"]).or(z.string()),
  language_preference: z.string(),
  time_zone: z.string(),
  last_activity_at: z.string().nullable(),
  current_status_id: z.number(),
});

export type FromUserSchema = z.infer<typeof userSchema>;

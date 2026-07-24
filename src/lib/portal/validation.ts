import { z } from "zod";

export const clubSlugSchema = z
  .string()
  .min(3)
  .max(80)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens.");

export const createClubSchema = z.object({
  name: z.string().min(2).max(160),
  slug: clubSlugSchema,
  address: z.string().max(500).optional(),
  website: z.string().url().optional(),
  primaryContactName: z.string().min(2).max(160),
  primaryContactEmail: z.string().email(),
  packageId: z.string().uuid(),
});

export const inviteUserSchema = z.object({
  clubId: z.string().uuid(),
  email: z.string().email(),
  fullName: z.string().min(2).max(160),
  role: z.enum(["club_admin", "club_user", "committee_viewer"]),
});

export const reportMetadataSchema = z.object({
  clubId: z.string().uuid(),
  courseId: z.string().uuid(),
  surveyId: z.string().uuid().optional(),
  title: z.string().min(3).max(180),
  slug: clubSlugSchema,
  reportType: z.string().min(2).max(80),
  summary: z.string().max(1500).optional(),
});

export const publishReportSchema = z.object({
  reportId: z.string().uuid(),
  confirmation: z.literal("publish"),
});

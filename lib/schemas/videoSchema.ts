import { z } from "zod";

export const VideoFormSchema = z.object({
  topic: z.string().min(5, {
    message: "Topic must be at least 5 characters.",
  }),
  duration: z.coerce.number().min(5).max(30),
  format: z.enum(["portrait", "landscape"], {
    message: "Please select a format.",
  }),
  resolution: z.enum(["720p", "1080p", "4k"]).default("1080p"),
});

export type VideoFormValues = z.infer<typeof VideoFormSchema>;

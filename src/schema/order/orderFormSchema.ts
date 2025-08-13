import { z } from "zod";

export const orderFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export type OrderFormSchema = z.infer<typeof orderFormSchema>;
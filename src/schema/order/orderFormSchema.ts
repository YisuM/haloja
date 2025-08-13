import { z } from "zod";

export const orderFormSchema = z
  .object({
    // Permitimos "server" como placeholder inicial, pero lo invalidamos con refine
    server: z
      .enum(["server", "wordpress", "drupal"], {
        // Mensaje para valores fuera del enum
        error: (iss) =>
          iss.input === undefined
            ? "Selecciona un servidor."
            : "Valor de servidor no válido.",
      })
      // Evita que el placeholder "server" sea válido al enviar
      .refine((v) => v !== "server", { error: "Selecciona un CMS válido." }),

    // Campos específicos (opcionales a nivel de tipo; se exigen según `server`)
    wordpressSiteTitle: z.string({ error: "Requerido." }).min(1, { error: "Requerido." }).optional(),
    drupalProfile: z.string({ error: "Requerido." }).min(1, { error: "Requerido." }).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.server === "wordpress" && !data.wordpressSiteTitle) {
      ctx.addIssue({
        code: "custom",                  // <- en v4 es un string
        path: ["wordpressSiteTitle"],    // marca el campo
        message: "Título del sitio (WordPress) es obligatorio.",
      });
    }

    if (data.server === "drupal" && !data.drupalProfile) {
      ctx.addIssue({
        code: "custom",
        path: ["drupalProfile"],
        message: "Perfil de instalación (Drupal) es obligatorio.",
      });;
    }
  });

export type OrderFormSchema = z.infer<typeof orderFormSchema>;

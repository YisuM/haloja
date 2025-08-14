import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Reglas por defecto de Next.js + TypeScript
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Ignorar completamente la carpeta generada
  {
    ignores: ["src/app/generated/**"],
  },

  // Alternativa: permitir lint pero con reglas relajadas solo para código generado
  {
    files: ["src/app/generated/**"],
    rules: {
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];

export default eslintConfig;

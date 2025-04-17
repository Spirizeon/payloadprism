import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Extend default Next.js and TypeScript configurations
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Add a rules section to disable all rules
  {
    rules: {
      // Disable all ESLint rules globally
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "react-hooks/exhaustive-deps": "off",
      "prefer-const": "off",
      "no-var": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "react/jsx-no-target-blank": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      // You can disable more rules here if needed
    },
  },
];

export default eslintConfig;

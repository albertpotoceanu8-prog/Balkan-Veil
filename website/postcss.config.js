import { fileURLToPath } from "node:url";
import path from "node:path";

const config = path.join(path.dirname(fileURLToPath(import.meta.url)), "tailwind.config.js");

export default {
  plugins: {
    tailwindcss: { config },
    autoprefixer: {},
  },
};

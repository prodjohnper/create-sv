#!/usr/bin/env node
import { execSync } from "node:child_process";
import { writeFileSync, mkdirSync, existsSync, appendFileSync, readFileSync } from "node:fs";
import { basename, resolve } from "node:path";

function info(msg){ console.log(`\x1b[36m>> ${msg}\x1b[0m`); }
function die(msg){ console.error(`\x1b[31m${msg}\x1b[0m`); process.exit(1); }

const major = Number(process.versions.node.split(".")[0]);
if (major !== 20) die(`Node 20.x is required. You have ${process.version}`);

let APP_NAME = "";
let SUPABASE = false;
let DAISYUI  = false;

for (const arg of process.argv.slice(2)) {
  if (arg === "--supabase") SUPABASE = true;
  else if (arg === "--daisyui") DAISYUI = true;
  else if (arg === "-h" || arg === "--help") {
    console.log(`Usage: create-sv [app-name] [--supabase] [--daisyui]`);
    process.exit(0);
  } else if (arg.startsWith("--")) die(`Unknown flag: ${arg}`);
  else if (!APP_NAME) APP_NAME = arg;
  else die(`Unexpected extra argument: ${arg}`);
}

const cwd = process.cwd();
const TARGET_DIR = APP_NAME ? resolve(cwd, APP_NAME) : cwd;
const PROJECT_NAME = APP_NAME ? APP_NAME : basename(cwd);

try {
  if (APP_NAME && !existsSync(TARGET_DIR)) mkdirSync(TARGET_DIR, { recursive: true });

  info(`Creating SvelteKit app: ${PROJECT_NAME}`);
  execSync(`npx sv create --template minimal --types ts --no-add-ons --install npm "${TARGET_DIR}"`, { stdio: "inherit" });

  process.chdir(TARGET_DIR);

  info(`Adding TailwindCSS, ESLint, Prettier`);
  execSync(`npx sv add tailwindcss eslint prettier --install npm`, { stdio: "inherit" });

  info(`Writing tailwind.config.ts`);
  writeFileSync("tailwind.config.ts",
`/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
`);

  if (DAISYUI) {
    info(`Installing DaisyUI`);
    execSync(`npm i -D daisyui`, { stdio: "inherit" });

    const cssFile = "src/app.css";
    try {
      const css = readFileSync(cssFile, "utf8");
      if (!css.includes('@plugin "daisyui";')) {
        appendFileSync(cssFile, '\n@plugin "daisyui";\n');
        info(`Added '@plugin "daisyui";' to ${cssFile}`);
      }
    } catch {
      mkdirSync("src", { recursive: true });
      writeFileSync(cssFile, '@plugin "daisyui";\n');
    }

    mkdirSync("src/routes/test", { recursive: true });
    writeFileSync("src/routes/test/+page.svelte",
`<script lang="ts">
  import { goto } from '$app/navigation';
</script>

<main class="min-h-screen flex items-center justify-center bg-base-200 p-4">
  <div class="card w-full max-w-md shadow-xl bg-base-100">
    <div class="card-body items-center text-center">
      <h1 class="card-title text-4xl mb-2">Welcome</h1>
      <p class="text-lg mb-4">
        You successfully configured your Svelte project.
      </p>
      <div class="card-actions">
        <button class="btn btn-primary" on:click={() => goto('/')}>
          Go Home
        </button>
      </div>
    </div>
  </div>
</main>
`);
  }

  if (SUPABASE) {
    info(`Adding Supabase client`);
    execSync(`npm install @supabase/supabase-js`, { stdio: "inherit" });

    mkdirSync("src/lib", { recursive: true });
    writeFileSync("src/lib/supabaseClient.ts",
`import { createClient } from '@supabase/supabase-js';
// Replace these placeholders with your own values before use:
export const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_ANON_KEY');
`);
  }

  info(`Done. Start the dev server:\n   cd "${TARGET_DIR}" && npm run dev`);
} catch (err) {
  die(err?.message || String(err));
}

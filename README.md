# @sve0/create-sv

A one-shot **[SvelteKit](https://kit.svelte.dev/)** bootstrapper with:

- **[TypeScript](https://www.typescriptlang.org/)**
- **[Tailwind CSS](https://tailwindcss.com)**
- **[ESLint](https://eslint.org/)**
- **[Prettier](https://prettier.io/)**
- **[DaisyUI](https://daisyui.com)**
- **[Supabase](https://supabase.com)**

All out of the box!

## Requirements

- **`Node 20.x`**

## Quick start

**npx:**

```bash
    npx @sve0/create-sv my-app --daisyui --supabase
```

**Global install:**

```bash
    npm i -g @sve0/create-sv
    create-sv <my-app> --daisyui --supabase
```

---

- No `app name` given, results in project created in current directory (uses current directory name as project name).
- When given `app name`, new directory is created and project is created inside it.
- `--daisyui` and `--supabase` flags are optional.

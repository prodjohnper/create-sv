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

---

### MIT License

Copyright &copy; 2025 prodjohnper / sve0

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

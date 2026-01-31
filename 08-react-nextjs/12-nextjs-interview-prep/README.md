# Next.js Interview Preparation 🔥

> **Ace Your Next.js Interview**
> Complete Q&A guide with code examples

**Interview Probability:** ⭐⭐⭐⭐⭐ (VERY HIGH)

---

## 📚 Table of Contents

1. [Core Concepts](#core-concepts)
2. [Rendering Questions](#rendering-questions)
3. [Performance Questions](#performance-questions)
4. [Routing Questions](#routing-questions)
5. [Data Fetching](#data-fetching)
6. [Common Patterns](#common-patterns)
7. [Tricky Questions](#tricky-questions)
8. [Coding Challenges](#coding-challenges)

---

## Core Concepts

### Q1: What is Next.js and why use it?

**Answer:**
Next.js is a React framework for production that provides:

**Key Features:**
- ✅ **SSR** (Server-Side Rendering) - Better SEO
- ✅ **SSG** (Static Site Generation) - Fast loading
- ✅ **ISR** (Incremental Static Regeneration) - Best of both
- ✅ **File-based routing** - No router config
- ✅ **API routes** - Backend in same project
- ✅ **Image optimization** - Automatic WebP/AVIF
- ✅ **Font optimization** - Self-host Google Fonts
- ✅ **Code splitting** - Automatic bundle optimization

**Why Next.js over Create React App?**
- CRA: Client-side only → Poor SEO
- Next.js: SSR/SSG → Great SEO, faster initial load

---

### Q2: App Router vs Pages Router?

**Answer:**

| Pages Router (Old) | App Router (New) |
|-------------------|------------------|
| `pages/` directory | `app/` directory |
| Client Components default | Server Components default |
| `getServerSideProps` | `fetch` with caching options |
| No nested layouts | Nested layouts |
| `_app.js` for global | `layout.js` hierarchy |

**Recommendation:** Use **App Router** for new projects.

**Example:**

**Pages Router:**
```jsx
// pages/blog/[slug].js
export async function getStaticProps({ params }) {
  const post = await getPost(params.slug);
  return { props: { post } };
}

export default function Post({ post }) {
  return <div>{post.title}</div>;
}
```

**App Router:**
```jsx
// app/blog/[slug]/page.js
export default async function Post({ params }) {
  const post = await getPost(params.slug);
  return <div>{post.title}</div>;
}
```

---

### Q3: Server Components vs Client Components?

**Answer:**

| Server Components | Client Components |
|------------------|-------------------|
| **Default** in App Router | Need `'use client'` |
| Rendered on server | Rendered on client |
| Direct database access | No database access |
| No bundle size impact | Adds to bundle |
| **Cannot** use state/effects | **Can** use state/effects |
| **Cannot** use browser APIs | **Can** use browser APIs |

**When to use each:**

**Server Components (default):**
- Fetch data
- Access backend resources
- Keep sensitive info on server
- Reduce JavaScript bundle

```jsx
// Server Component (no directive needed)
async function Page() {
  const data = await fetch('https://api.example.com/data');
  return <div>{data}</div>;
}
```

**Client Components:**
- Use useState, useEffect
- Event handlers
- Browser APIs
- Third-party libraries with state

```jsx
'use client'; // Required!

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

---

### Q4: What is Hydration?

**Answer:**
Hydration is when React attaches event handlers to server-rendered HTML.

**Process:**
```
1. Server renders HTML → Browser receives HTML (user sees content)
   ↓
2. Browser downloads JavaScript
   ↓
3. React "hydrates" → Attaches event listeners (now interactive)
```

**Hydration Errors:**
```jsx
// ❌ Wrong: Different content on server vs client
function Component() {
  return <div>{Date.now()}</div>; // Changes between server and client!
}

// ✅ Correct: Same on both
function Component() {
  const [date, setDate] = useState(null);

  useEffect(() => {
    setDate(Date.now());
  }, []);

  return <div>{date}</div>;
}
```

---

## Rendering Questions

### Q5: SSR vs SSG vs ISR - When to use what?

**Answer:**

**SSR (Server-Side Rendering):**
- Render on **each request**
- Always fresh data
- Slower (render on demand)

**Use when:**
- Personalized content
- Real-time data
- User-specific pages

```jsx
// Force SSR
export const dynamic = 'force-dynamic';

// Or
fetch(url, { cache: 'no-store' });
```

**SSG (Static Site Generation):**
- Render at **build time**
- Fastest (pre-rendered)
- Stale until rebuild

**Use when:**
- Content rarely changes
- Marketing pages, blogs, docs
- Same for all users

```jsx
// SSG (default for Server Components)
export async function generateStaticParams() {
  return [
    { slug: 'post-1' },
    { slug: 'post-2' }
  ];
}
```

**ISR (Incremental Static Regeneration):**
- Static + **periodic updates**
- Fast + relatively fresh

**Use when:**
- E-commerce product pages
- News articles
- Content updates periodically

```jsx
fetch(url, {
  next: { revalidate: 60 } // Revalidate every 60s
});
```

**Decision Tree:**
```
Need real-time data?
├─ Yes → SSR
└─ No → Content changes?
    ├─ Never/Rarely → SSG
    └─ Periodically → ISR
```

---

### Q6: Explain Streaming in Next.js

**Answer:**
Streaming sends UI to client in chunks as they're ready.

**Benefits:**
- Users see content faster (progressive rendering)
- Don't wait for entire page

```jsx
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <h1>My Page</h1>

      {/* Fast component renders immediately */}
      <FastComponent />

      {/* Slow component streams when ready */}
      <Suspense fallback={<div>Loading...</div>}>
        <SlowComponent />
      </Suspense>
    </div>
  );
}

async function SlowComponent() {
  const data = await slowFetch(); // Takes 3 seconds
  return <div>{data}</div>;
}
```

**Timeline:**
```
0s: HTML sent → h1 + FastComponent visible
3s: SlowComponent ready → Streamed to client
```

---

### Q7: What is the difference between `use client` and `use server`?

**Answer:**

**`'use client'`:**
- Marks component for client-side rendering
- Can use state, effects, browser APIs
- Required for interactivity

```jsx
'use client';

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

**`'use server'`:**
- Marks Server Actions
- Run on server only
- Called from client or server components

```jsx
'use server';

export async function createPost(formData) {
  const title = formData.get('title');

  // Database access (server only)
  await db.post.create({ data: { title } });

  revalidatePath('/posts');
}

// Client component can call it
'use client';
function Form() {
  return (
    <form action={createPost}>
      <input name="title" />
      <button>Create</button>
    </form>
  );
}
```

---

## Performance Questions

### Q8: How does Next.js optimize images?

**Answer:**
Next.js Image component provides automatic optimizations:

**Features:**
- ✅ WebP/AVIF conversion
- ✅ Lazy loading (default)
- ✅ Responsive images
- ✅ Blur placeholder
- ✅ Prevents Cumulative Layout Shift (CLS)

```jsx
import Image from 'next/image';

<Image
  src="/photo.jpg"
  width={500}
  height={300}
  alt="Photo"
  priority // Disable lazy loading (above fold)
  placeholder="blur" // Blur-up effect
/>
```

**Comparison:**
```jsx
// Regular <img> (bad)
<img src="/photo.jpg" /> // No optimization

// Next.js Image (good)
<Image src="/photo.jpg" width={500} height={300} />
// → Serves WebP to Chrome, JPEG to Safari
// → Lazy loads
// → Responsive sizes
```

---

### Q9: Explain Next.js caching strategies

**Answer:**
Next.js has **4 caching layers**:

**1. Request Memoization:**
- Same `fetch` in component tree = 1 request
- Automatic during single render

**2. Data Cache:**
- Caches fetch responses
- Default: Forever

```jsx
// Cache forever (default)
fetch(url);

// No cache
fetch(url, { cache: 'no-store' });

// Revalidate after 60s
fetch(url, { next: { revalidate: 60 } });
```

**3. Full Route Cache:**
- Static routes cached at build time
- Opt-out with `dynamic = 'force-dynamic'`

**4. Router Cache:**
- Client-side cache of visited routes
- Soft navigation (no full reload)

**On-demand revalidation:**
```jsx
import { revalidatePath, revalidateTag } from 'next/cache';

// Revalidate specific path
revalidatePath('/blog/post-1');

// Revalidate by tag
fetch(url, { next: { tags: ['posts'] } });
revalidateTag('posts');
```

---

### Q10: How to optimize bundle size?

**Answer:**

**1. Code Splitting:**
```jsx
const HeavyComponent = lazy(() => import('./HeavyComponent'));

<Suspense fallback={<Loading />}>
  <HeavyComponent />
</Suspense>
```

**2. Dynamic Imports:**
```jsx
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('./Component'), {
  loading: () => <p>Loading...</p>,
  ssr: false // Disable SSR for this component
});
```

**3. Tree Shaking:**
```jsx
// ❌ Bad: Imports entire library
import _ from 'lodash';

// ✅ Good: Imports only what you need
import debounce from 'lodash/debounce';
```

**4. Analyze Bundle:**
```bash
npm install @next/bundle-analyzer
ANALYZE=true npm run build
```

---

## Routing Questions

### Q11: Explain Next.js routing

**Answer:**
Next.js uses file-based routing in `app/` directory.

**Basic Routes:**
```
app/
├── page.js           → /
├── about/
│   └── page.js       → /about
└── blog/
    └── page.js       → /blog
```

**Dynamic Routes:**
```
app/blog/[slug]/page.js → /blog/anything

function Page({ params }) {
  return <h1>{params.slug}</h1>;
}
```

**Catch-All Routes:**
```
app/shop/[...slug]/page.js → /shop/a, /shop/a/b, /shop/a/b/c

function Page({ params }) {
  // /shop/a/b/c → params.slug = ['a', 'b', 'c']
  return <h1>{params.slug.join('/')}</h1>;
}
```

**Optional Catch-All:**
```
app/docs/[[...slug]]/page.js → /docs AND /docs/anything
```

**Route Groups (don't affect URL):**
```
app/(marketing)/about/page.js → /about
app/(shop)/products/page.js → /products
```

---

### Q12: What are layouts in Next.js?

**Answer:**
Layouts wrap pages and persist across navigation.

**Root Layout (required):**
```jsx
// app/layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>Navigation</nav>
        {children}
        <footer>Footer</footer>
      </body>
    </html>
  );
}
```

**Nested Layouts:**
```jsx
// app/blog/layout.js
export default function BlogLayout({ children }) {
  return (
    <div>
      <aside>Blog Sidebar</aside>
      <main>{children}</main>
    </div>
  );
}
```

**Benefits:**
- Shared UI without re-rendering
- Persistent state
- Nested layouts
- Loading states per segment

---

## Data Fetching

### Q13: How to fetch data in Next.js?

**Answer:**

**Server Components (recommended):**
```jsx
// No useEffect needed!
async function Page() {
  const data = await fetch('https://api.example.com/data');
  return <div>{data}</div>;
}
```

**Parallel Fetching:**
```jsx
async function Page() {
  const [users, posts] = await Promise.all([
    fetch('https://api.example.com/users').then(r => r.json()),
    fetch('https://api.example.com/posts').then(r => r.json())
  ]);

  return (
    <>
      <Users data={users} />
      <Posts data={posts} />
    </>
  );
}
```

**Client Components (if needed):**
```jsx
'use client';

function Component() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(r => r.json())
      .then(setData);
  }, []);

  return <div>{data}</div>;
}
```

---

### Q14: What are Server Actions?

**Answer:**
Server Actions are async functions that run on the server.

**Benefits:**
- No API routes needed
- Type-safe
- Progressive enhancement (works without JS)

```jsx
// actions.js
'use server';

export async function createPost(formData) {
  const title = formData.get('title');
  const content = formData.get('content');

  await db.post.create({
    data: { title, content }
  });

  revalidatePath('/posts');
  redirect('/posts');
}

// page.js
import { createPost } from './actions';

export default function Page() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="Title" />
      <textarea name="content" placeholder="Content" />
      <button type="submit">Create</button>
    </form>
  );
}
```

**With useTransition:**
```jsx
'use client';

import { useTransition } from 'react';
import { createPost } from './actions';

export default function Form() {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData) => {
    startTransition(async () => {
      await createPost(formData);
    });
  };

  return (
    <form action={handleSubmit}>
      <input name="title" disabled={isPending} />
      <button disabled={isPending}>
        {isPending ? 'Creating...' : 'Create'}
      </button>
    </form>
  );
}
```

---

## Common Patterns

### Q15: How to implement authentication?

**Answer:**
Use NextAuth.js:

**1. Setup:**
```jsx
// app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const { handlers, auth } = NextAuth({
  providers: [GithubProvider({ ... })]
});

export const { GET, POST } = handlers;
```

**2. Protect pages:**
```jsx
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return <div>Welcome, {session.user.name}</div>;
}
```

**3. Client usage:**
```jsx
'use client';

import { useSession } from 'next-auth/react';

export function UserButton() {
  const { data: session } = useSession();

  if (!session) return <a href="/login">Login</a>;

  return <div>Hi, {session.user.name}</div>;
}
```

---

### Q16: How to handle loading and error states?

**Answer:**

**Loading UI:**
```jsx
// app/dashboard/loading.js
export default function Loading() {
  return <div>Loading dashboard...</div>;
}

// Automatically wraps page in Suspense:
// <Suspense fallback={<Loading />}>
//   <Page />
// </Suspense>
```

**Error UI:**
```jsx
// app/error.js
'use client'; // Must be Client Component

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

**Not Found:**
```jsx
// app/not-found.js
export default function NotFound() {
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <Link href="/">Go Home</Link>
    </div>
  );
}

// Trigger manually
import { notFound } from 'next/navigation';

if (!post) {
  notFound();
}
```

---

## Tricky Questions

### Q17: Can you use hooks in Server Components?

**Answer:**
**No!** Server Components cannot use:
- ❌ `useState`, `useEffect`, `useContext`
- ❌ Event handlers (`onClick`, `onChange`)
- ❌ Browser APIs (`window`, `document`)

**Why?** They render on the server (no browser).

**Solution:** Use Client Components for interactivity.

```jsx
// ❌ Wrong
async function Page() {
  const [count, setCount] = useState(0); // Error!
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// ✅ Correct
'use client';

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

---

### Q18: What happens if you import Server Component in Client Component?

**Answer:**
**You can**, but it becomes a Client Component (loses server benefits).

```jsx
// ServerComponent.js (Server Component)
async function ServerComponent() {
  const data = await fetch('...');
  return <div>{data}</div>;
}

// ClientComponent.js
'use client';

import ServerComponent from './ServerComponent'; // ❌ Now runs on client!

function ClientComponent() {
  const [count, setCount] = useState(0);
  return (
    <>
      <ServerComponent /> {/* Runs on client now */}
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </>
  );
}
```

**Solution:** Pass Server Component as children.

```jsx
// page.js (Server Component)
import ClientComponent from './ClientComponent';
import ServerComponent from './ServerComponent';

export default function Page() {
  return (
    <ClientComponent>
      <ServerComponent /> {/* Stays server component! */}
    </ClientComponent>
  );
}

// ClientComponent.js
'use client';

export default function ClientComponent({ children }) {
  const [count, setCount] = useState(0);
  return (
    <>
      {children} {/* Server Component */}
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </>
  );
}
```

---

## Coding Challenges

### Challenge 1: Build a Blog with SSG

**Requirements:**
- List all posts (SSG)
- Individual post pages (SSG)
- Generate at build time

**Solution:**
```jsx
// app/blog/page.js
async function getAllPosts() {
  const posts = await fetch('https://api.example.com/posts').then(r => r.json());
  return posts;
}

export default async function Blog() {
  const posts = await getAllPosts();

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
}

// app/blog/[slug]/page.js
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts').then(r => r.json());

  return posts.map(post => ({
    slug: post.slug
  }));
}

async function getPost(slug) {
  const post = await fetch(`https://api.example.com/posts/${slug}`).then(r => r.json());
  return post;
}

export default async function Post({ params }) {
  const post = await getPost(params.slug);

  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  );
}
```

---

### Challenge 2: Protected Dashboard with Auth

**Requirements:**
- Login page
- Protected dashboard
- Redirect if not authenticated

**Solution:**
```jsx
// middleware.js
import { auth } from '@/auth';

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname.startsWith('/dashboard')) {
    return Response.redirect(new URL('/login', req.url));
  }
});

export const config = {
  matcher: ['/dashboard/:path*']
};

// app/dashboard/page.js
import { auth } from '@/auth';

export default async function Dashboard() {
  const session = await auth();

  return <div>Welcome, {session.user.name}</div>;
}

// app/login/page.js
'use client';

import { signIn } from 'next-auth/react';

export default function Login() {
  return <button onClick={() => signIn('github')}>Login with GitHub</button>;
}
```

---

## 🎯 Interview Checklist

Before your interview, make sure you can:

- [ ] Explain SSR vs SSG vs ISR
- [ ] Know when to use Server vs Client Components
- [ ] Understand Next.js caching layers
- [ ] Implement authentication (NextAuth)
- [ ] Use Server Actions
- [ ] Optimize images with Image component
- [ ] Implement dynamic routing
- [ ] Use layouts and loading states
- [ ] Handle errors properly
- [ ] Explain hydration
- [ ] Know Middleware use cases
- [ ] Implement protected routes
- [ ] Use Metadata API for SEO

---

**Previous:** [Next.js Advanced](../11-nextjs-advanced/README.md)
**Back to:** [React Interview Prep](../09-react-interview-prep/README.md)

---

**You're ready to ace Next.js interviews! 🚀**

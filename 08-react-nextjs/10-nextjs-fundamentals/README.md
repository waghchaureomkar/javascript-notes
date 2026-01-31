# Next.js Fundamentals - Complete Guide 🔷

> **React Framework for Production**
> SSR, SSG, ISR, and more - all in one framework

**Interview Probability:** ⭐⭐⭐⭐⭐ (VERY HIGH)

---

## 📚 Table of Contents

1. [What is Next.js?](#what-is-nextjs)
2. [App Router vs Pages Router](#app-router-vs-pages-router)
3. [File-Based Routing](#file-based-routing)
4. [Rendering Methods](#rendering-methods)
5. [Data Fetching](#data-fetching)
6. [Built-in Components](#built-in-components)
7. [API Routes](#api-routes)
8. [Interview Questions](#interview-questions)

---

## What is Next.js?

**Next.js** is a React framework for building production-ready web applications with built-in features like:

✅ **Server-Side Rendering (SSR)**
✅ **Static Site Generation (SSG)**
✅ **Incremental Static Regeneration (ISR)**
✅ **File-based routing**
✅ **API routes**
✅ **Image optimization**
✅ **Font optimization**
✅ **TypeScript support**
✅ **Zero config**

### Next.js vs Create React App

| Create React App | Next.js |
|-----------------|---------|
| Client-Side Rendering only | SSR, SSG, ISR, CSR |
| Manual routing setup | File-based routing |
| No API routes | Built-in API routes |
| Basic image handling | Optimized Image component |
| Manual optimization | Auto optimization |
| No built-in data fetching | Multiple fetching strategies |

### Why Next.js?

1. **SEO-Friendly**: Server-side rendering improves SEO
2. **Performance**: Automatic code splitting, image optimization
3. **Developer Experience**: Hot reload, TypeScript, ESLint
4. **Production-Ready**: Built-in best practices
5. **Flexibility**: Choose rendering method per page
6. **Vercel Deployment**: One-click deploy

---

## App Router vs Pages Router

Next.js has **two routing systems**:

### Pages Router (Legacy)

- `pages/` directory
- File-based routing
- `getServerSideProps`, `getStaticProps`
- Client Components by default

### App Router (New - Next.js 13+)

- `app/` directory
- Server Components by default
- React Server Components
- Streaming and Suspense
- Nested layouts
- Better data fetching

**Recommendation:** Use **App Router** for new projects.

### Directory Structure Comparison

**Pages Router:**
```
pages/
├── index.js          → /
├── about.js          → /about
├── blog/
│   ├── index.js      → /blog
│   └── [slug].js     → /blog/:slug
└── api/
    └── hello.js      → /api/hello
```

**App Router:**
```
app/
├── page.js           → /
├── layout.js         → Root layout
├── about/
│   └── page.js       → /about
├── blog/
│   ├── page.js       → /blog
│   └── [slug]/
│       └── page.js   → /blog/:slug
└── api/
    └── hello/
        └── route.js  → /api/hello
```

---

## File-Based Routing

### App Router Files

| File | Purpose |
|------|---------|
| `page.js` | Page UI (makes route publicly accessible) |
| `layout.js` | Shared UI for segment and children |
| `loading.js` | Loading UI (Suspense boundary) |
| `error.js` | Error UI (Error boundary) |
| `not-found.js` | 404 UI |
| `route.js` | API endpoint |

### Basic Routing

**1. Static Routes:**
```
app/
├── page.js           → /
├── about/
│   └── page.js       → /about
└── contact/
    └── page.js       → /contact
```

**2. Dynamic Routes:**
```
app/
└── blog/
    └── [slug]/
        └── page.js   → /blog/:slug
```

```jsx
// app/blog/[slug]/page.js
export default function BlogPost({ params }) {
  return <h1>Post: {params.slug}</h1>;
}
```

**3. Catch-All Routes:**
```
app/
└── shop/
    └── [...slug]/
        └── page.js   → /shop/* (any depth)
```

```jsx
// app/shop/[...slug]/page.js
export default function Shop({ params }) {
  // /shop/a/b/c → params.slug = ['a', 'b', 'c']
  return <h1>Category: {params.slug.join('/')}</h1>;
}
```

**4. Optional Catch-All:**
```
app/
└── docs/
    └── [[...slug]]/
        └── page.js   → /docs AND /docs/*
```

### Layouts

**Root Layout (Required):**
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

**Nested Layout:**
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

### Loading States

```jsx
// app/dashboard/loading.js
export default function Loading() {
  return <div>Loading dashboard...</div>;
}
```

Automatically wraps page in Suspense boundary.

### Error Handling

```jsx
// app/error.js
'use client';

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

---

## Rendering Methods

### 1. Server Components (Default)

Components rendered on the server.

```jsx
// app/page.js (Server Component by default)
async function getData() {
  const res = await fetch('https://api.example.com/data');
  return res.json();
}

export default async function Page() {
  const data = await getData();

  return <div>{data.title}</div>;
}
```

**Benefits:**
- Direct database access
- Keep sensitive data on server
- Reduced bundle size
- Better SEO

**Limitations:**
- No state (useState, useReducer)
- No effects (useEffect)
- No browser APIs
- No event handlers

### 2. Client Components

Components rendered on the client (browser).

```jsx
// app/counter.js
'use client';  // Required!

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

**Use Client Components when you need:**
- State and effects
- Event listeners
- Browser APIs
- Custom hooks

### 3. Static Site Generation (SSG)

Pre-render at build time.

```jsx
// app/blog/[slug]/page.js
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts').then(res => res.json());

  return posts.map(post => ({
    slug: post.slug
  }));
}

export default async function BlogPost({ params }) {
  const post = await fetch(`https://api.example.com/posts/${params.slug}`).then(res => res.json());

  return <article>{post.content}</article>;
}
```

**When to use:**
- Content doesn't change often
- Same content for all users
- Marketing pages, blogs, docs

### 4. Server-Side Rendering (SSR)

Render on each request.

```jsx
// app/profile/page.js
// Force dynamic rendering
export const dynamic = 'force-dynamic';

async function getUserData() {
  const res = await fetch('https://api.example.com/user', {
    cache: 'no-store'  // Disable caching
  });
  return res.json();
}

export default async function Profile() {
  const user = await getUserData();

  return <div>Welcome, {user.name}</div>;
}
```

**When to use:**
- Content changes frequently
- Personalized content
- Need request-time data (cookies, headers)

### 5. Incremental Static Regeneration (ISR)

Regenerate static pages after a time interval.

```jsx
// app/posts/[id]/page.js
async function getPost(id) {
  const res = await fetch(`https://api.example.com/posts/${id}`, {
    next: { revalidate: 60 }  // Revalidate every 60 seconds
  });
  return res.json();
}

export default async function Post({ params }) {
  const post = await getPost(params.id);

  return <article>{post.content}</article>;
}
```

**When to use:**
- Content updates periodically
- Want static performance with fresh data
- E-commerce product pages

### Comparison Table

| Method | When | Use Case |
|--------|------|----------|
| **Server Component** | Default | Most pages |
| **Client Component** | Need interactivity | Forms, modals, counters |
| **SSG** | Build time | Blog, docs |
| **SSR** | Request time | User dashboard |
| **ISR** | Periodic updates | Product listings |

---

## Data Fetching

### Server Components

**1. Direct fetch:**
```jsx
async function getData() {
  const res = await fetch('https://api.example.com/data');

  if (!res.ok) {
    throw new Error('Failed to fetch');
  }

  return res.json();
}

export default async function Page() {
  const data = await getData();

  return <div>{data.title}</div>;
}
```

**2. Database access:**
```jsx
import { db } from '@/lib/database';

export default async function Page() {
  const users = await db.user.findMany();

  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
```

**3. Parallel fetching:**
```jsx
export default async function Page() {
  // Fetch in parallel
  const [users, posts] = await Promise.all([
    fetch('https://api.example.com/users').then(res => res.json()),
    fetch('https://api.example.com/posts').then(res => res.json())
  ]);

  return (
    <>
      <Users data={users} />
      <Posts data={posts} />
    </>
  );
}
```

### Client Components

```jsx
'use client';

import { useState, useEffect } from 'react';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.example.com/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
```

### Caching

**Aggressive caching (default):**
```jsx
fetch('https://api.example.com/data', {
  cache: 'force-cache'  // Default
});
```

**No caching:**
```jsx
fetch('https://api.example.com/data', {
  cache: 'no-store'  // Always fresh
});
```

**Revalidation:**
```jsx
fetch('https://api.example.com/data', {
  next: { revalidate: 60 }  // Revalidate every 60s
});
```

---

## Built-in Components

### Image Component

Automatic image optimization.

```jsx
import Image from 'next/image';

export default function Page() {
  return (
    <Image
      src="/profile.jpg"
      alt="Profile"
      width={500}
      height={500}
      priority  // Preload
    />
  );
}
```

**Features:**
- Automatic WebP/AVIF conversion
- Lazy loading by default
- Responsive images
- Blur placeholder

**External images:**
```jsx
// next.config.js
module.exports = {
  images: {
    domains: ['example.com']
  }
};
```

### Link Component

Client-side navigation with prefetching.

```jsx
import Link from 'next/link';

export default function Nav() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/blog/post-1">Post</Link>
    </nav>
  );
}
```

**Dynamic links:**
```jsx
<Link href={`/blog/${post.slug}`}>
  {post.title}
</Link>
```

**With active state:**
```jsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();

  return (
    <Link
      href="/about"
      className={pathname === '/about' ? 'active' : ''}
    >
      About
    </Link>
  );
}
```

### Script Component

Optimized script loading.

```jsx
import Script from 'next/script';

export default function Page() {
  return (
    <>
      <Script
        src="https://example.com/script.js"
        strategy="lazyOnload"  // afterInteractive, beforeInteractive
        onLoad={() => console.log('Script loaded')}
      />
    </>
  );
}
```

### Font Optimization

```jsx
// app/layout.js
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

---

## API Routes

Create backend APIs in Next.js.

### Basic API Route

```js
// app/api/hello/route.js
export async function GET(request) {
  return Response.json({ message: 'Hello, World!' });
}

export async function POST(request) {
  const body = await request.json();

  return Response.json({ received: body });
}
```

**Access:** `http://localhost:3000/api/hello`

### Dynamic API Routes

```js
// app/api/users/[id]/route.js
export async function GET(request, { params }) {
  const { id } = params;

  // Fetch user from database
  const user = await db.user.findUnique({ where: { id } });

  if (!user) {
    return Response.json({ error: 'User not found' }, { status: 404 });
  }

  return Response.json(user);
}

export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();

  const user = await db.user.update({
    where: { id },
    data: body
  });

  return Response.json(user);
}

export async function DELETE(request, { params }) {
  const { id } = params;

  await db.user.delete({ where: { id } });

  return Response.json({ success: true });
}
```

### Search Params

```js
// app/api/search/route.js
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  // Search in database
  const results = await db.post.findMany({
    where: {
      title: { contains: query }
    }
  });

  return Response.json(results);
}
```

**Access:** `http://localhost:3000/api/search?q=react`

### Headers and Cookies

```js
// app/api/auth/route.js
import { cookies } from 'next/headers';

export async function POST(request) {
  const body = await request.json();

  // Authenticate user
  const token = await authenticate(body);

  // Set cookie
  cookies().set('token', token, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 7  // 1 week
  });

  return Response.json({ success: true });
}
```

---

## Interview Questions

### Q1: What is Next.js and why use it?

**Answer:**
Next.js is a React framework that provides:
- Server-Side Rendering (SSR)
- Static Site Generation (SSG)
- Incremental Static Regeneration (ISR)
- File-based routing
- API routes
- Image/Font optimization
- Zero config

**Benefits:**
- Better SEO (SSR)
- Faster page loads (SSG)
- Great DX (developer experience)
- Production-ready out of the box

---

### Q2: App Router vs Pages Router?

**Answer:**

| Pages Router | App Router |
|-------------|------------|
| `pages/` directory | `app/` directory |
| Client Components default | Server Components default |
| `getServerSideProps` | `fetch` with options |
| No nested layouts | Nested layouts |
| React 17 | React 18+ features |

**Recommendation:** Use App Router for new projects.

---

### Q3: Server Components vs Client Components?

**Answer:**

**Server Components (default):**
- Rendered on server
- Direct database access
- No bundle size impact
- Cannot use state/effects

```jsx
// Server Component (default)
async function Page() {
  const data = await fetch('...');
  return <div>{data}</div>;
}
```

**Client Components:**
- Rendered on client
- Can use state/effects
- Adds to bundle size
- Need `'use client'` directive

```jsx
'use client';

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

---

### Q4: SSR vs SSG vs ISR?

**Answer:**

**SSR (Server-Side Rendering):**
- Render on each request
- Always fresh data
- Slower (render on demand)
```jsx
export const dynamic = 'force-dynamic';
```

**SSG (Static Site Generation):**
- Render at build time
- Fastest (pre-rendered)
- Stale data until rebuild
```jsx
export async function generateStaticParams() { ... }
```

**ISR (Incremental Static Regeneration):**
- Static + periodic updates
- Fast + relatively fresh
- Best of both worlds
```jsx
fetch('...', { next: { revalidate: 60 } })
```

---

### Q5: How does Next.js routing work?

**Answer:**
Next.js uses file-based routing:

```
app/
├── page.js           → /
├── about/
│   └── page.js       → /about
├── blog/
│   ├── page.js       → /blog
│   └── [slug]/
│       └── page.js   → /blog/:slug
└── [...slug]/
    └── page.js       → /* (catch-all)
```

**Dynamic routes:**
```jsx
// app/blog/[slug]/page.js
function Page({ params }) {
  return <h1>{params.slug}</h1>;
}
```

---

### Q6: What is the purpose of layout.js?

**Answer:**
`layout.js` defines shared UI for a route segment and its children.

```jsx
// app/layout.js (Root layout)
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <nav>Navigation</nav>
        {children}
        <footer>Footer</footer>
      </body>
    </html>
  );
}
```

**Benefits:**
- Shared UI without re-rendering
- Nested layouts
- Persistent state
- Reduced bundle size

---

### Q7: How to optimize images in Next.js?

**Answer:**
Use the `Image` component:

```jsx
import Image from 'next/image';

<Image
  src="/photo.jpg"
  alt="Photo"
  width={500}
  height={300}
  priority  // Preload
/>
```

**Automatic optimizations:**
- WebP/AVIF conversion
- Lazy loading
- Responsive images
- Blur placeholder
- Proper sizing

**External images:**
```js
// next.config.js
module.exports = {
  images: {
    domains: ['example.com']
  }
};
```

---

### Q8: How to create API routes?

**Answer:**

```js
// app/api/users/route.js
export async function GET(request) {
  const users = await db.user.findMany();
  return Response.json(users);
}

export async function POST(request) {
  const body = await request.json();
  const user = await db.user.create({ data: body });
  return Response.json(user);
}
```

**Dynamic routes:**
```js
// app/api/users/[id]/route.js
export async function GET(request, { params }) {
  const user = await db.user.findUnique({
    where: { id: params.id }
  });
  return Response.json(user);
}
```

---

### Q9: How to handle loading and error states?

**Answer:**

**Loading:**
```jsx
// app/dashboard/loading.js
export default function Loading() {
  return <div>Loading...</div>;
}
```

Automatically wraps page in `<Suspense>`.

**Error:**
```jsx
// app/error.js
'use client';

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>{error.message}</h2>
      <button onClick={reset}>Retry</button>
    </div>
  );
}
```

Automatically wraps page in Error Boundary.

---

### Q10: When to use Client Components?

**Answer:**

Use `'use client'` when you need:
- ✅ State (`useState`, `useReducer`)
- ✅ Effects (`useEffect`, `useLayoutEffect`)
- ✅ Event listeners (`onClick`, `onChange`)
- ✅ Browser APIs (`window`, `document`)
- ✅ Custom hooks that use above

**Example:**
```jsx
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
```

**Don't use for:**
- Data fetching (use Server Components)
- Database access
- Sensitive operations

---

## 🎯 Quick Reference

```jsx
// Server Component (default)
async function Page() {
  const data = await fetch('...').then(r => r.json());
  return <div>{data}</div>;
}

// Client Component
'use client';
function Interactive() {
  const [state, setState] = useState();
  return <button onClick={() => setState(1)}>{state}</button>;
}

// Layout
export default function Layout({ children }) {
  return <div><nav />{children}</div>;
}

// Loading
export default function Loading() {
  return <div>Loading...</div>;
}

// Error
'use client';
export default function Error({ error, reset }) {
  return <div>{error.message}</div>;
}

// API Route
export async function GET(request) {
  return Response.json({ data: 'hello' });
}

// Dynamic Route
function Page({ params }) {
  return <div>{params.slug}</div>;
}

// Generate Static Params
export async function generateStaticParams() {
  return [{ slug: 'post-1' }, { slug: 'post-2' }];
}
```

---

**Next:** [Next.js Advanced](../11-nextjs-advanced/README.md)
**Previous:** [React Interview Prep](../09-react-interview-prep/README.md)

---

**Happy Learning! 🚀**

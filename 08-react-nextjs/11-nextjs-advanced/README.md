# Next.js Advanced 🚀

> **Master Advanced Next.js Concepts**
> SEO, Caching, Middleware, Authentication, and more

**Interview Probability:** ⭐⭐⭐⭐

---

## 📚 Table of Contents

1. [Metadata & SEO](#metadata--seo)
2. [Caching](#caching)
3. [Middleware](#middleware)
4. [Authentication](#authentication)
5. [Database Integration](#database-integration)
6. [Deployment](#deployment)
7. [Performance Optimization](#performance-optimization)
8. [Interview Questions](#interview-questions)

---

## Metadata & SEO

### Static Metadata

```jsx
// app/page.js
export const metadata = {
  title: 'Home Page',
  description: 'Welcome to my website',
  keywords: ['Next.js', 'React', 'JavaScript']
};

export default function Page() {
  return <div>Home</div>;
}
```

### Dynamic Metadata

```jsx
// app/blog/[slug]/page.js
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image]
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image]
    }
  };
}

export default async function BlogPost({ params }) {
  const post = await getPost(params.slug);
  return <article>{post.content}</article>;
}
```

### Open Graph & Twitter Cards

```jsx
export const metadata = {
  title: 'My Page',
  description: 'Page description',
  openGraph: {
    title: 'My Page',
    description: 'Page description',
    url: 'https://example.com',
    siteName: 'My Site',
    images: [
      {
        url: 'https://example.com/og.png',
        width: 1200,
        height: 630,
        alt: 'My Page OG Image'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Page',
    description: 'Page description',
    creator: '@username',
    images: ['https://example.com/twitter.png']
  }
};
```

### JSON-LD (Structured Data)

```jsx
export default function Product({ product }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image,
    description: product.description,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div>{product.name}</div>
    </>
  );
}
```

### Sitemap Generation

```jsx
// app/sitemap.js
export default function sitemap() {
  return [
    {
      url: 'https://example.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1
    },
    {
      url: 'https://example.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: 'https://example.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5
    }
  ];
}

// Dynamic sitemap
export default async function sitemap() {
  const posts = await getAllPosts();

  const postUrls = posts.map(post => ({
    url: `https://example.com/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.7
  }));

  return [
    {
      url: 'https://example.com',
      lastModified: new Date(),
      priority: 1
    },
    ...postUrls
  ];
}
```

### Robots.txt

```jsx
// app/robots.js
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/'
    },
    sitemap: 'https://example.com/sitemap.xml'
  };
}
```

---

## Caching

### Four Levels of Caching

**1. Request Memoization**
```jsx
// Same request in component tree = only 1 fetch
async function getData() {
  const res = await fetch('https://api.example.com/data');
  return res.json();
}

function Component1() {
  const data = await getData(); // Fetch happens
}

function Component2() {
  const data = await getData(); // Uses cached result
}
```

**2. Data Cache**
```jsx
// Default: Cache forever
fetch('https://api.example.com/data');

// No cache
fetch('https://api.example.com/data', { cache: 'no-store' });

// Revalidate every 60 seconds
fetch('https://api.example.com/data', {
  next: { revalidate: 60 }
});
```

**3. Full Route Cache**
```jsx
// Static routes are cached at build time
export default async function Page() {
  const data = await fetch('https://api.example.com/data');
  return <div>{data}</div>;
}

// Dynamic routes opt-out of caching
export const dynamic = 'force-dynamic';
```

**4. Router Cache**
```jsx
// Client-side cache of visited routes
// Invalidates on:
// - Page navigation
// - Revalidation
// - Manual refresh
```

### Cache Strategies

```jsx
// 1. Static (SSG) - Cache forever
async function getData() {
  const res = await fetch('https://api.example.com/data');
  return res.json();
}

// 2. Dynamic (SSR) - No cache
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    cache: 'no-store'
  });
  return res.json();
}

// 3. ISR - Revalidate periodically
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    next: { revalidate: 60 } // 60 seconds
  });
  return res.json();
}

// 4. On-demand revalidation
import { revalidatePath, revalidateTag } from 'next/cache';

// Revalidate specific path
revalidatePath('/blog/post-1');

// Revalidate by tag
fetch('https://api.example.com/data', {
  next: { tags: ['posts'] }
});

revalidateTag('posts'); // Revalidate all with 'posts' tag
```

### Cache Configuration

```jsx
// Route segment config
export const dynamic = 'auto'; // 'auto' | 'force-dynamic' | 'error' | 'force-static'
export const revalidate = 60; // false | 0 | number
export const fetchCache = 'auto'; // 'auto' | 'default-cache' | 'only-cache' | 'force-cache' | 'force-no-store' | 'default-no-store' | 'only-no-store'
```

---

## Middleware

### Basic Middleware

```jsx
// middleware.js (root level)
import { NextResponse } from 'next/server';

export function middleware(request) {
  console.log('Middleware running for:', request.nextUrl.pathname);

  return NextResponse.next();
}

// Specify which paths to run middleware on
export const config = {
  matcher: '/about/:path*' // Run on /about and nested routes
};
```

### Authentication Middleware

```jsx
// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token');

  // Protected routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Redirect logged-in users from auth pages
  if (request.nextUrl.pathname.startsWith('/login')) {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login']
};
```

### Redirect & Rewrite

```jsx
export function middleware(request) {
  // Redirect
  if (request.nextUrl.pathname === '/old-path') {
    return NextResponse.redirect(new URL('/new-path', request.url));
  }

  // Rewrite (URL stays same, content changes)
  if (request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.rewrite(new URL('/api/v2' + request.nextUrl.pathname, request.url));
  }

  return NextResponse.next();
}
```

### Add Headers

```jsx
export function middleware(request) {
  const response = NextResponse.next();

  // Add custom header
  response.headers.set('X-Custom-Header', 'value');

  // CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  return response;
}
```

### A/B Testing

```jsx
import { NextResponse } from 'next/server';

export function middleware(request) {
  const bucket = request.cookies.get('bucket')?.value ?? Math.random();

  // Assign users to A or B
  const variant = bucket < 0.5 ? 'a' : 'b';

  const response = NextResponse.rewrite(new URL(`/experiments/${variant}`, request.url));

  // Set cookie if not exists
  if (!request.cookies.get('bucket')) {
    response.cookies.set('bucket', bucket.toString());
  }

  return response;
}
```

---

## Authentication

### NextAuth.js Setup

```bash
npm install next-auth
```

```jsx
// app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Validate credentials
        const user = await validateUser(credentials);

        if (user) {
          return user;
        }

        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    }
  },
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/error'
  }
});

export { handler as GET, handler as POST };
```

### Session Provider

```jsx
// app/providers.js
'use client';

import { SessionProvider } from 'next-auth/react';

export function Providers({ children, session }) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}

// app/layout.js
import { Providers } from './providers';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### Using Session

```jsx
'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session.user.email}
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return <button onClick={() => signIn()}>Sign in</button>;
}
```

### Protected Pages

```jsx
// Server Component
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const session = await getServerSession();

  if (!session) {
    redirect('/login');
  }

  return <div>Welcome, {session.user.name}</div>;
}

// Client Component
'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Dashboard() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login');
    }
  });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return <div>Welcome, {session.user.name}</div>;
}
```

---

## Database Integration

### Prisma Setup

```bash
npm install prisma @prisma/client
npx prisma init
```

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

```jsx
// lib/prisma.js
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global;

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

### Using Prisma in Server Components

```jsx
// app/users/page.js
import { prisma } from '@/lib/prisma';

export default async function Users() {
  const users = await prisma.user.findMany({
    include: {
      posts: true
    }
  });

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name} ({user.posts.length} posts)
        </li>
      ))}
    </ul>
  );
}
```

### Server Actions with Prisma

```jsx
// app/actions.js
'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createPost(formData) {
  const title = formData.get('title');
  const content = formData.get('content');

  await prisma.post.create({
    data: {
      title,
      content,
      authorId: 'user-id'
    }
  });

  revalidatePath('/posts');
}

export async function deletePost(id) {
  await prisma.post.delete({
    where: { id }
  });

  revalidatePath('/posts');
}

// app/create-post/page.js
import { createPost } from '../actions';

export default function CreatePost() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="Title" required />
      <textarea name="content" placeholder="Content" />
      <button type="submit">Create Post</button>
    </form>
  );
}
```

---

## Deployment

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production
vercel --prod
```

### Environment Variables

```bash
# .env.local (not committed)
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"

# .env.production (Vercel dashboard)
DATABASE_URL="production-url"
NEXTAUTH_URL="https://yourdomain.com"
```

```jsx
// Access in code
const dbUrl = process.env.DATABASE_URL;

// Client-side (must prefix with NEXT_PUBLIC_)
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

### Build Optimization

```js
// next.config.js
module.exports = {
  // Compress images
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60
  },

  // Analyze bundle
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false
      };
    }
    return config;
  }
};
```

---

## Performance Optimization

### Image Optimization

```jsx
import Image from 'next/image';

// Local image
import profilePic from './profile.jpg';

<Image
  src={profilePic}
  alt="Profile"
  placeholder="blur" // Automatic blur placeholder
/>

// Remote image
<Image
  src="https://example.com/photo.jpg"
  alt="Photo"
  width={500}
  height={300}
  priority // Preload
/>

// Fill container
<div style={{ position: 'relative', width: '100%', height: '400px' }}>
  <Image
    src="/photo.jpg"
    alt="Photo"
    fill
    style={{ objectFit: 'cover' }}
  />
</div>
```

### Font Optimization

```jsx
// app/layout.js
import { Inter, Roboto_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap'
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

### Bundle Analysis

```bash
npm install @next/bundle-analyzer
```

```js
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer({
  // Next.js config
});

// Run analysis
ANALYZE=true npm run build
```

### Streaming SSR

```jsx
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <h1>My Page</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <SlowComponent />
      </Suspense>

      <FastComponent />
    </div>
  );
}

async function SlowComponent() {
  const data = await slowFetch();
  return <div>{data}</div>;
}
```

---

## Interview Questions

### Q1: Explain Next.js caching layers

**Answer:**
Next.js has 4 caching layers:

1. **Request Memoization**: Same fetch in component tree = 1 request
2. **Data Cache**: Cache fetch responses (default: forever)
3. **Full Route Cache**: Static routes cached at build
4. **Router Cache**: Client-side cache of visited routes

**Control caching:**
```jsx
// No cache
fetch(url, { cache: 'no-store' });

// Revalidate every 60s
fetch(url, { next: { revalidate: 60 } });
```

---

### Q2: What is Middleware in Next.js?

**Answer:**
Middleware runs before request completes. Runs on Edge runtime.

**Use cases:**
- Authentication
- Redirects
- Rewrites
- A/B testing
- Headers

```jsx
export function middleware(request) {
  if (!request.cookies.get('token')) {
    return NextResponse.redirect('/login');
  }
  return NextResponse.next();
}
```

---

### Q3: How to implement authentication?

**Answer:**
Use NextAuth.js:

```jsx
// Setup
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

const handler = NextAuth({
  providers: [GithubProvider({...})]
});

// Use in component
const { data: session } = useSession();

// Protect page
const session = await getServerSession();
if (!session) redirect('/login');
```

---

### Q4: How to optimize images?

**Answer:**
Use Next.js Image component:

```jsx
import Image from 'next/image';

<Image
  src="/photo.jpg"
  width={500}
  height={300}
  alt="Photo"
  priority // Preload
  placeholder="blur" // Blur placeholder
/>
```

**Benefits:**
- Automatic WebP/AVIF
- Lazy loading
- Responsive images
- Blur placeholder

---

## 🎯 Quick Reference

```jsx
// Metadata
export const metadata = { title: 'Page', description: '...' };

// Dynamic metadata
export async function generateMetadata({ params }) {
  return { title: params.slug };
}

// Caching
fetch(url, { cache: 'no-store' }); // No cache
fetch(url, { next: { revalidate: 60 } }); // ISR

// Middleware
export function middleware(request) {
  return NextResponse.next();
}

// Auth (NextAuth)
const { data: session } = useSession();

// Database (Prisma)
const users = await prisma.user.findMany();

// Server Actions
'use server';
export async function createPost(formData) { ... }

// Image
<Image src="/pic.jpg" width={500} height={300} alt="Pic" />
```

---

**Next:** [Next.js Interview Prep](../12-nextjs-interview-prep/README.md)
**Previous:** [Next.js Fundamentals](../10-nextjs-fundamentals/README.md)

---

**Happy Learning! 🚀**

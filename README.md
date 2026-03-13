# Analog.js Starter with Rendering Strategies

A comprehensive Analog.js starter project that demonstrates different rendering strategies: **Server-Side Rendering (SSR)**, **Static Site Generation (SSG)**, and **Incremental Static Regeneration (ISR)**.

## 🚀 Features

- **Multiple Rendering Strategies**: Demonstrates SSR, SSG, and ISR with real-world examples
- **Contentstack Integration**: Headless CMS integration with deploy hooks support
- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **TypeScript Support**: Full TypeScript integration
- **SEO Optimized**: Meta tags, sitemap generation, and performance optimizations
- **Content Routes**: Markdown-based content with frontmatter support
- **File-based Routing**: Intuitive routing based on file structure
- **Syntax Highlighting**: Code blocks highlighted with PrismJS
- **Server API Routes**: Server-side API endpoints for dynamic functionality

## 📁 Project Structure

```
analogjs-ssg-ssr/
├── src/
│   ├── app/
│   │   ├── pages/              # File-based routing
│   │   │   ├── index.page.ts   # Home page (SSG)
│   │   │   ├── about-us.page.ts # About page (SSG)
│   │   │   ├── ssr.page.ts     # SSR demo page
│   │   │   ├── ssg.page.ts     # SSG demo page
│   │   │   ├── isr.page.ts     # ISR demo page
│   │   │   ├── csr.page.ts     # Client-side rendering demo
│   │   │   ├── blog.page.ts    # Blog listing page
│   │   │   └── blog/
│   │   │       └── posts.[slug].page.ts # Dynamic blog posts
│   │   ├── app.config.ts       # Angular application configuration
│   │   └── app.ts              # Root application component
│   ├── content/                # Markdown content files
│   │   ├── about.md            # About page content
│   │   └── *.md                # Other markdown content
│   ├── server/
│   │   └── routes/             # Server API routes
│   │       ├── api/
│   │       │   ├── test.ts     # Test API endpoint
│   │       │   └── v1/
│   │       │       └── hello.ts # Hello API endpoint
│   │       └── sitemap.xml.ts  # Dynamic sitemap generation
│   ├── main.ts                 # Client entry point
│   └── main.server.ts          # Server entry point
├── public/                     # Static assets
├── vite.config.ts              # Vite and Analog configuration
├── angular.json                 # Angular CLI configuration
├── package.json                 # Dependencies and scripts
└── .env                         # Environment variables
```

## 🎯 Rendering Strategies Demonstrated

### 1. Server-Side Rendering (SSR)
- **Pages**: `/ssr`, `/ssr-api`, `/geo`, `/deploy-hook`
- **Use Case**: Dynamic content, real-time data, user-specific content
- **Benefits**: Fresh content on each request, excellent SEO, server processing
- **Configuration**: Enabled by default in `vite.config.ts` with `ssr: true`
- **Example**: Pages that need to display current server time or user-specific data

### 2. Static Site Generation (SSG)
- **Pages**: `/` (homepage), `/about-us`, `/ssg`
- **Use Case**: Static content, marketing pages, content that doesn't change frequently
- **Benefits**: Instant loading, excellent SEO, no server processing, CDN-friendly
- **Configuration**: Defined in `vite.config.ts` under `prerender.routes`
- **Example**: Homepage, about page, and other static marketing pages

### 3. Incremental Static Regeneration (ISR)
- **Pages**: `/isr`, `/cache-purge`, `/cache-revalidate`
- **Use Case**: Content that changes occasionally but needs fast loading
- **Benefits**: Fast loading with background regeneration, balance between static and dynamic
- **Configuration**: Configured with cache headers in `vite.config.ts` route rules
- **Example**: Blog posts or content that updates periodically

### 4. Client-Side Rendering (CSR)
- **Pages**: `/csr`, `/csr-demo`
- **Use Case**: Interactive components, dashboards, authenticated content
- **Benefits**: Reduced server load, rich interactivity
- **Configuration**: Set `ssr: false` in route rules
- **Example**: Interactive dashboards or admin panels

## 🛠️ Technologies Used

- **Analog.js**: Fullstack Angular meta-framework
- **Angular 20**: Progressive JavaScript framework
- **TypeScript**: Type-safe JavaScript
- **Vite**: Next-generation frontend build tool
- **Tailwind CSS**: Utility-first CSS framework
- **PrismJS**: Syntax highlighting for code blocks
- **Marked**: Markdown parser
- **Contentstack**: Headless CMS (via deploy hooks)
- **Vitest**: Unit testing framework

## 🚀 Getting Started

### Prerequisites

- Node.js 20.19.1 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd analogjs-ssg-ssr
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_DEPLOY_HOOK_URL=https://dev11-app.csnonprod.com/launch-api/manage/deploy/6964ba8d0a227c0fd07332f3
   ```

4. **Run the development server**
   ```bash
   npm start
   # or
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📝 Available Scripts

- `npm start` / `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (generates both client and server builds)
- `npm run preview` - Preview production build locally
- `npm run watch` - Build and watch for changes
- `npm run test` - Run unit tests with Vitest

## 🎨 Customization

### Adding New Pages

1. Create a new `.page.ts` file in the `src/app/pages/` directory
2. The file path determines the route (e.g., `pages/services.page.ts` → `/services`)
3. Export a default Angular component with `standalone: true`
4. Choose the appropriate rendering strategy in `vite.config.ts`

**Example:**
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  standalone: true,
  template: `
    <div class="container">
      <h1>Services Page</h1>
      <p>Your content here</p>
    </div>
  `,
  styles: [`
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }
  `]
})
export default class ServicesPage {}
```

### Adding Content Routes (Markdown)

1. Create a `.md` file in the `src/content/` directory
2. Add frontmatter for metadata:
   ```markdown
   ---
   title: My Post
   description: Post description
   ---
   
   # My Post Content
   ```

3. The file will be automatically available as a route

### Styling

- The project uses Tailwind CSS for styling
- Custom styles can be added in component `styles` arrays
- Global styles can be added in `src/app/app.ts` or via Tailwind configuration

### Server API Routes

Create API endpoints in `src/server/routes/`:

```typescript
import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
  return {
    message: 'Hello from Analog.js API',
    timestamp: new Date().toISOString()
  };
});
```

## 🔧 Configuration

### Vite Configuration (`vite.config.ts`)

The main configuration file controls rendering strategies:

```typescript
analog({
  ssr: true,  // Enable Server-Side Rendering
  prerender: {
    routes: async () => [
      { route: '/', sitemap: { changefreq: 'daily', priority: '1.0' } },
      { route: '/about-us', sitemap: { changefreq: 'monthly', priority: '0.8' } }
    ],
    sitemap: {
      host: 'https://your-domain.com'
    }
  },
  nitro: {
    routeRules: {
      '/ssr': { ssr: true },
      '/csr': { ssr: false },
      '/isr': {
        ssr: true,
        headers: {
          'Cache-Control': 'public, s-maxage=40, stale-while-revalidate=60'
        }
      }
    }
  }
})
```

### Rendering Strategy Selection

- **SSR**: Set `ssr: true` in route rules (default for non-prerendered routes)
- **SSG**: Add route to `prerender.routes` array
- **ISR**: Use SSR with cache headers (`Cache-Control` with `s-maxage`)
- **CSR**: Set `ssr: false` in route rules

### Environment Variables

#### Deploy Hook URL

For Contentstack Launch integration:

**For Local Development:**
Create a `.env` file:
```env

**For Contentstack Launch:**
1. Go to Launch > Environments > Settings > Environment Variables
2. Add a new environment variable:
   - Key: `VITE_DEPLOY_HOOK_URL`
   - Value: Your deploy hook URL

The Deploy Hook URL can be found in Launch > Environments > Settings > Deploy Hooks.

For more information, see the [Contentstack Deploy Hooks documentation](https://www.contentstack.com/docs/developers/launch/deploy-hooks).

## 📊 Performance

- **Build Output**: Optimized production builds with code splitting
- **Static Assets**: Served from CDN with optimal cache headers
- **Server Rendering**: Fast SSR with efficient Angular rendering
- **Content Routes**: Pre-rendered markdown content for instant loading

## 🚀 Deployment

### Contentstack Launch (Recommended)

1. Connect your repository to Contentstack Launch
2. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `./dist/analog/public`
   - **Server Command**: `npm run preview`
3. Set environment variables in Launch dashboard
4. Deploy!

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

### Build Output Structure

After building, you'll find:
- **Client build**: `dist/analog/public/` - Static assets and prerendered pages
- **Server build**: `dist/analog/server/` - Server-side code for SSR

## 🧪 Testing

Run tests with Vitest:

```bash
npm run test
```

Tests are located in files ending with `.spec.ts` and use the `jsdom` environment for DOM testing.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Analog.js](https://analogjs.org/) - The fullstack Angular meta-framework
- [Angular](https://angular.io/) - The web application framework
- [Vite](https://vitejs.dev/) - Next-generation frontend tooling
- [Contentstack](https://www.contentstack.com/) - Headless CMS
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

**Built with ❤️ using Analog.js and Angular**

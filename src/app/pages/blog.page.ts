import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectContentFiles } from '@analogjs/content';

export interface PostAttributes {
  title: string;
  slug: string;
  description: string;
  coverImage: string;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="blog-container">
      <h1>📝 Blog Posts</h1>
      <p class="description">Explore our latest content</p>

      <div class="posts-grid">
        @for (post of posts; track post.attributes.slug) {
          <article class="post-card">
            <div class="post-image">
              <img 
                [src]="post.attributes.coverImage" 
                [alt]="post.attributes.title"
                loading="lazy"
              />
            </div>
            <div class="post-content">
              <h2>
                <a [routerLink]="['/blog', 'posts', post.attributes.slug]">
                  {{ post.attributes.title }}
                </a>
              </h2>
              <p class="post-description">{{ post.attributes.description }}</p>
              <a 
                [routerLink]="['/blog', 'posts', post.attributes.slug]"
                class="read-more"
              >
                Read more →
              </a>
            </div>
          </article>
        } @empty {
          <p class="no-posts">No posts yet.</p>
        }
      </div>

      <p class="back-link">
        <a href="/">← Back to Home</a>
      </p>
    </div>
  `,
  styles: [
    `
      .blog-container {
        padding: 3rem 2rem;
        font-family: system-ui, sans-serif;
        max-width: 1200px;
        margin: auto;
      }

      h1 {
        font-size: 2.5rem;
        margin-bottom: 0.5rem;
        text-align: center;
      }

      .description {
        text-align: center;
        color: #555;
        margin-bottom: 3rem;
        font-size: 1.1rem;
      }

      .posts-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2rem;
        margin-bottom: 3rem;
      }

      .post-card {
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s, box-shadow 0.2s;
      }

      .post-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
      }

      .post-image {
        width: 100%;
        height: 200px;
        overflow: hidden;
        background: #f3f4f6;
      }

      .post-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .post-content {
        padding: 1.5rem;
      }

      .post-content h2 {
        margin: 0 0 0.75rem 0;
        font-size: 1.5rem;
      }

      .post-content h2 a {
        color: #2563eb;
        text-decoration: none;
      }

      .post-content h2 a:hover {
        text-decoration: underline;
      }

      .post-description {
        color: #666;
        margin-bottom: 1rem;
        line-height: 1.6;
      }

      .read-more {
        color: #2563eb;
        text-decoration: none;
        font-weight: 600;
      }

      .read-more:hover {
        text-decoration: underline;
      }

      .no-posts {
        text-align: center;
        color: #666;
        padding: 3rem;
        font-size: 1.1rem;
      }

      .back-link {
        text-align: center;
        margin-top: 3rem;
      }

      .back-link a {
        color: #2563eb;
        text-decoration: none;
        font-weight: 600;
      }

      .back-link a:hover {
        text-decoration: underline;
      }
    `,
  ],
})
export default class BlogComponent {
  readonly posts = injectContentFiles<PostAttributes>((contentFile) => {
    const filename = contentFile.filename;
    
    // Debug: log first few files to understand the format
    if (Math.random() < 0.1) { // Log occasionally to avoid spam
      console.log('Content file filename:', filename);
    }
    
    // Filter: include files from src/content/, exclude files from src/app/pages
    const isInContentDir = 
      filename.includes('src/content/') ||
      (filename.includes('content/') && !filename.includes('app/pages'));
    
    const isMarkdown = filename.endsWith('.md');
    
    return isInContentDir && isMarkdown;
  });

  constructor() {
    // Debug: log to help troubleshoot
    console.log('BlogComponent initialized - Posts found:', this.posts.length);
    
    if (this.posts.length > 0) {
      this.posts.forEach((post, index) => {
        console.log(`Post ${index + 1}:`, {
          filename: post.filename,
          slug: post.attributes?.slug,
          title: post.attributes?.title,
        });
      });
    } else {
      console.warn('⚠️ No posts found!');
      console.warn('Check browser console for content file filenames to debug filter.');
    }
  }
}


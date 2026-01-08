import { injectContent, MarkdownComponent } from '@analogjs/content';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';

export interface PostAttributes {
  title: string;
  slug: string;
  description: string;
  coverImage: string;
}

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [MarkdownComponent, AsyncPipe, RouterLink],
  template: `
    <div class="post-container">
      @if (post$ | async; as post) {
        <article class="post">
          <div class="post-header">
            <a routerLink="/blog" class="back-link">← Back to Blog</a>
            <h1>{{ post.attributes.title }}</h1>
            @if (post.attributes.coverImage) {
              <div class="cover-image">
                <img 
                  [src]="post.attributes.coverImage" 
                  [alt]="post.attributes.title"
                  loading="eager"
                />
              </div>
            }
          </div>

          <div class="post-content">
            <analog-markdown [content]="post.content"></analog-markdown>
          </div>
        </article>
      } @else {
        <div class="loading">
          <p>Loading post...</p>
          @if (error) {
            <p class="error-message">{{ error }}</p>
          }
        </div>
      }

      <p class="home-link">
        <a href="/">← Back to Home</a>
      </p>
    </div>
  `,
  styles: [
    `
      .post-container {
        padding: 2rem;
        font-family: system-ui, sans-serif;
        max-width: 800px;
        margin: auto;
      }

      .post-header {
        margin-bottom: 2rem;
      }

      .back-link {
        display: inline-block;
        margin-bottom: 1rem;
        color: #2563eb;
        text-decoration: none;
        font-weight: 600;
      }

      .back-link:hover {
        text-decoration: underline;
      }

      h1 {
        font-size: 2.5rem;
        margin-bottom: 1.5rem;
        color: #1f2937;
      }

      .cover-image {
        width: 100%;
        max-height: 400px;
        overflow: hidden;
        border-radius: 12px;
        margin-bottom: 2rem;
        background: #f3f4f6;
      }

      .cover-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .post-content {
        line-height: 1.8;
        color: #374151;
      }

      .post-content :global(h2) {
        font-size: 1.75rem;
        margin-top: 2rem;
        margin-bottom: 1rem;
        color: #1f2937;
      }

      .post-content :global(h3) {
        font-size: 1.5rem;
        margin-top: 1.5rem;
        margin-bottom: 0.75rem;
        color: #1f2937;
      }

      .post-content :global(p) {
        margin-bottom: 1rem;
      }

      .post-content :global(code) {
        background: #f3f4f6;
        padding: 0.2rem 0.4rem;
        border-radius: 4px;
        font-size: 0.9em;
        font-family: 'Courier New', monospace;
      }

      .post-content :global(pre) {
        background: #1f2937;
        color: #f9fafb;
        padding: 1rem;
        border-radius: 8px;
        overflow-x: auto;
        margin: 1.5rem 0;
      }

      .post-content :global(pre code) {
        background: transparent;
        padding: 0;
        color: inherit;
      }

      .post-content :global(ul),
      .post-content :global(ol) {
        margin: 1rem 0;
        padding-left: 2rem;
      }

      .post-content :global(li) {
        margin-bottom: 0.5rem;
      }

      .post-content :global(a) {
        color: #2563eb;
        text-decoration: none;
      }

      .post-content :global(a:hover) {
        text-decoration: underline;
      }

      .post-content :global(blockquote) {
        border-left: 4px solid #2563eb;
        padding-left: 1rem;
        margin: 1.5rem 0;
        color: #6b7280;
        font-style: italic;
      }

      .loading {
        text-align: center;
        padding: 3rem;
        color: #666;
      }

      .error-message {
        color: #dc2626;
        margin-top: 1rem;
        padding: 1rem;
        background: #fee2e2;
        border-radius: 8px;
      }

      .home-link {
        text-align: center;
        margin-top: 3rem;
      }

      .home-link a {
        color: #2563eb;
        text-decoration: none;
        font-weight: 600;
      }

      .home-link a:hover {
        text-decoration: underline;
      }
    `,
  ],
})
export default class BlogPostComponent {
  readonly route = inject(ActivatedRoute);
  error: string | null = null;
  
  // injectContent() uses 'slug' route parameter by default
  readonly post$ = injectContent<PostAttributes>().pipe(
    catchError((err) => {
      console.error('Error loading content:', err);
      this.error = `Failed to load post: ${err?.message || 'Unknown error'}`;
      return of(null);
    })
  );

  constructor() {
    // Debug: log the slug parameter
    this.route.params.subscribe((params) => {
      console.log('Route params:', params);
      console.log('Slug:', params['slug']);
    });
  }
}


import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

type ProductWithRandom = Product & {
  randomNum: number;
};

@Component({
  selector: 'app-ssr-api',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <h1>🛒 Random Product Demo</h1>
      <p class="description">
        This page fetches a <strong>random product</strong> from an API on each server render.
      </p>

      <div *ngIf="isLoading" class="loading-message">
        <p>Loading product...</p>
      </div>

      <div *ngIf="error" class="error-message">
        <p>⚠️ {{ error }}</p>
        <button (click)="fetchProduct()" class="retry-button">Retry</button>
      </div>

      <div *ngIf="product && !isLoading && !error" class="product-card">
        <div class="image-wrapper">
          <img 
            [src]="product.image" 
            [alt]="product.title" 
            class="product-image"
            (error)="onImageError($event)"
            (load)="onImageLoad($event)"
            loading="eager"
          />
        </div>
        <h2>{{ product.title }}</h2>
        <p><strong>💲 Price:</strong> {{ '$' + product.price }}</p>
        <p><strong>🏷️ Category:</strong> {{ product.category }}</p>
        <p><strong>🎲 Random Number:</strong> {{ product.randomNum }}</p>
      </div>
    
      <p class="back-link">
        <a href="/">← Back to Home</a>
      </p>
    </div>
  `,
  styles: [
    `
      .page-container {
        padding: 3rem 2rem;
        font-family: system-ui, sans-serif;
        max-width: 800px;
        margin: auto;
        text-align: center;
      }

      h1 {
        font-size: 2.5rem;
        margin-bottom: 0.5rem;
      }

      .description {
        color: #555;
        margin-bottom: 2rem;
        font-size: 1.1rem;
      }

      .product-card {
        background: linear-gradient(135deg, #fbbf24, #f87171, #ef4444);
        padding: 2rem;
        border-radius: 16px;
        color: white;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        max-width: 500px;
        margin: auto;
      }

      .image-wrapper {
        background: white;
        border-radius: 12px;
        padding: 1rem;
        margin-bottom: 1.5rem;
      }

      .product-image {
        width: 100%;
        border-radius: 8px;
        object-fit: contain;
        max-height: 300px;
        display: block;
        margin: 0 auto;
      }

      .product-card h2 {
        margin-bottom: 0.75rem;
        color: white;
      }

      .product-card p {
        margin-bottom: 0.5rem;
        color: white;
      }

      .back-link {
        margin-top: 2rem;
      }

      .back-link a {
        color: #2563eb;
        text-decoration: none;
        font-weight: 600;
      }

      .back-link a:hover {
        text-decoration: underline;
      }

      .loading-message,
      .error-message {
        padding: 2rem;
        margin: 2rem auto;
        max-width: 500px;
        border-radius: 8px;
        background: #f3f4f6;
      }

      .error-message {
        background: #fee2e2;
        color: #991b1b;
      }

      .retry-button {
        margin-top: 1rem;
        padding: 0.5rem 1.5rem;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
      }

      .retry-button:hover {
        background: #1d4ed8;
      }
    `,
  ],
})
export default class SSRApiPage implements OnInit {
  product: ProductWithRandom | null = null;
  error: string | null = null;
  isLoading = true;
  private http = inject(HttpClient);

  async ngOnInit() {
    await this.fetchProduct();
  }

  async fetchProduct() {
    this.isLoading = true;
    this.error = null;
    
    try {
      const data = await firstValueFrom(
        this.http.get<Product[]>('https://fakestoreapi.com/products')
      );

      if (data && data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomProduct = data[randomIndex];
        const randomNum = Math.floor(Math.random() * 1000) + 1;

        this.product = {
          ...randomProduct,
          randomNum,
        };
      }
    } catch (error: any) {
      console.error('Error fetching product:', error);
      // Don't throw - handle gracefully
      this.error = error?.status === 403 
        ? 'API request was blocked. Please try again in a moment.'
        : 'Failed to fetch product. Please try again later.';
    } finally {
      this.isLoading = false;
    }
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    console.warn('Image failed to load:', img.src);
    // Fallback to a placeholder image if the original fails to load
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub3QgYXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg==';
  }

  onImageLoad(event: Event) {
    const img = event.target as HTMLImageElement;
    console.log('Image loaded successfully:', img.src);
  }
}


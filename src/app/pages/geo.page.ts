import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

type GeolocationData = {
  location: string;
  geolocation: {
    country: string;
    region: string;
    city: string;
  };
  timestamp: string;
  headers: {
    'visitor-ip-country': string | null;
    'visitor-ip-region': string | null;
    'visitor-ip-city': string | null;
  };
};

@Component({
  selector: 'app-geo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <h1>🌍 Geolocation Headers Demo</h1>
      <p class="description">
        This page demonstrates <strong>Contentstack Launch geolocation headers</strong> 
        accessed via a Cloud Function. The location is determined from your IP address.
      </p>

      <div *ngIf="isLoading" class="loading-message">
        <p>📍 Detecting your location...</p>
      </div>

      <div *ngIf="error" class="error-message">
        <p>⚠️ {{ error }}</p>
        <button (click)="fetchGeolocation()" class="retry-button">Retry</button>
      </div>

      <div *ngIf="geoData && !isLoading && !error" class="geo-card">
        <div class="location-header">
          <h2>📍 Your Location</h2>
          <p class="location-string">{{ geoData.location }}</p>
        </div>

        <div class="geo-details">
          <div class="detail-item">
            <span class="label">🌎 Country:</span>
            <span class="value">{{ geoData.geolocation.country }}</span>
          </div>
          <div class="detail-item">
            <span class="label">🗺️ Region:</span>
            <span class="value">{{ geoData.geolocation.region }}</span>
          </div>
          <div class="detail-item">
            <span class="label">🏙️ City:</span>
            <span class="value">{{ geoData.geolocation.city }}</span>
          </div>
          <div class="detail-item">
            <span class="label">🕐 Timestamp:</span>
            <span class="value">{{ geoData.timestamp | date:'medium' }}</span>
          </div>
        </div>

        <div class="headers-section">
          <h3>Raw Headers</h3>
          <div class="headers-list">
            <div class="header-item">
              <code>visitor-ip-country</code>: 
              <span>{{ geoData.headers['visitor-ip-country'] || 'Not available' }}</span>
            </div>
            <div class="header-item">
              <code>visitor-ip-region</code>: 
              <span>{{ geoData.headers['visitor-ip-region'] || 'Not available' }}</span>
            </div>
            <div class="header-item">
              <code>visitor-ip-city</code>: 
              <span>{{ geoData.headers['visitor-ip-city'] || 'Not available' }}</span>
            </div>
          </div>
        </div>

        <div class="info-note">
          <p>
            <strong>Note:</strong> These headers are automatically injected by Contentstack Launch's 
            Edge infrastructure. If values appear empty, you may be using a VPN, proxy, or privacy-focused browser.
          </p>
        </div>
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
        max-width: 900px;
        margin: auto;
      }

      h1 {
        font-size: 2.5rem;
        margin-bottom: 0.5rem;
        color: #1e40af;
        text-align: center;
      }

      .description {
        color: #555;
        margin-bottom: 2rem;
        font-size: 1.1rem;
        text-align: center;
        line-height: 1.6;
      }

      .geo-card {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 2.5rem;
        border-radius: 16px;
        color: white;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        margin: 2rem 0;
      }

      .location-header {
        text-align: center;
        margin-bottom: 2rem;
        padding-bottom: 1.5rem;
        border-bottom: 2px solid rgba(255, 255, 255, 0.3);
      }

      .location-header h2 {
        margin-bottom: 0.5rem;
        color: white;
        font-size: 1.8rem;
      }

      .location-string {
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0;
        color: #fef3c7;
      }

      .geo-details {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
      }

      .detail-item {
        background: rgba(255, 255, 255, 0.15);
        padding: 1rem;
        border-radius: 8px;
        backdrop-filter: blur(10px);
      }

      .label {
        display: block;
        font-weight: 600;
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
        opacity: 0.9;
      }

      .value {
        display: block;
        font-size: 1.2rem;
        font-weight: 700;
      }

      .headers-section {
        background: rgba(0, 0, 0, 0.2);
        padding: 1.5rem;
        border-radius: 8px;
        margin-top: 2rem;
      }

      .headers-section h3 {
        margin-top: 0;
        margin-bottom: 1rem;
        color: white;
        font-size: 1.2rem;
      }

      .headers-list {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }

      .header-item {
        font-family: 'Monaco', 'Courier New', monospace;
        font-size: 0.9rem;
        padding: 0.5rem;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
      }

      .header-item code {
        color: #fef3c7;
        font-weight: 600;
      }

      .info-note {
        margin-top: 2rem;
        padding: 1rem;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 8px;
        border-left: 4px solid #fef3c7;
      }

      .info-note p {
        margin: 0;
        font-size: 0.9rem;
        line-height: 1.5;
      }

      .back-link {
        margin-top: 2rem;
        text-align: center;
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
        text-align: center;
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
export default class GeoPage implements OnInit {
  geoData: GeolocationData | null = null;
  error: string | null = null;
  isLoading = true;
  private http = inject(HttpClient);

  async ngOnInit() {
    await this.fetchGeolocation();
  }

  async fetchGeolocation() {
    this.isLoading = true;
    this.error = null;
    
    try {
      const data = await firstValueFrom(
        this.http.get<GeolocationData>('/geo')
      );

      this.geoData = data;
    } catch (error: any) {
      console.error('Error fetching geolocation:', error);
      this.error = error?.status === 404 
        ? 'Geolocation endpoint not found. Make sure the cloud function is deployed.'
        : 'Failed to fetch geolocation data. Please try again later.';
    } finally {
      this.isLoading = false;
    }
  }
}


# Deployment Guide

Complete guide for deploying the Electromagnetic Spectrum Explorer to production environments.

## Overview

The Electromagnetic Spectrum Explorer is a static React application built with Vite. It can be deployed to any static hosting service or web server.

## Build Process

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager
- Git access to the repository

### Creating a Production Build

```bash
# 1. Clone and setup (if not already done)
git clone https://github.com/cameronrye/electromagnetic-spectrum-explorer.git
cd electromagnetic-spectrum-explorer
npm install

# 2. Create production build
npm run build

# 3. Test the build locally (optional)
npm run preview
```

The build process creates a `dist/` directory containing all static files ready for deployment.

### Build Output

```
dist/
├── index.html              # Main HTML file
├── assets/
│   ├── index-[hash].js     # Bundled JavaScript
│   ├── index-[hash].css    # Bundled CSS
│   └── [other-assets]      # Images, fonts, etc.
└── vite.svg               # Favicon
```

## Deployment Options

### Option 1: GitHub Pages (Recommended)

**Automatic Deployment with GitHub Actions:**

This project is configured for automatic deployment to GitHub Pages using GitHub Actions. The workflow is already set up and will:

1. **Trigger automatically** on pushes to the `main` branch
2. **Build the application** using `npm run build`
3. **Deploy to GitHub Pages** at `https://cameronrye.github.io/electromagnetic-spectrum-explorer/`

**Setup GitHub Pages:**

1. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Set source to "GitHub Actions"

2. **Verify Deployment**:
   - Push changes to the `main` branch
   - Check the "Actions" tab for deployment status
   - Visit your live site once deployment completes

**Manual GitHub Pages Deployment:**

```bash
# Build the application
npm run build

# Deploy using gh-pages (install if needed)
npm install -g gh-pages
gh-pages -d dist
```

**Live Site**: [https://cameronrye.github.io/electromagnetic-spectrum-explorer/](https://cameronrye.github.io/electromagnetic-spectrum-explorer/)

### Option 2: Vercel

**Automatic Deployment from GitHub:**

1. **Connect Repository**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository

2. **Configure Build Settings**:
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

3. **Deploy**:
   - Click "Deploy"
   - Vercel automatically builds and deploys
   - Get your live URL (e.g., `your-app.vercel.app`)

**Manual Deployment:**

```bash
# Install Vercel CLI
npm install -g vercel

# Build and deploy
npm run build
vercel --prod
```

### Option 2: Netlify

**Drag and Drop Deployment:**

1. Build the project: `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag the `dist/` folder to the deploy area
4. Get your live URL

**Git-based Deployment:**

1. Connect your GitHub repository
2. Set build settings:
   ```
   Build command: npm run build
   Publish directory: dist
   ```
3. Deploy automatically on git push

### Option 3: GitHub Pages

**Using GitHub Actions:**

1. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

2. Enable GitHub Pages in repository settings
3. Set source to "GitHub Actions"

### Option 4: Traditional Web Server

**Apache Configuration:**

```apache
<VirtualHost *:80>
    DocumentRoot /var/www/html/spectrum-explorer
    
    # Enable compression
    LoadModule deflate_module modules/mod_deflate.so
    <Location />
        SetOutputFilter DEFLATE
    </Location>
    
    # Cache static assets
    <LocationMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg)$">
        ExpiresActive On
        ExpiresDefault "access plus 1 year"
    </LocationMatch>
    
    # Handle client-side routing
    FallbackResource /index.html
</VirtualHost>
```

**Nginx Configuration:**

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/spectrum-explorer;
    index index.html;
    
    # Gzip compression
    gzip on;
    gzip_types text/css application/javascript application/json;
    
    # Cache static assets
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Handle client-side routing
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## GitHub Pages Specific Configuration

### Repository Settings

1. **Enable GitHub Pages**:
   - Go to repository **Settings** → **Pages**
   - Set source to **GitHub Actions**
   - The workflow will handle the rest automatically

2. **Custom Domain** (Optional):
   ```bash
   # Add CNAME file to public/ directory
   echo "your-domain.com" > public/CNAME
   ```

3. **Environment Variables**:
   - No additional environment variables needed for basic deployment
   - Add secrets in **Settings** → **Secrets and variables** → **Actions** if needed

### Workflow Customization

The default workflow (`.github/workflows/deploy.yml`) can be customized:

```yaml
# Custom build command
- name: Build application
  run: npm run build
  env:
    NODE_ENV: production
    VITE_APP_VERSION: ${{ github.sha }}

# Custom deployment branch
- name: Deploy to GitHub Pages
  uses: actions/deploy-pages@v4
  with:
    branch: gh-pages  # Optional: specify target branch
```

### Testing and Validation

For comprehensive testing procedures, see the **[Deployment Testing Guide](deployment-testing.md)**.

**Quick Validation:**
1. Push changes to `main` branch
2. Check **Actions** tab for deployment status
3. Visit live site: `https://username.github.io/repository-name/`
4. Verify all functionality works correctly

## Performance Optimization

### Build Optimization

```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          physics: ['./src/utils/physicsCalculations.js']
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
}
```

### CDN Configuration

**Cloudflare Settings:**
- Enable Auto Minify for CSS, JavaScript, and HTML
- Enable Brotli compression
- Set Browser Cache TTL to 1 year for static assets
- Enable "Always Online" for better availability

### Monitoring and Analytics

**Performance Monitoring:**
```html
<!-- Add to index.html -->
<script>
  // Web Vitals monitoring
  import {getCLS, getFID, getFCP, getLCP, getTTFB} from 'web-vitals';
  
  getCLS(console.log);
  getFID(console.log);
  getFCP(console.log);
  getLCP(console.log);
  getTTFB(console.log);
</script>
```

## Security Considerations

### Content Security Policy

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data:;
  font-src 'self';
  connect-src 'self';
">
```

### HTTPS Configuration

Always deploy with HTTPS enabled:
- Use Let's Encrypt for free SSL certificates
- Enable HSTS headers
- Redirect HTTP to HTTPS

## Environment Variables

### Production Environment

```bash
# .env.production
VITE_APP_ENV=production
VITE_DEBUG_MODE=false
VITE_AUTO_RUN_TESTS=false
```

### Staging Environment

```bash
# .env.staging
VITE_APP_ENV=staging
VITE_DEBUG_MODE=true
VITE_AUTO_RUN_TESTS=true
```

## Troubleshooting

### Common Issues

1. **Build Fails**: Check Node.js version and dependencies
2. **Blank Page**: Verify base URL configuration for subdirectory deployments
3. **404 Errors**: Ensure proper fallback routing configuration
4. **Performance Issues**: Enable compression and caching

### Debug Mode

Enable debug mode for troubleshooting:
```javascript
// Add to main.jsx
if (import.meta.env.VITE_DEBUG_MODE === 'true') {
  console.log('Debug mode enabled');
  window.DEBUG = true;
}
```

## Deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] Test production build locally with `npm run preview`
- [ ] Verify all tests pass
- [ ] Check performance with Lighthouse
- [ ] Configure proper caching headers
- [ ] Enable HTTPS
- [ ] Set up monitoring and analytics
- [ ] Test on multiple devices and browsers
- [ ] Verify educational content accuracy
- [ ] Check accessibility compliance

---

*For development setup and local testing, see the Developer Guide documentation.*

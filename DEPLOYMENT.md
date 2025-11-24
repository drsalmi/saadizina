# Netlify Deployment Guide

## ✅ Configuration Complete

Your project is now configured for Netlify deployment with:
- ✅ `netlify.toml` - Main configuration file
- ✅ `public/_redirects` - Client-side routing support
- ✅ Pushed to GitHub repository: `drsalmi/saadizina`

## 🚀 Deploy to Netlify

### Option 1: Deploy via Netlify UI (Recommended)

1. **Go to Netlify**: Visit [https://app.netlify.com](https://app.netlify.com)

2. **Sign in/Sign up**: Use your GitHub account to sign in

3. **Import Project**:
   - Click **"Add new site"** → **"Import an existing project"**
   - Choose **"Deploy with GitHub"**
   - Authorize Netlify to access your GitHub account
   - Select the repository: **`drsalmi/saadizina`**

4. **Configure Build Settings** (should auto-detect from `netlify.toml`):
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Branch to deploy**: `main`

5. **Deploy**: Click **"Deploy site"**

6. **Wait for deployment**: Netlify will build and deploy your site (usually takes 1-3 minutes)

7. **Get your URL**: You'll receive a URL like `https://random-name-123456.netlify.app`

### Option 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init

# Or deploy directly
netlify deploy --prod
```

## 🎨 Custom Domain (Optional)

After deployment, you can add a custom domain:

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Follow the instructions to configure your DNS

## 🔧 Configuration Details

### Build Settings (from `netlify.toml`)
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 18
- **Redirects**: All routes redirect to `index.html` for React Router support

### Security Headers
The following security headers are automatically added:
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`

### Caching
Static assets in `/assets/*` are cached for 1 year with immutable flag for optimal performance.

## 🔄 Continuous Deployment

Netlify is now configured for continuous deployment:
- Every push to the `main` branch will automatically trigger a new deployment
- Pull requests will create deploy previews
- You can view deployment status in the Netlify dashboard

## 📝 Environment Variables (if needed)

If your app requires environment variables:

1. Go to **Site settings** → **Environment variables**
2. Add your variables (e.g., `VITE_API_URL`, `VITE_API_KEY`, etc.)
3. Redeploy the site

**Note**: Vite requires environment variables to be prefixed with `VITE_` to be exposed to the client.

## 🐛 Troubleshooting

### Build fails
- Check the build logs in Netlify dashboard
- Ensure all dependencies are in `package.json`
- Verify Node version compatibility

### 404 on page refresh
- This should be handled by the `_redirects` file and `netlify.toml`
- If issues persist, check the redirects configuration

### Environment variables not working
- Ensure they're prefixed with `VITE_`
- Rebuild the site after adding variables

## 📚 Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#netlify)
- [React Router and Netlify](https://docs.netlify.com/routing/redirects/rewrites-proxies/#history-pushstate-and-single-page-apps)

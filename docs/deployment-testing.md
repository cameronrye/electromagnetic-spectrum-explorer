# Deployment Testing and Validation Guide

Complete guide for testing the GitHub Pages deployment workflow and validating the live site.

## Pre-Deployment Testing

### 1. Local Build Verification

Before pushing to trigger deployment, verify the build works locally:

```bash
# Clean any previous builds
rm -rf dist/

# Install dependencies (if not already done)
npm install

# Run linting (optional, but recommended)
npm run lint

# Build for production
npm run build

# Verify build output
ls -la dist/
```

**Expected Output:**
```
dist/
├── index.html              # Main HTML file
├── assets/
│   ├── index-[hash].js     # Bundled JavaScript (~207KB)
│   ├── index-[hash].css    # Bundled CSS (~12KB)
└── vite.svg               # Favicon
```

### 2. Local Preview Testing

Test the production build locally:

```bash
# Start preview server
npm run preview

# Open http://localhost:4173/ in browser
```

**Validation Checklist:**
- [ ] Application loads without errors
- [ ] Interactive spectrum visualization works
- [ ] Unit conversion panel functions correctly
- [ ] Theme switcher works (light/dark mode)
- [ ] Educational content displays properly
- [ ] No console errors in browser developer tools
- [ ] Responsive design works on different screen sizes

### 3. Physics Accuracy Testing

Verify scientific calculations:

```bash
# Run tests in browser
npm run dev:test

# Or manually open: http://localhost:5173/?runTests=true
```

**Test Coverage:**
- [ ] Wavelength to frequency conversions
- [ ] Wavelength to energy conversions
- [ ] Electromagnetic spectrum region detection
- [ ] Unit conversion accuracy
- [ ] Physics constants validation

## Deployment Workflow Testing

### 1. GitHub Actions Workflow

**Trigger Deployment:**

1. **Commit and Push Changes:**
   ```bash
   git add .
   git commit -m "Set up GitHub Pages deployment workflow"
   git push origin main
   ```

2. **Monitor Deployment:**
   - Go to your repository on GitHub
   - Click the **Actions** tab
   - Watch the "Deploy to GitHub Pages" workflow

**Workflow Steps to Verify:**
- [ ] **Checkout repository** - Downloads the code
- [ ] **Setup Node.js** - Installs Node.js 18
- [ ] **Install dependencies** - Runs `npm ci`
- [ ] **Run linting** - Executes `npm run lint` (non-blocking)
- [ ] **Build application** - Runs `npm run build`
- [ ] **Setup Pages** - Configures GitHub Pages
- [ ] **Upload artifact** - Uploads the `dist/` folder
- [ ] **Deploy to GitHub Pages** - Publishes to live site

### 2. Deployment Status Monitoring

**Check Deployment Status:**

1. **Actions Tab**: Monitor real-time progress
2. **Environments**: Check the `github-pages` environment
3. **Status Badge**: Verify the badge in README.md updates

**Expected Timeline:**
- Build job: ~2-3 minutes
- Deploy job: ~1-2 minutes
- Total deployment: ~3-5 minutes

### 3. Troubleshooting Failed Deployments

**Common Issues and Solutions:**

**Build Fails:**
```bash
# Check locally first
npm run build

# Common fixes:
npm install          # Update dependencies
npm run lint --fix   # Fix linting issues
```

**Deployment Fails:**
- Verify GitHub Pages is enabled in repository settings
- Check that the workflow has proper permissions
- Ensure the `dist/` folder contains built files

**Site Not Loading:**
- Wait 5-10 minutes for DNS propagation
- Check GitHub Pages settings in repository
- Verify the deployment completed successfully

## Live Site Validation

### 1. Site Accessibility

**Live Site URL:** `https://cameronrye.github.io/electromagnetic-spectrum-explorer/`

**Initial Validation:**
- [ ] Site loads within 3 seconds
- [ ] No 404 errors or broken links
- [ ] HTTPS certificate is valid
- [ ] Favicon displays correctly

### 2. Functional Testing

**Core Features:**
- [ ] **Spectrum Visualization**: Interactive spectrum displays correctly
- [ ] **Wavelength Selection**: Clicking on spectrum updates values
- [ ] **Unit Conversion**: All conversion fields work bidirectionally
- [ ] **Educational Panel**: Content updates based on selected wavelength
- [ ] **Theme Switching**: Light/dark mode toggle functions
- [ ] **Responsive Design**: Works on mobile and desktop

**Physics Accuracy:**
- [ ] Test known values (e.g., 550nm green light)
- [ ] Verify unit conversions match scientific calculators
- [ ] Check electromagnetic region boundaries
- [ ] Validate frequency and energy calculations

### 3. Performance Testing

**Load Time Analysis:**
- [ ] Initial page load < 3 seconds
- [ ] JavaScript bundle loads efficiently
- [ ] CSS styles apply without flash of unstyled content
- [ ] Images and assets load properly

**Browser Compatibility:**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

### 4. SEO and Metadata

**Verify Meta Tags:**
- [ ] Page title: "Electromagnetic Spectrum Explorer"
- [ ] Meta description includes key terms
- [ ] Open Graph tags for social sharing
- [ ] Proper favicon and app icons

## Automated Monitoring

### 1. GitHub Status Checks

**Set up status monitoring:**
- Enable branch protection rules
- Require deployment status checks
- Monitor deployment badge in README

### 2. Uptime Monitoring

**Recommended Tools:**
- **UptimeRobot**: Free uptime monitoring
- **StatusCake**: Website monitoring
- **Pingdom**: Performance monitoring

**Setup Example (UptimeRobot):**
1. Create account at uptimerobot.com
2. Add monitor for: `https://cameronrye.github.io/electromagnetic-spectrum-explorer/`
3. Set check interval: 5 minutes
4. Configure alerts via email

### 3. Performance Monitoring

**Google PageSpeed Insights:**
- Test URL: `https://cameronrye.github.io/electromagnetic-spectrum-explorer/`
- Target scores: 90+ for Performance, Accessibility, Best Practices, SEO

**Lighthouse Audit:**
```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse https://cameronrye.github.io/electromagnetic-spectrum-explorer/ --output html --output-path ./lighthouse-report.html
```

## Maintenance and Updates

### 1. Regular Checks

**Weekly:**
- [ ] Verify site is accessible
- [ ] Check for any console errors
- [ ] Monitor deployment badge status

**Monthly:**
- [ ] Run full functional testing
- [ ] Update dependencies if needed
- [ ] Review performance metrics

### 2. Dependency Updates

**Automated Updates:**
- Dependabot will create PRs for dependency updates
- Review and test updates before merging
- Monitor for breaking changes

**Manual Updates:**
```bash
# Check for outdated packages
npm outdated

# Update packages
npm update

# Test after updates
npm run build && npm run preview
```

### 3. Rollback Procedures

**If Deployment Fails:**
1. Check the Actions tab for error details
2. Fix issues locally and test
3. Push fixes to trigger new deployment

**Emergency Rollback:**
1. Revert the problematic commit
2. Push the revert to trigger redeployment
3. Investigate and fix issues separately

## Success Criteria

**Deployment is successful when:**
- [ ] GitHub Actions workflow completes without errors
- [ ] Live site loads at the correct URL
- [ ] All core functionality works as expected
- [ ] No console errors in browser
- [ ] Performance scores meet targets (90+)
- [ ] Site is accessible on multiple devices/browsers

**Ready for Production when:**
- [ ] All tests pass
- [ ] Documentation is complete
- [ ] Monitoring is set up
- [ ] Team has access to deployment controls
- [ ] Rollback procedures are documented

# GitHub Repository Setup Guide

Complete guide for configuring your GitHub repository for optimal development and deployment workflow.

## Repository Settings Configuration

### 1. GitHub Pages Setup

**Enable GitHub Pages:**

1. Navigate to your repository on GitHub
2. Go to **Settings** → **Pages**
3. Under "Source", select **GitHub Actions**
4. Save the configuration

The deployment workflow (`.github/workflows/deploy.yml`) will automatically handle the rest.

**Verify Setup:**
- Push changes to the `main` branch
- Check the **Actions** tab for deployment status
- Visit your live site: `https://cameronrye.github.io/electromagnetic-spectrum-explorer/`

### 2. Branch Protection Rules

**Protect the Main Branch:**

1. Go to **Settings** → **Branches**
2. Click **Add rule** for the `main` branch
3. Configure the following settings:

**Recommended Protection Rules:**
- ✅ **Require a pull request before merging**
  - Require approvals: 1
  - Dismiss stale PR approvals when new commits are pushed
- ✅ **Require status checks to pass before merging**
  - Require branches to be up to date before merging
  - Add status checks: `build` (from the deploy workflow)
- ✅ **Require conversation resolution before merging**
- ✅ **Include administrators** (optional, for team projects)

### 3. Repository Settings

**General Settings:**

1. **Repository Name**: `electromagnetic-spectrum-explorer`
2. **Description**: "Interactive web application for exploring the electromagnetic spectrum from radio waves to gamma rays"
3. **Website**: `https://cameronrye.github.io/electromagnetic-spectrum-explorer/`
4. **Topics**: Add relevant tags:
   - `physics`
   - `electromagnetic-spectrum`
   - `education`
   - `react`
   - `vite`
   - `d3js`
   - `interactive-visualization`
   - `science`

**Features to Enable:**
- ✅ **Issues** (for bug reports and feature requests)
- ✅ **Projects** (for project management)
- ✅ **Wiki** (for additional documentation)
- ✅ **Discussions** (for community engagement)

### 4. Security Settings

**Dependabot Alerts:**

1. Go to **Settings** → **Security & analysis**
2. Enable:
   - ✅ **Dependency graph**
   - ✅ **Dependabot alerts**
   - ✅ **Dependabot security updates**

**Code Scanning:**

1. Go to **Security** → **Code scanning**
2. Set up **CodeQL analysis** for automated security scanning

## Workflow Configuration

### Environment Variables

The deployment workflow doesn't require additional environment variables, but you can add them if needed:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add repository secrets for sensitive data
3. Add environment variables for configuration

### Deployment Environments

**GitHub Pages Environment:**

1. Go to **Settings** → **Environments**
2. The `github-pages` environment is automatically created
3. Configure protection rules if needed:
   - Required reviewers
   - Wait timer
   - Deployment branches

## Development Workflow

### Recommended Git Flow

1. **Main Branch**: Production-ready code
2. **Feature Branches**: `feature/description` or `feat/description`
3. **Bug Fix Branches**: `fix/description` or `bugfix/description`
4. **Release Branches**: `release/version` (if using semantic versioning)

### Pull Request Template

Create `.github/pull_request_template.md`:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Manual testing completed
- [ ] No console errors

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated if needed
```

### Issue Templates

Create issue templates in `.github/ISSUE_TEMPLATE/`:

**Bug Report** (`bug_report.md`):
```markdown
---
name: Bug report
about: Create a report to help us improve
title: '[BUG] '
labels: bug
assignees: ''
---

**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior

**Expected behavior**
What you expected to happen

**Screenshots**
If applicable, add screenshots

**Environment:**
- Browser: [e.g. Chrome, Firefox]
- Version: [e.g. 22]
- Device: [e.g. Desktop, Mobile]
```

**Feature Request** (`feature_request.md`):
```markdown
---
name: Feature request
about: Suggest an idea for this project
title: '[FEATURE] '
labels: enhancement
assignees: ''
---

**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Additional context**
Add any other context about the feature request here.
```

## Monitoring and Maintenance

### Status Monitoring

- **Deployment Status**: Check the Actions tab regularly
- **Site Uptime**: Monitor the live site functionality
- **Dependencies**: Review Dependabot alerts weekly

### Regular Maintenance Tasks

1. **Weekly**: Review and merge Dependabot PRs
2. **Monthly**: Update documentation if needed
3. **Quarterly**: Review and update deployment workflow

## Troubleshooting

### Common Issues

**Deployment Fails:**
1. Check the Actions tab for error details
2. Verify the build process works locally (`npm run build`)
3. Check for linting errors (`npm run lint`)

**Site Not Loading:**
1. Verify GitHub Pages is enabled
2. Check the deployment workflow completed successfully
3. Ensure the `dist` folder contains the built files

**Build Errors:**
1. Check Node.js version compatibility
2. Verify all dependencies are installed
3. Review the build logs in the Actions tab

For more troubleshooting help, see the [Support Documentation](support.md).

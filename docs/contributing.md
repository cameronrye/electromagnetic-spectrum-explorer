# Contributing to Electromagnetic Spectrum Explorer

Thank you for your interest in contributing to the Electromagnetic Spectrum Explorer! This project aims to provide an educational and interactive tool for exploring electromagnetic radiation, and we welcome contributions from the community.

## 🤝 How to Contribute

### Reporting Issues

Before creating an issue, please:
1. Check if the issue already exists in our [issue tracker](../../issues)
2. Use the appropriate issue template (bug report or feature request)
3. Provide as much detail as possible, including:
   - Steps to reproduce the issue
   - Expected vs. actual behavior
   - Browser and operating system information
   - Screenshots or error messages if applicable

### Suggesting Features

We welcome feature suggestions! Please:
1. Use the feature request template
2. Explain the use case and educational value
3. Consider the scope and complexity of the feature
4. Check if similar functionality already exists

### Code Contributions

#### Getting Started

1. **Fork the repository** and clone your fork locally
2. **Install dependencies**: `npm install`
3. **Start the development server**: `npm run dev`
4. **Run tests**: `npm test` (check browser console for results)
5. **Create a new branch** for your feature: `git checkout -b feature/your-feature-name`

#### Development Guidelines

**Code Style:**
- Follow the existing code style and structure
- Use meaningful variable and function names
- Add JSDoc comments for new functions
- Keep components focused and reusable
- Use modern React patterns (hooks, functional components)

**Physics and Science:**
- Ensure scientific accuracy in all calculations and data
- Include proper unit conversions and error handling
- Add tests for new physics calculations
- Reference scientific sources when adding new data

**Testing:**
- Add tests for new features and bug fixes
- Ensure all existing tests continue to pass
- Test across different browsers and devices
- Verify accessibility features work correctly

**Documentation:**
- Update README.md if adding new features
- Add inline comments for complex logic
- Update JSDoc comments for modified functions
- Include examples in documentation

#### Pull Request Process

1. **Update your branch** with the latest changes from main
2. **Run all tests** and ensure they pass
3. **Run the linter**: `npm run lint`
4. **Test your changes** thoroughly in different browsers
5. **Create a pull request** using the provided template
6. **Describe your changes** clearly in the PR description
7. **Link any related issues** using keywords like "Fixes #123"

#### Commit Messages

Use clear, descriptive commit messages:
- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

Examples:
```
Add wavelength-to-color conversion utility

- Implement accurate wavelength to RGB conversion
- Add support for visible spectrum color mapping
- Include tests for edge cases and accuracy
- Fixes #45
```

## 🧪 Testing

### Running Tests

The project includes comprehensive tests for physics calculations:

```bash
npm run dev  # Tests run automatically in development
# Check browser console for test results
```

### Test Coverage

We aim for high test coverage, especially for:
- Physics calculations and unit conversions
- Data integrity and validation
- Component rendering and user interactions
- Accessibility features

### Adding Tests

When adding new features:
1. Add unit tests for utility functions
2. Add component tests for React components
3. Add integration tests for complex interactions
4. Verify physics calculations with known values

## 📚 Educational Standards

This project serves educational purposes, so we maintain high standards for:

**Scientific Accuracy:**
- All physics calculations must be accurate
- Data sources should be reputable (NASA, NIST, peer-reviewed papers)
- Units and conversions must be correct
- Edge cases should be handled appropriately

**Educational Value:**
- Features should enhance learning about electromagnetic radiation
- Information should be accessible to various education levels
- Examples should be relevant and interesting
- Safety information should be included where appropriate

**Accessibility:**
- Follow WCAG 2.1 guidelines
- Ensure keyboard navigation works
- Provide appropriate ARIA labels
- Test with screen readers
- Maintain good color contrast

## 🎯 Project Scope

### In Scope
- Interactive electromagnetic spectrum visualization
- Accurate physics calculations and unit conversions
- Educational content about electromagnetic radiation
- Accessibility and usability improvements
- Performance optimizations
- Browser compatibility
- Mobile responsiveness

### Out of Scope
- Complex quantum mechanics calculations
- Advanced research-level features
- Non-educational entertainment features
- Features requiring server-side processing
- User accounts or data storage

## 🚀 Development Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn
- Modern web browser
- Git

### Local Development
```bash
git clone https://github.com/your-username/electromagnetic-spectrum-explorer.git
cd electromagnetic-spectrum-explorer
npm install
npm run dev
```

### Project Structure
```
src/
├── components/          # React components
├── data/               # Scientific data and constants
├── utils/              # Utility functions and calculations
├── tests/              # Test files
└── assets/             # Static assets
```

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be recognized in:
- The project README
- Release notes for significant contributions
- GitHub contributor statistics

## 📞 Getting Help

If you need help or have questions:
1. Check the existing documentation
2. Search through existing issues
3. Create a new issue with the "question" label
4. Join discussions in the GitHub Discussions tab

## 🌟 Code of Conduct

Please note that this project is released with a [Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project, you agree to abide by its terms.

---

Thank you for contributing to science education and making electromagnetic spectrum exploration more accessible to everyone! 🔬✨

# Support & Troubleshooting

Get help with the Electromagnetic Spectrum Explorer and find solutions to common issues.

## Quick Help

### Common Issues

| Issue | Quick Solution |
|-------|----------------|
| Application won't load | Refresh page, check internet connection |
| Values not updating | Click outside input field, press Enter |
| Spectrum indicator missing | Try clicking on spectrum bar |
| Theme not changing | Check browser JavaScript settings |
| Calculations seem wrong | Verify input units (nm, THz, eV) |

### Browser Requirements

- **Supported Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **JavaScript**: Must be enabled
- **Screen Resolution**: 1024x768 minimum recommended
- **Internet**: Required for initial loading

## Detailed Troubleshooting

### Application Loading Issues

**Problem**: Page loads but application doesn't appear
- Check browser console for JavaScript errors
- Disable browser extensions temporarily
- Try incognito/private browsing mode
- Clear browser cache and cookies

**Problem**: Very slow loading
- Check internet connection speed
- Close other browser tabs
- Restart browser
- Try different browser

### Input and Interaction Issues

**Problem**: Can't enter values in conversion panel
- Click directly in the input field
- Ensure field is focused (cursor visible)
- Try pressing Tab to move between fields
- Refresh page if fields are unresponsive

**Problem**: Spectrum clicking doesn't work
- Ensure JavaScript is enabled
- Try clicking different parts of spectrum
- Check if browser is blocking interactions
- Refresh page and try again

**Problem**: Values seem incorrect
- Check input units (nm for wavelength, THz for frequency, eV for energy)
- Verify you're in the expected spectrum region
- Try using scientific notation for very large/small values
- Compare with known reference values

### Display and Visual Issues

**Problem**: Spectrum colors not showing
- Check if browser supports CSS gradients
- Try different browser
- Ensure hardware acceleration is enabled
- Update graphics drivers

**Problem**: Theme switching not working
- Check browser localStorage support
- Try manually refreshing after theme change
- Clear browser data and try again
- Verify JavaScript is enabled

**Problem**: Mobile display issues
- Rotate device to landscape mode
- Zoom out if content is cut off
- Try different mobile browser
- Clear mobile browser cache

## Frequently Asked Questions

### General Usage

**Q: What is the electromagnetic spectrum?**
A: The electromagnetic spectrum is the range of all types of electromagnetic radiation, from radio waves with long wavelengths to gamma rays with very short wavelengths.

**Q: Why are the numbers so different between regions?**
A: The electromagnetic spectrum covers an enormous range - over 15 orders of magnitude! Radio waves can have wavelengths of kilometers while gamma rays have wavelengths smaller than atoms.

**Q: How accurate are the calculations?**
A: The application uses NIST-certified physics constants and is accurate for educational and basic research purposes. Calculations are precise to many decimal places.

**Q: Can I use this for homework?**
A: Yes! The tool is designed for educational use and provides accurate physics calculations suitable for coursework.

### Technical Questions

**Q: What physics equations does this use?**
A: The core relationships are:
- c = λν (speed of light = wavelength × frequency)
- E = hν (energy = Planck constant × frequency)
- E = hc/λ (energy = Planck constant × speed of light / wavelength)

**Q: What are the physics constants used?**
A: We use NIST 2018 values:
- Speed of light: 299,792,458 m/s (exact)
- Planck constant: 6.62607015×10⁻³⁴ J⋅s (exact)
- Electron volt: 1.602176634×10⁻¹⁹ J (exact)

**Q: Why can't I enter certain values?**
A: The application validates inputs to ensure they're within the electromagnetic spectrum range (1 fm to 1000 km wavelength). Invalid values are automatically adjusted.

**Q: How do I enter very large or small numbers?**
A: Use scientific notation: 5e-9 for 5×10⁻⁹, or 2.4e14 for 2.4×10¹⁴.

### Educational Questions

**Q: What age group is this designed for?**
A: The tool is suitable for high school physics students through university level, and anyone interested in learning about electromagnetic radiation.

**Q: Can teachers use this in classrooms?**
A: Absolutely! The tool is designed for educational use and works well for classroom demonstrations and student exploration.

**Q: Are there lesson plans available?**
A: Check the Tutorials documentation for step-by-step educational activities and lesson ideas.

**Q: How do I cite this tool in academic work?**
A: You can reference it as "Electromagnetic Spectrum Explorer" with the URL and access date.

## Error Messages

### Common Error Messages and Solutions

**"Invalid wavelength value"**
- Ensure value is between 1 fm and 1000 km
- Check that you're using the correct units
- Try using scientific notation for very small/large values

**"Calculation error"**
- Refresh the page and try again
- Check that JavaScript is enabled
- Verify input values are reasonable

**"Network error"**
- Check internet connection
- Try refreshing the page
- Clear browser cache

**"Browser not supported"**
- Update to a modern browser version
- Enable JavaScript
- Check browser compatibility list

## Performance Issues

### Slow Performance

**Symptoms**: Application responds slowly to clicks or input
**Solutions**:
- Close other browser tabs
- Restart browser
- Check available system memory
- Try different browser

**Symptoms**: Calculations take too long
**Solutions**:
- Refresh the page
- Check for browser extensions interfering
- Try incognito/private mode

### Memory Issues

**Symptoms**: Browser becomes unresponsive
**Solutions**:
- Close other applications
- Restart browser
- Clear browser cache
- Check system memory usage

## Accessibility Support

### Screen Readers

The application supports screen readers with:
- ARIA labels for all interactive elements
- Semantic HTML structure
- Keyboard navigation support
- High contrast theme option

### Keyboard Navigation

- **Tab**: Move between input fields
- **Shift+Tab**: Move backwards
- **Enter**: Confirm input
- **Escape**: Close dropdowns

### Visual Accessibility

- High contrast themes available
- Scalable text and interface elements
- Color-blind friendly design
- Focus indicators for keyboard users

## Getting Additional Help

### Documentation Resources

- **User Guide**: Complete usage instructions
- **Tutorials**: Step-by-step learning materials
- **API Reference**: Technical documentation
- **Developer Guide**: For contributors

### Contact and Support

**For Technical Issues**:
- Check GitHub Issues for known problems
- Create new issue with detailed description
- Include browser version and error messages

**For Educational Questions**:
- Review the Tutorials documentation
- Check the User Guide for detailed explanations
- Use GitHub Discussions for community help

**For Bug Reports**:
- Provide steps to reproduce the issue
- Include browser and operating system information
- Attach screenshots if helpful
- Note any error messages

### Community Resources

- **GitHub Repository**: Source code and issue tracking
- **Discussions**: Community questions and answers
- **Educational Forums**: Physics and science education communities

## Reporting Issues

### Before Reporting

1. Check this troubleshooting guide
2. Search existing GitHub issues
3. Try the suggested solutions
4. Test in different browser

### What to Include

- **Browser and version**
- **Operating system**
- **Steps to reproduce**
- **Expected vs. actual behavior**
- **Screenshots or error messages**
- **Console errors** (if any)

### Issue Templates

Use the appropriate GitHub issue template:
- **Bug Report**: For application problems
- **Feature Request**: For new functionality
- **Question**: For usage help
- **Documentation**: For documentation improvements

---

*For more detailed information about using the application, see the User Guide and Tutorials documentation.*

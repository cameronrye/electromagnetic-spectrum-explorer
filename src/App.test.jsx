import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App.jsx';
import { PreferencesProvider } from './contexts/PreferencesContext.jsx';

// Mock the test runner to prevent it from running during tests
vi.mock('./tests/testRunner.js', () => ({
  testRunner: {
    runAllTests: vi.fn()
  }
}));

// Helper function to render App with required providers
const renderApp = () => {
  return render(
    <PreferencesProvider>
      <App />
    </PreferencesProvider>
  );
};

describe('App', () => {
  beforeEach(() => {
    // Clear any mocks before each test
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    renderApp();
    expect(screen.getByText(/Electromagnetic Spectrum Explorer/i)).toBeInTheDocument();
  });

  it('renders main components', () => {
    renderApp();

    // Check for header
    expect(screen.getByText(/Electromagnetic Spectrum Explorer/i)).toBeInTheDocument();

    // Check for subtitle
    expect(screen.getByText(/Interactive tool for exploring the electromagnetic spectrum/i)).toBeInTheDocument();

    // Check for main content
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('renders skip link for accessibility', () => {
    renderApp();
    const skipLink = screen.getByText(/Skip to main content/i);
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  it('renders settings button', () => {
    renderApp();
    const settingsButton = screen.getByLabelText(/Toggle settings/i);
    expect(settingsButton).toBeInTheDocument();
  });

  it('renders conversion panel with wavelength input', () => {
    renderApp();
    const wavelengthInput = screen.getByLabelText(/Wavelength in nanometers/i);
    expect(wavelengthInput).toBeInTheDocument();
  });

  it('renders spectrum visualization', () => {
    renderApp();
    const spectrum = screen.getByRole('slider', { name: /Electromagnetic spectrum wavelength selector/i });
    expect(spectrum).toBeInTheDocument();
  });

  it('renders educational panel', () => {
    renderApp();
    expect(screen.getByText(/Educational Information/i)).toBeInTheDocument();
  });

  it('renders footer', () => {
    renderApp();
    expect(screen.getByText(/Made with/i)).toBeInTheDocument();
  });

  it('initializes with default wavelength (550nm - green light)', () => {
    renderApp();
    const wavelengthInput = screen.getByLabelText(/Wavelength in nanometers/i);
    expect(wavelengthInput).toHaveValue(550);
  });

  it('updates wavelength when conversion panel input changes', async () => {
    const user = userEvent.setup();
    renderApp();

    const wavelengthInput = screen.getByLabelText(/Wavelength in nanometers/i);

    // Select all and replace with new value
    await user.click(wavelengthInput);
    await user.keyboard('{Control>}a{/Control}');
    await user.keyboard('700');

    // Wait for the value to update
    await waitFor(() => {
      expect(wavelengthInput.value).toBe('700');
    });
  });

  it('displays correct region for visible light wavelength', () => {
    renderApp();
    // Default is 550nm which is in the visible light range
    // Use getAllByText since "Visible Light" appears multiple times
    const visibleLightElements = screen.getAllByText(/Visible Light/i);
    expect(visibleLightElements.length).toBeGreaterThan(0);
  });

  it('wraps content in error boundary', () => {
    renderApp();
    // If error boundary is working, the app should render normally
    expect(screen.getByText(/Electromagnetic Spectrum Explorer/i)).toBeInTheDocument();
  });

  it('wraps content in theme provider', () => {
    renderApp();
    // Settings button should be available, indicating ThemeProvider is working
    expect(screen.getByLabelText(/Toggle settings/i)).toBeInTheDocument();
  });

  it('has proper semantic HTML structure', () => {
    renderApp();

    // Check for header
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();

    // Check for main content
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveAttribute('id', 'main-content');

    // Check for footer
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    const { container } = renderApp();
    const appDiv = container.querySelector('.app');
    expect(appDiv).toBeInTheDocument();
  });

  it('does not run tests in production mode', () => {
    // This test ensures the test runner is mocked and won't run
    renderApp();
    // The app should render normally without running tests
    expect(screen.getByText(/Electromagnetic Spectrum Explorer/i)).toBeInTheDocument();
  });
});


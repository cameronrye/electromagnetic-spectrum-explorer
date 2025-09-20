// Electromagnetic Spectrum Data
// Based on NASA's scientific data and physics constants

// Physics constants
export const PHYSICS_CONSTANTS = {
  SPEED_OF_LIGHT: 299792458, // m/s
  PLANCK_CONSTANT: 6.62607015e-34, // J⋅s
  PLANCK_CONSTANT_EV: 4.135667696e-15, // eV⋅s
  ELECTRON_VOLT: 1.602176634e-19, // J (exact NIST 2018 value)
};

// Electromagnetic spectrum regions with accurate scientific ranges
// Ordered from shortest to longest wavelength (highest to lowest energy)
export const SPECTRUM_REGIONS = [
  {
    id: 'gamma',
    name: 'Gamma Rays',
    color: '#B19CD9',
    wavelengthMin: 1e-15, // 1 fm
    wavelengthMax: 10e-12, // 10 pm
    frequencyMin: 3e19, // 30 EHz
    frequencyMax: 3e23, // 300 ZHz (extended)
    energyMin: 124000, // eV (124 keV)
    energyMax: 1e12, // eV (1 TeV, extended)
    description: 'Gamma rays are the most energetic form of electromagnetic radiation.',
    applications: [
      'Cancer treatment (radiotherapy)',
      'Medical imaging (PET scans)',
      'Nuclear medicine',
      'Gamma-ray astronomy',
      'Food sterilization',
      'Industrial radiography'
    ],
    examples: [
      'Cobalt-60 therapy: 1.17 and 1.33 MeV',
      'PET scan tracers: 511 keV',
      'Cosmic gamma rays: up to TeV energies'
    ]
  },
  {
    id: 'xray',
    name: 'X-rays',
    color: '#DDA0DD',
    wavelengthMin: 10e-12, // 10 pm
    wavelengthMax: 10e-9, // 10 nm
    frequencyMin: 3e16, // 30 PHz
    frequencyMax: 3e19, // 30 EHz
    energyMin: 124, // eV
    energyMax: 124000, // eV (124 keV)
    description: 'X-rays have high energy and can penetrate soft tissues but are absorbed by bones.',
    applications: [
      'Medical imaging',
      'Airport security scanners',
      'X-ray crystallography',
      'X-ray astronomy',
      'Industrial inspection',
      'Cancer treatment'
    ],
    examples: [
      'Medical X-rays: 10-100 keV',
      'Dental X-rays: 60-70 keV',
      'Chest X-rays: 120 kVp'
    ]
  },
  {
    id: 'ultraviolet',
    name: 'Ultraviolet',
    color: '#FFEAA7',
    wavelengthMin: 10e-9, // 10 nm
    wavelengthMax: 380e-9, // 380 nm
    frequencyMin: 7.9e14, // 790 THz
    frequencyMax: 3e16, // 30 PHz
    energyMin: 3.26, // eV
    energyMax: 124, // eV
    description: 'Ultraviolet radiation has higher energy than visible light and can cause sunburn.',
    applications: [
      'Sterilization and disinfection',
      'Fluorescent lighting',
      'Tanning beds',
      'UV astronomy',
      'Photolithography',
      'Vitamin D synthesis'
    ],
    examples: [
      'UV-A: 315-400 nm (tanning, aging)',
      'UV-B: 280-315 nm (sunburn, vitamin D)',
      'UV-C: 100-280 nm (germicidal, ozone layer absorption)'
    ]
  },
  {
    id: 'visible',
    name: 'Visible Light',
    color: '#96CEB4',
    wavelengthMin: 380e-9, // 380 nm (violet)
    wavelengthMax: 700e-9, // 700 nm (red)
    frequencyMin: 4.3e14, // 430 THz
    frequencyMax: 7.9e14, // 790 THz
    energyMin: 1.77, // eV (red)
    energyMax: 3.26, // eV (violet)
    description: 'Visible light is the only part of the electromagnetic spectrum that human eyes can detect.',
    applications: [
      'Human vision',
      'Photography',
      'Optical microscopy',
      'Laser technology',
      'Fiber optic communications',
      'Solar panels'
    ],
    examples: [
      'Red light: ~700 nm wavelength',
      'Green light: ~550 nm wavelength',
      'Blue light: ~450 nm wavelength',
      'Violet light: ~400 nm wavelength'
    ],
    subregions: [
      { name: 'Red', wavelength: 700e-9, color: '#FF0000' },
      { name: 'Orange', wavelength: 620e-9, color: '#FFA500' },
      { name: 'Yellow', wavelength: 570e-9, color: '#FFFF00' },
      { name: 'Green', wavelength: 530e-9, color: '#00FF00' },
      { name: 'Blue', wavelength: 470e-9, color: '#0000FF' },
      { name: 'Indigo', wavelength: 420e-9, color: '#4B0082' },
      { name: 'Violet', wavelength: 380e-9, color: '#8B00FF' }
    ]
  },
  {
    id: 'infrared',
    name: 'Infrared',
    color: '#45B7D1',
    wavelengthMin: 700e-9, // 700 nm
    wavelengthMax: 1e-3, // 1 mm
    frequencyMin: 3e11, // 300 GHz
    frequencyMax: 4.3e14, // 430 THz
    energyMin: 1.24e-3, // eV
    energyMax: 1.77, // eV
    description: 'Infrared radiation is heat radiation that we can feel but cannot see.',
    applications: [
      'Night vision equipment',
      'Thermal imaging cameras',
      'Remote controls',
      'Infrared astronomy',
      'Medical thermography',
      'Heat lamps'
    ],
    examples: [
      'Human body temperature corresponds to ~10 μm infrared',
      'TV remote controls use ~940 nm infrared',
      'Thermal cameras detect 8-14 μm infrared'
    ]
  },
  {
    id: 'microwave',
    name: 'Microwaves',
    color: '#4ECDC4',
    wavelengthMin: 1e-3, // 1 mm
    wavelengthMax: 1e-1, // 0.1 m
    frequencyMin: 3e9, // 3 GHz
    frequencyMax: 3e11, // 300 GHz
    energyMin: 1.24e-5, // eV
    energyMax: 1.24e-3, // eV
    description: 'Microwaves are used for cooking food and satellite communications.',
    applications: [
      'Microwave ovens',
      'Satellite communication',
      'GPS systems',
      'Weather radar',
      'Bluetooth technology',
      'Cosmic microwave background radiation detection'
    ],
    examples: [
      'Microwave ovens operate at 2.45 GHz',
      'GPS satellites transmit at 1.2 and 1.6 GHz',
      'The cosmic microwave background peaks around 160 GHz'
    ]
  },
  {
    id: 'radio',
    name: 'Radio Waves',
    color: '#FF6B6B',
    wavelengthMin: 1e-1, // 0.1 m
    wavelengthMax: 1e4, // 10 km (extended for visualization)
    frequencyMin: 3e4, // 30 kHz (extended)
    frequencyMax: 3e9, // 3 GHz
    energyMin: 1.24e-10, // eV
    energyMax: 1.24e-5, // eV
    description: 'Radio waves have the longest wavelengths and lowest energies in the electromagnetic spectrum.',
    applications: [
      'AM/FM radio broadcasting',
      'Television transmission',
      'Cell phone communication',
      'WiFi and Bluetooth',
      'Radio astronomy',
      'Radar systems'
    ],
    examples: [
      'Radio stations broadcast at frequencies around 100 MHz',
      'Cell phones operate around 800-2100 MHz',
      'WiFi uses 2.4 GHz and 5 GHz bands'
    ]
  }
];

// Get spectrum region by wavelength
export function getRegionByWavelength(wavelength) {
  // Handle invalid inputs
  if (!isFinite(wavelength) || wavelength <= 0) {
    return null;
  }

  return SPECTRUM_REGIONS.find(region =>
    wavelength >= region.wavelengthMin && wavelength <= region.wavelengthMax
  ) || null;
}

// Get spectrum region by frequency
export function getRegionByFrequency(frequency) {
  return SPECTRUM_REGIONS.find(region => 
    frequency >= region.frequencyMin && frequency <= region.frequencyMax
  );
}

// Get spectrum region by energy (in eV)
export function getRegionByEnergy(energy) {
  return SPECTRUM_REGIONS.find(region => 
    energy >= region.energyMin && energy <= region.energyMax
  );
}

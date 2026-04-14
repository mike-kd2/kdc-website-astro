// Site Metadata
export const SITE_NAME = 'klauser designs'
export const SITE_DESCRIPTION = 'Automatisierung, massgeschneiderte Tools und Datenlösungen für Verbände und KMUs in der Schweiz'
export const SITE_URL = import.meta.env.PUBLIC_SITE_URL || 'https://klauserdesigns.ch'

// Contact Information
export const CONTACT_EMAIL = import.meta.env.PUBLIC_CONTACT_EMAIL || 'michael@klauserdesigns.ch'
export const CONTACT_PHONE = '+41 79 691 55 98'
export const CONTACT_NAME = 'Michael Klauser'

// External URLs
export const TIDYCAL_URL = import.meta.env.PUBLIC_TIDYCAL_URL || 'https://tidycal.com/klauserdesigns/prozess-check'

// Analytics
export const PLAUSIBLE_DOMAIN = import.meta.env.PUBLIC_PLAUSIBLE_DOMAIN || 'klauserdesigns.ch'

// Social Media (Placeholder - can be added later)
export const SOCIAL_LINKS = {
  linkedin: '',
  github: '',
  twitter: '',
}

// Navigation
export const NAVIGATION_ITEMS = [
  { label: 'Verbände', href: '/verbaende' },
  { label: 'KMUs', href: '/kmu' },
  { label: 'Angebot', href: '/angebot' },
  { label: 'Referenzen', href: '/referenzen' },
  { label: 'Über mich', href: '/ueber-mich' },
]

export const LEGAL_PAGES = [
  { label: 'Impressum', href: '/impressum' },
  { label: 'Datenschutz', href: '/datenschutz' },
]

// Services
export const SERVICES = [
  {
    id: 'automatisierung',
    title: 'Prozesse automatisieren',
    description: 'Wiederkehrende Abläufe, die heute manuell laufen, mache ich automatisch. Import, Export, Validierung, Benachrichtigungen. Sie definieren die Regeln, die Software erledigt den Rest.',
    icon: 'Workflow',
  },
  {
    id: 'tools',
    title: 'Massgeschneiderte Tools entwickeln',
    description: 'Wenn Excel an seine Grenzen stösst und Standard-Software nicht passt, baue ich Ihnen genau das Werkzeug, das Sie brauchen. Keine aufgeblähte Lösung, sondern exakt das, was funktioniert.',
    icon: 'Wrench',
  },
  {
    id: 'daten',
    title: 'Daten nutzbar machen',
    description: 'Sie haben Daten in verschiedenen Systemen, aber keinen Überblick? Ich bringe Struktur rein, verbinde Systeme und schaffe Dashboards, die Ihnen echte Entscheidungsgrundlagen liefern.',
    icon: 'Database',
  },
  {
    id: 'migration',
    title: 'Systeme wechseln, Daten mitnehmen',
    description: 'Sie wechseln Ihr ERP, Ihre Mitgliederverwaltung oder ein anderes System? Ich sorge dafür, dass Ihre Daten sauber, vollständig und validiert im neuen System ankommen.',
    icon: 'RefreshCw',
  },
]

// Process Steps
export const PROCESS_STEPS = [
  {
    id: 1,
    title: 'Verstehen',
    description: 'Wir sprechen über Ihren Alltag. Was nervt? Was dauert zu lange? Wo passieren Fehler? Daraus entsteht ein klares Bild, was automatisiert werden kann und soll.',
  },
  {
    id: 2,
    title: 'Umsetzen',
    description: 'Ich baue die Lösung, teste sie mit Ihnen und passe sie an, bis sie sitzt. Kein Wasserfall-Projekt mit Pflichtenheft, sondern pragmatisches Arbeiten mit regelmässigem Feedback.',
  },
  {
    id: 3,
    title: 'Begleiten',
    description: 'Nach dem Go-Live bleibe ich an Ihrer Seite. Wartung, kleine Anpassungen, Weiterentwicklung. Wenn sich Ihre Anforderungen ändern, wächst die Lösung mit.',
  },
]

// Color Palette (for reference)
export const COLORS = {
  primary: {
    DEFAULT: '#3F4053',
    light: '#5A5B70',
    lighter: '#7E7F96',
  },
  accent: {
    DEFAULT: '#F59E0B',
    dark: '#EA580C',
  },
  neutral: {
    charcoal: '#1F2937',
    slate: '#475569',
    lightGray: '#E2E8F0',
    offWhite: '#F8FAFC',
  },
}

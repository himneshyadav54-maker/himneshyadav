import { PORTFOLIO_CONFIG, PortfolioProject } from '../config/portfolioData';

export type InquiryPathway = 'business' | 'influencer' | 'brand' | 'custom';

export const INQUIRY_MESSAGES: Record<InquiryPathway, string> = {
  business: "Hi Himnesh, I'm interested in your social media and digital marketing services. I'd like to discuss a project.",
  influencer: "Hi Himnesh, I'm a content creator and I'm interested in getting brand collaboration opportunities. I'd love to discuss working with you.",
  brand: "Hi Himnesh, I'm interested in influencer marketing and would like to discuss a brand collaboration campaign.",
  custom: "Hi Himnesh, I came across your portfolio and would like to connect with you.",
};

export const ADMIN_PIN = '152011';

/**
 * Validates the secret admin PIN
 */
export function verifyAdminPin(enteredPin: string): boolean {
  return enteredPin.trim() === ADMIN_PIN;
}

/**
 * Generates a clean WhatsApp click-to-chat URL with prefilled message
 */
export function getWhatsAppUrl(
  pathway: InquiryPathway = 'business',
  customMessage?: string,
  phoneNumber: string = PORTFOLIO_CONFIG.personal.whatsappNumber
): string {
  // Strip non-digit characters except leading plus
  const cleanNumber = phoneNumber.replace(/[^\d+]/g, '').replace(/^\+/, '');
  const message = customMessage?.trim() || INQUIRY_MESSAGES[pathway];
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Calculates creator share and 20% management commission
 */
export function calculateDealBreakdown(dealAmount: number, rate = 0.20): {
  dealAmount: number;
  creatorShare: number;
  managementCommission: number;
  ratePercent: number;
} {
  const safeAmount = Math.max(0, dealAmount || 0);
  const safeRate = Math.min(Math.max(0, rate), 1);
  const managementCommission = Math.round(safeAmount * safeRate);
  const creatorShare = safeAmount - managementCommission;

  return {
    dealAmount: safeAmount,
    creatorShare,
    managementCommission,
    ratePercent: Math.round(safeRate * 100),
  };
}

/**
 * Formats numbers into Indian Rupee or standard currency representation
 */
export function formatCurrencyINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Filters portfolio projects by category or returns all
 */
export function filterProjects(
  projects: PortfolioProject[],
  activeCategory: string
): PortfolioProject[] {
  if (!activeCategory || activeCategory === 'All') {
    return projects;
  }
  return projects.filter((p) => p.category === activeCategory);
}

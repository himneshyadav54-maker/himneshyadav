import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateDealBreakdown,
  getWhatsAppUrl,
  filterProjects,
  verifyAdminPin,
  INQUIRY_MESSAGES,
} from './helpers';
import { PortfolioProject } from '../config/portfolioData';

test('calculateDealBreakdown correctly calculates 20% commission on ₹10,000 deal', () => {
  const result = calculateDealBreakdown(10000, 0.20);
  assert.equal(result.dealAmount, 10000);
  assert.equal(result.creatorShare, 8000);
  assert.equal(result.managementCommission, 2000);
  assert.equal(result.ratePercent, 20);
});

test('calculateDealBreakdown handles custom amounts and boundary conditions', () => {
  const zeroResult = calculateDealBreakdown(0);
  assert.equal(zeroResult.dealAmount, 0);
  assert.equal(zeroResult.creatorShare, 0);
  assert.equal(zeroResult.managementCommission, 0);

  const customResult = calculateDealBreakdown(50000, 0.20);
  assert.equal(customResult.creatorShare, 40000);
  assert.equal(customResult.managementCommission, 10000);
});

test('verifyAdminPin validates 152011 and rejects invalid pins', () => {
  assert.equal(verifyAdminPin('152011'), true);
  assert.equal(verifyAdminPin(' 152011 '), true);
  assert.equal(verifyAdminPin('000000'), false);
  assert.equal(verifyAdminPin(''), false);
});

test('getWhatsAppUrl generates correct link with updated default number 7722983376', () => {
  const url = getWhatsAppUrl('business');
  assert.ok(url.startsWith('https://wa.me/917722983376?text='));
  assert.ok(url.includes(encodeURIComponent(INQUIRY_MESSAGES.business)));
});

test('getWhatsAppUrl generates correct link for brand and influencer pathways', () => {
  const brandUrl = getWhatsAppUrl('brand', undefined, '+917722983376');
  assert.ok(brandUrl.includes(encodeURIComponent(INQUIRY_MESSAGES.brand)));

  const influencerUrl = getWhatsAppUrl('influencer', undefined, '+917722983376');
  assert.ok(influencerUrl.includes(encodeURIComponent(INQUIRY_MESSAGES.influencer)));
});

test('filterProjects correctly filters projects by category', () => {
  const sampleProjects: PortfolioProject[] = [
    {
      id: '1',
      title: 'Video 1',
      category: 'Video Editing',
      tag: 'Reel',
      description: 'Desc',
      mediaType: 'image',
      mediaUrl: '',
      role: 'Editor',
    },
    {
      id: '2',
      title: 'Carousel 1',
      category: 'Instagram Carousel Designs',
      tag: 'Carousel',
      description: 'Desc',
      mediaType: 'image',
      mediaUrl: '',
      role: 'Designer',
    },
  ];

  const all = filterProjects(sampleProjects, 'All');
  assert.equal(all.length, 2);

  const videos = filterProjects(sampleProjects, 'Video Editing');
  assert.equal(videos.length, 1);
  assert.equal(videos[0].id, '1');

  const empty = filterProjects(sampleProjects, 'Influencer Campaigns');
  assert.equal(empty.length, 0);
});

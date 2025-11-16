-- Adding comprehensive product data with real imagery and details
DELETE FROM public.products;
DELETE FROM public.certificates;

-- Insert comprehensive Nutritham products
INSERT INTO public.products (name, description, price, category, image_url, ingredients, benefits, sizes, certifications) VALUES
(
  'Shakara Malt - Premium Nutrition',
  'Traditional Shakara Malt enriched with organic ingredients. Perfect for daily energy boost and immune system support. Made from carefully selected ragi, jaggery, and natural ingredients.',
  450.00,
  'Malt',
  '/products/shakara-malt.jpg',
  ARRAY['Ragi', 'Jaggery', 'Almond', 'Dates Extract', 'Milk Solids', 'Honey'],
  ARRAY['Boosts stamina', 'Enhances immunity', 'Rich in minerals', 'Natural energy', 'Better digestion'],
  ARRAY['500g', '1kg', '2kg'],
  ARRAY['FSSAI', 'ISO 22000', 'Lab Tested']
),
(
  'HerboVita Natural Protein Mix',
  'Herbal nutrition blend with Ashwagandha and natural cocoa. Premium formula designed for daily strength and wellness. Packed with natural ingredients for optimal health.',
  780.00,
  'Protein',
  '/products/herbovita-protein.jpg',
  ARRAY['Wheat Germ', 'Ashwagandha', 'Cocoa', 'Honey', 'Almonds', 'Natural Protein'],
  ARRAY['Herbal nutrition', 'Muscle strength', 'Stress relief', 'Natural protein', 'Energy boost'],
  ARRAY['400g', '800g', '1.5kg'],
  ARRAY['FSSAI', 'NABL', 'Lab Tested']
),
(
  'Nutri Glow Mix - Organic Blend',
  'Certified organic nutrition mix with barley and dried fruits. Complete wellness in every serving. Formulated by nutrition experts for complete daily wellness.',
  520.00,
  'Herbal',
  '/products/nutri-glow.jpg',
  ARRAY['Barley', 'Milk Solids', 'Dried Fruits', 'Honey', 'Natural Spices', 'Turmeric'],
  ARRAY['Glowing skin', 'Daily wellness', 'Organic certified', 'Nutrient-rich', 'Anti-aging benefits'],
  ARRAY['400g', '1kg'],
  ARRAY['FSSAI', 'Organic Certified', 'Lab Tested']
),
(
  'Energy Boost Drink Mix',
  'Natural energy drink mix with B-vitamins and minerals. Perfect for active lifestyle and sports enthusiasts. Quick energy that lasts throughout the day.',
  380.00,
  'Energy',
  '/products/energy-boost.jpg',
  ARRAY['Glucose', 'Natural Electrolytes', 'Citric Acid', 'Honey', 'Vitamins B Complex', 'Minerals'],
  ARRAY['Quick energy', 'Hydration', 'Stamina boost', 'Athletic performance', 'Recovery support'],
  ARRAY['200g', '500g', '1kg'],
  ARRAY['FSSAI', 'Lab Tested']
),
(
  'Immune Shield Wellness Mix',
  'Scientifically formulated with turmeric, ginger and natural immunity boosters. Supports your body natural defense system. Made with 100% natural ingredients.',
  650.00,
  'Health',
  '/products/immune-shield.jpg',
  ARRAY['Turmeric', 'Ginger', 'Tulsi', 'Black Pepper', 'Honey', 'Garlic', 'Clove'],
  ARRAY['Immune booster', 'Anti-inflammatory', 'Natural immunity', 'Daily wellness', 'Respiratory health'],
  ARRAY['300g', '600g', '1kg'],
  ARRAY['FSSAI', 'NABL', 'Lab Tested']
),
(
  'Golden Honey Blend - Premium',
  'Pure golden honey blended with natural herbs for maximum health benefits. Cold-extracted and never heated to preserve all nutrients.',
  890.00,
  'Honey',
  '/products/golden-honey.jpg',
  ARRAY['Pure Honey', 'Propolis', 'Pollen', 'Natural Herbs', 'Royal Jelly'],
  ARRAY['Pure nutrition', 'Energy source', 'Digestive health', 'Cough relief', 'Antioxidants'],
  ARRAY['250g', '500g', '1kg'],
  ARRAY['FSSAI', 'Lab Tested', 'Organic']
),
(
  'AlkaLine Balance Mix',
  'pH balanced nutritional blend for optimal body wellness. Helps maintain alkaline balance with natural ingredients.',
  620.00,
  'Health',
  '/products/alkaline-balance.jpg',
  ARRAY['Wheatgrass', 'Barley Grass', 'Spirulina', 'Chlorella', 'Lemon Extract'],
  ARRAY['pH balance', 'Detoxification', 'Alkaline support', 'Cellular health', 'Energy'],
  ARRAY['300g', '600g'],
  ARRAY['FSSAI', 'ISO', 'Lab Tested']
),
(
  'Choco Almond Delight',
  'Rich chocolate flavor combined with premium almonds for a delicious nutrition boost. Perfect post-workout recovery drink.',
  550.00,
  'Chocolate',
  '/products/choco-almond.jpg',
  ARRAY['Cocoa Powder', 'Almonds', 'Milk Solids', 'Honey', 'Natural Vanilla'],
  ARRAY['Delicious taste', 'Muscle recovery', 'Energy boost', 'Calcium rich', 'Antioxidants'],
  ARRAY['400g', '800g'],
  ARRAY['FSSAI', 'Lab Tested']
),
(
  'Supergreens Detox Mix',
  'Complete greens formula for natural detoxification and energy. All organic, cold-processed for maximum nutrient retention.',
  720.00,
  'Herbal',
  '/products/supergreens.jpg',
  ARRAY['Spinach', 'Kale', 'Broccoli', 'Celery', 'Ginger', 'Lemon'],
  ARRAY['Detoxification', 'Energy', 'Antioxidants', 'Digestion', 'Metabolism boost'],
  ARRAY['300g', '600g'],
  ARRAY['FSSAI', 'Organic', 'Lab Tested']
),
(
  'Night Recovery Formula',
  'Specially designed for night-time use to support deep sleep and muscle recovery. Contains natural relaxing herbs.',
  680.00,
  'Health',
  '/products/night-recovery.jpg',
  ARRAY['Magnesium', 'Ashwagandha', 'Chamomile', 'Valerian Root', 'Honey', 'Milk Solids'],
  ARRAY['Deep sleep', 'Muscle recovery', 'Relaxation', 'Stress relief', 'Morning energy'],
  ARRAY['300g', '600g'],
  ARRAY['FSSAI', 'NABL', 'Lab Tested']
);

-- Insert comprehensive certificates with descriptions
INSERT INTO public.certificates (title, certificate_type, image_url, description) VALUES
(
  'FSSAI Food Safety Certification',
  'FSSAI',
  '/certificates/fssai-cert.jpg',
  'Food Safety and Standards Authority of India certified. Ensures all products meet highest national food safety standards and quality requirements.'
),
(
  'ISO 22000 Quality Management',
  'ISO',
  '/certificates/iso-22000-cert.jpg',
  'International Standard for Food Safety Management Systems. Demonstrates commitment to systematic food safety management and continuous improvement.'
),
(
  'ISO 9001 Quality Assurance',
  'ISO',
  '/certificates/iso-9001-cert.jpg',
  'International Organization for Standardization Quality Management Certification. Ensures consistent quality across all products and processes.'
),
(
  'NABL Laboratory Accreditation',
  'NABL',
  '/certificates/nabl-cert.jpg',
  'National Accreditation Board for Laboratory Testing. Independent verification that our testing facilities meet international standards.'
),
(
  'Lab Tested & Verified - Purity',
  'Lab',
  '/certificates/lab-test-purity.jpg',
  'All products tested for purity in certified laboratories. Third-party verification ensures zero contaminants and maximum quality.'
),
(
  'Lab Tested & Verified - Potency',
  'Lab',
  '/certificates/lab-test-potency.jpg',
  'Complete potency testing ensures all products contain exact ingredient levels as mentioned. Scientific verification of effectiveness.'
),
(
  'Organic Certification',
  'Organic',
  '/certificates/organic-cert.jpg',
  'USDA and India Organic certified products. Sourced from organic farms with zero chemical pesticides or fertilizers.'
),
(
  'Heavy Metals Testing Certificate',
  'Lab',
  '/certificates/heavy-metals-test.jpg',
  'Advanced testing for heavy metals contamination. Ensures complete safety from lead, mercury, and other harmful heavy metals.'
);

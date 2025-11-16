-- Insert sample Nutritham products
INSERT INTO public.products (name, description, price, category, image_url, ingredients, benefits, sizes, certifications) VALUES
(
  'Shakara Malt - Premium Nutrition',
  'Traditional Shakara Malt enriched with organic ingredients. Perfect for daily energy boost and immune system support.',
  450.00,
  'Malt',
  '/placeholder.svg?height=300&width=300',
  ARRAY['Ragi', 'Jaggery', 'Almond', 'Dates Extract', 'Milk Solids'],
  ARRAY['Boosts stamina', 'Enhances immunity', 'Rich in minerals', 'Natural energy'],
  ARRAY['500g', '1kg'],
  ARRAY['FSSAI', 'ISO 22000', 'Lab Tested']
),
(
  'HerboVita Natural Protein Mix',
  'Herbal nutrition blend with Ashwagandha and natural cocoa. Premium formula for daily strength and wellness.',
  780.00,
  'Protein',
  '/placeholder.svg?height=300&width=300',
  ARRAY['Wheat Germ', 'Ashwagandha', 'Cocoa', 'Honey', 'Almonds'],
  ARRAY['Herbal nutrition', 'Muscle strength', 'Stress relief', 'Natural protein'],
  ARRAY['400g', '800g'],
  ARRAY['FSSAI', 'NABL', 'Lab Tested']
),
(
  'Nutri Glow Mix - Organic Blend',
  'Certified organic nutrition mix with barley and dried fruits. Complete wellness in every serving.',
  520.00,
  'Herbal',
  '/placeholder.svg?height=300&width=300',
  ARRAY['Barley', 'Milk Solids', 'Dried Fruits', 'Honey', 'Natural Spices'],
  ARRAY['Glowing skin', 'Daily wellness', 'Organic certified', 'Nutrient-rich'],
  ARRAY['400g', '1kg'],
  ARRAY['FSSAI', 'Organic Certified', 'Lab Tested']
),
(
  'Energy Boost Drink Mix',
  'Natural energy drink mix with B-vitamins and minerals. Perfect for active lifestyle.',
  380.00,
  'Energy',
  '/placeholder.svg?height=300&width=300',
  ARRAY['Glucose', 'Natural Electrolytes', 'Citric Acid', 'Honey', 'Vitamins B Complex'],
  ARRAY['Quick energy', 'Hydration', 'Stamina boost', 'Athletic performance'],
  ARRAY['200g', '500g'],
  ARRAY['FSSAI', 'Lab Tested']
),
(
  'Immune Shield Wellness Mix',
  'Scientifically formulated with turmeric, ginger and natural immunity boosters.',
  650.00,
  'Health',
  '/placeholder.svg?height=300&width=300',
  ARRAY['Turmeric', 'Ginger', 'Tulsi', 'Black Pepper', 'Honey'],
  ARRAY['Immune booster', 'Anti-inflammatory', 'Natural immunity', 'Daily wellness'],
  ARRAY['300g', '600g'],
  ARRAY['FSSAI', 'NABL', 'Lab Tested']
);

-- Insert sample certificates
INSERT INTO public.certificates (title, certificate_type, image_url, description) VALUES
(
  'FSSAI Certification',
  'FSSAI',
  '/placeholder.svg?height=200&width=200',
  'Food Safety and Standards Authority of India certified for highest food safety standards'
),
(
  'ISO 22000 Certified',
  'ISO',
  '/placeholder.svg?height=200&width=200',
  'International Standard for Food Safety Management Systems'
),
(
  'NABL Accredited',
  'NABL',
  '/placeholder.svg?height=200&width=200',
  'National Accreditation Board for Laboratory Testing'
),
(
  'Lab Tested & Verified',
  'Lab',
  '/placeholder.svg?height=200&width=200',
  'All products tested for purity and quality in certified laboratories'
);

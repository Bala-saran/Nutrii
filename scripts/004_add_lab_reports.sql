-- Add lab report URLs and test details to certificates table
UPDATE public.certificates SET 
  pdf_url = 'https://example.com/reports/fssai-report.pdf',
  test_date = '2024-10-15',
  valid_until = '2025-10-14',
  test_details = ARRAY['Microbial contamination: 0 CFU/g', 'Allergens: None detected', 'Moisture content: 8.5%', 'Heavy metals: < 0.1 ppm', 'Aflatoxins: < 2 ppb']
WHERE title = 'FSSAI Food Safety Certification';

UPDATE public.certificates SET 
  pdf_url = 'https://example.com/reports/iso-22000-report.pdf',
  test_date = '2024-09-20',
  valid_until = '2025-09-19',
  test_details = ARRAY['Food safety management system effective', 'All critical control points identified', 'Documentation complete and current', 'Staff training up to date', 'Audit frequency: Annual']
WHERE title = 'ISO 22000 Quality Management';

UPDATE public.certificates SET 
  pdf_url = 'https://example.com/reports/iso-9001-report.pdf',
  test_date = '2024-10-01',
  valid_until = '2025-09-30',
  test_details = ARRAY['Quality objectives achieved', 'Process performance: 99.2%', 'Customer satisfaction: 98.5%', 'Non-conformance rate: 0.8%', 'Continuous improvement: 12 initiatives']
WHERE title = 'ISO 9001 Quality Assurance';

UPDATE public.certificates SET 
  pdf_url = 'https://example.com/reports/nabl-report.pdf',
  test_date = '2024-10-10',
  valid_until = '2025-04-10',
  test_details = ARRAY['Laboratory accreditation: Confirmed', 'Testing equipment calibrated', 'Quality assurance verified', 'Test methods validated', 'Proficiency testing: Passed']
WHERE title = 'NABL Laboratory Accreditation';

UPDATE public.certificates SET 
  pdf_url = 'https://example.com/reports/purity-test.pdf',
  test_date = '2024-10-12',
  valid_until = '2025-10-11',
  test_details = ARRAY['Purity level: 99.8%', 'Foreign matter: 0%', 'Ash content: 3.2%', 'Solubility: 95%', 'Color index: Grade A']
WHERE title = 'Lab Tested & Verified - Purity';

UPDATE public.certificates SET 
  pdf_url = 'https://example.com/reports/potency-test.pdf',
  test_date = '2024-10-12',
  valid_until = '2025-10-11',
  test_details = ARRAY['Active ingredient: 98.5%', 'Bioavailability: 95%', 'Stability: 12 months', 'Efficacy confirmed', 'Shelf life extended']
WHERE title = 'Lab Tested & Verified - Potency';

UPDATE public.certificates SET 
  pdf_url = 'https://example.com/reports/organic-cert.pdf',
  test_date = '2024-09-15',
  valid_until = '2025-09-14',
  test_details = ARRAY['Organic farm certified: Yes', 'Chemical pesticides: None', 'GMO status: Non-GMO verified', 'Soil quality: Excellent', 'Annual inspection passed']
WHERE title = 'Organic Certification';

UPDATE public.certificates SET 
  pdf_url = 'https://example.com/reports/heavy-metals-test.pdf',
  test_date = '2024-10-08',
  valid_until = '2025-10-07',
  test_details = ARRAY['Lead: < 0.05 ppm', 'Mercury: < 0.01 ppm', 'Cadmium: < 0.02 ppm', 'Arsenic: < 0.1 ppm', 'All limits below safety thresholds']
WHERE title = 'Heavy Metals Testing Certificate';

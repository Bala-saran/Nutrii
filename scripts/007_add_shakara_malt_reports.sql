-- Update lab report URLs for Shakara Malt product certifications
-- Note: Upload the lab report PDF to /public/lab-reports/shakara-malt-lab-report.pdf
UPDATE public.certificates SET 
  pdf_url = '/lab-reports/shakara-malt-lab-report.pdf',
  test_date = '2025-11-07',
  valid_until = '2026-11-07',
  test_details = ARRAY[
    'Carbohydrates: 59.61 g/100g',
    'Crude Fat: 2.72 g/100g',
    'Crude Fiber: BDL (DL: 0.10)',
    'Energy: 376.32 kcal/100g',
    'Moisture: 7.76 g/100g',
    'Protein: 28.35 g/100g',
    'Total Ash: 1.56 g/100g',
    'Calcium: 53.27 mg/100g'
  ],
  description = 'Lab Tested & Certified by Global Lab and Consultancy Services (GLCS) - Certified Nutritional Analysis'
WHERE title LIKE '%Lab Tested%' AND certificate_type = 'Lab';

-- Update FSSAI certification with lab report link
UPDATE public.certificates SET 
  pdf_url = '/lab-reports/shakara-malt-lab-report.pdf',
  test_date = '2025-11-07',
  valid_until = '2026-11-07',
  test_details = ARRAY[
    'FSSAI License: Active',
    'Food Safety Standards: Compliant',
    'Nutritional Analysis: Complete',
    'Microbiological Testing: Passed',
    'Accredited Laboratory: GLCS - TC-6060'
  ]
WHERE title = 'FSSAI Food Safety Certification';

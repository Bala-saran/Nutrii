-- Update all certificate PDF URLs to point to the sample lab report
-- These can be easily replaced with individual PDFs later

UPDATE public.certificates SET 
  pdf_url = '/sample-lab-report.pdf'
WHERE title = 'FSSAI Food Safety Certification';

UPDATE public.certificates SET 
  pdf_url = '/sample-lab-report.pdf'
WHERE title = 'ISO 22000 Quality Management';

UPDATE public.certificates SET 
  pdf_url = '/sample-lab-report.pdf'
WHERE title = 'ISO 9001 Quality Assurance';

UPDATE public.certificates SET 
  pdf_url = '/sample-lab-report.pdf'
WHERE title = 'NABL Laboratory Accreditation';

UPDATE public.certificates SET 
  pdf_url = '/sample-lab-report.pdf'
WHERE title = 'Lab Tested & Verified - Purity';

UPDATE public.certificates SET 
  pdf_url = '/sample-lab-report.pdf'
WHERE title = 'Lab Tested & Verified - Potency';

UPDATE public.certificates SET 
  pdf_url = '/sample-lab-report.pdf'
WHERE title = 'Organic Certification';

UPDATE public.certificates SET 
  pdf_url = '/sample-lab-report.pdf'
WHERE title = 'Heavy Metals Testing Certificate';

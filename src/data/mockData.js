// ============================================================
// CoverVerifi Mock Data
// All data structured to mirror Supabase relational tables.
// See supabase/schema-stub.sql for matching CREATE TABLE defs.
// ============================================================

// ---- TABLE: users ----
export const users = [
  {
    id: 'usr-001',
    email: 'dawn@coververifi.com',
    name: 'Dawn Mercer',
    role: 'admin',
    gc_id: null,
    avatar_initials: 'DM',
    created_at: '2025-01-15T08:00:00Z',
    updated_at: '2025-03-20T14:30:00Z',
  },
  {
    id: 'usr-002',
    email: 'mike@treasurevalley.com',
    name: 'Mike Patterson',
    role: 'gc',
    gc_id: 'gc-001',
    avatar_initials: 'MP',
    created_at: '2025-02-01T10:00:00Z',
    updated_at: '2025-03-18T09:00:00Z',
  },
  {
    id: 'usr-003',
    email: 'sarah@boisebuild.com',
    name: 'Sarah Langston',
    role: 'gc',
    gc_id: 'gc-002',
    avatar_initials: 'SL',
    created_at: '2025-02-10T11:00:00Z',
    updated_at: '2025-03-22T16:45:00Z',
  },
  {
    id: 'usr-004',
    email: 'demo@coververifi.com',
    name: 'Demo User',
    role: 'gc',
    gc_id: 'gc-003',
    avatar_initials: 'DU',
    created_at: '2025-03-01T08:00:00Z',
    updated_at: '2025-03-01T08:00:00Z',
  },
];

// ---- TABLE: general_contractors ----
export const generalContractors = [
  {
    id: 'gc-001',
    company_name: 'Treasure Valley Builders',
    contact_name: 'Mike Patterson',
    email: 'mike@treasurevalley.com',
    phone: '(208) 555-0142',
    address: '1420 W Main St, Boise, ID 83702',
    license_number: 'RCE-38921',
    status: 'active',
    additional_insured_required: true,
    email_template_config: { logo_url: null, accent_color: '#1e40af' },
    created_at: '2025-02-01T10:00:00Z',
    updated_at: '2025-03-18T09:00:00Z',
  },
  {
    id: 'gc-002',
    company_name: 'Boise Build Group',
    contact_name: 'Sarah Langston',
    email: 'sarah@boisebuild.com',
    phone: '(208) 555-0287',
    address: '890 S Capitol Blvd, Boise, ID 83702',
    license_number: 'RCE-41055',
    status: 'active',
    additional_insured_required: true,
    email_template_config: { logo_url: null, accent_color: '#047857' },
    created_at: '2025-02-10T11:00:00Z',
    updated_at: '2025-03-22T16:45:00Z',
  },
  {
    id: 'gc-003',
    company_name: 'Eagle Mountain Construction',
    contact_name: 'James Whitfield',
    email: 'james@eaglemtn.com',
    phone: '(208) 555-0319',
    address: '2250 E Fairview Ave, Meridian, ID 83642',
    license_number: 'RCE-29874',
    status: 'active',
    additional_insured_required: false,
    email_template_config: { logo_url: null, accent_color: '#7c3aed' },
    created_at: '2025-01-20T09:00:00Z',
    updated_at: '2025-03-15T11:30:00Z',
  },
  {
    id: 'gc-004',
    company_name: 'Clearwater Contractors',
    contact_name: 'Lisa Fernandez',
    email: 'lisa@clearwaterco.com',
    phone: '(208) 555-0456',
    address: '310 N 8th St, Boise, ID 83702',
    license_number: 'RCE-33210',
    status: 'inactive',
    additional_insured_required: true,
    email_template_config: { logo_url: null, accent_color: '#dc2626' },
    created_at: '2025-01-05T08:00:00Z',
    updated_at: '2025-02-28T14:00:00Z',
  },
];

// ---- TABLE: subcontractors ----
export const subcontractors = [
  {
    id: 'sub-001',
    company_name: 'Gem State Electric',
    contact_name: 'Randy Holloway',
    email: 'randy@gemstateelectric.com',
    phone: '(208) 555-0501',
    address: '445 S Orchard St, Boise, ID 83705',
    trade: 'Electrical',
    w9_file_url: '/files/w9/gem-state-electric-w9.pdf',
    sole_proprietor: false,
    w9_expiration: '2026-01-15',
    status: 'active',
    created_at: '2025-02-05T10:00:00Z',
    updated_at: '2025-03-20T08:00:00Z',
  },
  {
    id: 'sub-002',
    company_name: 'Mountain West Plumbing',
    contact_name: 'Carlos Medina',
    email: 'carlos@mwplumbing.com',
    phone: '(208) 555-0512',
    address: '1600 W State St, Boise, ID 83702',
    trade: 'Plumbing',
    w9_file_url: '/files/w9/mountain-west-plumbing-w9.pdf',
    sole_proprietor: false,
    w9_expiration: '2026-02-20',
    status: 'active',
    created_at: '2025-02-08T09:00:00Z',
    updated_at: '2025-03-18T14:30:00Z',
  },
  {
    id: 'sub-003',
    company_name: 'Snake River Concrete',
    contact_name: 'Tom Blackwell',
    email: 'tom@snakeriverconcrete.com',
    phone: '(208) 555-0523',
    address: '780 E 1st St, Meridian, ID 83642',
    trade: 'Concrete',
    w9_file_url: '/files/w9/snake-river-concrete-w9.pdf',
    sole_proprietor: false,
    w9_expiration: '2025-12-01',
    status: 'active',
    created_at: '2025-01-20T11:00:00Z',
    updated_at: '2025-03-15T10:00:00Z',
  },
  {
    id: 'sub-004',
    company_name: 'Pioneer Framing LLC',
    contact_name: 'Jake Sorensen',
    email: 'jake@pioneerframing.com',
    phone: '(208) 555-0534',
    address: '955 N Cole Rd, Boise, ID 83704',
    trade: 'Framing',
    w9_file_url: '/files/w9/pioneer-framing-w9.pdf',
    sole_proprietor: false,
    w9_expiration: '2026-03-15',
    status: 'active',
    created_at: '2025-02-12T08:00:00Z',
    updated_at: '2025-03-22T11:00:00Z',
  },
  {
    id: 'sub-005',
    company_name: 'Davis Drywall & Finishing',
    contact_name: 'Mark Davis',
    email: 'mark@davisdrywall.com',
    phone: '(208) 555-0545',
    address: '340 E 37th St, Garden City, ID 83714',
    trade: 'Drywall',
    w9_file_url: null,
    sole_proprietor: true,
    w9_expiration: null,
    status: 'pending',
    created_at: '2025-03-01T14:00:00Z',
    updated_at: '2025-03-01T14:00:00Z',
  },
  {
    id: 'sub-006',
    company_name: 'Boise Valley HVAC',
    contact_name: 'Andrea Chen',
    email: 'andrea@bvhvac.com',
    phone: '(208) 555-0556',
    address: '2100 S Vista Ave, Boise, ID 83705',
    trade: 'HVAC',
    w9_file_url: '/files/w9/boise-valley-hvac-w9.pdf',
    sole_proprietor: false,
    w9_expiration: '2026-01-30',
    status: 'active',
    created_at: '2025-02-15T10:00:00Z',
    updated_at: '2025-03-21T09:00:00Z',
  },
  {
    id: 'sub-007',
    company_name: 'Intermountain Roofing',
    contact_name: 'Derek Nash',
    email: 'derek@intermountainroof.com',
    phone: '(208) 555-0567',
    address: '4025 W Chinden Blvd, Garden City, ID 83714',
    trade: 'Roofing',
    w9_file_url: '/files/w9/intermountain-roofing-w9.pdf',
    sole_proprietor: false,
    w9_expiration: '2026-04-10',
    status: 'active',
    created_at: '2025-01-28T08:00:00Z',
    updated_at: '2025-03-19T16:00:00Z',
  },
  {
    id: 'sub-008',
    company_name: 'Sawtooth Painting Co.',
    contact_name: 'Maria Gonzalez',
    email: 'maria@sawtoothpainting.com',
    phone: '(208) 555-0578',
    address: '515 W Myrtle St, Boise, ID 83702',
    trade: 'Painting',
    w9_file_url: '/files/w9/sawtooth-painting-w9.pdf',
    sole_proprietor: false,
    w9_expiration: '2025-11-20',
    status: 'active',
    created_at: '2025-02-20T12:00:00Z',
    updated_at: '2025-03-22T10:00:00Z',
  },
  {
    id: 'sub-009',
    company_name: 'Owyhee Excavation',
    contact_name: 'Bill Turner',
    email: 'bill@owyheeexcavation.com',
    phone: '(208) 555-0589',
    address: '6800 W Emerald St, Boise, ID 83704',
    trade: 'Excavation',
    w9_file_url: '/files/w9/owyhee-excavation-w9.pdf',
    sole_proprietor: false,
    w9_expiration: '2026-05-01',
    status: 'active',
    created_at: '2025-01-10T09:00:00Z',
    updated_at: '2025-03-17T13:00:00Z',
  },
  {
    id: 'sub-010',
    company_name: 'High Desert Masonry',
    contact_name: 'Pete Sandoval',
    email: 'pete@highdesertmasonry.com',
    phone: '(208) 555-0590',
    address: '1230 E Ustick Rd, Meridian, ID 83646',
    trade: 'Masonry',
    w9_file_url: null,
    sole_proprietor: true,
    w9_expiration: null,
    status: 'pending',
    created_at: '2025-03-10T10:00:00Z',
    updated_at: '2025-03-10T10:00:00Z',
  },
];

// ---- TABLE: gc_subcontractor (junction) ----
export const gcSubcontractorLinks = [
  { id: 'gcsl-001', gc_id: 'gc-001', sub_id: 'sub-001', additional_insured_on_file: true, subcontract_agreement_url: '/files/agreements/tv-gem.pdf', status: 'active', created_at: '2025-02-05T10:00:00Z' },
  { id: 'gcsl-002', gc_id: 'gc-001', sub_id: 'sub-002', additional_insured_on_file: true, subcontract_agreement_url: '/files/agreements/tv-mwp.pdf', status: 'active', created_at: '2025-02-08T09:00:00Z' },
  { id: 'gcsl-003', gc_id: 'gc-001', sub_id: 'sub-003', additional_insured_on_file: false, subcontract_agreement_url: null, status: 'active', created_at: '2025-02-10T11:00:00Z' },
  { id: 'gcsl-004', gc_id: 'gc-001', sub_id: 'sub-004', additional_insured_on_file: true, subcontract_agreement_url: '/files/agreements/tv-pf.pdf', status: 'active', created_at: '2025-02-12T08:00:00Z' },
  { id: 'gcsl-005', gc_id: 'gc-001', sub_id: 'sub-005', additional_insured_on_file: false, subcontract_agreement_url: null, status: 'pending', created_at: '2025-03-01T14:00:00Z' },
  { id: 'gcsl-006', gc_id: 'gc-002', sub_id: 'sub-001', additional_insured_on_file: true, subcontract_agreement_url: '/files/agreements/bb-gem.pdf', status: 'active', created_at: '2025-02-15T10:00:00Z' },
  { id: 'gcsl-007', gc_id: 'gc-002', sub_id: 'sub-006', additional_insured_on_file: true, subcontract_agreement_url: '/files/agreements/bb-bvh.pdf', status: 'active', created_at: '2025-02-15T10:00:00Z' },
  { id: 'gcsl-008', gc_id: 'gc-002', sub_id: 'sub-007', additional_insured_on_file: false, subcontract_agreement_url: null, status: 'active', created_at: '2025-02-18T09:00:00Z' },
  { id: 'gcsl-009', gc_id: 'gc-002', sub_id: 'sub-008', additional_insured_on_file: true, subcontract_agreement_url: '/files/agreements/bb-sp.pdf', status: 'active', created_at: '2025-02-20T12:00:00Z' },
  { id: 'gcsl-010', gc_id: 'gc-003', sub_id: 'sub-003', additional_insured_on_file: false, subcontract_agreement_url: null, status: 'active', created_at: '2025-02-22T08:00:00Z' },
  { id: 'gcsl-011', gc_id: 'gc-003', sub_id: 'sub-007', additional_insured_on_file: false, subcontract_agreement_url: null, status: 'active', created_at: '2025-02-25T10:00:00Z' },
  { id: 'gcsl-012', gc_id: 'gc-003', sub_id: 'sub-009', additional_insured_on_file: false, subcontract_agreement_url: null, status: 'active', created_at: '2025-01-28T08:00:00Z' },
  { id: 'gcsl-013', gc_id: 'gc-003', sub_id: 'sub-010', additional_insured_on_file: false, subcontract_agreement_url: null, status: 'pending', created_at: '2025-03-10T10:00:00Z' },
];

// ---- TABLE: insurance_agents ----
export const insuranceAgents = [
  {
    id: 'agt-001',
    name: 'Patricia Weaver',
    agency_name: 'Idaho Premier Insurance',
    email: 'patricia@idahopremier.com',
    phone: '(208) 555-0601',
    address: '300 W Bannock St, Boise, ID 83702',
    created_at: '2025-01-15T08:00:00Z',
    updated_at: '2025-03-20T14:30:00Z',
  },
  {
    id: 'agt-002',
    name: 'Robert Kimball',
    agency_name: 'Treasure Valley Risk Group',
    email: 'rkimball@tvriskg.com',
    phone: '(208) 555-0612',
    address: '1050 W Idaho St, Boise, ID 83702',
    created_at: '2025-01-20T09:00:00Z',
    updated_at: '2025-03-18T11:00:00Z',
  },
  {
    id: 'agt-003',
    name: 'Diane Cho',
    agency_name: 'Mountain Insurance Associates',
    email: 'diane@mountainins.com',
    phone: '(208) 555-0623',
    address: '2450 E Overland Rd, Meridian, ID 83642',
    created_at: '2025-02-01T10:00:00Z',
    updated_at: '2025-03-22T09:00:00Z',
  },
  {
    id: 'agt-004',
    name: 'Kevin O\'Brien',
    agency_name: 'Snake River Insurance',
    email: 'kobrien@snakeriverins.com',
    phone: '(208) 555-0634',
    address: '780 N Milwaukee St, Boise, ID 83704',
    created_at: '2025-02-10T11:00:00Z',
    updated_at: '2025-03-19T15:00:00Z',
  },
  {
    id: 'agt-005',
    name: 'Jennifer Hart',
    agency_name: 'Gem State Coverage',
    email: 'jhart@gemstatecov.com',
    phone: '(208) 555-0645',
    address: '410 S Eagle Rd, Eagle, ID 83616',
    created_at: '2025-02-15T14:00:00Z',
    updated_at: '2025-03-21T10:00:00Z',
  },
];

// ---- TABLE: insurance_policies ----
export const insurancePolicies = [
  // Gem State Electric — WC
  {
    id: 'pol-001', sub_id: 'sub-001', agent_id: 'agt-001', type: 'WC',
    carrier: 'State Insurance Fund', policy_number: 'WC-2025-88412',
    effective_date: '2025-01-01', expiration_date: '2026-01-01',
    coverage_amount: 'Statutory', employer_liability: 500000,
    certificate_url: '/files/certs/gem-wc-2025.pdf',
    status: 'compliant', created_at: '2025-01-15T08:00:00Z', updated_at: '2025-03-20T14:30:00Z',
  },
  // Gem State Electric — GL
  {
    id: 'pol-002', sub_id: 'sub-001', agent_id: 'agt-001', type: 'GL',
    carrier: 'Hartford Financial', policy_number: 'GL-2025-55201',
    effective_date: '2025-01-01', expiration_date: '2026-01-01',
    coverage_amount: 1000000, aggregate: 2000000,
    certificate_url: '/files/certs/gem-gl-2025.pdf',
    status: 'compliant', created_at: '2025-01-15T08:00:00Z', updated_at: '2025-03-20T14:30:00Z',
  },
  // Mountain West Plumbing — WC
  {
    id: 'pol-003', sub_id: 'sub-002', agent_id: 'agt-002', type: 'WC',
    carrier: 'State Insurance Fund', policy_number: 'WC-2025-71023',
    effective_date: '2025-02-01', expiration_date: '2026-02-01',
    coverage_amount: 'Statutory', employer_liability: 500000,
    certificate_url: '/files/certs/mwp-wc-2025.pdf',
    status: 'compliant', created_at: '2025-02-08T09:00:00Z', updated_at: '2025-03-18T14:30:00Z',
  },
  // Mountain West Plumbing — GL
  {
    id: 'pol-004', sub_id: 'sub-002', agent_id: 'agt-002', type: 'GL',
    carrier: 'Travelers Insurance', policy_number: 'GL-2025-63890',
    effective_date: '2025-02-01', expiration_date: '2026-02-01',
    coverage_amount: 1000000, aggregate: 2000000,
    certificate_url: '/files/certs/mwp-gl-2025.pdf',
    status: 'compliant', created_at: '2025-02-08T09:00:00Z', updated_at: '2025-03-18T14:30:00Z',
  },
  // Snake River Concrete — WC (expiring soon)
  {
    id: 'pol-005', sub_id: 'sub-003', agent_id: 'agt-003', type: 'WC',
    carrier: 'SAIF Corporation', policy_number: 'WC-2024-44150',
    effective_date: '2024-05-01', expiration_date: '2025-05-01',
    coverage_amount: 'Statutory', employer_liability: 500000,
    certificate_url: '/files/certs/src-wc-2024.pdf',
    status: 'expiring', created_at: '2025-01-20T11:00:00Z', updated_at: '2025-03-15T10:00:00Z',
  },
  // Snake River Concrete — GL (expired!)
  {
    id: 'pol-006', sub_id: 'sub-003', agent_id: 'agt-003', type: 'GL',
    carrier: 'Liberty Mutual', policy_number: 'GL-2024-29001',
    effective_date: '2024-03-15', expiration_date: '2025-03-15',
    coverage_amount: 1000000, aggregate: 2000000,
    certificate_url: '/files/certs/src-gl-2024.pdf',
    status: 'expired', created_at: '2025-01-20T11:00:00Z', updated_at: '2025-03-16T08:00:00Z',
  },
  // Pioneer Framing — WC
  {
    id: 'pol-007', sub_id: 'sub-004', agent_id: 'agt-004', type: 'WC',
    carrier: 'State Insurance Fund', policy_number: 'WC-2025-92311',
    effective_date: '2025-03-01', expiration_date: '2026-03-01',
    coverage_amount: 'Statutory', employer_liability: 500000,
    certificate_url: '/files/certs/pf-wc-2025.pdf',
    status: 'compliant', created_at: '2025-02-12T08:00:00Z', updated_at: '2025-03-22T11:00:00Z',
  },
  // Pioneer Framing — GL
  {
    id: 'pol-008', sub_id: 'sub-004', agent_id: 'agt-004', type: 'GL',
    carrier: 'CNA Insurance', policy_number: 'GL-2025-81004',
    effective_date: '2025-03-01', expiration_date: '2026-03-01',
    coverage_amount: 1000000, aggregate: 2000000,
    certificate_url: '/files/certs/pf-gl-2025.pdf',
    status: 'compliant', created_at: '2025-02-12T08:00:00Z', updated_at: '2025-03-22T11:00:00Z',
  },
  // Davis Drywall — sole prop, WC exempt, no policies
  // Boise Valley HVAC — WC
  {
    id: 'pol-009', sub_id: 'sub-006', agent_id: 'agt-005', type: 'WC',
    carrier: 'State Insurance Fund', policy_number: 'WC-2025-10288',
    effective_date: '2025-01-15', expiration_date: '2026-01-15',
    coverage_amount: 'Statutory', employer_liability: 500000,
    certificate_url: '/files/certs/bvh-wc-2025.pdf',
    status: 'compliant', created_at: '2025-02-15T10:00:00Z', updated_at: '2025-03-21T09:00:00Z',
  },
  // Boise Valley HVAC — GL
  {
    id: 'pol-010', sub_id: 'sub-006', agent_id: 'agt-005', type: 'GL',
    carrier: 'Zurich Insurance', policy_number: 'GL-2025-47612',
    effective_date: '2025-01-15', expiration_date: '2026-01-15',
    coverage_amount: 1000000, aggregate: 2000000,
    certificate_url: '/files/certs/bvh-gl-2025.pdf',
    status: 'compliant', created_at: '2025-02-15T10:00:00Z', updated_at: '2025-03-21T09:00:00Z',
  },
  // Intermountain Roofing — WC (expiring)
  {
    id: 'pol-011', sub_id: 'sub-007', agent_id: 'agt-001', type: 'WC',
    carrier: 'State Insurance Fund', policy_number: 'WC-2024-66501',
    effective_date: '2024-06-01', expiration_date: '2025-06-01',
    coverage_amount: 'Statutory', employer_liability: 500000,
    certificate_url: '/files/certs/ir-wc-2024.pdf',
    status: 'expiring', created_at: '2025-01-28T08:00:00Z', updated_at: '2025-03-19T16:00:00Z',
  },
  // Intermountain Roofing — GL
  {
    id: 'pol-012', sub_id: 'sub-007', agent_id: 'agt-001', type: 'GL',
    carrier: 'Hartford Financial', policy_number: 'GL-2025-39800',
    effective_date: '2025-01-01', expiration_date: '2026-01-01',
    coverage_amount: 1000000, aggregate: 2000000,
    certificate_url: '/files/certs/ir-gl-2025.pdf',
    status: 'compliant', created_at: '2025-01-28T08:00:00Z', updated_at: '2025-03-19T16:00:00Z',
  },
  // Sawtooth Painting — WC
  {
    id: 'pol-013', sub_id: 'sub-008', agent_id: 'agt-003', type: 'WC',
    carrier: 'SAIF Corporation', policy_number: 'WC-2025-55780',
    effective_date: '2025-04-01', expiration_date: '2026-04-01',
    coverage_amount: 'Statutory', employer_liability: 500000,
    certificate_url: '/files/certs/sp-wc-2025.pdf',
    status: 'compliant', created_at: '2025-02-20T12:00:00Z', updated_at: '2025-03-22T10:00:00Z',
  },
  // Sawtooth Painting — GL
  {
    id: 'pol-014', sub_id: 'sub-008', agent_id: 'agt-003', type: 'GL',
    carrier: 'Nationwide Insurance', policy_number: 'GL-2025-72015',
    effective_date: '2025-04-01', expiration_date: '2026-04-01',
    coverage_amount: 1000000, aggregate: 2000000,
    certificate_url: '/files/certs/sp-gl-2025.pdf',
    status: 'compliant', created_at: '2025-02-20T12:00:00Z', updated_at: '2025-03-22T10:00:00Z',
  },
  // Owyhee Excavation — WC
  {
    id: 'pol-015', sub_id: 'sub-009', agent_id: 'agt-004', type: 'WC',
    carrier: 'State Insurance Fund', policy_number: 'WC-2025-33412',
    effective_date: '2025-01-01', expiration_date: '2026-01-01',
    coverage_amount: 'Statutory', employer_liability: 500000,
    certificate_url: '/files/certs/oe-wc-2025.pdf',
    status: 'compliant', created_at: '2025-01-10T09:00:00Z', updated_at: '2025-03-17T13:00:00Z',
  },
  // Owyhee Excavation — GL
  {
    id: 'pol-016', sub_id: 'sub-009', agent_id: 'agt-004', type: 'GL',
    carrier: 'Travelers Insurance', policy_number: 'GL-2025-18744',
    effective_date: '2025-01-01', expiration_date: '2026-01-01',
    coverage_amount: 1000000, aggregate: 2000000,
    certificate_url: '/files/certs/oe-gl-2025.pdf',
    status: 'compliant', created_at: '2025-01-10T09:00:00Z', updated_at: '2025-03-17T13:00:00Z',
  },
];

// ---- TABLE: verification_requests ----
export const verificationRequests = [
  {
    id: 'vr-001', policy_id: 'pol-005', agent_id: 'agt-003',
    token: 'tok_abc123def456', status: 'pending',
    requested_at: '2025-03-20T09:00:00Z', responded_at: null,
    response_type: null, created_at: '2025-03-20T09:00:00Z',
  },
  {
    id: 'vr-002', policy_id: 'pol-006', agent_id: 'agt-003',
    token: 'tok_ghi789jkl012', status: 'pending',
    requested_at: '2025-03-16T10:00:00Z', responded_at: null,
    response_type: null, created_at: '2025-03-16T10:00:00Z',
  },
  {
    id: 'vr-003', policy_id: 'pol-001', agent_id: 'agt-001',
    token: 'tok_mno345pqr678', status: 'confirmed',
    requested_at: '2025-03-01T08:00:00Z', responded_at: '2025-03-01T14:22:00Z',
    response_type: 'confirmed', created_at: '2025-03-01T08:00:00Z',
  },
  {
    id: 'vr-004', policy_id: 'pol-002', agent_id: 'agt-001',
    token: 'tok_stu901vwx234', status: 'confirmed',
    requested_at: '2025-03-01T08:00:00Z', responded_at: '2025-03-01T14:25:00Z',
    response_type: 'confirmed', created_at: '2025-03-01T08:00:00Z',
  },
  {
    id: 'vr-005', policy_id: 'pol-011', agent_id: 'agt-001',
    token: 'tok_yza567bcd890', status: 'pending',
    requested_at: '2025-03-22T11:00:00Z', responded_at: null,
    response_type: null, created_at: '2025-03-22T11:00:00Z',
  },
  {
    id: 'vr-006', policy_id: 'pol-007', agent_id: 'agt-004',
    token: 'tok_efg123hij456', status: 'uploaded',
    requested_at: '2025-02-28T09:00:00Z', responded_at: '2025-03-01T10:15:00Z',
    response_type: 'uploaded', created_at: '2025-02-28T09:00:00Z',
  },
];

// ---- TABLE: email_log ----
export const emailLog = [
  { id: 'em-001', to: 'patricia@idahopremier.com', template_type: 'verification_request', gc_id: 'gc-001', sub_id: 'sub-001', sent_at: '2025-03-01T08:00:00Z', status: 'opened' },
  { id: 'em-002', to: 'rkimball@tvriskg.com', template_type: 'verification_request', gc_id: 'gc-001', sub_id: 'sub-002', sent_at: '2025-03-05T09:30:00Z', status: 'sent' },
  { id: 'em-003', to: 'diane@mountainins.com', template_type: 'expiration_warning', gc_id: 'gc-001', sub_id: 'sub-003', sent_at: '2025-03-15T07:00:00Z', status: 'opened' },
  { id: 'em-004', to: 'diane@mountainins.com', template_type: 'verification_request', gc_id: 'gc-001', sub_id: 'sub-003', sent_at: '2025-03-16T10:00:00Z', status: 'clicked' },
  { id: 'em-005', to: 'kobrien@snakeriverins.com', template_type: 'verification_request', gc_id: 'gc-001', sub_id: 'sub-004', sent_at: '2025-02-28T09:00:00Z', status: 'clicked' },
  { id: 'em-006', to: 'mike@treasurevalley.com', template_type: 'lapse_notification', gc_id: 'gc-001', sub_id: 'sub-003', sent_at: '2025-03-16T08:00:00Z', status: 'opened' },
  { id: 'em-007', to: 'jhart@gemstatecov.com', template_type: 'verification_request', gc_id: 'gc-002', sub_id: 'sub-006', sent_at: '2025-03-10T09:00:00Z', status: 'sent' },
  { id: 'em-008', to: 'patricia@idahopremier.com', template_type: 'expiration_warning', gc_id: 'gc-002', sub_id: 'sub-007', sent_at: '2025-03-22T07:00:00Z', status: 'sent' },
  { id: 'em-009', to: 'patricia@idahopremier.com', template_type: 'verification_request', gc_id: 'gc-002', sub_id: 'sub-007', sent_at: '2025-03-22T11:00:00Z', status: 'sent' },
  { id: 'em-010', to: 'dawn@coververifi.com', template_type: 'lapse_notification', gc_id: null, sub_id: 'sub-003', sent_at: '2025-03-16T08:05:00Z', status: 'opened' },
];

// ---- TABLE: audit_trail ----
export const auditTrail = [
  { id: 'at-001', entity_type: 'subcontractor', entity_id: 'sub-001', action: 'created', user_id: 'usr-001', details: 'Onboarded Gem State Electric', timestamp: '2025-02-05T10:00:00Z' },
  { id: 'at-002', entity_type: 'policy', entity_id: 'pol-001', action: 'verified', user_id: 'usr-001', details: 'WC coverage confirmed by agent', timestamp: '2025-03-01T14:22:00Z' },
  { id: 'at-003', entity_type: 'policy', entity_id: 'pol-006', action: 'expired', user_id: null, details: 'GL policy expired — auto-detected', timestamp: '2025-03-16T00:00:00Z' },
  { id: 'at-004', entity_type: 'subcontractor', entity_id: 'sub-005', action: 'created', user_id: 'usr-002', details: 'Onboarded Davis Drywall (sole prop)', timestamp: '2025-03-01T14:00:00Z' },
  { id: 'at-005', entity_type: 'verification', entity_id: 'vr-006', action: 'uploaded', user_id: null, details: 'Agent uploaded new cert for Pioneer Framing WC', timestamp: '2025-03-01T10:15:00Z' },
  { id: 'at-006', entity_type: 'gc', entity_id: 'gc-004', action: 'deactivated', user_id: 'usr-001', details: 'Clearwater Contractors set to inactive', timestamp: '2025-02-28T14:00:00Z' },
  { id: 'at-007', entity_type: 'email', entity_id: 'em-003', action: 'sent', user_id: 'usr-001', details: 'Expiration warning sent for Snake River Concrete GL', timestamp: '2025-03-15T07:00:00Z' },
  { id: 'at-008', entity_type: 'subcontractor', entity_id: 'sub-006', action: 'created', user_id: 'usr-003', details: 'Onboarded Boise Valley HVAC', timestamp: '2025-02-15T10:00:00Z' },
];

// ---- Idaho compliance defaults ----
export const idahoComplianceDefaults = {
  gl_per_occurrence: 1000000,
  gl_aggregate: 2000000,
  wc_coverage: 'Statutory',
  wc_employer_liability: 500000,
  sole_proprietor_wc_exempt: true,
  sole_proprietor_wc_statute: 'Idaho Code §72-212(4)',
  statutory_employer_statute: 'Idaho Code §72-216',
  additional_insured_note: 'A certificate of insurance statement alone does NOT confer additional insured rights. An actual policy endorsement is required per Idaho case law.',
};

// ---- Notification templates ----
export const emailTemplates = [
  {
    id: 'tpl-001',
    type: 'verification_request',
    name: 'Coverage Verification Request',
    subject: 'Action Required: Verify Insurance Coverage for {{sub_name}}',
    preview: 'Please verify that coverage is current for {{sub_name}}, Policy #{{policy_number}}.',
  },
  {
    id: 'tpl-002',
    type: 'expiration_warning',
    name: '30-Day Expiration Warning',
    subject: 'Insurance Expiring Soon: {{sub_name}} - {{policy_type}}',
    preview: 'The {{policy_type}} policy for {{sub_name}} expires on {{expiration_date}}.',
  },
  {
    id: 'tpl-003',
    type: 'lapse_notification',
    name: 'Coverage Lapse Alert',
    subject: 'URGENT: Coverage Lapsed - {{sub_name}} {{policy_type}}',
    preview: '{{sub_name}}\'s {{policy_type}} policy (#{{policy_number}}) has expired as of {{expiration_date}}.',
  },
];

// ---- Dashboard summary stats (computed helpers) ----
export function computeDashboardStats(gcId = null) {
  const relevantLinks = gcId
    ? gcSubcontractorLinks.filter(l => l.gc_id === gcId)
    : gcSubcontractorLinks;

  const relevantSubIds = [...new Set(relevantLinks.map(l => l.sub_id))];
  const relevantPolicies = insurancePolicies.filter(p => relevantSubIds.includes(p.sub_id));

  const compliant = relevantPolicies.filter(p => p.status === 'compliant').length;
  const expiringSoon = relevantPolicies.filter(p => p.status === 'expiring').length;
  const expired = relevantPolicies.filter(p => p.status === 'expired').length;
  const total = relevantPolicies.length;
  const missing = relevantSubIds.length * 2 - total; // each sub should have WC + GL

  return {
    totalSubcontractors: relevantSubIds.length,
    totalPolicies: total,
    compliant,
    expiringSoon,
    expired,
    missing: missing > 0 ? missing : 0,
    complianceRate: total > 0 ? Math.round((compliant / (total + (missing > 0 ? missing : 0))) * 100) : 0,
  };
}

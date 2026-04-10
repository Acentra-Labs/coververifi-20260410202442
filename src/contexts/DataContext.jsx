import { createContext, useContext, useState, useCallback } from 'react';
import {
  generalContractors as gcData,
  subcontractors as subData,
  insuranceAgents as agentData,
  insurancePolicies as policyData,
  gcSubcontractorLinks as linkData,
  verificationRequests as vrData,
  emailLog as emailData,
  auditTrail as auditData,
  emailTemplates,
  idahoComplianceDefaults,
  computeDashboardStats,
} from '../data/mockData';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [generalContractors, setGeneralContractors] = useState(gcData);
  const [subcontractors, setSubcontractors] = useState(subData);
  const [agents, setAgents] = useState(agentData);
  const [policies, setPolicies] = useState(policyData);
  const [gcSubLinks, setGcSubLinks] = useState(linkData);
  const [verifications, setVerifications] = useState(vrData);
  const [emails, setEmails] = useState(emailData);
  const [audit, setAudit] = useState(auditData);

  const getSubsForGC = useCallback((gcId) => {
    const subIds = gcSubLinks.filter(l => l.gc_id === gcId).map(l => l.sub_id);
    return subcontractors.filter(s => subIds.includes(s.id));
  }, [gcSubLinks, subcontractors]);

  const getPoliciesForSub = useCallback((subId) => {
    return policies.filter(p => p.sub_id === subId);
  }, [policies]);

  const getAgentForPolicy = useCallback((agentId) => {
    return agents.find(a => a.id === agentId);
  }, [agents]);

  const getGCSubLink = useCallback((gcId, subId) => {
    return gcSubLinks.find(l => l.gc_id === gcId && l.sub_id === subId);
  }, [gcSubLinks]);

  const getVerificationsForPolicy = useCallback((policyId) => {
    return verifications.filter(v => v.policy_id === policyId);
  }, [verifications]);

  const getEmailsForSub = useCallback((subId) => {
    return emails.filter(e => e.sub_id === subId);
  }, [emails]);

  const addSubcontractor = useCallback((sub) => {
    const newSub = { ...sub, id: `sub-${String(subcontractors.length + 1).padStart(3, '0')}`, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
    setSubcontractors(prev => [...prev, newSub]);
    return newSub;
  }, [subcontractors]);

  const addGCSubLink = useCallback((gcId, subId) => {
    const newLink = {
      id: `gcsl-${String(gcSubLinks.length + 1).padStart(3, '0')}`,
      gc_id: gcId,
      sub_id: subId,
      additional_insured_on_file: false,
      subcontract_agreement_url: null,
      status: 'active',
      created_at: new Date().toISOString(),
    };
    setGcSubLinks(prev => [...prev, newLink]);
    return newLink;
  }, [gcSubLinks]);

  const addVerificationRequest = useCallback((policyId, agentId) => {
    const newVr = {
      id: `vr-${String(verifications.length + 1).padStart(3, '0')}`,
      policy_id: policyId,
      agent_id: agentId,
      token: `tok_${Math.random().toString(36).slice(2, 14)}`,
      status: 'pending',
      requested_at: new Date().toISOString(),
      responded_at: null,
      response_type: null,
      created_at: new Date().toISOString(),
    };
    setVerifications(prev => [...prev, newVr]);

    const policy = policies.find(p => p.id === policyId);
    const agent = agents.find(a => a.id === agentId);
    if (agent && policy) {
      const newEmail = {
        id: `em-${String(emails.length + 1).padStart(3, '0')}`,
        to: agent.email,
        template_type: 'verification_request',
        gc_id: null,
        sub_id: policy.sub_id,
        sent_at: new Date().toISOString(),
        status: 'sent',
      };
      setEmails(prev => [...prev, newEmail]);
    }
    return newVr;
  }, [verifications, policies, agents, emails]);

  const addGC = useCallback((gc) => {
    const newGC = {
      ...gc,
      id: `gc-${String(generalContractors.length + 1).padStart(3, '0')}`,
      status: 'active',
      email_template_config: { logo_url: null, accent_color: '#3b82f6' },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setGeneralContractors(prev => [...prev, newGC]);
    return newGC;
  }, [generalContractors]);

  const updateGC = useCallback((gcId, updates) => {
    setGeneralContractors(prev => prev.map(gc =>
      gc.id === gcId ? { ...gc, ...updates, updated_at: new Date().toISOString() } : gc
    ));
  }, []);

  const addAuditEntry = useCallback((entry) => {
    const newEntry = {
      ...entry,
      id: `at-${String(audit.length + 1).padStart(3, '0')}`,
      timestamp: new Date().toISOString(),
    };
    setAudit(prev => [...prev, newEntry]);
  }, [audit]);

  const value = {
    generalContractors,
    subcontractors,
    agents,
    policies,
    gcSubLinks,
    verifications,
    emails,
    audit,
    emailTemplates,
    idahoComplianceDefaults,
    computeDashboardStats,
    getSubsForGC,
    getPoliciesForSub,
    getAgentForPolicy,
    getGCSubLink,
    getVerificationsForPolicy,
    getEmailsForSub,
    addSubcontractor,
    addGCSubLink,
    addVerificationRequest,
    addGC,
    updateGC,
    addAuditEntry,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}

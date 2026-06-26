import { AgentSchema, type Agent } from './types';

const raw: Agent[] = [
  {
    id: 'a1',
    name: 'Layla Hassan',
    initials: 'LH',
    role: 'Senior Property Advisor',
    languages: ['Arabic', 'English', 'French'],
    phone: '+971501234567',
    whatsapp: '971501234567',
  },
  {
    id: 'a2',
    name: 'Omar Farouk',
    initials: 'OF',
    role: 'Investment Director',
    languages: ['Arabic', 'English'],
    phone: '+971501234568',
    whatsapp: '971501234568',
  },
  {
    id: 'a3',
    name: 'Sara Khan',
    initials: 'SK',
    role: 'Luxury Homes Specialist',
    languages: ['English', 'Urdu', 'Hindi'],
    phone: '+971501234569',
    whatsapp: '971501234569',
  },
  {
    id: 'a4',
    name: 'Daniel Reyes',
    initials: 'DR',
    role: 'International Sales',
    languages: ['English', 'Spanish', 'Portuguese'],
    phone: '+971501234570',
    whatsapp: '971501234570',
  },
];

export const agents: Agent[] = raw.map((a) => AgentSchema.parse(a));

export function getAgentById(id: string): Agent {
  const agent = agents.find((a) => a.id === id);
  if (!agent) throw new Error(`Unknown agent id: ${id}`);
  return agent;
}

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
    avatar: '/images/agent-layla.jpg',
  },
  {
    id: 'a2',
    name: 'Omar Farouk',
    initials: 'OF',
    role: 'Investment Director',
    languages: ['Arabic', 'English'],
    phone: '+971501234568',
    whatsapp: '971501234568',
    avatar: '/images/agent-omar.jpg',
  },
  {
    id: 'a3',
    name: 'Sara Khan',
    initials: 'SK',
    role: 'Luxury Homes Specialist',
    languages: ['English', 'Urdu', 'Hindi'],
    phone: '+971501234569',
    whatsapp: '971501234569',
    avatar: '/images/agent-sara.jpg',
  },
  {
    id: 'a4',
    name: 'Daniel Reyes',
    initials: 'DR',
    role: 'International Sales',
    languages: ['English', 'Spanish', 'Portuguese'],
    phone: '+971501234570',
    whatsapp: '971501234570',
    avatar: '/images/agent-daniel.jpg',
  },
];

export const agents: Agent[] = raw.map((a) => AgentSchema.parse(a));

export function getAgentById(id: string): Agent {
  const agent = agents.find((a) => a.id === id);
  if (!agent) throw new Error(`Unknown agent id: ${id}`);
  return agent;
}

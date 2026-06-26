import {
  Award,
  Users,
  Building2,
  MapPin,
  Gem,
  LineChart,
  HeartHandshake,
  LifeBuoy,
  Eye,
  Sparkles,
  Home,
  Tag,
  KeyRound,
  TrendingUp,
  ClipboardCheck,
  Landmark,
  type LucideIcon,
  HelpCircle,
} from 'lucide-react';

const map: Record<string, LucideIcon> = {
  Award,
  Users,
  Building2,
  MapPin,
  Gem,
  LineChart,
  HeartHandshake,
  LifeBuoy,
  Eye,
  Sparkles,
  Home,
  Tag,
  KeyRound,
  TrendingUp,
  ClipboardCheck,
  Landmark,
};

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = map[name] ?? HelpCircle;
  return <Cmp className={className} aria-hidden />;
}

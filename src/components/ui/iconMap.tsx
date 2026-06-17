import type { SVGProps } from 'react';
import {
  BookOpen,
  Stethoscope,
  Bowl,
  HomeIcon,
  Sparkles,
  Users,
  HandHeart,
  GraduationCap,
  Droplet,
  Heart,
  Shield,
  Globe,
  Target,
  Eye,
  Compass,
  Leaf,
  Star,
} from '@/components/ui/icons';

export type IconKey =
  | 'education'
  | 'healthcare'
  | 'nutrition'
  | 'shelter'
  | 'skills'
  | 'community'
  | 'care'
  | 'graduation'
  | 'water'
  | 'heart'
  | 'shield'
  | 'globe'
  | 'target'
  | 'eye'
  | 'compass'
  | 'leaf'
  | 'star';

export const iconMap: Record<IconKey, (p: SVGProps<SVGSVGElement>) => JSX.Element> = {
  education: BookOpen,
  healthcare: Stethoscope,
  nutrition: Bowl,
  shelter: HomeIcon,
  skills: Sparkles,
  community: Users,
  care: HandHeart,
  graduation: GraduationCap,
  water: Droplet,
  heart: Heart,
  shield: Shield,
  globe: Globe,
  target: Target,
  eye: Eye,
  compass: Compass,
  leaf: Leaf,
  star: Star,
};

export function Icon({ name, ...props }: { name: IconKey } & SVGProps<SVGSVGElement>) {
  const Cmp = iconMap[name];
  return <Cmp {...props} />;
}

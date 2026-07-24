import {
  Alarm,
  Bell,
  CalendarBlank,
  ChartLineUp,
  ChatCircle,
  Check,
  Cloud,
  Compass,
  Fire,
  FlowerLotus,
  GearSix,
  Heart,
  House,
  Lightbulb,
  MagnifyingGlass,
  MoonStars,
  NotePencil,
  Pause,
  Play,
  Plus,
  Star,
  Target,
  TrendUp,
  UserCircle,
  Waves,
  X,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon as PhosphorIcon, IconWeight } from "@phosphor-icons/react";

/**
 * The curated ORBA icon set: Phosphor icons under ORBA names.
 * Outline (light) is the default voice; fill is reserved for active states.
 */
export const ORBA_ICONS = {
  home: House,
  focus: Target,
  meditate: FlowerLotus,
  breathe: Cloud,
  sleep: MoonStars,
  reflect: ChatCircle,
  journal: NotePencil,
  journey: Compass,
  progress: TrendUp,
  insights: Lightbulb,
  streak: Fire,
  calendar: CalendarBlank,
  reminder: Alarm,
  notification: Bell,
  profile: UserCircle,
  settings: GearSix,
  search: MagnifyingGlass,
  heart: Heart,
  star: Star,
  waves: Waves,
  chart: ChartLineUp,
  play: Play,
  pause: Pause,
  add: Plus,
  check: Check,
  close: X,
} as const satisfies Record<string, PhosphorIcon>;

export type OrbaIconName = keyof typeof ORBA_ICONS;

export const ICON_SIZES = [16, 20, 24, 32] as const;
export type IconSize = (typeof ICON_SIZES)[number];

export function Icon({
  name,
  size = 20,
  weight = "light",
  className,
}: {
  name: OrbaIconName;
  size?: IconSize;
  weight?: IconWeight;
  className?: string;
}) {
  const Component = ORBA_ICONS[name];
  return <Component size={size} weight={weight} className={className} />;
}

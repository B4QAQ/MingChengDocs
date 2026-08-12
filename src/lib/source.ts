import { docs } from "fumadocs-mdx:collections/server";
import { createElement } from "react";
import { loader } from "fumadocs-core/source";
import {
  ArchiveIcon,
  BookOpenIcon,
  BracketsCurlyIcon,
  BroadcastIcon,
  ClockIcon,
  CloudIcon,
  CodeIcon,
  ConfettiIcon,
  CpuIcon,
  CreditCardIcon,
  DownloadIcon,
  EnvelopeSimpleIcon,
  FileCodeIcon,
  FileTextIcon,
  HardDriveIcon,
  IdentificationCardIcon,
  KeyIcon,
  LinkSimpleHorizontalIcon,
  MagicWandIcon,
  MegaphoneIcon,
  MusicNotesIcon,
  PlugChargingIcon,
  PlugIcon,
  PuzzlePieceIcon,
  RocketIcon,
  ShieldIcon,
  SunIcon,
  UsersIcon,
  WatchIcon,
  WrenchIcon,
} from "@phosphor-icons/react/dist/ssr";

const docIcons = {
  Archive: ArchiveIcon,
  BookOpen: BookOpenIcon,
  Braces: BracketsCurlyIcon,
  Broadcast: BroadcastIcon,
  Clock: ClockIcon,
  Cloud: CloudIcon,
  Code: CodeIcon,
  Confetti: ConfettiIcon,
  Cpu: CpuIcon,
  CreditCard: CreditCardIcon,
  Download: DownloadIcon,
  Envelope: EnvelopeSimpleIcon,
  EnvelopeSimple: EnvelopeSimpleIcon,
  FileCode: FileCodeIcon,
  FileText: FileTextIcon,
  HardDrive: HardDriveIcon,
  HardDriveDownload: HardDriveIcon,
  IdentificationCard: IdentificationCardIcon,
  IdCard: IdentificationCardIcon,
  Key: KeyIcon,
  Link2: LinkSimpleHorizontalIcon,
  LinkSimpleHorizontal: LinkSimpleHorizontalIcon,
  MagicWand: MagicWandIcon,
  Mail: EnvelopeSimpleIcon,
  Megaphone: MegaphoneIcon,
  MusicNotes: MusicNotesIcon,
  PartyPopper: ConfettiIcon,
  Plug: PlugIcon,
  Plug2: PlugIcon,
  PlugCharging: PlugChargingIcon,
  PlugZap: PlugChargingIcon,
  PuzzlePiece: PuzzlePieceIcon,
  Rocket: RocketIcon,
  Router: BroadcastIcon,
  Shield: ShieldIcon,
  SquareCode: FileCodeIcon,
  Sun: SunIcon,
  Users: UsersIcon,
  WandSparkles: MagicWandIcon,
  Watch: WatchIcon,
  Wrench: WrenchIcon,
} as const;

export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
  i18n: {
    defaultLanguage: "zh-CN",
    languages: ["zh-CN"],
    hideLocale: "always",
  },
  icon(icon) {
    if (!icon) return;

    const Icon = docIcons[icon as keyof typeof docIcons];
    if (!Icon) return;

    return createElement(Icon, {
      className: "ab-doc-icon",
      size: 16,
    });
  },
});

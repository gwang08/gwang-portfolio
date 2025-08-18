import dynamic from "next/dynamic";
import {
  BiUser as AboutIcon,
  BiCollection as ProjectIcon,
  BiCategory as DashboardIcon,
  BiBook as ContactIcon,
} from "react-icons/bi";
import { PiChatTeardropDotsBold as ChatRoomIcon } from "react-icons/pi";
import { PiCertificate as AchievementIcon } from "react-icons/pi";

import ChatPreview from "@/modules/home/components/Bento/ChatPreview";
import MarqueeIcons from "@/modules/home/components/Bento/MarqueeIcons";
import AchievementFolder from "@/modules/home/components/Bento/AchievementFolder";

import { BentoConfigProps } from "../types/bento";

const AnimatedListProject = dynamic(() => import("@/modules/home/components/Bento/AnimatedListProject"), { ssr: false });
const StackImagesPersonal = dynamic(() => import("@/modules/home/components/Bento/StackImagesPersonal"), { ssr: false });
const TrueFocusService = dynamic(() => import("@/modules/home/components/Bento/TrueFocusService"), { ssr: false });

const size = 22;

export const BENTO_CONFIG: BentoConfigProps[] = [
  {
    titleKey: "projects.title",
    descriptionKey: "projects.description",
    label: "Projects",
    icon: <ProjectIcon size={size} />,
    visual: <AnimatedListProject />,
    href: "/projects",
    colSpan: 2,
    className: "from-pink-500 to-rose-500",
    isShow: true,
  },
  {
    titleKey: "about.title",
    descriptionKey: "about.description",
    label: "About",
    icon: <AboutIcon size={size} />,
    visual: <StackImagesPersonal />,
    href: "/about",
    colSpan: 1,
    className: "from-indigo-500 to-purple-500",
    isShow: true,
  },
  {
    titleKey: "skills.title",
    descriptionKey: "skills.description",
    label: "Stack",
    icon: <DashboardIcon size={size} />,
    visual: <MarqueeIcons />,
    href: "/",
    colSpan: 1,
    className: "from-emerald-400 to-green-600",
    isShow: true,
  },
  {
    titleKey: "achievements.title",
    descriptionKey: "achievements.description",
    label: "Achievements",
    icon: <AchievementIcon size={size} />,
    visual: <AchievementFolder />,
    href: "/achievements",
    colSpan: 1,
    className: "from-yellow-400 to-orange-500",
    isShow: true,
  },
  {
    titleKey: "chat.title",
    descriptionKey: "chat.description",
    label: "Chat",
    icon: <ChatRoomIcon size={size} />,
    visual: <ChatPreview />,
    href: "/smart-talk",
    colSpan: 1,
    className: "from-gray-700 to-gray-900",
    isShow: true,
  },
  {
    titleKey: "services.title",
    descriptionKey: "services.description",
    label: "Services",
    icon: <ContactIcon size={size} />,
    visual: <TrueFocusService />,
    href: "/",
    colSpan: 2,
    className: "from-cyan-400 to-blue-600",
    isShow: true,
  },
];

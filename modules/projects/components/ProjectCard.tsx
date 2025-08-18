
import Link from "next/link";
import { HiOutlineArrowSmRight as ViewIcon } from "react-icons/hi";
import { useTranslations } from "next-intl";
import { TbPinnedFilled as PinIcon } from "react-icons/tb";
import { useState } from "react";
import { useLocale } from "next-intl";
import Image from "@/common/components/elements/Image";
import SpotlightCard from "@/common/components/elements/SpotlightCard";
import { ProjectItem } from "@/common/types/projects";
import { STACKS } from "@/common/constants/stacks";


const MAX_STACKS = 5;

const ProjectCard = ({
  title,
  slug,
  description,
  image,
  stacks,
  is_featured,
  link_github,
}: ProjectItem) => {
  const t = useTranslations("ProjectsPage");
  const locale = useLocale();
  const [showAllStacks, setShowAllStacks] = useState(false);

  const currentDescription = t(`projects.${slug}.description`);

  const visibleStacks = showAllStacks ? stacks : stacks.slice(0, MAX_STACKS);
  const hiddenCount = stacks.length - MAX_STACKS;

  const projectUrl = link_github ? link_github : `/projects/${slug}`;
  const isExternal = Boolean(link_github);

  return (
    <a href={projectUrl} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined}>
      <SpotlightCard className="group relative cursor-pointer min-h-[420px] flex flex-col justify-between">
        {is_featured && (
          <div className="absolute right-0 top-0 z-10 flex items-center gap-x-1 rounded-bl-lg rounded-tr-lg bg-cyan-500 px-2 py-1 text-sm font-medium text-neutral-900">
            <PinIcon size={15} />
            <span>Featured</span>
          </div>
        )}
        <div className="relative">
          <Image
            src={image}
            alt={title}
            width={450}
            height={200}
            className={`h-[350px] w-full rounded-t-xl ${slug === "ghepxe" || slug === "ghepxemobile" ? "object-contain bg-white p-2" : "object-cover"}`}
          />
          <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center gap-1 rounded-t-xl bg-black text-sm font-medium text-neutral-50 opacity-0 transition-opacity duration-300 group-hover:opacity-80">
            <span>{isExternal ? t("view_on_github") : t("view_project")}</span>
            <ViewIcon size={20} />
          </div>
        </div>
        <div className="space-y-2 p-5 flex flex-col justify-between h-full">
          <h3 className="cursor-pointer text-lg text-neutral-700 transition-all duration-300 dark:text-neutral-300">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
            {currentDescription}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2 relative min-h-[40px]">
            {/* Hiển thị stack icon/chữ */}
            {visibleStacks.map((stack: string, index: number) => {
              // Normalize key cho MongoDb/MongoDB, TailwindCSS/Tailwind Css, v.v.
              let stackKey = stack;
              if (stackKey === "MongoDb" || stackKey === "MongoDB") stackKey = "MongoDb";
              if (stackKey === "Tailwind CSS" || stackKey === "TailwindCSS") stackKey = "TailwindCSS";
              if (stackKey === "Next.js" || stackKey === "NextJS") stackKey = "Next.js";
              if (stackKey === "ASP.NET Core") stackKey = "ASP.NET Core";
              const stackData = STACKS[stackKey];
              if (stackData) {
                return (
                  <div key={index} className={`flex items-center justify-center ${stackData.color}`} title={stackKey}>
                    {stackData.icon}
                  </div>
                );
              }
              return (
                <div key={index} className="text-neutral-500">
                  <span className="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded">
                    {stack}
                  </span>
                </div>
              );
            })}
            {hiddenCount > 0 && !showAllStacks && (
              <button
                type="button"
                className="text-xs px-2 py-1 bg-neutral-200 dark:bg-neutral-700 rounded hover:bg-neutral-300 dark:hover:bg-neutral-600 transition"
                onClick={e => {
                  e.preventDefault();
                  setShowAllStacks(true);
                }}
                title={stacks.slice(MAX_STACKS).join(", ")}
              >
                +{hiddenCount} ...
              </button>
            )}
            {/* Overlay hiển thị toàn bộ stack, không làm thay đổi kích thước card */}
            {showAllStacks && (
              <div className="absolute left-0 top-0 z-20 w-full min-w-[200px] bg-white dark:bg-neutral-900 rounded shadow-lg p-3 flex flex-wrap gap-2" style={{ minHeight: 40 }}>
                {stacks.map((stack: string, index: number) => {
                  let stackKey = stack;
                  if (stackKey === "MongoDb" || stackKey === "MongoDB") stackKey = "MongoDb";
                  if (stackKey === "Tailwind CSS" || stackKey === "TailwindCSS") stackKey = "TailwindCSS";
                  if (stackKey === "Next.js" || stackKey === "NextJS") stackKey = "Next.js";
                  if (stackKey === "ASP.NET Core") stackKey = "ASP.NET Core";
                  const stackData = STACKS[stackKey];
                  if (stackData) {
                    return (
                      <div key={index} className={`flex items-center justify-center ${stackData.color}`} title={stackKey}>
                        {stackData.icon}
                      </div>
                    );
                  }
                  return (
                    <div key={index} className="text-neutral-500">
                      <span className="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded">
                        {stack}
                      </span>
                    </div>
                  );
                })}
                <button
                  type="button"
                  className="text-xs px-2 py-1 bg-neutral-200 dark:bg-neutral-700 rounded hover:bg-neutral-300 dark:hover:bg-neutral-600 transition ml-2"
                  onClick={e => {
                    e.preventDefault();
                    setShowAllStacks(false);
                  }}
                >
                  Ẩn bớt
                </button>
              </div>
            )}
          </div>
        </div>
      </SpotlightCard>
  </a>
  );
};

export default ProjectCard;

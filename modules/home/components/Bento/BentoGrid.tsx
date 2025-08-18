import BentoCard from "./BentoCard";
import { SiBento as BentoIcon } from "react-icons/si";
import { useTranslations } from "next-intl";

import SectionHeading from "@/common/components/elements/SectionHeading";
import SectionSubHeading from "@/common/components/elements/SectionSubHeading";
import { BENTO_CONFIG } from "@/common/constants/bento";
import { BentoItemProps } from "@/common/types/bento";

const BentoGrid = () => {
  const t = useTranslations("HomePage.bento");

  const filteredBento = BENTO_CONFIG.filter((item) => item?.isShow);

  // Convert BENTO_CONFIG to BENTO with translated text
  const bentoItems: BentoItemProps[] = filteredBento.map((item) => ({
    title: t(item.titleKey),
    description: t(item.descriptionKey),
    label: item.label,
    icon: item.icon,
    visual: item.visual,
    href: item.href,
    colSpan: item.colSpan,
    className: item.className,
    isShow: item.isShow,
  }));

  return (
    <section className="space-y-5">
      <div className="space-y-3">
        <SectionHeading title={t("title")} icon={<BentoIcon size={24} />} />
        <SectionSubHeading>{t("sub_title")}</SectionSubHeading>
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
        {bentoItems.map((item, index) => (
          <BentoCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

export default BentoGrid;

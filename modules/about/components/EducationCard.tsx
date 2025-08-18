import Image from "next/image";
import { BsBuildings as CompanyIcon } from "react-icons/bs";
import { useTranslations } from "next-intl";

import { EducationProps } from "@/common/types/education";
import SpotlightCard from "@/common/components/elements/SpotlightCard";

const EducationCard = ({
  school,
  major,
  logo,
  degree,
  start_year,
  end_year,
  link,
  location,
  translationKey,
}: EducationProps) => {
  const t = useTranslations('Education');

  // Get translated content
  const translatedSchool = translationKey ? t(`${translationKey}.school`) : school;
  const translatedMajor = translationKey ? t(`${translationKey}.major`) : major;
  const translatedLocation = translationKey ? t(`${translationKey}.location`) : location;
  const translatedDegree = translationKey ? t(`${translationKey}.degree`) : degree;

  return (
    <SpotlightCard className="flex items-start gap-5 p-6">
      {logo ? (
        <Image width={70} height={70} src={logo} alt={translatedSchool} />
      ) : (
        <CompanyIcon size={65} />
      )}

      <div className="space-y-1">
        <a href={link || "#"} target="_blank">
          <h6>{translatedSchool}</h6>
        </a>
        <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
          <div className="flex flex-col gap-1 md:flex-row md:gap-2">
            <span>{translatedDegree}</span>
            <span className="hidden text-neutral-300 dark:text-neutral-700 md:block">
              •
            </span>
            <span>{translatedMajor}</span>
          </div>
          <div className="flex flex-col gap-1 text-[12px] md:flex-row md:gap-2">
            <span className="dark:text-neutral-500">
              {start_year} - {end_year}
            </span>
            <span className="hidden rounded-full text-neutral-300 dark:text-neutral-700 md:block">
              •
            </span>
            <span>{translatedLocation}</span>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
};

export default EducationCard;

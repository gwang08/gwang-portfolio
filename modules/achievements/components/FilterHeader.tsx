import { useTranslations } from "next-intl";
import ComboBoxFilter from "./ComboBoxFilter";
import InputSearch from "./InputSearch";

interface FilterHeaderProps {
  totalData?: number;
}

const FilterHeader = ({ totalData }: FilterHeaderProps) => {
  const t = useTranslations("AchievementsPage");
  
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex w-full flex-col items-center justify-between space-y-4 md:flex-row">
        <InputSearch />
        <ComboBoxFilter />
      </div>
      <div className="ml-1 text-sm text-neutral-500 dark:text-neutral-400">
        {t("total")}: {totalData}
      </div>
    </div>
  );
};

export default FilterHeader;

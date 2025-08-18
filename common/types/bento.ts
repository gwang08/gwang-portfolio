export type BentoItemProps = {
  title: string;
  description: string;
  label?: string;
  icon?: JSX.Element;
  visual?: React.ReactNode;
  href?: string;
  colSpan?: number;
  className?: string;
  isShow?: boolean;
};

export type BentoConfigProps = {
  titleKey: string;
  descriptionKey: string;
  label?: string;
  icon?: JSX.Element;
  visual?: React.ReactNode;
  href?: string;
  colSpan?: number;
  className?: string;
  isShow?: boolean;
};

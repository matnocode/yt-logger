import { FC, ReactNode } from "react";

interface Props {
  title: ReactNode;
  content: ReactNode;
}

const FaqItem: FC<Props> = ({ content, title }) => {
  return (
    <div className="tw-border tw-rounded-lg tw-bg-slate-100 hover:tw-bg-slate-200 tw-px-2">
      <div className="tw-text-2xl">{title}</div>
      <div className="tw-px-1 tw-text-lg tw-font-light">{content}</div>
    </div>
  );
};

export default FaqItem;

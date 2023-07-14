import { FC } from "react";
import { IconProps } from "../../types";

const Icon: FC<IconProps> = ({
  name,
  isLoading = false,
  isTruncate = false,
  children,
}) => {
  return (
    <div className="flex items-center gap-1">
      <span
        className={`material-symbols-rounded${
          isLoading ? " animate-spin" : ""
        }`}
      >
        {isLoading ? "rotate_right" : name}
      </span>
      {children && (
        <div
          className={`whitespace-nowrap${
            isTruncate ? " max-w-[15ch] truncate" : ""
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Icon;
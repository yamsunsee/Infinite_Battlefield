import { FC } from "react";
import { ButtonProps } from "../../types";
import Icon from "./Icon";

const Button: FC<ButtonProps> = ({
  name,
  disabled,
  action,
  size = "NORMAL",
  stretch = false,
  children,
}) => {
  return (
    <button
      className={`button${disabled ? " disabled" : ""}${
        size === "SMALL" ? " small" : ""
      }${stretch ? " stretch" : ""}`}
      onClick={action}
    >
      <Icon name={name}>{children}</Icon>
    </button>
  );
};

export default Button;

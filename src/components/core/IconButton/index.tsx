import type { FC } from "react";

import type { ButtonProps } from "react-html-props";

import style from "./index.module.scss";

export const IconButton: FC<ButtonProps> = ({ className, ...rest }) => (
  <button classNames={[style.button, className]} type="button" {...rest} />
);

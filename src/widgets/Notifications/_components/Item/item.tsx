import type { FC } from "react";

import { TYPED_ICON } from "./constants";

import type { ItemProps } from "./types";

import style from "./item.module.scss";

export const Item: FC<ItemProps> = ({ type, text }) => {
  const Icon = TYPED_ICON[type];

  return (
    <div className={style.item}>
      <Icon className={style[type]} />

      <span>{text}</span>
    </div>
  );
};

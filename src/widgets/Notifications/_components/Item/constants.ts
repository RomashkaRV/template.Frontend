import type { FC } from "react";
import type { SVGProps } from "react-html-props";

import type { ItemType } from "./types";

import {
  IconCheckCircle,
  IconDangerCircle,
  IconDazeCircle
} from "../../../../components/icons";

export const TYPED_ICON: Record<ItemType, FC<SVGProps>> = {
  success: IconCheckCircle,
  error: IconDazeCircle,
  warning: IconDangerCircle
};

export type ItemType = "error" | "warning" | "success";

export type ItemProps = {
  type: ItemType;
  text: string;
};

import { TICons } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { Control, FieldValues } from "react-hook-form";

export interface InputPropsType {
  error: boolean;
  control: Control<FieldValues, any> | undefined;
  placeholder?: string;
  icon?: keyof TICons;
}
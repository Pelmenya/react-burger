import { Control, FieldValues } from "react-hook-form";

export interface InputPropsType {
  error: boolean;
  control: Control<FieldValues, any> | undefined;
  placeholder?: string;
}
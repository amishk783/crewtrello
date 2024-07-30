import { formData } from ".";

export interface Option {
  id: string | number;
  [key: string]: any;
}
export interface SelectorProps<T extends Option> {
  title: string;
  icon: string;
  defaultValue?: string;
  options: T[];
  onChange: (selectedOption: T | null) => void;
}
export interface OptionsType {
  title: string;
  icon: string;
  options: Option[];
}

export interface ExtendedFormData extends formData {
  status?: string;
  priority?: string;
}

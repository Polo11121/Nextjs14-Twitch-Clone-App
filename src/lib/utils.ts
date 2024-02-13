import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import stc from "string-to-color";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const stringToColor = (str: string) => stc(str);

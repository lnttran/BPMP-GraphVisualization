import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// fetcher.ts
export const fetcher = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`An error occurred while fetching the data: ${response.statusText}`);
  }

  const data: T = await response.json();
  return data;
};
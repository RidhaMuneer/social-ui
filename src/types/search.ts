// react
import { Dispatch, SetStateAction } from "react";

export type SearchProps<T> = {
  type: string;
  setResults: Dispatch<SetStateAction<T[] | undefined>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

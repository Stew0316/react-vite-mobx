import { useDictStore } from "@/store/dict";

const useDict = (key) => {
  const dict = useDictStore((state) => state.dict[key]);

  return dict;
};

export default useDict;

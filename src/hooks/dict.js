import { useDictStore } from "@/store/dict";

export const useDictArray = (key) => {
  const dict = useDictStore((state) => state.dictArrObject[key]);
  return dict || [];
};

export const useDictObj = (key) => {
  const dict = useDictStore((state) => state.dictMapObject[key]);
  return dict || {};
};

export const useDictObjAndList = (key) => {
  const dict = useDictStore((state) => {
    return {
      map: state.dictMapObject[key],
      list: state.dictArrObject[key],
    };
  });
  return dict || { map: {}, list: [] };
};

export default {
  useDictArray,
  useDictObj,
  useDictObjAndList,
};

export const SOURCE_SYSTEM_DEFAULT = "self";

export const SOURCE_SYSTEM_MAP = {
  self: "本系统",
};

export const SOURCE_SYSTEM_OPTIONS = Object.keys(SOURCE_SYSTEM_MAP).map(
  (key) => ({
    label: SOURCE_SYSTEM_MAP[key],
    value: key,
  }),
);

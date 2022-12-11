export const JSONParse = (str: string | null) => {
  try {
    return str ? JSON.parse(str) : str;
  } catch (e) {
    return str;
  }
};

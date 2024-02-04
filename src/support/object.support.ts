export const compareObject = (query: Record<string, any>, target: Object): boolean => {
  const match: boolean = Object.entries(query).every(([key, value]) => {
    return target[key] === value;
  });

  return match;
};

export const copyObject = (target) => {
  if (!target) {
    return target;
  }

  return JSON.parse(JSON.stringify(target));
};
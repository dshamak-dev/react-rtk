import { IResource } from "src/models/resource.model";
import { randomNumber } from "src/support/random.support";

export const generateResource = (
  type: IResource["type"],
  { min = 1, max = 1, fixed }: { fixed?: number, min?: number; max?: number }
): IResource => {
  const value = fixed ? fixed : randomNumber(min, max, true);

  return { type, value }
};

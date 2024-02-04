import { describe, expect, test } from "@jest/globals";
import { appendItems } from "src/namespaces/item/item.control";
import { IItem } from "src/namespaces/item/item.model";

const mockedPotion: IItem = {
  id: "potion-1",
  title: "Potion 1",
  type: "potion",
  category: "consumable",
  quantity: 2,
};

describe("Item", () => {
  test("should append to empty list", () => {
    const items: IItem[] = appendItems([], [mockedPotion]);

    expect(items.length).toBe(1);
    expect(items[0].id).toBe(mockedPotion.id);
    expect(items[0].quantity).toBe(mockedPotion.quantity);
  });
});

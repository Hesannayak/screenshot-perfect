import { describe, expect, it } from "vitest";
import { journeyChapter, observerPayment } from "./payment-illustration";

describe("illustrative observer visibility", () => {
  it("shows the fictional amount and asset in public mode", () => {
    expect(observerPayment("public")).toEqual({ sender: "0x71c4…a209", recipient: "0x8f3a…c21e", amount: "250.00", asset: "USDC" });
  });
  it("masks all four details in the illustrated private relayer transfer", () => {
    expect(observerPayment("private")).toEqual({ sender: "Shielded", recipient: "Shielded", amount: "Encrypted", asset: "Encrypted" });
  });
  it("keeps scroll chapters bounded at the start and end", () => {
    expect(journeyChapter(-1)).toBe(0);
    expect(journeyChapter(0.5)).toBe(1);
    expect(journeyChapter(1)).toBe(2);
  });
});
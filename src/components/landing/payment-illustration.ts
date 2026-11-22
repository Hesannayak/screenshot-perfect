export type PaymentMode = "public" | "private";

// Fictional transaction, used only to explain observer visibility.
export const examplePayment = {
  sender: "0x71c4…a209",
  recipient: "0x8f3a…c21e",
  asset: "USDC",
  amount: "250.00",
};

export function observerPayment(mode: PaymentMode) {
  if (mode === "private") {
    return { sender: "Shielded", recipient: "Shielded", asset: "Encrypted", amount: "Encrypted" };
  }
  return examplePayment;
}

export function journeyChapter(progress: number) {
  return Math.min(2, Math.max(0, Math.floor(progress * 3)));
}
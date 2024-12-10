import { customAlphabet } from "nanoid";

export function generateVerificationCode(): string {
  const generateCode = customAlphabet("123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 6);
  return generateCode();
}

export function generateEventCode(
  amount: string | number | undefined | null
): string {
  // Mengecek apakah amount undefined atau null
  if (amount === undefined || amount === null) {
    throw new Error("Amount tidak boleh kosong");
  }

  // Menangani kasus amount = 0
  if (amount === 0) {
    const generateCode = customAlphabet(
      "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      4
    );
    return `${generateCode()}00`; // Mengembalikan kode dengan "00" untuk amount 0
  }

  const amountStr = amount.toString();
  const firstTwoDigits =
    amountStr.length >= 2
      ? amountStr.substring(0, 2)
      : amountStr.padStart(2, "0");

  const generateCode = customAlphabet("123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 4);
  return `${generateCode()}${firstTwoDigits}`;
}

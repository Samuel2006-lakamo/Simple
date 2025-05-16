import { formatCurrency } from "../scripts/utils/money.js";

describe("Test suit: format Currency", () => {
    it("covert cents to dollars", () => {
        expect(formatCurrency(2059)).toEqual("20.59");
    });
    it("testing 0", () => {
        expect(formatCurrency(0)).toEqual("0.00");
    });
    it("Testing rouding up of number", () => {
      expect(formatCurrency(2025.5)).toEqual("20.26");
    });
});

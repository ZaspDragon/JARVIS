import { describe, expect, it } from "vitest";
import { detectIntent, shouldSearchPersonalData } from "./intent-router";

describe("detectIntent", () => {
  it("routes warehouse questions", () => {
    expect(detectIntent("Who is behind on cycle counts today?")).toBe("warehouse_operations");
  });

  it("routes ordinary life questions without forcing personal data access", () => {
    expect(detectIntent("How should I organize my garage this weekend?")).toBe("everyday_question");
    expect(shouldSearchPersonalData("everyday_question")).toBe(false);
  });

  it("routes finance questions to protected personal context", () => {
    expect(detectIntent("How much did I spend on bills this month?")).toBe("finance");
    expect(shouldSearchPersonalData("finance")).toBe(true);
  });
});

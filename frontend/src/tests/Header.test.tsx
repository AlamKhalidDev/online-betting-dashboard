import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Header from "../components/Header";

describe("Header", () => {
  it("calls onSearchChange when typing", async () => {
    const onSearchChange = vi.fn();
    render(<Header searchQuery="" onSearchChange={onSearchChange} />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "abc");
    expect(onSearchChange).toHaveBeenCalledTimes(3);
  });
});

import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Users from "./BasicReducer";

describe("Users search", () => {
    it("shows the matching user", () => {
        render(<Users />);

        fireEvent.change(screen.getByPlaceholderText("Search user"), {
            target: { value: "Rahul" }
        });
        fireEvent.click(screen.getByRole("button", { name: "Search" }));

        expect(screen.getByText("Rahul")).toBeInTheDocument();
        expect(screen.queryByText("Yash")).not.toBeInTheDocument();
    });

    it("shows an error when no user is found", () => {
        render(<Users />);

        fireEvent.change(screen.getByPlaceholderText("Search user"), {
            target: { value: "Unknown" }
        });
        fireEvent.click(screen.getByRole("button", { name: "Search" }));

        expect(screen.getByText("User not found")).toBeInTheDocument();
    });
});
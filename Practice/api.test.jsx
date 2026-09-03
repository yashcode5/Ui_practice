import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import axios from "axios";
import Topics from "./api";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("Topics", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loads and displays topics returned by the API", async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        {
          id: 1,
          name: "React",
          description: "A user interface library",
        },
      ],
    });

    render(<Topics />);

    expect(await screen.findByText("React")).toBeInTheDocument();
    expect(screen.getByText("A user interface library")).toBeInTheDocument();
    expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/topics");
  });

  it("shows an error when loading topics fails", async () => {
    axios.get.mockRejectedValueOnce(new Error("Network error"));

    render(<Topics />);

    expect(await screen.findByText("Failed to fetch topics")).toBeInTheDocument();
  });
});
import { default as LeaderBoard } from "./index";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Leaderboard", () => {
  beforeEach(() => {
    render(<LeaderBoard />);
  });

  test("it renders a form", () => {
    let form = screen.getByRole("form");
    expect(form).toBeInTheDocument();
  });
});

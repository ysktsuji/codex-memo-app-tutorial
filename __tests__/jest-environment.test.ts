describe("Jest environment", () => {
  it("loads jsdom and jest-dom matchers", () => {
    document.body.innerHTML = "<main>Ready</main>";

    expect(document.querySelector("main")).toBeInTheDocument();
  });
});

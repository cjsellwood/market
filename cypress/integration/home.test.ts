describe("Visit home", () => {
  it("Navigates to home screen", () => {
    cy.visit("/");

    cy.contains("Home");
  });

  it("Navigates to login screen", () => {
    cy.visit("/");

    cy.contains("Go to Login").click();

    cy.contains("This is Login");
  });
});

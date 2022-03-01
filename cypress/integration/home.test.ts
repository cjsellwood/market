import randomProducts from "../fixtures/randomProducts";

describe("Visit home", () => {
  beforeEach(() => {
    cy.viewport(360, 640);
    cy.intercept("http://localhost:5000/products/random", randomProducts);
  });
  it("Navigates to home screen and uses navigation menu", () => {
    cy.visit("/");

    cy.contains("Market");

    cy.get("[aria-label='open menu']").click();

    cy.contains("Login");
    cy.contains("Register");

    cy.contains("All Products").click();
    cy.url().should("include", "all");
    cy.contains("All Products").should("not.exist");

    cy.get("[aria-label='open menu']").click();
    cy.contains("Sports").click();
    cy.url().should("include", "sports");
    cy.contains("All Products").should("not.exist");

    cy.get("[aria-label='open menu']").click();
    cy.contains("Register").click();
    cy.url().should("include", "register");
    cy.contains("All Products").should("not.exist");

    cy.contains("Market").click();
    cy.url().should("eq", "http://localhost:3000/#/");
  });

  it("Displays the 20 random listings and navigates to more listings", () => {
    cy.visit("/");

    cy.contains("Ergonomic Frozen Towels");

    cy.contains("Fantastic Frozen Bike");

    cy.contains("See more").click();

    cy.url().should("eq", "http://localhost:3000/#/products");

    cy.visit("/");

    cy.contains("Ergonomic Frozen Towels").click();

    cy.url().should("eq", "http://localhost:3000/#/products/29");
  });
});

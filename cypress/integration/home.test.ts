import { allProducts, randomProducts } from "../../src/tests/helpers";

describe("Visit product pages", () => {
  beforeEach(() => {
    cy.viewport(360, 640);
    cy.intercept("http://localhost:5000/products/random", randomProducts);
    cy.intercept("http://localhost:5000/products/29", randomProducts[0]);
    cy.intercept("http://localhost:5000/products/23", randomProducts[0]);
    cy.intercept("http://localhost:5000/products?page=1", allProducts);
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

    cy.get("img").should("exist");

    cy.contains("Fantastic Frozen Bike");

    cy.contains("See more").click();

    cy.url().should("eq", "http://localhost:3000/#/products");

    cy.visit("/");

    cy.contains("Ergonomic Frozen Towels").click();

    cy.url().should("eq", "http://localhost:3000/#/products/29");
  });

  it("Displays a single product", () => {
    cy.visit("/#/products/29");

    cy.contains("Ergonomic Frozen Towels");
    cy.contains("Cars");
    cy.contains("Funkville");

    cy.get("img").should("have.length", 3);

    cy.get("img").first().should("be.visible");
    cy.get("img").last().should("not.be.visible");
  });

  it("Shows all products page", () => {
    cy.visit("/#/products");

    cy.contains("Refined Cotton Ball");
    cy.get("img").should("have.length", 20);

    cy.contains("Refined Cotton Ball").click();

    cy.url().should("eq", "http://localhost:3000/#/products/23");

    cy.go("back");
  });
});

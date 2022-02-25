describe("Testing auth pages", () => {
  before(() => {
    cy.viewport(360, 640);
    cy.intercept("http:/localhost:5000/auth/register", {
      email: "cypress@email.com",
      username: "cypress",
      userId: 99,
      token: "2f4dfd",
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    });
  });

  it("Can navigate to register and create new user", () => {
    cy.visit("/");
    cy.contains("Register").click();
    cy.contains("Register");
    cy.contains("Email");

    cy.get("#email").type("cypress@email.cod");
    cy.get("#email").should("have.value", "cypress@email.cod");

    cy.get("#username").type("cypress");
    cy.get("#username").should("have.value", "cypress");

    cy.get("#password").type("password");
    cy.get("#password").should("have.value", "password");

    cy.get("#confirmPassword").type("password");
    cy.get("#confirmPassword").should("have.value", "password");

    cy.contains("Submit").click();

    cy.url().should("not.include", "register");
  });
});

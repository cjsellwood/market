describe("Testing auth pages", () => {
  beforeEach(() => {
    cy.viewport(360, 640);
    cy.intercept("http://localhost:5000/auth/register", {
      email: "cypress@email.com",
      username: "cypress",
      userId: 99,
      token: "2f4dfd",
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    });

    cy.intercept("http://localhost:5000/auth/login", {
      email: "cypress@email.com",
      username: "cypress",
      userId: 99,
      token: "2f4dfd",
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    });
  });

  it("Can navigate to register and create new user", () => {
    cy.visit("/");
    cy.get("[aria-label='open menu']").click();
    cy.contains("Register").click();
    cy.contains("Register");
    cy.contains("Email");

    cy.get("#email").type("cypress@email.com");
    cy.get("#email").should("have.value", "cypress@email.com");

    cy.get("#username").type("cypress");
    cy.get("#username").should("have.value", "cypress");

    cy.get("#password").type("password");
    cy.get("#password").should("have.value", "password");

    cy.get("#confirmPassword").type("password");
    cy.get("#confirmPassword").should("have.value", "password");

    cy.contains("Submit").click();

    cy.url().should("not.include", "register");
  });

  it("Can login an existing user", () => {
    cy.visit("/");
    cy.get("[aria-label='open menu']").click();
    cy.contains("Login").click();

    cy.get("#email").type("cypress@email.com");
    cy.get("#email").should("have.value", "cypress@email.com");

    cy.get("#password").type("password");
    cy.get("#password").should("have.value", "password");

    cy.contains("Submit").click();

    cy.url().should("not.include", "login");
  });

  it("Shows error if incorrect credentials", () => {
    cy.intercept("http://localhost:5000/auth/login", {
      statusCode: 400,
      body: {
        error: "Incorrect username or password",
      },
    });

    cy.visit("/#/login");

    cy.get("#email").type("cypress@email.com");
    cy.get("#password").type("incorrect");

    cy.contains("Submit").click();

    cy.contains("Incorrect username or password");
  });
});

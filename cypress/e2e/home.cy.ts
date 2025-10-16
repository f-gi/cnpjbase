describe("Home", () => {
  it("carrega a página com sucesso", () => {
    cy.visit("/");

    cy.contains("Empresas").should("be.visible");

    cy.contains("Cadastrar nova empresa").should("be.visible");
  });
});

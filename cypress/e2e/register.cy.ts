describe("Cadastro de empresa", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("envia formulário com sucesso", () => {
    cy.get('input[name="cnpj"]').type("45.723.174/0001-10");
    cy.get('input[name="razaoSocial"]').type("Empresa Cypress");
    cy.get('input[name="nomeFantasia"]').type("Cypress Teste");
    cy.get('input[name="cep"]').type("01001000");
    cy.get('input[name="estado"]').type("SP");
    cy.get('input[name="municipio"]').type("São Paulo");
    cy.get('input[name="logradouro"]').type("Praça da Sé");
    cy.get('input[name="numero"]').type("123");
    cy.get('input[name="complemento"]').type("Sala 1");

    cy.contains("Cadastrar").click();

  });

  it("envia com CNPJ inválido sem crashar", () => {
    cy.get('input[name="cnpj"]').type("11.111.111/1111-11");

    cy.contains("Cadastrar").click();

  });
});

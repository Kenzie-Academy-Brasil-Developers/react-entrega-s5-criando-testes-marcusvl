describe("Cep search", () => {
  it("should be able to search cep", () => {
    cy.visit("http://localhost:3000");
    cy.get("input").type(24230002);
    cy.contains("Buscar pelo CEP").click();
  });

  it("Show cep", () => {
    cy.intercept("GET", `24230002`, {
      statusCode: 200,
      body: {
        complemento: "de 163 a 211 - lado ímpar",
        bairro: "Icaraí",
        cidade: "Niterói",
        logradouro: "Avenida Jornalista Alberto Francisco Torres",
        estado_info: {
          area_km2: "43.781,566",
          codigo_ibge: "33",
          nome: "Rio de Janeiro",
        },
        cep: "24230002",
        cidade_info: {
          area_km2: "133,919",
          codigo_ibge: "3303302",
        },
        estado: "RJ",
      },
    });

    cy.get("input")
      .eq(1)
      .should("have.value", "Avenida Jornalista Alberto Francisco Torres");
  });
});

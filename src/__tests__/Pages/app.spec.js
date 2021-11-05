import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LocateCepProvider } from "../../providers/CepProvider";
import App from "../../App";
import api from "../../services";
import MockAdapter from "axios-mock-adapter";

const apiMock = new MockAdapter(api);

describe("App page", () => {
  it("should be able to search cep", async () => {
    apiMock.onGet(`24230002`).replyOnce(200, {
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
    });

    render(
      <LocateCepProvider>
        <App />
      </LocateCepProvider>
    );

    const inputElement = screen.getByPlaceholderText("Insira o CEP");
    const buttonElement = screen.getByText("Buscar pelo CEP");

    fireEvent.change(inputElement, { target: { value: "24230002" } });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(screen.getByText("Logradouro")).toBeInTheDocument();
    });
  });
});

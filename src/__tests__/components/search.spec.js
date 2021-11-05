import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Search from "../../components/Search";
import axios from "axios";
import { LocateCepProvider } from "../../providers/CepProvider";
jest.mock("axios");
const mockedAxios = axios;

describe("Search Component", () => {
  it("Should be able to search cep", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
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
    render(
      <LocateCepProvider>
        <Search />
      </LocateCepProvider>
    );

    // render(<Search />, { wrapper: LocateCepProvider });
    const inputElement = screen.getByPlaceholderText("Insira o CEP");
    const buttonElement = screen.getByText("Buscar pelo CEP");

    fireEvent.change(inputElement, { target: { value: "24230003" } });
    fireEvent.click(buttonElement);

    expect(inputElement).toHaveValue(24230003);
  });
});

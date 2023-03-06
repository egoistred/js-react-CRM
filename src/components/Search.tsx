import React from "react";
import ReactDOM from "react-dom/client";
import { Client } from "./CRMTable";

export function Search({clients , setSearchResults}: {clients: Client, setSearchResults: Function}) {
  function handleChange(e) {
    if (!e.target.value) return setSearchResults(clients);

    const results = clients.filter(
      (client) =>
        client.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        client.surname.toLowerCase().includes(e.target.value.toLowerCase()) ||
        client.lastName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchResults(results);
  }

  return (
    <input
      type="search"
      className="search"
      placeholder="Введите запрос"
      onChange={handleChange}
    ></input>
  );
}

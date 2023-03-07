import React, { useEffect } from "react";
import Select from "react-select";
import ky from "ky";
import { Client } from "./CRMTable";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const options = [
  { value: "Телефон", label: "Телефон" },
  { value: "ДопТелефон", label: "Доп. телефон" },
  { value: "Email", label: "Email" },
  { value: "VK", label: "Vk" },
  { value: "Facebook", label: "Facebook" },
  { value: "Другое", label: "Другое" },
];

export default function ChangeForm({
  setSearchResults,
  getClients,
  clients,
  client,
  onClose,
}: {
  setSearchResults: Function;
  getClients: Function;
  clients: Client[];
  client: Client;
  onClose: () => void;
}) {
  const SignupSchema = Yup.object().shape({
    surname: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    contacts: Yup.array().of(
      Yup.object().shape({
        type: Yup.string().required(),
        value: Yup.string().required(),
      })
    ),
  });

  const formik = useFormik({
    initialValues: {
      surname: client.surname,
      name: client.name,
      lastName: client.lastName,
      contacts: client?.contacts.map((contact) => ({
        type: contact.type,
        value: contact.value,
      })),
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      values = await ky
        .patch(`http://localhost:3000/api/clients/${client.id}`, {
          json: values,
        })
        .json();

      getClients([...clients, values]);
      onClose();
    },
  });

  const [addContact, setAddContact] = useState(1);

  function addHandler(event: any) {
    event.preventDefault();
    setAddContact(addContact + 1);
    let newContact = {
      type: "Телефон",
      value: "",
    };
    formik.values.contacts = [...formik.values.contacts, newContact];
    console.log(formik.values.contacts);
  }

  async function handleDelete(e: any) {
    ky.delete(`http://localhost:3000/api/clients/${client.id}`);
    clients = await ky("http://localhost:3000/api/clients").json();
    getClients(clients);
    onClose();
  }

  function deleteContactHandler(event: any) {
    event.preventDefault();
    setAddContact(addContact + 1);
    formik.values.contacts.splice(formik.values.contacts.length - 1);
    console.log(formik.values.contacts);
  }

  return (
    <>
      <h2 className="form__heading">
        Изменить данные
        <span>{`ID: ${client.id.slice(0, 6)}`}</span>
      </h2>

      <form
        key={"changeform"}
        action="POST"
        className="changeform"
        onSubmit={formik.handleSubmit}
      >
        <input
          name="surname"
          value={formik.values.surname}
          onChange={formik.handleChange}
          className="form__input form__input--surname"
          placeholder="Фамилия"
          type="text"
        />
        <input
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          className="form__input form__input--name"
          placeholder="Имя"
          type="text"
        />
        <input
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          className="form__input form__input--lastname"
          placeholder="Отчество"
          type="text"
        />
        <div className={`select-wrapper show`}>
          {formik.values.contacts.map((contact, i) => (
            <>
            <div className="select__input">
              <Select
                isSearchable={false}
                defaultValue={options[0]}
                options={options}
                name={`contacts[${i}].type`}
                onChange={(selected) =>
                  formik.setFieldValue(`contacts[${i}].type`, selected?.value)
                }
                styles={{
                  indicatorSeparator: (baseStyles, state) => ({
                    ...baseStyles,
                    display: "none",
                  }),
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderRadius: 0,
                    backgroundColor: "#E7E5EB",
                    boxShadow: "none",
                    borderColor: state.isFocused ? "#c8c5d1" : "#c8c5d1",
                    "&:hover": {
                      borderColor: "#c8c5d1",
                    },
                  }),
                  menu: (baseStyles, state) => ({
                    ...baseStyles,
                    borderRadius: 0,
                    backgroundColor: "#F4F3F6",
                    padding: 0,
                    margin: 0,
                  }),
                  menuList: (baseStyles, state) => ({
                    ...baseStyles,
                    padding: 0,
                    margin: 0,
                  }),
                  singleValue: (baseStyles, state) => ({
                    ...baseStyles,
                    fontSize: 12,
                    fontWeight: 400,
                    textAlign: "left",
                  }),
                  option: (baseStyles, state) => ({
                    ...baseStyles,
                    fontSize: 12,
                    fontWeight: 400,
                    color: "#000000",
                    textAlign: "left",
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingLeft: 12,
                    paddingRight: 12,
                    backgroundColor: state.isFocused ? "#E7E5EB" : "#E7E5EB",
                    "&:hover": {
                      backgroundColor: "#c8c5d1",
                    },
                  }),
                }}
                key={i}
              />
              <input
                type="text"
                onChange={formik.handleChange}
                name={`contacts[${i}].value`}
                value={formik.values.contacts[i].value}
              />
              <a className="contact_del" onClick={deleteContactHandler}>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z"
                    fill="#B0B0B0"
                  />
                </svg>
              </a>
              </div>
            </>
          ))}
        </div>

        <a href="" onClick={addHandler}>
          Добавить контакт
        </a>
        <p className={`errors ${formik.errors.surname && "show"}`}>
          <span className="error">{`${
            formik.errors.name ? formik.errors.name : ""
          }`}</span>
          <span className="error">{`${
            formik.errors.surname ? formik.errors.surname : ""
          }`}</span>
          <span className="error">{`${
            formik.errors.lastName ? formik.errors.lastName : ""
          }`}</span>
          <span className="error">{`${
            formik.errors.contacts ? "Введите хотя бы 1 контакт" : ""
          }`}</span>
        </p>
        <button className="form__submit" type="submit">
          Сохранить
        </button>
        </form>
        <a className="delete__client" onClick={handleDelete}>
          Удалить клиента
        </a>
      
    </>
  );
}

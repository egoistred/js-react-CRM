import React from "react";
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
  getClients,
  clients,
  client,
}: {
  getClients: Function;
  clients: Client[];
  client: Client;
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
    },
  });

  let contactsArr: number[] = [];
  for (let i = 0; i < client?.contacts?.length; i++) {
    contactsArr.push(i);
  }

  function addHandler(event: any) {
    event.preventDefault();
    contactsArr.push(1)
    let newContact = {
      type: "",
      value: "",
    };
    if (formik.values.contacts.length > 1) {
      formik.values.contacts = [...formik.values.contacts, newContact];
    }
  }

  return (
    <>
      <h2 className="form__heading">Изменить данные</h2>
      <span>{`ID: ${client.id.slice(0, 6)}`}</span>
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
          {contactsArr.map((contact, i) => (
            <>
              <Select
                defaultValue={options[0]}
                options={options}
                name={`contacts[${i}].type`}
                onChange={(selected) =>
                  formik.setFieldValue(`contacts[${i}].type`, selected?.value)
                }
                key={i}
              />
              <input
                type="text"
                onChange={formik.handleChange}
                name={`contacts[${i}].value`}
                value={formik.values.contacts[i].value}
              />
              <button>&times;</button>
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
        <a href="">Отмена</a>
      </form>
    </>
  );
}

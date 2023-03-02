import React from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import ky from "ky";
import { Client } from "./CRMTable";
import { useState } from "react";
import { useFormik } from "formik";
import { uuid } from 'uuidv4'

const options = [
  { value: "tel", label: "Телефон" },
  { value: "addTel", label: "Доп. телефон" },
  { value: "email", label: "Email" },
  { value: "vk", label: "Vk" },
  { value: "fb", label: "Facebook" },
];

const contacts: number[] = [];


export function AddForm({
  clients,
  setClients,
}: {
  clients: Client[];
  setClients: Function;
}) {
  const { register, handleSubmit } = useForm();

  const formik = useFormik({
    initialValues: {
      surname: "",
      name: "",
      lastName: "",
      contacts: [
        {
        type: "",
        value: "",
      }
      ],
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const [addContact, setAddContact] = useState(false);
  const [contact, setContact] = useState("tel");
  const [count, setCount] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);

  // const onSubmit = async (data: Client) => {
  //   let clientContacts = console.log(data);
  // data = await ky
  //   .post("http://localhost:3000/api/clients", { json: data })
  //   .json();
  // setClients([...clients, data]);
  // };

  function addHandler(event: any) {
    event.preventDefault();
    if (contacts.length > 4) return;
    setCount(count + 1);
    contacts.push(count);
    setAddContact(true);
  }

  return (
    <>
      <h2 className="form__heading">Новый клиент</h2>
      <form
        key={"addform"}
        action="POST"
        className="addform"
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
        <div className={`select-wrapper ${addContact ? "show" : ""}`}>
          {addContact &&
            contacts.map(() => (
              <>
                <Select
                defaultValue={options[0]}
                options={options} />
                <input
                  type="text"
                  value={formik.values.contacts[0].value}
                  onChange={formik.handleChange}
                  name="contacts"
                />
                <button>&times;</button>
              </>
            ))}
        </div>

        <a href="" onClick={addHandler}>
          Добавить контакт
        </a>
        <button className="form__submit" type="submit">
          Сохранить
        </button>
        <a href="">Отмена</a>
      </form>
    </>
  );
}

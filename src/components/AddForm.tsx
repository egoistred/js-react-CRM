import React from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import ky from "ky";
import { Client } from "./CRMTable";
import { useState } from "react";
import { useFormik } from "formik";
import { uuid } from "uuidv4";

const options = [
  { value: "Телефон", label: "Телефон" },
  { value: "Телефон", label: "Доп. телефон" },
  { value: "Email", label: "Email" },
  { value: "VK", label: "Vk" },
  { value: "Facebook", label: "Facebook" },
];

const contactsArr: number[] = [];

export function AddForm({
  clients,
  setClients,
}: {
  clients: Client[];
  setClients: Function;
}) {
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
    onSubmit: async (values) => {
      console.log(values);
      values = await ky
        .post("http://localhost:3000/api/clients", { json: values })
        .json();
      setClients([...clients, values]);
    },
  });

  const [addContact, setAddContact] = useState(false);
  const [contact, setContact] = useState("tel");
  const [count, setCount] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);

  // const onSubmit = async (data: Client) => {
  //   let clientContacts = console.log(data);

  // };

  function addHandler(event: any) {
    event.preventDefault();
    setCount(count + 1);
    contactsArr.push(count);
    let newContact = {
      type: "",
      value: "",
    };
    if ((formik.values.contacts.length) > 1) {
      formik.values.contacts = [...formik.values.contacts, newContact];
    }
 
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
            contactsArr.map((contact, i) => (
              <>
                <Select
                  defaultValue={options[0]}
                  options={options}
                  name={`contacts[${i}].type`}
                  onChange={(selected) =>
                    formik.setFieldValue(`contacts[${i}].type`, selected?.value)
                  }
                />
                <input
                  type="text"
                  onChange={formik.handleChange}
                  name={`contacts[${i}].value`}
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

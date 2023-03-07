import React from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import ky from "ky";
import { Client } from "./CRMTable";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Group from "react-select/dist/declarations/src/components/Group";

const options = [
  { value: "Телефон", label: "Телефон" },
  { value: "ДопТелефон", label: "Доп. телефон" },
  { value: "Email", label: "Email" },
  { value: "VK", label: "Vk" },
  { value: "Facebook", label: "Facebook" },
  { value: "Другое", label: "Другое" },
];

const contactsArr: number[] = [];

export function AddForm({
  clients,
  setSearchResults,
  onClose,
}: {
  clients: Client[];
  setSearchResults: Function;
  onClose: () => void;
}) {
  const SignupSchema = Yup.object().shape({
    surname: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Введите Фамилию "),
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Введите имя "),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Введите отчество"),
    contacts: Yup.array().of(
      Yup.object().shape({
        type: Yup.string().required(),
        value: Yup.string().required("Введите хотя бы 1 контакт"),
      })
    ),
  });

  const formik = useFormik({
    initialValues: {
      surname: "",
      name: "",
      lastName: "",
      contacts: [
        {
          type: "Телефон",
          value: "",
        },
      ],
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      values = await ky
        .post("http://localhost:3000/api/clients", { json: values })
        .json();
      setSearchResults([...clients, values]);
      onClose();
    },
  });

  const [addContact, setAddContact] = useState(false);
  const [count, setCount] = useState(1);

  function addHandler(event: any) {
    event.preventDefault();
    setCount(count + 1);
    contactsArr.push(count);
    let newContact = {
      type: "Телефон",
      value: "",
    };
    if (formik.values.contacts.length > 1) {
      formik.values.contacts = [...formik.values.contacts, newContact];
    }
    setAddContact(true);
    console.log(formik.values.contacts);
  }

  function deleteContactHandler(event: any) {
    event.preventDefault();
    formik.values.contacts.splice(formik.values.contacts.length - 1);
    setCount(count - 1);
    contactsArr.pop();
    console.log(formik.values.contacts);
    if (formik.values.contacts.length == 1) return;
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
        <div className={`select-wrapper--add ${addContact ? 'show' : ''}`}>
          <div className={`select ${addContact ? "show" : ""}`}>
            {addContact &&
              contactsArr.map((contact, i) => (
                <>
                  <div className="select__input">
                    <Select
                      isSearchable={false}
                      defaultValue={options[0]}
                      options={options}
                      name={`contacts[${i}].type`}
                      onChange={(selected) =>
                        formik.setFieldValue(
                          `contacts[${i}].type`,
                          selected?.value
                        )
                      }
                      className="select__input__select"
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
                          backgroundColor: state.isFocused
                            ? "#E7E5EB"
                            : "#E7E5EB",
                          "&:hover": {
                            backgroundColor: "#c8c5d1",
                          },
                        }),
                      }}
                    />
                    <input
                      type="text"
                      onChange={formik.handleChange}
                      name={`contacts[${i}].value`}
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
          <a className="addcontact" onClick={addHandler}>
            Добавить контакт
          </a>
        </div>

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
        <a className="cancel" onClick={onClose}>Отмена</a>
      </form>
    </>
  );
}

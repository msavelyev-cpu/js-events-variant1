import { useState, useEffect } from "react";
import "./App.css";

const students = [
  "Іван Петренко",
  "Олена Коваль",
  "Андрій Шевченко",
  "Марія Бондар",
  "Сергій Ткаченко",
  "Анна Кравчук",
  "Дмитро Савчук",
  "Оксана Мельник",
  "Василь Козак",
  "Ірина Лисенко",
  "Юлія Мороз",
  "Максим Поліщук",
  "Катерина Гончар",
  "Артем Ковальчук",
  "Наталія Романюк",
  "Богдан Климчук",
  "Олег Бондаренко",
  "Тетяна Левченко",
  "Віктор Сидоренко",
  "Аліна Шевчук",
  "Роман Павлюк",
  "Дарина Іваненко",
  "Єгор Яремчук",
  "Софія Ковтун",
  "Микола Гуменюк",
  "Олексій Тимченко",
  "Ілля Бойко",
  "Яна Козлова",
  "Владислав Кучер",
  "Анастасія Марчук"
];

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      validateForm();
    }, 300);

    return () => clearTimeout(timer);
  }, [form]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const validateForm = () => {
    const newErrors = {};

    if (form.name.trim().length < 2) {
      newErrors.name = "Мінімум 2 символи";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Некоректний email";
    }

    if (!/^\+380\d{9}$/.test(form.phone)) {
      newErrors.phone = "Формат +380XXXXXXXXX";
    }

    if (
      form.message.length < 20 ||
      form.message.length > 500
    ) {
      newErrors.message =
        "Від 20 до 500 символів";
    }

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validFields =
    Object.keys(form).filter(
      (key) =>
        form[key] &&
        !errors[key]
    ).length;

  const progress = (validFields / 4) * 100;

  const isValid =
    validFields === 4 &&
    Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Форму успішно відправлено!");
    console.log(form);
  };

  const filteredStudents = students.filter(
    (student) =>
      student
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase())
  );

  const highlightText = (text) => {
    if (!debouncedSearch) return text;

    const regex = new RegExp(
      `(${debouncedSearch})`,
      "gi"
    );

    return text
      .split(regex)
      .map((part, index) =>
        part.toLowerCase() ===
        debouncedSearch.toLowerCase() ? (
          <mark key={index}>{part}</mark>
        ) : (
          part
        )
      );
  };

  return (
    <div className="container">
      <h1>Контактна форма</h1>

      <div className="progress">
        <div
          className="progress-bar"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p>{progress}%</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Ім'я"
          value={form.name}
          onChange={handleChange}
          className={
            form.name
              ? errors.name
                ? "invalid"
                : "valid"
              : ""
          }
        />

        {errors.name && <p>{errors.name}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className={
            form.email
              ? errors.email
                ? "invalid"
                : "valid"
              : ""
          }
        />

        {errors.email && <p>{errors.email}</p>}

        <input
          type="text"
          name="phone"
          placeholder="+380XXXXXXXXX"
          value={form.phone}
          onChange={handleChange}
          className={
            form.phone
              ? errors.phone
                ? "invalid"
                : "valid"
              : ""
          }
        />

        {errors.phone && <p>{errors.phone}</p>}

        <textarea
          name="message"
          placeholder="Повідомлення"
          value={form.message}
          onChange={handleChange}
          className={
            form.message
              ? errors.message
                ? "invalid"
                : "valid"
              : ""
          }
        />

        {errors.message && (
          <p>{errors.message}</p>
        )}

        <button
          disabled={!isValid}
          type="submit"
        >
          Submit
        </button>
      </form>

      <h2>Пошук студентів</h2>

      <input
        type="text"
        placeholder="Пошук..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <ul>
        {filteredStudents.length > 0 ? (
          filteredStudents.map(
            (student, index) => (
              <li key={index}>
                {highlightText(student)}
              </li>
            )
          )
        ) : (
          <p>Не знайдено</p>
        )}
      </ul>
    </div>
  );
}

export default App;
import { useState } from "react";
import "./Login.css";

const DUMMY_USERS = [
    {
        id: 1,
        role: "Student",
        class: "10",
        section: "A",
        rollNumber: "12",
        email: "student.10.a.12@school.com",
        password: "student123"
    },
    {
        id: 2,
        role: "Student",
        class: "12",
        section: "C",
        rollNumber: "07",
        email: "student.12.c.07@school.com",
        password: "student123"
    },
    {
        id: 3,
        role: "Teacher",
        class: "10",
        section: "A",
        subject: "React",
        email: "teacher.10.a@school.com",
        password: "teacher123"
    },
    {
        id: 4,
        role: "Student",
        class: "4",
        section: "A",
        rollNumber: "01",
        email: "student.4.a.01@school.com",
        password: "student123"
    },
    {
        id: 5,
        role: "Student",
        class: "4",
        section: "A",
        rollNumber: "02",
        email: "student.4.a.02@school.com",
        password: "student123"
    },
    {
        id: 6,
        role: "Class Teacher",
        class: "4",
        section: "A",
        subject: "General Science",
        email: "teacher.4.a@school.com",
        password: "teacher123"
    },
    {
    id: 7,
    role: "Librarian",
    class: null,
    section: null,
    rollNumber: null,
    subject: "Library Management",
    email: "librarian@school.com",
    password: "librarian123"
}
];

function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const loginUser = (user) => {
        localStorage.setItem(
            "loggedInUser",
            JSON.stringify({
                id: user.id,
                role: user.role,
                class: user.class,
                section: user.section,
                rollNumber: user.rollNumber,
                subject: user.subject,
                email: user.email,
            })
        );

        // Refresh the browser after login
        window.location.reload();
    };

    const fillUser = (user) => {
        setForm({
            email: user.email,
            password: user.password,
        });

        // Auto login immediately
        loginUser(user);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = DUMMY_USERS.find(
            (u) =>
                u.email === form.email &&
                u.password === form.password
        );

        if (!user) {
            alert("Invalid email or password");
            return;
        }

        loginUser(user);
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h1>Login</h1>

               <div className="demo-users">
    <h2>🚀 Quick Login</h2>

    {/* Students */}
    <div className="user-section">
        <h3>🎓 Students</h3>

        <div className="user-grid">
            {DUMMY_USERS.filter(
                (user) => user.role === "Student"
            ).map((user) => (
                <button
                    key={user.id}
                    className="user-card student"
                    onClick={() => fillUser(user)}
                >
                    <div className="user-avatar">
                        {user.rollNumber}
                    </div>

                    <div className="user-info">
                        <h4>
                            Class {user.class}-{user.section}
                        </h4>

                        <p>Roll No: {user.rollNumber}</p>

                        <small>{user.email}</small>
                    </div>
                </button>
            ))}
        </div>
    </div>

    {/* Teachers */}
    <div className="user-section">
        <h3>👨‍🏫 Teachers</h3>

        <div className="user-grid">
            {DUMMY_USERS.filter(
                (user) => user.role === "Teacher"
            ).map((user) => (
                <button
                    key={user.id}
                    className="user-card teacher"
                    onClick={() => fillUser(user)}
                >
                    <div className="user-avatar">
                        👨‍🏫
                    </div>

                    <div className="user-info">
                        <h4>
                            Class {user.class}-{user.section}
                        </h4>

                        <p>{user.subject || "Teacher"}</p>

                        <small>{user.email}</small>
                    </div>
                </button>
            ))}
        </div>
    </div>

    {/* Class Teachers */}
    <div className="user-section">
        <h3>🧑‍🏫 Class Teachers</h3>

        <div className="user-grid">
            {DUMMY_USERS.filter(
                (user) => user.role === "Class Teacher"
            ).map((user) => (
                <button
                    key={user.id}
                    className="user-card class-teacher"
                    onClick={() => fillUser(user)}
                >
                    <div className="user-avatar">
                        🧑‍🏫
                    </div>

                    <div className="user-info">
                        <h4>
                            Class {user.class}-{user.section}
                        </h4>

                        <p>{user.subject}</p>

                        <small>{user.email}</small>
                    </div>
                </button>
            ))}
        </div>
    </div>

    {/* Librarians */}
    <div className="user-section">
        <h3>📚 Librarians</h3>

        <div className="user-grid">
            {DUMMY_USERS.filter(
                (user) => user.role === "Librarian"
            ).map((user) => (
                <button
                    key={user.id}
                    className="user-card librarian"
                    onClick={() => fillUser(user)}
                >
                    <div className="user-avatar">
                        📚
                    </div>

                    <div className="user-info">
                        <h4>Librarian</h4>

                        <p>
                            {user.subject ||
                                "Library Management"}
                        </p>

                        <small>{user.email}</small>
                    </div>
                </button>
            ))}
        </div>
    </div>
</div>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                email: e.target.value,
                            })
                        }
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                password: e.target.value,
                            })
                        }
                    />

                    <button
                        className="login-submit"
                        type="submit"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
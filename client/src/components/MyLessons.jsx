
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';

export default function MyLessons() {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchLessons() {
            try {
                const res = await fetch("/api/lessons");
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                setLessons(data.data || data);
            } catch (error) {
                console.error(error);
                setError('Could not load lessons.');
            } finally {
                setLoading(false);
            }
        }
        fetchLessons();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this lesson?")) return;
        try {
            const res = await fetch(`/api/lessons/${id}`, { method: 'DELETE' });
            if (res.status === 204) {
                setLessons((prev) => prev.filter((lesson) => lesson.id !== id));
            } else {
                alert("Failed to delete lesson.");
            }
        } catch (error) {
            alert("Error deleting lesson.");
            console.error(error);
        }
    };

    if (loading) return <div><p>Loading...</p></div>;
    if (error) return <p className="text-danger">{error}</p>;
    if (!lessons.length) return <p>No lessons found.</p>;

    return (
    <div className="MyLessons">
        <Navbar />
        <h2>My Lessons</h2>
        <ul className="list-group mt-3">
            {lessons.map((lesson) => (
                <li key={lesson.id} className="list-group-item">
                    <div>
                        <strong>{lesson.objective}</strong>
                        <br />
                        <small>
                            Subject: {lesson.subject} | Date: {lesson.date ? new Date(lesson.date).toISOString().slice(0, 10) : ''} | Year Group: {lesson.year_group}
                            </small>
                    </div>
                    <Link className="btn btn-sm btn-outline-primary" to={`/lessons/${lesson.id}`}>View</Link>
                    <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(lesson.id)}
                    >
                        Delete
                    </button>
                </li>
            ))}
        </ul>
        <Footer />
    </div>
);
}

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
                            Subject: {lesson.subject} | Date: {lesson.date} | Year Group: {lesson.year_group}
                            </small>
                    </div>
                    <Link className="btn btn-sm btn-outline-primary" to={`/lessons/${lesson.id}`}>View</Link>
                </li>
            ))}
        </ul>
        <Footer />
    </div>
);
}
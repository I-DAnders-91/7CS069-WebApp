import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LessonDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let ignore = false;
        async function load() {
            try {
                const res = await fetch(`/api/lessons/${id}`);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                if (!ignore) setLesson(data);
            } catch (error) {
                setError("Could not load lesson.");
            } finally {
                setLoading(false);
            }
        }
        load();
        return () => { ignore = true;};
    }, [id]);

    if (loading) return <div className="container py-4"><p>Loading...</p></div>;
    if (error) return <div className="container py-4"><p className="text-danger">{error}</p></div>;
    if (!lesson) return <div className="container py-4"><p>Lesson not found.</p></div>;

    return (
        <div className="LessonDetail">
            <Navbar />
            <div className="container py-4">
                <Link to="/my-lessons" className ="btn btn-sm btn-outline-secondary mb-3">Back</Link>
                <h2>{lesson.objective}</h2>
                <p className="text-muted mb-3">
                    Subject: {lesson.subject} | Year Group: {lesson.year_group} | Date: {lesson.date ? new Date(lesson.date).toISOString().slice(0, 10) : ''}
                </p>

                {lesson.activities && (
                    <>
                    <h2>Activities</h2>
                    <p>{lesson.activities}</p>
                    </>
                )}

                {lesson.success_criteria && (
                    <>
                    <h2>Success Criteria</h2>
                    <p>{lesson.success_criteria}</p>
                    </>
                )}

                {!!(lesson.useful_links && lesson.useful_links.length) && (
                    <>
                    <h2>Useful Links</h2>
                    <ul>
                    {lesson.useful_links.map((u,i) => (
                        <li key={i}><a href={u} target="_blank" rel="noopener noreferrer">{u}</a></li>
                    ))}
                    </ul>
                    </>
                )}
            </div>
            <Footer />
        </div>
        )
    }
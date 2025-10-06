//Component imports
import LessonPlanForm from './components/LessonPlanForm';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Style imports
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
    return (
        <div className="App">
            <Navbar />
            <LessonPlanForm />
            <Footer />
        </div>
    );
}

export default App; 
//Component imports
import LessonPlanForm from './components/LessonPlanForm';
import Navbar from './components/Navbar';

// Style imports
import './App.css';

function App() {
    return (
        <div className="App">
            <Navbar />
            <LessonPlanForm />
            {/*TODO - Add Footer component*/}
        </div>
    );
}

export default App; 
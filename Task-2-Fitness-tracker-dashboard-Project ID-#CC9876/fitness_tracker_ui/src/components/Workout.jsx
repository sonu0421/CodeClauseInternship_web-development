import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import './Workout.css'; // Assuming you will create a separate CSS file for styling

const Workout = () => {
    const [workoutData, setWorkoutData] = useState({
        caloriesBurned: '',
        duration: '',
        date: '',
        type: ''
    });

    const [submittedWorkouts, setSubmittedWorkouts] = useState([]);

    // Handle form input change
    const handleChange = (e) => {
        setWorkoutData({
            ...workoutData,
            [e.target.name]: e.target.value
        });
    };

    // Fetch workouts from the backend
    const fetchWorkouts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/workout');
            setSubmittedWorkouts(response.data);
        } catch (error) {
            console.error("Error fetching workouts:", error);
            toast.error("Error fetching workouts!"); // Show error toast
        }
    };

    // Handle form submission
    const handlePostWorkout = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/workout', workoutData);
            toast.success("Workout posted successfully!"); // Show success toast
            fetchWorkouts(); // Fetch updated workouts
            setWorkoutData({
                caloriesBurned: '',
                duration: '',
                date: '',
                type: ''
            }); // Clear form after submission
        } catch (error) {
            console.error("Error posting workout:", error);
            toast.error("Failed to post workout"); // Show error toast
        }
    };

    // Fetch workouts on component mount
    useEffect(() => {
        fetchWorkouts();
    }, []);

    // Format the date as "day month, year"
    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    return (
        <div className="workout-container">
            <h1 className="workout-header">Workout</h1>
            <div className="content-container">
                <div className="form-container">
                    <h3 className="form-heading">Post New Workout</h3>
                    <form className="workout-form" onSubmit={handlePostWorkout}>
                        <div className="form-group">
                            <input
                                type="number"
                                className="form-control"
                                name="caloriesBurned"
                                value={workoutData.caloriesBurned}
                                placeholder="Enter the calories you burned"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="number"
                                className="form-control"
                                name="duration"
                                value={workoutData.duration}
                                placeholder="Enter duration (in minutes)"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="date"
                                className="form-control"
                                name="date"
                                value={workoutData.date}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <select
                                className="form-control"
                                name="type"
                                value={workoutData.type}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select the type</option>
                                <option value="Running">Running</option>
                                <option value="Cardio">Cardio</option>
                                <option value="Strength">Strength</option>
                                <option value="Yoga">Yoga</option>
                                <option value="HIIT">HIIT</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                        <button className="workout-btn-primary" type="submit">
                            Post Workout
                        </button>
                    </form>
                </div>
                
                <div className="submitted-data">
                    <h3>Submitted Workouts</h3>
                    {submittedWorkouts.length === 0 ? (
                        <p>No workouts available</p>
                    ) : (
                        submittedWorkouts.map((workout, index) => (
                            <div key={index} className="workout-item">
                                <p>Date: {formatDate(workout.date)}</p>
                                <p>Type: {workout.type}</p>
                                <p>Duration: {workout.duration} minutes</p>
                                <p>Calories: {workout.caloriesBurned} kcal</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <ToastContainer /> {/* Toast container for displaying messages */}
        </div>
    );
};

export default Workout;

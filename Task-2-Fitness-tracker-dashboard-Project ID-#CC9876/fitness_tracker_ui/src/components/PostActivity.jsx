// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
// import './PostActivity.css'; // Assuming the same CSS file

// const PostActivity = () => {
//     const [activityData, setActivityData] = useState({
//         caloriesBurned: '',
//         distance: '',
//         steps: '',
//         date: ''
//     });
    
//     const [submittedActivities, setSubmittedActivities] = useState([]);

//     // Handle form input change
//     const handleChange = (e) => {
//         setActivityData({
//             ...activityData,
//             [e.target.name]: e.target.value
//         });
//     };

//     // Fetch activities from the backend
//     const fetchActivities = async () => {
//         try {
//             const response = await axios.get('http://localhost:8080/api/activity');
//             setSubmittedActivities(response.data);
//         } catch (error) {
//             console.error("Error fetching activities:", error);
//             toast.error("Error fetching activities!"); // Show error toast
//         }
//     };

//     // Handle form submission
//     const handlePostActivity = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post('http://localhost:8080/api/activity', activityData);
//             toast.success("Activity posted successfully!"); // Show success toast
//             fetchActivities(); // Fetch updated activities
//             setActivityData({
//                 caloriesBurned: '',
//                 distance: '',
//                 steps: '',
//                 date: ''
//             }); // Clear form after submission
//         } catch (error) {
//             console.error("Error posting activity:", error);
//             toast.error("Failed to post activity"); // Show error toast
//         }
//     };

//     // Fetch activities on component mount
//     useEffect(() => {
//         fetchActivities();
//     }, []);

//     return (
//         <div className="post-activity-container">
//             <h1 className="activity-header">Activity</h1>
//             <div className="content-container">
//                 <div className="form-container">
//                     <h3 className="form-heading">Post New Activity</h3>
//                     <form className="activity-form" onSubmit={handlePostActivity}>
//                         <div className="form-group">
//                             <input
//                                 type="number"
//                                 className="form-control"
//                                 name="caloriesBurned"
//                                 value={activityData.caloriesBurned}
//                                 placeholder="Enter the calories you burned"
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                         <div className="form-group">
//                             <input
//                                 type="number"
//                                 className="form-control"
//                                 name="distance"
//                                 value={activityData.distance}
//                                 placeholder="Enter distance"
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                         <div className="form-group">
//                             <input
//                                 type="number"
//                                 className="form-control"
//                                 name="steps"
//                                 value={activityData.steps}
//                                 placeholder="Enter steps"
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                         <div className="form-group">
//                             <input
//                                 type="date"
//                                 className="form-control"
//                                 name="date"
//                                 value={activityData.date}
//                                 placeholder="Select date"
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                         <button className="btn-primary" type="submit">
//                             Post Activity
//                         </button>
//                     </form>
//                 </div>
                
//                 <div className="submitted-data">
//                     <h3>Submitted Activities</h3>
//                     {submittedActivities.length === 0 ? (
//                         <p>No activity available</p>
//                     ) : (
//                         submittedActivities.map((activity, index) => (
//                             <div key={index} className="activity-item">
//                                 <p>Date: {new Date(activity.date).toLocaleDateString()}</p>
//                                 <p>Steps: {activity.steps}</p>
//                                 <p>Distance: {activity.distance} km</p>
//                                 <p>Calories: {activity.caloriesBurned} kcal</p>
//                             </div>
//                         ))
//                     )}
//                 </div>
//             </div>
//             <ToastContainer /> {/* Toast container for displaying messages */}
//         </div>
//     );
// };

// export default PostActivity;



import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import './PostActivity.css'; // Assuming the same CSS file

const PostActivity = () => {
    const [activityData, setActivityData] = useState({
        caloriesBurned: '',
        distance: '',
        steps: '',
        date: ''
    });
    
    const [submittedActivities, setSubmittedActivities] = useState([]);

    // Handle form input change
    const handleChange = (e) => {
        setActivityData({
            ...activityData,
            [e.target.name]: e.target.value
        });
    };

    // Fetch activities from the backend
    const fetchActivities = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/activity');
            setSubmittedActivities(response.data);
        } catch (error) {
            console.error("Error fetching activities:", error);
            toast.error("Error fetching activities!"); // Show error toast
        }
    };

    // Handle form submission
    const handlePostActivity = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/activity', activityData);
            toast.success("Activity posted successfully!"); // Show success toast
            fetchActivities(); // Fetch updated activities
            setActivityData({
                caloriesBurned: '',
                distance: '',
                steps: '',
                date: ''
            }); // Clear form after submission
        } catch (error) {
            console.error("Error posting activity:", error);
            toast.error("Failed to post activity"); // Show error toast
        }
    };

    // Fetch activities on component mount
    useEffect(() => {
        fetchActivities();
    }, []);

    // Function to format date
    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    return (
        <div className="post-activity-container">
            <h1 className="activity-header">Activity</h1>
            <div className="content-container">
                <div className="form-container">
                    <h3 className="form-heading">Post New Activity</h3>
                    <form className="activity-form" onSubmit={handlePostActivity}>
                        <div className="form-group">
                            <input
                                type="number"
                                className="form-control"
                                name="caloriesBurned"
                                value={activityData.caloriesBurned}
                                placeholder="Enter the calories you burned"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="number"
                                className="form-control"
                                name="distance"
                                value={activityData.distance}
                                placeholder="Enter distance"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="number"
                                className="form-control"
                                name="steps"
                                value={activityData.steps}
                                placeholder="Enter steps"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="date"
                                className="form-control"
                                name="date"
                                value={activityData.date}
                                placeholder="Select date"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button className="btn-primary" type="submit">
                            Post Activity
                        </button>
                    </form>
                </div>
                
                <div className="submitted-data">
                    <h3>Submitted Activities</h3>
                    {submittedActivities.length === 0 ? (
                        <p>No activity available</p>
                    ) : (
                        submittedActivities.map((activity, index) => (
                            <div key={index} className="activity-item">
                                <p>Date: {formatDate(activity.date)}</p>
                                <p>Steps: {activity.steps}</p>
                                <p>Distance: {activity.distance} km</p>
                                <p>Calories: {activity.caloriesBurned} kcal</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <ToastContainer /> {/* Toast container for displaying messages */}
        </div>
    );
};

export default PostActivity;

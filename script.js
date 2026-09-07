// FastAPI prediction URL
const API_URL = "http://127.0.0.1:8000/predict";


// Get HTML elements
const form = document.getElementById("predictionForm");

const button = document.getElementById("predictButton");

const buttonText = document.getElementById("buttonText");

const loader = document.getElementById("loader");

const errorMessage = document.getElementById("errorMessage");

const result = document.getElementById("result");

const score = document.getElementById("score");

const resultText = document.getElementById("resultText");

const tryAgain = document.getElementById("tryAgain");


// When the user clicks Predict
form.addEventListener("submit", async function (event) {

    // Prevent page from refreshing
    event.preventDefault();


    // Hide previous error
    errorMessage.classList.add("hidden");


    // Change button to loading state
    button.disabled = true;

    buttonText.textContent = "Predicting...";

    loader.classList.remove("hidden");


    // Collect data from HTML form
    const data = {

        age: Number(
            document.getElementById("age").value
        ),

        gender:
            document.getElementById("gender").value,

        country:
            document.getElementById("country").value,

        academic_level:
            document.getElementById("academic_level").value,

        most_used_platform:
            document.getElementById("most_used_platform").value,

        purpose_of_use:
            document.getElementById("purpose_of_use").value,

        avg_daily_usage_hours: Number(
            document.getElementById(
                "avg_daily_usage_hours"
            ).value
        ),

        daily_unlocks: Number(
            document.getElementById(
                "daily_unlocks"
            ).value
        ),

        study_hours: Number(
            document.getElementById(
                "study_hours"
            ).value
        ),

        physical_activity_hours: Number(
            document.getElementById(
                "physical_activity_hours"
            ).value
        ),

        sleep_hours_per_night: Number(
            document.getElementById(
                "sleep_hours_per_night"
            ).value
        ),

        stress_level:
            document.getElementById(
                "stress_level"
            ).value
    };


    try {

        // Send data to FastAPI
        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)

        });


        // Convert FastAPI response to JavaScript object
        const responseData = await response.json();


        // Check if FastAPI returned an error
        if (!response.ok) {

            throw new Error(
                responseData.detail
                    ? JSON.stringify(responseData.detail)
                    : "The API returned an error."
            );

        }


        // Get predicted score
        const predictedScore =
            responseData.predicted_mental_health_score;


        // Show score on webpage
        score.textContent = predictedScore;


        resultText.textContent =
            "The trained machine learning model generated this prediction from the information you entered.";


        // Hide form
        form.classList.add("hidden");


        // Show result
        result.classList.remove("hidden");


    } catch (error) {

        // Show error message
        errorMessage.textContent =
            "Could not connect to FastAPI. Make sure Uvicorn is running on port 8000.";

        errorMessage.classList.remove("hidden");


        console.error(error);

    } finally {

        // Return button to normal
        button.disabled = false;

        buttonText.textContent =
            "Predict Mental Health Score";

        loader.classList.add("hidden");

    }

});


// Try Again button
tryAgain.addEventListener("click", function () {

    // Hide result
    result.classList.add("hidden");


    // Show form again
    form.classList.remove("hidden");


    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});
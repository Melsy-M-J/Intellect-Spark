let questionCount = 0;
let score=0;

// Function to fetch a random trivia question
async function fetchTriviaQuestion() {
    const apiUrl = 'https://opentdb.com/api.php?amount=10&category=9&type=multiple';  // API URL for getting one question

    try {
        const response = await fetch(apiUrl); // Fetch data from API
        const data = await response.json(); // Convert response to JSON
        const questionData = data.results[0]; // Get the first question from the response

        // Extract question and options
        const questionText = questionData.question;
        const correctAnswer = questionData.correct_answer;
        const incorrectAnswers = questionData.incorrect_answers;
        const allAnswers = [...incorrectAnswers, correctAnswer];
        
        // Shuffle the answers for random order
        const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

        // Update the page with the question and options
        document.getElementById('question').innerHTML = questionText;
        const optionsList = document.getElementById('options');
        optionsList.innerHTML = ''; // Clear previous options

        shuffledAnswers.forEach(answer => {
            const optionElement = document.createElement('li');
            optionElement.innerHTML = `<button class="option">${answer}</button>`;
            optionsList.appendChild(optionElement);
        });

        // Handle option clicks
        document.querySelectorAll('.option').forEach(button => {
            button.addEventListener('click', () => {
                if (button.innerHTML === correctAnswer) {
                    score++;
                    alert('Correct!');
                }
                else {
                    alert('Incorrect! The correct answer is '+correctAnswer);
                }
                questionCount++; // Increment question count
                if (questionCount < 10) {
                    fetchTriviaQuestion(); // Fetch a new question
                }
                else {
                    alert('Quiz complete! Your score is '+score+' on 10');
                    window.location.assign("final.html?score=" + score);
                    }
            });
        });

    } catch (error) {
        console.error('Error fetching trivia question:', error);
    }
    
}

// Call the function to fetch the first question when the page loads
fetchTriviaQuestion();

function updateScore(newScore) {
            document.getElementById('score').textContent = "Score: " + newScore;
        }

        // Example: Call the function to update the score
        // You can replace '5' with the actual score you want to display
        updateScore(score);

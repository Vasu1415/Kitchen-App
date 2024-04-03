let slideIndex = 1;
showSlides(slideIndex);
const healthTips = [
    "Drink plenty of water every day.",
    "Eat a balanced diet rich in fruits, vegetables, and whole grains.",
    "Get regular exercise, aiming for at least 30 minutes most days of the week.",
    "Get enough sleep each night, aiming for 7-9 hours for adults.",
    "Manage stress through relaxation techniques such as deep breathing, meditation, or yoga.",
    "Avoid smoking and limit alcohol consumption.",
    "Practice good hygiene, including regular hand washing and dental care.",
    "Stay up to date with vaccinations and preventive health screenings.",
    "Maintain a healthy weight by balancing calorie intake with physical activity.",
    "Take breaks from screen time to protect your eyes and reduce sedentary behavior.",
    "Stay connected with friends and family for emotional support and social interaction.",
    "Listen to your body and seek medical attention if you notice any unusual symptoms or changes in your health.",
    "Limit processed foods and sugary snacks in your diet.",
    "Include sources of lean protein, such as fish, poultry, tofu, or beans, in your meals.",
    "Incorporate regular stretching or flexibility exercises into your routine to improve mobility and prevent injuries.",
    "Practice proper posture when sitting, standing, and lifting to reduce strain on your muscles and joints.",
    "Take time for hobbies and activities you enjoy to promote mental well-being and reduce stress.",
    "Practice sun safety by wearing sunscreen, protective clothing, and seeking shade during peak hours.",
    "Engage in mindfulness practices, such as gratitude journaling or mindful eating, to cultivate a positive mindset.",
    "Limit exposure to environmental pollutants and toxins by choosing natural cleaning and personal care products.",
    "Set realistic goals for yourself and celebrate your achievements, no matter how small.",
    "Prioritize self-care activities, such as relaxation baths, massages, or quiet time alone, to recharge and rejuvenate.",
    "Schedule regular health check-ups with your healthcare provider to monitor your overall health and address any concerns."
];

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
}

function displayHealthTips() {
    const selected_tips = [];
    while (selected_tips.length < 5) {
        const randomIndex = Math.floor(Math.random() * healthTips.length);
        const tip = healthTips[randomIndex];
        if (!selected_tips.includes(tip)) {
            selected_tips.push(tip);
        }
    }
    let final_tip_string = '<ul>';
    selected_tips.forEach((tip, index) => {
        final_tip_string += `<li><strong>${tip}</strong></li>`;
    });
    final_tip_string += '</ul>';
    document.querySelector('.healthy-tips').innerHTML = final_tip_string;
}

// Call the function after every 30seconds to display and update the health tips 
displayHealthTips();
setInterval(displayHealthTips, 30000);
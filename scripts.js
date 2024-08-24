document.addEventListener('DOMContentLoaded', () => {
    const numberList = document.getElementById('number-list');
    const userForm = document.getElementById('user-form');
    const confirmationMessage = document.getElementById('confirmation-message');
    const detailsForm = document.getElementById('details-form');

    // Generate number buttons
    for (let i = 0; i <= 99; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.value = i;
        button.addEventListener('click', handleNumberClick);
        numberList.appendChild(button);
    }

    // Start button event
    document.getElementById('start-button').addEventListener('click', () => {
        document.getElementById('landing-page').style.display = 'none';
        numberList.style.display = 'block';
    });

    function handleNumberClick(event) {
        const button = event.target;
        const number = button.value;

        // Add visual feedback
        button.style.backgroundColor = '#ffcccc';
        button.textContent = 'Selected';
        button.disabled = true;

        // Show the user details form
        userForm.style.display = 'block';

        // Store the selected number in local storage
        localStorage.setItem('selectedNumber', number);
    }

    detailsForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const selectedNumber = localStorage.getItem('selectedNumber');

        // Create WhatsApp message
        const message = `හායි, මම තෝරපු අංකය ${selectedNumber}. මගේ නම ${name} මගේ දුරකතන අංකය ${phone}.`;
        const whatsappLink = `https://wa.me/+94715661354?text=${encodeURIComponent(message)}`;

        // Show confirmation message and WhatsApp link
        userForm.style.display = 'none';
        confirmationMessage.innerHTML = `
            <h2>Thank you!</h2>
            <p>Your number has been selected successfully. We will contact you soon.</p>
            <p><a href="${whatsappLink}" target="_blank">Click here to send us a message on WhatsApp</a></p>
        `;
        confirmationMessage.style.display = 'block';

        // Optionally, clear local storage
        localStorage.removeItem('selectedNumber');
    });
});

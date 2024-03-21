/**
 * The function `changeLanguage` asynchronously fetches language JSON files based on a switch value and
 * updates text content on the webpage accordingly.
 */
const changeLanguage = async () => {
   
    const switchValue = document.getElementById("flexSwitchCheckLanguage").checked;
    
    let requestJson;

    if (switchValue) {
        requestJson = await fetch(`./languages/es.json`);
    } else {
        requestJson = await fetch(`./languages/en.json`);
    }

    const texts = await requestJson.json();
    const textsToChange = document.querySelectorAll("[data-section]");
    
    for(const textToChange of textsToChange) {
        const section = textToChange.dataset.section;
        const value = textToChange.dataset.value;
        textToChange.innerHTML = texts[section][value];
    }
}


/**
 * The function `contactEmail` is used to handle form submission for a contact form, validating input
 * fields and sending an email using EmailJS, displaying success or error messages using SweetAlert.
 * @returns The function `contactEmail` returns nothing (`undefined`) if any of the input fields (name,
 * email, message) are empty. If all fields are filled, the function sends an email using the
 * `emailjs.send` method and then resets the contact form.
 */
const contactEmail = () => {
    const name = document.getElementById("nameInput").value;
    const email = document.getElementById("emailInput").value;
    const message = document.getElementById("messageInput").value;

    if (name == "" || email == "" || message == "") {
        Swal.fire({
            title: "Empty forms are not allowed!",
            text: "Please fill in all fields!",
            icon: "info"
        });
        swal("Please fill in all fields.");
        return;
    } else {
        emailjs.send("service_pfzrxln","template_8igmjhl",{
            from_name: name,
            email_id: email,
            message: message,
        }).then((response) => {
            Swal.fire({
                title: "Your email has been sent!",
                text: "I'm excited to work with you!",
                icon: "success"
            });
            document.getElementById("contactForm").reset();
        }, (error) => {
            console.error("Error sending email:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!"
            });
        });
    }
}

//*************************//
//**** Event Listeners ****//
//*************************//

document.getElementById("flexSwitchCheckLanguage").onclick = changeLanguage;

document.getElementById("sendMessageButton").onclick = contactEmail;

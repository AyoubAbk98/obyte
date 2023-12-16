const machineLearningButton = document.getElementById("machine-learning-btn");
const webDevelopmentButton = document.getElementById("web-development-btn");
const designButton = document.getElementById("design-btn");

const infoModalContainer = document.getElementById("info-modal-container");
const infoModalContent = document.getElementById("info-modal-content");
const infoModalBackButton = document.getElementById("info-modal-back-btn");

const contactFormInputs = document.querySelectorAll("section.contact form input, section.contact form textarea");
const contactFormSendBtn = document.querySelector("section.contact form button");

machineLearningButton.addEventListener("click", () => {
    showModal(
        "Machine Learning",
        null,
        `<p>Our machine learning services empower you to make informed decisions by analyzing your data and extracting valuable insights. Our team specializes in building custom machine learning models to streamline processes, giving you a competitive advantage in your industry. We also craft interactive dashboards and visualizations that make it easy to understand complex data. With our predictive models, you can stay ahead of the curve by identifying trends and opportunities while mitigating risks. Additionally, our scalable data pipelines and architectures will ensure your business can handle growing data needs with ease.</p>`
    );
});

webDevelopmentButton.addEventListener("click", () => {
    showModal(
        "Web Development",
        null,
        `<p>Our Web Design and Development team will design and create the website that you need and imagine using the latest and most robust tools, techniques, and standards that will make your site standout among its peers and have a unique look while also being fast and responsive.</p>`
    );
});

designButton.addEventListener("click", () => {
    showModal(
        "Design",
        null,
        `<p>Our design solutions offer you a wide range options to help you achieve the look and feel you want for your product no matter whether its is digital, physical, or a mix of the two.</p>`   
    );
});

document.getElementById("recent-project-0").addEventListener("click", () => {
    showModal(
        "3D Pothole Detection",
        "Machine Learning, Augmented Reality, 3D Reconstruction",
        `<p>The recent project involved the development of a novel pothole detection system that uses advanced computer vision techniques to detect and classify potholes from road images captured by a camera. The system is based on the state-of-the-art object detection algorithm, YOLOv7, which is capable of detecting and localizing potholes in real-time.</p>
        <p>In addition to detecting potholes, the system is also capable of generating a 3D point cloud for each detected pothole by projecting the 2D image data onto a 3D coordinate system. This enables the system to accurately deduce the shape and dimensions of each pothole, which is crucial for effective repair and maintenance of the road infrastructure.</p>
        <p>The proposed solution has the potential to significantly improve the efficiency and effectiveness of pothole detection and repair operations, which are critical for ensuring the safety and smooth functioning of the transportation infrastructure.</p>`
    );
});

document.getElementById("recent-project-1").addEventListener("click", () => {
    showModal(
        "Object Detection and Tracking",
        "Machine Learning, Computer Vision",
        `<p>This project involved the development of an advanced object detection system that uses state-of-the-art computer vision techniques to detect and classify various objects in real-time. The system is capable of detecting and identifying players, vehicles, persons, and car damages from video streams captured by cameras.</p>
        <p>The player detection algorithm is specifically designed to detect players on sports fields and arenas, enabling coaches and sports analysts to obtain valuable insights into player movements and performance. The car damage detection algorithm is capable of detecting and localizing car damages in real-time, which can be useful for vehicle inspections and insurance assessments. The system also includes robust object detection algorithms for person and car detection, which can be used in a variety of safety and security applications. For instance, the person detection algorithm can be used to detect unauthorized persons in restricted areas, while the car detection algorithm can be used to detect and monitor traffic flow in real-time.</p>`
    );
});

infoModalContainer.addEventListener("click", () => {
    hideModal();
});

infoModalContent.addEventListener("click", (event) => {
    event.stopPropagation();
});

infoModalBackButton.addEventListener("click", () => {
    hideModal();
});

infoModalContainer.addEventListener("transitionend", () => {
    if (!infoModalContainer.classList.toString().includes("show")) {
        infoModalContainer.style.display = "none";
    }
});

contactFormInputs.forEach(input => {
    input.addEventListener("focusout", event => {
        setContactFormInputContainerValidity(
            event.target.id,
            isContactFormInputValid(event.target.value, event.target.id)
        );
    });
});

contactFormSendBtn.addEventListener("click", event => { 
    contactFormInputs.forEach(input => {
        if (!isContactFormInputValid(input.value, input.id) || !input.value) {
            // Prevent the default behavior of the button
            // (submitting the form) if any of the form inputs
            // is invalid or empty. 
            event.preventDefault();
            
            setContactFormInputContainerValidity(input.id, false);
        }
    });
});

function showModal(header, subheader, body) {
    document.getElementById("info-modal-content-header")
            .innerText = header;
    document.getElementById("info-modal-content-subheader")
            .innerText = subheader;
    document.getElementById("info-modal-content-body")
            .innerHTML = body;

    infoModalContainer.style.display = "block";
    document.body.style.overflow = "hidden";

    // A timeout/delay is needed because transitions
    // animations don't trigger when showing/hiding elements
    // using the "display" property. 
    // And using a delay before adding adding the class that
    // triggers the transition is a way to work around that.
    setTimeout(() => {
        infoModalContainer.classList.add("show");
    }, "1");
}

function hideModal() {
    infoModalContainer.classList.remove("show");
    document.body.style.overflow = "visible";
}

function isContactFormInputValid(inputValue, inputId) {
    if (!inputValue) return true;

    switch(inputId) {
        case "name-input":
            if (inputValue.length >= 2) return true;
            break;
        case "email-input":
            const emailFormatRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (inputValue.match(emailFormatRegEx)) return true;
            break;
        case "subject-input":
            if (inputValue.length >= 5) return true;
            break;
        case "body-input":
            if (inputValue.length >= 100) return true;
            break;
    }

    return false;
}

function setContactFormInputContainerValidity(inputId, isValid) {
    const inputContainer = document.querySelector("." + inputId + "-container");

    if (!isValid) inputContainer.classList.add("invalid");
    else inputContainer.classList.remove("invalid");
}
const nameInput = document.getElementById('kontaktNamn');
const phoneInput = document.getElementById('telefonnummer');
const addContactButton = document.getElementById('nyKontakt');
const contactList = document.getElementById('kontaktLista');
const errorMessage = document.getElementById('error');

function addContact(name, phone) {
    const contactDiv = document.createElement('div');
    contactDiv.classList.add('kontakt');

    const nameField = createInputField('text', name, 'kontaktNamn', true);
    const phoneField = createInputField('tel', phone, 'telefonnummer', true);
    const editButton = createButton('ÄNDRA', 'edit-contact', () => toggleEditContact(nameField, phoneField, editButton));
    const deleteButton = createButton('RADERA', 'raderaKontakt', () => contactDiv.remove());

    contactDiv.append(nameField, phoneField, editButton, deleteButton);
    contactList.appendChild(contactDiv);
}

function createInputField(type, value, className, disabled) {
    const inputField = document.createElement('input');
    inputField.type = type;
    inputField.value = value;
    inputField.classList.add(className);
    inputField.disabled = disabled;
    return inputField;
}

function createButton(text, className, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.classList.add(className);
    button.addEventListener('click', onClick);
    return button;
}

function toggleEditContact(nameField, phoneField, editButton) {
    const isDisabled = nameField.disabled;

    if (isDisabled) {
        // När redigering påbörjas
        nameField.disabled = false;
        phoneField.disabled = false;
        editButton.textContent = 'Spara';
    } else {
        // När användaren försöker spara
        const newName = nameField.value.trim();
        const newPhone = phoneField.value.trim();

        // Kontrollera om fälten är tomma eller ogiltiga
        if (!newName || !newPhone || isNaN(newPhone) || newPhone.includes(" ")) {
            showError(`Fyll i ${!newName ? 'namn' : 'telefonnummer'} och se till att telefonnumret endast innehåller siffror.`);
        } else {
            // Om valideringen lyckas
            clearError();
            nameField.disabled = true;
            phoneField.disabled = true;
            editButton.textContent = 'Ändra';
        }
    }
}

function validateContactFields(nameField, phoneField) {
    const newName = nameField.value.trim();
    const newPhone = phoneField.value.trim();

    if (!newName && !newPhone) {
        showError('Fyll i både namn och telefonnummer.');
    } else if (!newName) {
        showError('Fyll i namn.');
    } else if (!newPhone) {
        showError('Fyll i telefonnummer.');
    } else if (isNaN(newPhone) || newPhone.includes(" ")) {
        showError('Telefonnummer får endast innehålla siffror.');
    } else {
        clearError();
        nameField.disabled = true;
        phoneField.disabled = true;
    }
}

function showError(message) {
    errorMessage.textContent = message;
}

function clearError() {
    errorMessage.textContent = '';
}

addContactButton.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    if (!name || !phone || isNaN(phone) || phone.includes(" ")) {
        showError(`Fyll i ${!name ? 'namn' : 'telefonnummer'} och se till att telefonnumret endast innehåller siffror.`);
    } else {
        clearError();
        addContact(name, phone);
        nameInput.value = '';
        phoneInput.value = '';
    }
});

document.getElementById('raderaKontaktlista').addEventListener('click', () => {
    contactList.innerHTML = '';
    clearError();
});

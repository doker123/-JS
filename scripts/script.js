function PhoneUser(lastName, firstName, middleName, numberPhone, index,
                   country, city, region, street, home, apartment) {
    this.lastName = lastName;
    this.firstName = firstName;
    this.middleName = middleName;
    this.address = {
        index: index,
        country: country,
        city: city,
        region: region,
        street: street,
        home: home,
        apartment: apartment,
    };
    this.numberPhone = numberPhone;
}

function showArray(array) {
    for (let user of array) {
        showPhoneUser(user);
    }
}

function showPhoneUser(user) {
    console.log(`Фамилия: ${user.lastName}\n`,
        `Имя: ${user.firstName}\n`,
        `Отчество: ${user.middleName}\n`,
        `Номер телефона: ${user.numberPhone}\n`,
        `Индекс: ${user.address.index}\n`,
        `Страна: ${user.address.country}\n`,
        `Область: ${user.address.region}\n`,
        `Улица: ${user.address.street}\n`,
        `Номер дома: ${user.address.home}\n`,
        `Номер квартире: ${user.address.apartment}\n`);
}

function validateString(str) {
    const s = str.trim();
    return !(s === "" || s.toLowerCase() === "undefined" || s.toLowerCase() === "null");
}

function validateNumber(num) {
    return !(isNaN(num) || num <= 0);
}

function inputPhoneUser(array) {
    let lastName = prompt(`Введите фамилию пользователя`)
    let firstName = prompt(`Введите имя пользователя`)
    let middleName = prompt(`Введите отчество пользователя`)
    let numberPhone = prompt(`Введите номер телефона пользователя`)
    let index = +prompt(`Введите индекс пользователя`)
    let country = prompt(`Введите страну пользователя`)
    let city = prompt("Введите город проживания")
    let region = prompt(`Введите регион пользователя`)
    let street = prompt(`Введите улицу пользователя`)
    let home = +prompt(`Введите номер дома пользователя`)
    let apartment = +prompt('Введите номер квартиры')
    if (validateString(lastName) && validateString(firstName) && validateString(middleName) &&
        validateString(numberPhone) && validateNumber(index) && validateString(country) &&
        validateString(region) && validateString(street) && validateNumber(home) && validateNumber(apartment)) {
        let user = new PhoneUser(lastName, firstName, middleName, numberPhone,
            index, country, city, region, street, home, apartment);

        array.push(user);
    }
}

function phoneUserInputQuestion() {
    do {
        inputPhoneUser(phoneUserArray);
    } while (confirm("Хотите ли ввести ещё пользователя?"))
}

function phoneUserInputNumber() {
    let howMuchUserPhone = +prompt("Введите количество введённых пользователей.")
    for (let i = 0; i < howMuchUserPhone; i++) {
        inputPhoneUser(phoneUserArray);
    }
}

function phoneUserInputSign(array, property, value) {
    while (true) {
        inputPhoneUser(array);
        let last = array[array.length - 1];

        if (last[property] && String(last[property]).toLowerCase() === String(value).toLowerCase()) {
            console.log(`Введён пользователь, где ${property} = ${value}`);
            break
        } else if (last.address && last.address[property] &&
            String(last.address[property]).toLowerCase() === String(value).toLowerCase()) {
            console.log(`Введён пользователь, где address.${property} = ${value}`);
            break;
        }
    }
}

function findUsersByProperty(array, property, value) {
    let result = [];
    array.forEach(user => {
        if (user[property] && String(user[property]).toLowerCase() === String(value).toLowerCase()) {
            result.push(user);
        } else if (user.address && user.address[property] &&
            String(user.address[property]).toLowerCase() === String(value).toLowerCase()) {
            result.push(user);
        }
    });
    if (result.length > 0) {
        console.log(`Найдено ${result.length} совпадений:`);
        console.log(result);
    } else {
        console.log("Совпадений не найдено")
    }
}

function sortPhoneUsersByProperty(array, property) {
    array.sort((a, b) => {
        let aValue = a[property] || a.address[property];
        let bValue = b[property] || a.address[property];

        if (aValue > bValue) return 1;
        if (aValue < bValue) return -1;
        return 0;
    });
}

let phoneUserArray = [];

do {
    let choice = +prompt("Выберите действие:\n" +
        "1 - Ввод по количеству\n" +
        "2 - Ввод с вопросом\n" +
        "3 - Ввод до заданного значения поля\n" +
        "4 - Поиск в массиве\n" +
        "5 - Добавить пользователя в существующий массив\n" +
        "6 - Сортировка по полю\n");
    switch (choice) {
        case 1: // Ввод с цифрой вводимых пользователей.
            phoneUserInputNumber()
            break;
        case 2: // Ввод с вопросом продолжать ли ввод.
            phoneUserInputQuestion();
            break;
        case 3: // Ввод до заданного значение поля.
            let property = prompt("Введите поле для поиска значения.");
            let value = prompt("Введите значение которое нужно искать.")
            phoneUserInputSign(phoneUserArray, property, value);
            break;
        case 4: // Поиск в массиве пользователей по значению
            let property1 = prompt("Введите поле поиска значения.")
            let value1 = prompt("Введите значение которое надо найти.")
            findUsersByProperty(phoneUserArray, property1, value1);
            break
        case 5: // Добавление одного пользователя
            inputPhoneUser(phoneUserArray);
            break;
        case 6: // Сортировка по значению
            let property2 = prompt("Введите значение по которому сортировать.")
            sortPhoneUsersByProperty(phoneUserArray, property2);
            break;
        default:
            alert("Ты вышел за диапазон цифр")
    }
} while (confirm("Вызвать меню ёщё раз?"));
showArray(phoneUserArray);
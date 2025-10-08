function PhoneUser(lastName, firstName,middleName,numberPhone,index, country, city, region, street, home, apartment) {
    this.lastName = lastName;
    this.firstName = firstName;
    this.middleName = middleName;
    this.address = {index: index, country: country,city:city, region: region, street: street, home: home, apartment: apartment,};
    this.numberPhone = numberPhone;
}
function showArray (array) {
    console.log(array);
}
function validateString(str) {
    const s = str.trim();
    return !(s === "" || s.toLowerCase() === "неизвестно" || s.toLowerCase() === "undefined" || s.toLowerCase() === "null");
}
function validateNumber(num){
    return !(isNaN(num) || num <= 0);
}
function inputPhoneUser (array) {
    let lastName = prompt(`Введите фамилию пользователя`,"Иванов")
    let firstName = prompt(`Введите имя пользователя`,'Иван')
    let middleName = prompt(`Введите отчество пользователя`, 'Иваныч')
    let numberPhone = prompt(`Введите номер телефона пользователя`,'79999999999')
    let index = +prompt(`Введите индекс пользователя`, '999999')
    let country = prompt(`Введите страну пользователя`, 'Россия')
    let city = prompt("Введите город проживания", "Томск")
    let region = prompt(`Введите регион пользователя`, 'Московская область')
    let street = prompt(`Введите улицу пользователя`, 'Улица Пушкина')
    let home = +prompt(`Введите номер дома пользователя`, '72')
    let apartment = +prompt('Введите номер квартиры', '55')
    if (validateString(lastName) && validateString(firstName) && validateString(middleName) &&
        validateString(numberPhone) && validateNumber(index) && validateString(country) &&
        validateString(region) && validateString(street) && validateNumber(home) && validateNumber(apartment))
    {
        let user = new PhoneUser(lastName, firstName, middleName, numberPhone,
            index, country, city, region, street, home, apartment);

        array.push(user);
    }
}
function phoneUserInputQuestion(){
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
let phoneUserArray = [];
function phoneUserInputSign(property, value) {

    while (true) {
        inputPhoneUser(phoneUserArray);
        let last = phoneUserArray[phoneUserArray.length - 1];

        if (last[property] && String(last[property]).toLowerCase() === String(value).toLowerCase()) {
            console.log(`Введён пользователь, где ${property} = ${value}`);
            break
        }
        else if (last.address && last.address[property] &&
        String(last.address[property]).toLowerCase() === String(value).toLowerCase()) {
            console.log(`Введён пользователь, где address.${property} = ${value}`);
            break;
        }
    }
}
function findUsersByProperty(property, value) {
    let result = [];

    phoneUserArray.forEach(user => {
        if (user[property] && String(user[property]).toLowerCase() === String(value).toLowerCase()) {
            result.push(user);
        }
        else if (user.address && user.address[property] &&
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

while (true) {
    let choice = +prompt("Выберите действие:\n" +
        "1 - Ввод по количеству\n" +
        "2 - Ввод с вопросом\n" +
        "3 - Ввод до заданного значения поля\n" +
        "4 - Поиск в массиве\n" +
        "5 - Сортировка по полю\n" +
        "0 - Выход");
    if (choice === 0) {
        break;
    }
    switch (choice) {
        case 1: // Ввод с цифрой.
            phoneUserInputNumber()
            break;

        case 2: // Ввод с вопросом продолжать ли ввод.
            phoneUserInputQuestion();
            break;

        case 3: // Ввод до заданного значение поля.
            let property = prompt("Введите поле для поиска значения.");
            let value = prompt("Введите значение который нужно искать.")
            phoneUserInputSign(property, value);
            break;
        case 4: // Поиск в массиве пользователей по значению
            let property1 = prompt("Введите поле поиска значения.")
            let value1 = prompt("Введите значение которое надо найти.")
            findUsersByProperty(property1, value1);
            break

        case 5:
            let  property2 = prompt("Введите значение по которому сортировать.")
            sortPhoneUsersByProperty(phoneUserArray, property2);
            break;

        default:
            alert("Ты вышел за диапазон цифр")
    }
}

showArray(phoneUserArray);
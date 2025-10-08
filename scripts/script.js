function PhoneUser(lastName, firstName,middleName,numberPhone,index, country, city, region, street, home, apartment) {
    this.lastName = lastName;
    this.firstName = firstName;
    this.middleName = middleName;
    this.address = {index: index, country: country,city:city, region: region, street: street, home: home, apartment: apartment,};
    this.numberPhone = numberPhone;
}
function findUsersByProperty(property, value) {
    let result = [];

    PhoneUserArray.forEach(user => {
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

let phoneUserArray = [];
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

        phoneUserArray.push(user);
    }
}

function phoneUserInputQuestion(){
    do {
        inputPhoneUser(phoneUserArray);
    } while (confirm("Хатите ли ввести ещё пользователя?"))

}

phoneUserInputQuestion();
showArray(phoneUserArray);
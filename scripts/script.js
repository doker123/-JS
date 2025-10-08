function PhoneUser(lastName, firstName,middleName,numberPhone,index, country, city, region, street, home, apartment) {
    this.lastName = lastName;
    this.firstName = firstName;
    this.middleName = middleName;
    this.address = {index: index, country: country,city:city, region: region, street: street, home: home, apartment: apartment,};
    this.numberPhone = numberPhone;
}

function showPhoneUser(user) {
    user.forEach((user) => {
        console.log("Фамилия: ", user.lastName,
                    "Имя: ", user.firstName,
                    "Отчество: ", user.middleName,
                    "Индекс: ", user.address.index,
                    "Страна: ", user.address.country,
                    "Город: ", user.address.city,
                    "Область: ", user.address.region,
                    "Улица: ", user.address.street,
                    "Дом: ", user.address.home,
                    "Квартира: ", user.address.apartment,
                    );
    })
}

function validateString(str) {
    const s = str.trim();
    return !(s === "" || s.toLowerCase() === "неизвестно" || s.toLowerCase() === "undefined" || s.toLowerCase() === "null");
}
function validateNumber(num){
    return !(isNaN(num) || num <= 0);
}


let PhoneUserArray = JSON.parse(localStorage.getItem("PhoneUserArray") || "[]");

document.getElementById("formUser").addEventListener('submit', function(event) {
    event.preventDefault();

    const lastName = this.lastName.value;
    const firstName = this.firstName.value;
    const middleName = this.middleName.value;
    const numberPhone = this.numberPhone.value;
    const index = +this.index.value;
    const country = this.country.value;
    const city = this.city.value;
    const region = this.region.value;
    const street = this.street.value;
    const home = +this.home.value;
    const apartment = +this.apartment.value;


    if (
        validateString(lastName) && validateString(firstName) && validateString(middleName) &&
        validateString(numberPhone) && validateNumber(index) && validateString(country) && validateString(city) &&
        validateString(region) && validateString(street) && validateNumber(home) && validateNumber(apartment)
    ) {
        let UserPhone = new PhoneUser(
            lastName, firstName, middleName, numberPhone,
            index, country, city, region, street, home, apartment
        );
        PhoneUserArray.push(UserPhone);
        localStorage.setItem("PhoneUserArray", JSON.stringify(PhoneUserArray));
        showPhoneUser(PhoneUserArray)
    }

});
document.getElementById("clearButton").addEventListener("click", function() {
    localStorage.removeItem("PhoneUserArray");
    PhoneUserArray = [];
    console.log("Данные очищены");
    showPhoneUser(PhoneUserArray);

});

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
if (PhoneUserArray.length >= 2) {
    let lastName = prompt("Введите параметр поиска: ")
    let parameter = prompt("Введите значение параметра: ")
    findUsersByProperty(lastName, parameter);
}
let choice = +prompt("Введите номер функции")
switch (choice) {
    case 1:
        console.log("Массив: ");
        showPhoneUser(PhoneUserArray);
        break;
    case 2:
}
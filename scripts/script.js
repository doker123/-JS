function PhoneUser(lastName, firstName,middleName,numberPhone,index, country, city, region, street, home, apartment) {
    this.lastName = lastName;
    this.firstName = firstName;
    this.middleName = middleName;
    this.address = {index: index, country: country,city:city, region: region, street: street, home: home, apartment: apartment,};
    this.numberPhone = numberPhone;
}

function showPhoneUser(user) {
    user.forEach((user) => {
        console.log("Фамилия: ", user.lastName,"Имя: ",
            user.firstName,"Отчество: ",user.middleName,"Номер телефона: ", user.numberPhone,
            "Индекс: ", user.address.index,"Страна: ", user.address.country,
            "Область: ",user.address.region,"Улица: ",user.address.street,
            "Номер дома: ",user.address.home, "Номер квартире: ",user.address.apartment);
    })
}

function validateString(str) {
    const s = str.trim();
    if (s === "" || s.toLowerCase() === "неизвестно" || s.toLowerCase() === "undefined" ||s.toLowerCase() === "null") {
        return false;
    }
    return true;
}
function validateNumber(num){
    if(isNaN(num) || num <= 0){
        return false;
    }
    return true;
}


let PhoneUserArray = JSON.parse(localStorage.getItem("PhoneUserArray") || "[]");

document.getElementById("formUser").addEventListener('submit', function(event) {
    event.preventDefault();

    const lastName = this.lastName.value;
    const firstName = this.firstName.value;
    const middleName = this.middleName.value;
    const numberPhone = +this.numberPhone.value;
    const index = +this.index.value;
    const country = this.country.value;
    const city = this.city.value;
    const region = this.region.value;
    const street = this.street.value;
    const home = +this.home.value;
    const apartment = +this.apartment.value;

    if (!validateString(lastName)) console.error("Ошибка: Фамилия некорректна");
    if (!validateString(firstName)) console.error("Ошибка: Имя некорректно");
    if (!validateString(middleName)) console.error("Ошибка: Отчество некорректно")
    if (!validateNumber(numberPhone)) console.error("Ошибка: номер некорректен");
    if (!validateNumber(index)) console.error("Ошибка: индекс некорректен")
    if (!validateString(country)) console.error("Ошибка: Страна некорректна");
    if (!validateString(city)) console.error("Ошибка: Город некорректен");
    if (!validateString(region)) console.error("Ошибка: Регион некорректен");
    if (!validateString(street)) console.error("Ошибка: Улица некорректна");
    if (!validateNumber(home)) console.error("Ошибка: Номер дома некорректен");
    if (!validateNumber(apartment)) console.error("Ошибка: Номер квартиры некорректен");

    if (validateString(lastName)&&validateString(firstName)&&validateString(middleName)&&validateNumber(numberPhone)&&
        validateNumber(index)&& validateString(country)&&validateNumber(city)&&validateNumber(street)&&validateNumber(home)&&
        validateNumber(apartment)) {
        let UserPhone = new PhoneUser(
            lastName, firstName, middleName, numberPhone,
            index, country, city, region, street, home, apartment
        );
        PhoneUserArray.push(UserPhone);
        localStorage.setItem("PhoneUserArray", JSON.stringify(PhoneUserArray));
    }

    showPhoneUser(PhoneUserArray)
    this.querySelector("#clearButton").addEventListener("click", function clearButton () {
        localStorage.removeItem("PhoneUserArray");
    })
});
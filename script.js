console.log("working");

const handle_click = () => {
    const input_year = document.getElementById("year").value;
    const input_month = document.getElementById("month").value;
    const input_day = document.getElementById("day").value;
    let err = false

    if (!input_day) {
        err = true
        console.log(input_day)
        console.log("fill the input day");
        emptyInputError(document.getElementById("day"))
    } else {
        document.getElementById("day").classList.remove("error-border")
        document.getElementById("day").previousElementSibling.classList.remove("error-color")
        document.getElementById("day").nextElementSibling.innerText = ''
    }
    if (!input_month) {
        err = true
        console.log(input_month)
        console.log("fill the input month")
        emptyInputError(document.getElementById("month"))
    } else {
        document.getElementById("month").classList.remove("error-border")
        document.getElementById("month").previousElementSibling.classList.remove("error-color")
        document.getElementById("month").nextElementSibling.innerText = ''
    }
    if (!input_year) {
        err = true
        console.log(input_year)
        console.log("fill the input year")
        emptyInputError(document.getElementById("year"))
    } else {
        document.getElementById("year").classList.remove("error-border")
        document.getElementById("year").previousElementSibling.classList.remove("error-color")
        document.getElementById("year").nextElementSibling.innerText = ''

    }
    if (input_day < 0 || input_day === 0) {
        err = true
        invalidInputError(document.getElementById("day"))
    }
    if (input_month < 0 || input_month === 0) {
        err = true
        invalidInputError(document.getElementById("month"))
    }
    if (input_year < 0 || input_year === 0) {
        err = true
        invalidInputError(document.getElementById("year"))
    }


    if (!isValidDate(input_year, input_month, input_day)) {
        err = true
        document.getElementById("day").classList.add("error-border")
        document.getElementById("day").previousElementSibling.classList.add("error-color")
        const errorElement = document.getElementById("day").nextElementSibling
        errorElement.innerText = `Must be a valid date`
        setDefault()    } else {
        document.getElementById("day").classList.remove("error-border")
        document.getElementById("day").previousElementSibling.classList.remove("error-color")
        document.getElementById("day").nextElementSibling.innerText = ''
    }

    if (err) {
        setDefault();

        return;
    }


    const today = new Date();
    const birthDate = new Date(input_year, input_month - 1, input_day); // Month is 0-based

    let ageYear = today.getFullYear() - birthDate.getFullYear();
    let ageMonth = today.getMonth() - birthDate.getMonth();
    let ageDay = today.getDate() - birthDate.getDate();

    if (ageDay < 0) {
        ageMonth--;
        ageDay += 30; // Assuming a month has 30 days
    }

    if (ageMonth < 0) {
        ageYear--;
        ageMonth += 12; // 12 months in a year
    }
    console.log(ageDay, ageMonth, ageYear)
    removeErrorMessages()
    document.getElementById("displayyear").innerText = `${ageYear}`;
    document.getElementById("displaymonth").innerText = `${ageMonth} `;
    document.getElementById("displaydays").innerText = `${ageDay} `;
};


function emptyInputError(input) {
    input.classList.add("error-border")
    input.previousElementSibling.classList.add("error-color")
    const errorElement = input.nextElementSibling
    errorElement.innerText = `This field is required`
    setDefault()
}
function invalidInputError(input) {
    // console.log(input)
    input.classList.add("error-border")
    input.previousElementSibling.classList.add("error-color")
    const errorElement = input.nextElementSibling
    errorElement.innerText = `Must be a valid ${input.id}`// make this dynamic to the field
    setDefault()
}
function removeErrorMessages() {
    const errorday = document.getElementById("day")
    const errormonth = document.getElementById("month")
    const erroryear = document.getElementById("year")
    try {
        errorday.classList.remove("error-border")
        errormonth.classList.remove("error-border")
        erroryear.classList.remove("error-border")

        errorday.previousElementSibling.classList.remove("error-color")
        errormonth.previousElementSibling.classList.remove("error-color")
        erroryear.previousElementSibling.classList.remove("error-color")

    } catch (error) {
        console.log(error)
    }

    const errormessages = document.getElementsByClassName("errormessage");
    for (element of errormessages) {
        element.innerText = ''
    }
}

function setDefault() {
    document.getElementById("displayyear").innerText = '--';
    document.getElementById("displaymonth").innerText = '--';
    document.getElementById("displaydays").innerText = '--';
}

function isValidDate(year, month, day) {
    const date = new Date(year, month - 1, day);
    return (
        date.getFullYear() === parseInt(year) &&
        date.getMonth() === parseInt(month) - 1 &&
        date.getDate() === parseInt(day)
    );
}

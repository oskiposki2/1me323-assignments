export class Booking {
    constructor(house) {
        this.house = house;
        this.numberOfDays = 1;
        this.breakfast = false;
        this.ghostTour = false;
        this.chargingPole = false;
        this.discountcode = "";

        this.numberOfDaysInput = document.querySelector("#numberOfDays");
        this.breakfastInput = document.querySelector("#breakfast");
        this.ghostTourInput = document.querySelector("#ghostTours");
        this.chargingPoleInput = document.querySelector("#chargingPole");
        this.discountcodeInput = document.querySelector("#discountCode");
        this.currentBookingDiv = document.getElementById("currentBooking");
        this.bookingConfirmationDiv = document.getElementById("bookingConfirmation");
        this.checkInInput = document.querySelector("#checkIn");
        this.form = document.querySelector("#bookingForm");
        this.validateBox = document.getElementById("validateBox");

        this.checkInInput.min = new Date().toISOString().split("T")[0];
    }

    calculateTotal() {
        let total = this.numberOfDays * this.house.pricePerNight;
        if (this.breakfast) total += this.numberOfDays * Number(this.breakfastInput.value);
        if (this.ghostTour) total += Number(this.ghostTourInput.value);
        if (this.chargingPole) total += Number(this.chargingPoleInput.value);

        if (this.discountcode === "GHOST20") total *= 0.8;
        return total;
    }

    updateDisplay() {
        const total = this.calculateTotal();

        this.currentBookingDiv.innerHTML = `<p>Nätter: ${this.numberOfDays} X ${this.house.pricePerNight} KR</p>
        <p>Tillägg: 
        ${!this.breakfast ? `` : `(Frukost)`}
        ${!this.ghostTour ? `` : `(Spökvandring)`} 
        ${!this.chargingPole ? `` : `(Laddstolpe)`}
        </p>

        <p>${this.discountcode === "GHOST20" ? `Rabatt: ${total * 0.2} KR` : `Ingen rabatt`}

        <p>TOTAL KOSTNAD: ${total} KR</p>
        `;
    }

    validate() {
        console.log("VALIDATE KÖRS", this.checkInInput.value);

        this.validateBox.classList.add("validateBox");

        if (!this.checkInInput.value) {
            this.validateBox.innerHTML = `<p>Du måste välja ett incheckningsdatum</p>`;
            this.validateBox.classList.add("show")
            return false;
        }

        this.validateBox.innerHTML = "";
        this.validateBox.classList.remove("show")
        return true;
    }


    attachListeners() {
        this.numberOfDaysInput.addEventListener("input", e => {
            this.numberOfDays = Number(e.target.value) || 1;
            this.updateDisplay();
        });

        this.breakfastInput.addEventListener("change", e => {
            this.breakfast = e.target.checked;
            this.updateDisplay();
        });

        this.ghostTourInput.addEventListener("change", e => {
            this.ghostTour = e.target.checked;
            this.updateDisplay();
        });

        this.chargingPoleInput.addEventListener("change", e => {
            this.chargingPole = e.target.checked;
            this.updateDisplay();
        });

        this.discountcodeInput.addEventListener("input", e => {
            this.discountcode = e.target.value;
            this.updateDisplay();
        });

        this.form.addEventListener("submit", (e) => {
            e.preventDefault();

            if (this.validate()) {
                this.bookingConfirmation();
            }
        });
    }

    bookingConfirmation() {
        const total = this.calculateTotal();
        this.bookingConfirmationDiv.classList.add("confirmationDiv")

        this.bookingConfirmationDiv.innerHTML = `<h2>Bokning bekräftad!</h2>
        <p>${this.house.name}<p>
        <p>Datum: ${this.checkInInput.value}<p>
        <p>Antal nätter: ${this.numberOfDaysInput.value}</p>
        <p>Tillägg: 
        ${!this.breakfast ? `` : `(Frukost)`}
        ${!this.ghostTour ? `` : `(Spökvandring)`} 
        ${!this.chargingPole ? `` : `(Laddstolpe)`}
        </p>
        <p>TOTAL KOSTNAD: ${total} KR</p>
        <p><strong>Varmt välkommen till ${this.house.name}</strong></p>
        `
    }
}
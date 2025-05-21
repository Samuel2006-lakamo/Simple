class Car {
    brand;
    model;
    speed = 0;
    isTruckOpen = false;
    constructor(brand, model) {
        this.brand = brand;
        this.model = model;
    }
    openTruck() {
        if (this.speed > 0) {
            this.isTruckOpen = false;
            console.log("car is moving can't open truck");
        } else {
            this.isTruckOpen = true;
            console.log("open");
        }
    }
    closeTruck() {
        this.isTruckOpen = false;
    }
    go() {
        if (this.isTruckOpen === true) {
            return;
        } else {
            if (this.speed >= 200) {
                console.log("maximum speed");
                return;
            } else {
                this.speed += 5;
            }
        }
    }
    brake() {
        if (this.speed === 0) {
            return;
        } else {
            this.speed -= 5;
        }
    }
    displayInfo() {
        this.speed;
        console.log(`${this.brand} ${this.model}, speed:${this.speed} km/h`);
    }
}
const car = new Car("Toyata", "corola");
const car2 = new Car("Tesla", " model 3");

car2.brake();
car.go();
car2.go();
car2.brake();
car.openTruck();
car2.openTruck();
car.displayInfo();
car2.displayInfo();
console.log(car, car2);

class RaceCar extends Car {
    accleration = 20;
    // constructor(){
    //       super(brand,model);
    //     }
    go() {
        if (this.speed >= 300) {
            console.log("maximum speed");
            return;
        } else {
            this.speed += this.accleration;
        }
    }
    displayInfo() {
        this.speed;
        console.log(
            `${this.brand} ${this.model}, speed:${this.speed} km/h`
        );
    }
    closeTruck(){
      return;
    }
    openTruck(){
      return;
    }
}
const raceCar = new RaceCar("raceCar", "model 4");
raceCar.go();
raceCar.go();
raceCar.displayInfo();
console.log(raceCar);

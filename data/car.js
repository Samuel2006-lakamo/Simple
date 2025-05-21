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
            console.log("moving");
        }
    }
    closeTruck() {
        this.isTruckOpen = false;
    }
    go() {
      if(this.isTruckOpen === true){
        return;
      }
      else{
        if (this.speed >= 20) {
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
car.openTruck();
car2.openTruck();
car.displayInfo();
car2.displayInfo();
console.log(car, car2);

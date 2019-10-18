const a: string = '';

interface Man {
    name: String,
    age?: Number
}

export default class Male implements Man {

    name = '';
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    consoleName() {
        console.log(this.name);
    }
}
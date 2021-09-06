class Person {      //類別宣告
    constructor(name = 'noname', age = 20){     //constructor隨著 class 一同建立並初始化物件的特殊方法；一個 class 只能有一個。
        this.name = name;
        this.age = age;
    }
    toJson(){
        return{
        name: this.name,
        age: this.age,
        }
    }
    toString(){
        return JSON.stringify(this.toJson(), null, 4); //輸出時，前面給4個空值(縮排)
    }
}
module.exports = Person;
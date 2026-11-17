class Animal {
  String name;

  Animal(this.name);

  void sound() {
    print('$name makes a sound');
  }
}

class Dog extends Animal {
  Dog(super.name);

  @override
  void sound() {
    print('$name says Woof Woof');
  }
}

class Cat extends Animal {
  Cat(super.name);

  @override
  void sound() {
    print('$name says Meow Meow');
  }
}

void main() {
  final dog = Dog('Bruno');
  final cat = Cat('Milo');

  dog.sound();
  cat.sound();
}

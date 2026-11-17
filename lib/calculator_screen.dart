import 'package:flutter/material.dart';

class CalculatorScreen extends StatefulWidget {
  const CalculatorScreen({super.key});

  @override
  State<CalculatorScreen> createState() => _CalculatorScreenState();
}

class _CalculatorScreenState extends State<CalculatorScreen> {
  String display = '0';
  String firstNumber = '';
  String operation = '';

  void buttonPressed(String value) {
    setState(() {
      if (value == 'C') {
        display = '0';
        firstNumber = '';
        operation = '';
      } else if (value == '+' || value == '-' || value == '×' || value == '÷') {
        firstNumber = display;
        operation = value;
        display = '0';
      } else if (value == '=') {
        final num1 = double.tryParse(firstNumber) ?? 0;
        final num2 = double.tryParse(display) ?? 0;
        var result = 0.0;

        if (operation == '+') result = num1 + num2;
        if (operation == '-') result = num1 - num2;
        if (operation == '×') result = num1 * num2;
        if (operation == '÷') result = num2 != 0 ? num1 / num2 : 0;

        display = result == result.toInt()
            ? result.toInt().toString()
            : result.toString();
        firstNumber = '';
        operation = '';
      } else if (display == '0') {
        display = value;
      } else {
        display += value;
      }
    });
  }

  Widget buildButton(String text) {
    return Expanded(
      child: Padding(
        padding: const EdgeInsets.all(4),
        child: ElevatedButton(
          style: ElevatedButton.styleFrom(
            padding: const EdgeInsets.all(20),
            backgroundColor: Colors.blueGrey,
            foregroundColor: Colors.white,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(10),
            ),
          ),
          onPressed: () => buttonPressed(text),
          child: Text(
            text,
            style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Simple Calculator'),
        backgroundColor: Colors.blueGrey,
      ),
      body: Column(
        children: [
          Container(
            alignment: Alignment.centerRight,
            padding: const EdgeInsets.all(20),
            child: Text(
              display,
              style: const TextStyle(fontSize: 50, fontWeight: FontWeight.bold),
            ),
          ),
          const Divider(),
          Expanded(
            child: Column(
              children: [
                Expanded(
                  child: Row(
                    children: [
                      buildButton('C'),
                      buildButton('÷'),
                      buildButton('×'),
                      buildButton('-'),
                    ],
                  ),
                ),
                Expanded(
                  child: Row(
                    children: [
                      buildButton('7'),
                      buildButton('8'),
                      buildButton('9'),
                      buildButton('+'),
                    ],
                  ),
                ),
                Expanded(
                  child: Row(
                    children: [
                      buildButton('4'),
                      buildButton('5'),
                      buildButton('6'),
                      buildButton('='),
                    ],
                  ),
                ),
                Expanded(
                  child: Row(
                    children: [
                      buildButton('1'),
                      buildButton('2'),
                      buildButton('3'),
                      buildButton('0'),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

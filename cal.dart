// ignore_for_file: use_full_hex_values_for_flutter_colors

import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark(),
      home: const CalculatorScreen(),
    );
  }
}

class CalculatorScreen extends StatefulWidget {
  const CalculatorScreen({super.key});

  @override
  State<CalculatorScreen> createState() => _CalculatorScreenState();
}

class _CalculatorScreenState extends State<CalculatorScreen> {
  String display = "0";
  String firstNumber = "";
  String operation = "";

  void buttonPressed(String value) {
    setState(() {
      if (value == "C") {
        display = "0";
        firstNumber = "";
        operation = "";
      } else if (value == "+" || value == "-" || value == "×" || value == "÷") {
        firstNumber = display;
        operation = value;
        display = "0";
      } else if (value == "=") {
        double num1 = double.tryParse(firstNumber) ?? 0;
        double num2 = double.tryParse(display) ?? 0;
        double result = 0;

        if (operation == "+") result = num1 + num2;
        if (operation == "-") result = num1 - num2;
        if (operation == "×") result = num1 * num2;
        if (operation == "÷") result = num2 != 0 ? num1 / num2 : 0;

        if (result == result.toInt()) {
          display = result.toInt().toString();
        } else {
          display = result.toString();
        }

        firstNumber = "";
        operation = "";
      } else {
        if (display == "0") {
          display = value;
        } else {
          display = display + value;
        }
      }
    });
  }

  Color buttonColor(String text) {
    if (text == "C") return const Color(0xFFE539675); // red
    if (text == "=") return const Color(0xFF7C4DFF); // purple
    if (text == "+" || text == "-" || text == "×" || text == "÷") {
      return const Color(0xFFFF9800); // orange
    }
    return const Color(0xFF2C2F3A); // numbers
  }

  Widget buildButton(String text) {
    return Expanded(
      child: Padding(
        padding: const EdgeInsets.all(4.0),
        child: ElevatedButton(
          style: ElevatedButton.styleFrom(
            padding: const EdgeInsets.all(20),
            backgroundColor: buttonColor(text),
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
      backgroundColor: const Color(0xFF14151C),
      appBar: AppBar(
        title: const Text("Simple Calculator"),
        backgroundColor: const Color(0xFF7C4DFF),
        foregroundColor: Colors.white,
      ),
      body: Column(
        children: [
          // Display Screen
          Container(
            alignment: Alignment.centerRight,
            padding: const EdgeInsets.all(20),
            child: Text(
              display,
              style: const TextStyle(
                fontSize: 50,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
          ),
          const Divider(color: Color(0xFF7C4DFF)),
          // Buttons
          Expanded(
            child: Column(
              children: [
                Expanded(
                  child: Row(
                    children: [
                      buildButton("C"),
                      buildButton("÷"),
                      buildButton("×"),
                      buildButton("-"),
                    ],
                  ),
                ),
                Expanded(
                  child: Row(
                    children: [
                      buildButton("7"),
                      buildButton("8"),
                      buildButton("9"),
                      buildButton("+"),
                    ],
                  ),
                ),
                Expanded(
                  child: Row(
                    children: [
                      buildButton("4"),
                      buildButton("5"),
                      buildButton("6"),
                      buildButton("="),
                    ],
                  ),
                ),
                Expanded(
                  child: Row(
                    children: [
                      buildButton("1"),
                      buildButton("2"),
                      buildButton("3"),
                      buildButton("0"),
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
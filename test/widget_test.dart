
import 'package:flutter_test/flutter_test.dart';
import 'package:my_app/main.dart';

void main() {
  testWidgets('Calculator addition test', (tester) async {
    await tester.pumpWidget(const MyApp());

    await tester.tap(find.text('5').last);
    await tester.tap(find.text('+').last);
    await tester.tap(find.text('3').last);
    await tester.tap(find.text('=').last);

    await tester.pump();

    expect(find.text('8').first, findsOneWidget);
  });

  testWidgets('Calculator clear button test', (tester) async {
    await tester.pumpWidget(const MyApp());

    await tester.tap(find.text('5').last);
    await tester.tap(find.text('C').last);
    await tester.pump();

    expect(find.text('0').first, findsOneWidget);
  });
}

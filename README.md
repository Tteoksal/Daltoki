# Daltoki
The official interpreter for Tteok made with Node.js

## TODO

- [x] Lexer 제작
- [x] Parser 제작
- [ ] Evaluator 제작
- [ ] 문서 제작

## Standard Built-in Functions

* add
```html
<add>1 2 3 4</add>
```
인수로 들어온 숫자들을 모두 더한 값을 반환한다.

* sub
```html
<sub>1 2 3 4</sub>
```
첫 번째 인수와, 나머지 인수들의 합의 차를 반환한다.

* div
```html
<div>10 2 5</div>
```
첫 번째 인수를 나머지 인수들의 곱으로 나눈 값을 반환한다.

* mul
```html
<mul>2 4 5</mul>
```
인수로 들어온 숫자들을 모두 곱한 값을 반환한다.

* eval
```html
<eval>`<add>1 2 3 4 5</add>, `<sub>2 1</sub> </eval>
```
인수로 받은 모든 코드 객체를 평가하고, 마지막 코드 객체의 결과를 반환한다.

* \[value\]
```html
<1>1 2 3</1>
1
```
원시 값(숫자, 문자열, 식별자)를 함수로서 사용하면 사용된 값을 그대로 반환한다.

* let
```html
<let a = 1 b = 2> `<add>a b</add> </let>
```
새로운 스코프를 생성한 후, 존재하는 속성들의 이름으로 불변성을 띄는 변수를 생성, 값으로 초기화를 한 후 
인수로 받은 모든 표현식을 평가 후 마지막 표현식의 결과를 반환한다.

> *Notice* 변수의 타입은 한 번 정해지면 그 이후에는 고정됩니다.

* mut
```html
<mut a = 1> `<is a = 1 b = 2></is> </mut>
```

새로운 스코프를 생성한 후, 존재하는 속성들의 이름으로 가변성을 띄는 변수를 생성, 값으로 초기화를 한 후 
인수로 받은 모든 표현식을 평가 후 마지막 표현식의 결과를 반환한다.

* defg
```html
<defg a = 1 b = 2></defg>
```
전역 스코프에 존재하는 속성들의 이름으로 변수를 생성, 값으로 초기화를 한다.

* lambda
```html
<lambda a = `number  b = `number> `<add>a b</add> </lambda>
```
새로운 함수를 생성한다. 속성을 통해 인자명 = 타입의 심볼명 으로 인자를 정의할 수 있다. 인수는 함수의 몸체가 된다.

* is
```html
<is a = 1></is>
```
속성명으로 변수를 지정하고, 그 값을 변수에 대입한다. 만약 변수가 존재하지 않는다면 현재 스코프에 새로 생성한다.

* eq
```html
<eq>1 1</eq>
```
인수들이 모두 일치한 지 확인한 후, 일치하면 1, 아니면 0을 반환한다.

* obj
```html
<obj a = `String>`a "hi" `b 2</obj>
<obj extend = <obj a = `String></obj>> `a "bye" </obj>
```
속성을 통해 객체의 프로퍼티의 타입을, 인수를 통해 값을 정한다.
extend 속성은 예약된 속성으로,이 속성의 값을 확장하는 객체를 만든 후에 위 작업을 진행한다.

* if
```html
<if>1 1 0</if>
```
첫 번째 인수가 참일 경우(0, "", 빈 객체가 아닌 경우) 두 번째 표현식을 평과하고 그 결과를 반환, 아닐 경우 세 번째 표현식을 평가하고 그 결과를 반환한다.

* while
```html
<while>1 `<print>"INFINITY"</print> </while>
```
첫 번째 인수가 거짓이 될 때 까지 다른 인수로 들어온 표현식들을 평가하고 마지막 표현식의 결과를 반환한다.
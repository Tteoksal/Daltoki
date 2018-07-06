# Daltoki
The official interpreter for Tteok made with Node.js

## TODO

- [x] Lexer 제작
- [ ] Parser 제작
- [ ] Evaluator 제작
- [ ] 문서 제작

## Easy Tutorial

### Types
떡에는 총 세 가지의 타입이 존재합니다.
* 정수(Bigint)
* 심볼
* 객체

숫자는 숫자 리터럴을 통해 표현할 수 있습니다.
```tml
1
123
123.456
```

심볼을 표현하기 위해서는 \`\`의 도움이 있어야 합니다.
```html
`A`
`ABC`
`abcd`
```

객체를 표현하기 위해서는 함수의 도움을 받아야 합니다. 
```html
<ob A=1 B=2></ob>
<ob>`A` 1 `b` 2</ob>
// as JSON {"A": 1 "b": 2}
```

### 컨테이너와 객체

컨테이너는 떡에서 객체를 표현하는 방식입니다.
컨테이너의 문법적 구조는 아래와 같습니다.
```html
<identifier attrname = attrvalue>expression</identifier>
```
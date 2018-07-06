# Daltoki
The official interpreter for Tteok made with Node.js

## TODO

- [ ] Lexer 제작
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

객체를 표현하기 위해서는 함수나 \`\`의 도움을 받아야 합니다. 
```html
`<exp A=1 B="2"></exp>`
<ob>`A` 1 `b` 2</ob>
// as JSON {"A": 1 "b": 2}
```
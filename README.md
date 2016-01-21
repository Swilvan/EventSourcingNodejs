# EventSourcingNodejs

Used node 5.0.0

npm install 
node --harmony_destructuring index.js

```javascript
post('localhost:3000/user', {id:'SomeUUID', username: 'John Doe'});
put('localhost:3000/user/SomeUUID/name', {name: 'Jane Doe'}};
get('localhost:3000/user/SomeUUID');
```

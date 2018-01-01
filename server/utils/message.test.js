
const expect = require('expect');
const {msgGen} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    let from = 'Aaron';
    let text = 'This is some text';
    let message = msgGen(from, text);

    expect(message.createdAt).toBeDefined();
    expect(message).toMatchObject({from,text});
  });
})
const MODES = [
  {
    name: 'one',
    image: require('./images/best-of-1.jpg'),
    turnOrder: ['ban', 'ban', 'ban', 'ban', 'ban', 'ban', 'auto']
  },
 {
    name: 'three',
    image: require('./images/best-of-3.jpg'),
    turnOrder: ['ban', 'ban', 'pick', 'pick', 'ban', 'ban', 'auto']
  },
 {
    name: 'five',
    image: require('./images/best-of-5.jpg'),
    turnOrder: ['ban', 'ban', 'pick', 'pick', 'pick', 'pick', 'auto']
  },
]

export default MODES;

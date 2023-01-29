import Gun from 'gun/gun'
require('gun/sea')

// Port 5050 is the port of the gun server we previously created
export const gun = Gun([
  'https://pizza.adrianself.me/gun',
]);


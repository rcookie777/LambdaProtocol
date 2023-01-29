import Gun from 'gun'
require('gun/sea')

// Port 5050 is the port of the gun server we previously created
export const gun = Gun({
  peers: [
    'http://localhost:5050/gun'
  ]
});


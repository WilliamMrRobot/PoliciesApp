export const Utils = {
  url: 'http://localhost:58195/api/',
  // url: 'http://18.218.22.100:1234/api/',
};

export function getParameters(obj) {
  return Object.keys(obj)
    .map(key => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
    })
    .join('&');
}

export const CONST = {
  TOKEN: 'TOKEN',
  USER: 'USER',
  ID: 'ID',
  PHOTO: 'PHOTO',
  EXPIRES_IN: '0',
  TOKEN_TYPE: 'bearer',
  ID_LOCAL_STORAGE: 'ID_LOCAL_STORAGE',
};

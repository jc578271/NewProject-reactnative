import {RawContact} from './../types';
// import {setQueryContactAction} from "../actions/contact";
import {Dispatch} from '@reduxjs/toolkit';

export const groupedData = (db: RawContact[]) => {
  let result = {};
  db.forEach(item => {
    let fullName = item.firstName + ' ' + item.lastName;
    let words = fullName.split(' ').filter(element => element);
    let firstCharOfLastname = words[words.length - 1][0] || '';
    let normalizeChar = nonAccentVietnamese(
      firstCharOfLastname.toLocaleLowerCase(),
    ).toUpperCase();
    if (/^[0-9]+$/.test(normalizeChar)) {
      let temp = result['Digit'];
      result['Digit'] = temp ? [...temp, item] : [item];
    } else {
      let temp = result[normalizeChar];
      result[normalizeChar] = temp ? [...temp, item] : [item];
    }
  });
  let sortedResult = Object.keys(result)
    .sort()
    .reduce((obj, key) => {
      obj[key] = result[key].sort((a, b) => {
        let aFullName = a.firstName + ' ' + a.lastName,
          bFullName = b.firstName + ' ' + b.lastName;
        let aWords = aFullName.split(' '),
          bWords = bFullName.split(' ');
        let aLastname = aWords[aWords.length - 1],
          bLastname = bWords[bWords.length - 1];
        return aLastname < bLastname ? -1 : 1;
      });
      return obj;
    }, {});

  if (result['Digit']) sortedResult = {Digit: result['Digit'], ...sortedResult};
  return sortedResult;
};

export const filterData = (
  searchInput: string,
  contacts: {byKey: any; query: any},
  dispatch: Dispatch<any>,
) => {
  searchInput = searchInput.trim().toLowerCase();
  let db: RawContact[];
  // if (!contacts.query[searchInput]) {
  db = contacts.query['all']
    .filter(id => {
      let searchText = contacts.byKey[id]?.searchText || '';
      return searchText.includes(searchInput);
    })
    .map(id => contacts.byKey[id]);
  // dispatch(setQueryContactAction(searchInput, db.map(item => item.id)))
  // } else {
  //     db = contacts.query[searchInput].map(id => contacts.byKey[id])
  // }
  return db;
};

export function nonAccentVietnamese(str) {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
  return str;
}

// import the function that i want to test 
//const { addBoardList } = require('./boardList');
// import { addBoardList } from './boardList';
// import db from '../config/db';
// //writing testcase

// describe('addBoardList', () => {
//     test('should return a status code of 201 when the query is successful', async () => {

//         //test code here
//         const req = {
//             body : {
//                 id: 1,
//                 name : "boardlist name",
//                 subject : "boardlist subject",
//                 content : "boardlist content",
//                 regist_day : new Date().toLocaleString()
//             }
//         };
//         const res = {
//             status : jest.fn().mockReturnThis(),
//             json : jest.fn()
//         };
//         return addBoardList(req , res).then(()=> {
//             expect(res.status).toHaveBeenCalledWith(201);
//             expect(res.json).toHaveBeenCalledWith({ message : 'content iserted correctly'})
//         });
//     }, 100000);

//     test('should return a status code of 500 when the query fails', async() => {
//         // test code here
//         const req = {
//             body : {
//                 id: 1,
//                 name: "boardlist name",
//                 subject : "boardlist subject",
//                 content : "boardlist content",
//                 regist_day : new Date().toLocaleString()
//             }
//         };
//         const res = {
//             status : jest.fn().mockReturnThis(),
//             send: jest.fn()
//         };
//         db.query  = jest.fn().mockRejectedValueOnce(new Error('Database error'));
//         return addBoardList(req , res).then(() => {
//             expect(res.status).toHaveBeenCalledWith(500);
//             expect(res.send).toHaveBeenCalledWith('An error occured while fetching board list data');
//         });
//     } , 100000);


// })

const addBoardList = require('./boardList.js');
const db = require('../config/db.js');

jest.mock('../config/db.js');

describe('addBoardList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return a status code of 201 when the query is successful', async () => {
    db.query = jest.fn().mockResolvedValueOnce([{}, {}]);
    const req = {
      body: {
        id: 1,
        name: 'test',
        subject: 'test subject',
        content: 'test content',
        regist_day: '2022-01-01',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
    const expectedResult = { message: 'content inserted correctly.' };
    db.query.mockResolvedValueOnce([{}, {}]);
    await addBoardList(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expectedResult);
  });

  test('should return a status code of 500 when the query fails', async () => {
    const req = {
      body: {
        id: 1,
        name: 'test',
        subject: 'test subject',
        content: 'test content',
        regist_day: '2022-01-01',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
    const expectedError = new Error('Database error');
    db.query.mockRejectedValueOnce(expectedError);
    await addBoardList(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('An error occured while fetching board data');
  });
});
// //loop through users object to see if a user's email already exists in our database
// const getUserByEmail = (email, database) => {
//   // return the user if there a match (truthy), otherwise returns undefined (falsey)
//   for (let user of Object.keys(database)) {
//     if (database[user]["email"] === email) {
//       return database[user];
//     }
//   }

//   return;
// };

// // generate a random 6 character alphanumeric string which will become the "unique" shortURL
// const generateRandomString = () => {
//   return Math.random().toString(36).substr(2, 6);
//   // CREDIT: code taken from stackoverflow- submitted by Diego Mello.
// };

// // if url is not in format "http://www. ..." or "https://www. ...", prepend "http://www."
// const formatURL = url => {
//   if (url.slice(0, 8) === "https://" || url.slice(0, 7) === "http://") {
//     return url;
//   }
//   return "http://www." + url;
// };

// // return an array of urls that belong to the specified user (id)
// const urlsForUser = (id, db) => {
//   const results = [];
//   for (let key of Object.keys(db)) {
//     if (db[key]["userID"] === id) {
//       results.push(db[key]["longURL"]);
//     }
//   }
//   return results;
// };

// // fetches a given users url data- an array of objects (the shortURL and corresponding longURL) that belong to the user ->
// // [{ shortURL: 'cwh1jy', longURL: 'https://google.com' }]
// const usersUrlData = (id, db) => {
//   const results = [];
//   for (let key of Object.keys(db)) {
//     if (db[key]["userID"] === id) {
//       results.push({shortURL: key, longURL: db[key]["longURL"]});
//     }
//   }
//   return results;
// };

// module.exports = {
//   getUserByEmail,
//   generateRandomString,
//   formatURL,
//   urlsForUser,
//   usersUrlData,
// };

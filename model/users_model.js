Skip to content
 
Search or jump to…

Pull requests
Issues
Marketplace
Explore
 
@ruddls00114 
0
0 2 ruddls00114/easyfunart
forked from DongramO/easyfunart
 Code  Pull requests 0  Projects 0  Wiki  Insights  Settings
easyfunart/src/db/model/users.js
@EunYeongKim EunYeongKim modi eunyeong
6bc1d4a on 12 Jan 2018
@EunYeongKim @ruddls00114
Executable File  164 lines (155 sloc)  4.77 KB
    
exports.getUserInfo = function getUserInfo(snsToken, connection) {
  return new Promise((resolve, reject) => {
    console.log('snsToken', snsToken)
    const Query = 'SELECT * FROM USER where user_sns_token = ?'
    connection.query(Query, [snsToken], (err, result) => {
      if (err) {
        reject('user info select error')
      } else {
        console.log(result)
        resolve(result[0])
      }
    })
  })
}

exports.insertUserToken = function (userToken, connection) {
  return new Promise((resolve, reject) => {
    const Query = 'INSERT INTO USER(user_sns_token) VALUES (?)'
    connection.query(Query, userToken, (err, result) => {
      if (err) {
        console.log(err)
        reject('user Token insert Query Error')
      } else {
        resolve(true)
      }
    })
  })
}

exports.compareSnsToken = function compareSnsToken (snsToken, connection) {
  return new Promise ((resolve, reject) => {
    console.log(snsToken)
    const Query = 'select user_id from USER where user_sns_token = ?'
    connection.query(Query, snsToken, (err, data) => {
      if(err) {
        console.log(err)
        reject('user SNS Token Select Query Error')
      } else {
        console.log(data)
        if(data.length === 0) {
          resolve(false)
        } else {
          resolve(true)
        }
      }
    })
  })
}
exports.deleteToken= function deleteToken(userId,connection){
  return new Promise((resolve,reject) => {
    const Query = 'UPDATE USER SET user_sns_token = NULL WHERE user_id = ?'
    connection.query(Query,userId,(err,result) =>{
      if(err){
        reject('user sns token delete query error')
      } else{
        resolve(result)
      }
    })
  })
}
exports.selectUserNickname = function selectUserNickname(userNickname,connection){
  return new Promise((resolve, reject) => {
    const Query ='SELECT * FROM USER WHERE user_nickname = ?' 
    connection.query(Query,userNickname,(err,data) => {
      if (err) {
        reject('user nickname select query error')
      } else {
        if(data.length ===0){  //중복하지 않으면 1
          resolve(1)
        } else{
        resolve(0)      //중복하면 0
        }
      }
    })
  })
 }

exports.updateUserInfo = function(userInfo, body, connection){
    return new Promise((resolve, reject) => {
      const { userNickname, userSex, userAge } = body      
      const Query = 'UPDATE USER SET user_nickname= ?, user_sex= ?, user_age= ?, user_level= ? WHERE user_id= ?'
      connection.query(Query,[userNickname, userSex, userAge, 20, userInfo.userID], (err, data) => {
        if (err) {
          reject('user data update ERR')
        } else {
          resolve(true)
        }
      })
    })
}

exports.updateLevel = function(level, userInfo, connection){
  return new Promise((resolve, reject) => {
    // const { userNickname, userSex, userAge } = body      
    const Query = 'UPDATE USER SET user_level= ? WHERE user_id= ?'
    connection.query(Query,[50, userInfo.userID], (err, data) => {
      if (err) {
        reject('user data update ERR')
      } else {
        resolve(true)
      }
    })
  })
}

exports.modifyNicknameInfo= function modifyNicknameInfo (userNickname,userId,connection) {
  return new Promise((resolve, reject) => {
    const Query = 'UPDATE USER SET user_nickname =? WHERE user_id =?'
    connection.query(Query, [userNickname,userId], (err, result) => {
      if (err) {
        reject('user Nickname modify Query Error')
      } else {
        resolve(result)
        
      }
    })
  })
}
exports.getMypageUserInfo = function getMypageUserInfo(userId,connection) {
  //mypage.js 
  return new Promise((resolve, reject) => {
    const Query = 'SELECT user_nickname, user_profile, user_level FROM USER WHERE user_id =?'
    connection.query(Query,userId, (err, result) => {
      if (err) {
        reject('user info select error')
      } else {
        resolve(result)
      }
    })
  })
}

exports.updateProfile = function(userId, file,connection){
return new Promise((resolve,reject) => {
  const Query ='UPDATE USER SET user_profile= ? WHERE user_id= ?'
  let insert
  if(file){
     insert =[file.location, userId]
  } else {
    insert = [null, userId]
  }
  connection.query(Query, insert, (err, result) => {
    if(err){
      reject('profile image update query error')
    } else {
      resolve(result)
    }
  })
})

}

exports.insertPreUserInfo = function(userId, connection){
  return new Promise((resolve, reject) => {    
    const Query = 'INSERT INTO PREFERENCE(user_id) values(?)'
    connection.query(Query,userId, (err, data) => {
      if (err) {
        reject('INSERT user PREFERENCE data ERR')
      } else {
        resolve(true)
      }
    })
  })
}
© 2019 GitHub, Inc.
Terms
Privacy
Security
Status
Help
Contact GitHub
Pricing
API
Training
Blog
About

# OAK
#git documentation for my dear contributors

1. Do changes in your own branch
git checkout 'ur-branch-name'
-- do code code code

2. Push your local branch to remote
git add . 
git commit -m "message"
git push

3. If you need to merge your branch with master and push it to remote
git checkout master
git merge 'ur-branch-name'
git push

4. If you need to update your own branch (pull from master) 
git checkout 'ur-branch'
git pull origin master


#List of endpoints<br>
<p> 
  #user
<br>
http://localhost:3000/api/users - method GET - retrives  users.
<br> 
http://localhost:3000/api/user - method GET - retrives current user
<br>
http://localhost:3000/api/login - method POST - Handles the login functionality
<br>
http://localhost:3000/api/logout - method POST - Handles logout functionality.
<br>
  #Parking area
  http://localhost:3000/api/parkingArea - method GET - retrives all parking areas <br>
  http://localhost:3000/api/parkingArea/:key - method GET - retrives a parkingArea by location<br>
  http://localhost:3000/parkingarea/reservation/:slotNumber/:name/:hour - method PATCH - updates parking slot in parking area<br>




#List of features
1. Login and signup<br>
2.Real time chat feature using socket.io<br>
3.GDPR Consent<br>
4.Email confirmation using nodemailer<br>
5.Notification using toastr<br>

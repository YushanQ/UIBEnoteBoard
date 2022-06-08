# UIBEtextBoard.github.io

#### Hi. This is a comment board for 2022 Gratuation Party at UIBE Business School.
<br>
This project is served as a comment board for Business School 2022 graduation party. on this website, you are able to make comments and share your opinion if you want. Also, you can read others messages and give likes. You can login to this website by answering a few queations, which will test your understanding about UIBE. (If you don't know the answers, you may find the answers in the code). You will login to the website anonymously. Thus, please feel free to leave your messages.  
<hr>
<h4> How to access? </h4>
<li> Online </li>
You can access the website <a href="http://59.110.112.17:3100/">here</a>
<br>
(This link will be expired on 2022.7.5)
<br>
<br>
<li>Local</li>
Firstly, download to your pc
<br>
    git clone (github address)
    cd (the cloned files)
    nodemon app.js
Then you can start the project on localhost:3100.
<br>
Please remember. You should install git and node.js on your pc before clone this project
Secondly, if you would like to deploy it to another address：
<br>
    ssh \[username]@\[ip]
    git clone (github address)
    cd (the cloned files)
    npm i
    pm2 delete all
    pm2 start app.js --name=app
and update via:
    git pull
    pm2 restart all




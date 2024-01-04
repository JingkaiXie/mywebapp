# About
This web app uses python for the backend service, and html, css, javascript for the frontend.
The live version of this site is running on AWS EC2, with load balancers routing the traffic to the EC2 instance.

## Local Development:
- Install python 3+
- Clone this repo: `git clone git@github.com:JingkaiXie/mywebapp.git`
- Go to project directory: `cd mywebapp`
- Install dependencies: `pip install -r requirements.txt`
- Run the app: `python3 run.py`
- The site will be available at:  http://127.0.0.1:8080

## TODO:
- CI/CD integration for deployment on main branch.
- Integrate database support with Amazon Relational Database Service.
- Implement user authentication with OpenID connect.
- Persist user profile and sudoku game stats they solved to database.
- Integrate AWS CloudWatch for performance monitoring.

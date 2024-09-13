# True Beacon Fullstack assignment

## Features
- 🥇 Websocket that pushes dummy live price which is displayed in dashboard. 
- Login, Register
- Historical data chart that has filters for date and symbol, table with holdings.
- Place order.
- User details from nav bar.
- Persistent sessions and redirect to login if a session expires.
- Amount is stored as an integer to avoid floating point issue.



https://github.com/user-attachments/assets/db7bd6d6-de9e-4820-97af-34f8a137947e


### How to run the project?


1. Build backend server: `go build`
2. Start backend server: `./true-beacon`
3. Install frontend dependencies: `cd frontend && npm i`
4. Start frontend: `npm run dev`
5. Go to `http://localhost:3000`
6. Create a new user and sign in. You will be redirected to dashboard page.


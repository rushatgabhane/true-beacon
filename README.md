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


1. Start backend server: `go run .`
2. Install frontend dependencies: `cd frontend && npm i`
3. Start frontend: `npm run dev`
4. Go to `http://localhost:3000`
5. Create a new user and sign in. You will be redirected to dashboard page.


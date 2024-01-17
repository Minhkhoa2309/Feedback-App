# Feedback-Discord-Bot
This project is a Discord bot developed to collect feedback from players about their game experience. The bot responds to the \feedback command in Discord channels, allowing users to submit comments. Additionally, it provides APIs to process and manage collected comments, including listing comments and changing their status.

## Setup

### Prerequisites
[Node.js](https://nodejs.org/en)  
[MongoDB](https://www.mongodb.com/) for data storage  
### Clone the Repository
```bash
git clone https://github.com/Minhkhoa2309/Feedback-App.git
cd feedback-app
```

### Install Dependencies
```bash
npm install
```
### Configuration
Create a .env file in the root directory.

Add the following configuration variables:
```env
MONGODB_URI=your_mongodb_connection_uri
REDIS_URL=your_redis_connection_uri
```
### Run Locally
```bash
npm run dev
```
The backend server will be running locally, providing APIs for comment submission, listing, and status change.

## Usage
### APIs
- Submit Comment:
Endpoint: POST /api/comment
Use the Discord bot to submit a comment.

- List Comments:
Endpoint: GET /api/comments
Retrieve a list of comments along with relevant information.  


- Change Comment Status:
Endpoint: PUT /api/comment/status/:status
Change a comment's status. Status options: new, resolved.
### Testing
```bash
npm test
```
Run tests using Jest and Supertest to ensure the functionality of the Discord bot and backend APIs.
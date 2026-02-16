# PDQ Locks Web App 🏠

A web application for controlling PDQ smart locks via the PDQ Spirit API.

## Environments

| Environment | API URL |
|-------------|---------|
| Development | https://api.dev.pdq.aws.keyshare.tech/ |
| Production | https://api.pdqspirit.com |

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure API credentials:**
   ```bash
   cp .env.example .env
   # Edit .env and add your PDQ API credentials
   ```

3. **Get your API key:**
   - Log into PDQ Spirit (dev or prod)
   - Go to Settings → API Access
   - Generate a new API key

4. **Start the server:**
   ```bash
   npm start
   ```

5. **Open in browser:**
   ```
   http://localhost:3000
   ```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PDQ_API_URL` | Base URL for PDQ API | https://api.dev.pdq.aws.keyshare.tech/ |
| `PDQ_API_KEY` | Your API key | (required) |
| `PORT` | Server port | 3000 |

## API Endpoints Used

- `GET /keyshare/locks` - List all locks
- `PUT /keyshare/locks/:mac/state` - Lock/unlock
- `GET /keyshare/lock-groups` - List lock groups
- `GET /keyshare/activity/:mac` - Get activity logs
- `GET /keyshare/locations` - Get locations

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Render
Connect your GitHub repo to Render and set the environment variables.

### Heroku
```bash
heroku create pdq-locks-webapp
heroku config:set PDQ_API_KEY=your-key
heroku config:set PDQ_API_URL=https://api.dev.pdq.aws.keyshare.tech/
git push heroku main
```

## Tech Stack

- **Backend:** Node.js + Express
- **Frontend:** Vanilla HTML/CSS/JS
- **API:** PDQ Spirit Keyshare API (v1.91)

## License

MIT

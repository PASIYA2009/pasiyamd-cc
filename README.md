# WhatsApp Bot - PASIYA MD

A powerful WhatsApp bot with multi-number support, pairing code functionality, and WhatsApp Business API integration using Baileys library.

## Features

- ✅ **Pairing Code System**: Link WhatsApp without QR code scanning
- ✅ **Multi-Number Support**: Handle multiple WhatsApp numbers simultaneously
- ✅ **Web-Based Pairing Interface**: User-friendly web interface for pairing
- ✅ **WhatsApp Business API**: Built on @whiskeysockets/baileys
- ✅ **Session Management**: Sessions stored in GitHub for persistence
- ✅ **Auto-Features**: Auto view status, auto like, auto recording
- ✅ **Newsletter Integration**: Auto-follow and interact with WhatsApp newsletters
- ✅ **Group Management**: Auto-join groups with invite links

## Prerequisites

- Node.js >= 18.x
- GitHub account (for session storage)
- GitHub Personal Access Token
- Clever Cloud account (for deployment)

## Local Setup

1. **Clone or extract the bot files**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and fill in your values:
   ```env
   # Required
   GITHUB_TOKEN=your_github_personal_access_token
   GITHUB_OWNER=your_github_username
   GITHUB_REPO=your_repository_name
   
   # Optional (defaults provided)
   PORT=8000
   OWNER_NUMBER=your_phone_number_with_country_code
   BOT_PREFIX=.
   ```

4. **Create GitHub repository for sessions**
   
   - Create a new repository on GitHub (e.g., "whatsapp-sessions")
   - Create a folder named `session` in the repository
   - Generate a Personal Access Token with `repo` permissions
   - Add the token to your `.env` file

5. **Run locally**
   ```bash
   npm start
   ```
   
   The bot will start on `http://localhost:8000`

## Deployment to Clever Cloud

### Step 1: Prepare Your Repository

1. **Initialize Git** (if not already initialized)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create a GitHub repository** and push your code
   ```bash
   git remote add origin https://github.com/yourusername/yourrepo.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Clever Cloud

1. **Sign up/Login to Clever Cloud**
   - Go to https://www.clever-cloud.com/
   - Create an account or login

2. **Create a new application**
   - Click "Create" → "An application"
   - Select "Node.js" as the application type
   - Choose a region (preferably close to your users)

3. **Connect your repository**
   - Select "GitHub" as the deployment source
   - Authorize Clever Cloud to access your repositories
   - Select your repository and branch (main)

4. **Configure environment**
   - Choose instance size (Nano or Pico for testing)
   - Click "Next"

5. **Set environment variables**
   - In the application dashboard, go to "Environment variables"
   - Add all required variables from your `.env` file:
     ```
     NODE_ENV=production
     GITHUB_TOKEN=your_token
     GITHUB_OWNER=your_username
     GITHUB_REPO=your_repo_name
     OWNER_NUMBER=your_number
     BOT_PREFIX=.
     PORT=8080
     ```
   - **Important**: Clever Cloud uses port 8080 by default, so set `PORT=8080`

6. **Deploy**
   - Click "Deploy" or "Restart"
   - Wait for the deployment to complete
   - Your bot will be live at: `https://app-xxxxx.cleverapps.io`

### Step 3: Verify Deployment

1. Visit your Clever Cloud URL
2. You should see the pairing interface
3. The bot is now ready to accept pairing requests!

## How to Use the Pairing Site

### For Bot Users:

1. **Open the pairing site**
   - Visit your deployed URL (e.g., `https://app-xxxxx.cleverapps.io`)
   
2. **Enter your WhatsApp number**
   - Include country code (e.g., +1234567890)
   - Click "ENTER"
   
3. **Get your pairing code**
   - Wait a few seconds for the code to generate
   - A code will appear (e.g., "ABCD-1234")
   
4. **Link your WhatsApp**
   - Open WhatsApp on your phone
   - Go to Settings → Linked Devices
   - Click "Link a Device"
   - Click "Link with phone number instead"
   - Enter the code from the website
   
5. **Connection confirmed**
   - You'll receive a welcome message on WhatsApp
   - Your bot is now connected and ready!

### Alternative Access Points:

- Main pairing page: `https://your-domain.cleverapps.io/`
- Alternative pairing: `https://your-domain.cleverapps.io/pair`

## Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | 8000 | Server port (use 8080 for Clever Cloud) |
| `NODE_ENV` | No | development | Environment mode |
| `GITHUB_TOKEN` | Yes | - | GitHub Personal Access Token |
| `GITHUB_OWNER` | Yes | - | GitHub username |
| `GITHUB_REPO` | Yes | - | Repository name for sessions |
| `OWNER_NUMBER` | No | - | Bot owner phone number |
| `BOT_PREFIX` | No | . | Command prefix |
| `AUTO_VIEW_STATUS` | No | true | Auto view WhatsApp statuses |
| `AUTO_LIKE_STATUS` | No | true | Auto react to statuses |
| `AUTO_RECORDING` | No | true | Show recording status |
| `IMAGE_PATH` | No | - | Default image URL |
| `RCD_IMAGE_PATH` | No | - | Welcome image URL |
| `BOT_FOOTER` | No | - | Bot footer message |
| `CHANNEL_LINK` | No | - | WhatsApp channel link |
| `GROUP_INVITE_LINK` | No | - | Auto-join group link |
| `NEWSLETTER_JID` | No | - | Newsletter ID to auto-follow |
| `MAX_RETRIES` | No | 3 | Pairing code retry attempts |
| `OTP_EXPIRY` | No | 300000 | OTP expiration time (ms) |

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Main pairing interface |
| `/pair` | GET | Alternative pairing interface |
| `/code?number=xxx` | GET | Generate pairing code |
| `/active` | GET | List active connections |
| `/ping` | GET | Health check |

## Session Storage

Sessions are stored in your GitHub repository under the `session/` folder. Each connected number gets its own credential file:
- Format: `creds_PHONE_NUMBER.json`
- Automatically created on first connection
- Updated when credentials change
- Persists across deployments

## Troubleshooting

### Port Issues
- **Problem**: App crashes with port error
- **Solution**: Make sure `PORT` environment variable is set to `8080` on Clever Cloud

### GitHub Authentication Failed
- **Problem**: Cannot save sessions
- **Solution**: 
  - Verify GitHub token has `repo` permissions
  - Check token is not expired
  - Ensure repository exists and is accessible

### Pairing Code Not Generated
- **Problem**: "Service Unavailable" message
- **Solution**:
  - Check bot logs in Clever Cloud dashboard
  - Verify all environment variables are set
  - Ensure WhatsApp number is valid and includes country code

### Connection Drops
- **Problem**: Bot disconnects frequently
- **Solution**:
  - Check session files are being saved to GitHub
  - Verify instance isn't sleeping (upgrade Clever Cloud plan)
  - Check for WhatsApp rate limiting

## Monitoring

### Clever Cloud Dashboard
- View logs: Application → Logs
- Monitor performance: Application → Metrics
- Restart: Application → Restart

### Active Connections
Visit `/active` endpoint to see currently connected numbers.

## Security Notes

1. **Never commit `.env` file** - It's in `.gitignore`
2. **Protect GitHub token** - Use environment variables only
3. **Secure session repository** - Keep it private
4. **Update dependencies** - Run `npm update` regularly
5. **Monitor access** - Check Clever Cloud logs for suspicious activity

## Support & Updates

- Check Clever Cloud logs for errors
- Update code by pushing to your GitHub repository
- Clever Cloud auto-deploys on push to main branch

## Credits

- Built on [@whiskeysockets/baileys](https://github.com/WhiskeySockets/Baileys)
- Powered by PASIYA MD
- Deployed on Clever Cloud

## License

MIT License - Feel free to modify and use!

---

**Note**: This bot uses the official WhatsApp Business API through Baileys library. It's designed for legitimate business and personal use. Always comply with WhatsApp's Terms of Service.

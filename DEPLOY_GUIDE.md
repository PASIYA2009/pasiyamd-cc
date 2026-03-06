# Quick Deployment Guide for Clever Cloud

## 🚀 Fast Track Deployment (5 Minutes)

### Step 1: GitHub Setup (2 minutes)

1. **Create a GitHub repository for sessions**
   ```
   https://github.com/new
   Name: whatsapp-bot-sessions (or any name)
   Privacy: Private ✅
   ```

2. **Create Personal Access Token**
   ```
   https://github.com/settings/tokens
   → Generate new token (classic)
   → Select: repo (all permissions)
   → Generate token
   → COPY THE TOKEN (you won't see it again!)
   ```

3. **Create session folder**
   - Open your new repository
   - Click "Add file" → "Create new file"
   - Name it: `session/.gitkeep`
   - Commit

### Step 2: Push Bot Code to GitHub (1 minute)

```bash
# In your bot folder
git init
git add .
git commit -m "WhatsApp bot ready for Clever Cloud"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_BOT_REPO.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Clever Cloud (2 minutes)

1. **Sign up**: https://www.clever-cloud.com/
   
2. **Create Application**
   - Click "Create" → "An application"
   - Type: Node.js
   - Region: Choose closest to you
   - Connect GitHub repository
   - Instance: Nano (free tier available)

3. **Environment Variables** (CRITICAL!)
   
   Go to: Environment variables tab
   
   **Required Variables:**
   ```env
   NODE_ENV=production
   PORT=8080
   GITHUB_TOKEN=ghp_xxxxxxxxxxxxx (your token from Step 1)
   GITHUB_OWNER=your_github_username
   GITHUB_REPO=whatsapp-bot-sessions (your session repo name)
   OWNER_NUMBER=1234567890 (your phone with country code, no +)
   ```
   
   **Optional Variables:**
   ```env
   BOT_PREFIX=.
   AUTO_VIEW_STATUS=true
   AUTO_LIKE_STATUS=true
   AUTO_RECORDING=true
   ```

4. **Deploy!**
   - Click "Deploy" or it auto-deploys
   - Wait 2-3 minutes
   - Done! 🎉

### Step 4: Get Your Bot URL

After deployment:
```
Your bot URL: https://app-xxxxx-xxxxx.cleverapps.io
Pairing page: https://app-xxxxx-xxxxx.cleverapps.io/
```

Copy this URL - this is your pairing site!

## 📱 How to Connect WhatsApp

### Method 1: Pairing Code (Recommended)

1. **Visit your pairing site**
   ```
   https://app-xxxxx-xxxxx.cleverapps.io
   ```

2. **Enter phone number**
   - Include country code: +1234567890
   - Click "ENTER"
   - Wait for code (appears in 3-10 seconds)

3. **On WhatsApp**
   - Settings → Linked Devices
   - "Link a Device"
   - "Link with phone number instead"
   - Enter the code from website
   - Done! ✅

### Method 2: Link Multiple Numbers

Same URL, different numbers:
- Each number gets its own session
- No limit on connected numbers
- All managed from one bot instance

## ⚡ Quick Checks

### Is it working?

1. **Health Check**
   ```
   https://your-bot-url/ping
   Should show: {"status":"ok"}
   ```

2. **Active Connections**
   ```
   https://your-bot-url/active
   Shows all connected numbers
   ```

3. **Logs**
   - Clever Cloud Dashboard → Logs
   - Look for: "Server running on..."

## 🔧 Common Issues

### "Service Unavailable" when getting code

**Fix:**
1. Check Clever Cloud logs
2. Verify environment variables are set
3. Make sure GitHub token has repo permissions
4. Restart the app in Clever Cloud

### Port Error / App Won't Start

**Fix:**
```env
PORT=8080  ← Must be 8080 for Clever Cloud
```

### GitHub Session Save Failed

**Fix:**
1. Token expired? Generate new one
2. Repository private? Make sure token has access
3. session/ folder exists in repo?

### Number Already Connected

**Solution:** That's fine! It means the number is already linked. 
- Check /active endpoint to see all connections
- Old session exists in GitHub

## 📊 Monitoring Your Bot

**Clever Cloud Dashboard:**
- **Logs**: Real-time bot activity
- **Metrics**: CPU, Memory, Network usage
- **Deployment**: Git commits and deploys
- **Environment**: Update variables anytime

**Bot Endpoints:**
```
/          → Pairing interface
/active    → Connected numbers
/ping      → Health check
```

## 🔄 Updating Your Bot

**Deploy Updates:**
```bash
git add .
git commit -m "Update bot"
git push
```

Clever Cloud auto-deploys in ~2 minutes!

## 💰 Costs

**Free Tier (Clever Cloud):**
- Nano instance: Limited free hours
- Great for testing
- Auto-sleeps when inactive

**Paid Plans:**
- Pico: ~€2-4/month
- No sleep, always-on
- Better for production

## 🎯 Next Steps

1. ✅ Deploy bot
2. ✅ Connect your WhatsApp
3. ✅ Share pairing URL with users
4. ✅ Monitor logs
5. ✅ Customize bot settings

## 📞 Testing

**Quick Test:**
1. Connect via pairing code
2. Send message to bot number
3. Use command: `.menu`
4. Bot should respond!

## 🔐 Security Checklist

- ✅ GitHub token in environment variables (not code)
- ✅ Session repository is private
- ✅ .env file not committed (check .gitignore)
- ✅ Regular token rotation (every 90 days)

---

**Pro Tips:**
- 💡 Bookmark your pairing URL
- 💡 Save environment variables in a secure note
- 💡 Monitor Clever Cloud dashboard regularly
- 💡 Test pairing process before sharing URL
- 💡 Keep GitHub session repo backed up

**Need Help?**
- Check Clever Cloud logs first
- Verify all environment variables
- Test endpoints (/ping, /active)
- Review README.md for detailed docs

---

🎉 **Congratulations!** Your WhatsApp bot is now live on Clever Cloud!

Share your pairing URL and start connecting users! 🚀

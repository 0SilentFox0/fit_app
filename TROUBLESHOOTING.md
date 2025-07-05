# 🔧 Troubleshooting Guide

## Network Connection Issues

If you're getting "Network request failed" errors, try these solutions:

### 1. Check Backend Server Status
```bash
# Test if backend is running
curl http://192.168.100.25:3001/health

# If not running, start it:
cd backend
npm run dev:mock
```

### 2. Update IP Address
If your computer's IP address changed, update it in:
```typescript
// frontend/src/config/api.ts
BASE_URL: 'http://YOUR_NEW_IP:3001/api/v1',
```

To find your IP address:
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1 | head -1 | awk '{print $2}'
```

### 3. Test Different URLs
The app will automatically try these fallback URLs:
- `http://192.168.100.25:3001/api/v1` (main)
- `http://localhost:3001/api/v1` (fallback)
- `http://10.0.2.2:3001/api/v1` (Android emulator)
- `http://127.0.0.1:3001/api/v1` (fallback)

### 4. Check Firewall
Make sure port 3001 is not blocked by your firewall.

### 5. Test API Manually
```bash
# Test login endpoint
curl -X POST http://192.168.100.25:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## Common Issues

### Issue: "Network request failed"
**Solution**: Check if backend server is running and IP address is correct

### Issue: "CORS error"
**Solution**: Backend CORS is configured to allow connections from the frontend

### Issue: "Cannot connect to localhost"
**Solution**: Use your computer's IP address instead of localhost

### Issue: "App shows connection warning"
**Solution**: 
1. Make sure backend server is running
2. Check the IP address in `frontend/src/config/api.ts`
3. Try restarting both frontend and backend

## Debug Steps

1. **Check Backend Logs**:
   ```bash
   cd backend
   npm run dev:mock
   ```

2. **Check Frontend Logs**:
   - Open Expo DevTools in browser
   - Check console for API request logs

3. **Test API Directly**:
   ```bash
   curl http://192.168.100.25:3001/health
   ```

4. **Verify Network**:
   - Make sure your device/simulator is on the same network
   - Try using a different network if needed

## Quick Fix Commands

```bash
# Restart backend
cd backend && npm run dev:mock

# Restart frontend
cd frontend && npm start

# Update IP address (replace with your actual IP)
sed -i '' 's/192.168.100.25/YOUR_IP/g' frontend/src/config/api.ts
```

## Success Indicators

✅ **Backend running**: `🚀 FitConnect Mock API server running on port 3001`  
✅ **API responding**: `{"status":"OK","timestamp":"..."}`  
✅ **Frontend connected**: `🎉 API connection established!`  
✅ **Login working**: Success alert appears after login 
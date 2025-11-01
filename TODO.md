# TODO: Integrate Points to Profile and Add Leaderboard Endpoint

## Steps to Complete

1. **Update constants/api.ts**: Add the leaderboard endpoint to API_ENDPOINTS.
2. **Update services/api.ts**: Add getLeaderboard method to ApiService class.
3. **Update components/leaderboard/LeaderboardList.tsx**: Replace mock data with API fetch, handle loading and error states, and display real leaderboard data.
4. **Update app/(tabs)/profile.tsx**: Integrate reports sent and verified counts from user reports API.
5. **Test the integration**: Run the app and verify leaderboard fetches data correctly, profile points are displayed, and report counts are accurate.

## Progress
- [x] Step 1: Update constants/api.ts
- [x] Step 2: Update services/api.ts
- [x] Step 3: Update LeaderboardList.tsx
- [x] Step 4: Update profile.tsx
- [x] Step 5: Update map.tsx
- [x] Step 6: Integrate remaining points in map and profile with API
- [ ] Step 7: Test integration

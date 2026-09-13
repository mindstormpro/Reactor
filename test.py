import requests

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
    "Accept": "*/*",
    "Referer": "https://defector.hackclub.com/leaderboard",
}

try:
    resp = requests.get(
        "https://defector.hackclub.com/_app/remote/1jsclqx/leaderboardData",
        headers=headers,
        timeout=10,
    )
    resp.raise_for_status()
    print("SUCCESS:", resp.status_code)
    print(resp.text[:200])
except Exception as e:
    print("FAILED:", e)
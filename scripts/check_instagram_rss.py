import feedparser
import requests
import html

def fetch_instagram_from_rss(rss_url, max_posts=6):
    feed = feedparser.parse(rss_url)
    results = []

    for entry in feed.entries[:max_posts]:
        title = entry.title
        link = entry.link
        content = entry.summary

        image_url = None
        if '<img' in content:
            start = content.find('src="') + 5
            end = content.find('"', start)
            raw_url = content[start:end]
            image_url = html.unescape(raw_url)

        results.append({
            "title": title,
            "postUrl": link,
            "imageUrl": image_url
        })

    return results


def post_to_spring_server(data):
    url = "http://localhost:8080/api/instagram/update"
    headers = {
        "Content-Type": "application/json"
    }

    response = requests.post(url, json=data, headers=headers)

    if response.status_code == 200:
        print("✅ 성공적으로 전송됨!")
    else:
        print(f"❌ 전송 실패: {response.status_code}")
        print(response.text)


if __name__ == "__main__":
    rss_url = "https://rss.app/feeds/MfJtfyVkDr4L1OHm.xml"
    posts = fetch_instagram_from_rss(rss_url)

    for i, post in enumerate(posts, 1):
        print(f"[{i}] {post['title']}")
        print(f"🖼️ Image: {post['imageUrl']}")
        print(f"🔗 Link : {post['postUrl']}")
        print()

    post_to_spring_server(posts)
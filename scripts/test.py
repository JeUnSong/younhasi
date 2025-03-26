import requests

# 테스트할 이미지 URL
image_url = "https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/476928810_18486785917054719_8923059527540040950_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08_tt6&_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=103&_nc_oc=Q6cZ2QHkAENtvX6qyVVTShDV18MysbPg-SqaZ074EXmp5l3PCj0dZjp4YZIh1H3kwC3OdBo&_nc_ohc=P8_CbGK39vkQ7kNvgFz-RtD&_nc_gid=atN-jUgI4mxRUz3MGzVtSg&edm=APs17CUBAAAA&ccb=7-5&oh=00_AYEG57jrMoRWFZrTSdN1VDDMQ3GvCU4qH-ulMqW4QFP-dw&oe=67E99AC9&_nc_sid=10d13b"

# 저장할 경로
save_path = "test_insta.jpg"

# 브라우저처럼 요청 헤더 세팅
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    "Referer": "https://www.instagram.com/",
}

try:
    print("📥 다운로드 중...")
    response = requests.get(image_url, headers=headers, stream=True)
    if response.status_code == 200:
        with open(save_path, 'wb') as f:
            for chunk in response.iter_content(1024):
                f.write(chunk)
        print(f"✅ 저장 완료: {save_path}")
    else:
        print(f"❌ 다운로드 실패: 상태 코드 {response.status_code}")
except Exception as e:
    print(f"❌ 오류 발생: {e}")
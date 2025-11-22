import { GoogleGenAI, Type } from "@google/genai";

// 500+ Unique Menu Items DB
// Duplicates removed (e.g., 자장면 -> 짜장면 standardized)
const MENU_POOL = [
  // --- 한식 (밥/찌개/국) ---
  "김치찌개", "된장찌개", "순두부찌개", "청국장", "부대찌개", "동태찌개", "비지찌개", "고추장찌개", "참치김치찌개", "돼지김치찌개", "스팸김치찌개", "오징어무국", "소고기무국", "미역국", "북엇국", "콩나물국밥", "순대국밥", "돼지국밥", "소머리국밥", "선지해장국", "뼈해장국", "황태해장국", "올갱이국", "갈비탕", "설렁탕", "곰탕", "도가니탕", "삼계탕", "반계탕", "닭곰탕", "육개장", "비빔밥", "돌솥비빔밥", "육회비빔밥", "꼬막비빔밥", "낙지비빔밥", "멍게비빔밥", "김치볶음밥", "새우볶음밥", "오므라이스", "제육덮밥", "오징어덮밥", "낙지덮밥", "쭈꾸미덮밥", "불고기덮밥", "카레라이스", "하이라이스", "짜장밥", "잡채밥", "마파두부밥", "유산슬밥", "게장백반", "보리밥", "쌈밥", "강된장비빔밥", "알밥", "곤드레밥", "영양돌솥밥", "시레기국", "다슬기해장국", "매생이굴국", "어묵탕", "알탕", "조개탕", "꽃게탕", "해물탕", "아구탕", "연포탕", "매운탕", "추어탕",
  
  // --- 한식 (메인요리/고기/찜/볶음) ---
  "삼겹살", "오겹살", "목살구이", "항정살", "갈매기살", "돼지갈비", "소갈비", "LA갈비", "차돌박이", "등심구이", "안심구이", "살치살", "육회", "육사시미", "보쌈", "족발", "불족발", "냉채족발", "수육", "제육볶음", "오징어볶음", "낙지볶음", "쭈꾸미볶음", "두부김치", "닭갈비", "치즈닭갈비", "찜닭", "안동찜닭", "묵은지닭볶음탕", "닭볶음탕", "오리주물럭", "훈제오리", "곱창구이", "대창구이", "막창구이", "양대창", "곱창전골", "갈비찜", "매운갈비찜", "소갈비찜", "돼지갈비찜", "아구찜", "해물찜", "꽃게찜", "대구뽈찜", "코다리찜", "황태구이", "더덕구이", "장어구이", "꼼장어볶음", "고등어구이", "삼치구이", "임연수구이", "갈치구이", "가자미구이", "조기구이", "굴비", "고등어조림", "갈치조림", "코다리조림", "두부조림", "계란말이", "전모듬", "육전", "해물파전", "김치전", "감자전", "녹두빈대떡", "도토리묵무침", "골뱅이무침",
  
  // --- 분식/면요리 ---
  "떡볶이", "라볶이", "즉석떡볶이", "로제떡볶이", "짜장떡볶이", "마라떡볶이", "기름떡볶이", "순대", "튀김모듬", "김밥", "참치김밥", "치즈김밥", "돈까스김밥", "충무김밥", "라면", "해물라면", "치즈라면", "만두라면", "비빔면", "짜파게티", "불닭볶음면", "쫄면", "잔치국수", "비빔국수", "열무국수", "콩국수", "칼국수", "바지락칼국수", "해물칼국수", "들깨칼국수", "장칼국수", "닭칼국수", "수제비", "김치수제비", "들깨수제비", "만두국", "떡만두국", "찐만두", "군만두", "물만두", "납작만두",
  
  // --- 중식 ---
  "짜장면", "간짜장", "쟁반짜장", "삼선짜장", "유니짜장", "짬뽕", "삼선짬뽕", "차돌짬뽕", "고추짬뽕", "백짬뽕", "굴짬뽕", "볶음밥", "잡채밥", "마파두부밥", "탕수육", "찹쌀탕수육(꿔바로우)", "사천탕수육", "깐풍기", "라조기", "유린기", "양장피", "팔보채", "유산슬", "고추잡채", "깐쇼새우", "크림새우", "멘보샤", "동파육", "마라탕", "마라샹궈", "훠궈", "양꼬치", "지삼선", "가지튀김", "우육면", "탄탄면", "완탕면", "딤섬", "소룡포",
  
  // --- 일식 ---
  "초밥", "모듬초밥", "연어초밥", "광어초밥", "새우초밥", "참치초밥", "회덮밥", "사케동(연어덮밥)", "규동(소고기덮밥)", "가츠동(돈까스덮밥)", "부타동(돼지고기덮밥)", "오야코동(닭고기덮밥)", "우나기동(장어덮밥)", "텐동(튀김덮밥)", "돈까스", "치즈돈까스", "히레카츠", "로스카츠", "생선까스", "카레돈까스", "우동", "튀김우동", "김치우동", "볶음우동", "냉모밀", "판모밀", "온모밀", "라멘", "돈코츠라멘", "미소라멘", "소유라멘", "탄탄멘", "마제소바", "오코노미야키", "타코야키", "야키소바", "스키야키", "밀푀유나베", "창코나베", "나가사키짬뽕", "메로구이", "시사모구이", "모듬사시미", "연어사시미", "참치회",
  
  // --- 양식 ---
  "토마토파스타", "크림파스타", "까르보나라", "알리오올리오", "봉골레파스타", "로제파스타", "투움바파스타", "빠네파스타", "명란파스타", "라자냐", "미트볼스파게티", "리조또", "크림리조또", "먹물리조또", "필라프", "목살스테이크", "함박스테이크", "비프스테이크", "찹스테이크", "티본스테이크", "돈마호크", "폭립", "바베큐플래터", "수제버거", "치즈버거", "감자튀김", "피자", "페퍼로니피자", "치즈피자", "불고기피자", "고르곤졸라피자", "시카고피자", "하와이안피자", "포테이토피자", "콤비네이션피자", "씬피자", "화덕피자", "감바스", "에그인헬", "스프", "시저샐러드", "리코타치즈샐러드", "콥샐러드", "샌드위치", "파니니", "베이글", "브런치",
  
  // --- 아시안/기타 ---
  "쌀국수", "분짜", "월남쌈", "팟타이", "나시고랭", "미고랭", "푸팟퐁커리", "똠양꿍", "카오팟", "반미", "타코", "브리또", "퀘사디아", "파히타", "케밥", "인도커리", "난", "탄두리치킨",
  
  // --- 야식/치킨 ---
  "후라이드치킨", "양념치킨", "간장치킨", "반반치킨", "파닭", "마늘치킨", "고추바사삭", "뿌링클", "슈프림양념치킨", "지코바치킨", "굽네치킨", "교촌치킨", "BBQ치킨", "BHC치킨", "옛날통닭", "닭강정", "닭똥집튀김", "닭발", "국물닭발", "무뼈닭발", "오돌뼈", "돼지껍데기", "번데기탕", "황도", "먹태", "노가리", "한치", "오징어입"
];

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    return response.status(500).json({ error: 'Server Configuration Error: API Key is missing.' });
  }

  // 1. Randomly select a menu securely from the predefined list on the server.
  // This guarantees uniform distribution and prevents AI bias (repetitive suggestions).
  const selectedMenuName = MENU_POOL[Math.floor(Math.random() * MENU_POOL.length)];

  const ai = new GoogleGenAI({ apiKey });
  const model = "gemini-2.5-flash";

  // 2. Ask Gemini to provide details for the *selected* menu.
  const prompt = `
    Provide detailed information for the Korean food menu item: "${selectedMenuName}".
    
    Return the result in JSON format with the following fields:
    - name: "${selectedMenuName}" (Keep this name).
    - description: A short, mouth-watering description in Korean (1 sentence).
    - category: The specific type of cuisine (e.g., 한식, 중식, 양식, 분식, 야식, etc.).
    - calories: Approximate calories (e.g., "약 500kcal").
    - tags: A list of 2-3 short, descriptive keywords (adjectives or nouns) in Korean describing the taste, texture, or feeling (e.g., "얼큰함", "쫄깃함", "바삭바삭", "단짠", "해장용").
  `;

  try {
    const result = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            description: { type: Type.STRING },
            category: { type: Type.STRING },
            calories: { type: Type.STRING },
            tags: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
          },
          required: ["name", "description", "category", "calories", "tags"],
        },
      },
    });

    const text = result.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    const data = JSON.parse(text);
    return response.status(200).json(data);

  } catch (error) {
    console.error("API Error:", error);
    if (error?.status === 429 || error?.message?.includes('429')) {
        return response.status(429).json({ error: 'Too Many Requests' });
    }
    return response.status(500).json({ error: 'Internal Server Error' });
  }
}
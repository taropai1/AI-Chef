// ==================== 全局配置 ====================
const DEEPSEEK_API = "https://api.taropai.com/v1/chat/completions";
const BACKEND_URL = "https://auth.taropai.com";
const LANGS = ['en', 'es', 'fr', 'de', 'it', 'pt', 'zh-CN'];
function getCurrentLang() {
  const stored = localStorage.getItem('aiChefLang');
  return stored && LANGS.includes(stored) ? stored : 'en';
}
const CUISINES = ["American","Italian","Mexican","French","Spanish","German","Mediterranean","Middle Eastern","Chinese Home Cooking","Chinese Cantonese Cuisine","Chinese Sichuan Cuisine","Chinese Hunan Cuisine","Chinese Huaiyang Cuisine","Chinese Northern Cuisine","Japanese Cuisine","Thai Cuisine","Korean cuisine","Indian Cuisine"];
const CUISINE_MAP = {
  'zh-CN': {
    "American":"美式西餐","Italian":"意大利餐","Mexican":"墨西哥菜","French":"法国菜","Spanish":"西班牙菜","German":"德式西餐",
    "Mediterranean":"地中海菜","Middle Eastern":"中东菜","Chinese Home Cooking":"中餐家常菜","Chinese Cantonese Cuisine":"中餐粤菜",
    "Chinese Sichuan Cuisine":"中餐川菜","Chinese Hunan Cuisine":"中餐湘菜","Chinese Huaiyang Cuisine":"中餐苏菜/淮扬菜",
    "Chinese Northern Cuisine":"中餐东北菜","Japanese Cuisine":"日本料理","Thai Cuisine":"泰国菜","Korean cuisine":"韩国菜","Indian Cuisine":"印度菜"
  },
  'es': {
    "American":"Americana","Italian":"Italiana","Mexican":"Mexicana","French":"Francesa","Spanish":"Española","German":"Alemana",
    "Mediterranean":"Mediterránea","Middle Eastern":"Oriente Medio","Chinese Home Cooking":"Cocina casera china","Chinese Cantonese Cuisine":"Cocina cantonesa",
    "Chinese Sichuan Cuisine":"Cocina sichuanesa","Chinese Hunan Cuisine":"Cocina hunanesa","Chinese Huaiyang Cuisine":"Cocina huaiyang",
    "Chinese Northern Cuisine":"Cocina del norte de China","Japanese Cuisine":"Japonesa","Thai Cuisine":"Tailandesa","Korean cuisine":"Coreana","Indian Cuisine":"India"
  },
  'fr': {
    "American":"Américaine","Italian":"Italienne","Mexican":"Mexicaine","French":"Française","Spanish":"Espagnole","German":"Allemande",
    "Mediterranean":"Méditerranéenne","Middle Eastern":"Moyen-Orient","Chinese Home Cooking":"Cuisine familiale chinoise","Chinese Cantonese Cuisine":"Cuisine cantonaise",
    "Chinese Sichuan Cuisine":"Cuisine sichuanaise","Chinese Hunan Cuisine":"Cuisine hunanaise","Chinese Huaiyang Cuisine":"Cuisine huaiyang",
    "Chinese Northern Cuisine":"Cuisine du nord de la Chine","Japanese Cuisine":"Japonaise","Thai Cuisine":"Thaïlandaise","Korean cuisine":"Coréenne","Indian Cuisine":"Indienne"
  },
  'de': {
    "American":"Amerikanisch","Italian":"Italienisch","Mexican":"Mexikanisch","French":"Französisch","Spanish":"Spanisch","German":"Deutsch",
    "Mediterranean":"Mediterran","Middle Eastern":"Nahöstlich","Chinese Home Cooking":"Chinesische Hausmannskost","Chinese Cantonese Cuisine":"Kantonesische Küche",
    "Chinese Sichuan Cuisine":"Szechuan-Küche","Chinese Hunan Cuisine":"Hunan-Küche","Chinese Huaiyang Cuisine":"Huaiyang-Küche",
    "Chinese Northern Cuisine":"Nordchinesische Küche","Japanese Cuisine":"Japanisch","Thai Cuisine":"Thailändisch","Korean cuisine":"Koreanisch","Indian Cuisine":"Indisch"
  },
  'it': {
    "American":"Americana","Italian":"Italiana","Mexican":"Messicana","French":"Francese","Spanish":"Spagnola","German":"Tedesca",
    "Mediterranean":"Mediterranea","Middle Eastern":"Medio Oriente","Chinese Home Cooking":"Cucina casalinga cinese","Chinese Cantonese Cuisine":"Cucina cantonese",
    "Chinese Sichuan Cuisine":"Cucina sichuanese","Chinese Hunan Cuisine":"Cucina hunanese","Chinese Huaiyang Cuisine":"Cucina huaiyang",
    "Chinese Northern Cuisine":"Cucina del nord della Cina","Japanese Cuisine":"Giapponese","Thai Cuisine":"Tailandese","Korean cuisine":"Coreana","Indian Cuisine":"Indiana"
  },
  'pt': {
    "American":"Americana","Italian":"Italiana","Mexican":"Mexicana","French":"Francesa","Spanish":"Espanhola","German":"Alemã",
    "Mediterranean":"Mediterrânea","Middle Eastern":"Oriente Médio","Chinese Home Cooking":"Culinária caseira chinesa","Chinese Cantonese Cuisine":"Culinária cantonesa",
    "Chinese Sichuan Cuisine":"Culinária sichuanesa","Chinese Hunan Cuisine":"Culinária hunanesa","Chinese Huaiyang Cuisine":"Culinária huaiyang",
    "Chinese Northern Cuisine":"Culinária do norte da China","Japanese Cuisine":"Japonesa","Thai Cuisine":"Tailandesa","Korean cuisine":"Coreana","Indian Cuisine":"Indiana"
  }
};

const PLANS = {
  free: { dailyLimit: 3, qPerRecipe: 0 },
  starter: { dailyLimit: 10, qPerRecipe: 5 },
  pro: { dailyLimit: 30, qPerRecipe: 5 },
  premium: { dailyLimit: 80, qPerRecipe: 5 },
  business: { dailyLimit: 300, qPerRecipe: 5 }
};

function getCurrentLang() {
  const stored = localStorage.getItem('aiChefLang');
  return stored && LANGS.includes(stored) ? stored : 'en';
}

let currentLang = localStorage.getItem('aiChefLang');
if (!currentLang) {
  const browserLang = navigator.language.split('-')[0];
  currentLang = LANGS.includes(browserLang) ? browserLang : 'en';
  localStorage.setItem('aiChefLang', currentLang);
}
let deviceId = null;
let userData = null;
let recipeHistory = [];
let historyIndex = -1;
const MAX_HISTORY = 6;

// ==================== 多语言翻译（7种语言完整） ====================
const translations = {
  en: {
    heroSubtitle: 'Global Cuisines · Smart Pairing', sectionFeatures: 'Features', feat1: '18 Cuisines', feat1Sub: 'Global flavors',
    feat2: 'AI Assistant', feat2Sub: 'Interactive Q&A', feat3: 'Nutrition', feat3Sub: 'Healthy Weight', feat4: 'Baby Safe',
    feat4Sub: 'No salt/sugar', feat5: 'Pregnancy', feat5Sub: 'Mom friendly', feat6: 'Video Guides', feat6Sub: 'Step-by-step',
    sectionSubscribe: 'Subscription Plans', subText: 'Subscribe', subSub: 'Unlock full access', familyText: 'Family Share',
    familySub: 'Multi-User Plan', legalLink: 'Privacy/Terms', genTitle: 'AI Recipe Generator', genMealType: 'Category',
    genCuisine: 'Cuisine', genDishName: 'What to eat?', optStandard: 'Standard', optBaby: 'Baby', optPregnancy: 'Pregnancy',
    generate: 'Generate Recipe', generating: 'Generating...', aiAssistTitle: 'AI Assistant', enterQuestion: 'Ask about this recipe...',
    ask: 'Ask', dishNameHint: 'Enter ingredients, dish names or food items.', watchVideo: 'Watch Video Guides',
    addToHome: 'Add', freeLimitInfo: 'Free trial: {{used}}/3', starterInfo: 'Starter: {{used}}/10 | Q left: {{qLeft}}',
    proInfo: 'Pro: {{used}}/30 | Q left: {{qLeft}}', premiumInfo: 'Premium Family: {{used}}/80 | Q left: {{qLeft}}',
    businessInfo: 'Business: {{used}}/300 | Q left: {{qLeft}}', alertNoPermission: 'Your free trial has expired. Subscribe to continue.',
    alertDailyLimit: 'Daily limit reached. Please upgrade or try tomorrow.', alertNoPoints: 'Insufficient quota.',
    alertCooldown: 'Too fast, please wait.', alertMonthlyCost: 'Monthly limit reached.', alertNoRecipe: 'Generate a recipe first.',
    alertQTooLong: 'Question too long.', alertInvalidFood: 'Please enter a valid food name.', paymentSuccess: 'Subscription activated!',
    q: 'Q', a: 'A', qLimitReached: 'You\'ve reached the 5-question limit for this recipe.', starterName: 'Starter', proName: 'Pro',
    premiumName: 'Premium Family', businessName: 'Business Kitchen', starterDesc: '10 recipes/day · 5 AI questions',
    proDesc: '30 recipes/day · 5 AI questions', premiumDesc: '80 recipes/day shared · 5 AI questions · Family share',
    businessDesc: '300 recipes/day · 5 AI questions · Commercial use', finePrint: 'By subscribing you agree to our ',
    loginTitle: 'Login', registerTitle: 'Sign Up', email: 'Email', password: 'Password', confirmPwd: 'Confirm Password',
    forgot: 'Forgot password?', noAccount: 'New?', signUp: 'Sign Up', signIn: 'Login', haveAccount: 'Have account?',
    forgotTitle: 'Reset Password', cancel: 'Cancel', reset: 'Reset', profileNickname: 'Nickname', profileEmail: 'Email',
    profilePlan: 'Plan', profileJoined: 'Joined', logout: 'Sign Out', profileSub: 'My Subscription', subStatus: 'Status',
    subExpiry: 'Expires', inviteCodeTitle: 'Invite Code', joinFamily: 'Join', nicknameTitle: 'Change Nickname',
    emailTitle: 'Change Email', legalPrivacyTitle: 'Privacy Policy', legalEffDate: 'Effective date: 2025-01-01',
    legalPrivacyCollect: '1. Information We Collect', legalPrivacy1: 'AI Chef is a client-side application. We do not collect, store, or transmit any personal information.',
    legalPrivacyUse: '2. Information Use', legalPrivacy2: 'All recipe generation runs locally on your device.',
    legalPrivacySecurity: '3. Data Security', legalPrivacy3: 'No data collected = no risk of breach.',
    legalPrivacyChanges: '4. Policy Changes', legalPrivacy4: 'We may update this policy. Changes will be posted here.',
    legalPrivacyContact: '5. Contact Us', legalPrivacy5: 'Contact us at go@tarop.top if you have questions.',
    legalTermsTitle: 'Terms of Service', legalTermEffDate: 'Effective Date: 2025-01-01', legalTermsLicense: '1. License',
    legalTerms1: 'For personal, non-commercial use only. Business Kitchen subscribers are permitted to use the service for commercial purposes.',
    legalTermsDisclaimer: '2. Disclaimer', legalTerms2: 'Recipes are AI-generated and for reference only.',
    legalTermsLimitations: '3. Limitation of Liability', legalTerms3: 'We are not liable for any damages.',
    legalTermsModifications: '4. Modifications', legalTerms4: 'We may modify these terms at any time.',
    legalTermsLaw: '5. Governing Law', legalTerms5: 'Governing law: your jurisdiction.',
    legalTermsSubRules: '6. Subscription Rules', legalTermsSub1: '6.1 Subscribers have access upon login.',
    legalTermsSub2: '6.2 Four subscription types: Starter, Pro, Premium Family, Business.',
    legalTermsSub3: '6.3 Orders must be activated within 24 hours by logging in.',
    legalTermsSub4: '6.4 Each recipe generation grants 5 AI questions for that session.',
    legalTermsSub5: '6.5 Family share is available only for Premium Family (up to 3 people).',
    legalTermsSub6: '6.6 Auto-renewal is enabled by default; manage via PayPal.',
    legalTermsSub7: '6.7 No refunds after payment.', legalTermsSub8: '6.8 Use a valid email; we are not responsible for account loss due to fake emails.',
    legalTermsSub9: '6.9 Recipes and answers are AI-generated by DeepSeek and for reference only.',
    legalTermsSub10: '6.10 We reserve the right of final interpretation.', success: 'Success', ok: 'OK',
    personalizedGreeting: 'Dear Gourmet! Enjoy your meal!', save: 'Save', edit: 'Edit',
    change: 'Change', pleaseLogin: 'Please log in to continue', sendCode: 'Send code', sending: 'Sending...', codeSent: 'Verification code sent!',
    codeSendFailed: 'Failed to send code. Please try again.', registerSuccess: 'Registration successful!', loginFailed: 'Login failed. Please check your credentials.',
    pricingSubtitle: 'Choose Your Plan', pricingTitle: 'Subscription Plans', planStarterName: 'Starter',
    planStarterDesc: 'Your personal cooking assistant', planStarterPeriod: '/ month', planProName: 'Pro',
    planProDesc: 'Most popular among food lovers', planProPeriod: '/ month', planPremiumName: 'Premium',
    planPremiumDesc: 'Suitable for multi-user sharing', planPremiumPeriod: '/ month', planBusinessName: 'Business',
    planBusinessDesc: 'For commercial kitchens & catering', planBusinessPeriod: '/ month', subscribeBtn: 'Subscribe Now',
    planNotice: 'Secured by PayPal · Auto-renewal', featureStarter1: '10 recipes daily', featureStarter2: '5 AI queries per recipe',
    featureStarter3: 'For personal use only', featureStarter4: 'Generate recipes from any ingredients', featurePro1: '30 recipes daily',
    featurePro2: '5 AI queries per recipe', featurePro3: 'All features unlocked', featurePro4: 'Advanced recipe customization',
    featurePremium1: '80 recipes daily', featurePremium2: '5 AI queries per recipe', featurePremium3: 'Up to 3 users sharing',
    featurePremium4: 'Shared usage pool', featurePremium5: 'Health & nutrition analysis', featureBusiness1: '300 daily generations',
    featureBusiness2: '5 AI queries per recipe', featureBusiness3: 'Priority generation queue', featureBusiness4: 'Commercial usage rights',
    featureBusiness5: 'Extended recipe permissions', freeTierDesc: "You're on the free tier.", promoTitle: 'Go Premium',
    promoSub: 'Unlock everything for your cooking', promoFeature1: 'Unlimited recipes', promoFeature2: 'Family sharing',
    promoFeature3: 'Nutrition insights', promoFeature4: 'Ad-free experience',personalizedGreeting: 'Dear Gourmet! Enjoy your meal!', howToUse: 'How to use', qLeft: 'Q left',
    howToTitle: 'How to use', ingredients: 'Ingredients', instructions: 'Instructions', nutrition: 'Nutrition', warnings: 'Allergens & Safety', minutes: 'mins',
    howToList: [
      'You can enter one or more ingredients, such as potatoes, spinach, chicken breast, salmon.',
      'You can search for classic dishes and meals, such as grilled steak, roasted veggies, omelette, pasta.',
      'You can look up desserts and baked treats, such as cheesecake, vanilla ice cream, croissant, muffin.',
      'You can find recipes for soups, drinks & homemade beverages, such as tomato soup, iced coffee, cocktail, fresh juice.',
      'Filter by taste and style: comfort food, savory dishes, spicy meals, sweet treats and healthy options.',
      'Discover global cuisines and make dishes from around the world.',
      'If you dislike a recipe, tap Generate again for brand-new cooking ideas.'
    ],
    howToHighlight: 'Type any food-related words to explore countless recipes. Get popular, authentic dishes from worldwide cuisines with AI.',
    homeHeroTitle: 'Discover Endless Recipes with AI',
    homeHeroDesc: 'Type any ingredient, dish, or cuisine. Our AI chef creates authentic, delicious meals from around the world instantly.',
    homeCtaBtn: 'Try For Free',
    homeFeature1Title: 'Search by Ingredients', homeFeature1Desc: 'Enter one or more ingredients, such as potatoes, spinach, chicken breast, salmon.',
    homeFeature2Title: 'Find Classic Dishes', homeFeature2Desc: 'Search for grilled steak, roasted veggies, omelette, pasta, and more.',
    homeFeature3Title: 'Desserts & Bakes', homeFeature3Desc: 'Cheesecake, vanilla ice cream, croissant, muffin, and sweet treats.',
    homeFeature4Title: 'Soups & Drinks', homeFeature4Desc: 'Tomato soup, iced coffee, cocktail, fresh juice, homemade beverages.',
    homeFeature5Title: 'Global Cuisines', homeFeature5Desc: 'Discover worldwide cuisines and make authentic dishes from any culture.',
    homeFeature6Title: 'Unlimited Ideas', homeFeature6Desc: 'Tap Generate again for fresh, new cooking ideas anytime you want.',
    homeBottomTitle: 'Simple. Fast. Delicious.',
    homeBottomDesc: 'Type any food-related keywords to explore endless recipes. Get popular, authentic dishes from worldwide cuisines with AI.',
    homeSubscriptionLink: 'Subscription'
  },
  'zh-CN': {
    heroSubtitle: '全球菜系 · 智能搭配', sectionFeatures: '功能特点', feat1: '18种菜系', feat1Sub: '世界风味',
    feat2: 'AI助手', feat2Sub: '对话式解答', feat3: '营养分析', feat3Sub: '健康参考', feat4: '婴儿安全',
    feat4Sub: '无盐无糖', feat5: '孕期', feat5Sub: '母婴友好', feat6: '视频指南', feat6Sub: '分步教学',
    sectionSubscribe: '订阅套餐', subText: '订阅', subSub: '解锁全部功能', familyText: '家庭共享',
    familySub: '多账号共享套餐', legalLink: '隐私/服务', genTitle: 'AI食谱生成器', genMealType: '分类',
    genCuisine: '菜系', genDishName: '你想吃什么？', optStandard: '日常餐', optBaby: '婴儿餐', optPregnancy: '孕期餐',
    generate: '生成食谱', generating: '生成中...', aiAssistTitle: 'AI助手', enterQuestion: '针对此食谱提问...',
    ask: '提问', dishNameHint: '输入食材、菜名或食品名称', watchVideo: '观看视频指南', addToHome: '添加',
    freeLimitInfo: '免费试用：{{used}}/3', starterInfo: '基础订阅：{{used}}/10 | 剩余提问 {{qLeft}}',
    proInfo: '高级订阅：{{used}}/30 | 剩余提问 {{qLeft}}', premiumInfo: '家庭共享：{{used}}/80 | 剩余提问 {{qLeft}}',
    businessInfo: '商业版：{{used}}/300 | 剩余提问 {{qLeft}}', alertNoPermission: '免费试用已用完，请订阅后继续。',
    alertDailyLimit: '今日次数已达上限，请升级或明日再试。', alertNoPoints: '配额不足。', alertCooldown: '操作过快，请稍等。',
    alertMonthlyCost: '月度限额已达。', alertNoRecipe: '请先生成食谱。', alertQTooLong: '问题过长。', alertInvalidFood: '请输入有效食材。',
    paymentSuccess: '订阅成功！', q: '问', a: '答', qLimitReached: '本食谱已达到5次提问上限。', starterName: '基础订阅',
    proName: '高级订阅', premiumName: '家庭共享版', businessName: '商业厨房版', starterDesc: '10次/日 · 每食谱5问',
    proDesc: '30次/日 · 每食谱5问', premiumDesc: '80次/日家庭共享 · 每食谱5问', businessDesc: '300次/日 · 每食谱5问 · 商业用途',
    finePrint: '订阅即表示同意', loginTitle: '登录', registerTitle: '注册', email: '邮箱', password: '密码',
    confirmPwd: '确认密码', forgot: '忘记密码？', noAccount: '新账户？', signUp: '注册', signIn: '登录', haveAccount: '有账户吗？',
    forgotTitle: '重置密码', cancel: '取消', reset: '重置', profileNickname: '昵称', profileEmail: '邮箱',
    profilePlan: '套餐', profileJoined: '注册时间', logout: '退出账号', profileSub: '我的订阅', subStatus: '状态',
    subExpiry: '到期', inviteCodeTitle: '邀请码', joinFamily: '加入', nicknameTitle: '修改昵称', emailTitle: '修改邮箱',
    legalPrivacyTitle: '隐私政策', legalEffDate: '生效日期：2025-01-01', legalPrivacyCollect: '1. 信息收集',
    legalPrivacy1: 'AI厨师是客户端应用，不收集个人信息。', legalPrivacyUse: '2. 信息使用', legalPrivacy2: '所有食谱生成在本地进行。',
    legalPrivacySecurity: '3. 数据安全', legalPrivacy3: '不收集数据 = 无泄露风险。', legalPrivacyChanges: '4. 政策变更',
    legalPrivacy4: '我们可能更新本政策，变更将在此处公告。', legalPrivacyContact: '5. 联系我们', legalPrivacy5: '如有问题请联系我们：go@tarop.top',
    legalTermsTitle: '服务条款', legalTermEffDate: '生效日期：2025-01-01', legalTermsLicense: '1. 许可',
    legalTerms1: '仅限个人非商业使用。商业厨房版订阅用户允许用于商业用途。', legalTermsDisclaimer: '2. 免责声明',
    legalTerms2: 'AI生成内容仅供参考。', legalTermsLimitations: '3. 责任限制', legalTerms3: '我们不承担任何损害责任。',
    legalTermsModifications: '4. 修改', legalTerms4: '我们可随时修改条款。', legalTermsLaw: '5. 适用法律',
    legalTerms5: '适用法律：用户所在司法管辖区。', legalTermsSubRules: '6. 订阅规则', legalTermsSub1: '6.1 订阅者登录后即享有本工具站权益。',
    legalTermsSub2: '6.2 订阅类型：基础订阅、高级订阅、家庭共享、商业厨房。', legalTermsSub3: '6.3 订单激活期限为24小时，登录账号即自动激活权益。',
    legalTermsSub4: '6.4 订阅用户每生成食谱1次赠5次AI助手提问，当次使用不结转。', legalTermsSub5: '6.5 家庭共享仅限Premium套餐，最多3人共用。',
    legalTermsSub6: '6.6 订阅自动续费默认开启，用户需通过PayPal管理。', legalTermsSub7: '6.7 订单支付后不支持退款。',
    legalTermsSub8: '6.8 请使用真实邮箱，虚假信息导致账号丢失本站不担责。', legalTermsSub9: '6.9 菜谱及问答由DeepSeek生成，仅供参考。',
    legalTermsSub10: '6.10 本站拥有最终解释权。', success: '成功', ok: '确定', personalizedGreeting: '亲爱的Gourmet！祝您用餐愉快！',
    save: '保存', edit: '编辑', change: '更改', pleaseLogin: '请先登录', sendCode: '发送验证码', sending: '发送中...',
    codeSent: '验证码已发送！', codeSendFailed: '发送失败，请重试。', registerSuccess: '注册成功！', loginFailed: '登录失败，请检查邮箱和密码。',
    pricingSubtitle: '选择您的套餐', pricingTitle: '订阅方案', planStarterName: '基础订阅', planStarterDesc: '您的私人烹饪助手',
    planStarterPeriod: '/ 月', planProName: '高级订阅', planProDesc: '美食爱好者首选', planProPeriod: '/ 月',
    planPremiumName: '家庭共享', planPremiumDesc: '适合多用户共享', planPremiumPeriod: '/ 月', planBusinessName: '商业厨房',
    planBusinessDesc: '商业厨房与餐饮专用', planBusinessPeriod: '/ 月', subscribeBtn: '立即订阅', planNotice: 'PayPal 安全支付 · 自动续费',
    featureStarter1: '每日 10 次生成', featureStarter2: '每份食谱 5 次 AI 提问', featureStarter3: '仅限个人使用', featureStarter4: '任意食材生成食谱',
    featurePro1: '每日 30 次生成', featurePro2: '每份食谱 5 次 AI 提问', featurePro3: '解锁全部功能', featurePro4: '高级食谱定制',
    featurePremium1: '每日 80 次生成', featurePremium2: '每份食谱 5 次 AI 提问', featurePremium3: '最多 3 人共享', featurePremium4: '共享用量池',
    featurePremium5: '健康与营养分析', featureBusiness1: '每日 300 次生成', featureBusiness2: '每份食谱 5 次 AI 提问', featureBusiness3: '优先生成队列',
    featureBusiness4: '商业使用授权', featureBusiness5: '扩展食谱权限', freeTierDesc: '您当前为免费用户。', promoTitle: '升级高级版',
    promoSub: '解锁全部烹饪功能', promoFeature1: '无限食谱生成', promoFeature2: '家庭共享', promoFeature3: '营养分析', promoFeature4: '无广告体验',
    howToTitle: '使用说明', ingredients: '食材准备', instructions: '制作方法', nutrition: '营养参数', warnings: '风险提示与建议', minutes: '分钟', personalizedGreeting: '亲爱的美食家！祝您用餐愉快！', howToUse: '使用说明', qLeft: '剩余提问',
    howToList: [
      '可输入单种或多种食材，例如：土豆、菠菜、鸡胸肉、三文鱼。',
      '可搜索各类经典餐食，例如：炙烤牛排、烤杂蔬、煎蛋卷、意面。',
      '可查询甜品与烘焙食品，例如：芝士蛋糕、香草冰淇淋、可颂、玛芬。',
      '可查找汤品、饮品配方，例如：番茄浓汤、冰咖啡、鸡尾酒、鲜榨果汁。',
      '按口味自由筛选：家常简餐、咸食、辣味、甜品、健康轻食。',
      '探索全球菜系，制作各地特色美食。',
      '对食谱不满意，点击生成，即可更换全新做法。'
    ],
    howToHighlight: '输入任意美食关键词，解锁海量做法，AI 为你提供全球地道人气料理教程。',
    homeHeroTitle: '用AI发现无限美食食谱',
    homeHeroDesc: '输入任意食材、菜品或菜系，AI 大厨秒级生成全球地道美味食谱。',
    homeCtaBtn: '立即免费体验',
    homeFeature1Title: '按食材搜索', homeFeature1Desc: '输入一种或多种食材，例如土豆、菠菜、鸡胸肉、三文鱼。',
    homeFeature2Title: '查找经典菜品', homeFeature2Desc: '搜索烤牛排、烤蔬菜、煎蛋卷、意面等经典美食。',
    homeFeature3Title: '甜点与烘焙', homeFeature3Desc: '芝士蛋糕、香草冰淇淋、可颂、玛芬等甜品食谱。',
    homeFeature4Title: '汤品与饮品', homeFeature4Desc: '番茄汤、冰咖啡、鸡尾酒、鲜榨果汁等自制饮品食谱。',
    homeFeature5Title: '全球菜系', homeFeature5Desc: '探索全球菜系，复刻各国地道美食。',
    homeFeature6Title: '无限灵感', homeFeature6Desc: '随时点击生成，获取全新烹饪灵感。',
    homeBottomTitle: '简单、快捷、美味',
    homeBottomDesc: '输入任意美食关键词，探索无限食谱。AI 带你解锁全球热门地道菜品。',
    homeSubscriptionLink: '订阅'
  },
  es: {
    heroSubtitle: 'Cocinas Globales · Combinación Inteligente', sectionFeatures: 'Características', feat1: '18 Cocinas', feat1Sub: 'Sabores globales',
    feat2: 'Asistente IA', feat2Sub: '5 preguntas por receta', feat3: 'Nutrición', feat3Sub: 'Peso saludable', feat4: 'Seguro para bebés',
    feat4Sub: 'Sin sal/azúcar', feat5: 'Embarazo', feat5Sub: 'Amigable para mamá', feat6: 'Guías en video', feat6Sub: 'Paso a paso',
    sectionSubscribe: 'Planes de suscripción', subText: 'Suscribirse', subSub: 'Acceso completo', familyText: 'Compartir en familia',
    familySub: 'Solo Premium', legalLink: 'Privacidad/Términos', genTitle: 'Generador de recetas IA', genMealType: 'Categoría',
    genCuisine: 'Cocina', genDishName: '¿Qué quieres comer?', optStandard: 'Estándar', optBaby: 'Bebé', optPregnancy: 'Embarazo',
    generate: 'Generar receta', generating: 'Generando...', aiAssistTitle: 'Asistente IA', enterQuestion: 'Pregunta sobre esta receta...',
    ask: 'Preguntar', dishNameHint: 'Ingresa ingredientes, platos o alimentos.', watchVideo: 'Ver guías en video', addToHome: 'Agregar',
    freeLimitInfo: 'Prueba gratuita: {{used}}/3', starterInfo: 'Starter: {{used}}/10 | Preguntas restantes: {{qLeft}}',
    proInfo: 'Pro: {{used}}/30 | Preguntas restantes: {{qLeft}}', premiumInfo: 'Premium Family: {{used}}/80 | Preguntas restantes: {{qLeft}}',
    businessInfo: 'Business: {{used}}/300 | Preguntas restantes: {{qLeft}}', alertNoPermission: 'Tu prueba gratuita ha expirado. Suscríbete para continuar.',
    alertDailyLimit: 'Límite diario alcanzado. Mejora o inténtalo mañana.', alertNoPoints: 'Cuota insuficiente.',
    alertCooldown: 'Demasiado rápido, espera.', alertMonthlyCost: 'Límite mensual alcanzado.', alertNoRecipe: 'Genera una receta primero.',
    alertQTooLong: 'Pregunta demasiado larga.', alertInvalidFood: 'Ingresa un nombre de alimento válido.', paymentSuccess: '¡Suscripción activada!',
    q: 'P', a: 'R', qLimitReached: 'Has alcanzado el límite de 5 preguntas para esta receta.', starterName: 'Starter', proName: 'Pro',
    premiumName: 'Premium Family', businessName: 'Business Kitchen', starterDesc: '10 recetas/día · 5 preguntas',
    proDesc: '30 recetas/día · 5 preguntas', premiumDesc: '80 recetas/día compartidas · 5 preguntas · Compartir en familia',
    businessDesc: '300 recetas/día · 5 preguntas · Uso comercial', finePrint: 'Al suscribirte aceptas nuestros ',
    loginTitle: 'Iniciar sesión', registerTitle: 'Registrarse', email: 'Correo electrónico', password: 'Contraseña', confirmPwd: 'Confirmar contraseña',
    forgot: '¿Olvidaste tu contraseña?', noAccount: '¿Nuevo?', signUp: 'Registrarse', signIn: 'Iniciar sesión', haveAccount: '¿Tienes cuenta?',
    forgotTitle: 'Restablecer contraseña', cancel: 'Cancelar', reset: 'Restablecer', profileNickname: 'Apodo', profileEmail: 'Correo',
    profilePlan: 'Plan', profileJoined: 'Registrado', logout: 'Cerrar sesión', profileSub: 'Mi suscripción', subStatus: 'Estado',
    subExpiry: 'Expira', inviteCodeTitle: 'Código de invitación', joinFamily: 'Unirse', nicknameTitle: 'Cambiar apodo',
    emailTitle: 'Cambiar correo', legalPrivacyTitle: 'Política de privacidad', legalEffDate: 'Fecha de vigencia: 2025-01-01',
    legalPrivacyCollect: '1. Información que recopilamos', legalPrivacy1: 'AI Chef es una aplicación del lado del cliente. No recopilamos, almacenamos ni transmitimos información personal.',
    legalPrivacyUse: '2. Uso de la información', legalPrivacy2: 'Toda la generación de recetas se ejecuta localmente en tu dispositivo.',
    legalPrivacySecurity: '3. Seguridad de los datos', legalPrivacy3: 'Sin recopilación de datos = sin riesgo de violación.',
    legalPrivacyChanges: '4. Cambios en la política', legalPrivacy4: 'Podemos actualizar esta política. Los cambios se publicarán aquí.',
    legalPrivacyContact: '5. Contáctanos', legalPrivacy5: 'Contáctanos en go@tarop.top si tienes preguntas.',
    legalTermsTitle: 'Términos de servicio', legalTermEffDate: 'Fecha de vigencia: 2025-01-01', legalTermsLicense: '1. Licencia',
    legalTerms1: 'Solo para uso personal y no comercial. Los suscriptores de Business Kitchen pueden usar el servicio con fines comerciales.',
    legalTermsDisclaimer: '2. Descargo de responsabilidad', legalTerms2: 'Las recetas son generadas por IA y solo para referencia.',
    legalTermsLimitations: '3. Limitación de responsabilidad', legalTerms3: 'No somos responsables por ningún daño.',
    legalTermsModifications: '4. Modificaciones', legalTerms4: 'Podemos modificar estos términos en cualquier momento.',
    legalTermsLaw: '5. Ley aplicable', legalTerms5: 'Ley aplicable: tu jurisdicción.', legalTermsSubRules: '6. Reglas de suscripción',
    legalTermsSub1: '6.1 Los suscriptores tienen acceso al iniciar sesión.', legalTermsSub2: '6.2 Cuatro tipos de suscripción: Starter, Pro, Premium Family, Business.',
    legalTermsSub3: '6.3 Las órdenes deben activarse dentro de las 24 horas iniciando sesión.',
    legalTermsSub4: '6.4 Cada generación de receta otorga 5 preguntas de IA para esa sesión.',
    legalTermsSub5: '6.5 Compartir en familia solo para Premium Family (hasta 3 personas).',
    legalTermsSub6: '6.6 La renovación automática está habilitada por defecto; gestiona a través de PayPal.',
    legalTermsSub7: '6.7 No hay reembolsos después del pago.', legalTermsSub8: '6.8 Usa un correo válido; no nos hacemos responsables por la pérdida de cuenta debido a correos falsos.',
    legalTermsSub9: '6.9 Las recetas y respuestas son generadas por DeepSeek y solo para referencia.',
    legalTermsSub10: '6.10 Nos reservamos el derecho de interpretación final.', success: 'Éxito', ok: 'Aceptar',
    personalizedGreeting: '¡Estimado Gourmet! ¡Buen provecho!', save: 'Guardar', edit: 'Editar', change: 'Cambiar',
    pleaseLogin: 'Inicia sesión primero', sendCode: 'Enviar código', sending: 'Enviando...', codeSent: '¡Código enviado!',
    codeSendFailed: 'Error al enviar el código. Inténtalo de nuevo.', registerSuccess: '¡Registro exitoso!', loginFailed: 'Error de inicio de sesión. Verifica tus credenciales.',
    pricingSubtitle: 'Elige tu plan', pricingTitle: 'Planes de suscripción', planStarterName: 'Starter', planStarterDesc: 'Tu asistente de cocina personal',
    planStarterPeriod: '/ mes', planProName: 'Pro', planProDesc: 'El más popular entre los amantes de la comida', planProPeriod: '/ mes',
    planPremiumName: 'Premium', planPremiumDesc: 'Ideal para compartir con varios usuarios', planPremiumPeriod: '/ mes',
    planBusinessName: 'Business', planBusinessDesc: 'Para cocinas comerciales y catering', planBusinessPeriod: '/ mes',
    subscribeBtn: 'Suscribirse ahora', planNotice: 'Asegurado por PayPal · Renovación automática', featureStarter1: '10 recetas diarias',
    featureStarter2: '5 consultas IA por receta', featureStarter3: 'Solo uso personal', featureStarter4: 'Genera recetas con cualquier ingrediente',
    featurePro1: '30 recetas diarias', featurePro2: '5 consultas IA por receta', featurePro3: 'Todas las funciones desbloqueadas',
    featurePro4: 'Personalización avanzada de recetas', featurePremium1: '80 recetas diarias', featurePremium2: '5 consultas IA por receta',
    featurePremium3: 'Hasta 3 usuarios compartiendo', featurePremium4: 'Grupo de uso compartido', featurePremium5: 'Análisis de salud y nutrición',
    featureBusiness1: '300 generaciones diarias', featureBusiness2: '5 consultas IA por receta', featureBusiness3: 'Cola de generación prioritaria',
    featureBusiness4: 'Derechos de uso comercial', featureBusiness5: 'Permisos extendidos de recetas', freeTierDesc: 'Estás en el nivel gratuito.',
    promoTitle: 'Hazte Premium', promoSub: 'Desbloquea todo para tu cocina', promoFeature1: 'Recetas ilimitadas', promoFeature2: 'Compartir en familia',
    promoFeature3: 'Información nutricional', promoFeature4: 'Sin anuncios', personalizedGreeting: '¡Querido Gourmet! ¡Buen provecho!', howToUse: 'Guía de uso', qLeft: 'Preguntas pendientes',
    howToList: [
      'Puedes ingresar uno o más ingredientes, como papas, espinacas, pechuga de pollo, salmón.',
      'Puedes buscar platos y comidas clásicas, como bistec a la parrilla, verduras asadas, tortilla, pasta.',
      'Puedes buscar postres y productos horneados, como tarta de queso, helado de vainilla, croissant, muffin.',
      'Puedes encontrar recetas de sopas, bebidas y cócteles caseros, como sopa de tomate, café helado, cóctel, jugo fresco.',
      'Filtra por sabor y estilo: comida reconfortante, platos salados, picantes, dulces y opciones saludables.',
      'Descubre cocinas globales y prepara platos de todo el mundo.',
      'Si no te gusta una receta, toca Generar de nuevo para obtener nuevas ideas culinarias.'
    ],
    howToHighlight: 'Escribe cualquier palabra relacionada con comida para explorar innumerables recetas. Obtén platos populares y auténticos de cocinas de todo el mundo con IA.',
    homeHeroTitle: 'Descubre recetas infinitas con IA', homeHeroDesc: 'Escribe cualquier ingrediente, plato o cocina. Nuestro chef de IA crea platos auténticos y deliciosos de todo el mundo al instante.',
    homeCtaBtn: 'Prueba Sin Coste', homeFeature1Title: 'Buscar por ingredientes', homeFeature1Desc: 'Escribe uno o más ingredientes, como patatas, espinacas, pechuga de pollo, salmón.',
    homeFeature2Title: 'Encontrar platos clásicos', homeFeature2Desc: 'Busca filete a la parrilla, verduras asadas, tortilla, pasta y mucho más.',
    homeFeature3Title: 'Postres y repostería', homeFeature3Desc: 'Tarta de queso, helado de vainilla, croissant, magdalenas y dulces.',
    homeFeature4Title: 'Sopas y bebidas', homeFeature4Desc: 'Sopa de tomate, café frío, cócteles, zumos frescos y bebidas caseras.',
    homeFeature5Title: 'Cocinas del mundo', homeFeature5Desc: 'Descubre cocinas del mundo y prepara platos auténticos de cualquier cultura.',
    homeFeature6Title: 'Ideas ilimitadas', homeFeature6Desc: 'Pulsa Generar de nuevo para nuevas ideas culinarias cuando quieras.',
    homeBottomTitle: 'Sencillo. Rápido. Delicioso.', homeBottomDesc: 'Escribe cualquier palabra clave relacionada con comida para explorar recetas infinitas. Obtén platos populares y auténticos de cocinas del mundo con IA.',
    homeSubscriptionLink: 'Suscripción'
  },
  fr: {
    heroSubtitle: 'Cuisines mondiales · Association intelligente', sectionFeatures: 'Fonctionnalités', feat1: '18 cuisines', feat1Sub: 'Saveurs du monde',
    feat2: 'Assistant IA', feat2Sub: '5 questions par recette', feat3: 'Nutrition', feat3Sub: 'Poids santé', feat4: 'Sécurité bébé',
    feat4Sub: 'Sans sel/sucre', feat5: 'Grossesse', feat5Sub: 'Adapté aux mamans', feat6: 'Guides vidéo', feat6Sub: 'Pas à pas',
    sectionSubscribe: 'Formules d\'abonnement', subText: 'S\'abonner', subSub: 'Accès complet', familyText: 'Partage familial',
    familySub: 'Premium uniquement', legalLink: 'Confidentialité/Conditions', genTitle: 'Générateur de recettes IA', genMealType: 'Catégorie',
    genCuisine: 'Cuisine', genDishName: 'Que manger ?', optStandard: 'Standard', optBaby: 'Bébé', optPregnancy: 'Grossesse',
    generate: 'Générer une recette', generating: 'Génération...', aiAssistTitle: 'Assistant IA', enterQuestion: 'Posez une question sur cette recette...',
    ask: 'Demander', dishNameHint: 'Saisissez des ingrédients, plats ou aliments.', watchVideo: 'Regarder les guides vidéo', addToHome: 'Ajouter',
    freeLimitInfo: 'Essai gratuit: {{used}}/3', starterInfo: 'Starter: {{used}}/10 | Questions restantes: {{qLeft}}',
    proInfo: 'Pro: {{used}}/30 | Questions restantes: {{qLeft}}', premiumInfo: 'Premium Family: {{used}}/80 | Questions restantes: {{qLeft}}',
    businessInfo: 'Business: {{used}}/300 | Questions restantes: {{qLeft}}', alertNoPermission: 'Votre essai gratuit a expiré. Abonnez-vous pour continuer.',
    alertDailyLimit: 'Limite quotidienne atteinte. Améliorez ou réessayez demain.', alertNoPoints: 'Quota insuffisant.',
    alertCooldown: 'Trop rapide, veuillez patienter.', alertMonthlyCost: 'Limite mensuelle atteinte.', alertNoRecipe: 'Générez d\'abord une recette.',
    alertQTooLong: 'Question trop longue.', alertInvalidFood: 'Veuillez entrer un nom d\'aliment valide.', paymentSuccess: 'Abonnement activé !',
    q: 'Q', a: 'R', qLimitReached: 'Vous avez atteint la limite de 5 questions pour cette recette.', starterName: 'Starter', proName: 'Pro',
    premiumName: 'Premium Family', businessName: 'Business Kitchen', starterDesc: '10 recettes/jour · 5 questions',
    proDesc: '30 recettes/jour · 5 questions', premiumDesc: '80 recettes/jour partagées · 5 questions · Partage familial',
    businessDesc: '300 recettes/jour · 5 questions · Usage commercial', finePrint: 'En vous abonnant, vous acceptez nos ',
    loginTitle: 'Connexion', registerTitle: 'Inscription', email: 'E-mail', password: 'Mot de passe', confirmPwd: 'Confirmer le mot de passe',
    forgot: 'Mot de passe oublié ?', noAccount: 'Nouveau ?', signUp: 'S\'inscrire', signIn: 'Se connecter', haveAccount: 'Vous avez un compte ?',
    forgotTitle: 'Réinitialiser le mot de passe', cancel: 'Annuler', reset: 'Réinitialiser', profileNickname: 'Surnom', profileEmail: 'E-mail',
    profilePlan: 'Forfait', profileJoined: 'Inscrit le', logout: 'Déconnexion', profileSub: 'Mon abonnement', subStatus: 'Statut',
    subExpiry: 'Expire', inviteCodeTitle: 'Code d\'invitation', joinFamily: 'Rejoindre', nicknameTitle: 'Changer de surnom',
    emailTitle: 'Changer d\'e-mail', legalPrivacyTitle: 'Politique de confidentialité', legalEffDate: 'Date d\'entrée en vigueur : 2025-01-01',
    legalPrivacyCollect: '1. Informations que nous collectons', legalPrivacy1: 'AI Chef est une application côté client. Nous ne collectons, ne stockons ni ne transmettons aucune information personnelle.',
    legalPrivacyUse: '2. Utilisation des informations', legalPrivacy2: 'Toute la génération de recettes s\'exécute localement sur votre appareil.',
    legalPrivacySecurity: '3. Sécurité des données', legalPrivacy3: 'Aucune donnée collectée = aucun risque de violation.',
    legalPrivacyChanges: '4. Modifications de la politique', legalPrivacy4: 'Nous pouvons mettre à jour cette politique. Les modifications seront publiées ici.',
    legalPrivacyContact: '5. Contactez-nous', legalPrivacy5: 'Contactez-nous à go@tarop.top pour toute question.',
    legalTermsTitle: 'Conditions d\'utilisation', legalTermEffDate: 'Date d\'entrée en vigueur : 2025-01-01', legalTermsLicense: '1. Licence',
    legalTerms1: 'Pour usage personnel et non commercial uniquement. Les abonnés Business Kitchen sont autorisés à utiliser le service à des fins commerciales.',
    legalTermsDisclaimer: '2. Avertissement', legalTerms2: 'Les recettes sont générées par IA et sont fournies à titre de référence uniquement.',
    legalTermsLimitations: '3. Limitation de responsabilité', legalTerms3: 'Nous ne sommes pas responsables des dommages.',
    legalTermsModifications: '4. Modifications', legalTerms4: 'Nous pouvons modifier ces conditions à tout moment.',
    legalTermsLaw: '5. Loi applicable', legalTerms5: 'Loi applicable : votre juridiction.', legalTermsSubRules: '6. Règles d\'abonnement',
    legalTermsSub1: '6.1 Les abonnés ont accès après connexion.', legalTermsSub2: '6.2 Quatre types d\'abonnement : Starter, Pro, Premium Family, Business.',
    legalTermsSub3: '6.3 Les commandes doivent être activées dans les 24 heures en se connectant.',
    legalTermsSub4: '6.4 Chaque génération de recette accorde 5 questions IA pour cette session.',
    legalTermsSub5: '6.5 Le partage familial est disponible uniquement pour Premium Family (jusqu\'à 3 personnes).',
    legalTermsSub6: '6.6 Le renouvellement automatique est activé par défaut ; gérez-le via PayPal.',
    legalTermsSub7: '6.7 Aucun remboursement après paiement.', legalTermsSub8: '6.8 Utilisez un e-mail valide ; nous ne sommes pas responsables de la perte de compte due à de faux e-mails.',
    legalTermsSub9: '6.9 Les recettes et réponses sont générées par DeepSeek et sont fournies à titre de référence uniquement.',
    legalTermsSub10: '6.10 Nous nous réservons le droit d\'interprétation final.', success: 'Succès', ok: 'OK',
    personalizedGreeting: 'Cher Gourmet ! Bon appétit !', save: 'Enregistrer', edit: 'Modifier', change: 'Changer',
    pleaseLogin: 'Veuillez vous connecter d\'abord', sendCode: 'Envoyer le code', sending: 'Envoi...', codeSent: 'Code envoyé !',
    codeSendFailed: 'Échec de l\'envoi du code. Veuillez réessayer.', registerSuccess: 'Inscription réussie !', loginFailed: 'Échec de la connexion. Vérifiez vos identifiants.',
    pricingSubtitle: 'Choisissez votre formule', pricingTitle: 'Formules d\'abonnement', planStarterName: 'Starter', planStarterDesc: 'Votre assistant culinaire personnel',
    planStarterPeriod: '/ mois', planProName: 'Pro', planProDesc: 'Le plus populaire parmi les gourmets', planProPeriod: '/ mois',
    planPremiumName: 'Premium', planPremiumDesc: 'Adapté au partage multi-utilisateurs', planPremiumPeriod: '/ mois',
    planBusinessName: 'Business', planBusinessDesc: 'Pour cuisines commerciales et traiteurs', planBusinessPeriod: '/ mois',
    subscribeBtn: 'S\'abonner maintenant', planNotice: 'Sécurisé par PayPal · Renouvellement automatique', featureStarter1: '10 recettes par jour',
    featureStarter2: '5 questions IA par recette', featureStarter3: 'Usage personnel uniquement', featureStarter4: 'Générez des recettes avec tous les ingrédients',
    featurePro1: '30 recettes par jour', featurePro2: '5 questions IA par recette', featurePro3: 'Toutes les fonctionnalités débloquées',
    featurePro4: 'Personnalisation avancée des recettes', featurePremium1: '80 recettes par jour', featurePremium2: '5 questions IA par recette',
    featurePremium3: 'Jusqu\'à 3 utilisateurs en partage', featurePremium4: 'Pool d\'utilisation partagé', featurePremium5: 'Analyse santé et nutrition',
    featureBusiness1: '300 générations par jour', featureBusiness2: '5 questions IA par recette', featureBusiness3: 'File de génération prioritaire',
    featureBusiness4: 'Droits d\'utilisation commerciale', featureBusiness5: 'Autorisations étendues sur les recettes', freeTierDesc: 'Vous êtes sur le niveau gratuit.',
    promoTitle: 'Passez à Premium', promoSub: 'Débloquez tout pour votre cuisine', promoFeature1: 'Recettes illimitées',
    promoFeature2: 'Partage familial', promoFeature3: 'Informations nutritionnelles', promoFeature4: 'Sans publicité',
    howToTitle: 'Comment utiliser', warnings: 'Allergènes et Sécurité', personalizedGreeting: 'Cher Gourmet ! Bon appétit !', howToUse: 'Guide d\'utilisation', qLeft: 'Questions restantes',
    howToList: [
      'Vous pouvez entrer un ou plusieurs ingrédients, comme des pommes de terre, épinards, blanc de poulet, saumon.',
      'Vous pouvez rechercher des plats et repas classiques, comme steak grillé, légumes rôtis, omelette, pâtes.',
      'Vous pouvez chercher des desserts et pâtisseries, comme cheesecake, glace vanille, croissant, muffin.',
      'Vous pouvez trouver des recettes de soupes, boissons et cocktails maison, comme soupe de tomate, café glacé, cocktail, jus frais.',
      'Filtrez par goût et style : cuisine réconfortante, plats salés, épicés, sucrés et options saines.',
      'Découvrez les cuisines du monde et préparez des plats de tous les pays.',
      'Si une recette ne vous plaît pas, appuyez à nouveau sur Générer pour de nouvelles idées culinaires.'
    ],
    howToHighlight: 'Tapez n\'importe quel mot lié à la nourriture pour explorer d\'innombrables recettes. Obtenez des plats populaires et authentiques des cuisines du monde entier avec l\'IA.',
    homeHeroTitle: 'Découvrez des recettes infinies avec l\'IA', homeHeroDesc: 'Tapez n\'importe quel ingrédient, plat ou cuisine. Notre chef IA crée instantanément des plats authentiques et délicieux du monde entier.',
    homeCtaBtn: 'Essai Sans Frais', homeFeature1Title: 'Rechercher par ingrédients', homeFeature1Desc: 'Entrez un ou plusieurs ingrédients, comme pommes de terre, épinards, blanc de poulet, saumon.',
    homeFeature2Title: 'Trouver des plats classiques', homeFeature2Desc: 'Recherchez steak grillé, légumes rôtis, omelette, pâtes et plus encore.',
    homeFeature3Title: 'Desserts et pâtisseries', homeFeature3Desc: 'Cheesecake, glace vanille, croissant, muffin et autres gourmandises.',
    homeFeature4Title: 'Soupes et boissons', homeFeature4Desc: 'Soupe de tomate, café glacé, cocktails, jus frais et boissons maison.',
    homeFeature5Title: 'Cuisines du monde', homeFeature5Desc: 'Découvrez des cuisines du monde et préparez des plats authentiques de toutes cultures.',
    homeFeature6Title: 'Idées illimitées', homeFeature6Desc: 'Appuyez sur Générer à nouveau pour de nouvelles idées de cuisine quand vous voulez.',
    homeBottomTitle: 'Simple. Rapide. Délicieux.', homeBottomDesc: 'Tapez n\'importe quel mot-clé culinaire pour explorer des recettes infinies. Obtenez des plats populaires et authentiques de cuisines du monde avec l\'IA.',
    homeSubscriptionLink: 'Abonnement'
  },
  de: {
    heroSubtitle: 'Globale Küchen · Intelligente Kombination', sectionFeatures: 'Funktionen', feat1: '18 Küchen', feat1Sub: 'Weltweite Aromen',
    feat2: 'KI-Assistent', feat2Sub: '5 Fragen pro Rezept', feat3: 'Ernährung', feat3Sub: 'Gesundes Gewicht', feat4: 'Babysicher',
    feat4Sub: 'Ohne Salz/Zucker', feat5: 'Schwangerschaft', feat5Sub: 'Mama-freundlich', feat6: 'Videoanleitungen', feat6Sub: 'Schritt für Schritt',
    sectionSubscribe: 'Abonnementpläne', subText: 'Abonnieren', subSub: 'Vollen Zugriff erhalten', familyText: 'Familienfreigabe',
    familySub: 'Nur Premium', legalLink: 'Datenschutz/AGB', genTitle: 'KI-Rezeptgenerator', genMealType: 'Kategorie',
    genCuisine: 'Küche', genDishName: 'Was möchtest du essen?', optStandard: 'Standard', optBaby: 'Baby', optPregnancy: 'Schwangerschaft',
    generate: 'Rezept generieren', generating: 'Generiere...', aiAssistTitle: 'KI-Assistent', enterQuestion: 'Frage zu diesem Rezept...',
    ask: 'Fragen', dishNameHint: 'Gib Zutaten, Gerichte oder Lebensmittel ein.', watchVideo: 'Videoanleitungen ansehen', addToHome: 'Hinzufügen',
    freeLimitInfo: 'Kostenlose Testversion: {{used}}/3', starterInfo: 'Starter: {{used}}/10 | Fragen übrig: {{qLeft}}',
    proInfo: 'Pro: {{used}}/30 | Fragen übrig: {{qLeft}}', premiumInfo: 'Premium Family: {{used}}/80 | Fragen übrig: {{qLeft}}',
    businessInfo: 'Business: {{used}}/300 | Fragen übrig: {{qLeft}}', alertNoPermission: 'Deine kostenlose Testversion ist abgelaufen. Abonniere, um fortzufahren.',
    alertDailyLimit: 'Tägliches Limit erreicht. Bitte upgrade oder versuche es morgen erneut.', alertNoPoints: 'Kontingent unzureichend.',
    alertCooldown: 'Zu schnell, bitte warte.', alertMonthlyCost: 'Monatliches Limit erreicht.', alertNoRecipe: 'Generiere zuerst ein Rezept.',
    alertQTooLong: 'Frage zu lang.', alertInvalidFood: 'Bitte gib einen gültigen Lebensmittelnamen ein.', paymentSuccess: 'Abonnement aktiviert!',
    q: 'F', a: 'A', qLimitReached: 'Du hast das Limit von 5 Fragen für dieses Rezept erreicht.', starterName: 'Starter', proName: 'Pro',
    premiumName: 'Premium Family', businessName: 'Business Kitchen', starterDesc: '10 Rezepte/Tag · 5 Fragen',
    proDesc: '30 Rezepte/Tag · 5 Fragen', premiumDesc: '80 Rezepte/Tag geteilt · 5 Fragen · Familienfreigabe',
    businessDesc: '300 Rezepte/Tag · 5 Fragen · Kommerzielle Nutzung', finePrint: 'Mit dem Abonnement stimmst du unseren ',
    loginTitle: 'Anmelden', registerTitle: 'Registrieren', email: 'E-Mail', password: 'Passwort', confirmPwd: 'Passwort bestätigen',
    forgot: 'Passwort vergessen?', noAccount: 'Neu?', signUp: 'Registrieren', signIn: 'Anmelden', haveAccount: 'Hast du ein Konto?',
    forgotTitle: 'Passwort zurücksetzen', cancel: 'Abbrechen', reset: 'Zurücksetzen', profileNickname: 'Spitzname', profileEmail: 'E-Mail',
    profilePlan: 'Plan', profileJoined: 'Registriert', logout: 'Abmelden', profileSub: 'Mein Abonnement', subStatus: 'Status',
    subExpiry: 'Läuft ab', inviteCodeTitle: 'Einladungscode', joinFamily: 'Beitreten', nicknameTitle: 'Spitzname ändern',
    emailTitle: 'E-Mail ändern', legalPrivacyTitle: 'Datenschutzerklärung', legalEffDate: 'Gültig ab: 2025-01-01',
    legalPrivacyCollect: '1. Informationen, die wir sammeln', legalPrivacy1: 'AI Chef ist eine clientseitige Anwendung. Wir sammeln, speichern oder übermitteln keine persönlichen Informationen.',
    legalPrivacyUse: '2. Nutzung der Informationen', legalPrivacy2: 'Die gesamte Rezeptgenerierung läuft lokal auf deinem Gerät.',
    legalPrivacySecurity: '3. Datensicherheit', legalPrivacy3: 'Keine Datenerfassung = kein Risiko einer Verletzung.',
    legalPrivacyChanges: '4. Richtlinienänderungen', legalPrivacy4: 'Wir können diese Richtlinie aktualisieren. Änderungen werden hier veröffentlicht.',
    legalPrivacyContact: '5. Kontakt', legalPrivacy5: 'Kontaktieren Sie uns bei Fragen unter go@tarop.top.',
    legalTermsTitle: 'Nutzungsbedingungen', legalTermEffDate: 'Gültig ab: 2025-01-01', legalTermsLicense: '1. Lizenz',
    legalTerms1: 'Nur für den persönlichen, nicht-kommerziellen Gebrauch. Business Kitchen-Abonnenten dürfen den Dienst für kommerzielle Zwecke nutzen.',
    legalTermsDisclaimer: '2. Haftungsausschluss', legalTerms2: 'Rezepte werden von KI generiert und dienen nur als Referenz.',
    legalTermsLimitations: '3. Haftungsbeschränkung', legalTerms3: 'Wir haften nicht für Schäden.',
    legalTermsModifications: '4. Änderungen', legalTerms4: 'Wir können diese Bedingungen jederzeit ändern.',
    legalTermsLaw: '5. Anwendbares Recht', legalTerms5: 'Anwendbares Recht: dein Gerichtsstand.', legalTermsSubRules: '6. Abonnementregeln',
    legalTermsSub1: '6.1 Abonnenten haben nach der Anmeldung Zugriff.', legalTermsSub2: '6.2 Vier Abonnementtypen: Starter, Pro, Premium Family, Business.',
    legalTermsSub3: '6.3 Bestellungen müssen innerhalb von 24 Stunden durch Anmeldung aktiviert werden.',
    legalTermsSub4: '6.4 Jede Rezeptgenerierung gewährt 5 KI-Fragen für diese Sitzung.',
    legalTermsSub5: '6.5 Familienfreigabe nur für Premium Family verfügbar (bis zu 3 Personen).',
    legalTermsSub6: '6.6 Die automatische Verlängerung ist standardmäßig aktiviert; verwalte sie über PayPal.',
    legalTermsSub7: '6.7 Keine Rückerstattung nach Zahlung.', legalTermsSub8: '6.8 Verwende eine gültige E-Mail; wir haften nicht für Kontoverlust aufgrund gefälschter E-Mails.',
    legalTermsSub9: '6.9 Rezepte und Antworten werden von DeepSeek generiert und dienen nur als Referenz.',
    legalTermsSub10: '6.10 Wir behalten uns das Recht der endgültigen Auslegung vor.', success: 'Erfolg', ok: 'OK',
    personalizedGreeting: 'Lieber Gourmet! Guten Appetit!', save: 'Speichern', edit: 'Bearbeiten', change: 'Ändern',
    pleaseLogin: 'Bitte melde dich zuerst an', sendCode: 'Code senden', sending: 'Sende...', codeSent: 'Code gesendet!',
    codeSendFailed: 'Fehler beim Senden des Codes. Bitte versuche es erneut.', registerSuccess: 'Registrierung erfolgreich!',
    loginFailed: 'Anmeldung fehlgeschlagen. Überprüfe deine Anmeldedaten.', pricingSubtitle: 'Wählen Sie Ihren Plan', pricingTitle: 'Abonnementpläne',
    planStarterName: 'Starter', planStarterDesc: 'Ihr persönlicher Kochassistent', planStarterPeriod: '/ Monat',
    planProName: 'Pro', planProDesc: 'Am beliebtesten bei Feinschmeckern', planProPeriod: '/ Monat',
    planPremiumName: 'Premium', planPremiumDesc: 'Geeignet für Mehrbenutzer-Sharing', planPremiumPeriod: '/ Monat',
    planBusinessName: 'Business', planBusinessDesc: 'Für gewerbliche Küchen & Catering', planBusinessPeriod: '/ Monat',
    subscribeBtn: 'Jetzt abonnieren', planNotice: 'Gesichert durch PayPal · Automatische Verlängerung', featureStarter1: '10 Rezepte täglich',
    featureStarter2: '5 KI-Fragen pro Rezept', featureStarter3: 'Nur für den persönlichen Gebrauch', featureStarter4: 'Rezepte aus beliebigen Zutaten generieren',
    featurePro1: '30 Rezepte täglich', featurePro2: '5 KI-Fragen pro Rezept', featurePro3: 'Alle Funktionen freigeschaltet',
    featurePro4: 'Erweiterte Rezeptanpassung', featurePremium1: '80 Rezepte täglich', featurePremium2: '5 KI-Fragen pro Rezept',
    featurePremium3: 'Bis zu 3 Benutzer teilen', featurePremium4: 'Gemeinsamer Nutzungspool', featurePremium5: 'Gesundheits- und Ernährungsanalyse',
    featureBusiness1: '300 tägliche Generierungen', featureBusiness2: '5 KI-Fragen pro Rezept', featureBusiness3: 'Priorisierte Generierungswarteschlange',
    featureBusiness4: 'Kommerzielle Nutzungsrechte', featureBusiness5: 'Erweiterte Rezeptberechtigungen', freeTierDesc: 'Sie befinden sich in der kostenlosen Stufe.',
    promoTitle: 'Premium sichern', promoSub: 'Alles für Ihre Küche freischalten', promoFeature1: 'Unbegrenzte Rezepte',
    promoFeature2: 'Familienfreigabe', promoFeature3: 'Nährwertanalyse', promoFeature4: 'Werbefrei',
    howToTitle: 'Verwendung', warnings: 'Allergene & Sicherheit', personalizedGreeting: 'Lieber Gourmet! Guten Appetit!', howToUse: 'Benutzerhandbuch', qLeft: 'Offene Fragen',     
    howToList: [
      'Sie können eine oder mehrere Zutaten eingeben, wie Kartoffeln, Spinat, Hähnchenbrust, Lachs.',
      'Sie können nach klassischen Gerichten und Mahlzeiten suchen, wie gegrilltes Steak, Ofengemüse, Omelett, Pasta.',
      'Sie können nach Desserts und Backwaren suchen, wie Käsekuchen, Vanilleeis, Croissant, Muffin.',
      'Sie können Rezepte für Suppen, Getränke und hausgemachte Cocktails finden, wie Tomatensuppe, Eiskaffee, Cocktail, frischer Saft.',
      'Filtern Sie nach Geschmack und Stil: Hausmannskost, herzhafte Gerichte, scharf, süß und gesunde Optionen.',
      'Entdecken Sie globale Küchen und bereiten Sie Gerichte aus aller Welt zu.',
      'Wenn Ihnen ein Rezept nicht gefällt, tippen Sie erneut auf Generieren für brandneue Kochideen.'
    ],
    howToHighlight: 'Geben Sie ein beliebiges lebensmittelbezogenes Wort ein, um unzählige Rezepte zu entdecken. Erhalten Sie beliebte, authentische Gerichte aus weltweiten Küchen mit KI.',
    homeHeroTitle: 'Entdecke endlose Rezepte mit KI', homeHeroDesc: 'Gib einfach Zutaten, Gerichte oder Küchen ein. Unser KI-Koch erstellt sofort authentische, leckere Gerichte aus aller Welt.',
    homeCtaBtn: 'Gratis Ausprobieren', homeFeature1Title: 'Nach Zutaten suchen', homeFeature1Desc: 'Gib eine oder mehrere Zutaten ein, z.B. Kartoffeln, Spinat, Hähnchenbrust, Lachs.',
    homeFeature2Title: 'Klassische Gerichte finden', homeFeature2Desc: 'Suche nach gegrilltem Steak, gebratenem Gemüse, Omelette, Pasta und mehr.',
    homeFeature3Title: 'Desserts & Backwaren', homeFeature3Desc: 'Käsekuchen, Vanilleeis, Croissant, Muffins und süße Leckereien.',
    homeFeature4Title: 'Suppen & Getränke', homeFeature4Desc: 'Tomatensuppe, Eiskaffee, Cocktails, frische Säfte und hausgemachte Getränke.',
    homeFeature5Title: 'Weltküchen', homeFeature5Desc: 'Entdecke Weltküchen und koche authentische Gerichte aus jeder Kultur.',
    homeFeature6Title: 'Unbegrenzte Ideen', homeFeature6Desc: 'Tippe auf Generieren, wann immer du neue Kochideen brauchst.',
    homeBottomTitle: 'Einfach. Schnell. Lecker.', homeBottomDesc: 'Gib einfach Lebensmittel-Schlüsselwörter ein, um endlose Rezepte zu entdecken. Hol dir beliebte, authentische Gerichte aus aller Welt mit KI.',
    homeSubscriptionLink: 'Abonnement'
  },
  it: {
    heroSubtitle: 'Cucine globali · Abbinamento intelligente', sectionFeatures: 'Caratteristiche', feat1: '18 cucine', feat1Sub: 'Sapori globali',
    feat2: 'Assistente AI', feat2Sub: '5 domande per ricetta', feat3: 'Nutrizione', feat3Sub: 'Peso sano', feat4: 'Sicuro per neonati',
    feat4Sub: 'Senza sale/zucchero', feat5: 'Gravidanza', feat5Sub: 'Amico della mamma', feat6: 'Guide video', feat6Sub: 'Passo dopo passo',
    sectionSubscribe: 'Piani di abbonamento', subText: 'Abbonati', subSub: 'Accesso completo', familyText: 'Condivisione familiare',
    familySub: 'Solo Premium', legalLink: 'Privacy/Termini', genTitle: 'Generatore di ricette AI', genMealType: 'Categoria',
    genCuisine: 'Cucina', genDishName: 'Cosa vuoi mangiare?', optStandard: 'Standard', optBaby: 'Bebè', optPregnancy: 'Gravidanza',
    generate: 'Genera ricetta', generating: 'Generazione...', aiAssistTitle: 'Assistente AI', enterQuestion: 'Chiedi informazioni su questa ricetta...',
    ask: 'Chiedi', dishNameHint: 'Inserisci ingredienti, piatti o alimenti.', watchVideo: 'Guarda le guide video', addToHome: 'Aggiungi',
    freeLimitInfo: 'Prova gratuita: {{used}}/3', starterInfo: 'Starter: {{used}}/10 | Domande rimaste: {{qLeft}}',
    proInfo: 'Pro: {{used}}/30 | Domande rimaste: {{qLeft}}', premiumInfo: 'Premium Family: {{used}}/80 | Domande rimaste: {{qLeft}}',
    businessInfo: 'Business: {{used}}/300 | Domande rimaste: {{qLeft}}', alertNoPermission: 'La tua prova gratuita è scaduta. Abbonati per continuare.',
    alertDailyLimit: 'Limite giornaliero raggiunto. Aggiorna o riprova domani.', alertNoPoints: 'Quota insufficiente.',
    alertCooldown: 'Troppo veloce, attendi.', alertMonthlyCost: 'Limite mensile raggiunto.', alertNoRecipe: 'Genera prima una ricetta.',
    alertQTooLong: 'Domanda troppo lunga.', alertInvalidFood: 'Inserisci un nome di alimento valido.', paymentSuccess: 'Abbonamento attivato!',
    q: 'D', a: 'R', qLimitReached: 'Hai raggiunto il limite di 5 domande per questa ricetta.', starterName: 'Starter', proName: 'Pro',
    premiumName: 'Premium Family', businessName: 'Business Kitchen', starterDesc: '10 ricette/giorno · 5 domande',
    proDesc: '30 ricette/giorno · 5 domande', premiumDesc: '80 ricette/giorno condivise · 5 domande · Condivisione familiare',
    businessDesc: '300 ricette/giorno · 5 domande · Uso commerciale', finePrint: 'Abbonandoti accetti i nostri ',
    loginTitle: 'Accedi', registerTitle: 'Registrati', email: 'Email', password: 'Password', confirmPwd: 'Conferma password',
    forgot: 'Password dimenticata?', noAccount: 'Nuovo?', signUp: 'Registrati', signIn: 'Accedi', haveAccount: 'Hai un account?',
    forgotTitle: 'Reimposta password', cancel: 'Annulla', reset: 'Reimposta', profileNickname: 'Soprannome', profileEmail: 'Email',
    profilePlan: 'Piano', profileJoined: 'Registrato il', logout: 'Esci', profileSub: 'Il mio abbonamento', subStatus: 'Stato',
    subExpiry: 'Scade', inviteCodeTitle: 'Codice invito', joinFamily: 'Unisciti', nicknameTitle: 'Cambia soprannome',
    emailTitle: 'Cambia email', legalPrivacyTitle: 'Informativa sulla privacy', legalEffDate: 'Data di entrata in vigore: 2025-01-01',
    legalPrivacyCollect: '1. Informazioni che raccogliamo', legalPrivacy1: 'AI Chef è un\'applicazione lato client. Non raccogliamo, memorizziamo o trasmettiamo informazioni personali.',
    legalPrivacyUse: '2. Utilizzo delle informazioni', legalPrivacy2: 'Tutta la generazione di ricette avviene localmente sul tuo dispositivo.',
    legalPrivacySecurity: '3. Sicurezza dei dati', legalPrivacy3: 'Nessuna raccolta dati = nessun rischio di violazione.',
    legalPrivacyChanges: '4. Modifiche alla policy', legalPrivacy4: 'Possiamo aggiornare questa policy. Le modifiche verranno pubblicate qui.',
    legalPrivacyContact: '5. Contattaci', legalPrivacy5: 'Contattaci a go@tarop.top per qualsiasi domanda.',
    legalTermsTitle: 'Termini di servizio', legalTermEffDate: 'Data di entrata in vigore: 2025-01-01', legalTermsLicense: '1. Licenza',
    legalTerms1: 'Solo per uso personale e non commerciale. Gli abbonati Business Kitchen possono utilizzare il servizio per scopi commerciali.',
    legalTermsDisclaimer: '2. Dichiarazione di non responsabilità', legalTerms2: 'Le ricette sono generate dall\'IA e sono solo di riferimento.',
    legalTermsLimitations: '3. Limitazione di responsabilità', legalTerms3: 'Non siamo responsabili per eventuali danni.',
    legalTermsModifications: '4. Modifiche', legalTerms4: 'Possiamo modificare questi termini in qualsiasi momento.',
    legalTermsLaw: '5. Legge applicabile', legalTerms5: 'Legge applicabile: la tua giurisdizione.', legalTermsSubRules: '6. Regole di abbonamento',
    legalTermsSub1: '6.1 Gli abbonati hanno accesso al login.', legalTermsSub2: '6.2 Quattro tipi di abbonamento: Starter, Pro, Premium Family, Business.',
    legalTermsSub3: '6.3 Gli ordini devono essere attivati entro 24 ore effettuando il login.',
    legalTermsSub4: '6.4 Ogni generazione di ricetta concede 5 domande AI per quella sessione.',
    legalTermsSub5: '6.5 La condivisione familiare è disponibile solo per Premium Family (fino a 3 persone).',
    legalTermsSub6: '6.6 Il rinnovo automatico è abilitato per impostazione predefinita; gestiscilo tramite PayPal.',
    legalTermsSub7: '6.7 Nessun rimborso dopo il pagamento.', legalTermsSub8: '6.8 Utilizza un\'email valida; non siamo responsabili per la perdita dell\'account a causa di email false.',
    legalTermsSub9: '6.9 Le ricette e le risposte sono generate da DeepSeek e sono solo di riferimento.',
    legalTermsSub10: '6.10 Ci riserviamo il diritto di interpretazione finale.', success: 'Successo', ok: 'OK',
    personalizedGreeting: 'Caro Gourmet! Buon appetito!', save: 'Salva', edit: 'Modifica', change: 'Cambia',
    pleaseLogin: 'Effettua il login prima', sendCode: 'Invia codice', sending: 'Invio...', codeSent: 'Codice inviato!',
    codeSendFailed: 'Invio del codice fallito. Riprova.', registerSuccess: 'Registrazione riuscita!', loginFailed: 'Accesso fallito. Controlla le tue credenziali.',
    pricingSubtitle: 'Scegli il tuo piano', pricingTitle: 'Piani di abbonamento', planStarterName: 'Starter', planStarterDesc: 'Il tuo assistente di cucina personale',
    planStarterPeriod: '/ mese', planProName: 'Pro', planProDesc: 'Il più popolare tra gli amanti del cibo', planProPeriod: '/ mese',
    planPremiumName: 'Premium', planPremiumDesc: 'Adatto alla condivisione multiutente', planPremiumPeriod: '/ mese',
    planBusinessName: 'Business', planBusinessDesc: 'Per cucine commerciali e catering', planBusinessPeriod: '/ mese',
    subscribeBtn: 'Abbonati ora', planNotice: 'Protetto da PayPal · Rinnovo automatico', featureStarter1: '10 ricette al giorno',
    featureStarter2: '5 domande IA per ricetta', featureStarter3: 'Solo uso personale', featureStarter4: 'Genera ricette con qualsiasi ingrediente',
    featurePro1: '30 ricette al giorno', featurePro2: '5 domande IA per ricetta', featurePro3: 'Tutte le funzioni sbloccate',
    featurePro4: 'Personalizzazione avanzata delle ricette', featurePremium1: '80 ricette al giorno', featurePremium2: '5 domande IA per ricetta',
    featurePremium3: 'Fino a 3 utenti in condivisione', featurePremium4: 'Pool di utilizzo condiviso', featurePremium5: 'Analisi della salute e nutrizione',
    featureBusiness1: '300 generazioni al giorno', featureBusiness2: '5 domande IA per ricetta', featureBusiness3: 'Coda di generazione prioritaria',
    featureBusiness4: 'Diritti di utilizzo commerciale', featureBusiness5: 'Permessi estesi sulle ricette', freeTierDesc: 'Sei nel livello gratuito.',
    promoTitle: 'Passa a Premium', promoSub: 'Sblocca tutto per la tua cucina', promoFeature1: 'Ricette illimitate', promoFeature2: 'Condivisione familiare',
    promoFeature3: 'Informazioni nutrizionali', promoFeature4: 'Senza pubblicità', personalizedGreeting: 'Caro Gourmet! Buon appetito!', howToUse: 'Guida all\'uso', qLeft: 'Domande in sospeso',
    howToTitle: 'Come usare', warnings: 'Allergeni e Sicurezza',
    howToList: [
      'Puoi inserire uno o più ingredienti, come patate, spinaci, petto di pollo, salmone.',
      'Puoi cercare piatti e pasti classici, come bistecca alla griglia, verdure arrosto, frittata, pasta.',
      'Puoi cercare dessert e prodotti da forno, come cheesecake, gelato alla vaniglia, croissant, muffin.',
      'Puoi trovare ricette per zuppe, bevande e cocktail fatti in casa, come zuppa di pomodoro, caffè freddo, cocktail, succo fresco.',
      'Filtra per gusto e stile: comfort food, piatti salati, piccanti, dolci e opzioni salutari.',
      'Scopri le cucine globali e prepara piatti da tutto il mondo.',
      'Se una ricetta non ti piace, tocca di nuovo Genera per nuove idee culinarie.'
    ],
    howToHighlight: 'Digita qualsiasi parola relativa al cibo per esplorare innumerevoli ricette. Ottieni piatti popolari e autentici dalle cucine di tutto il mondo con l\'IA.',
    homeHeroTitle: 'Scopri ricette infinite con l\'IA', homeHeroDesc: 'Inserisci qualsiasi ingrediente, piatto o cucina. Il nostro chef AI crea istantaneamente piatti autentici e deliziosi da tutto il mondo.',
    homeCtaBtn: 'Prova Senza Pagare', homeFeature1Title: 'Cerca per ingredienti', homeFeature1Desc: 'Inserisci uno o più ingredienti, come patate, spinaci, petto di pollo, salmone.',
    homeFeature2Title: 'Trova piatti classici', homeFeature2Desc: 'Cerca bistecca grigliata, verdure arrosto, omelette, pasta e altro ancora.',
    homeFeature3Title: 'Dolci e prodotti da forno', homeFeature3Desc: 'Cheesecake, gelato alla vaniglia, croissant, muffin e dolci.',
    homeFeature4Title: 'Zuppe e bevande', homeFeature4Desc: 'Zuppa di pomodoro, caffè freddo, cocktail, succhi freschi e bevande fatte in casa.',
    homeFeature5Title: 'Cucine del mondo', homeFeature5Desc: 'Scopri cucine del mondo e prepara piatti autentici di ogni cultura.',
    homeFeature6Title: 'Idee illimitate', homeFeature6Desc: 'Tocca Genera di nuovo per nuove idee culinarie quando vuoi.',
    homeBottomTitle: 'Semplice. Veloce. Delizioso.', homeBottomDesc: 'Inserisci qualsiasi parola chiave culinaria per esplorare ricette infinite. Ottieni piatti popolari e autentici da cucine di tutto il mondo con l\'IA.',
    homeSubscriptionLink: 'Abbonamento'
  },
  pt: {
    heroSubtitle: 'Cozinhas globais · Combinação inteligente', sectionFeatures: 'Características', feat1: '18 cozinhas', feat1Sub: 'Sabores globais',
    feat2: 'Assistente IA', feat2Sub: '5 perguntas por receita', feat3: 'Nutrição', feat3Sub: 'Peso saudável', feat4: 'Seguro para bebês',
    feat4Sub: 'Sem sal/açúcar', feat5: 'Gravidez', feat5Sub: 'Amigável para mamãe', feat6: 'Guias em vídeo', feat6Sub: 'Passo a passo',
    sectionSubscribe: 'Planos de assinatura', subText: 'Assinar', subSub: 'Acesso completo', familyText: 'Compartilhamento familiar',
    familySub: 'Apenas Premium', legalLink: 'Privacidade/Termos', genTitle: 'Gerador de receitas IA', genMealType: 'Categoria',
    genCuisine: 'Cozinha', genDishName: 'O que comer?', optStandard: 'Padrão', optBaby: 'Bebê', optPregnancy: 'Gravidez',
    generate: 'Gerar receita', generating: 'Gerando...', aiAssistTitle: 'Assistente IA', enterQuestion: 'Pergunte sobre esta receita...',
    ask: 'Perguntar', dishNameHint: 'Digite ingredientes, pratos ou alimentos.', watchVideo: 'Assistir guias em vídeo', addToHome: 'Adicionar',
    freeLimitInfo: 'Teste gratuito: {{used}}/3', starterInfo: 'Starter: {{used}}/10 | Perguntas restantes: {{qLeft}}',
    proInfo: 'Pro: {{used}}/30 | Perguntas restantes: {{qLeft}}', premiumInfo: 'Premium Family: {{used}}/80 | Perguntas restantes: {{qLeft}}',
    businessInfo: 'Business: {{used}}/300 | Perguntas restantes: {{qLeft}}', alertNoPermission: 'Seu teste gratuito expirou. Assine para continuar.',
    alertDailyLimit: 'Limite diário atingido. Atualize ou tente novamente amanhã.', alertNoPoints: 'Cota insuficiente.',
    alertCooldown: 'Muito rápido, aguarde.', alertMonthlyCost: 'Limite mensal atingido.', alertNoRecipe: 'Gere uma receita primeiro.',
    alertQTooLong: 'Pergunta muito longa.', alertInvalidFood: 'Digite um nome de alimento válido.', paymentSuccess: 'Assinatura ativada!',
    q: 'P', a: 'R', qLimitReached: 'Você atingiu o limite de 5 perguntas para esta receita.', starterName: 'Starter', proName: 'Pro',
    premiumName: 'Premium Family', businessName: 'Business Kitchen', starterDesc: '10 receitas/dia · 5 perguntas',
    proDesc: '30 receitas/dia · 5 perguntas', premiumDesc: '80 receitas/dia compartilhadas · 5 perguntas · Compartilhamento familiar',
    businessDesc: '300 receitas/dia · 5 perguntas · Uso comercial', finePrint: 'Ao assinar, você concorda com nossos ',
    loginTitle: 'Entrar', registerTitle: 'Registrar', email: 'E-mail', password: 'Senha', confirmPwd: 'Confirmar senha',
    forgot: 'Esqueceu a senha?', noAccount: 'Novo?', signUp: 'Registrar', signIn: 'Entrar', haveAccount: 'Já tem uma conta?',
    forgotTitle: 'Redefinir senha', cancel: 'Cancelar', reset: 'Redefinir', profileNickname: 'Apelido', profileEmail: 'E-mail',
    profilePlan: 'Plano', profileJoined: 'Registrado em', logout: 'Sair', profileSub: 'Minha assinatura', subStatus: 'Status',
    subExpiry: 'Expira', inviteCodeTitle: 'Código de convite', joinFamily: 'Entrar', nicknameTitle: 'Alterar apelido',
    emailTitle: 'Alterar e-mail', legalPrivacyTitle: 'Política de privacidade', legalEffDate: 'Data de vigência: 2025-01-01',
    legalPrivacyCollect: '1. Informações que coletamos', legalPrivacy1: 'AI Chef é um aplicativo do lado do cliente. Não coletamos, armazenamos ou transmitimos informações pessoais.',
    legalPrivacyUse: '2. Uso das informações', legalPrivacy2: 'Toda a geração de receitas é executada localmente no seu dispositivo.',
    legalPrivacySecurity: '3. Segurança de dados', legalPrivacy3: 'Nenhum dado coletado = nenhum risco de violação.',
    legalPrivacyChanges: '4. Mudanças na política', legalPrivacy4: 'Podemos atualizar esta política. As alterações serão publicadas aqui.',
    legalPrivacyContact: '5. Contate-nos', legalPrivacy5: 'Entre em contato conosco em go@tarop.top se tiver dúvidas.',
    legalTermsTitle: 'Termos de serviço', legalTermEffDate: 'Data de vigência: 2025-01-01', legalTermsLicense: '1. Licença',
    legalTerms1: 'Apenas para uso pessoal e não comercial. Os assinantes do Business Kitchen estão autorizados a usar o serviço para fins comerciais.',
    legalTermsDisclaimer: '2. Isenção de responsabilidade', legalTerms2: 'As receitas são geradas por IA e são apenas para referência.',
    legalTermsLimitations: '3. Limitação de responsabilidade', legalTerms3: 'Não somos responsáveis por quaisquer danos.',
    legalTermsModifications: '4. Modificações', legalTerms4: 'Podemos modificar estes termos a qualquer momento.',
    legalTermsLaw: '5. Lei aplicável', legalTerms5: 'Lei aplicável: sua jurisdição.', legalTermsSubRules: '6. Regras de assinatura',
    legalTermsSub1: '6.1 Os assinantes têm acesso após o login.', legalTermsSub2: '6.2 Quatro tipos de assinatura: Starter, Pro, Premium Family, Business.',
    legalTermsSub3: '6.3 Os pedidos devem ser ativados dentro de 24 horas fazendo login.',
    legalTermsSub4: '6.4 Cada geração de receita concede 5 perguntas de IA para essa sessão.',
    legalTermsSub5: '6.5 O compartilhamento familiar está disponível apenas para Premium Family (até 3 pessoas).',
    legalTermsSub6: '6.6 A renovação automática está ativada por padrão; gerencie via PayPal.',
    legalTermsSub7: '6.7 Sem reembolso após o pagamento.', legalTermsSub8: '6.8 Use um e-mail válido; não somos responsáveis pela perda de conta devido a e-mails falsos.',
    legalTermsSub9: '6.9 Receitas e respostas são geradas por DeepSeek e são apenas para referência.',
    legalTermsSub10: '6.10 Reservamo-nos o direito de interpretação final.', success: 'Sucesso', ok: 'OK',
    personalizedGreeting: 'Caro Gourmet! Bom apetite!', save: 'Salvar', edit: 'Editar', change: 'Alterar',
    pleaseLogin: 'Faça login primeiro', sendCode: 'Enviar código', sending: 'Enviando...', codeSent: 'Código enviado!',
    codeSendFailed: 'Falha ao enviar o código. Tente novamente.', registerSuccess: 'Registro bem-sucedido!', loginFailed: 'Falha no login. Verifique suas credenciais.',
    pricingSubtitle: 'Escolha seu plano', pricingTitle: 'Planos de assinatura', planStarterName: 'Starter', planStarterDesc: 'Seu assistente de cozinha pessoal',
    planStarterPeriod: '/ mês', planProName: 'Pro', planProDesc: 'Mais popular entre os amantes da culinária', planProPeriod: '/ mês',
    planPremiumName: 'Premium', planPremiumDesc: 'Adequado para compartilhamento entre usuários', planPremiumPeriod: '/ mês',
    planBusinessName: 'Business', planBusinessDesc: 'Para cozinhas comerciais e catering', planBusinessPeriod: '/ mês',
    subscribeBtn: 'Assinar agora', planNotice: 'Protegido pelo PayPal · Renovação automática', featureStarter1: '10 receitas por dia',
    featureStarter2: '5 perguntas IA por receita', featureStarter3: 'Apenas para uso pessoal', featureStarter4: 'Gere receitas com qualquer ingrediente',
    featurePro1: '30 receitas por dia', featurePro2: '5 perguntas IA por receita', featurePro3: 'Todas as funções desbloqueadas',
    featurePro4: 'Personalização avançada de receitas', featurePremium1: '80 receitas por dia', featurePremium2: '5 perguntas IA por receita',
    featurePremium3: 'Até 3 usuários compartilhando', featurePremium4: 'Pool de uso compartilhado', featurePremium5: 'Análise de saúde e nutrição',
    featureBusiness1: '300 gerações por dia', featureBusiness2: '5 perguntas IA por receita', featureBusiness3: 'Fila de geração prioritária',
    featureBusiness4: 'Direitos de uso comercial', featureBusiness5: 'Permissões estendidas de receitas', freeTierDesc: 'Você está no nível gratuito.',
    promoTitle: 'Seja Premium', promoSub: 'Desbloqueie tudo para sua cozinha', promoFeature1: 'Receitas ilimitadas', promoFeature2: 'Compartilhamento familiar',
    promoFeature3: 'Informações nutricionais', promoFeature4: 'Sem anúncios',
    howToTitle: 'Como usar', warnings: 'Alérgenos e Segurança', personalizedGreeting: 'Querido Gourmet! Bom apetite!', howToUse: 'Guia de uso', qLeft: 'Perguntas pendentes',
    howToTitle: 'Cómo usar', warnings: 'Alérgenos y Seguridad',
    howToList: [
      'Você pode inserir um ou mais ingredientes, como batatas, espinafre, peito de frango, salmão.',
      'Você pode pesquisar pratos e refeições clássicas, como bife grelhado, legumes assados, omelete, macarrão.',
      'Você pode procurar sobremesas e produtos de panificação, como cheesecake, sorvete de baunilha, croissant, muffin.',
      'Você pode encontrar receitas de sopas, bebidas e coquetéis caseiros, como sopa de tomate, café gelado, coquetel, suco fresco.',
      'Filtre por sabor e estilo: comida caseira, pratos salgados, picantes, doces e opções saudáveis.',
      'Descubra cozinhas globais e faça pratos de todo o mundo.',
      'Se você não gostar de uma receita, toque em Gerar novamente para novas ideias culinárias.'
    ],
    howToHighlight: 'Digite qualquer palavra relacionada a comida para explorar inúmeras receitas. Obtenha pratos populares e autênticos de cozinhas do mundo inteiro com IA.',
    homeHeroTitle: 'Descubra receitas infinitas com IA', homeHeroDesc: 'Digite qualquer ingrediente, prato ou culinária. Nosso chef de IA cria pratos autênticos e deliciosos de todo o mundo instantaneamente.',
    homeCtaBtn: 'Experimente Grátis', homeFeature1Title: 'Buscar por ingredientes', homeFeature1Desc: 'Digite um ou mais ingredientes, como batatas, espinafre, peito de frango, salmão.',
    homeFeature2Title: 'Encontre pratos clássicos', homeFeature2Desc: 'Procure bife grelhado, legumes assados, omelete, macarrão e muito mais.',
    homeFeature3Title: 'Sobremesas e bolos', homeFeature3Desc: 'Cheesecake, sorvete de baunilha, croissant, muffin e doces.',
    homeFeature4Title: 'Sopas e bebidas', homeFeature4Desc: 'Sopa de tomate, café gelado, coquetéis, sucos frescos e bebidas caseiras.',
    homeFeature5Title: 'Culinárias do mundo', homeFeature5Desc: 'Descubra culinárias do mundo e prepare pratos autênticos de qualquer cultura.',
    homeFeature6Title: 'Ideias ilimitadas', homeFeature6Desc: 'Toque Gerar novamente para novas ideias culinárias quando quiser.',
    homeBottomTitle: 'Simples. Rápido. Delicioso.', homeBottomDesc: 'Digite qualquer palavra-chave relacionada a comida para explorar receitas infinitas. Obtenha pratos populares e autênticos de culinárias do mundo com IA.',
    homeSubscriptionLink: 'Assinatura'
  }
};

function t(key, params) {
  let text = translations[currentLang]?.[key] || translations.en[key] || key;
  if (params) for (let k in params) text = text.replace(new RegExp(`{{${k}}}`, 'g'), params[k]);
  return text;
}
function getLangName(lang) { const map = { en:'English', es:'Español', fr:'Français', de:'Deutsch', it:'Italiano', pt:'Português', 'zh-CN':'简体中文' }; return map[lang] || 'English'; }

// ==================== 设备指纹 ====================
async function initDeviceId() {
  if (deviceId) return deviceId;
  let stored = localStorage.getItem('deviceId');
  if (stored && stored.length > 10) { deviceId = stored; return deviceId; }
  try {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    deviceId = `fp_${result.visitorId}`;
    localStorage.setItem('deviceId', deviceId);
  } catch (e) {
    deviceId = 'dev_' + Math.random().toString(36).substr(2,9) + Date.now().toString(36);
    localStorage.setItem('deviceId', deviceId);
  }
  return deviceId;
}

// ==================== API 调用 ====================
async function apiCall(endpoint, options = {}) {
  const token = localStorage.getItem('authToken');
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token && !endpoint.startsWith('/api/auth/')) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${BACKEND_URL}${endpoint}`, { ...options, headers });
  if (!res.ok) {
    let errorMsg;
    try { const err = await res.json(); errorMsg = err.error || `HTTP ${res.status}`; }
    catch { errorMsg = `HTTP ${res.status}`; }
    throw new Error(errorMsg);
  }
  return res.json();
}

// ==================== 用户数据加载 ====================
async function loadUserData() {
  const token = localStorage.getItem('authToken');
  if (!token) return null;
  try { return await apiCall('/api/user/me'); }
  catch (e) { if (e.message.includes('401')) localStorage.removeItem('authToken'); return null; }
}

async function refreshUserData() {
  userData = await loadUserData();
  updateLimitInfo();
  updateNavButton();
  renderProfile();
}

function updateNavButton() {
  const avatar = document.getElementById('navAvatar');
  const loginBtn = document.getElementById('btnLogin');
  const getStartedBtn = document.getElementById('btnGetStarted');
  if (!avatar || !loginBtn) return;
  if (userData && userData.email) {
    const savedAvatar = localStorage.getItem(`avatar_${userData.email}`);
    avatar.src = savedAvatar || '/images/default-avatar.png';
    avatar.style.display = 'inline-block';
    loginBtn.style.display = 'none';
    if (getStartedBtn) getStartedBtn.style.display = 'flex';
  } else {
    avatar.style.display = 'none';
    loginBtn.style.display = 'flex';
    if (getStartedBtn) getStartedBtn.style.display = 'flex';
  }
}

// ==================== 生成器相关 ====================
async function generateRecipe() {
  if (!userData) { alert(t('pleaseLogin')); showPage('page-login-register'); return; }
  const plan = userData.plan;
  if (plan === 'free' && userData.freeUsed >= 3) { alert(t('alertNoPermission')); showPage('page-subscribe'); return; }
  const limit = PLANS[plan]?.dailyLimit || 0;
  if (plan !== 'free' && userData.dailyUsed >= limit) { alert(t('alertDailyLimit')); showPage('page-subscribe'); return; }

  const dish = document.getElementById('dishName').value.trim();
  if (!dish) { alert(t('alertInvalidFood')); return; }

    // 连续生成去重：记录最近6次菜名，在提示词中要求避免重复
  if (!window.lastSixDishNames) window.lastSixDishNames = [];
  const recentNames = window.lastSixDishNames.join('、');
  
  // 判断是否为精准菜名输入（输入内容包含完整菜名，而非单一食材）
  const isExactDish = dish.length >= 4 && !(/[^/s]/).test(dish) && dish.length <= 20;
  
  const avoidRepeatInstruction = (!isExactDish && window.lastSixDishNames.length > 0) 
    ? `\n注意：请勿生成与以下菜名重复的食谱：${recentNames}。` 
    : '';
  const mealType = document.getElementById('mealType').value;
  const cuisine = document.getElementById('cuisine').value;
  const genBtn = document.getElementById('btnGenerate');
  genBtn.disabled = true; genBtn.innerText = t('generating');
  
  const lang = getCurrentLang();
const langMap = {
  'en': 'English', 'es': 'Español', 'fr': 'Français', 'de': 'Deutsch',
  'it': 'Italiano', 'pt': 'Português', 'zh-CN': '中文'
};
const targetLang = langMap[lang] || 'English';

const systemPrompt = `You are a professional chef. Output ONLY clean recipe text with NO special symbols, markdown, or extra formatting.

Follow this structure exactly, with a blank line between sections:

Dish Name

Ingredients:
- ingredient amount

Instructions (±X mins)
1. step
2. step

Nutrition:
- Calories: approx. X kcal
- Protein: X g
- Carbohydrates: X g
- Fat: X g
- Dietary Fiber: X g

Allergens & Safety:
1. Food safety and pairing risk
2. Additional nutritional advice

Language: ${targetLang}
Suitable for: ${mealType === 'baby' ? 'Baby (no salt/sugar)' : mealType === 'pregnancy' ? 'Pregnancy' : 'General'}

Important: You MUST output the entire recipe, including the 'Allergens & Safety' section, completely in the specified language. DO NOT mix languages.`;
    
    const generatedName = document.getElementById('recipeNameDisplay').innerText;
    if (generatedName) {
      window.lastSixDishNames.push(generatedName);
      if (window.lastSixDishNames.length > 6) window.lastSixDishNames.shift();
    }
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);
    const response = await fetch(DEEPSEEK_API, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'deepseek-v4-flash', temperature: 0.9, max_tokens: 1200,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `生成${cuisine} ${dish} 食谱，请提供一种不同的做法。随机种子：${Date.now()}_${Math.random().toString(36)}` }
        ],
        cache_prefix: 'ai_chef_recipe_',
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    const recipe = data.choices[0].message.content;

    renderRecipeContent(recipe);

    let displayName = 'Gourmet';
    if (userData && userData.nickname) {
      displayName = userData.nickname;
    } else if (userData && userData.email) {
      displayName = userData.email.split('@')[0];
    }

    addToHistory(recipe);
    userData.lastRecipeText = recipe;

    await initDeviceId();
    const res = await apiCall('/api/user/record-generation', { method: 'POST', body: JSON.stringify({ deviceId }) });
    if (plan === 'free') { userData.freeUsed = res.freeUsed; }
    else {
      userData.dailyUsed = res.dailyUsed;
      userData.qLeft = res.qLeft;
      const qaInputEl = document.getElementById('qaInput');
const sendBtn = document.getElementById('qaSendBtn');
if (qaInputEl) qaInputEl.disabled = false;
if (sendBtn) sendBtn.disabled = false;
      document.getElementById('qaHistory').innerHTML = '';
      document.getElementById('qaLimitNote').innerText = `${t('qLeft')}: ${userData.qLeft}`;
    }
    updateLimitInfo();
  } catch (error) {
    console.error(error);
    if (error.message.includes('Free trial expired') || error.message.includes('limit reached')) {
      alert(t('alertNoPermission')); showPage('page-subscribe');
    } else {
      document.getElementById('recipeNameDisplay').innerText = '生成失败：' + error.message;
    }
  } finally { genBtn.disabled = false; genBtn.innerText = t('generate'); }
}

function renderRecipeContent(text) {
  const blocks = text.split(/\n\s*\n/);
  const name = blocks[0]?.trim() || '';
  document.getElementById('recipeNameDisplay').innerText = name;

  let html = '';
  let timeStr = '';

  for (let i = 1; i < blocks.length; i++) {
    const block = blocks[i].trim();
    if (!block) continue;
    const lines = block.split('\n');

    // 提取标题（第一个非空行）
    let titleLine = '';
    const contentLines = [];
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      if (!titleLine) {
        titleLine = trimmed;
      } else {
        contentLines.push(trimmed);
      }
    }

    const hasDashItems = contentLines.some(l => l.startsWith('-'));
    const hasNumberedItems = contentLines.some(l => /^\d+\./.test(l));

    // 标题直接使用 AI 输出的原始文本，加粗
    if (titleLine) {
      html += `<h4>${titleLine}</h4>`;
    }

    if (hasDashItems) {
      const items = contentLines.filter(l => l.startsWith('-')).map(l => l.substring(1).trim());
      html += '<ul class="dash-list">';
      items.forEach(item => { html += `<li>${item}</li>`; });
      html += '</ul>';
    } else if (hasNumberedItems) {
      // 保留原始序号，直接使用整行作为列表项内容
      const isWarnings = titleLine.toLowerCase().includes('allergen') || titleLine.toLowerCase().includes('safety') || titleLine.includes('风险') || titleLine.includes('建议');
      const items = contentLines.filter(l => /^\d+\./.test(l)).map(l => l.trim());
      if (isWarnings) {
        html += '<ul class="warnings-list">';
        items.forEach(item => { html += `<li>${item}</li>`; });
        html += '</ul>';
      } else {
        // 提取时间信息（如果标题中包含）
        const timeMatch = titleLine.match(/(\d+)\s*(?:分钟|mins?)/i);
        if (timeMatch) timeStr = timeMatch[1];
        html += '<ul class="instructions-list">';
        items.forEach(item => { html += `<li>${item}</li>`; });
        html += '</ul>';
      }
    } else {
      // 无特殊格式，直接显示内容
      html += `<p>${contentLines.join('<br>')}</p>`;
    }
  }

  document.getElementById('recipeContent').innerHTML = html;
}

function updateLimitInfo() {
  const el = document.getElementById('limitInfo');
  if (!el) return;
  if (!userData) {
  el.innerText = t('pleaseLogin');
  const qaLimit = document.getElementById('qaLimitNote');
  if (qaLimit) qaLimit.innerText = t('qLeft'); // 仅显示“剩余提问”，无数字
  return;
}
  const plan = userData.plan;
  if (plan === 'free') { el.innerText = t('freeLimitInfo', { used: userData.freeUsed }); }
  else { const used = userData.dailyUsed || 0; const qLeft = userData.qLeft || 0; el.innerText = t(plan + 'Info', { used, qLeft }); }
}

// ==================== 问答 ====================
async function askQuestion() {
    if (!userData || !userData.lastRecipeText) {
        alert(t('alertNoRecipe'));
        return;
    }
    if (userData.qLeft <= 0) {
        alert(t('qLimitReached') + ' ' + t('alertNoPoints'));
        return;
    }
    const question = document.getElementById('qaInput').value.trim();
    if (!question)
        return;

    const sendBtn = document.getElementById('qaSendBtn');
if (sendBtn) sendBtn.disabled = true;
    const historyEl = document.getElementById('qaHistory');  // 注意 ID 是 qaHistory
    historyEl.innerHTML += `<div class="qa"><q>${question}</q></div>`;
    historyEl.scrollTop = historyEl.scrollHeight;  //  自动滚动到底部

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);

        const lang = getCurrentLang();
const langMap = { /* 同上 */ };
const targetLang = langMap[lang] || 'English';

const systemContent = `You are a professional nutrition chef assistant. Answer questions based on the provided recipe. Keep responses concise, professional, and no more than 5 lines. Do NOT use any asterisks. You MUST answer in ${targetLang}.\n\nRecipe:\n${userData.lastRecipeText}`;
        
       const response = await fetch(DEEPSEEK_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'deepseek-v4-flash',
                temperature: 0.3,
                max_tokens: 300,
                messages: [
                    { role: 'system', content: systemContent },
                    { role: 'user', content: question }
                ],
                cache_prefix: 'ai_chef_recipe_',
            }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        let answer = data.choices[0].message.content.replace(/\*/g, '');
        const lines = answer.split('\n');
        if (lines.length > 5) answer = lines.slice(0, 5).join('\n');

        historyEl.innerHTML += `<div class="qa"><a>${answer}</a></div>`;
        historyEl.scrollTop = historyEl.scrollHeight;  // 再次滚动到底部

        const res = await apiCall('/api/user/record-question', { method: 'POST' });
        userData.qLeft = res.qLeft;
        document.getElementById('qaLimitNote').innerText = `${t('qLeft')}: ${userData.qLeft}`;
    } catch (error) {
        historyEl.innerHTML += `<div class="qa"><a>Error, please try again.</a></div>`;
        historyEl.scrollTop = historyEl.scrollHeight;
    } finally {
        const sendBtn = document.getElementById('qaSendBtn');
if (sendBtn) sendBtn.disabled = false;
        document.getElementById('qaInput').value = '';
    }
}
// ==================== 视频模块 ====================
const VIDEO_API = "https://vid.taropai.com";

async function showVideo() {
  const dishNameEl = document.getElementById('recipeNameDisplay');
  let dish = dishNameEl ? dishNameEl.innerText.trim() : '';
  if (!dish || dish === 'Please generate a recipe first' || dish.startsWith('生成失败')) {
    dish = document.getElementById('dishName').value.trim() || 'cooking';
  }
  try {
    const res = await fetch(`${VIDEO_API}?dish=${encodeURIComponent(dish)}`);
    const data = await res.json();
    renderVideoGrid(data.videos || []);
  } catch (e) {
    renderVideoGrid([]);
  }
  document.getElementById('videoModal').classList.add('show');
}

function renderVideoGrid(videos) {
  const grid = document.getElementById('videoGrid');
  if (!videos.length) {
    grid.innerHTML = '<div style="padding:20px;text-align:center;color:#6b7280;">暂无相关视频</div>';
    return;
  }
  grid.innerHTML = videos.map(v => `
    <div class="video-card" onclick="playVideoFromGrid('${v.platform}','${v.id}','${v.title.replace(/'/g, "\\'")}')">
      <img class="video-card-img" src="${v.cover}" alt="${v.title}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 160 90\\'%3E%3Crect width=\\'160\\' height=\\'90\\' fill=\\'%23e5e7eb\\'/%3E%3Ctext x=\\'10\\' y=\\'50\\' font-size=\\'12\\' fill=\\'%236b7280\\'%3EPreview%3C/text%3E%3C/svg%3E'">
      <div class="video-card-text">
        <div class="video-card-name">${v.title}</div>
        <div class="video-card-meta">${v.views || 0} 次播放 • ${v.platform}</div>
      </div>
    </div>
  `).join('');
}

window.playVideoFromGrid = function(platform, videoId, title) {
  document.getElementById('videoModal').classList.remove('show');
  document.getElementById('bottomVideoTitle').innerText = title;
  const player = document.getElementById('videoPlayer');
  const frameContainer = document.getElementById('videoFrameContainer');
  if (platform === 'bilibili') {
    frameContainer.innerHTML = `<iframe width="100%" height="100%" src="https://player.bilibili.com/player.html?bvid=${videoId}&autoplay=1" frameborder="0" allowfullscreen></iframe>`;
  } else if (platform === 'youtube') {
    frameContainer.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>`;
  } else if (platform === 'tiktok') {
    window.open(`https://www.tiktok.com/video/${videoId}`, '_blank');
    return;
  } else if (platform === 'promo') {
    frameContainer.innerHTML = `<video width="100%" height="100%" controls autoplay src="${videoId}"></video>`;
  }
  player.classList.add('show', 'expanded');
  player.classList.remove('mini');
};

function initVideoPlayerControls() {
  document.getElementById('closeVideoModal').addEventListener('click', () => document.getElementById('videoModal').classList.remove('show'));
  document.getElementById('togglePlayer').addEventListener('click', () => {
    const player = document.getElementById('videoPlayer');
    player.classList.toggle('expanded');
    player.classList.toggle('mini');
  });
  document.getElementById('closePlayer').addEventListener('click', () => {
    const player = document.getElementById('videoPlayer');
    player.classList.remove('show', 'expanded', 'mini');
    document.getElementById('videoFrameContainer').innerHTML = '';
  });
  document.getElementById('videoModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('videoModal')) document.getElementById('videoModal').classList.remove('show');
  });
}

// ==================== 使用说明弹窗 ====================
function openHowToModal() {
  const modal = document.getElementById('howToModal');
  const titleEl = document.getElementById('howToTitle');
  const listEl = document.getElementById('howToList');
  const highlightEl = document.getElementById('howToHighlight');
  if (titleEl) titleEl.innerText = t('howToTitle');
  if (listEl) {
    const items = t('howToList');
    listEl.innerHTML = Array.isArray(items) ? items.map(li => `<li>${li}</li>`).join('') : '';
  }
  if (highlightEl) highlightEl.innerText = t('howToHighlight');
  modal.classList.add('show');
}
function closeHowToModal() { document.getElementById('howToModal').classList.remove('show'); }

// ==================== 登录/注册 ====================
function switchAuthTab(tab) {
  document.getElementById('tabLogin').classList.toggle('active', tab === 'login');
  document.getElementById('tabRegister').classList.toggle('active', tab === 'register');
  document.getElementById('loginForm').style.display = tab === 'login' ? 'block' : 'none';
  document.getElementById('registerForm').style.display = tab === 'register' ? 'block' : 'none';
}

async function register() {
  const email = document.getElementById('registerEmail').value, code = document.getElementById('registerCode').value;
  const pwd = document.getElementById('registerPassword').value, confirm = document.getElementById('registerConfirmPwd').value;
  if (pwd !== confirm) { alert('Passwords do not match'); return; }
  if (!code) { alert('Verification code required'); return; }
  await initDeviceId();
  const bindCode = localStorage.getItem('tempBindCode');
  try {
    const data = await apiCall('/api/user/register', { method: 'POST', body: JSON.stringify({ email, password: pwd, verificationCode: code, deviceId, bindCode }) });
    localStorage.setItem('authToken', data.token); userData = data.user; localStorage.removeItem('tempBindCode');
    alert(t('registerSuccess')); showPage('page-generator'); renderProfile(); updateLimitInfo();
  } catch (e) { alert(e.message); }
}

async function login() {
  const email = document.getElementById('loginEmail').value, pwd = document.getElementById('loginPassword').value;
  const bindCode = localStorage.getItem('tempBindCode');
  try {
    await initDeviceId();
    const data = await apiCall('/api/user/login', { method: 'POST', body: JSON.stringify({ email, password: pwd, deviceId, bindCode }) });
    localStorage.setItem('authToken', data.token); userData = data.user; localStorage.removeItem('tempBindCode');
    showPage('page-generator'); renderProfile(); updateLimitInfo();
  } catch (e) { alert(t('loginFailed') + ': ' + e.message); }
}

function logout() {
  localStorage.removeItem('authToken'); userData = null;
  const recipeContent = document.getElementById('recipeContent');
if (recipeContent) recipeContent.innerHTML = '';
const recipeName = document.getElementById('recipeNameDisplay');
if (recipeName) recipeName.innerText = '';
const qaHistory = document.getElementById('qaHistory');
if (qaHistory) qaHistory.innerHTML = '';
const qaLimitNote = document.getElementById('qaLimitNote');
if (qaLimitNote) qaLimitNote.innerText = '';
  showPage('page-home'); updateNavButton(); renderProfile(); updateLimitInfo();
}

// ==================== 验证码发送 ====================
let countdowns = {};
function startCountdown(btnId, seconds) {
  if (countdowns[btnId]) return;
  let remaining = seconds; const btn = document.getElementById(btnId); btn.disabled = true; const originalText = btn.innerText;
  countdowns[btnId] = setInterval(() => { remaining--; btn.innerText = `${remaining}s`; if (remaining <= 0) { clearInterval(countdowns[btnId]); delete countdowns[btnId]; btn.disabled = false; btn.innerText = originalText; } }, 1000);
}
async function sendVerificationCode() {
  const email = document.getElementById('registerEmail').value;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert('Invalid email'); return; }
  const btn = document.getElementById('sendCodeBtn'); const originalText = btn.innerText; btn.disabled = true; btn.innerText = t('sending');
  try { await apiCall('/api/send-verification-code', { method: 'POST', body: JSON.stringify({ email }) }); alert(t('codeSent')); startCountdown('sendCodeBtn', 60); }
  catch (e) { if (e.message.includes('already registered')) { alert('Email already registered. Please login.'); } else { alert(t('codeSendFailed') + ': ' + e.message); } btn.disabled = false; btn.innerText = originalText; }
}
async function sendResetCode() {
  const email = document.getElementById('forgotEmail').value;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert('Invalid email'); return; }
  const btn = document.getElementById('sendResetCodeBtn'); const originalText = btn.innerText; btn.disabled = true; btn.innerText = t('sending');
  try { await apiCall('/api/send-reset-code', { method: 'POST', body: JSON.stringify({ email }) }); alert(t('codeSent')); startCountdown('sendResetCodeBtn', 60); }
  catch (e) { if (e.message.includes('not found')) { alert('Email not found. Please register first.'); } else { alert(t('codeSendFailed') + ': ' + e.message); } btn.disabled = false; btn.innerText = originalText; }
}
async function sendEmailChangeCode() {
  const newEmail = document.getElementById('newEmailInput').value;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) { alert('Invalid email'); return; }
  const btn = document.getElementById('sendEmailChangeCodeBtn'); const originalText = btn.innerText; btn.disabled = true; btn.innerText = t('sending');
  try { await apiCall('/api/send-email-change-code', { method: 'POST', body: JSON.stringify({ newEmail }) }); alert(t('codeSent')); startCountdown('sendEmailChangeCodeBtn', 60); }
  catch (e) { if (e.message.includes('already used')) { alert('New email already used by another account.'); } else { alert(t('codeSendFailed') + ': ' + e.message); } btn.disabled = false; btn.innerText = originalText; }
}

// ==================== 密码小眼睛 ====================
function togglePassword(fieldId) { const field = document.getElementById(fieldId); field.type = field.type === 'password' ? 'text' : 'password'; }
function togglePasswordWithIcon(fieldId, toggleElement) {
  const field = document.getElementById(fieldId); if (!field) return;
  const isPassword = field.type === 'password'; field.type = isPassword ? 'text' : 'password';
  const icon = toggleElement.querySelector('.pwd-icon');
  if (icon) { if (isPassword) { icon.classList.remove('pwd-icon-eye-slash'); icon.classList.add('pwd-icon-eye'); } else { icon.classList.remove('pwd-icon-eye'); icon.classList.add('pwd-icon-eye-slash'); } }
}

// ==================== 个人信息修改 ====================
async function saveNickname() {
  const newName = document.getElementById('newNicknameInput').value.trim();
  if (!newName || newName.length > 20) { alert('Nickname must be 1-20 characters'); return; }
  await apiCall('/api/user/update', { method: 'PATCH', body: JSON.stringify({ nickname: newName }) });
  userData.nickname = newName; document.getElementById('profileNickname').innerText = newName;
  closeModal('nicknameModal'); updateNavButton();
}
async function saveEmail() {
  const newEmail = document.getElementById('newEmailInput').value.trim(), code = document.getElementById('emailChangeCode').value;
  if (!code) { alert('Verification code required'); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) { alert('Invalid email'); return; }
  try {
    const data = await apiCall('/api/user/change-email', { method: 'POST', body: JSON.stringify({ newEmail, verificationCode: code }) });
    localStorage.setItem('authToken', data.token); userData.email = newEmail; document.getElementById('profileEmail').innerText = newEmail;
    closeModal('emailModal');
  } catch (e) { alert(e.message); }
}
async function setPassword() {
  const pwd = document.getElementById('newPasswordInput').value, confirm = document.getElementById('confirmPasswordInput').value;
  if (pwd !== confirm) { alert('Passwords do not match'); return; }
  if (pwd.length < 6) { alert('Password must be at least 6 characters'); return; }
  try { await apiCall('/api/user/set-password', { method: 'POST', body: JSON.stringify({ newPassword: pwd }) }); alert('Password set. You can now login with email.'); document.getElementById('setPasswordArea').style.display = 'none'; }
  catch (e) { alert(e.message); }
}
async function resetPassword() {
  const email = document.getElementById('forgotEmail').value, code = document.getElementById('forgotCode').value, newPwd = document.getElementById('forgotNewPwd').value;
  if (!code) { alert('Verification code required'); return; }
  if (!newPwd || newPwd.length < 6) { alert('Password must be at least 6 characters'); return; }
  try { await apiCall('/api/user/reset-password', { method: 'POST', body: JSON.stringify({ email, verificationCode: code, newPassword: newPwd }) }); alert('Password reset successfully!'); closeModal('forgotModal'); }
  catch (e) { alert(e.message); }
}

// ==================== 社交登录 ====================
function initSocialLogin() {}
function checkOAuthCallback() {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token'), userParam = urlParams.get('user');
  if (token && userParam) {
    localStorage.setItem('authToken', token);
    try { userData = JSON.parse(decodeURIComponent(userParam)); showToast('Login successful!'); window.history.replaceState({}, document.title, window.location.pathname); showPage('page-generator'); renderProfile(); updateLimitInfo(); updateNavButton(); }
    catch (e) { console.error(e); }
  }
}

// ==================== 订阅支付 ====================
function renderPayPal() {
  if (!window.paypal) return;
  const containers = [
    { id: 'paypal-starter-container', planId: 'P-1U5765718B789804NNG3MBWQ', planType: 'starter', color: 'silver' },
    { id: 'paypal-pro-container', planId: 'P-5P885108R60234815NG3MEPY', planType: 'pro', color: 'blue' },
    { id: 'paypal-premium-container', planId: 'P-1880277264176022RNG3MFRA', planType: 'premium', color: 'silver' },
    { id: 'paypal-business-container', planId: 'P-5MH80426G1517050XNHQAHUA', planType: 'business', color: 'blue' }
  ];
  containers.forEach(c => {
    const container = document.getElementById(c.id); if (!container) return; container.innerHTML = '';
    paypal.Buttons({
      style: { shape: 'pill', color: c.color, layout: 'horizontal', label: 'subscribe', height: 46, tagline: false },
      createSubscription: (data, actions) => actions.subscription.create({ plan_id: c.planId }),
      onApprove: async (data, actions) => {
        try {
          await initDeviceId();
          const token = localStorage.getItem('authToken'), bindCode = localStorage.getItem('tempBindCode');
          if (!token && !bindCode) { alert('Please refresh and try again.'); return; }
          if (!token) {
            const resp = await fetch(`https://paypal.taropai.com/generate-bind-code?plan=${c.planType}`);
            const data = await resp.json(); localStorage.setItem('tempBindCode', data.bindCode);
            window.location.href = `https://paypal.taropai.com/?plan=${c.planType}&bindCode=${data.bindCode}`; return;
          }
          await apiCall('/api/subscription/verify', { method: 'POST', body: JSON.stringify({ subscriptionId: data.subscriptionID, planType: c.planType, deviceId }) });
          userData = await loadUserData(); showToast(t('paymentSuccess')); showPage('page-profile'); renderProfile(); updateLimitInfo(); updateNavButton();
        } catch (e) { console.error(e); alert('Subscription verification failed: ' + e.message); }
      },
      onError: (err) => { console.error(err); alert('Subscription failed. Please try again.'); }
    }).render(`#${c.id}`);
  });
}
async function bindInvite() {
  if (!userData) { alert('Please login'); showPage('page-login-register'); return; }
  const code = document.getElementById('inviteCodeInput').value.trim().toUpperCase(); if (!code) return;
  try { await apiCall('/api/invite/bind', { method: 'POST', body: JSON.stringify({ inviteCode: code }) }); userData = await loadUserData(); showToast('Joined family!'); renderProfile(); }
  catch (e) { alert(e.message); }
}

// ==================== 页面渲染 ====================
function populateCuisines() {
  const select = document.getElementById('cuisine'); if (!select) return;
  const map = CUISINE_MAP[currentLang] || CUISINE_MAP['en'] || {};
  select.innerHTML = CUISINES.map(c => `<option value="${c}">${map[c] || c}</option>`).join('');
}

function renderLanguage() {
  const safeText = (id, key) => { const el = document.getElementById(id); if (el) el.innerText = t(key); };
  const safePlaceholder = (id, key) => { const el = document.getElementById(id); if (el) el.placeholder = t(key); };
  const safeHtml = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };

  // ========== 首页 ==========
  safeText('heroSubtitle', 'heroSubtitle');
  safeText('sectionFeatures', 'sectionFeatures');
  for (let i=1;i<=6;i++) { safeText(`feat${i}`, `feat${i}`); safeText(`feat${i}Sub`, `feat${i}Sub`); }
  safeText('sectionSubscribe', 'sectionSubscribe');
  safeText('subText', 'subText'); safeText('subSub', 'subSub');
  safeText('familyText', 'familyText'); safeText('familySub', 'familySub');
  safeText('linkLegal', 'legalLink');

  // ========== 生成器页 ==========
  safeText('genTitle', 'genTitle');
  safeText('genMealType', 'genMealType'); safeText('genCuisine', 'genCuisine');
  safeText('genDishName', 'genDishName');
  safeText('optStandard', 'optStandard'); safeText('optBaby', 'optBaby'); safeText('optPregnancy', 'optPregnancy');
  safeText('btnGenerate', 'generate');
  safeText('aiAssistTitle', 'aiAssistTitle');
  safePlaceholder('qaInput', 'enterQuestion');
  const askBtn = document.getElementById('askBtn');
if (askBtn) askBtn.innerText = 'Ask';
  safeText('dishNameHint', 'dishNameHint');
  safeHtml('openVideoBtn', t('watchVideo'));
  safeHtml('addToHomeBtn', '+');
  safeText('howToUseBtn', 'howToUse');
  
  // ========== 登录/注册页 ==========
  safeText('tabLogin', 'signIn'); safeText('tabRegister', 'signUp');
  safePlaceholder('loginEmail', 'email'); safePlaceholder('loginPassword', 'password');
  safeText('forgotPwdLink', 'forgot'); safeText('btnLoginSubmit', 'signIn');
  safeText('noAccount', 'noAccount'); safeText('switchToRegister', 'signUp');
  safePlaceholder('registerEmail', 'email'); safePlaceholder('registerPassword', 'password');
  safePlaceholder('registerConfirmPwd', 'confirmPwd'); safeText('btnRegisterSubmit', 'signUp');
  safeText('haveAccount', 'haveAccount'); safeText('switchToLogin', 'signIn');

  // ========== 个人信息页 ==========
  safeText('profileNicknameLabel', 'profileNickname');
  safeText('profileEmailLabel', 'profileEmail');
  safeText('profileJoinedLabel', 'profileJoined');
  safeText('profileSubTitle', 'profileSub');
  safeText('logoutBtn', 'logout');
  safeText('editNicknameBtn', 'edit'); safeText('editEmailBtn', 'edit');
  safeText('promoTitle', 'promoTitle'); safeText('promoSub', 'promoSub');
  safeText('promoFeature1', 'promoFeature1'); safeText('promoFeature2', 'promoFeature2');
  safeText('promoFeature3', 'promoFeature3'); safeText('promoFeature4', 'promoFeature4');
  safeText('goSubscribeBtn', 'subscribeBtn');
  safeText('inviteCodeTitle', 'inviteCodeTitle');

  // ========== 订阅页 ==========
  safeText('pricingSubtitle', 'pricingSubtitle'); safeText('pricingTitle', 'pricingTitle');
  ['Starter','Pro','Premium','Business'].forEach(type => {
    safeText(`plan${type}Name`, `plan${type}Name`);
    safeText(`plan${type}Desc`, `plan${type}Desc`);
    safeText(`plan${type}Period`, `plan${type}Period`);
  });
  ['planNoticeStarter','planNoticePro','planNoticePremium','planNoticeBusiness'].forEach(id => { safeText(id, 'planNotice'); });
  [1,2,3,4].forEach(i => { safeText(`featureStarter${i}`, `featureStarter${i}`); });
  [1,2,3,4].forEach(i => { safeText(`featurePro${i}`, `featurePro${i}`); });
  [1,2,3,4,5].forEach(i => { safeText(`featurePremium${i}`, `featurePremium${i}`); });
  [1,2,3,4,5].forEach(i => { safeText(`featureBusiness${i}`, `featureBusiness${i}`); });
  const finePrint = document.getElementById('finePrint');
  if (finePrint) finePrint.innerHTML = t('finePrint') + ' <a onclick="showPage(\'page-legal\')">' + t('legalTermsTitle') + '</a>.';

  // ========== 法律页 ==========
  const legalTabs = document.querySelectorAll('.legal-tab');
  if (legalTabs[0]) legalTabs[0].innerText = t('legalPrivacyTitle');
  if (legalTabs[1]) legalTabs[1].innerText = t('legalTermsTitle');
  safeText('legalPrivacyTitle', 'legalPrivacyTitle'); safeText('legalEffDate', 'legalEffDate');
  safeText('legalPrivacyCollect', 'legalPrivacyCollect'); safeText('legalPrivacy1', 'legalPrivacy1');
  safeText('legalPrivacyUse', 'legalPrivacyUse'); safeText('legalPrivacy2', 'legalPrivacy2');
  safeText('legalPrivacySecurity', 'legalPrivacySecurity'); safeText('legalPrivacy3', 'legalPrivacy3');
  safeText('legalPrivacyChanges', 'legalPrivacyChanges'); safeText('legalPrivacy4', 'legalPrivacy4');
  safeText('legalPrivacyContact', 'legalPrivacyContact'); safeText('legalPrivacy5', 'legalPrivacy5');
  safeText('legalTermsTitle', 'legalTermsTitle'); safeText('legalTermEffDate', 'legalTermEffDate');
  safeText('legalTermsLicense', 'legalTermsLicense'); safeText('legalTerms1', 'legalTerms1');
  safeText('legalTermsDisclaimer', 'legalTermsDisclaimer'); safeText('legalTerms2', 'legalTerms2');
  safeText('legalTermsLimitations', 'legalTermsLimitations'); safeText('legalTerms3', 'legalTerms3');
  safeText('legalTermsModifications', 'legalTermsModifications'); safeText('legalTerms4', 'legalTerms4');
  safeText('legalTermsLaw', 'legalTermsLaw'); safeText('legalTerms5', 'legalTerms5');
  safeText('legalTermsSubRules', 'legalTermsSubRules');
  for (let i=1;i<=10;i++) { safeText(`legalTermsSub${i}`, `legalTermsSub${i}`); }

  // ========== 弹窗及按钮 ==========
  safeText('forgotTitle', 'forgotTitle'); safeText('cancelForgot', 'cancel'); safeText('resetPwdBtn', 'reset');
  safeText('nicknameTitle', 'nicknameTitle'); safeText('cancelNickname', 'cancel'); safeText('saveNicknameBtn', 'save');
  safeText('emailTitle', 'emailTitle'); safeText('cancelEmail', 'cancel'); safeText('saveEmailBtn', 'save');
  safeText('successTitle', 'success'); safeText('closeSuccessBtn', 'ok');
  safeText('sendCodeBtn', 'sendCode'); safeText('sendResetCodeBtn', 'sendCode'); safeText('sendEmailChangeCodeBtn', 'sendCode');

  // ========== 营销首页 ==========
  safeText('homeHeroTitle', 'homeHeroTitle'); safeText('homeHeroDesc', 'homeHeroDesc');
  safeText('homeCtaBtn', 'homeCtaBtn'); safeText('homeBottomTitle', 'homeBottomTitle');
  safeText('homeBottomDesc', 'homeBottomDesc'); safeText('homeSubscriptionLink', 'homeSubscriptionLink');
  const features = document.querySelectorAll('.item');
  if (features.length) {
    const titles = ['homeFeature1Title','homeFeature2Title','homeFeature3Title','homeFeature4Title','homeFeature5Title','homeFeature6Title'];
    const descs = ['homeFeature1Desc','homeFeature2Desc','homeFeature3Desc','homeFeature4Desc','homeFeature5Desc','homeFeature6Desc'];
    features.forEach((item, idx) => {
      if (idx < 6) {
        const h3 = item.querySelector('h3'); if (h3) h3.innerText = t(titles[idx]);
        const p = item.querySelector('p'); if (p) p.innerText = t(descs[idx]);
      }
    });
  }

  let displayName = 'Gourmet';
  if (userData && userData.nickname) displayName = userData.nickname;
  else if (userData && userData.email) displayName = userData.email.split('@')[0];
  const greetingEl = document.getElementById('personalizedGreeting');
  if (greetingEl) {
  greetingEl.innerText = t('personalizedGreeting').replace('Gourmet', displayName);
}
  populateCuisines();
}

function renderProfile() {
  if (!userData) {
    document.getElementById('profileNickname').innerText = 'Gourmet'; document.getElementById('profileEmail').innerText = '';
    document.getElementById('profileJoined').innerText = ''; document.getElementById('subStatus').innerText = 'Free';
    document.getElementById('subExpiryText').innerText = "You're on the free tier.";
    document.getElementById('familyArea').style.display = 'none'; document.getElementById('setPasswordArea').style.display = 'none';
    return;
  }
  const savedAvatar = localStorage.getItem(`avatar_${userData.email}`); const avatarImg = document.getElementById('profileAvatarImg');
  if (avatarImg) { avatarImg.src = savedAvatar || '/images/default-avatar.png'; const navAvatar = document.getElementById('navAvatar'); if (navAvatar) navAvatar.src = avatarImg.src; }
  document.getElementById('profileNickname').innerText = userData.nickname || 'Gourmet'; document.getElementById('profileEmail').innerText = userData.email;
  const joinedDate = userData.createdAt ? new Date(userData.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'N/A';
  document.getElementById('profileJoined').innerText = joinedDate;
  const plan = userData.plan || 'free'; const planDisplay = { free:'Free', starter:'Starter', pro:'Pro', premium:'Premium Family', business:'Business' }[plan] || plan;
  document.getElementById('subStatus').innerText = planDisplay;
  const subExpiryEl = document.getElementById('subExpiryText');
  if (plan === 'free') { subExpiryEl.innerText = t('freeTierDesc') || "You're on the free tier."; }
  else { const expireStr = userData.expireAt ? new Date(userData.expireAt).toLocaleDateString() : ''; subExpiryEl.innerText = expireStr ? `${planDisplay} · Expires ${expireStr}` : planDisplay; }
  const familyArea = document.getElementById('familyArea');
  if (plan === 'premium') { familyArea.style.display = 'block'; document.getElementById('ownerInviteCode').innerText = t('inviteCodeTitle') + ': ' + (userData.inviteCode || ''); }
  else { familyArea.style.display = 'none'; }
  document.getElementById('setPasswordArea').style.display = userData.hasPassword ? 'none' : 'block';
}

async function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    if (pageId === 'page-generator') {
        if (userData)
            await refreshUserData();
        updateLimitInfo();
        populateCuisines();
    }
    if (pageId === 'page-subscribe')
        renderPayPal();
    if (pageId === 'page-profile') {
        renderProfile();
        renderLanguage();
    }
    if (pageId === 'page-home')
        renderLanguage();
    renderLanguage();
}

function switchLang(lang) {
    currentLang = lang;
    localStorage.setItem('aiChefLang', lang);
    document.getElementById('currentLang').innerText = getLangName(lang) + ' ▼';
    renderLanguage();        // ← 必须补全这一行，立即刷新界面
    updateLimitInfo();
    if (userData) renderProfile();
    document.getElementById('langDropdown').style.display = 'none';
}
function addToHome() { if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) { alert('在Safari浏览器中，点击底部“分享”按钮，然后选择“添加到主屏幕”。'); } else if (navigator.share) { navigator.share({ title:'AI Chef', text:t('heroSubtitle'), url:window.location.href }).catch(()=>{}); } else { window.dispatchEvent(new Event('beforeinstallprompt')); alert('您可以通过浏览器菜单“添加到主屏幕”安装此应用。'); } }
function showToast(msg) { alert(msg); } // 简化为alert，无successModal
function closeModal(id) { document.getElementById(id).classList.remove('show'); }
function switchLegalTab(tab) { document.getElementById('legal-privacy-content').style.display = tab==='privacy'?'block':'none'; document.getElementById('legal-terms-content').style.display = tab==='terms'?'block':'none'; document.querySelectorAll('.legal-tab').forEach(t => t.classList.remove('active')); document.querySelector(`.legal-tab[data-tab="${tab}"]`).classList.add('active'); }
function handleLoginClick() { if (userData) showPage('page-profile'); else showPage('page-login-register'); }
function showForgotModal() { document.getElementById('forgotModal').classList.add('show'); }
function showNicknameModal() { document.getElementById('newNicknameInput').value = userData?.nickname || ''; document.getElementById('nicknameModal').classList.add('show'); }
function showEmailModal() { document.getElementById('newEmailInput').value = userData?.email || ''; document.getElementById('emailModal').classList.add('show'); }

// ==================== 历史记录 ====================
function addToHistory(recipe) { recipeHistory.push(recipe); if (recipeHistory.length > MAX_HISTORY) recipeHistory.shift(); historyIndex = recipeHistory.length - 1; localStorage.setItem('recipeHistory', JSON.stringify(recipeHistory)); updateHistoryButtons(); }
function loadHistoryFromCache() { const cached = localStorage.getItem('recipeHistory'); if (cached) { recipeHistory = JSON.parse(cached); historyIndex = recipeHistory.length - 1; updateHistoryButtons(); } }
function restoreRecentRecipes() {
    if (!userData) { alert(t('pleaseLogin')); return; }  // 新增的登录校验

    const cached = localStorage.getItem('recipeHistory');
    if (!cached || JSON.parse(cached).length === 0) {
        showToast('No cached recipes found.');
        return;
    }
    // 补全后续逻辑，将游离的代码纳入函数内
    const recent = JSON.parse(cached).slice(-3); 
    if (recent.length) renderRecipeContent(recent[recent.length - 1]);
} // 仅保留这一个函数闭合括号
function showPrevRecipe() { if (historyIndex > 0) { historyIndex--; renderRecipeContent(recipeHistory[historyIndex]); } updateHistoryButtons(); }
function showNextRecipe() { if (historyIndex < recipeHistory.length - 1) { historyIndex++; renderRecipeContent(recipeHistory[historyIndex]); } updateHistoryButtons(); }
function updateHistoryButtons() { document.getElementById('prevRecipeBtn').disabled = historyIndex <= 0; document.getElementById('nextRecipeBtn').disabled = historyIndex >= recipeHistory.length - 1; }

// ==================== URL 参数处理 ====================
function handleUrlParams() { const urlParams = new URLSearchParams(window.location.search); const action = urlParams.get('action'), email = urlParams.get('email'); if (action && email) { if (action === 'register') { showPage('page-login-register'); switchAuthTab('register'); document.getElementById('registerEmail').value = decodeURIComponent(email); document.getElementById('registerPassword').focus(); } else if (action === 'reset') { showPage('page-login-register'); switchAuthTab('login'); document.getElementById('loginEmail').value = decodeURIComponent(email); showForgotModal(); document.getElementById('forgotEmail').value = decodeURIComponent(email); } window.history.replaceState({}, document.title, window.location.pathname); } }
function addRestoreLink() { const generatorCard = document.querySelector('#page-generator .card-generator'); if (generatorCard && !document.getElementById('restoreRecentLink')) { const link = document.createElement('div'); link.id = 'restoreRecentLink'; link.style.cssText = 'text-align:right;margin-top:8px;font-size:12px;color:#64788b;'; link.innerHTML = '<span style="cursor:pointer;" onclick="restoreRecentRecipes()">↻ 恢复最近3条</span>'; generatorCard.appendChild(link); } }

// ==================== 头像裁剪 ====================
(function initAvatarCrop() {
  const avatarInput = document.getElementById('avatarInput'), cropModal = document.getElementById('cropModal'), cropImg = document.getElementById('cropImg'), cropWrap = document.getElementById('cropWrap'), cropCancel = document.getElementById('cropCancel'), cropConfirm = document.getElementById('cropConfirm');
  if (!avatarInput) return;
  let scale = 1, x = 0, y = 0, startX, startY, dragging = false, tempSrc = '';
  avatarInput.addEventListener('change', (e) => { const file = e.target.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = (ev) => { tempSrc = ev.target.result; cropImg.src = tempSrc; cropModal.classList.add('show'); cropImg.onload = () => { const size = 240; scale = cropImg.naturalWidth > cropImg.naturalHeight ? size / cropImg.naturalHeight : size / cropImg.naturalWidth; x = (size - cropImg.naturalWidth * scale) / 2; y = (size - cropImg.naturalHeight * scale) / 2; updateCrop(); }; }; reader.readAsDataURL(file); });
  function updateCrop() { cropImg.style.transform = `translate(${x}px, ${y}px) scale(${scale})`; }
  cropWrap.addEventListener('mousedown', (e) => { e.preventDefault(); dragging = true; startX = e.clientX - x; startY = e.clientY - y; });
  cropWrap.addEventListener('touchstart', (e) => { e.preventDefault(); dragging = true; const t = e.touches[0]; startX = t.clientX - x; startY = t.clientY - y; });
  window.addEventListener('mousemove', (e) => { if(!dragging) return; x = e.clientX - startX; y = e.clientY - startY; updateCrop(); });
  window.addEventListener('touchmove', (e) => { if(!dragging) return; e.preventDefault(); const t = e.touches[0]; x = t.clientX - startX; y = t.clientY - startY; updateCrop(); });
  window.addEventListener('mouseup', () => dragging = false); window.addEventListener('touchend', () => dragging = false);
  cropWrap.addEventListener('wheel', (e) => { e.preventDefault(); scale = Math.max(0.8, Math.min(3, scale + (e.deltaY>0?-0.1:0.1))); updateCrop(); });
  cropCancel.addEventListener('click', () => { cropModal.classList.remove('show'); avatarInput.value = ''; });
  cropConfirm.addEventListener('click', () => { const size = 240; const canvas = document.createElement('canvas'); canvas.width = size; canvas.height = size; const ctx = canvas.getContext('2d'); const img = new Image(); img.src = tempSrc; img.onload = () => { ctx.beginPath(); ctx.arc(size/2, size/2, size/2, 0, Math.PI*2); ctx.clip(); ctx.drawImage(img, x, y, img.width*scale, img.height*scale); const base64 = canvas.toDataURL('image/jpeg', 0.9); document.getElementById('profileAvatarImg').src = base64; const navAvatar = document.getElementById('navAvatar'); if (navAvatar) navAvatar.src = base64; if (userData && userData.email) { localStorage.setItem(`avatar_${userData.email}`, base64); } cropModal.classList.remove('show'); avatarInput.value = ''; }; });
  window.addEventListener('click', (e) => { if (e.target === cropModal) cropModal.classList.remove('show'); });
})();

// ==================== Service Worker ====================
if ('serviceWorker' in navigator) { window.addEventListener('load', () => { navigator.serviceWorker.register('/service-worker.js').catch(err=>console.log('SW failed:', err)); }); }

// ==================== 初始化 ====================
(async function init() {
  await initDeviceId(); userData = await loadUserData(); updateNavButton(); loadHistoryFromCache();
  document.querySelector('.lang-btn').addEventListener('click', (e) => { e.stopPropagation(); const dd = document.getElementById('langDropdown'); dd.style.display = dd.style.display === 'block' ? 'none' : 'block'; });
  document.addEventListener('click', () => document.getElementById('langDropdown').style.display = 'none');
  document.getElementById('langDropdown').addEventListener('click', (e) => { const target = e.target.closest('.lang-option'); if (target) switchLang(target.dataset.lang); });
  populateCuisines(); renderLanguage(); initSocialLogin(); checkOAuthCallback();
  document.getElementById('sendCodeBtn').addEventListener('click', sendVerificationCode); document.getElementById('sendResetCodeBtn').addEventListener('click', sendResetCode); document.getElementById('sendEmailChangeCodeBtn').addEventListener('click', sendEmailChangeCode);
  addRestoreLink(); handleUrlParams(); if (userData?.email) updateLimitInfo();

  const videoBtn = document.getElementById('openVideoBtn');
if (videoBtn) videoBtn.onclick = showVideo;
  initVideoPlayerControls();
  document.getElementById('howToUseBtn').addEventListener('click', openHowToModal);
  document.querySelector('#howToModal .close-btn').addEventListener('click', closeHowToModal);
  document.getElementById('howToModal').addEventListener('click', (e) => { if (e.target === document.getElementById('howToModal')) closeHowToModal(); });
  document.getElementById('restoreRecentLink').addEventListener('click', restoreRecentRecipes);
  document.getElementById('editNicknameBtn').onclick = showNicknameModal;
  document.getElementById('editEmailBtn').onclick = showEmailModal;
})();
// ==================== 语音识别模块（绝对隔离版） ====================
(function initVoiceInput() {
    // 将所有逻辑完全隔离，任何错误都不会影响主程序
    try {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        // 不支持语音，直接结束，不报错
        if (!SpeechRecognition) {
            document.addEventListener('DOMContentLoaded', () => {
                document.querySelectorAll('.mic-btn').forEach(btn => btn.classList.add('unsupported'));
            });
            return;
        }

        const langMap = {
            'en': 'en-US', 'es': 'es-ES', 'fr': 'fr-FR', 'de': 'de-DE',
            'it': 'it-IT', 'pt': 'pt-PT', 'zh': 'zh-CN', 'zh-CN': 'zh-CN'
        };

        let recognition = null;
        let activeInput = null;
        let activeBtn = null;

        function getCurrentLangSafely() {
            const htmlLang = document.documentElement.lang || 'en';
            const key = htmlLang.slice(0, 2).toLowerCase();
            return langMap[key] ? key : 'en';
        }

        function startRecognition(inputEl, btnEl) {
            try {
                if (recognition) recognition.abort();
                recognition = new SpeechRecognition();
                recognition.lang = langMap[getCurrentLangSafely()] || 'en-US';
                recognition.interimResults = true;
                recognition.continuous = true;
                recognition.maxAlternatives = 1;

                recognition.onresult = (event) => {
                    let transcript = '';
                    for (let i = event.resultIndex; i < event.results.length; i++) {
                        transcript += event.results[i][0].transcript;
                    }
                    inputEl.value = transcript;
                    inputEl.focus();
                };

                recognition.onerror = (event) => {
                    if (event.error === 'not-allowed') {
                        alert('麦克风权限被拒绝，请在浏览器设置中允许麦克风访问。');
                    }
                    stopRecognition();
                };

                recognition.onend = () => { stopRecognition(); };
                recognition.start();
                activeInput = inputEl;
                activeBtn = btnEl;
                btnEl.classList.add('recording');
            } catch (e) {
                console.warn('语音启动失败', e);
                stopRecognition();
            }
        }

        function stopRecognition() {
            if (recognition) {
                try { recognition.abort(); } catch (e) {}
                recognition = null;
            }
            if (activeBtn) {
                activeBtn.classList.remove('recording');
                activeBtn = null;
            }
            activeInput = null;
        }

        // 所有绑定操作延迟到 DOM 完全就绪后
        function bindAllEvents() {
            try {
                // 生成器麦克风
                const dishMicBtn = document.getElementById('dishMicBtn');
                const dishInput = document.getElementById('dishName');
                if (dishMicBtn && dishInput) {
                    dishMicBtn.addEventListener('click', () => {
                        if (activeInput === dishInput) stopRecognition();
                        else startRecognition(dishInput, dishMicBtn);
                    });
                }

                // AI 助手麦克风
                const qaMicBtn = document.getElementById('qaMicBtn');
                const qaInput = document.getElementById('qaInput');
                if (qaMicBtn && qaInput) {
                    qaMicBtn.addEventListener('click', () => {
                        if (activeInput === qaInput) stopRecognition();
                        else startRecognition(qaInput, qaMicBtn);
                    });
                }

                // 发送箭头
                const qaSendBtn = document.getElementById('qaSendBtn');
                if (qaSendBtn && typeof askQuestion === 'function') {
                    qaSendBtn.addEventListener('click', () => {
                        if (qaInput && qaInput.value.trim()) askQuestion();
                    });
                }

                // 回车发送
                if (qaInput && typeof askQuestion === 'function') {
                    qaInput.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter' && qaInput.value.trim()) {
                            e.preventDefault();
                            askQuestion();
                        }
                    });
                }

                // 安全重写 switchLang
                if (typeof window.switchLang === 'function') {
                    const originalSwitchLang = window.switchLang;
                    window.switchLang = function(lang) {
                        try { originalSwitchLang(lang); } catch (e) {}
                        if (recognition) recognition.lang = langMap[lang] || 'en-US';
                    };
                }
            } catch (e) {
                console.warn('语音事件绑定失败', e);
            }
        }

        // 延迟到 DOM 加载完成后执行
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', bindAllEvents);
        } else {
            bindAllEvents();
        }
    } catch (globalError) {
        // 最外层兜底：绝对不允许任何错误泄漏
        console.warn('语音模块初始化失败，已自动禁用', globalError);
    }
})();

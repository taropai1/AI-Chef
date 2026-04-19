// ==================== 全局配置 ====================
const DEEPSEEK_API = "https://api.taropai.com/v1/chat/completions";
const BACKEND_URL = "https://auth.taropai.com";
const LANGS = ['en', 'es', 'fr', 'de', 'it', 'pt', 'zh-CN'];
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

// ==================== 套餐规则（已更新） ====================
const PLANS = {
  free: { dailyLimit: 3, qPerRecipe: 0 },
  starter: { dailyLimit: 10, qPerRecipe: 5 },
  pro: { dailyLimit: 30, qPerRecipe: 5 },
  premium: { dailyLimit: 80, qPerRecipe: 5 },
  business: { dailyLimit: 300, qPerRecipe: 5 }
};

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

// ==================== 多语言翻译 ====================
const translations = {
  en: {
    heroSubtitle: 'Global Cuisines · Smart Pairing',
    sectionFeatures: 'Features',
    feat1: '18 Cuisines',
    feat1Sub: 'Global flavors',
    feat2: 'AI Assistant',
    feat2Sub: 'Interactive Q&A',
    feat3: 'Nutrition',
    feat3Sub: 'Healthy Weight',
    feat4: 'Baby Safe',
    feat4Sub: 'No salt/sugar',
    feat5: 'Pregnancy',
    feat5Sub: 'Mom friendly',
    feat6: 'Video Guides',
    feat6Sub: 'Step-by-step',
    sectionSubscribe: 'Subscription Plans',
    subText: 'Subscribe',
    subSub: 'Unlock full access',
    familyText: 'Family Share',
    familySub: 'Multi-User Plan',
    legalLink: 'Privacy/Terms',
    genTitle: 'AI Recipe Generator',
    genMealType: 'Category',
    genCuisine: 'Cuisine',
    genDishName: 'What to eat?',
    optStandard: 'Standard',
    optBaby: 'Baby',
    optPregnancy: 'Pregnancy',
    generate: 'Generate Recipe',
    generating: 'Generating...',
    aiAssistTitle: 'AI Assistant',
    enterQuestion: 'Ask about this recipe...',
    ask: 'Ask',
    dishNameHint: 'You can enter one or more ingredients.',
    watchVideo: 'Watch Video Guides',
    addToHome: 'Add',
    freeLimitInfo: 'Free trial: {{used}}/3',
    starterInfo: 'Starter: {{used}}/10 | Q left: {{qLeft}}',
    proInfo: 'Pro: {{used}}/30 | Q left: {{qLeft}}',
    premiumInfo: 'Premium Family: {{used}}/80 | Q left: {{qLeft}}',
    businessInfo: 'Business: {{used}}/300 | Q left: {{qLeft}}',
    alertNoPermission: 'Your free trial has expired. Subscribe to continue.',
    alertDailyLimit: 'Daily limit reached. Please upgrade or try tomorrow.',
    alertNoPoints: 'Insufficient quota.',
    alertCooldown: 'Too fast, please wait.',
    alertMonthlyCost: 'Monthly limit reached.',
    alertNoRecipe: 'Generate a recipe first.',
    alertQTooLong: 'Question too long.',
    alertInvalidFood: 'Please enter a valid food name.',
    paymentSuccess: 'Subscription activated!',
    q: 'Q',
    a: 'A',
    qLimitReached: 'You\'ve reached the 5-question limit for this recipe.',
    starterName: 'Starter',
    proName: 'Pro',
    premiumName: 'Premium Family',
    businessName: 'Business Kitchen',
    starterDesc: '10 recipes/day · 5 AI questions',
    proDesc: '30 recipes/day · 5 AI questions',
    premiumDesc: '80 recipes/day shared · 5 AI questions · Family share',
    businessDesc: '300 recipes/day · 5 AI questions · Commercial use',
    finePrint: 'By subscribing you agree to our ',
    loginTitle: 'Login',
    registerTitle: 'Sign Up',
    email: 'Email',
    password: 'Password',
    confirmPwd: 'Confirm Password',
    forgot: 'Forgot password?',
    noAccount: 'New?',
    signUp: 'Sign Up',
    signIn: 'Login',
    haveAccount: 'Have account?',
    forgotTitle: 'Reset Password',
    cancel: 'Cancel',
    reset: 'Reset',
    profileNickname: 'Nickname',
    profileEmail: 'Email',
    profilePlan: 'Plan',
    profileJoined: 'Joined',
    logout: 'Sign Out',
    profileSub: 'My Subscription',
    subStatus: 'Status',
    subExpiry: 'Expires',
    inviteCodeTitle: 'Invite Code',
    joinFamily: 'Join',
    nicknameTitle: 'Change Nickname',
    emailTitle: 'Change Email',
    legalPrivacyTitle: 'Privacy Policy',
    legalEffDate: 'Effective date: 2025-01-01',
    legalPrivacyCollect: '1. Information We Collect',
    legalPrivacy1: 'AI Chef is a client-side application. We do not collect, store, or transmit any personal information.',
    legalPrivacyUse: '2. Information Use',
    legalPrivacy2: 'All recipe generation runs locally on your device.',
    legalPrivacySecurity: '3. Data Security',
    legalPrivacy3: 'No data collected = no risk of breach.',
    legalPrivacyChanges: '4. Policy Changes',
    legalPrivacy4: 'We may update this policy. Changes will be posted here.',
    legalPrivacyContact: '5. Contact Us',
    legalPrivacy5: 'Contact us at go@tarop.top if you have questions.',
    legalTermsTitle: 'Terms of Service',
    legalTermEffDate: 'Effective Date: 2025-01-01',
    legalTermsLicense: '1. License',
    legalTerms1: 'For personal, non-commercial use only. Business Kitchen subscribers are permitted to use the service for commercial purposes.',
    legalTermsDisclaimer: '2. Disclaimer',
    legalTerms2: 'Recipes are AI-generated and for reference only.',
    legalTermsLimitations: '3. Limitation of Liability',
    legalTerms3: 'We are not liable for any damages.',
    legalTermsModifications: '4. Modifications',
    legalTerms4: 'We may modify these terms at any time.',
    legalTermsLaw: '5. Governing Law',
    legalTerms5: 'Governing law: your jurisdiction.',
    legalTermsSubRules: '6. Subscription Rules',
    legalTermsSub1: '6.1 Subscribers have access upon login.',
    legalTermsSub2: '6.2 Four subscription types: Starter, Pro, Premium Family, Business.',
    legalTermsSub3: '6.3 Orders must be activated within 24 hours by logging in.',
    legalTermsSub4: '6.4 Each recipe generation grants 5 AI questions for that session.',
    legalTermsSub5: '6.5 Family share is available only for Premium Family (up to 3 people).',
    legalTermsSub6: '6.6 Auto-renewal is enabled by default; manage via PayPal.',
    legalTermsSub7: '6.7 No refunds after payment.',
    legalTermsSub8: '6.8 Use a valid email; we are not responsible for account loss due to fake emails.',
    legalTermsSub9: '6.9 Recipes and answers are AI-generated by DeepSeek and for reference only.',
    legalTermsSub10: '6.10 We reserve the right of final interpretation.',
    success: 'Success',
    ok: 'OK',
    personalizedGreeting: 'Dear {{name}}, your delicious recipe is ready. Enjoy your meal! 🌹',
    save: 'Save',
    edit: 'Edit',
    change: 'Change',
    pleaseLogin: 'Please login first',
    sendCode: 'Send code',
    sending: 'Sending...',
    codeSent: 'Verification code sent!',
    codeSendFailed: 'Failed to send code. Please try again.',
    registerSuccess: 'Registration successful!',
    loginFailed: 'Login failed. Please check your credentials.',

    // 订阅页新增
    pricingSubtitle: 'Choose Your Plan',
    pricingTitle: 'Subscription Plans',
    planStarterName: 'Starter',
    planStarterDesc: 'Your personal cooking assistant',
    planStarterPeriod: '/ month',
    planProName: 'Pro',
    planProDesc: 'Most popular among food lovers',
    planProPeriod: '/ month',
    planPremiumName: 'Premium',
    planPremiumDesc: 'Suitable for multi-user sharing',
    planPremiumPeriod: '/ month',
    planBusinessName: 'Business',
    planBusinessDesc: 'For commercial kitchens & catering',
    planBusinessPeriod: '/ month',
    subscribeBtn: 'Subscribe Now',
    planNotice: 'Secured by PayPal · Auto-renewal',
    featureStarter1: '10 recipes daily',
    featureStarter2: '5 AI queries per recipe',
    featureStarter3: 'For personal use only',
    featureStarter4: 'Generate recipes from any ingredients',
    featurePro1: '30 recipes daily',
    featurePro2: '5 AI queries per recipe',
    featurePro3: 'All features unlocked',
    featurePro4: 'Advanced recipe customization',
    featurePremium1: '80 recipes daily',
    featurePremium2: '5 AI queries per recipe',
    featurePremium3: 'Up to 3 users sharing',
    featurePremium4: 'Shared usage pool',
    featurePremium5: 'Health & nutrition analysis',
    featureBusiness1: '300 daily generations',
    featureBusiness2: '5 AI queries per recipe',
    featureBusiness3: 'Priority generation queue',
    featureBusiness4: 'Commercial usage rights',
    featureBusiness5: 'Extended recipe permissions',
    freeTierDesc: "You're on the free tier.",
    promoTitle: 'Go Premium',
    promoSub: 'Unlock everything for your cooking',
    promoFeature1: 'Unlimited recipes',
    promoFeature2: 'Family sharing',
    promoFeature3: 'Nutrition insights',
    promoFeature4: 'Ad-free experience'
  },

  'zh-CN': {
    heroSubtitle: '全球菜系 · 智能搭配',
    sectionFeatures: '功能特点',
    feat1: '18种菜系',
    feat1Sub: '世界风味',
    feat2: 'AI助手',
    feat2Sub: '对话式解答',
    feat3: '营养分析',
    feat3Sub: '健康参考',
    feat4: '婴儿安全',
    feat4Sub: '无盐无糖',
    feat5: '孕期',
    feat5Sub: '母婴友好',
    feat6: '视频指南',
    feat6Sub: '分步教学',
    sectionSubscribe: '订阅套餐',
    subText: '订阅',
    subSub: '解锁全部功能',
    familyText: '家庭共享',
    familySub: '多账号共享套餐',
    legalLink: '隐私/服务',
    genTitle: 'AI菜谱生成器',
    genMealType: '分类',
    genCuisine: '菜系',
    genDishName: '你想吃什么？',
    optStandard: '日常餐',
    optBaby: '婴儿餐',
    optPregnancy: '孕期餐',
    generate: '生成食谱',
    generating: '生成中...',
    aiAssistTitle: 'AI助手',
    enterQuestion: '针对此食谱提问...',
    ask: '提问',
    dishNameHint: '可输入单一或多个食材',
    watchVideo: '观看视频指南',
    addToHome: '添加',
    freeLimitInfo: '免费试用：{{used}}/3',
    starterInfo: '基础订阅：{{used}}/10 | 剩余提问 {{qLeft}}',
    proInfo: '高级订阅：{{used}}/30 | 剩余提问 {{qLeft}}',
    premiumInfo: '家庭共享：{{used}}/80 | 剩余提问 {{qLeft}}',
    businessInfo: '商业版：{{used}}/300 | 剩余提问 {{qLeft}}',
    alertNoPermission: '免费试用已用完，请订阅后继续。',
    alertDailyLimit: '今日次数已达上限，请升级或明日再试。',
    alertNoPoints: '配额不足。',
    alertCooldown: '操作过快，请稍等。',
    alertMonthlyCost: '月度限额已达。',
    alertNoRecipe: '请先生成食谱。',
    alertQTooLong: '问题过长。',
    alertInvalidFood: '请输入有效食材。',
    paymentSuccess: '订阅成功！',
    q: '问',
    a: '答',
    qLimitReached: '本食谱已达到5次提问上限。',
    starterName: '基础订阅',
    proName: '高级订阅',
    premiumName: '家庭共享版',
    businessName: '商业厨房版',
    starterDesc: '10次/日 · 每食谱5问',
    proDesc: '30次/日 · 每食谱5问',
    premiumDesc: '80次/日家庭共享 · 每食谱5问',
    businessDesc: '300次/日 · 每食谱5问 · 商业用途',
    finePrint: '订阅即表示同意',
    loginTitle: '登录',
    registerTitle: '注册',
    email: '邮箱',
    password: '密码',
    confirmPwd: '确认密码',
    forgot: '忘记密码？',
    noAccount: '新账户？',
    signUp: '注册',
    signIn: '登录',
    haveAccount: '有账户吗？',
    forgotTitle: '重置密码',
    cancel: '取消',
    reset: '重置',
    profileNickname: '昵称',
    profileEmail: '邮箱',
    profilePlan: '套餐',
    profileJoined: '注册时间',
    logout: '退出账号',
    profileSub: '我的订阅',
    subStatus: '状态',
    subExpiry: '到期',
    inviteCodeTitle: '邀请码',
    joinFamily: '加入',
    nicknameTitle: '修改昵称',
    emailTitle: '修改邮箱',
    legalPrivacyTitle: '隐私政策',
    legalEffDate: '生效日期：2025-01-01',
    legalPrivacyCollect: '1. 信息收集',
    legalPrivacy1: 'AI厨师是客户端应用，不收集个人信息。',
    legalPrivacyUse: '2. 信息使用',
    legalPrivacy2: '所有食谱生成在本地进行。',
    legalPrivacySecurity: '3. 数据安全',
    legalPrivacy3: '不收集数据 = 无泄露风险。',
    legalPrivacyChanges: '4. 政策变更',
    legalPrivacy4: '我们可能更新本政策，变更将在此处公告。',
    legalPrivacyContact: '5. 联系我们',
    legalPrivacy5: '如有问题请联系我们：go@tarop.top',
    legalTermsTitle: '服务条款',
    legalTermEffDate: '生效日期：2025-01-01',
    legalTermsLicense: '1. 许可',
    legalTerms1: '仅限个人非商业使用。商业厨房版订阅用户允许用于商业用途。',
    legalTermsDisclaimer: '2. 免责声明',
    legalTerms2: 'AI生成内容仅供参考。',
    legalTermsLimitations: '3. 责任限制',
    legalTerms3: '我们不承担任何损害责任。',
    legalTermsModifications: '4. 修改',
    legalTerms4: '我们可随时修改条款。',
    legalTermsLaw: '5. 适用法律',
    legalTerms5: '适用法律：用户所在司法管辖区。',
    legalTermsSubRules: '6. 订阅规则',
    legalTermsSub1: '6.1 订阅者登录后即享有本工具站权益。',
    legalTermsSub2: '6.2 订阅类型：基础订阅、高级订阅、家庭共享、商业厨房。',
    legalTermsSub3: '6.3 订单激活期限为24小时，登录账号即自动激活权益。',
    legalTermsSub4: '6.4 订阅用户每生成食谱1次赠5次AI助手提问，当次使用不结转。',
    legalTermsSub5: '6.5 家庭共享仅限Premium套餐，最多3人共用。',
    legalTermsSub6: '6.6 订阅自动续费默认开启，用户需通过PayPal管理。',
    legalTermsSub7: '6.7 订单支付后不支持退款。',
    legalTermsSub8: '6.8 请使用真实邮箱，虚假信息导致账号丢失本站不担责。',
    legalTermsSub9: '6.9 菜谱及问答由DeepSeek生成，仅供参考。',
    legalTermsSub10: '6.10 本站拥有最终解释权。',
    success: '成功',
    ok: '确定',
    personalizedGreeting: '亲爱的{{name}}，已为您生成美味菜谱，祝您用餐愉快🌹',
    save: '保存',
    edit: '编辑',
    change: '更改',
    pleaseLogin: '请先登录',
    sendCode: '发送验证码',
    sending: '发送中...',
    codeSent: '验证码已发送！',
    codeSendFailed: '发送失败，请重试。',
    registerSuccess: '注册成功！',
    loginFailed: '登录失败，请检查邮箱和密码。',

    // 订阅页新增
    pricingSubtitle: '选择您的套餐',
    pricingTitle: '订阅方案',
    planStarterName: '基础订阅',
    planStarterDesc: '您的私人烹饪助手',
    planStarterPeriod: '/ 月',
    planProName: '高级订阅',
    planProDesc: '美食爱好者首选',
    planProPeriod: '/ 月',
    planPremiumName: '家庭共享',
    planPremiumDesc: '适合多用户共享',
    planPremiumPeriod: '/ 月',
    planBusinessName: '商业厨房',
    planBusinessDesc: '商业厨房与餐饮专用',
    planBusinessPeriod: '/ 月',
    subscribeBtn: '立即订阅',
    planNotice: 'PayPal 安全支付 · 自动续费',
    featureStarter1: '每日 10 次生成',
    featureStarter2: '每份食谱 5 次 AI 提问',
    featureStarter3: '仅限个人使用',
    featureStarter4: '任意食材生成食谱',
    featurePro1: '每日 30 次生成',
    featurePro2: '每份食谱 5 次 AI 提问',
    featurePro3: '解锁全部功能',
    featurePro4: '高级食谱定制',
    featurePremium1: '每日 80 次生成',
    featurePremium2: '每份食谱 5 次 AI 提问',
    featurePremium3: '最多 3 人共享',
    featurePremium4: '共享用量池',
    featurePremium5: '健康与营养分析',
    featureBusiness1: '每日 300 次生成',
    featureBusiness2: '每份食谱 5 次 AI 提问',
    featureBusiness3: '优先生成队列',
    featureBusiness4: '商业使用授权',
    featureBusiness5: '扩展食谱权限',
    freeTierDesc: '您当前为免费用户。',
    promoTitle: '升级高级版',
    promoSub: '解锁全部烹饪功能',
    promoFeature1: '无限食谱生成',
    promoFeature2: '家庭共享',
    promoFeature3: '营养分析',
    promoFeature4: '无广告体验'
  }
  // 其他语言为节省篇幅略，实际部署需补全 es,fr,de,it,pt
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
  if (stored && stored.length > 10) {
    deviceId = stored;
    return deviceId;
  }
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
    try {
      const err = await res.json();
      errorMsg = err.error || `HTTP ${res.status}`;
    } catch {
      errorMsg = `HTTP ${res.status}`;
    }
    throw new Error(errorMsg);
  }
  return res.json();
}

// ==================== 用户数据加载 ====================
async function loadUserData() {
  const token = localStorage.getItem('authToken');
  if (!token) return null;
  try {
    const user = await apiCall('/api/user/me');
    return user;
  } catch (e) {
    if (e.message.includes('401')) localStorage.removeItem('authToken');
    return null;
  }
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
  if (!userData) {
    alert(t('pleaseLogin'));
    showPage('page-login-register');
    return;
  }
  const plan = userData.plan;
  if (plan === 'free' && userData.freeUsed >= 3) {
    alert(t('alertNoPermission'));
    showPage('page-subscribe');
    return;
  }
  const limit = PLANS[plan]?.dailyLimit || 0;
  if (plan !== 'free' && userData.dailyUsed >= limit) {
    alert(t('alertDailyLimit'));
    showPage('page-subscribe');
    return;
  }

  const dish = document.getElementById('dishName').value.trim();
  if (!dish) { alert(t('alertInvalidFood')); return; }

  const mealType = document.getElementById('mealType').value;
  const cuisine = document.getElementById('cuisine').value;
  const resultEl = document.getElementById('recipeResult');
  const genBtn = document.getElementById('btnGenerate');
  genBtn.disabled = true;
  genBtn.innerText = t('generating');

  const systemPrompt = `你是专业营养厨师，只输出纯净食谱文本，无任何符号、无星号、无加粗、无特殊格式。\n严格按以下结构输出，每个标题之间空一行：\n\n菜名（单独一行）\n\n食材准备:\n- 食材 用量\n\n制作方法 (总时间: X分钟)\n1. 步骤\n2. 步骤\n\n营养参数:\n- 热量: 约X千卡\n- 蛋白质: X克\n- 碳水化合物: X克\n- 脂肪: X克\n- 膳食纤维: X克\n\n风险提示与建议:\n1. 食材安全与搭配风险\n2. 额外营养建议\n\n语言：${currentLang === 'zh-CN' ? '中文' : 'English'}\n人群：${mealType === 'baby' ? '婴幼儿（无盐无糖）' : mealType === 'pregnancy' ? '孕妇' : '普通人群'}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);
    const response = await fetch(DEEPSEEK_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'deepseek-chat',
        temperature: 0.8,
        max_tokens: 1200,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `生成${cuisine} ${dish} 食谱，请提供一种不同的做法。随机种子：${Math.random().toString(36).substring(2,8)}` }
        ]
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    let recipe = data.choices[0].message.content;

    if (plan !== 'free') {
      let displayName = userData.nickname || userData.email.split('@')[0];
      if (displayName.length > 8) displayName = displayName.slice(0, 6) + '…';
      recipe = t('personalizedGreeting', { name: displayName }) + '\n\n' + recipe;
    }
    resultEl.innerText = recipe;
    addToHistory(recipe);
    userData.lastRecipeText = recipe;

    await initDeviceId();
    const res = await apiCall('/api/user/record-generation', {
      method: 'POST',
      body: JSON.stringify({ deviceId })
    });
    if (plan === 'free') {
      userData.freeUsed = res.freeUsed;
    } else {
      userData.dailyUsed = res.dailyUsed;
      userData.qLeft = res.qLeft;
      document.getElementById('qaInput').disabled = false;
      document.getElementById('askBtn').disabled = false;
      document.getElementById('qaHistory').innerText = '';
      document.getElementById('qaLimitNote').innerText = t('q') + ' left: ' + userData.qLeft;
    }
    updateLimitInfo();
  } catch (error) {
    console.error(error);
    if (error.message.includes('Free trial expired') || error.message.includes('limit reached')) {
      alert(t('alertNoPermission'));
      showPage('page-subscribe');
    } else {
      resultEl.innerText = `生成失败：${error.message}`;
    }
  } finally {
    genBtn.disabled = false;
    genBtn.innerText = t('generate');
  }
}

async function askQuestion() {
  if (!userData || !userData.lastRecipeText) { alert(t('alertNoRecipe')); return; }
  if (userData.qLeft <= 0) { alert(t('qLimitReached') + ' ' + t('alertNoPoints')); return; }
  const question = document.getElementById('qaInput').value.trim();
  if (!question) return;

  const askBtn = document.getElementById('askBtn');
  askBtn.disabled = true;
  const historyEl = document.getElementById('qaHistory');
  historyEl.innerText += `${t('q')}: ${question}\n`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);
    const response = await fetch(DEEPSEEK_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'deepseek-chat',
        temperature: 0.3,
        max_tokens: 300,
        messages: [
          { role: 'system', content: `你是一个专业的营养厨师助手，基于以下食谱回答问题。保持简洁、专业，回答不超过5行，不要使用任何*符号。\n食谱：\n${userData.lastRecipeText}` },
          { role: 'user', content: question }
        ]
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    let answer = data.choices[0].message.content.replace(/\*/g, '');
    const lines = answer.split('\n');
    if (lines.length > 5) answer = lines.slice(0,5).join('\n');
    historyEl.innerText += `${t('a')}: ${answer}\n\n`;

    const res = await apiCall('/api/user/record-question', { method: 'POST' });
    userData.qLeft = res.qLeft;
    document.getElementById('qaLimitNote').innerText = t('q') + ' left: ' + userData.qLeft;
  } catch (error) {
    historyEl.innerText += `${t('a')}: Error, please try again.\n\n`;
  } finally {
    askBtn.disabled = false;
    document.getElementById('qaInput').value = '';
  }
}

function updateLimitInfo() {
  const el = document.getElementById('limitInfo');
  if (!el) return;
  if (!userData) {
    el.innerText = t('pleaseLogin');
    return;
  }
  const plan = userData.plan;
  if (plan === 'free') {
    el.innerText = t('freeLimitInfo', { used: userData.freeUsed });
  } else {
    const used = userData.dailyUsed || 0;
    const qLeft = userData.qLeft || 0;
    const infoKey = plan + 'Info';
    el.innerText = t(infoKey, { used, qLeft });
  }
}

// ==================== 登录/注册 ====================
function switchAuthTab(tab) {
  document.getElementById('tabLogin').classList.toggle('active', tab === 'login');
  document.getElementById('tabRegister').classList.toggle('active', tab === 'register');
  document.getElementById('loginForm').style.display = tab === 'login' ? 'block' : 'none';
  document.getElementById('registerForm').style.display = tab === 'register' ? 'block' : 'none';
}

async function register() {
  const email = document.getElementById('registerEmail').value;
  const code = document.getElementById('registerCode').value;
  const pwd = document.getElementById('registerPassword').value;
  const confirm = document.getElementById('registerConfirmPwd').value;
  if (pwd !== confirm) { alert('Passwords do not match'); return; }
  if (!code) { alert('Verification code required'); return; }
  await initDeviceId();
  const bindCode = localStorage.getItem('tempBindCode');
  try {
    const data = await apiCall('/api/user/register', {
      method: 'POST',
      body: JSON.stringify({ email, password: pwd, verificationCode: code, deviceId, bindCode })
    });
    localStorage.setItem('authToken', data.token);
    userData = data.user;
    localStorage.removeItem('tempBindCode');
    alert(t('registerSuccess'));
    showPage('page-generator');
    renderProfile();
    updateLimitInfo();
  } catch (e) {
    alert(e.message);
  }
}

async function login() {
  const email = document.getElementById('loginEmail').value;
  const pwd = document.getElementById('loginPassword').value;
  const bindCode = localStorage.getItem('tempBindCode');
  try {
    await initDeviceId();
    const data = await apiCall('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password: pwd, deviceId, bindCode })
    });
    localStorage.setItem('authToken', data.token);
    userData = data.user;
    localStorage.removeItem('tempBindCode');
    showPage('page-generator');
    renderProfile();
    updateLimitInfo();
  } catch (e) {
    alert(t('loginFailed') + ': ' + e.message);
  }
}

function logout() {
  localStorage.removeItem('authToken');
  userData = null;
  showPage('page-home');
  updateNavButton();
  renderProfile();
  updateLimitInfo();
}

// ==================== 验证码发送 ====================
let countdowns = {};

function startCountdown(btnId, seconds) {
  if (countdowns[btnId]) return;
  let remaining = seconds;
  const btn = document.getElementById(btnId);
  btn.disabled = true;
  const originalText = btn.innerText;
  countdowns[btnId] = setInterval(() => {
    remaining--;
    btn.innerText = `${remaining}s`;
    if (remaining <= 0) {
      clearInterval(countdowns[btnId]);
      delete countdowns[btnId];
      btn.disabled = false;
      btn.innerText = originalText;
    }
  }, 1000);
}

async function sendVerificationCode() {
  const email = document.getElementById('registerEmail').value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) { alert('Invalid email'); return; }
  const btn = document.getElementById('sendCodeBtn');
  const originalText = btn.innerText;
  btn.disabled = true;
  btn.innerText = t('sending');
  try {
    await apiCall('/api/send-verification-code', { method: 'POST', body: JSON.stringify({ email }) });
    alert(t('codeSent'));
    startCountdown('sendCodeBtn', 60);
  } catch (e) {
    if (e.message.includes('already registered')) {
      alert('Email already registered. Please login.');
    } else {
      alert(t('codeSendFailed') + ': ' + e.message);
    }
    btn.disabled = false;
    btn.innerText = originalText;
  }
}

async function sendResetCode() {
  const email = document.getElementById('forgotEmail').value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) { alert('Invalid email'); return; }
  const btn = document.getElementById('sendResetCodeBtn');
  const originalText = btn.innerText;
  btn.disabled = true;
  btn.innerText = t('sending');
  try {
    await apiCall('/api/send-reset-code', { method: 'POST', body: JSON.stringify({ email }) });
    alert(t('codeSent'));
    startCountdown('sendResetCodeBtn', 60);
  } catch (e) {
    if (e.message.includes('not found')) {
      alert('Email not found. Please register first.');
    } else {
      alert(t('codeSendFailed') + ': ' + e.message);
    }
    btn.disabled = false;
    btn.innerText = originalText;
  }
}

async function sendEmailChangeCode() {
  const newEmail = document.getElementById('newEmailInput').value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(newEmail)) { alert('Invalid email'); return; }
  const btn = document.getElementById('sendEmailChangeCodeBtn');
  const originalText = btn.innerText;
  btn.disabled = true;
  btn.innerText = t('sending');
  try {
    await apiCall('/api/send-email-change-code', { method: 'POST', body: JSON.stringify({ newEmail }) });
    alert(t('codeSent'));
    startCountdown('sendEmailChangeCodeBtn', 60);
  } catch (e) {
    if (e.message.includes('already used')) {
      alert('New email already used by another account.');
    } else {
      alert(t('codeSendFailed') + ': ' + e.message);
    }
    btn.disabled = false;
    btn.innerText = originalText;
  }
}

// ==================== 密码小眼睛 ====================
function togglePassword(fieldId) {
  const field = document.getElementById(fieldId);
  field.type = field.type === 'password' ? 'text' : 'password';
}

function togglePasswordWithIcon(fieldId, toggleElement) {
  const field = document.getElementById(fieldId);
  if (!field) return;
  const isPassword = field.type === 'password';
  field.type = isPassword ? 'text' : 'password';
  const icon = toggleElement.querySelector('.pwd-icon');
  if (icon) {
    if (isPassword) {
      icon.classList.remove('pwd-icon-eye-slash');
      icon.classList.add('pwd-icon-eye');
    } else {
      icon.classList.remove('pwd-icon-eye');
      icon.classList.add('pwd-icon-eye-slash');
    }
  }
}

// ==================== 个人信息修改 ====================
async function saveNickname() {
  const newName = document.getElementById('newNicknameInput').value.trim();
  if (!newName || newName.length > 12) { alert('Nickname must be 1-12 characters'); return; }
  await apiCall('/api/user/update', { method: 'PATCH', body: JSON.stringify({ nickname: newName }) });
  userData.nickname = newName;
  document.getElementById('profileNickname').innerText = newName;
  closeModal('nicknameModal');
  updateNavButton();
  showToast('Nickname updated');
}

async function saveEmail() {
  const newEmail = document.getElementById('newEmailInput').value.trim();
  const code = document.getElementById('emailChangeCode').value;
  if (!code) { alert('Verification code required'); return; }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(newEmail)) { alert('Invalid email'); return; }
  try {
    const data = await apiCall('/api/user/change-email', { method: 'POST', body: JSON.stringify({ newEmail, verificationCode: code }) });
    localStorage.setItem('authToken', data.token);
    userData.email = newEmail;
    document.getElementById('profileEmail').innerText = newEmail;
    closeModal('emailModal');
    showToast('Email updated');
  } catch (e) {
    alert(e.message);
  }
}

async function setPassword() {
  const pwd = document.getElementById('newPasswordInput').value;
  const confirm = document.getElementById('confirmPasswordInput').value;
  if (pwd !== confirm) { alert('Passwords do not match'); return; }
  if (pwd.length < 6) { alert('Password must be at least 6 characters'); return; }
  try {
    await apiCall('/api/user/set-password', { method: 'POST', body: JSON.stringify({ newPassword: pwd }) });
    alert('Password set. You can now login with email.');
    document.getElementById('setPasswordArea').style.display = 'none';
  } catch (e) {
    alert(e.message);
  }
}

async function resetPassword() {
  const email = document.getElementById('forgotEmail').value;
  const code = document.getElementById('forgotCode').value;
  const newPwd = document.getElementById('forgotNewPwd').value;
  if (!code) { alert('Verification code required'); return; }
  if (!newPwd || newPwd.length < 6) { alert('Password must be at least 6 characters'); return; }
  try {
    await apiCall('/api/user/reset-password', { method: 'POST', body: JSON.stringify({ email, verificationCode: code, newPassword: newPwd }) });
    alert('Password reset successfully!');
    closeModal('forgotModal');
    document.getElementById('forgotEmail').value = '';
    document.getElementById('forgotCode').value = '';
    document.getElementById('forgotNewPwd').value = '';
  } catch (e) {
    alert(e.message);
  }
}

// ==================== 社交登录 ====================
function initSocialLogin() {}
function checkOAuthCallback() {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const userParam = urlParams.get('user');
  if (token && userParam) {
    localStorage.setItem('authToken', token);
    try {
      const user = JSON.parse(decodeURIComponent(userParam));
      userData = user;
      showToast('Login successful!');
      window.history.replaceState({}, document.title, window.location.pathname);
      showPage('page-generator');
      renderProfile();
      updateLimitInfo();
      updateNavButton();
    } catch (e) {
      console.error(e);
    }
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
    const container = document.getElementById(c.id);
    if (!container) return;
    container.innerHTML = '';
    paypal.Buttons({
      style: {
        shape: 'pill',
        color: c.color,
        layout: 'horizontal',
        label: 'subscribe',
        height: 46,
        tagline: false
      },
      createSubscription: (data, actions) => actions.subscription.create({ plan_id: c.planId }),
      onApprove: async (data, actions) => {
        try {
          await initDeviceId();
          const token = localStorage.getItem('authToken');
          const bindCode = localStorage.getItem('tempBindCode');
          
          if (!token && !bindCode) {
            alert('Please refresh and try again.');
            return;
          }
          
          if (!token) {
            const resp = await fetch(`https://paypal.taropai.com/generate-bind-code?plan=${c.planType}`);
            const data = await resp.json();
            localStorage.setItem('tempBindCode', data.bindCode);
            window.location.href = `https://paypal.taropai.com/?plan=${c.planType}&bindCode=${data.bindCode}`;
            return;
          }
          
          await apiCall('/api/subscription/verify', {
            method: 'POST',
            body: JSON.stringify({
              subscriptionId: data.subscriptionID,
              planType: c.planType,
              deviceId: deviceId
            })
          });
          userData = await loadUserData();
          showToast(t('paymentSuccess'));
          showPage('page-profile');
          renderProfile();
          updateLimitInfo();
          updateNavButton();
        } catch (e) {
          console.error(e);
          alert('Subscription verification failed: ' + e.message);
        }
      },
      onError: (err) => {
        console.error(err);
        alert('Subscription failed. Please try again.');
      }
    }).render(`#${c.id}`);
  });
}

async function bindInvite() {
  if (!userData) { alert('Please login'); showPage('page-login-register'); return; }
  const code = document.getElementById('inviteCodeInput').value.trim().toUpperCase();
  if (!code) return;
  try {
    await apiCall('/api/invite/bind', { method: 'POST', body: JSON.stringify({ inviteCode: code }) });
    userData = await loadUserData();
    showToast('Joined family!');
    renderProfile();
  } catch (e) {
    alert(e.message);
  }
}

// ==================== 页面渲染 ====================
function populateCuisines() {
  const select = document.getElementById('cuisine');
  if (!select) return;
  const map = CUISINE_MAP[currentLang] || CUISINE_MAP['en'] || {};
  select.innerHTML = CUISINES.map(c => `<option value="${c}">${map[c] || c}</option>`).join('');
}

function renderLanguage() {
  document.getElementById('heroSubtitle').innerText = t('heroSubtitle');
  document.getElementById('sectionFeatures').innerText = t('sectionFeatures');
  for (let i=1;i<=6;i++) {
    const el = document.getElementById(`feat${i}`); if(el) el.innerText = t(`feat${i}`);
    const sub = document.getElementById(`feat${i}Sub`); if(sub) sub.innerText = t(`feat${i}Sub`);
  }
  document.getElementById('sectionSubscribe').innerText = t('sectionSubscribe');
  document.getElementById('subText').innerText = t('subText');
  document.getElementById('subSub').innerText = t('subSub');
  document.getElementById('familyText').innerText = t('familyText');
  document.getElementById('familySub').innerText = t('familySub');
  document.getElementById('linkLegal').innerText = t('legalLink');

  document.getElementById('genTitle').innerText = t('genTitle');
  document.getElementById('genMealType').innerText = t('genMealType');
  document.getElementById('genCuisine').innerText = t('genCuisine');
  document.getElementById('genDishName').innerText = t('genDishName');
  document.getElementById('optStandard').innerText = t('optStandard');
  document.getElementById('optBaby').innerText = t('optBaby');
  document.getElementById('optPregnancy').innerText = t('optPregnancy');
  document.getElementById('btnGenerate').innerText = t('generate');
  document.getElementById('aiAssistTitle').innerText = t('aiAssistTitle');
  const qaInput = document.getElementById('qaInput'); if(qaInput) qaInput.placeholder = t('enterQuestion');
  document.getElementById('askBtn').innerText = t('ask');
  document.getElementById('dishNameHint').innerText = t('dishNameHint');
  document.getElementById('openVideoBtn').innerHTML = '🎬 ' + t('watchVideo');
  document.getElementById('addToHomeBtn').innerHTML = '📱 ' + t('addToHome');

  document.getElementById('tabLogin').innerText = t('signIn');
  document.getElementById('tabRegister').innerText = t('signUp');
  document.getElementById('loginEmail').placeholder = t('email');
  document.getElementById('loginPassword').placeholder = t('password');
  document.getElementById('forgotPwdLink').innerText = t('forgot');
  document.getElementById('btnLoginSubmit').innerText = t('signIn');
  document.getElementById('noAccount').innerText = t('noAccount');
  document.getElementById('switchToRegister').innerText = t('signUp');
  document.getElementById('registerEmail').placeholder = t('email');
  document.getElementById('registerPassword').placeholder = t('password');
  document.getElementById('registerConfirmPwd').placeholder = t('confirmPwd');
  document.getElementById('btnRegisterSubmit').innerText = t('signUp');
  document.getElementById('haveAccount').innerText = t('haveAccount');
  document.getElementById('switchToLogin').innerText = t('signIn');

  document.getElementById('profileNicknameLabel').innerText = t('profileNickname');
  document.getElementById('profileEmailLabel').innerText = t('profileEmail');
  document.getElementById('profileJoinedLabel').innerText = t('profileJoined');
  document.getElementById('profileSubTitle').innerText = t('profileSub');
  document.getElementById('logoutBtn').innerText = t('logout');
  document.getElementById('editNicknameBtn').innerText = t('edit');
  document.getElementById('editEmailBtn').innerText = t('edit');
  document.getElementById('promoTitle').innerText = t('promoTitle');
  document.getElementById('promoSub').innerText = t('promoSub');
  document.getElementById('promoFeature1').innerText = t('promoFeature1');
  document.getElementById('promoFeature2').innerText = t('promoFeature2');
  document.getElementById('promoFeature3').innerText = t('promoFeature3');
  document.getElementById('promoFeature4').innerText = t('promoFeature4');
  document.getElementById('goSubscribeBtn').innerText = t('subscribeBtn');
  document.getElementById('inviteCodeTitle').innerText = t('inviteCodeTitle');

  const pricingSub = document.getElementById('pricingSubtitle');
  if (pricingSub) pricingSub.innerText = t('pricingSubtitle');
  const pricingTitle = document.getElementById('pricingTitle');
  if (pricingTitle) pricingTitle.innerText = t('pricingTitle');
  ['Starter','Pro','Premium','Business'].forEach(type => {
    const nameEl = document.getElementById(`plan${type}Name`);
    if (nameEl) nameEl.innerText = t(`plan${type}Name`);
    const descEl = document.getElementById(`plan${type}Desc`);
    if (descEl) descEl.innerText = t(`plan${type}Desc`);
    const periodEl = document.getElementById(`plan${type}Period`);
    if (periodEl) periodEl.innerText = t(`plan${type}Period`);
  });
  ['planNoticeStarter','planNoticePro','planNoticePremium','planNoticeBusiness'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerText = t('planNotice');
  });
  [1,2,3,4].forEach(i => {
    const el = document.getElementById(`featureStarter${i}`); if (el) el.innerText = t(`featureStarter${i}`);
  });
  [1,2,3,4].forEach(i => {
    const el = document.getElementById(`featurePro${i}`); if (el) el.innerText = t(`featurePro${i}`);
  });
  [1,2,3,4,5].forEach(i => {
    const el = document.getElementById(`featurePremium${i}`); if (el) el.innerText = t(`featurePremium${i}`);
  });
  [1,2,3,4,5].forEach(i => {
    const el = document.getElementById(`featureBusiness${i}`); if (el) el.innerText = t(`featureBusiness${i}`);
  });
  const finePrint = document.getElementById('finePrint');
  if (finePrint) finePrint.innerHTML = t('finePrint') + ' <a onclick="showPage(\'page-legal\')">' + t('legalTermsTitle') + '</a>.';

  document.querySelectorAll('.legal-tab')[0].innerText = t('legalPrivacyTitle');
  document.querySelectorAll('.legal-tab')[1].innerText = t('legalTermsTitle');
  document.getElementById('legalPrivacyTitle').innerText = t('legalPrivacyTitle');
  document.getElementById('legalEffDate').innerText = t('legalEffDate');
  document.getElementById('legalPrivacyCollect').innerText = t('legalPrivacyCollect');
  document.getElementById('legalPrivacy1').innerText = t('legalPrivacy1');
  document.getElementById('legalPrivacyUse').innerText = t('legalPrivacyUse');
  document.getElementById('legalPrivacy2').innerText = t('legalPrivacy2');
  document.getElementById('legalPrivacySecurity').innerText = t('legalPrivacySecurity');
  document.getElementById('legalPrivacy3').innerText = t('legalPrivacy3');
  document.getElementById('legalPrivacyChanges').innerText = t('legalPrivacyChanges');
  document.getElementById('legalPrivacy4').innerText = t('legalPrivacy4');
  document.getElementById('legalPrivacyContact').innerText = t('legalPrivacyContact');
  document.getElementById('legalPrivacy5').innerText = t('legalPrivacy5');
  document.getElementById('legalTermsTitle').innerText = t('legalTermsTitle');
  document.getElementById('legalTermEffDate').innerText = t('legalTermEffDate');
  document.getElementById('legalTermsLicense').innerText = t('legalTermsLicense');
  document.getElementById('legalTerms1').innerText = t('legalTerms1');
  document.getElementById('legalTermsDisclaimer').innerText = t('legalTermsDisclaimer');
  document.getElementById('legalTerms2').innerText = t('legalTerms2');
  document.getElementById('legalTermsLimitations').innerText = t('legalTermsLimitations');
  document.getElementById('legalTerms3').innerText = t('legalTerms3');
  document.getElementById('legalTermsModifications').innerText = t('legalTermsModifications');
  document.getElementById('legalTerms4').innerText = t('legalTerms4');
  document.getElementById('legalTermsLaw').innerText = t('legalTermsLaw');
  document.getElementById('legalTerms5').innerText = t('legalTerms5');
  document.getElementById('legalTermsSubRules').innerText = t('legalTermsSubRules');
  for (let i=1;i<=10;i++) {
    const el = document.getElementById(`legalTermsSub${i}`);
    if(el) el.innerText = t(`legalTermsSub${i}`);
  }

  document.getElementById('forgotTitle').innerText = t('forgotTitle');
  document.getElementById('cancelForgot').innerText = t('cancel');
  document.getElementById('resetPwdBtn').innerText = t('reset');
  document.getElementById('nicknameTitle').innerText = t('nicknameTitle');
  document.getElementById('cancelNickname').innerText = t('cancel');
  document.getElementById('saveNicknameBtn').innerText = t('save');
  document.getElementById('emailTitle').innerText = t('emailTitle');
  document.getElementById('cancelEmail').innerText = t('cancel');
  document.getElementById('saveEmailBtn').innerText = t('save');
  document.getElementById('successTitle').innerText = t('success');
  document.getElementById('closeSuccessBtn').innerText = t('ok');

  document.getElementById('sendCodeBtn').innerText = t('sendCode');
  document.getElementById('sendResetCodeBtn').innerText = t('sendCode');
  document.getElementById('sendEmailChangeCodeBtn').innerText = t('sendCode');

  populateCuisines();
}

function renderProfile() {
  if (!userData) {
    document.getElementById('profileNickname').innerText = 'Gourmet';
    document.getElementById('profileEmail').innerText = '';
    document.getElementById('profileJoined').innerText = '';
    document.getElementById('subStatus').innerText = 'Free';
    document.getElementById('subExpiryText').innerText = "You're on the free tier.";
    document.getElementById('familyArea').style.display = 'none';
    document.getElementById('setPasswordArea').style.display = 'none';
    return;
  }

  const savedAvatar = localStorage.getItem(`avatar_${userData.email}`);
  const avatarImg = document.getElementById('profileAvatarImg');
  if (avatarImg) {
    avatarImg.src = savedAvatar || '/images/default-avatar.png';
    const navAvatar = document.getElementById('navAvatar');
    if (navAvatar) navAvatar.src = avatarImg.src;
  }

  document.getElementById('profileNickname').innerText = userData.nickname || 'Gourmet';
  document.getElementById('profileEmail').innerText = userData.email;
  
  const joinedDate = userData.createdAt ? new Date(userData.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'N/A';
  document.getElementById('profileJoined').innerText = joinedDate;

  const plan = userData.plan || 'free';
  const planDisplay = { free:'Free', starter:'Starter', pro:'Pro', premium:'Premium Family', business:'Business' }[plan] || plan;
  document.getElementById('subStatus').innerText = planDisplay;

  const subExpiryEl = document.getElementById('subExpiryText');
  if (plan === 'free') {
    subExpiryEl.innerText = t('freeTierDesc') || "You're on the free tier.";
  } else {
    const expireStr = userData.expireAt ? new Date(userData.expireAt).toLocaleDateString() : '';
    subExpiryEl.innerText = expireStr ? `${planDisplay} · Expires ${expireStr}` : planDisplay;
  }

  const familyArea = document.getElementById('familyArea');
  if (plan === 'premium') {
    familyArea.style.display = 'block';
    document.getElementById('ownerInviteCode').innerText = t('inviteCodeTitle') + ': ' + (userData.inviteCode || '');
  } else {
    familyArea.style.display = 'none';
  }

  document.getElementById('setPasswordArea').style.display = userData.hasPassword ? 'none' : 'block';

  document.getElementById('profileNicknameLabel').innerText = t('profileNickname');
  document.getElementById('profileEmailLabel').innerText = t('profileEmail');
  document.getElementById('profileJoinedLabel').innerText = t('profileJoined');
  document.getElementById('profileSubTitle').innerText = t('profileSub');
  document.getElementById('logoutBtn').innerText = t('logout');
  document.getElementById('editNicknameBtn').innerText = t('edit');
  document.getElementById('editEmailBtn').innerText = t('edit');
  document.getElementById('promoTitle').innerText = t('promoTitle');
  document.getElementById('promoSub').innerText = t('promoSub');
  document.getElementById('promoFeature1').innerText = t('promoFeature1');
  document.getElementById('promoFeature2').innerText = t('promoFeature2');
  document.getElementById('promoFeature3').innerText = t('promoFeature3');
  document.getElementById('promoFeature4').innerText = t('promoFeature4');
  document.getElementById('goSubscribeBtn').innerText = t('subscribeBtn');
}

async function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
  if (pageId === 'page-generator') {
    if (userData) await refreshUserData();
    updateLimitInfo();
    populateCuisines();
  }
  if (pageId === 'page-subscribe') renderPayPal();
  if (pageId === 'page-profile') {
    renderProfile();
    renderLanguage();
  }
  renderLanguage();
}

function switchLang(lang) {
  currentLang = lang;
  localStorage.setItem('aiChefLang', lang);
  document.getElementById('currentLang').innerText = getLangName(lang) + ' ▼';
  renderLanguage();
  updateLimitInfo();
  if (userData) renderProfile();
  document.getElementById('langDropdown').style.display = 'none';
}

function addToHome() {
  if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
    alert('在Safari浏览器中，点击底部“分享”按钮，然后选择“添加到主屏幕”。');
  } else if (navigator.share) {
    navigator.share({ title:'AI Chef', text:t('heroSubtitle'), url:window.location.href }).catch(()=>{});
  } else {
    window.dispatchEvent(new Event('beforeinstallprompt'));
    alert('您可以通过浏览器菜单“添加到主屏幕”安装此应用。');
  }
}

function showToast(msg) {
  document.getElementById('successMsg').innerText = msg;
  document.getElementById('successModal').classList.add('show');
  setTimeout(() => closeModal('successModal'), 2000);
}

function closeModal(id) { document.getElementById(id).classList.remove('show'); }

function switchLegalTab(tab) {
  document.getElementById('legal-privacy-content').style.display = tab==='privacy'?'block':'none';
  document.getElementById('legal-terms-content').style.display = tab==='terms'?'block':'none';
  document.querySelectorAll('.legal-tab').forEach(t => t.classList.remove('active'));
  document.querySelector(`.legal-tab[data-tab="${tab}"]`).classList.add('active');
}

function handleLoginClick() {
  if (userData) showPage('page-profile');
  else showPage('page-login-register');
}

function showForgotModal() { document.getElementById('forgotModal').classList.add('show'); }
function showNicknameModal() { document.getElementById('newNicknameInput').value = userData?.nickname || ''; document.getElementById('nicknameModal').classList.add('show'); }
function showEmailModal() { document.getElementById('newEmailInput').value = userData?.email || ''; document.getElementById('emailModal').classList.add('show'); }

// ==================== 历史记录 ====================
function addToHistory(recipe) {
  recipeHistory.push(recipe);
  if (recipeHistory.length > MAX_HISTORY) recipeHistory.shift();
  historyIndex = recipeHistory.length - 1;
  localStorage.setItem('recipeHistory', JSON.stringify(recipeHistory));
  updateHistoryButtons();
}
function loadHistoryFromCache() {
  const cached = localStorage.getItem('recipeHistory');
  if (cached) { recipeHistory = JSON.parse(cached); historyIndex = recipeHistory.length - 1; updateHistoryButtons(); }
}
function restoreRecentRecipes() {
  const cached = localStorage.getItem('recipeHistory');
  if (!cached || JSON.parse(cached).length===0) { showToast('No cached recipes found.'); return; }
  const recent = JSON.parse(cached).slice(-3);
  const resultEl = document.getElementById('recipeResult');
  resultEl.innerHTML = '<div style="font-size:14px;color:#64788b;margin-bottom:8px;">📜 最近3条记录：</div>' + recent.map((r,i)=>`<div style="margin-bottom:6px;">${i+1}. ${r.substring(0,100)}${r.length>100?'…':''}</div>`).join('');
}
function showPrevRecipe() {
  if (historyIndex > 0) {
    historyIndex--;
    const recipe = recipeHistory[historyIndex];
    document.getElementById('recipeResult').innerText = recipe;
    userData.lastRecipeText = recipe;
    document.getElementById('qaHistory').innerText = '';
  }
  updateHistoryButtons();
}
function showNextRecipe() {
  if (historyIndex < recipeHistory.length - 1) {
    historyIndex++;
    const recipe = recipeHistory[historyIndex];
    document.getElementById('recipeResult').innerText = recipe;
    userData.lastRecipeText = recipe;
    document.getElementById('qaHistory').innerText = '';
  }
  updateHistoryButtons();
}
function updateHistoryButtons() {
  document.getElementById('prevRecipeBtn').disabled = historyIndex <= 0;
  document.getElementById('nextRecipeBtn').disabled = historyIndex >= recipeHistory.length - 1;
}

// ==================== 视频 ====================
function showVideo() {
  const dish = document.getElementById('dishName').value.trim() || 'recipe';
  const cuisine = document.getElementById('cuisine').value;
  document.getElementById('videoFrame').src = `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(`${cuisine} ${dish} cooking`)}`;
  document.getElementById('videoContainer').style.display = 'block';
}

// ==================== URL 参数处理 ====================
function handleUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const action = urlParams.get('action');
  const email = urlParams.get('email');
  if (action && email) {
    if (action === 'register') {
      showPage('page-login-register');
      switchAuthTab('register');
      document.getElementById('registerEmail').value = decodeURIComponent(email);
      document.getElementById('registerPassword').focus();
    } else if (action === 'reset') {
      showPage('page-login-register');
      switchAuthTab('login');
      document.getElementById('loginEmail').value = decodeURIComponent(email);
      showForgotModal();
      document.getElementById('forgotEmail').value = decodeURIComponent(email);
    }
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}

function addRestoreLink() {
  const generatorCard = document.querySelector('#page-generator .card:first-of-type');
  if (generatorCard && !document.getElementById('restoreRecentLink')) {
    const link = document.createElement('div');
    link.id = 'restoreRecentLink';
    link.style.cssText = 'text-align:right;margin-top:8px;font-size:12px;color:#64788b;';
    link.innerHTML = '<span style="cursor:pointer;" onclick="restoreRecentRecipes()">↻ 恢复最近3条</span>';
    generatorCard.appendChild(link);
  }
}

// ==================== 头像裁剪功能 ====================
(function initAvatarCrop() {
  const avatarInput = document.getElementById('avatarInput');
  const cropModal = document.getElementById('cropModal');
  const cropImg = document.getElementById('cropImg');
  const cropWrap = document.getElementById('cropWrap');
  const cropCancel = document.getElementById('cropCancel');
  const cropConfirm = document.getElementById('cropConfirm');
  
  if (!avatarInput) return;
  
  let scale = 1, x = 0, y = 0, startX, startY, dragging = false, tempSrc = '';

  avatarInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      tempSrc = ev.target.result;
      cropImg.src = tempSrc;
      cropModal.classList.add('show');
      cropImg.onload = () => {
        const size = 240;
        scale = cropImg.naturalWidth > cropImg.naturalHeight 
          ? size / cropImg.naturalHeight 
          : size / cropImg.naturalWidth;
        x = (size - cropImg.naturalWidth * scale) / 2;
        y = (size - cropImg.naturalHeight * scale) / 2;
        updateCrop();
      };
    };
    reader.readAsDataURL(file);
  });

  function updateCrop() {
    cropImg.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
  }

  cropWrap.addEventListener('mousedown', (e) => { e.preventDefault(); dragging = true; startX = e.clientX - x; startY = e.clientY - y; });
  cropWrap.addEventListener('touchstart', (e) => { e.preventDefault(); dragging = true; const t = e.touches[0]; startX = t.clientX - x; startY = t.clientY - y; });
  window.addEventListener('mousemove', (e) => { if(!dragging) return; x = e.clientX - startX; y = e.clientY - startY; updateCrop(); });
  window.addEventListener('touchmove', (e) => { if(!dragging) return; e.preventDefault(); const t = e.touches[0]; x = t.clientX - startX; y = t.clientY - startY; updateCrop(); });
  window.addEventListener('mouseup', () => dragging = false);
  window.addEventListener('touchend', () => dragging = false);
  cropWrap.addEventListener('wheel', (e) => { e.preventDefault(); scale = Math.max(0.8, Math.min(3, scale + (e.deltaY>0?-0.1:0.1))); updateCrop(); });

  cropCancel.addEventListener('click', () => { cropModal.classList.remove('show'); avatarInput.value = ''; });
  cropConfirm.addEventListener('click', () => {
    const size = 240;
    const canvas = document.createElement('canvas');
    canvas.width = size; canvas.height = size;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = tempSrc;
    img.onload = () => {
      ctx.beginPath(); ctx.arc(size/2, size/2, size/2, 0, Math.PI*2); ctx.clip();
      ctx.drawImage(img, x, y, img.width*scale, img.height*scale);
      const base64 = canvas.toDataURL('image/jpeg', 0.9);
      document.getElementById('profileAvatarImg').src = base64;
      const navAvatar = document.getElementById('navAvatar');
      if (navAvatar) navAvatar.src = base64;
      if (userData && userData.email) {
        localStorage.setItem(`avatar_${userData.email}`, base64);
      }
      cropModal.classList.remove('show');
      avatarInput.value = '';
    };
  });

  window.addEventListener('click', (e) => {
    if (e.target === cropModal) cropModal.classList.remove('show');
  });
})();

// ==================== Service Worker ====================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch(err=>console.log('SW failed:', err));
  });
}

// ==================== 初始化 ====================
(async function init() {
  await initDeviceId();
  userData = await loadUserData();
  updateNavButton();
  loadHistoryFromCache();
  document.querySelector('.lang-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    const dd = document.getElementById('langDropdown');
    dd.style.display = dd.style.display === 'block' ? 'none' : 'block';
  });
  document.addEventListener('click', () => document.getElementById('langDropdown').style.display = 'none');
  document.getElementById('langDropdown').addEventListener('click', (e) => {
    const target = e.target.closest('.lang-option');
    if (target) switchLang(target.dataset.lang);
  });
  populateCuisines();
  renderLanguage();
  initSocialLogin();
  checkOAuthCallback();
  document.getElementById('sendCodeBtn').addEventListener('click', sendVerificationCode);
  document.getElementById('sendResetCodeBtn').addEventListener('click', sendResetCode);
  document.getElementById('sendEmailChangeCodeBtn').addEventListener('click', sendEmailChangeCode);
  addRestoreLink();
  handleUrlParams();
  if (userData?.email) updateLimitInfo();
})();

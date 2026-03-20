// ==================== 全局配置 ====================
const DEEPSEEK_API = "https://api.taropai.com/v1/chat/completions";
const BACKEND_URL = "https://auth.taropai.com";
const LANGS = ['en', 'es', 'fr', 'de', 'it', 'pt', 'zh-CN'];
const CUISINES = ["American","Italian","Mexican","French","Spanish","German","Mediterranean","Middle Eastern","Chinese Home Cooking","Chinese Cantonese Cuisine","Chinese Sichuan Cuisine","Chinese Hunan Cuisine","Chinese Huaiyang Cuisine","Chinese Northern Cuisine","Japanese Cuisine","Thai Cuisine","Korean cuisine","Indian Cuisine"];
const CUISINE_MAP_ZH = {
  "American":"美式西餐","Italian":"意大利餐","Mexican":"墨西哥菜","French":"法国菜","Spanish":"西班牙菜","German":"德式西餐",
  "Mediterranean":"地中海菜","Middle Eastern":"中东菜","Chinese Home Cooking":"中餐家常菜","Chinese Cantonese Cuisine":"中餐粤菜",
  "Chinese Sichuan Cuisine":"中餐川菜","Chinese Hunan Cuisine":"中餐湘菜","Chinese Huaiyang Cuisine":"中餐苏菜/淮扬菜",
  "Chinese Northern Cuisine":"中餐东北菜","Japanese Cuisine":"日本料理","Thai Cuisine":"泰国菜","Korean cuisine":"韩国菜","Indian Cuisine":"印度菜"
};
const PLANS = { free: { dailyLimit: 3, qPerRecipe: 0 }, starter: { dailyLimit: 10, qPerRecipe: 10 }, pro: { dailyLimit: 30, qPerRecipe: 10 }, premium: { dailyLimit: 200, qPerRecipe: 10 } };

// 语言检测：默认英文，除非 localStorage 中有记录或浏览器语言为中文
let currentLang = localStorage.getItem('aiChefLang');
if (!currentLang) {
  const browserLang = navigator.language.split('-')[0];
  currentLang = LANGS.includes(browserLang) ? browserLang : 'en';
  localStorage.setItem('aiChefLang', currentLang);
}
let deviceId = null;
let userData = null;
let recipeHistory = [], historyIndex = -1;

// ==================== 多语言翻译 ====================
const translations = {
  en: { 
    heroSubtitle:'Global Cuisines · Smart Pairing', sectionFeatures:'Features', feat1:'18 Cuisines', feat1Sub:'Global flavors', feat2:'AI Assistant', feat2Sub:'Interactive Q&A', feat3:'Nutrition', feat3Sub:'Healthy Weight', feat4:'Baby Safe', feat4Sub:'No salt/sugar', feat5:'Pregnancy', feat5Sub:'Mom friendly', feat6:'Video Guides', feat6Sub:'Step-by-step', sectionSubscribe:'Subscription Plans', subText:'Subscribe', subSub:'Unlock full access', familyText:'Family Share', familySub:'Multi-User Plan', legalLink:'Privacy/Terms', genTitle:'AI Recipe Generator', genMealType:'Category', genCuisine:'Cuisine', genDishName:'What to eat?', optStandard:'Standard', optBaby:'Baby', optPregnancy:'Pregnancy', generate:'Generate Recipe', generating:'Generating...', aiAssistTitle:'AI Assistant', enterQuestion:'Ask about this recipe...', ask:'Ask', dishNameHint:'You can enter one or more ingredients.', watchVideo:'Watch Video Guides', addToHome:'Add', freeLimitInfo:'Free trial: {{used}}/3 ({{plan}})', starterInfo:'Starter: {{used}}/10 | Q left: {{qLeft}}', proInfo:'Pro: {{used}}/30 | Q left: {{qLeft}}', premiumInfo:'Premium: {{used}}/200 | Q left: {{qLeft}}', alertNoPermission:'Your free trial has expired. Subscribe to continue.', alertDailyLimit:'Daily limit reached. Please upgrade or try tomorrow.', alertNoPoints:'Insufficient quota.', alertCooldown:'Too fast, please wait.', alertMonthlyCost:'Monthly limit reached.', alertNoRecipe:'Generate a recipe first.', alertQTooLong:'Question too long.', alertInvalidFood:'Please enter a valid food name.', paymentSuccess:'Subscription activated!', q:'Q', a:'A', qLimitReached:'You’ve reached the 10-question limit for this recipe.', starterName:'Starter', proName:'Pro', premiumName:'Premium', starterDesc:'• 10 recipes per day • 10 AI questions per recipe • Personal use only', proDesc:'• 30 recipes per day • 10 AI questions per recipe • Full features unlocked', premiumDesc:'• Unlimited recipes • 10 AI questions per recipe • Family share (3 people) • Priority generation', finePrint:'By subscribing you agree to our ', loginTitle:'Login', registerTitle:'Sign Up', email:'Email', password:'Password', confirmPwd:'Confirm Password', forgot:'Forgot password?', noAccount:"Don't have an account?", signUp:'Sign Up', signIn:'Login', haveAccount:'Already have an account?', registerNote:'Please use a valid email to avoid account loss.', forgotTitle:'Reset Password', forgotNote:'Password cannot be recovered if forgotten. Please remember it.', cancel:'Cancel', reset:'Reset', profileNickname:'Nickname', profileEmail:'Email', profilePlan:'Plan', profileJoined:'Joined', logout:'Logout', profileSub:'My Subscription', subStatus:'Status', subExpiry:'Expires', inviteCodeTitle:'Your Invite Code', joinFamily:'Join', nicknameTitle:'Change Nickname', emailTitle:'Change Email', legalPrivacyTitle:'Privacy Policy', legalEffDate:'Effective date: 2025-01-01', legalPrivacyCollect:'1. Information We Collect', legalPrivacy1:'AI Chef is a client-side application. We do not collect, store, or transmit any personal information.', legalPrivacyUse:'2. Information Use', legalPrivacy2:'All recipe generation runs locally on your device.', legalPrivacySecurity:'3. Data Security', legalPrivacy3:'No data collected = no risk of breach.', legalPrivacyChanges:'4. Policy Changes', legalPrivacy4:'We may update this policy. Changes will be posted here.', legalPrivacyContact:'5. Contact Us', legalPrivacy5:'Contact us if you have questions.', legalTermsTitle:'Terms of Service', legalTermEffDate:'Effective Date: 2025-01-01', legalTermsLicense:'1. License', legalTerms1:'For personal, non-commercial use only.', legalTermsDisclaimer:'2. Disclaimer', legalTerms2:'Recipes are AI-generated and for reference only.', legalTermsLimitations:'3. Limitation of Liability', legalTerms3:'We are not liable for any damages.', legalTermsModifications:'4. Modifications', legalTerms4:'We may modify these terms at any time.', legalTermsLaw:'5. Governing Law', legalTerms5:'Governing law: your jurisdiction.', legalTermsSubRules:'6. Subscription Rules', legalTermsSub1:'6.1 Subscribers have access upon login.', legalTermsSub2:'6.2 Three subscription types: Starter, Pro, Premium.', legalTermsSub3:'6.3 Orders must be activated within 24 hours by logging in.', legalTermsSub4:'6.4 Each recipe generation grants 10 AI questions for that session.', legalTermsSub5:'6.5 Family share is available only for Premium (up to 3 people).', legalTermsSub6:'6.6 Auto-renewal is enabled by default; manage via PayPal.', legalTermsSub7:'6.7 No refunds after payment.', legalTermsSub8:'6.8 Use a valid email; we are not responsible for account loss due to fake emails.', legalTermsSub9:'6.9 Recipes and answers are AI-generated by DeepSeek and for reference only.', legalTermsSub10:'6.10 We reserve the right of final interpretation.', success:'Success', ok:'OK', personalizedGreeting:'Dear {{name}}, your delicious recipe is ready. Enjoy your meal! 🌹', save:'Save', edit:'Edit', change:'Change' 
  },
  'zh-CN': { 
    heroSubtitle:'全球菜系 · 智能搭配', sectionFeatures:'功能特点', feat1:'18种菜系', feat1Sub:'世界风味', feat2:'AI助手', feat2Sub:'对话式解答', feat3:'营养分析', feat3Sub:'健康参考', feat4:'婴儿安全', feat4Sub:'无盐无糖', feat5:'孕期', feat5Sub:'母婴友好', feat6:'视频指南', feat6Sub:'分步教学', sectionSubscribe:'订阅套餐', subText:'订阅', subSub:'解锁全部功能', familyText:'家庭共享', familySub:'多账号共享套餐', legalLink:'隐私/服务', genTitle:'AI菜谱生成器', genMealType:'分类', genCuisine:'菜系', genDishName:'你想吃什么？', optStandard:'日常餐', optBaby:'婴儿餐', optPregnancy:'孕期餐', generate:'生成食谱', generating:'生成中...', aiAssistTitle:'AI助手', enterQuestion:'针对此食谱提问...', ask:'提问', dishNameHint:'可输入单一或多个食材', watchVideo:'观看视频指南', addToHome:'添加', freeLimitInfo:'免费试用：{{used}}/3 ({{plan}})', starterInfo:'基础订阅：{{used}}/10 | 剩余提问 {{qLeft}}', proInfo:'高级订阅：{{used}}/30 | 剩余提问 {{qLeft}}', premiumInfo:'家庭订阅：{{used}}/200 | 剩余提问 {{qLeft}}', alertNoPermission:'免费试用已用完，请订阅后继续。', alertDailyLimit:'今日次数已达上限，请升级或明日再试。', alertNoPoints:'配额不足。', alertCooldown:'操作过快，请稍等。', alertMonthlyCost:'月度限额已达。', alertNoRecipe:'请先生成食谱。', alertQTooLong:'问题过长。', alertInvalidFood:'请输入有效食材。', paymentSuccess:'订阅成功！', q:'问', a:'答', qLimitReached:'本食谱已达到10次提问上限。', starterName:'基础订阅', proName:'高级订阅', premiumName:'Premium 共享订阅 （家庭版）', starterDesc:'10次/日 · 每食谱10问', proDesc:'30次/日 · 每食谱10问', premiumDesc:'无限次 · 每食谱10问 · 3人家庭共享 · 优先生成', finePrint:'订阅即表示同意', loginTitle:'登录', registerTitle:'注册', email:'邮箱', password:'密码', confirmPwd:'确认密码', forgot:'忘记密码？', noAccount:'没有账号？', signUp:'注册', signIn:'登录', haveAccount:'已有账号？', registerNote:'请使用有效邮箱避免账号损失。', forgotTitle:'重置密码', forgotNote:'密码无法找回，请牢记。', cancel:'取消', reset:'重置', profileNickname:'昵称', profileEmail:'邮箱', profilePlan:'套餐', profileJoined:'注册时间', logout:'退出登录', profileSub:'我的订阅', subStatus:'状态', subExpiry:'到期', inviteCodeTitle:'邀请码', joinFamily:'加入', nicknameTitle:'修改昵称', emailTitle:'修改邮箱', legalPrivacyTitle:'隐私政策', legalEffDate:'生效日期：2025-01-01', legalPrivacyCollect:'1. 信息收集', legalPrivacy1:'AI厨师是客户端应用，不收集个人信息。', legalPrivacyUse:'2. 信息使用', legalPrivacy2:'所有食谱生成在本地进行。', legalPrivacySecurity:'3. 数据安全', legalPrivacy3:'不收集数据 = 无泄露风险。', legalPrivacyChanges:'4. 政策变更', legalPrivacy4:'我们可能更新本政策，变更将在此处公告。', legalPrivacyContact:'5. 联系我们', legalPrivacy5:'如有问题请联系我们。', legalTermsTitle:'服务条款', legalTermEffDate:'生效日期：2025-01-01', legalTermsLicense:'1. 许可', legalTerms1:'仅限个人非商业使用。', legalTermsDisclaimer:'2. 免责声明', legalTerms2:'AI生成内容仅供参考。', legalTermsLimitations:'3. 责任限制', legalTerms3:'我们不承担任何损害责任。', legalTermsModifications:'4. 修改', legalTerms4:'我们可随时修改条款。', legalTermsLaw:'5. 适用法律', legalTerms5:'适用法律：用户所在司法管辖区。', legalTermsSubRules:'6. 订阅规则', legalTermsSub1:'6.1 订阅者登录后即享有本工具站权益。', legalTermsSub2:'6.2 订阅用户分为基础订阅、高级订阅、家庭订阅。', legalTermsSub3:'6.3 订单激活期限为24小时，登录账号即自动激活权益。', legalTermsSub4:'6.4 订阅用户每生成食谱1次赠10次AI助手提问，当次使用不结转。', legalTermsSub5:'6.5 家庭共享仅限Premium套餐，最多3人共用。', legalTermsSub6:'6.6 订阅自动续费默认开启，用户需通过PayPal管理。', legalTermsSub7:'6.7 订单支付后不支持退款。', legalTermsSub8:'6.8 请使用真实邮箱，虚假信息导致账号丢失本站不担责。', legalTermsSub9:'6.9 菜谱及问答由DeepSeek生成，仅供参考。', legalTermsSub10:'6.10 本站拥有最终解释权。', success:'成功', ok:'确定', personalizedGreeting:'亲爱的{{name}}，已为您生成美味菜谱，祝您用餐愉快🌹', save:'保存', edit:'修改', change:'更改' 
  }
};
['es', 'fr', 'de', 'it', 'pt'].forEach(l => translations[l] = translations.en);

function t(key, params) {
  let text = translations[currentLang]?.[key] || translations.en[key] || key;
  if (params) for (let k in params) text = text.replace(new RegExp(`{{${k}}}`, 'g'), params[k]);
  return text;
}
function getLangName(lang) { const map = { en:'English', es:'Español', fr:'Français', de:'Deutsch', it:'Italiano', pt:'Português', 'zh-CN':'简体中文' }; return map[lang] || 'English'; }

// ==================== 设备指纹与后端交互 ====================
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

async function apiCall(endpoint, options = {}) {
  const token = localStorage.getItem('authToken');
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${BACKEND_URL}${endpoint}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

async function loadUserData() {
  await initDeviceId();
  const token = localStorage.getItem('authToken');
  if (token) {
    try {
      const user = await apiCall('/api/user/me');
      return { ...user, deviceId };
    } catch (e) {
      if (e.message.includes('401')) localStorage.removeItem('authToken');
    }
  }
  // 未登录，获取设备状态
  const device = await apiCall('/api/device/status', {
    method: 'POST',
    body: JSON.stringify({ deviceId })
  });
  return {
    deviceId,
    email: null,
    nickname: 'Foodie123',
    plan: device.plan || 'free',
    freeUsed: device.freeUsed !== undefined ? device.freeUsed : 0,
    dailyUsed: device.dailyUsed || 0,
    lastReset: device.lastReset || Date.now(),
    qLeft: 0,
    familyOwner: null,
    familyMembers: [],
    inviteCode: null,
    expireAt: null,
    lastRecipeText: '',
    createdAt: Date.now()
  };
}

async function refreshUserData() {
  userData = await loadUserData();
  updateLimitInfo();
}

async function recordGeneration(useFree) {
  if (useFree) {
    await apiCall('/api/device/record-generation', {
      method: 'POST',
      body: JSON.stringify({ deviceId })
    });
    userData.freeUsed++;
  } else {
    await apiCall('/api/user/record-generation', { method: 'POST' });
    userData.dailyUsed++;
    userData.qLeft = PLANS[userData.plan].qPerRecipe;
  }
  await refreshUserData();
}

async function recordQuestion() {
  await apiCall('/api/user/record-question', { method: 'POST' });
  userData.qLeft--;
  document.getElementById('qaLimitNote').innerText = t('q') + ' left: ' + userData.qLeft;
}

async function checkGeneratePermission() {
  if (userData.plan === 'free') {
    if (userData.freeUsed >= 3) return { allowed: false, message: t('alertNoPermission'), redirect: true };
    return { allowed: true, useFree: true };
  } else {
    if (userData.dailyUsed >= PLANS[userData.plan].dailyLimit) {
      return { allowed: false, message: t('alertDailyLimit'), redirect: true };
    }
    return { allowed: true, useFree: false };
  }
}

function updateLimitInfo() {
  const el = document.getElementById('limitInfo');
  if (!el) return;
  let planDisplay = '';
  if (!userData.email) planDisplay = 'Not subscribed';
  else if (userData.plan === 'free') planDisplay = 'Free trial';
  else if (userData.plan === 'starter') planDisplay = 'Starter';
  else if (userData.plan === 'pro') planDisplay = 'Pro';
  else if (userData.plan === 'premium') planDisplay = 'Premium';
  if (userData.plan === 'free') {
    el.innerText = t('freeLimitInfo', { used: userData.freeUsed, plan: planDisplay });
  } else {
    const plan = PLANS[userData.plan];
    const qLeft = userData.qLeft !== undefined ? userData.qLeft : plan.qPerRecipe;
    el.innerText = t(userData.plan+'Info', { used: userData.dailyUsed, qLeft }) + ` (${planDisplay})`;
  }
}

// ==================== 生成器 ====================
async function generateRecipe() {
  const dish = document.getElementById('dishName').value.trim();
  if (!dish) { alert(t('alertInvalidFood')); return; }
  const perm = await checkGeneratePermission();
  if (!perm.allowed) { alert(perm.message); if (perm.redirect) showPage('page-subscribe'); return; }

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
          { role: 'user', content: `生成${cuisine} ${dish} 食谱，请提供一种不同的做法，避免与之前完全相同。随机种子：${Math.random().toString(36).substring(2,8)}` }
        ]
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    let recipe = data.choices[0].message.content;

    if (userData.plan !== 'free' && userData.email) {
      recipe = t('personalizedGreeting', { name: userData.nickname || userData.email }) + '\n\n' + recipe;
    }
    resultEl.innerText = recipe;
    addToHistory(recipe);
    userData.lastRecipeText = recipe;

    await recordGeneration(perm.useFree);

    if (userData.plan !== 'free') {
      document.getElementById('qaInput').disabled = false;
      document.getElementById('askBtn').disabled = false;
      document.getElementById('qaHistory').innerText = '';
      document.getElementById('qaLimitNote').innerText = t('q') + ' left: ' + userData.qLeft;
    }
    updateLimitInfo();
  } catch (error) {
    console.error(error);
    resultEl.innerText = `生成失败：${error.message}`;
    // 降级模拟
    let fallback = `Mock ${cuisine} ${dish}\n\nIngredients:\n- 200g main\n- 1 tbsp oil\n\nMethod:\n1. Step one\n2. Step two\n\nNutrition:\n- Calories: 350 kcal`;
    if (userData.plan !== 'free' && userData.email) {
      fallback = t('personalizedGreeting', { name: userData.nickname || userData.email }) + '\n\n' + fallback;
    }
    resultEl.innerText = fallback;
    addToHistory(fallback);
    userData.lastRecipeText = fallback;
    await recordGeneration(perm.useFree);
  } finally {
    genBtn.disabled = false;
    genBtn.innerText = t('generate');
  }
}

async function askQuestion() {
  if (!userData.lastRecipeText) { alert(t('alertNoRecipe')); return; }
  if (userData.qLeft <= 0) { alert(t('qLimitReached')); return; }
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
        max_tokens: 600,
        messages: [
          { role: 'system', content: `你是一个专业的营养厨师助手，基于以下食谱回答问题。保持简洁、专业，每次回答不超过10行，不要使用任何*符号。\n食谱：\n${userData.lastRecipeText}` },
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
    if (lines.length > 10) answer = lines.slice(0,10).join('\n');
    historyEl.innerText += `${t('a')}: ${answer}\n\n`;

    await recordQuestion();
  } catch (error) {
    historyEl.innerText += `${t('a')}: Error, please try again.\n\n`;
  } finally {
    askBtn.disabled = false;
    document.getElementById('qaInput').value = '';
  }
}

function showVideo() {
  const dish = document.getElementById('dishName').value.trim() || 'recipe';
  const cuisine = document.getElementById('cuisine').value;
  const query = encodeURIComponent(`${cuisine} ${dish} cooking`);
  document.getElementById('videoFrame').src = `https://www.youtube.com/embed?listType=search&list=${query}`;
  document.getElementById('videoContainer').style.display = 'block';
}

function addToHistory(recipe) {
  recipeHistory.push(recipe);
  historyIndex = recipeHistory.length - 1;
  updateHistoryButtons();
}

function showPrevRecipe() {
  if (historyIndex > 0) {
    historyIndex--;
    document.getElementById('recipeResult').innerText = recipeHistory[historyIndex];
    userData.lastRecipeText = recipeHistory[historyIndex];
  }
  updateHistoryButtons();
}

function showNextRecipe() {
  if (historyIndex < recipeHistory.length - 1) {
    historyIndex++;
    document.getElementById('recipeResult').innerText = recipeHistory[historyIndex];
    userData.lastRecipeText = recipeHistory[historyIndex];
  }
  updateHistoryButtons();
}

function updateHistoryButtons() {
  document.getElementById('prevRecipeBtn').disabled = historyIndex <= 0;
  document.getElementById('nextRecipeBtn').disabled = historyIndex >= recipeHistory.length - 1;
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
  const pwd = document.getElementById('registerPassword').value;
  const confirm = document.getElementById('registerConfirmPwd').value;
  if (pwd !== confirm) { alert('Passwords do not match'); return; }
  try {
    const data = await apiCall('/api/user/register', {
      method: 'POST',
      body: JSON.stringify({ email, password: pwd, deviceId })
    });
    localStorage.setItem('authToken', data.token);
    userData = await loadUserData();
    showToast('Registration successful!');
    showPage('page-profile');
    renderProfile();
  } catch (e) {
    alert(e.message);
  }
}

async function login() {
  const email = document.getElementById('loginEmail').value;
  const pwd = document.getElementById('loginPassword').value;
  try {
    const data = await apiCall('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password: pwd, deviceId })
    });
    localStorage.setItem('authToken', data.token);
    userData = await loadUserData();
    showPage('page-profile');
    renderProfile();
  } catch (e) {
    alert(e.message);
  }
}

function logout() {
  localStorage.removeItem('authToken');
  loadUserData().then(data => {
    userData = data;
    showPage('page-home');
    renderProfile();
  });
}

function showForgotModal() { document.getElementById('forgotModal').classList.add('show'); }

async function resetPassword() {
  const email = document.getElementById('forgotEmail').value;
  const newPwd = document.getElementById('forgotNewPwd').value;
  try {
    await apiCall('/api/user/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email, newPassword: newPwd })
    });
    alert('Password reset successfully!');
    closeModal('forgotModal');
  } catch (e) {
    alert(e.message);
  }
}

function showNicknameModal() { document.getElementById('newNicknameInput').value = userData.nickname || ''; document.getElementById('nicknameModal').classList.add('show'); }

async function saveNickname() {
  const newName = document.getElementById('newNicknameInput').value.trim();
  if (!newName || newName.length > 10) { alert('Nickname must be 1-10 characters'); return; }
  await apiCall('/api/user/update', {
    method: 'PATCH',
    body: JSON.stringify({ nickname: newName })
  });
  userData.nickname = newName;
  document.getElementById('profileNickname').innerText = newName;
  closeModal('nicknameModal');
  showToast('Nickname updated');
}

function showEmailModal() { document.getElementById('newEmailInput').value = userData.email || ''; document.getElementById('emailModal').classList.add('show'); }

async function saveEmail() {
  const newEmail = document.getElementById('newEmailInput').value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(newEmail)) { alert('Invalid email'); return; }
  if (newEmail === userData.email) { closeModal('emailModal'); return; }
  try {
    const data = await apiCall('/api/user/change-email', {
      method: 'POST',
      body: JSON.stringify({ newEmail })
    });
    localStorage.setItem('authToken', data.token);
    userData.email = newEmail;
    document.getElementById('profileEmail').innerText = newEmail;
    closeModal('emailModal');
    showToast('Email updated');
  } catch (e) {
    alert(e.message);
  }
}

// ==================== 订阅支付 ====================
function renderPayPal() {
  if (!window.paypal) return;
  const plans = [
    { container: 'paypal-starter-container', planId: 'P-1U5765718B789804NNG3MBWQ', planType: 'starter' },
    { container: 'paypal-pro-container', planId: 'P-5P885108R60234815NG3MEPY', planType: 'pro' },
    { container: 'paypal-premium-container', planId: 'P-1880277264176022RNG3MFRA', planType: 'premium' }
  ];
  plans.forEach(p => {
    const container = document.getElementById(p.container);
    if (!container) return;
    container.innerHTML = '';
    paypal.Buttons({
      style: { shape: 'pill', color: 'gold', label: 'subscribe' },
      createSubscription: (data, actions) => actions.subscription.create({ plan_id: p.planId }),
      onApprove: async (data, actions) => {
        if (!userData.email) {
          alert('Please login first');
          showPage('page-login-register');
          return;
        }
        try {
          await apiCall('/api/subscription/verify', {
            method: 'POST',
            body: JSON.stringify({
              subscriptionId: data.subscriptionID,
              planType: p.planType,
              deviceId
            })
          });
          userData = await loadUserData();
          showToast(t('paymentSuccess'));
          showPage('page-profile');
          renderProfile();
        } catch (e) {
          alert('Subscription verification failed: ' + e.message);
        }
      },
      onError: (err) => {
        console.error(err);
        alert('Subscription failed. Please try again.');
      }
    }).render(container);
  });
}

async function bindInvite() {
  if (!userData.email) { alert('Please login'); showPage('page-login-register'); return; }
  const code = document.getElementById('inviteCodeInput').value.trim().toUpperCase();
  if (!code) return;
  try {
    await apiCall('/api/invite/bind', {
      method: 'POST',
      body: JSON.stringify({ inviteCode: code })
    });
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
  select.innerHTML = CUISINES.map(c => `<option value="${c}">${currentLang === 'zh-CN' ? (CUISINE_MAP_ZH[c] || c) : c}</option>`).join('');
}

function renderLanguage() {
  // 更新所有静态文本
  document.getElementById('heroSubtitle').innerText = t('heroSubtitle');
  document.getElementById('sectionFeatures').innerText = t('sectionFeatures');
  for (let i = 1; i <= 6; i++) {
    let el = document.getElementById(`feat${i}`); if (el) el.innerText = t(`feat${i}`);
    let sub = document.getElementById(`feat${i}Sub`); if (sub) sub.innerText = t(`feat${i}Sub`);
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
  document.getElementById('qaInput').placeholder = t('enterQuestion');
  document.getElementById('askBtn').innerText = t('ask');
  document.getElementById('dishNameHint').innerText = t('dishNameHint');
  document.getElementById('openVideoBtn').innerHTML = '🎬 ' + t('watchVideo');
  document.getElementById('addToHomeBtn').innerHTML = '📱 ' + t('addToHome');
  // 登录注册
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
  document.getElementById('registerNote').innerText = t('registerNote');
  // 个人信息
  document.getElementById('profileNicknameLabel').innerText = t('profileNickname');
  document.getElementById('profileEmailLabel').innerText = t('profileEmail');
  document.getElementById('profilePlanLabel').innerText = t('profilePlan');
  document.getElementById('profileJoinedLabel').innerText = t('profileJoined');
  document.getElementById('logoutBtn').innerText = t('logout');
  document.getElementById('profileSubTitle').innerText = t('profileSub');
  document.getElementById('goSubscribeBtn').innerText = t('subText');
  document.getElementById('inviteCodeTitle').innerText = t('inviteCodeTitle');
  document.getElementById('editNicknameBtn').innerText = t('edit');
  document.getElementById('editEmailBtn').innerText = t('change');
  // 订阅页
  document.getElementById('sectionSubTitle').innerText = t('sectionSubscribe');
  document.getElementById('planStarterName').innerText = t('starterName');
  document.getElementById('planProName').innerHTML = t('proName') + ' <span style="background:#ffd966; padding:2px 8px; border-radius:12px; font-size:12px;">Most Popular</span>';
  document.getElementById('planPremiumName').innerHTML = t('premiumName');
  document.getElementById('planStarterDesc').innerHTML = t('starterDesc');
  document.getElementById('planProDesc').innerHTML = t('proDesc');
  document.getElementById('planPremiumDesc').innerHTML = t('premiumDesc');
  document.getElementById('finePrint').innerHTML = t('finePrint') + '<a onclick="showPage(\'page-legal\')">' + t('legalTermsTitle') + '</a>.';
  // 法律
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
  for (let i = 1; i <= 10; i++) { const el = document.getElementById(`legalTermsSub${i}`); if (el) el.innerText = t(`legalTermsSub${i}`); }
  // 弹窗
  document.getElementById('forgotTitle').innerText = t('forgotTitle');
  document.getElementById('forgotNote').innerText = t('forgotNote');
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
  populateCuisines();
}

function renderProfile() {
  document.getElementById('profileNickname').innerText = userData.nickname || 'Foodie123';
  document.getElementById('profileEmail').innerText = userData.email || 'Not logged in';
  document.getElementById('profilePlan').innerText = userData.plan === 'free' ? 'Free' : (userData.plan === 'starter' ? 'Starter' : userData.plan === 'pro' ? 'Pro' : 'Premium');
  const joinedDate = userData.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'N/A';
  document.getElementById('profileJoined').innerText = joinedDate;
  document.getElementById('subStatus').innerText = userData.plan === 'free' ? 'Free' : (userData.plan === 'starter' ? 'Starter' : userData.plan === 'pro' ? 'Pro' : 'Premium');
  document.getElementById('subExpiry').innerText = userData.expireAt ? new Date(userData.expireAt).toLocaleDateString() : '';
  if (userData.plan === 'premium') {
    document.getElementById('familyArea').style.display = 'block';
    document.getElementById('ownerInviteCode').innerText = t('inviteCodeTitle') + ': ' + (userData.inviteCode || '');
  } else {
    document.getElementById('familyArea').style.display = 'none';
  }
}

async function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
  if (pageId === 'page-generator') {
    await refreshUserData();
    updateLimitInfo();
    populateCuisines();
  }
  if (pageId === 'page-subscribe') renderPayPal();
  if (pageId === 'page-profile') renderProfile();
  renderLanguage();
}

function switchLang(lang) {
  currentLang = lang;
  localStorage.setItem('aiChefLang', lang);
  document.getElementById('currentLang').innerText = getLangName(lang) + ' ▼';
  renderLanguage();
  document.getElementById('langDropdown').style.display = 'none';
}

function addToHome() {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (isIOS) {
    alert('在Safari浏览器中，点击底部“分享”按钮，然后选择“添加到主屏幕”。');
  } else if (navigator.share) {
    navigator.share({ title: 'AI Chef', text: t('heroSubtitle'), url: window.location.href }).catch(() => {});
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

function closeModal(id) {
  document.getElementById(id).classList.remove('show');
}

function switchLegalTab(tab) {
  document.getElementById('legal-privacy-content').style.display = tab === 'privacy' ? 'block' : 'none';
  document.getElementById('legal-terms-content').style.display = tab === 'terms' ? 'block' : 'none';
  document.querySelectorAll('.legal-tab').forEach(t => t.classList.remove('active'));
  document.querySelector(`.legal-tab[data-tab="${tab}"]`).classList.add('active');
}

function handleLoginClick() {
  if (userData.email) showPage('page-profile');
  else showPage('page-login-register');
}

// ==================== Service Worker 注册（PWA）====================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Service Worker registered'))
      .catch(err => console.log('Service Worker registration failed:', err));
  });
}

// ==================== 初始化 ====================
(async function init() {
  await initDeviceId();
  userData = await loadUserData();
  document.querySelector('.lang-btn').addEventListener('click', function(e) {
    e.stopPropagation();
    document.getElementById('langDropdown').style.display = document.getElementById('langDropdown').style.display === 'block' ? 'none' : 'block';
  });
  document.addEventListener('click', () => document.getElementById('langDropdown').style.display = 'none');
  document.getElementById('langDropdown').addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('lang-option')) {
      const lang = target.getAttribute('data-lang');
      if (lang) switchLang(lang);
    }
  });
  populateCuisines();
  renderLanguage();
  // 无痕模式检测
  try {
    localStorage.setItem('test', '1');
    localStorage.removeItem('test');
  } catch (e) {
    setTimeout(() => alert('您正在使用隐私/无痕模式。建议改用普通模式以获得最佳体验。'), 1000);
  }
})();
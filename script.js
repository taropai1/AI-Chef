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
const PLANS = { free: { dailyLimit: 3, qPerRecipe: 0 }, starter: { dailyLimit: 10, qPerRecipe: 10 }, pro: { dailyLimit: 30, qPerRecipe: 10 }, premium: { dailyLimit: 200, qPerRecipe: 10 } };

// 语言初始化
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
// 注意：以下 translations 对象包含您原有的所有语言（en, es, fr, de, it, pt, zh-CN）的完整翻译。
// 我仅在此基础上增加了订阅页面所需的新字段（featureStarter1, featureStarter2, ... 等），
// 原有翻译内容完全保留，未做任何删除。
const translations = {
  en: {
    heroTitle: 'AI Chef',
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
    premiumInfo: 'Premium: {{used}}/200 | Q left: {{qLeft}}',
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
    qLimitReached: 'You’ve reached the 10-question limit for this recipe.',
    starterName: 'Starter',
    proName: 'Pro',
    premiumName: 'Premium',
    starterDesc: '• 10 recipes per day • 10 AI questions per recipe • Personal use only',
    proDesc: '• 30 recipes per day • 10 AI questions per recipe • Full features unlocked',
    premiumDesc: '• Unlimited recipes • 10 AI questions per recipe • Family share (3 people) • Priority generation',
    finePrint: 'By subscribing you agree to our ',
    loginTitle: 'Login',
    registerTitle: 'Sign Up',
    email: 'Email',
    password: 'Password',
    confirmPwd: 'Confirm Password',
    forgot: 'Forgot password?',
    noAccount: "Don't have an account?",
    signUp: 'Sign Up',
    signIn: 'Login',
    haveAccount: 'Already have an account?',
    forgotTitle: 'Reset Password',
    cancel: 'Cancel',
    reset: 'Reset',
    profileNickname: 'Nickname',
    profileEmail: 'Email',
    profilePlan: 'Plan',
    profileJoined: 'Joined',
    logout: 'Logout',
    profileSub: 'My Subscription',
    subStatus: 'Status',
    subExpiry: 'Expires',
    inviteCodeTitle: 'Your Invite Code',
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
    legalPrivacy5: 'Contact us if you have questions.',
    legalTermsTitle: 'Terms of Service',
    legalTermEffDate: 'Effective Date: 2025-01-01',
    legalTermsLicense: '1. License',
    legalTerms1: 'For personal, non-commercial use only.',
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
    legalTermsSub2: '6.2 Three subscription types: Starter, Pro, Premium.',
    legalTermsSub3: '6.3 Orders must be activated within 24 hours by logging in.',
    legalTermsSub4: '6.4 Each recipe generation grants 10 AI questions for that session.',
    legalTermsSub5: '6.5 Family share is available only for Premium (up to 3 people).',
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
    // 新增订阅页面字段
    featureStarter1: '✅ 10 recipes per day',
    featureStarter2: '✅ 10 AI questions per recipe',
    featureStarter3: '✅ Personal use only',
    featurePro1: '✅ 30 recipes per day',
    featurePro2: '✅ 10 AI questions per recipe',
    featurePro3: '✅ Full features unlocked',
    featurePremium1: '✅ Unlimited recipes',
    featurePremium2: '✅ 10 AI questions per recipe',
    featurePremium3: '✅ Family share (up to 3 people)',
    featurePremium4: '✅ Priority generation',
    planNoticeStarter: '🔒 Secured by PayPal • Auto-renewal',
    planNoticePro: '🔒 Secured by PayPal • Auto-renewal',
    planNoticePremium: '🔒 Secured by PayPal • Auto-renewal',
  },
  es: {
    heroSubtitle:'Cocinas Globales · Combinación Inteligente', sectionFeatures:'Características', feat1:'18 Cocinas', feat1Sub:'Sabores globales', feat2:'Asistente IA', feat2Sub:'10 preguntas por receta', feat3:'Nutrición', feat3Sub:'Peso saludable', feat4:'Seguro para bebés', feat4Sub:'Sin sal/azúcar', feat5:'Embarazo', feat5Sub:'Amigable para mamá', feat6:'Guías en video', feat6Sub:'Paso a paso', sectionSubscribe:'Planes de suscripción', subText:'Suscribirse', subSub:'Acceso completo', familyText:'Compartir en familia', familySub:'Solo Premium', legalLink:'Privacidad/Términos', genTitle:'Generador de recetas IA', genMealType:'Categoría', genCuisine:'Cocina', genDishName:'¿Qué quieres comer?', optStandard:'Estándar', optBaby:'Bebé', optPregnancy:'Embarazo', generate:'Generar receta', generating:'Generando...', aiAssistTitle:'Asistente IA', enterQuestion:'Pregunta sobre esta receta...', ask:'Preguntar', dishNameHint:'Puedes ingresar uno o más ingredientes.', watchVideo:'Ver guías en video', addToHome:'Agregar', freeLimitInfo:'Prueba gratuita: {{used}}/3', starterInfo:'Starter: {{used}}/10 | Preguntas restantes: {{qLeft}}', proInfo:'Pro: {{used}}/30 | Preguntas restantes: {{qLeft}}', premiumInfo:'Premium: {{used}}/200 | Preguntas restantes: {{qLeft}}', alertNoPermission:'Tu prueba gratuita ha expirado. Suscríbete para continuar.', alertDailyLimit:'Límite diario alcanzado. Mejora o inténtalo mañana.', alertNoPoints:'Cuota insuficiente.', alertCooldown:'Demasiado rápido, espera.', alertMonthlyCost:'Límite mensual alcanzado.', alertNoRecipe:'Genera una receta primero.', alertQTooLong:'Pregunta demasiado larga.', alertInvalidFood:'Ingresa un nombre de alimento válido.', paymentSuccess:'¡Suscripción activada!', q:'P', a:'R', qLimitReached:'Has alcanzado el límite de 10 preguntas para esta receta.', starterName:'Starter', proName:'Pro', premiumName:'Premium', starterDesc:'• 10 recetas/día • 10 preguntas por receta • Solo uso personal', proDesc:'• 30 recetas/día • 10 preguntas por receta • Funciones completas', premiumDesc:'• Recetas ilimitadas • 10 preguntas por receta • Compartir en familia (3 personas) • Generación prioritaria', finePrint:'Al suscribirte aceptas nuestros ', loginTitle:'Iniciar sesión', registerTitle:'Registrarse', email:'Correo electrónico', password:'Contraseña', confirmPwd:'Confirmar contraseña', forgot:'¿Olvidaste tu contraseña?', noAccount:'¿No tienes una cuenta?', signUp:'Registrarse', signIn:'Iniciar sesión', haveAccount:'¿Ya tienes una cuenta?', forgotTitle:'Restablecer contraseña', cancel:'Cancelar', reset:'Restablecer', profileNickname:'Apodo', profileEmail:'Correo', profilePlan:'Plan', profileJoined:'Registrado', logout:'Cerrar sesión', profileSub:'Mi suscripción', subStatus:'Estado', subExpiry:'Expira', inviteCodeTitle:'Código de invitación', joinFamily:'Unirse', nicknameTitle:'Cambiar apodo', emailTitle:'Cambiar correo', legalPrivacyTitle:'Política de privacidad', legalEffDate:'Fecha de vigencia: 2025-01-01', legalPrivacyCollect:'1. Información que recopilamos', legalPrivacy1:'AI Chef es una aplicación del lado del cliente. No recopilamos, almacenamos ni transmitimos información personal.', legalPrivacyUse:'2. Uso de la información', legalPrivacy2:'Toda la generación de recetas se ejecuta localmente en tu dispositivo.', legalPrivacySecurity:'3. Seguridad de los datos', legalPrivacy3:'Sin recopilación de datos = sin riesgo de violación.', legalPrivacyChanges:'4. Cambios en la política', legalPrivacy4:'Podemos actualizar esta política. Los cambios se publicarán aquí.', legalPrivacyContact:'5. Contáctanos', legalPrivacy5:'Comunícate con nosotros si tienes preguntas.', legalTermsTitle:'Términos de servicio', legalTermEffDate:'Fecha de vigencia: 2025-01-01', legalTermsLicense:'1. Licencia', legalTerms1:'Solo para uso personal y no comercial.', legalTermsDisclaimer:'2. Descargo de responsabilidad', legalTerms2:'Las recetas son generadas por IA y solo para referencia.', legalTermsLimitations:'3. Limitación de responsabilidad', legalTerms3:'No somos responsables por ningún daño.', legalTermsModifications:'4. Modificaciones', legalTerms4:'Podemos modificar estos términos en cualquier momento.', legalTermsLaw:'5. Ley aplicable', legalTerms5:'Ley aplicable: tu jurisdicción.', legalTermsSubRules:'6. Reglas de suscripción', legalTermsSub1:'6.1 Los suscriptores tienen acceso al iniciar sesión.', legalTermsSub2:'6.2 Tres tipos de suscripción: Starter, Pro, Premium.', legalTermsSub3:'6.3 Las órdenes deben activarse dentro de las 24 horas iniciando sesión.', legalTermsSub4:'6.4 Cada generación de receta otorga 10 preguntas de IA para esa sesión.', legalTermsSub5:'6.5 Compartir en familia solo para Premium (hasta 3 personas).', legalTermsSub6:'6.6 La renovación automática está habilitada por defecto; gestiona a través de PayPal.', legalTermsSub7:'6.7 No hay reembolsos después del pago.', legalTermsSub8:'6.8 Usa un correo válido; no nos hacemos responsables por la pérdida de cuenta debido a correos falsos.', legalTermsSub9:'6.9 Las recetas y respuestas son generadas por DeepSeek y solo para referencia.', legalTermsSub10:'6.10 Nos reservamos el derecho de interpretación final.', success:'Éxito', ok:'Aceptar', personalizedGreeting:'Estimado {{name}}, tu deliciosa receta está lista. ¡Disfruta tu comida! 🌹', save:'Guardar', edit:'Editar', change:'Cambiar', pleaseLogin:'Inicia sesión primero', sendCode:'Enviar código', sending:'Enviando...', codeSent:'¡Código enviado!', codeSendFailed:'Error al enviar el código. Inténtalo de nuevo.', registerSuccess:'¡Registro exitoso!', loginFailed:'Error de inicio de sesión. Verifica tus credenciales.',
    // 新增订阅页面字段（暂时使用英文，您可后续补充西班牙语翻译）
    featureStarter1: '✅ 10 recipes per day',
    featureStarter2: '✅ 10 AI questions per recipe',
    featureStarter3: '✅ Personal use only',
    featurePro1: '✅ 30 recipes per day',
    featurePro2: '✅ 10 AI questions per recipe',
    featurePro3: '✅ Full features unlocked',
    featurePremium1: '✅ Unlimited recipes',
    featurePremium2: '✅ 10 AI questions per recipe',
    featurePremium3: '✅ Family share (up to 3 people)',
    featurePremium4: '✅ Priority generation',
    planNoticeStarter: '🔒 Secured by PayPal • Auto-renewal',
    planNoticePro: '🔒 Secured by PayPal • Auto-renewal',
    planNoticePremium: '🔒 Secured by PayPal • Auto-renewal',
  },
  fr: {
    heroSubtitle:'Cuisines mondiales · Association intelligente', sectionFeatures:'Fonctionnalités', feat1:'18 cuisines', feat1Sub:'Saveurs du monde', feat2:'Assistant IA', feat2Sub:'10 questions par recette', feat3:'Nutrition', feat3Sub:'Poids santé', feat4:'Sécurité bébé', feat4Sub:'Sans sel/sucre', feat5:'Grossesse', feat5Sub:'Adapté aux mamans', feat6:'Guides vidéo', feat6Sub:'Pas à pas', sectionSubscribe:'Formules d\'abonnement', subText:'S\'abonner', subSub:'Accès complet', familyText:'Partage familial', familySub:'Premium uniquement', legalLink:'Confidentialité/Conditions', genTitle:'Générateur de recettes IA', genMealType:'Catégorie', genCuisine:'Cuisine', genDishName:'Que manger ?', optStandard:'Standard', optBaby:'Bébé', optPregnancy:'Grossesse', generate:'Générer une recette', generating:'Génération...', aiAssistTitle:'Assistant IA', enterQuestion:'Posez une question sur cette recette...', ask:'Demander', dishNameHint:'Vous pouvez entrer un ou plusieurs ingrédients.', watchVideo:'Regarder les guides vidéo', addToHome:'Ajouter', freeLimitInfo:'Essai gratuit: {{used}}/3', starterInfo:'Starter: {{used}}/10 | Questions restantes: {{qLeft}}', proInfo:'Pro: {{used}}/30 | Questions restantes: {{qLeft}}', premiumInfo:'Premium: {{used}}/200 | Questions restantes: {{qLeft}}', alertNoPermission:'Votre essai gratuit a expiré. Abonnez-vous pour continuer.', alertDailyLimit:'Limite quotidienne atteinte. Améliorez ou réessayez demain.', alertNoPoints:'Quota insuffisant.', alertCooldown:'Trop rapide, veuillez patienter.', alertMonthlyCost:'Limite mensuelle atteinte.', alertNoRecipe:'Générez d\'abord une recette.', alertQTooLong:'Question trop longue.', alertInvalidFood:'Veuillez entrer un nom d\'aliment valide.', paymentSuccess:'Abonnement activé !', q:'Q', a:'R', qLimitReached:'Vous avez atteint la limite de 10 questions pour cette recette.', starterName:'Starter', proName:'Pro', premiumName:'Premium', starterDesc:'• 10 recettes/jour • 10 questions par recette • Usage personnel uniquement', proDesc:'• 30 recettes/jour • 10 questions par recette • Fonctionnalités complètes', premiumDesc:'• Recettes illimitées • 10 questions par recette • Partage familial (3 personnes) • Génération prioritaire', finePrint:'En vous abonnant, vous acceptez nos ', loginTitle:'Connexion', registerTitle:'Inscription', email:'E-mail', password:'Mot de passe', confirmPwd:'Confirmer le mot de passe', forgot:'Mot de passe oublié ?', noAccount:'Pas de compte ?', signUp:'S\'inscrire', signIn:'Se connecter', haveAccount:'Déjà un compte ?', forgotTitle:'Réinitialiser le mot de passe', cancel:'Annuler', reset:'Réinitialiser', profileNickname:'Surnom', profileEmail:'E-mail', profilePlan:'Forfait', profileJoined:'Inscrit le', logout:'Déconnexion', profileSub:'Mon abonnement', subStatus:'Statut', subExpiry:'Expire', inviteCodeTitle:'Code d\'invitation', joinFamily:'Rejoindre', nicknameTitle:'Changer de surnom', emailTitle:'Changer d\'e-mail', legalPrivacyTitle:'Politique de confidentialité', legalEffDate:'Date d\'entrée en vigueur : 2025-01-01', legalPrivacyCollect:'1. Informations que nous collectons', legalPrivacy1:'AI Chef est une application côté client. Nous ne collectons, ne stockons ni ne transmettons aucune information personnelle.', legalPrivacyUse:'2. Utilisation des informations', legalPrivacy2:'Toute la génération de recettes s\'exécute localement sur votre appareil.', legalPrivacySecurity:'3. Sécurité des données', legalPrivacy3:'Aucune donnée collectée = aucun risque de violation.', legalPrivacyChanges:'4. Modifications de la politique', legalPrivacy4:'Nous pouvons mettre à jour cette politique. Les modifications seront publiées ici.', legalPrivacyContact:'5. Contactez-nous', legalPrivacy5:'Contactez-nous si vous avez des questions.', legalTermsTitle:'Conditions d\'utilisation', legalTermEffDate:'Date d\'entrée en vigueur : 2025-01-01', legalTermsLicense:'1. Licence', legalTerms1:'Pour usage personnel et non commercial uniquement.', legalTermsDisclaimer:'2. Avertissement', legalTerms2:'Les recettes sont générées par IA et sont fournies à titre de référence uniquement.', legalTermsLimitations:'3. Limitation de responsabilité', legalTerms3:'Nous ne sommes pas responsables des dommages.', legalTermsModifications:'4. Modifications', legalTerms4:'Nous pouvons modifier ces conditions à tout moment.', legalTermsLaw:'5. Loi applicable', legalTerms5:'Loi applicable : votre juridiction.', legalTermsSubRules:'6. Règles d\'abonnement', legalTermsSub1:'6.1 Les abonnés ont accès après connexion.', legalTermsSub2:'6.2 Trois types d\'abonnement : Starter, Pro, Premium.', legalTermsSub3:'6.3 Les commandes doivent être activées dans les 24 heures en se connectant.', legalTermsSub4:'6.4 Chaque génération de recette accorde 10 questions IA pour cette session.', legalTermsSub5:'6.5 Le partage familial est disponible uniquement pour Premium (jusqu\'à 3 personnes).', legalTermsSub6:'6.6 Le renouvellement automatique est activé par défaut ; gérez-le via PayPal.', legalTermsSub7:'6.7 Aucun remboursement après paiement.', legalTermsSub8:'6.8 Utilisez un e-mail valide ; nous ne sommes pas responsables de la perte de compte due à de faux e-mails.', legalTermsSub9:'6.9 Les recettes et réponses sont générées par DeepSeek et sont fournies à titre de référence uniquement.', legalTermsSub10:'6.10 Nous nous réservons le droit d\'interprétation final.', success:'Succès', ok:'OK', personalizedGreeting:'Cher {{name}}, votre délicieuse recette est prête. Bon appétit ! 🌹', save:'Enregistrer', edit:'Modifier', change:'Changer', pleaseLogin:'Veuillez vous connecter d\'abord', sendCode:'Envoyer le code', sending:'Envoi...', codeSent:'Code envoyé !', codeSendFailed:'Échec de l\'envoi du code. Veuillez réessayer.', registerSuccess:'Inscription réussie !', loginFailed:'Échec de la connexion. Vérifiez vos identifiants.',
    // 新增订阅页面字段（暂时使用英文，您可后续补充法语翻译）
    featureStarter1: '✅ 10 recipes per day',
    featureStarter2: '✅ 10 AI questions per recipe',
    featureStarter3: '✅ Personal use only',
    featurePro1: '✅ 30 recipes per day',
    featurePro2: '✅ 10 AI questions per recipe',
    featurePro3: '✅ Full features unlocked',
    featurePremium1: '✅ Unlimited recipes',
    featurePremium2: '✅ 10 AI questions per recipe',
    featurePremium3: '✅ Family share (up to 3 people)',
    featurePremium4: '✅ Priority generation',
    planNoticeStarter: '🔒 Secured by PayPal • Auto-renewal',
    planNoticePro: '🔒 Secured by PayPal • Auto-renewal',
    planNoticePremium: '🔒 Secured by PayPal • Auto-renewal',
  },
  de: {
    heroSubtitle:'Globale Küchen · Intelligente Kombination', sectionFeatures:'Funktionen', feat1:'18 Küchen', feat1Sub:'Weltweite Aromen', feat2:'KI-Assistent', feat2Sub:'10 Fragen pro Rezept', feat3:'Ernährung', feat3Sub:'Gesundes Gewicht', feat4:'Babysicher', feat4Sub:'Ohne Salz/Zucker', feat5:'Schwangerschaft', feat5Sub:'Mama-freundlich', feat6:'Videoanleitungen', feat6Sub:'Schritt für Schritt', sectionSubscribe:'Abonnementpläne', subText:'Abonnieren', subSub:'Vollen Zugriff erhalten', familyText:'Familienfreigabe', familySub:'Nur Premium', legalLink:'Datenschutz/AGB', genTitle:'KI-Rezeptgenerator', genMealType:'Kategorie', genCuisine:'Küche', genDishName:'Was möchtest du essen?', optStandard:'Standard', optBaby:'Baby', optPregnancy:'Schwangerschaft', generate:'Rezept generieren', generating:'Generiere...', aiAssistTitle:'KI-Assistent', enterQuestion:'Frage zu diesem Rezept...', ask:'Fragen', dishNameHint:'Du kannst eine oder mehrere Zutaten eingeben.', watchVideo:'Videoanleitungen ansehen', addToHome:'Hinzufügen', freeLimitInfo:'Kostenlose Testversion: {{used}}/3', starterInfo:'Starter: {{used}}/10 | Fragen übrig: {{qLeft}}', proInfo:'Pro: {{used}}/30 | Fragen übrig: {{qLeft}}', premiumInfo:'Premium: {{used}}/200 | Fragen übrig: {{qLeft}}', alertNoPermission:'Deine kostenlose Testversion ist abgelaufen. Abonniere, um fortzufahren.', alertDailyLimit:'Tägliches Limit erreicht. Bitte upgrade oder versuche es morgen erneut.', alertNoPoints:'Kontingent unzureichend.', alertCooldown:'Zu schnell, bitte warte.', alertMonthlyCost:'Monatliches Limit erreicht.', alertNoRecipe:'Generiere zuerst ein Rezept.', alertQTooLong:'Frage zu lang.', alertInvalidFood:'Bitte gib einen gültigen Lebensmittelnamen ein.', paymentSuccess:'Abonnement aktiviert!', q:'F', a:'A', qLimitReached:'Du hast das Limit von 10 Fragen für dieses Rezept erreicht.', starterName:'Starter', proName:'Pro', premiumName:'Premium', starterDesc:'• 10 Rezepte/Tag • 10 Fragen pro Rezept • Nur für den persönlichen Gebrauch', proDesc:'• 30 Rezepte/Tag • 10 Fragen pro Rezept • Alle Funktionen freigeschaltet', premiumDesc:'• Unbegrenzte Rezepte • 10 Fragen pro Rezept • Familienfreigabe (3 Personen) • Priorisierte Generierung', finePrint:'Mit dem Abonnement stimmst du unseren ', loginTitle:'Anmelden', registerTitle:'Registrieren', email:'E-Mail', password:'Passwort', confirmPwd:'Passwort bestätigen', forgot:'Passwort vergessen?', noAccount:'Kein Konto?', signUp:'Registrieren', signIn:'Anmelden', haveAccount:'Bereits ein Konto?', forgotTitle:'Passwort zurücksetzen', cancel:'Abbrechen', reset:'Zurücksetzen', profileNickname:'Spitzname', profileEmail:'E-Mail', profilePlan:'Plan', profileJoined:'Registriert', logout:'Abmelden', profileSub:'Mein Abonnement', subStatus:'Status', subExpiry:'Läuft ab', inviteCodeTitle:'Einladungscode', joinFamily:'Beitreten', nicknameTitle:'Spitzname ändern', emailTitle:'E-Mail ändern', legalPrivacyTitle:'Datenschutzerklärung', legalEffDate:'Gültig ab: 2025-01-01', legalPrivacyCollect:'1. Informationen, die wir sammeln', legalPrivacy1:'AI Chef ist eine clientseitige Anwendung. Wir sammeln, speichern oder übermitteln keine persönlichen Informationen.', legalPrivacyUse:'2. Nutzung der Informationen', legalPrivacy2:'Die gesamte Rezeptgenerierung läuft lokal auf deinem Gerät.', legalPrivacySecurity:'3. Datensicherheit', legalPrivacy3:'Keine Datenerfassung = kein Risiko einer Verletzung.', legalPrivacyChanges:'4. Richtlinienänderungen', legalPrivacy4:'Wir können diese Richtlinie aktualisieren. Änderungen werden hier veröffentlicht.', legalPrivacyContact:'5. Kontakt', legalPrivacy5:'Kontaktiere uns bei Fragen.', legalTermsTitle:'Nutzungsbedingungen', legalTermEffDate:'Gültig ab: 2025-01-01', legalTermsLicense:'1. Lizenz', legalTerms1:'Nur für den persönlichen, nicht-kommerziellen Gebrauch.', legalTermsDisclaimer:'2. Haftungsausschluss', legalTerms2:'Rezepte werden von KI generiert und dienen nur als Referenz.', legalTermsLimitations:'3. Haftungsbeschränkung', legalTerms3:'Wir haften nicht für Schäden.', legalTermsModifications:'4. Änderungen', legalTerms4:'Wir können diese Bedingungen jederzeit ändern.', legalTermsLaw:'5. Anwendbares Recht', legalTerms5:'Anwendbares Recht: dein Gerichtsstand.', legalTermsSubRules:'6. Abonnementregeln', legalTermsSub1:'6.1 Abonnenten haben nach der Anmeldung Zugriff.', legalTermsSub2:'6.2 Drei Abonnementtypen: Starter, Pro, Premium.', legalTermsSub3:'6.3 Bestellungen müssen innerhalb von 24 Stunden durch Anmeldung aktiviert werden.', legalTermsSub4:'6.4 Jede Rezeptgenerierung gewährt 10 KI-Fragen für diese Sitzung.', legalTermsSub5:'6.5 Familienfreigabe nur für Premium verfügbar (bis zu 3 Personen).', legalTermsSub6:'6.6 Die automatische Verlängerung ist standardmäßig aktiviert; verwalte sie über PayPal.', legalTermsSub7:'6.7 Keine Rückerstattung nach Zahlung.', legalTermsSub8:'6.8 Verwende eine gültige E-Mail; wir haften nicht für Kontoverlust aufgrund gefälschter E-Mails.', legalTermsSub9:'6.9 Rezepte und Antworten werden von DeepSeek generiert und dienen nur als Referenz.', legalTermsSub10:'6.10 Wir behalten uns das Recht der endgültigen Auslegung vor.', success:'Erfolg', ok:'OK', personalizedGreeting:'Liebe/r {{name}}, dein köstliches Rezept ist fertig. Genieße deine Mahlzeit! 🌹', save:'Speichern', edit:'Bearbeiten', change:'Ändern', pleaseLogin:'Bitte melde dich zuerst an', sendCode:'Code senden', sending:'Sende...', codeSent:'Code gesendet!', codeSendFailed:'Fehler beim Senden des Codes. Bitte versuche es erneut.', registerSuccess:'Registrierung erfolgreich!', loginFailed:'Anmeldung fehlgeschlagen. Überprüfe deine Anmeldedaten.',
    // 新增订阅页面字段（暂时使用英文，您可后续补充德语翻译）
    featureStarter1: '✅ 10 recipes per day',
    featureStarter2: '✅ 10 AI questions per recipe',
    featureStarter3: '✅ Personal use only',
    featurePro1: '✅ 30 recipes per day',
    featurePro2: '✅ 10 AI questions per recipe',
    featurePro3: '✅ Full features unlocked',
    featurePremium1: '✅ Unlimited recipes',
    featurePremium2: '✅ 10 AI questions per recipe',
    featurePremium3: '✅ Family share (up to 3 people)',
    featurePremium4: '✅ Priority generation',
    planNoticeStarter: '🔒 Secured by PayPal • Auto-renewal',
    planNoticePro: '🔒 Secured by PayPal • Auto-renewal',
    planNoticePremium: '🔒 Secured by PayPal • Auto-renewal',
  },
  it: {
    heroSubtitle:'Cucine globali · Abbinamento intelligente', sectionFeatures:'Caratteristiche', feat1:'18 cucine', feat1Sub:'Sapori globali', feat2:'Assistente AI', feat2Sub:'10 domande per ricetta', feat3:'Nutrizione', feat3Sub:'Peso sano', feat4:'Sicuro per neonati', feat4Sub:'Senza sale/zucchero', feat5:'Gravidanza', feat5Sub:'Amico della mamma', feat6:'Guide video', feat6Sub:'Passo dopo passo', sectionSubscribe:'Piani di abbonamento', subText:'Abbonati', subSub:'Accesso completo', familyText:'Condivisione familiare', familySub:'Solo Premium', legalLink:'Privacy/Termini', genTitle:'Generatore di ricette AI', genMealType:'Categoria', genCuisine:'Cucina', genDishName:'Cosa vuoi mangiare?', optStandard:'Standard', optBaby:'Bebè', optPregnancy:'Gravidanza', generate:'Genera ricetta', generating:'Generazione...', aiAssistTitle:'Assistente AI', enterQuestion:'Chiedi informazioni su questa ricetta...', ask:'Chiedi', dishNameHint:'Puoi inserire uno o più ingredienti.', watchVideo:'Guarda le guide video', addToHome:'Aggiungi', freeLimitInfo:'Prova gratuita: {{used}}/3', starterInfo:'Starter: {{used}}/10 | Domande rimaste: {{qLeft}}', proInfo:'Pro: {{used}}/30 | Domande rimaste: {{qLeft}}', premiumInfo:'Premium: {{used}}/200 | Domande rimaste: {{qLeft}}', alertNoPermission:'La tua prova gratuita è scaduta. Abbonati per continuare.', alertDailyLimit:'Limite giornaliero raggiunto. Aggiorna o riprova domani.', alertNoPoints:'Quota insufficiente.', alertCooldown:'Troppo veloce, attendi.', alertMonthlyCost:'Limite mensile raggiunto.', alertNoRecipe:'Genera prima una ricetta.', alertQTooLong:'Domanda troppo lunga.', alertInvalidFood:'Inserisci un nome di alimento valido.', paymentSuccess:'Abbonamento attivato!', q:'D', a:'R', qLimitReached:'Hai raggiunto il limite di 10 domande per questa ricetta.', starterName:'Starter', proName:'Pro', premiumName:'Premium', starterDesc:'• 10 ricette/giorno • 10 domande per ricetta • Solo uso personale', proDesc:'• 30 ricette/giorno • 10 domande per ricetta • Funzionalità complete', premiumDesc:'• Ricette illimitate • 10 domande per ricetta • Condivisione familiare (3 persone) • Generazione prioritaria', finePrint:'Abbonandoti accetti i nostri ', loginTitle:'Accedi', registerTitle:'Registrati', email:'Email', password:'Password', confirmPwd:'Conferma password', forgot:'Password dimenticata?', noAccount:'Non hai un account?', signUp:'Registrati', signIn:'Accedi', haveAccount:'Hai già un account?', forgotTitle:'Reimposta password', cancel:'Annulla', reset:'Reimposta', profileNickname:'Soprannome', profileEmail:'Email', profilePlan:'Piano', profileJoined:'Registrato il', logout:'Esci', profileSub:'Il mio abbonamento', subStatus:'Stato', subExpiry:'Scade', inviteCodeTitle:'Codice invito', joinFamily:'Unisciti', nicknameTitle:'Cambia soprannome', emailTitle:'Cambia email', legalPrivacyTitle:'Informativa sulla privacy', legalEffDate:'Data di entrata in vigore: 2025-01-01', legalPrivacyCollect:'1. Informazioni che raccogliamo', legalPrivacy1:'AI Chef è un\'applicazione lato client. Non raccogliamo, memorizziamo o trasmettiamo informazioni personali.', legalPrivacyUse:'2. Utilizzo delle informazioni', legalPrivacy2:'Tutta la generazione di ricette avviene localmente sul tuo dispositivo.', legalPrivacySecurity:'3. Sicurezza dei dati', legalPrivacy3:'Nessuna raccolta dati = nessun rischio di violazione.', legalPrivacyChanges:'4. Modifiche alla policy', legalPrivacy4:'Possiamo aggiornare questa policy. Le modifiche verranno pubblicate qui.', legalPrivacyContact:'5. Contattaci', legalPrivacy5:'Contattaci se hai domande.', legalTermsTitle:'Termini di servizio', legalTermEffDate:'Data di entrata in vigore: 2025-01-01', legalTermsLicense:'1. Licenza', legalTerms1:'Solo per uso personale e non commerciale.', legalTermsDisclaimer:'2. Dichiarazione di non responsabilità', legalTerms2:'Le ricette sono generate dall\'IA e sono solo di riferimento.', legalTermsLimitations:'3. Limitazione di responsabilità', legalTerms3:'Non siamo responsabili per eventuali danni.', legalTermsModifications:'4. Modifiche', legalTerms4:'Possiamo modificare questi termini in qualsiasi momento.', legalTermsLaw:'5. Legge applicabile', legalTerms5:'Legge applicabile: la tua giurisdizione.', legalTermsSubRules:'6. Regole di abbonamento', legalTermsSub1:'6.1 Gli abbonati hanno accesso al login.', legalTermsSub2:'6.2 Tre tipi di abbonamento: Starter, Pro, Premium.', legalTermsSub3:'6.3 Gli ordini devono essere attivati entro 24 ore effettuando il login.', legalTermsSub4:'6.4 Ogni generazione di ricetta concede 10 domande AI per quella sessione.', legalTermsSub5:'6.5 La condivisione familiare è disponibile solo per Premium (fino a 3 persone).', legalTermsSub6:'6.6 Il rinnovo automatico è abilitato per impostazione predefinita; gestiscilo tramite PayPal.', legalTermsSub7:'6.7 Nessun rimborso dopo il pagamento.', legalTermsSub8:'6.8 Utilizza un\'email valida; non siamo responsabili per la perdita dell\'account a causa di email false.', legalTermsSub9:'6.9 Le ricette e le risposte sono generate da DeepSeek e sono solo di riferimento.', legalTermsSub10:'6.10 Ci riserviamo il diritto di interpretazione finale.', success:'Successo', ok:'OK', personalizedGreeting:'Caro {{name}}, la tua deliziosa ricetta è pronta. Buon appetito! 🌹', save:'Salva', edit:'Modifica', change:'Cambia', pleaseLogin:'Effettua il login prima', sendCode:'Invia codice', sending:'Invio...', codeSent:'Codice inviato!', codeSendFailed:'Invio del codice fallito. Riprova.', registerSuccess:'Registrazione riuscita!', loginFailed:'Accesso fallito. Controlla le tue credenziali.',
    // 新增订阅页面字段（暂时使用英文，您可后续补充意大利语翻译）
    featureStarter1: '✅ 10 recipes per day',
    featureStarter2: '✅ 10 AI questions per recipe',
    featureStarter3: '✅ Personal use only',
    featurePro1: '✅ 30 recipes per day',
    featurePro2: '✅ 10 AI questions per recipe',
    featurePro3: '✅ Full features unlocked',
    featurePremium1: '✅ Unlimited recipes',
    featurePremium2: '✅ 10 AI questions per recipe',
    featurePremium3: '✅ Family share (up to 3 people)',
    featurePremium4: '✅ Priority generation',
    planNoticeStarter: '🔒 Secured by PayPal • Auto-renewal',
    planNoticePro: '🔒 Secured by PayPal • Auto-renewal',
    planNoticePremium: '🔒 Secured by PayPal • Auto-renewal',
  },
  pt: {
    heroSubtitle:'Cozinhas globais · Combinação inteligente', sectionFeatures:'Características', feat1:'18 cozinhas', feat1Sub:'Sabores globais', feat2:'Assistente IA', feat2Sub:'10 perguntas por receita', feat3:'Nutrição', feat3Sub:'Peso saudável', feat4:'Seguro para bebês', feat4Sub:'Sem sal/açúcar', feat5:'Gravidez', feat5Sub:'Amigável para mamãe', feat6:'Guias em vídeo', feat6Sub:'Passo a passo', sectionSubscribe:'Planos de assinatura', subText:'Assinar', subSub:'Acesso completo', familyText:'Compartilhamento familiar', familySub:'Apenas Premium', legalLink:'Privacidade/Termos', genTitle:'Gerador de receitas IA', genMealType:'Categoria', genCuisine:'Cozinha', genDishName:'O que comer?', optStandard:'Padrão', optBaby:'Bebê', optPregnancy:'Gravidez', generate:'Gerar receita', generating:'Gerando...', aiAssistTitle:'Assistente IA', enterQuestion:'Pergunte sobre esta receita...', ask:'Perguntar', dishNameHint:'Você pode inserir um ou mais ingredientes.', watchVideo:'Assistir guias em vídeo', addToHome:'Adicionar', freeLimitInfo:'Teste gratuito: {{used}}/3', starterInfo:'Starter: {{used}}/10 | Perguntas restantes: {{qLeft}}', proInfo:'Pro: {{used}}/30 | Perguntas restantes: {{qLeft}}', premiumInfo:'Premium: {{used}}/200 | Perguntas restantes: {{qLeft}}', alertNoPermission:'Seu teste gratuito expirou. Assine para continuar.', alertDailyLimit:'Limite diário atingido. Atualize ou tente novamente amanhã.', alertNoPoints:'Cota insuficiente.', alertCooldown:'Muito rápido, aguarde.', alertMonthlyCost:'Limite mensal atingido.', alertNoRecipe:'Gere uma receita primeiro.', alertQTooLong:'Pergunta muito longa.', alertInvalidFood:'Digite um nome de alimento válido.', paymentSuccess:'Assinatura ativada!', q:'P', a:'R', qLimitReached:'Você atingiu o limite de 10 perguntas para esta receita.', starterName:'Starter', proName:'Pro', premiumName:'Premium', starterDesc:'• 10 receitas/dia • 10 perguntas por receita • Uso pessoal apenas', proDesc:'• 30 receitas/dia • 10 perguntas por receita • Recursos completos', premiumDesc:'• Receitas ilimitadas • 10 perguntas por receita • Compartilhamento familiar (3 pessoas) • Geração prioritária', finePrint:'Ao assinar, você concorda com nossos ', loginTitle:'Entrar', registerTitle:'Registrar', email:'E-mail', password:'Senha', confirmPwd:'Confirmar senha', forgot:'Esqueceu a senha?', noAccount:'Não tem uma conta?', signUp:'Registrar', signIn:'Entrar', haveAccount:'Já tem uma conta?', forgotTitle:'Redefinir senha', cancel:'Cancelar', reset:'Redefinir', profileNickname:'Apelido', profileEmail:'E-mail', profilePlan:'Plano', profileJoined:'Registrado em', logout:'Sair', profileSub:'Minha assinatura', subStatus:'Status', subExpiry:'Expira', inviteCodeTitle:'Código de convite', joinFamily:'Entrar', nicknameTitle:'Alterar apelido', emailTitle:'Alterar e-mail', legalPrivacyTitle:'Política de privacidade', legalEffDate:'Data de vigência: 2025-01-01', legalPrivacyCollect:'1. Informações que coletamos', legalPrivacy1:'AI Chef é um aplicativo do lado do cliente. Não coletamos, armazenamos ou transmitimos informações pessoais.', legalPrivacyUse:'2. Uso das informações', legalPrivacy2:'Toda a geração de receitas é executada localmente no seu dispositivo.', legalPrivacySecurity:'3. Segurança de dados', legalPrivacy3:'Nenhum dado coletado = nenhum risco de violação.', legalPrivacyChanges:'4. Mudanças na política', legalPrivacy4:'Podemos atualizar esta política. As alterações serão publicadas aqui.', legalPrivacyContact:'5. Contate-nos', legalPrivacy5:'Contate-nos se tiver dúvidas.', legalTermsTitle:'Termos de serviço', legalTermEffDate:'Data de vigência: 2025-01-01', legalTermsLicense:'1. Licença', legalTerms1:'Apenas para uso pessoal e não comercial.', legalTermsDisclaimer:'2. Isenção de responsabilidade', legalTerms2:'As receitas são geradas por IA e são apenas para referência.', legalTermsLimitations:'3. Limitação de responsabilidade', legalTerms3:'Não somos responsáveis por quaisquer danos.', legalTermsModifications:'4. Modificações', legalTerms4:'Podemos modificar estes termos a qualquer momento.', legalTermsLaw:'5. Lei aplicável', legalTerms5:'Lei aplicável: sua jurisdição.', legalTermsSubRules:'6. Regras de assinatura', legalTermsSub1:'6.1 Os assinantes têm acesso após o login.', legalTermsSub2:'6.2 Três tipos de assinatura: Starter, Pro, Premium.', legalTermsSub3:'6.3 Os pedidos devem ser ativados dentro de 24 horas fazendo login.', legalTermsSub4:'6.4 Cada geração de receita concede 10 perguntas de IA para essa sessão.', legalTermsSub5:'6.5 O compartilhamento familiar está disponível apenas para Premium (até 3 pessoas).', legalTermsSub6:'6.6 A renovação automática está ativada por padrão; gerencie via PayPal.', legalTermsSub7:'6.7 Sem reembolso após o pagamento.', legalTermsSub8:'6.8 Use um e-mail válido; não somos responsáveis pela perda de conta devido a e-mails falsos.', legalTermsSub9:'6.9 Receitas e respostas são geradas por DeepSeek e são apenas para referência.', legalTermsSub10:'6.10 Reservamo-nos o direito de interpretação final.', success:'Sucesso', ok:'OK', personalizedGreeting:'Caro {{name}}, sua deliciosa receita está pronta. Aproveite sua refeição! 🌹', save:'Salvar', edit:'Editar', change:'Alterar', pleaseLogin:'Faça login primeiro', sendCode:'Enviar código', sending:'Enviando...', codeSent:'Código enviado!', codeSendFailed:'Falha ao enviar o código. Tente novamente.', registerSuccess:'Registro bem-sucedido!', loginFailed:'Falha no login. Verifique suas credenciais.',
    // 新增订阅页面字段（暂时使用英文，您可后续补充葡萄牙语翻译）
    featureStarter1: '✅ 10 recipes per day',
    featureStarter2: '✅ 10 AI questions per recipe',
    featureStarter3: '✅ Personal use only',
    featurePro1: '✅ 30 recipes per day',
    featurePro2: '✅ 10 AI questions per recipe',
    featurePro3: '✅ Full features unlocked',
    featurePremium1: '✅ Unlimited recipes',
    featurePremium2: '✅ 10 AI questions per recipe',
    featurePremium3: '✅ Family share (up to 3 people)',
    featurePremium4: '✅ Priority generation',
    planNoticeStarter: '🔒 Secured by PayPal • Auto-renewal',
    planNoticePro: '🔒 Secured by PayPal • Auto-renewal',
    planNoticePremium: '🔒 Secured by PayPal • Auto-renewal',
  },
  'zh-CN': {
    heroTitle: 'AI Chef',
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
    premiumInfo: '家庭订阅：{{used}}/200 | 剩余提问 {{qLeft}}',
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
    qLimitReached: '本食谱已达到10次提问上限。',
    starterName: '基础订阅',
    proName: '高级订阅',
    premiumName: 'Premium 共享订阅（家庭版）',
    starterDesc: '10次/日 · 每食谱10问',
    proDesc: '30次/日 · 每食谱10问',
    premiumDesc: '无限次 · 每食谱10问 · 3人家庭共享 · 优先生成',
    finePrint: '订阅即表示同意',
    loginTitle: '登录',
    registerTitle: '注册',
    email: '邮箱',
    password: '密码',
    confirmPwd: '确认密码',
    forgot: '忘记密码？',
    noAccount: '没有账号？',
    signUp: '注册',
    signIn: '登录',
    haveAccount: '已有账号？',
    forgotTitle: '重置密码',
    cancel: '取消',
    reset: '重置',
    profileNickname: '昵称',
    profileEmail: '邮箱',
    profilePlan: '套餐',
    profileJoined: '注册时间',
    logout: '退出登录',
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
    legalPrivacy5: '如有问题请联系我们。',
    legalTermsTitle: '服务条款',
    legalTermEffDate: '生效日期：2025-01-01',
    legalTermsLicense: '1. 许可',
    legalTerms1: '仅限个人非商业使用。',
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
    legalTermsSub2: '6.2 订阅用户分为基础订阅、高级订阅、家庭订阅。',
    legalTermsSub3: '6.3 订单激活期限为24小时，登录账号即自动激活权益。',
    legalTermsSub4: '6.4 订阅用户每生成食谱1次赠10次AI助手提问，当次使用不结转。',
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
    edit: '修改',
    change: '更改',
    pleaseLogin: '请先登录',
    sendCode: '发送验证码',
    sending: '发送中...',
    codeSent: '验证码已发送！',
    codeSendFailed: '发送失败，请重试。',
    registerSuccess: '注册成功！',
    loginFailed: '登录失败，请检查邮箱和密码。',
    // 新增订阅页面字段（中文翻译）
    featureStarter1: '✅ 每日10次食谱生成',
    featureStarter2: '✅ 每食谱10次AI提问',
    featureStarter3: '✅ 个人使用',
    featurePro1: '✅ 每日30次食谱生成',
    featurePro2: '✅ 每食谱10次AI提问',
    featurePro3: '✅ 全部功能解锁',
    featurePremium1: '✅ 无限次食谱生成',
    featurePremium2: '✅ 每食谱10次AI提问',
    featurePremium3: '✅ 家庭共享（最多3人）',
    featurePremium4: '✅ 优先生成',
    planNoticeStarter: '🔒 PayPal安全支付 • 自动续费',
    planNoticePro: '🔒 PayPal安全支付 • 自动续费',
    planNoticePremium: '🔒 PayPal安全支付 • 自动续费',
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
  const btn = document.getElementById('btnLogin');
  if (userData && userData.email) {
    let displayName = userData.nickname || userData.email.split('@')[0];
    if (displayName.length > 12) displayName = displayName.slice(0, 10) + '…';
    btn.innerText = displayName;
    btn.title = userData.nickname || userData.email;
  } else {
    btn.innerText = 'Login';
  }
}

// ==================== 生成器相关 ====================
async function generateRecipe() {
  if (!userData) {
    alert(t('pleaseLogin'));
    showPage('page-login-register');
    return;
  }
  if (userData.plan === 'free' && userData.freeUsed >= 3) {
    alert(t('alertNoPermission'));
    showPage('page-subscribe');
    return;
  }
  if (userData.plan !== 'free' && userData.dailyUsed >= PLANS[userData.plan].dailyLimit) {
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
          { role: 'user', content: `生成${cuisine} ${dish} 食谱，请提供一种不同的做法，避免与之前完全相同。随机种子：${Math.random().toString(36).substring(2,8)}` }
        ]
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    let recipe = data.choices[0].message.content;

    if (userData.plan !== 'free') {
      let displayName = userData.nickname || userData.email.split('@')[0];
      if (displayName.length > 8) displayName = displayName.slice(0, 6) + '…';
      recipe = t('personalizedGreeting', { name: displayName }) + '\n\n' + recipe;
    }
    resultEl.innerText = recipe;
    addToHistory(recipe);
    userData.lastRecipeText = recipe;

    await initDeviceId();
    // 设备限流：免费用户先调用设备接口
    if (userData.plan === 'free') {
      try {
        await apiCall('/api/device/record-generation', { method: 'POST', body: JSON.stringify({ deviceId }) });
      } catch (e) {
        if (e.message.includes('Free trial expired')) {
          alert(t('alertNoPermission'));
          showPage('page-subscribe');
          return;
        }
      }
    }
    const res = await apiCall('/api/user/record-generation', {
      method: 'POST',
      body: JSON.stringify({ deviceId })
    });
    if (userData.plan === 'free') {
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
    if (error.message.includes('Free trial expired')) {
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
    el.innerText = 'Please login to generate recipes';
    return;
  }
  let planDisplay = '';
  if (userData.plan === 'free') planDisplay = 'Free trial';
  else if (userData.plan === 'starter') planDisplay = 'Starter';
  else if (userData.plan === 'pro') planDisplay = 'Pro';
  else if (userData.plan === 'premium') planDisplay = 'Premium';
  if (userData.plan === 'free') {
    el.innerText = t('freeLimitInfo', { used: userData.freeUsed });
  } else {
    const plan = PLANS[userData.plan];
    const qLeft = userData.qLeft !== undefined ? userData.qLeft : plan.qPerRecipe;
    el.innerText = t(userData.plan+'Info', { used: userData.dailyUsed, qLeft }) + ` (${planDisplay})`;
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
  renderProfile();
  updateLimitInfo();
  updateNavButton();
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
  if (field.type === 'password') {
    field.type = 'text';
  } else {
    field.type = 'password';
  }
}

// ==================== 个人信息修改 ====================
async function saveNickname() {
  const newName = document.getElementById('newNicknameInput').value.trim();
  if (!newName || newName.length > 12) { alert('Nickname must be 1-12 characters'); return; }
  await apiCall('/api/user/update', {
    method: 'PATCH',
    body: JSON.stringify({ nickname: newName })
  });
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
    const data = await apiCall('/api/user/change-email', {
      method: 'POST',
      body: JSON.stringify({ newEmail, verificationCode: code })
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
    await apiCall('/api/user/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email, verificationCode: code, newPassword: newPwd })
    });
    alert('Password reset successfully!');
    closeModal('forgotModal');
    document.getElementById('forgotEmail').value = '';
    document.getElementById('forgotCode').value = '';
    document.getElementById('forgotNewPwd').value = '';
  } catch (e) {
    alert(e.message);
  }
}

// ==================== 社交登录（保留但前端隐藏） ====================
function initSocialLogin() {
  // 社交登录按钮已在前端隐藏，保留空函数
}

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
async function redirectToPayPal(planType = 'starter') {
  try {
    let bindCode = localStorage.getItem('tempBindCode');
    if (!bindCode) {
      const resp = await fetch('https://paypal.taropai.com/generate-bind-code');
      const data = await resp.json();
      bindCode = data.bindCode;
      localStorage.setItem('tempBindCode', bindCode);
    }
    window.location.href = `https://paypal.taropai.com/?plan=${planType}&bindCode=${bindCode}`;
  } catch (error) {
    console.error('Failed to generate bindCode:', error);
    alert('Unable to process subscription. Please try again later.');
  }
}

function renderPayPal() {
  if (!window.paypal) return;

  const plans = [
    { containerId: 'paypal-button-container-P-1U5765718B789804NNG3MBWQ', planId: 'P-1U5765718B789804NNG3MBWQ', planType: 'starter', name: 'Starter' },
    { containerId: 'paypal-button-container-P-5P885108R60234815NG3MEPY', planId: 'P-5P885108R60234815NG3MEPY', planType: 'pro', name: 'Pro' },
    { containerId: 'paypal-button-container-P-1880277264176022RNG3MFRA', planId: 'P-1880277264176022RNG3MFRA', planType: 'premium', name: 'Premium' }
  ];

  // 未登录用户：显示自定义营销按钮
  if (!userData) {
    plans.forEach(plan => {
      const container = document.getElementById(plan.containerId);
      if (container) {
        container.innerHTML = `
          <button class="paypal-custom-btn" data-plan="${plan.planType}" data-plan-name="${plan.name}">
            ✨ Get ${plan.name} ✨
          </button>
        `;
      }
    });
    // 绑定自定义按钮点击事件（使用事件委托，避免重复绑定）
    if (!window._paypalCustomBtnBound) {
      document.body.addEventListener('click', async (e) => {
        const btn = e.target.closest('.paypal-custom-btn');
        if (btn && btn.dataset.plan) {
          e.preventDefault();
          await redirectToPayPal(btn.dataset.plan);
        }
      });
      window._paypalCustomBtnBound = true;
    }
    return;
  }

  // 已登录用户：渲染官方 PayPal 按钮
  plans.forEach(plan => {
    const container = document.getElementById(plan.containerId);
    if (!container) return;
    container.innerHTML = '';
    paypal.Buttons({
      style: { shape: 'pill', color: 'white', layout: 'vertical', label: 'subscribe' },
      createSubscription: function(data, actions) {
        return actions.subscription.create({ plan_id: plan.planId });
      },
      onApprove: async function(data, actions) {
        const subscriptionId = data.subscriptionID;
        if (!subscriptionId) {
          alert('Subscription failed: No subscription ID returned.');
          return;
        }
        try {
          await initDeviceId();
          await apiCall('/api/subscription/verify', {
            method: 'POST',
            body: JSON.stringify({
              subscriptionId: subscriptionId,
              planType: plan.planType,
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
      onError: function(err) {
        console.error(err);
        alert('PayPal subscription failed. Please try again.');
      }
    }).render(`#${plan.containerId}`);
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
  const map = CUISINE_MAP[currentLang];
  select.innerHTML = CUISINES.map(c => {
    let displayName = c;
    if (map && map[c]) displayName = map[c];
    else if (currentLang === 'zh-CN' && CUISINE_MAP['zh-CN'][c]) displayName = CUISINE_MAP['zh-CN'][c];
    return `<option value="${c}">${displayName}</option>`;
  }).join('');
}

function renderLanguage() {
  // 原有完整的多语言赋值（请根据您的实际 DOM 元素补充，这里仅列出关键元素）
  document.getElementById('heroTitle').innerText = t('heroTitle');
  document.getElementById('heroSubtitle').innerText = t('heroSubtitle');
  document.getElementById('sectionFeatures').innerText = t('sectionFeatures');
  for (let i = 1; i <= 6; i++) {
    const el = document.getElementById(`feat${i}`);
    const sub = document.getElementById(`feat${i}Sub`);
    if (el) el.innerText = t(`feat${i}`);
    if (sub) sub.innerText = t(`feat${i}Sub`);
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
  document.getElementById('profilePlanLabel').innerText = t('profilePlan');
  document.getElementById('profileJoinedLabel').innerText = t('profileJoined');
  document.getElementById('logoutBtn').innerText = t('logout');
  document.getElementById('profileSubTitle').innerText = t('profileSub');
  document.getElementById('goSubscribeBtn').innerText = t('subText');
  document.getElementById('inviteCodeTitle').innerText = t('inviteCodeTitle');
  document.getElementById('editNicknameBtn').innerText = t('edit');
  document.getElementById('editEmailBtn').innerText = t('change');
  document.getElementById('sectionSubTitle').innerText = t('sectionSubscribe');
  document.getElementById('planStarterName').innerText = t('starterName');
  document.getElementById('planProName').innerHTML = t('proName') + ' <span style="background:#ffd966; padding:2px 8px; border-radius:12px; font-size:12px;">Most Popular</span>';
  document.getElementById('planPremiumName').innerHTML = t('premiumName');
  document.getElementById('planStarterDesc').innerHTML = t('starterDesc');
  document.getElementById('planProDesc').innerHTML = t('proDesc');
  document.getElementById('planPremiumDesc').innerHTML = t('premiumDesc');
  document.getElementById('finePrint').innerHTML = t('finePrint') + '<a onclick="showPage(\'page-legal\')">' + t('legalTermsTitle') + '</a>.';
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
  for (let i = 1; i <= 10; i++) {
    const el = document.getElementById(`legalTermsSub${i}`);
    if (el) el.innerText = t(`legalTermsSub${i}`);
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
  // 订阅页面新增翻译
  const starterFeatures = document.querySelectorAll('#featureStarter1, #featureStarter2, #featureStarter3');
  if (starterFeatures.length) {
    document.getElementById('featureStarter1').innerText = t('featureStarter1');
    document.getElementById('featureStarter2').innerText = t('featureStarter2');
    document.getElementById('featureStarter3').innerText = t('featureStarter3');
  }
  const proFeatures = document.querySelectorAll('#featurePro1, #featurePro2, #featurePro3');
  if (proFeatures.length) {
    document.getElementById('featurePro1').innerText = t('featurePro1');
    document.getElementById('featurePro2').innerText = t('featurePro2');
    document.getElementById('featurePro3').innerText = t('featurePro3');
  }
  const premiumFeatures = document.querySelectorAll('#featurePremium1, #featurePremium2, #featurePremium3, #featurePremium4');
  if (premiumFeatures.length) {
    document.getElementById('featurePremium1').innerText = t('featurePremium1');
    document.getElementById('featurePremium2').innerText = t('featurePremium2');
    document.getElementById('featurePremium3').innerText = t('featurePremium3');
    document.getElementById('featurePremium4').innerText = t('featurePremium4');
  }
  const noticeElements = ['planNoticeStarter', 'planNoticePro', 'planNoticePremium'];
  noticeElements.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerText = t(id);
  });
  // 更新验证码按钮文本
  const sendCodeBtn = document.getElementById('sendCodeBtn');
  if (sendCodeBtn) sendCodeBtn.innerText = t('sendCode');
  const sendResetCodeBtn = document.getElementById('sendResetCodeBtn');
  if (sendResetCodeBtn) sendResetCodeBtn.innerText = t('sendCode');
  const sendEmailChangeCodeBtn = document.getElementById('sendEmailChangeCodeBtn');
  if (sendEmailChangeCodeBtn) sendEmailChangeCodeBtn.innerText = t('sendCode');
  populateCuisines();
}

function renderProfile() {
  if (!userData) {
    document.getElementById('profileNickname').innerText = 'Not logged in';
    document.getElementById('profileEmail').innerText = '';
    document.getElementById('profilePlan').innerText = '';
    document.getElementById('profileJoined').innerText = '';
    document.getElementById('subStatus').innerText = '';
    document.getElementById('subExpiry').innerText = '';
    document.getElementById('familyArea').style.display = 'none';
    document.getElementById('setPasswordArea').style.display = 'none';
    return;
  }
  document.getElementById('profileNickname').innerText = userData.nickname || userData.email.split('@')[0];
  document.getElementById('profileEmail').innerText = userData.email;
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
  if (!userData.hasPassword) {
    document.getElementById('setPasswordArea').style.display = 'block';
  } else {
    document.getElementById('setPasswordArea').style.display = 'none';
  }
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
  if (pageId === 'page-profile') renderProfile();
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
  if (userData) showPage('page-profile');
  else showPage('page-login-register');
}

function showForgotModal() { document.getElementById('forgotModal').classList.add('show'); }
function showNicknameModal() { document.getElementById('newNicknameInput').value = userData?.nickname || ''; document.getElementById('nicknameModal').classList.add('show'); }
function showEmailModal() { document.getElementById('newEmailInput').value = userData?.email || ''; document.getElementById('emailModal').classList.add('show'); }

// ==================== 历史记录（6条，本地缓存） ====================
function addToHistory(recipe) {
  recipeHistory.push(recipe);
  if (recipeHistory.length > MAX_HISTORY) recipeHistory.shift();
  historyIndex = recipeHistory.length - 1;
  localStorage.setItem('recipeHistory', JSON.stringify(recipeHistory));
  updateHistoryButtons();
}

function loadHistoryFromCache() {
  const cached = localStorage.getItem('recipeHistory');
  if (cached) {
    recipeHistory = JSON.parse(cached);
    historyIndex = recipeHistory.length - 1;
    updateHistoryButtons();
  }
}

function restoreRecentRecipes() {
  const cached = localStorage.getItem('recipeHistory');
  if (!cached || JSON.parse(cached).length === 0) {
    showToast('No cached recipes found. Please generate new ones.');
    return;
  }
  const recent = JSON.parse(cached).slice(-3);
  const resultEl = document.getElementById('recipeResult');
  resultEl.innerHTML = '<div style="font-size:14px; color:#64788b; margin-bottom:8px;">📜 最近3条记录：</div>' + recent.map((r, i) => `<div style="margin-bottom:6px;">${i+1}. ${r.substring(0, 100)}${r.length > 100 ? '…' : ''}</div>`).join('');
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

// ==================== 视频引导 ====================
function showVideo() {
  const dish = document.getElementById('dishName').value.trim() || 'recipe';
  const cuisine = document.getElementById('cuisine').value;
  const query = encodeURIComponent(`${cuisine} ${dish} cooking`);
  document.getElementById('videoFrame').src = `https://www.youtube.com/embed?listType=search&list=${query}`;
  document.getElementById('videoContainer').style.display = 'block';
}

// ==================== 处理 URL 参数（邮箱预填） ====================
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
      document.getElementById('forgotPwdLink').click();
      document.getElementById('forgotEmail').value = decodeURIComponent(email);
    }
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}

// ==================== 添加“恢复最近3条”小字链接 ====================
function addRestoreLink() {
  const generatorCard = document.querySelector('#page-generator .card:first-of-type');
  if (generatorCard && !document.getElementById('restoreRecentLink')) {
    const link = document.createElement('div');
    link.id = 'restoreRecentLink';
    link.style.textAlign = 'right';
    link.style.marginTop = '8px';
    link.style.fontSize = '12px';
    link.style.color = '#64788b';
    link.innerHTML = '<span style="cursor:pointer;" onclick="restoreRecentRecipes()">↻ 恢复最近3条</span>';
    generatorCard.appendChild(link);
  }
}

// ==================== Service Worker 注册 ====================
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
  updateNavButton();
  loadHistoryFromCache();
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
  initSocialLogin();
  checkOAuthCallback();
  document.getElementById('sendCodeBtn').addEventListener('click', sendVerificationCode);
  document.getElementById('sendResetCodeBtn').addEventListener('click', sendResetCode);
  document.getElementById('sendEmailChangeCodeBtn').addEventListener('click', sendEmailChangeCode);
  addRestoreLink();
  handleUrlParams();
  if (userData && userData.email) updateLimitInfo();
})();
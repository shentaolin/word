/**
 * MyIcon icon set component.
 * Usage: <MyIcon name="icon-name" size={20} color="#4F8EF7" />
 */

import createIconSet from 'react-native-vector-icons/lib/create-icon-set';
const glyphMap = {
    "erweima":58880,"home":58881,"news":58882,"program":58883,"work":58884,"home-jgj":58885,"delete":58886,"mine":58887,"letter":58888,"error":58889,"exclamation":58890,"success":58891,"correct":58892,"each-other":58893,"edit":58894,"plus2":58895,"new":58896,"l-arrow":58897,"idcard-success":58898,"help":58899,"work-market":58900,"star1":58901,"error2":58902,"comment-stroke":58903,"shouye":58904,"caidan":58905,"fanhui":58906,"share-stroke":58907,"tel-os":58908,"warning2":58909,"renmaiziyuan":58910,"gouhao":58911,"promotion":58912,"exposure":58913,"star":58914,"information":58915,"area":58916,"project":58917,"profession":58918,"renzhengshuoming":58919,"share1":58920,"video-play":58921,"find":58922,"reply":58923,"share-circle":58924,"chat-circle":58925,"plus":58926,"bell":58927,"comment":58928,"share":58929,"cross-del":58930,"xingxing1":58931,"praise":58932,"weixuanze":58933,"shield":58934,"omit":58935,"r-arrow":58936,"share-circle-2":58937,"chat-circle-2":58938,"circle-bad":58939,"collection-stroke":58940,"xuanzeyixuan":58941,"rotate":58942,"search":58943,"long-r-arrow":58944,"time":58945,"withdraw":58946,"reject":58947,"allow":58948,"no-choose":58949,"recycle":58950,"imgs":58951,"question-circle":58952,"document":58953,"books":58954,"eyes":58955,"paper":58956,"manager":58957,"displayer":58958,"undo":58959,"shop":58960,"sure":58961,"close":58962,"vip":58963,"camera":58964,"account-note02":58965,"note":58966,"account-note01":58967,"up-arrow":58968,"rmb":58969,"jiahao":58970,"qq":58971,"qq-space":58972,"del":58973,"thin-time":58974,"bg-person":58975,"warning":58976,"adjust":58977,"bg-tel":58978,"gold":58979,"batch":58980,"release":58981,"place":58982,"totop":58983,"resume":58984,"search-history":58985,"my-job":58986,"add-job":58987,"bulb":58988,"gengduo":58989,"shuaxin":58990,"jiantou":58991,"queryHelp":58992,"asterisk":58993,"ecorder":58994,"closed":58995,"peoples":58996,"reminding":58997,"arrow-top":58998,"Sign-in":58999,"myApplication":59000,"myApproval":59001,"copyTo":59002,"pendingMy":59003,"newApproval":59004,"ask":59005,"answer":59006,"logo":59007,"jianhao":59008,"gtgk":59009,"heart":59010,"labor":59011,"d-arrow":59012,"wechat":59013,"question-mark":59014,"wechat-many":59015,"jiantou1":59016,"alipay":59017,"bofang":59018,"certification":59019,"dingdan":59020,"liushui":59021,"praise1":59022,"money-safe":59023,"dingyue":59024,"bodadianhua":59025,"yidingyue":59026,"liaoliao":59027,"star-key":59047,"promise":59057,"refresh":59075,"huanyipi":59076,"ditu":59140,"share-arrow":59156,"qiye":59172,"account-note03":59236,"zijiniconfontkuanyi20guanqianqianbao":59237,"point":59312,"tel":59316,"b-arrow":59317,"rd-arrow":59318,"down-arrow":59319,"r-r-arrow":59320,"arrow-down-copy":59321,
    };

const iconSet = createIconSet(glyphMap, 'iconfont', 'iconfont.ttf');

export default iconSet;

export const Button = iconSet.Button;
export const TabBarItem = iconSet.TabBarItem;
export const TabBarItemIOS = iconSet.TabBarItemIOS;
export const ToolbarAndroid = iconSet.ToolbarAndroid;
export const getImageSource = iconSet.getImageSource;
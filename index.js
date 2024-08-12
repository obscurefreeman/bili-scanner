// ==UserScript==
// @name              （改）B站成分检测器
// @version           1.48
// @author            hmjz100,xulaupuz,trychen
// @namespace         github.com/hmjz100
// @license           GPLv3
// @description       《也许同类型中最好用？》系列 - B站评论区自动标注成分，支持动态和关注识别以及手动输入 UID 识别，默认标注包括抽奖、原神、崩坏3、崩坏星穹铁道、绝区零、鸣潮、战双帕弥什、少女前线、少女前线2、明日方舟、碧蓝航线、VTuber、Asoul、王者荣耀、三国杀、Minecraft、迷你世界、初生科技、穿越火线、地下城与勇士、绝地求生、英雄联盟、第五人格、蛋仔派对、GLITCH。
// @match             *://*.bilibili.com/*
// @icon         https://static.hdslb.com/images/favicon.ico
// @connect           bilibili.com
// @grant             GM_setValue
// @grant             GM_getValue
// @grant             GM_xmlhttpRequest
// @grant             GM.xmlHttpRequest
// @grant             GM_registerMenuCommand
// @grant             GM_getResourceText
// @require           https://unpkg.com/jquery@3.6.0/dist/jquery.min.js
// @require           https://unpkg.com/sweetalert2@11/dist/sweetalert2.min.js
// @resource Swal     https://unpkg.com/sweetalert2@11/dist/sweetalert2.min.css
// @resource SwalDark https://unpkg.com/@sweetalert2/theme-dark@5/dark.min.css
// @downloadURL https://update.greasyfork.org/scripts/462288/%EF%BC%88%E6%94%B9%EF%BC%89B%E7%AB%99%E6%88%90%E5%88%86%E6%A3%80%E6%B5%8B%E5%99%A8.user.js
// @updateURL https://update.greasyfork.org/scripts/462288/%EF%BC%88%E6%94%B9%EF%BC%89B%E7%AB%99%E6%88%90%E5%88%86%E6%A3%80%E6%B5%8B%E5%99%A8.meta.js
// ==/UserScript==

$(function BiliChecker() {
	// 是否在控制台显示错误消息
	let debug = false;
	/* 注释~
	在这里配置要检查的成分，或者直接拉黑（使用指定UID评论的人会被直接添加标签）。
	假设你要直接给指定UID添加一个标签的话，就这样写：blacklist: [1234567890,0987654321]
	*/
	const checkers = [




















        {
            displayName: "小黑子",
            displayIcon: "https://i0.hdslb.com/bfs/face/c9f9e503e2b40f32fbd7f0e778cb79c09f50d683.jpg@240w_240h_1c_1s.webp",
            keywords: ["蔡徐坤", "鸡你太美", "只因你太美", "ikun", "小黑子", "鸡你"],
            followings: [692565348,417371020,1304376959,3493262365035488]
        },
        {
            displayName: "HOMO",
            displayIcon: "https://i1.hdslb.com/bfs/face/875eb66bb952f16afa9634081a820dea8e3fac96.jpg@240w_240h_1c_1s.webp",
            keywords: ["田所浩二", "李田所", "HOMO", "homo", "食雪", "114514", "1919810", "逸一时", "误一世"],
            followings: [114514]
        },
        {
            displayName: "光·遇",
            displayIcon: "https://i2.hdslb.com/bfs/face/6a32a6914c6d4c95cd2bbe5bf1ac3c11aa5c763e.jpg@240w_240h_1c_1s.webp",
            keywords: ["光·遇", "#光·遇#", "光遇", "#SKY光遇#"],
            followings: [211700578]
        },
        {
            displayName: "熊出没",
            displayIcon: "https://i1.hdslb.com/bfs/face/10b719a57ed090d091963f63333658fb3f477d50.jpg@240w_240h_1c_1s.webp",
            keywords: ["熊出没", "BoonieBears"],
            followings: [14373586]
        },
        {
            displayName: "喜灰",
            displayIcon: "https://i2.hdslb.com/bfs/face/09730be918be0e59d72e2557444b4da09e276370.jpg@240w_240h_1c_1s.webp",
            keywords: ["喜羊羊", "灰太狼", "小灰灰", "#喜羊羊与灰太狼#"],
            followings: [31832612,1091253726,523637998]
        },
        {
            displayName: "Phigros",
            displayIcon: "https://i0.hdslb.com/bfs/face/b3dd022d03c32a91be673d195a9f60c46217c406.jpg@240w_240h_1c_1s.webp",
            keywords: ["Phigros", "#Phigros#", "#鸽游#" , "#Pigeon Games#"],
            followings: [414149787]
        },







		{
			displayName: "抽奖",
			displayIcon: "🎁",
			keywords: ["互动抽奖", "转发本条动态"],
		},
		{
			displayName: "原神",
			displayIcon: "https://i0.hdslb.com/bfs/face/d2a95376140fb1e5efbcbed70ef62891a3e5284f.jpg@100w_100h.webp",
			keywords: ["互动抽奖 #原神", "#原神", "原神", "芙宁娜", "白术", "赛诺", "神里绫人", "神里绫华", "夏洛蒂", "珊瑚宫", "九条裟罗", "班尼特", "夜阑", "那维莱特", "枫原万叶", "万叶", "钟离", "纳西妲", "香菱", "八重神子", "久岐忍", "菲谢尔", "艾尔海森", "胡桃", "林尼", "达达利亚", "提纳里", "宵宫", "莫娜", "甘雨", "罗莎莉亚", "刻晴", "九条裟罗", "温迪", "阿贝多", "云堇", "芭芭拉", "迪卢克", "烟绯", "重云", "雷泽", "凝光", "坎蒂丝", "辛焱"],
			followings: [401742377] // 原神官方号的 UID
		},
		{
			displayName: "崩坏3",
			displayIcon: "https://i0.hdslb.com/bfs/face/f861b2ff49d2bb996ec5fd05ba7a1eeb320dbf7b.jpg@100w_100h.webp",
			keywords: ["互动抽奖 #崩坏3", "#崩坏3", "崩坏3", "德丽莎", "温蒂"],
			followings: [27534330] // 崩坏3官方号的 UID
		},
		{
			displayName: "崩坏星穹铁道",
			displayIcon: "https://i0.hdslb.com/bfs/face/57b6e8c16b909a49bfc8d8394d946f908cabe728.jpg@100w_100h.webp",
			keywords: ["互动抽奖 #崩坏星穹铁道", "#崩坏星穹铁道", "#星穹铁道", "崩坏星穹铁道", "星铁", "崩铁"],
			followings: [1340190821] // 崩坏星穹铁道官方号的 UID
		},
		{
			displayName: "绝区零",
			displayIcon: "https://i0.hdslb.com/bfs/face/049b47e0e73fc5cc1564343bb0aeacce8ae8e6f8.jpg@100w_100h.webp",
			keywords: ["互动抽奖 #绝区零", "#绝区零", "#绝区零公测", "绝区零"],
			followings: [1636034895] // 绝区零官方号的 UID
		},
		{
			displayName: "鸣潮",
			displayIcon: "https://i0.hdslb.com/bfs/face/0abd6b9df304334a9388e968740b5b9b7d1a84be.jpg@100w_100h.webp",
			keywords: ["互动抽奖 #鸣潮", "#鸣潮", "#鸣潮长离", "鸣潮"],
			followings: [1955897084] // 鸣潮官方号的 UID
		},
		{
			displayName: "战双帕弥什",
			displayIcon: "https://i0.hdslb.com/bfs/face/29d40886bc649fd2b81793c17077728820d411b6.jpg@100w_100h.webp",
			keywords: ["互动抽奖 #战双帕弥什", "#战双帕弥什", "#剪身成蝶", "战双帕弥什"],
			followings: [382651856] // 战双帕弥什官方号的 UID
		},
		{
			displayName: "少女前线",
			displayIcon: "https://i0.hdslb.com/bfs/face/667e4b1ca39300bff0672774f1980c02c2353b11.jpg@100w_100h.webp",
			keywords: ["互动抽奖 #少女前线", "#少女前线", "#零电荷", "少女前线"],
			followings: [
				32472953, // 少女前线官方号的 UID
				266017919 // 少女前线后勤组的 UID
			]
		},
		{
			displayName: "少女前线2",
			displayIcon: "https://i0.hdslb.com/bfs/face/427f8dde32e18465a723f7c7216340c2013d595d.jpg@100w_100h.webp",
			keywords: ["互动抽奖 #少前2", "#少前2#", "少女前线2", "少前2"],
			followings: [697654195] // 少女前线2官方号的 UID
		},
		{
			displayName: "明日方舟",
			displayIcon: "https://i0.hdslb.com/bfs/face/d4005a0f9b898d8bb049caf9c6355f8e8f772a8f.jpg@100w_100h.webp",
			keywords: ["明日方舟", "#明日方舟"],
			followings: [161775300] // 明日方舟官方号的 UID
		},
		{
			displayName: "碧蓝航线",
			displayIcon: "https://i0.hdslb.com/bfs/face/1fd5b43d5f619e6df8c8adcf13c962a3e80ee971.jpg@100w_100h.webp",
			keywords: ["碧蓝航线", "#碧蓝航线", "#舰船新增#"],
			followings: [233114659] // 碧蓝航线官方号的 UID
		},
		{
			displayName: "VTuber",
			displayIcon: "https://i0.hdslb.com/bfs/face/d399d6f5cf7943a996ae96999ba3e6ae2a2988de.jpg@100w_100h.webp",
			keywords: ["雪蓮", "塔菲", "七海", "草莓猫", "嘉然", "乃琳", "珈乐", "贝拉"],
			followings: [
				1437582453, // 東雪蓮Official
				1265680561, // 永雏塔菲
				434334701, // 七海Nana7mi
				1210816252, // 草莓猫Taffy
				672328094, // 嘉然今天吃什么
				672342685, // 乃琳Queen
				351609538, // 珈乐Carol
				672346917, // 向晚大魔王
				672353429, // 贝拉kira
			]
		},
		{
			displayName: "Asoul",
			displayIcon: "https://i0.hdslb.com/bfs/face/43b21998da8e7e210340333f46d4e2ae7ec046eb.jpg@100w_100h.webp",
			keywords: ["@A-SOUL_Official", "#A_SOUL#"],
			followings: [
				703007996, // Asoul
				547510303, // Asoul二创计画
				672328094, // 嘉然今天吃什么
				672342685, // 乃琳Queen
				351609538, // 珈乐Carol
				672346917, // 向晚大魔王
				672353429, // 贝拉kira
			]
		},
		{
			displayName: "王者荣耀",
			displayIcon: "https://i0.hdslb.com/bfs/face/effbafff589a27f02148d15bca7e97031a31d772.jpg@100w_100h.webp",
			keywords: ["互动抽奖 #王者荣耀", "#王者荣耀", "王者荣耀"],
			followings: [
				57863910, // 王者荣耀
				392836434, // 哔哩哔哩王者荣耀赛事
			]
		},
		{
			displayName: "三国杀",
			displayIcon: "https://i0.hdslb.com/bfs/face/fe2e1a6e3dc702a6c91378e096ef37ca71bf4629.jpg@100w_100h.webp",
			keywords: ["互动抽奖 #三国杀", "#三国杀", "三国杀", "#2023三国杀"],
			followings: [1254932367] // 三国杀十周年官方号的 UID
		},
		{
			displayName: "Minecraft",
			displayIcon: "https://i0.hdslb.com/bfs/face/c5578966c447a70edf831bbf7e522b7be6090fea.jpg@100w_100h.webp",
			keywords: ["我的世界", "minecraft", "#我的世界", "我的世界拜年祭", "MCBBS", "我的世界中文论坛", "MC玩家"],
			followings: [
				43310262, // 我的世界官方号的 UID
				39914211, // 我的世界中文论坛(MCBBS)官方号的 UID
			]
		},
		{
			displayName: "迷你世界",
			displayIcon: "https://i0.hdslb.com/bfs/face/a7591e5e0278aafb76cc083b11ca5dd46f049420.jpg@100w_100h.webp",
			keywords: ["mnsj", "迷你世界", "miniworld", "#迷你世界", "迷你世界拜年祭"],
			followings: [
				470935187, // 迷你世界官方号的 UID
			]
		},
		{
			displayName: "初生科技",
			displayIcon: "https://i0.hdslb.com/bfs/face/eb4c7bbea813eed3a92ee194809d85715e6a7659.jpg@100w_100h.webp",
			// [禁止骂我！禁止拉黑！.jpg]
			keywords: ["易语言", "编程猫", "scratch", "破解", "ramos", "winpe", "bsod", "memz", "MEMZ", "WindowsCE", "下崽器", "aero", "setup", "DWM", "CmzPrep", "虚拟机", "VMWare", "希沃白板", "Ubuntu PE", "PowerShell", "gnu/linux"],
			followings: [
				//- 组1/关键词:system -//
				493998035, // SYSTEM-RAMOS-ZDY
				702028797, // JERRY-SYSTEM
				631731585, // system-bootmgr-L
				501355555, // MS-SYSTEM
				1865727084, // SYSTEM-WinPE-CHD
				1162296488, // System3206
				1531948091, // SYSTEM_Win11_RE
				392697653, // System-i386
				313342814, // SYSTEM-GREE-GZN
				1546428456, // SYSTEM-WIN-EDGE
				631731585, // system-bootmgr-L
				501355555, // MS-SYSTEM
				2043088162, // SYSTEM-WINNT-ZDY
				601270898, // 601270898
				1531948091, // SYSTEM_Win11_RE
				3493083238894137, // 井_SYSTEM_火车迷
				1666981688, // System-Installer
				1546428456, // SYSTEM-WIN-24H2
				1162296488, // system4831
				1886348413, // SYSTEM-MEMZ-CAO
				1827307028, // SYSTEM_小影
				1744631001, // SYSTEM-SUYI-WIN
				699804375, // SYSTEM-MSDOS-ZDY
				3493298725456171, // SYSTEM-WIN-BY
				1431997122, // SYSTEM-Start
				669094468, // SYSTEM-TANGYUAN
				703051574, // SYSTEM-OOBE
				604076432, // SYSTEM-WIN32-PE
				//- 组2/关键词:bsod -//
				451475014, // STR-BSOD
				1511907771, // MEMZ-BSOD
				1975308950, // BSOD-MEMZ
				397847418, // 蓝屏钙BSOD
				1776025003, // 蓝瓶钙BSoD
				1007224506, // EXPLORER-BSOD
				1175873768, // BSOD-Winme
				2032637936, // BSOD-SYSTEM
				1933399514, // win11_BSOD
				1641461034, // DEEPIN_BSOD2_CMD
				3493293100894309, // SYSTEM-BSOD-ZFS
				1204666655, // 草方块BSOD
				1124857662, // Wininit_BSOD
				1306710323, // SHITOU_BSOD
				10828819, // BSoD正在玩
				1776025003, // 蓝瓶钙BSoD
				1266839139, // JHR_BSOD_MIMZ
				3461566410262700, // Windows_BSOD
				1061621085, // Vista-BSOD
				1007224506, // EXPLORER-BSOD
				1175873768, // BSOD-Winme
				665360141, // 微飞的BSOD
				3461578091399948, // Silversoft_BSOD
				1933399514, // win11_BSOD
				2043170695, // SYSTEM-BSOD-MEMZ
				//- 组3/关键词:memz -//
				21927744, // 360MEMZ
				1353783215, // MEMZ-Chrome
				412777837, // 注册表MEMZ
				457692234, // 奇怪的MEMZ
				298993710, // 注册表编辑器MEMZ
				413269076, // Cmd_MEMZ
				649846967, // Win7MEMZ-BX
				498912953, // AMD_MEMZ
				390483853, // 炒鸡360MEMZ
				362451533, // NC_Memz
				351258144, // 豆沙包MEMZ
				104657830, // 尚宜鼎MEMZ
				365129777, // DrAMA-MEMZ
				378430387, // 小李MEMZ
				392672572, // 123MEMZ
				1465447323, // 爱搞机的MEMZ
				1585476, // 23胡彬MEMZ
				1151195812, // 开朗的冰人MEMZ
				1089892994, // MEMZ-Windows11
				//- 组5/关键词:Aero -//
				435972058, // WindowsAero毛玻璃
				1452376557, // 没有Aero就没有灵魂
				1911529131, // Aero8m
				1321946754, // 没有Aero的Windows7
				//- 组5/关键词:setup -//
				589370259, // setup-windows安装
				2050076822, // Windows-Setup
				1549141274, // system-setup
				692755897, // Setup-Official
				483574120, // setup安装程序
				1031408618, // Deewin-Setup
				671918906, // win95setup
				//- 组6/关键词:Start -//
				524501321, // Start-hs888
				2030178992, // Start-BME
				//- 组7/关键词:Linux -//
				1933598970, // 白羊Linux
				603375808, // linux265
				1984449284, // Linux粉
				1093084152, // BSD-Linux
				67247219, // Linux_Newbie
				//- 组8/关键词:Windows -//
				1921195852, // Windows之家
				621857141, // Windows哥
				612743845, // 浩瀚星晨win
				1050145612, // windows11不会出
				3493092688661431, // 炸了的win10
				1601172780, // Windows毛玻璃解说233
				353290736, // Win11的粉丝_offical
				24821321, // Windows系统追更狂魔
				1833642992, // Win32_WinSxS_sys
				276817988, // 无人所知的windows12
				1613384176, // Aero-Windows311
				483675256, // Windows功能
				2009792251, // Windows-Lover
				3493125863508026, // 失败的Windows
				696040999, // Lemon_x64_Win11
				1225952698, // 叶一程哥哥win10
				601259909, // 星晨大海win_Acpn
				605857877, // 卖蓝屏钙的Win11
				1736839855, // SYSTEM-D-WIN
				3494364330330273, // 一只野生的win31
				1375459514, // 开心的Windows
				1340261135, // windows1球_启动中
				578278851, // 星晨天际win
				582129140, // Windows11-PPT
				1462538741, // 很屑的windows114514
				26284934, // win_小火龙
				1965090607, // 可乐Windows
				261016792, // Win10HOME
				1751934902, // Win-PowerShell
				248556377, // Win_Update
				2108200476, // Win_Threshold-10
				2017167096, // 喜欢Win8的MacPro
				694139497, // Windows_Tester_2
				1119522579, // 爱蓝屏的win10
				1724541085, // SYSTEM--win7
				1628906682, // 被win11吃掉的磁贴
				1509347075, // Windows12MC
				1261767230, // 一只屑win10
				1605910926, // -Windows-11-
				1326423111, // Win-Flash-Pro
				1497262975, // 不解风情のWin11
				1604146839, // windows田字牌电脑
				1463163459, // Windows81Metro
				687996269, // 喜欢Windows8的架空放送
				3493119670618871, // 小锅说Windows
				483345456, // Win10家庭版
				2101678528, // OS_Windows11_lzn
				1729734602, // bug32_Windows
				1222118214, // windows11电脑的cmd
				503289010, // Windows7の理系を行う
				403527839, // windows核心编程
				435227174, // Win10Win10是个屑
				509902447, // 爱折腾的Windows
				35833798, // Windows710
				3493133778160480, // SYSTEM-WIN11-PE
				169290582, // VMware的win7
				1385242199, // MS-SYSTEM-WIN
				383322806, // Win10Pro
				3546554428295778, // SYSTEM-WIN-DCR
				1283206843, // Windows被砍掉的Aero
				1935801783, // Windows软件倒腾师
				392012144, // 一只win8球
				1338015717, // windows_system
				1187162171, // Setup-Win11
				1009063496, // Windows的Windows
				3493118152280841, // mcdos-windows
				435462593, // 唐狐WIN
				1065194305, // 彩虹猫-win11
				//- 组9/关键词:KDE -//
				2008726064, // kde-yyds
				1989712487, // SYSTEM-WIN11-KDE
				//- 组10/关键词:Ubuntu -//
				668421393, // Ubuntu-PE
				586347926, // memz-ubuntu
				//- 自定义组/依照个人判断 -//
				1157923020, // 仗义的老班长
				401094700, // 旮沓曼_gt428
				356882513, // 被重组吃掉的虚拟桌面
				1151325757, // SYSTEM-OPS-LJY
				1304244190, // System-NBNB
				504179884, // MYB_CKLS
				1776456802, // 奇怪的MEMZ的小号
				1534842751, // 爱WinPE的MEMZ
				2112060594, // WINPE-SYSTEM
				1439352366, // SYSTEM-WINPE-EXE
				678414222, // Windows-regedit
				505199229, // SYSTEM_PHILI
				652188355, // 一个windows爱好者
				1863175083, // 半不了世的空城
				1736202379, // 胡桃玩VM
				1322183332, // WindowsCEMEMZ新账号
				414666753, // 桌面窗口管理器_DWM
				698760287, // 出星海wrcjs_sp4
				307432672, // 花l火
				3493108908034540, // S-1-5-21-1726115
				1158046953, // VistaChrome108
				727892489, // Windows2003R2
				1243577821, // hyq061221
				1330313497, // alan-CRL
				1190936866, // Qt小徐
				507658814, // 镜靛openforge
				310265955, // Ticki-Pigeon
				357779530, // 空巢老KriaStans
				456061336, // He1lo_Wor1d
				590491558, // Technology_him
				1948479703, // SYSTEM-Image-WIM
				3494362556140426, // start-windows
				1801064268, // 张星华-official
				390148573, // 西瓜xg_
				3461562834618602, // 辰东帅逼版
				1093536899, // 软萌可爱的洛神
				440662801, // 爱玩电脑的特兰克斯
				1029196202, // 杀猴专业户
				1283468503, // WinToGo-LZP
				3493105315613465, // van-豆射手
				42494833, // Happymax1212
				1015730693, // 玩了114514分钟mc
				484165196, // 351Workshop
				1624520869, // Lime青柠_QingNing
				1834260927, // Mo_Network
				62677028, // LoadingPoint
				696897486, // Mono也是墨诺喵
				1308669589, // 殇げNyrMu
				316481254, // 旗界汽车
				513312081, // Opteron64
				413043448, // 小杨聊科技
				1499173387, // 下一终端
				76868264, // 吃不到筷子的鼠
				619829471, // 小宇_ERain
				604251988, // 我可真是个添柴
				20567718, // So_Y0ung
				3493140700859270, // 中文名亦好听
				1040308682, // 战王爱分享
				37064895, // 小锋学长生活大爆炸
				1268760897, // 屑の早茶光
				384650704, // 91047971901_bili
				1947070041, // 80691808980
				1462538741, // MC-Windows114514
				547326701, // 游戏攻资君
				1572064888, // 波波yr
				1965857981, // muci_nn
				1347936870, // 托尔普森
				3546589083732470, // 刘哥gametime做游戏
				1969160969, // SR思锐Official
				1868794422, // 僵尸是萌新
				1500275808, // Minecraft729 WeChat:summoniron_golem QQ:3531622583 -来源:用户简介
			],
			blacklist: [
				//- 组1/关键词:system -//
				493998035, // SYSTEM-RAMOS-ZDY
				702028797, // JERRY-SYSTEM
				631731585, // system-bootmgr-L
				501355555, // MS-SYSTEM
				1865727084, // SYSTEM-WinPE-CHD
				1162296488, // System3206
				1531948091, // SYSTEM_Win11_RE
				392697653, // System-i386
				313342814, // SYSTEM-GREE-GZN
				1546428456, // SYSTEM-WIN-EDGE
				631731585, // system-bootmgr-L
				501355555, // MS-SYSTEM
				2043088162, // SYSTEM-WINNT-ZDY
				601270898, // 601270898
				1531948091, // SYSTEM_Win11_RE
				3493083238894137, // 井_SYSTEM_火车迷
				1666981688, // System-Installer
				1546428456, // SYSTEM-WIN-24H2
				1162296488, // system4831
				1886348413, // SYSTEM-MEMZ-CAO
				1827307028, // SYSTEM_小影
				1744631001, // SYSTEM-SUYI-WIN
				699804375, // SYSTEM-MSDOS-ZDY
				3493298725456171, // SYSTEM-WIN-BY
				1431997122, // SYSTEM-Start
				669094468, // SYSTEM-TANGYUAN
				703051574, // SYSTEM-OOBE
				604076432, // SYSTEM-WIN32-PE
				//- 组2/关键词:bsod -//
				451475014, // STR-BSOD
				1511907771, // MEMZ-BSOD
				1975308950, // BSOD-MEMZ
				397847418, // 蓝屏钙BSOD
				1776025003, // 蓝瓶钙BSoD
				1007224506, // EXPLORER-BSOD
				1175873768, // BSOD-Winme
				2032637936, // BSOD-SYSTEM
				1933399514, // win11_BSOD
				1641461034, // DEEPIN_BSOD2_CMD
				3493293100894309, // SYSTEM-BSOD-ZFS
				1204666655, // 草方块BSOD
				1124857662, // Wininit_BSOD
				1306710323, // SHITOU_BSOD
				10828819, // BSoD正在玩
				1776025003, // 蓝瓶钙BSoD
				1266839139, // JHR_BSOD_MIMZ
				3461566410262700, // Windows_BSOD
				1061621085, // Vista-BSOD
				1007224506, // EXPLORER-BSOD
				1175873768, // BSOD-Winme
				665360141, // 微飞的BSOD
				3461578091399948, // Silversoft_BSOD
				1933399514, // win11_BSOD
				2043170695, // SYSTEM-BSOD-MEMZ
				//- 组3/关键词:memz -//
				21927744, // 360MEMZ
				1353783215, // MEMZ-Chrome
				412777837, // 注册表MEMZ
				457692234, // 奇怪的MEMZ
				298993710, // 注册表编辑器MEMZ
				413269076, // Cmd_MEMZ
				649846967, // Win7MEMZ-BX
				498912953, // AMD_MEMZ
				390483853, // 炒鸡360MEMZ
				362451533, // NC_Memz
				351258144, // 豆沙包MEMZ
				104657830, // 尚宜鼎MEMZ
				365129777, // DrAMA-MEMZ
				378430387, // 小李MEMZ
				392672572, // 123MEMZ
				1465447323, // 爱搞机的MEMZ
				1585476, // 23胡彬MEMZ
				1151195812, // 开朗的冰人MEMZ
				1089892994, // MEMZ-Windows11
				//- 组5/关键词:Aero -//
				435972058, // WindowsAero毛玻璃
				1452376557, // 没有Aero就没有灵魂
				1911529131, // Aero8m
				1321946754, // 没有Aero的Windows7
				//- 组5/关键词:setup -//
				589370259, // setup-windows安装
				2050076822, // Windows-Setup
				1549141274, // system-setup
				692755897, // Setup-Official
				483574120, // setup安装程序
				1031408618, // Deewin-Setup
				671918906, // win95setup
				//- 组6/关键词:Start -//
				524501321, // Start-hs888
				2030178992, // Start-BME
				//- 组7/关键词:Linux -//
				1933598970, // 白羊Linux
				603375808, // linux265
				1984449284, // Linux粉
				1093084152, // BSD-Linux
				67247219, // Linux_Newbie
				//- 组8/关键词:Windows -//
				1921195852, // Windows之家
				621857141, // Windows哥
				612743845, // 浩瀚星晨win
				1050145612, // windows11不会出
				3493092688661431, // 炸了的win10
				1601172780, // Windows毛玻璃解说233
				353290736, // Win11的粉丝_offical
				24821321, // Windows系统追更狂魔
				1833642992, // Win32_WinSxS_sys
				276817988, // 无人所知的windows12
				1613384176, // Aero-Windows311
				483675256, // Windows功能
				2009792251, // Windows-Lover
				3493125863508026, // 失败的Windows
				696040999, // Lemon_x64_Win11
				1225952698, // 叶一程哥哥win10
				601259909, // 星晨大海win_Acpn
				605857877, // 卖蓝屏钙的Win11
				1736839855, // SYSTEM-D-WIN
				3494364330330273, // 一只野生的win31
				1375459514, // 开心的Windows
				1340261135, // windows1球_启动中
				578278851, // 星晨天际win
				582129140, // Windows11-PPT
				1462538741, // 很屑的windows114514
				26284934, // win_小火龙
				1965090607, // 可乐Windows
				261016792, // Win10HOME
				1751934902, // Win-PowerShell
				248556377, // Win_Update
				2108200476, // Win_Threshold-10
				2017167096, // 喜欢Win8的MacPro
				694139497, // Windows_Tester_2
				1119522579, // 爱蓝屏的win10
				1724541085, // SYSTEM--win7
				1628906682, // 被win11吃掉的磁贴
				1509347075, // Windows12MC
				1261767230, // 一只屑win10
				1605910926, // -Windows-11-
				1326423111, // Win-Flash-Pro
				1497262975, // 不解风情のWin11
				1604146839, // windows田字牌电脑
				1463163459, // Windows81Metro
				687996269, // 喜欢Windows8的架空放送
				3493119670618871, // 小锅说Windows
				483345456, // Win10家庭版
				2101678528, // OS_Windows11_lzn
				1729734602, // bug32_Windows
				1222118214, // windows11电脑的cmd
				503289010, // Windows7の理系を行う
				403527839, // windows核心编程
				435227174, // Win10Win10是个屑
				509902447, // 爱折腾的Windows
				35833798, // Windows710
				3493133778160480, // SYSTEM-WIN11-PE
				169290582, // VMware的win7
				1385242199, // MS-SYSTEM-WIN
				383322806, // Win10Pro
				3546554428295778, // SYSTEM-WIN-DCR
				1283206843, // Windows被砍掉的Aero
				1935801783, // Windows软件倒腾师
				392012144, // 一只win8球
				1338015717, // windows_system
				1187162171, // Setup-Win11
				1009063496, // Windows的Windows
				3493118152280841, // mcdos-windows
				435462593, // 唐狐WIN
				1065194305, // 彩虹猫-win11
				//- 组9/关键词:KDE -//
				2008726064, // kde-yyds
				1989712487, // SYSTEM-WIN11-KDE
				//- 组10/关键词:Ubuntu -//
				668421393, // Ubuntu-PE
				586347926, // memz-ubuntu
				//- 自定义组/依照个人判断 -//
				1157923020, // 仗义的老班长
				401094700, // 旮沓曼_gt428
				356882513, // 被重组吃掉的虚拟桌面
				1151325757, // SYSTEM-OPS-LJY
				1304244190, // System-NBNB
				504179884, // MYB_CKLS
				1776456802, // 奇怪的MEMZ的小号
				1534842751, // 爱WinPE的MEMZ
				2112060594, // WINPE-SYSTEM
				1439352366, // SYSTEM-WINPE-EXE
				678414222, // Windows-regedit
				505199229, // SYSTEM_PHILI
				652188355, // 一个windows爱好者
				1863175083, // 半不了世的空城
				1736202379, // 胡桃玩VM
				1322183332, // WindowsCEMEMZ新账号
				414666753, // 桌面窗口管理器_DWM
				698760287, // 出星海wrcjs_sp4
				307432672, // 花l火
				3493108908034540, // S-1-5-21-1726115
				1158046953, // VistaChrome108
				727892489, // Windows2003R2
				1243577821, // hyq061221
				1330313497, // alan-CRL
				1190936866, // Qt小徐
				507658814, // 镜靛openforge
				310265955, // Ticki-Pigeon
				357779530, // 空巢老KriaStans
				456061336, // He1lo_Wor1d
				590491558, // Technology_him
				1948479703, // SYSTEM-Image-WIM
				3494362556140426, // start-windows
				1801064268, // 张星华-official
				390148573, // 西瓜xg_
				3461562834618602, // 辰东帅逼版
				1093536899, // 软萌可爱的洛神
				440662801, // 爱玩电脑的特兰克斯
				1029196202, // 杀猴专业户
				1283468503, // WinToGo-LZP
				3493105315613465, // van-豆射手
				42494833, // Happymax1212
				1015730693, // 玩了114514分钟mc
				484165196, // 351Workshop
				1624520869, // Lime青柠_QingNing
				1834260927, // Mo_Network
				62677028, // LoadingPoint
				696897486, // Mono也是墨诺喵
				1308669589, // 殇げNyrMu
				316481254, // 旗界汽车
				513312081, // Opteron64
				413043448, // 小杨聊科技
				1499173387, // 下一终端
				76868264, // 吃不到筷子的鼠
				619829471, // 小宇_ERain
				604251988, // 我可真是个添柴
				20567718, // So_Y0ung
				3493140700859270, // 中文名亦好听
				1040308682, // 战王爱分享
				37064895, // 小锋学长生活大爆炸
				1268760897, // 屑の早茶光
				384650704, // 91047971901_bili
				1947070041, // 80691808980
				1462538741, // MC-Windows114514
				547326701, // 游戏攻资君
				1572064888, // 波波yr
				1965857981, // muci_nn
				1347936870, // 托尔普森
				3546589083732470, // 刘哥gametime做游戏
				1969160969, // SR思锐Official
				1868794422, // 僵尸是萌新
				1500275808, // Minecraft729 WeChat:summoniron_golem QQ:3531622583 -来源:用户简介
			]
		},
		{
			displayName: "穿越火线",
			displayIcon: "https://cf.qq.com/favicon.ico",
			keywords: ["穿越火线"],
			followings: [
				315554376, // 穿越火线官方号的 UID
				204120111, // CF农哥吊打小怪兽
				1083400219, // cf孙某
				398597510, // CF教父
				456180476, // CF猫七
				33281681, // CF威廉I黑化版
				440017413, // 穿越火线兴兴
				474595618, // 穿越火线赛事
			]
		},
		{
			displayName: "地下城与勇士",
			displayIcon: "data:image/x-icon;base64,AAABAAEAMDAAAAEAIACoJQAAFgAAACgAAAAwAAAAYAAAAAEAIAAAAAAAACQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+AAAA5wAAAP0AAAD9BwcH/QQEBPMAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADQAAABiAAAAAAAAAAAWFxn1ODs//zY6Pv8mKSz/Fhca/w4QEP8AAACtAAAAAAAAAAAAAAAAAAAAAAQFBBQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYAAAA1QoLDf8NDxD/AAAAnQAAAJNhaHD/i5Wi/3iAjP+Fj5n/Jikt/woND/8REhT/AAAAmwAAACYAAAAAAAAA7wYHCP8BAQHZAAAAOgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKhITFe2Ok5v/bHB4/wAAAP8AAAD/AAAA/zE2O/9+iJj/aHF+/2Fpd/+HkJ3/PkFG/wAAAP8MDRD/EhMW/wAAAP8dICH9RkpQ/yYqL/8MDQ//BQUG/wQEBN8AAAAsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALC8y+a+4xf/w+f//zNPe/0RGTf9QVFv/d32I/46Yp/98hZX/cHiH/2t0gv9sdIL/cHiF/1NZX/8tMDX/Fxke/ystMv97gov/eH+H/11kav9HS1L/ICIn/wwNDv8AAADLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeMTM2++Ho9f/Ey9P/uL7I/7fAzf+zvcr/qrPC/4mSof9vd4X/aXJ//2hvff9ianf/aXGA/4WPnP+Bi5f/cnmE/3yDjv9tdH7/VVxl/2Vsdf94f4j/a3N8/x0gJf8AAADnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAaAAAAPkAAAD/RkhM/8jO1/+0u8f/naSw/5ujr/+Wnqr/iZOh/4WNnv98hZb/c32N/2p0g/9ocX//YGl2/1Vdaf9sc3//gYmV/2JpdP9OVV7/TlVe/2Jpdf+AiJL/aXB4/ywwOf8kJi3/AgECzwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQFGOTo7/wkLDP97foL/6Ons/7G2wv+nrrj/rbO9/6Wuuf+dpbH/goqX/3qCkP9vd4X/ZW17/1hjcf9WX2z/WmJu/19odf9aYW7/Vl1p/1JaZP9RWGH/VVpi/1pga/93f4z/Z297/x0fKP8yNUH/LjE4/wkJCvEAAACBAwID8wQEBLcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAxFRUX58/X2/7zCx//o7fP/1trh/77DzP/Cx8//tbrD/3iBkv9qd4r/dIGX/3OAlf94h5v/cniF/2ltff9laHb/Y2Rq/0lPV/8+RE//REpT/1NbZf9UXGb/UFZg/1pgbP9iaXb/iJKf/4iPm/8vMjr/Gx0m/xcYHf8ICAj/GRod/xMUF/8CAgKTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICAqfEw8P//////+7x+P/Q1Nz/1Nje/8/U2v+epbP/f4uj/7C/z/+Xorn/T1Zj/09XZf+Aj6r/j6za/6LB5/+Vs9j/i6XM/6S0z/+Xo7f/b3mL/0hRXP9SW2X/Xmh0/11nd/9pc4X/kpyq/7bBz/+Nl6b/PUNI/w0OEP9dY2//Yml0/xcZHf8LDA3/AwIDbAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAEBAVCHhob//////+Ll6v/l6Oz/2N3k/6auu/+LmK7/1d7y/6Onp/81NDP/AAAA/z8+Pv8pKSn/AxQv/xs4T/8oR1z/FjRd/x8rT/9RV2P/UVNa/xkeJ/8ABAv/Jywz/zk+RP8WGR//Vl1q/3V/jf+krrz/oKm2/3+Hlf+Cjp7/go2c/1pha/8WFxv/CAgJ/wICAkoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAA6Ojn5//////X3+v/o7PH/xs7Z/3+Nrf/Z4fT/oKOm/xUTEf8AAAD/BwcH/8PDw/+TkY3/NzAp/1hRS/+xqqT/kYqH/x4dHv8AAAD/EhAN/xIRD/86ODj/WFdX/2ZmY/9MS0j/BwcI/wQFB/9ARUn/l6Cv/4+Zqv+HkJ3/eYOR/4aRof9gZnD/Dg4P/wICAVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAOukpKX//////+/x9v/m6/P/maC1/7rC2P+lsLn/AAAA/yUkIv+foKD/HR0d/15eXv+ysrL/kZGR/6uqqv+traz/2NjX/83My/+cnJz/tbW1/5KSkv+nqKf/tbW1/0JCQv9DQ0T/CgoK/wAAAP85PkT/qLHD/6Cpt/+Wnqj/lJyo/4eSov+Ll6f/ExUX9QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAACgoJ13Fzdv//////9vf7//3////JzNP/YGaH/7Tg//9Wfab/BgIC/wAAAP89Ojn/x8fG/3+AgP92dnf/f39//2lpaf+YmZr/ysvM/zEyNP89Pj7/enl3/5COjP+Rj43/jY2M/5ycnP8IBwP/AAAA/wAAAP9ia3r/iJCd/4mQmP/DydP/t73G/6Cpt/9CSFH/AgID/wAAAEYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOTk49f//////////7PD2//v8/P+LiZL/jaTE/2me1/9je6P/OF6J/xknOv8EBQX/STku/83Fv/+6vLv/iIeH/wAAAP9hW1T/mY+J/wMAAP8AAAD/AAAA/wAAAP86ODX/LSsk/2dlZv8mKDL/ZGNd/3Fycv89SFv/hJCi/6ivvP+ttcP/wMbQ/7nBzP8nKSv/AAAA/wsMDfkAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC0tKNtDQzvdMDIz+////////////////+bl6P91fZH/cKfn/1pujP+7r6H/w8vP/3aUr/91pcf/GUhp/0ZPWv+8s6//EgsH/x0hKP+dp7P/mqSs/4qUn/+BjZf/Y32Z/1h9p/9acJD/NzRB/5GRkv+VlrT/TE1k/87O0v+trqr/QU5j/5Gan/99gH3/h46a/9nh7f+Xnqr/BAUH/wgKDP8LDA3/BAQF+wAAACYAAAAAAAAAAAAAAAAAAABKV1dR/dTU1v/NzdL/QUA5/3l8ff/R0s//0tLG/6ijlv9TZYP/Km/T/2Z8mP+ck5n/eXCP/7y1qf+fvMP/T8P//5fG5P+FlaX/ACA+/6WgoP+gtMT/Xp/B/zdeqP9ckdT/isXp/2GDnf9geJf/cq7i/yNKZ//Rx7P/enqZ/wAADP+0tLL/q6ui/4eGlP/Nysv/cHR0/3yGl/+nr7T/TU9K/wAAAP8AAAb/ExYb/wQFBc0AAAAAAAAAAAAAAABTU0370NHf/yMjOv9RUXH/zs3N/0ZHQf+YmaD/jY2g/5qZn/+xs7D/e46b/2t+e/+gn67/AAFF/4h/kv+9sJ//J4/f/3bP///Eysb/gJOb/8fDyf+1tbj/kJqT/5meqf97kJv/n7Cp/7WmqP+AgIv/AEaC/05qdf/As7X/09Ps/zY4f/8MDDz//////2Vklf82NX3/vLy7/11gW/+jo6T/xcXH/6yrnf9NTUL/BgoP/wAAAPsAAAAAAAAAAAAAAAB4eG//293s/zo8dP8AACH/RkZ6//////+FhqP/AAA6/yQngf9WVJH/hn6n/8/O1f//////Jid0/yMgev+8sa7/OHKU/yFhkf+dko///fz5/zw+X/8mJVT/zMrh/6Cgv/+XkrL/iYWl/1hRpP+go7D/JU1E//r37P9mYbn/AANw/0pMo/8AAEv/RUeF/8vN6P8AAGD/iYip/+/v9P8VFW//CAlG/4aGrP/MzeD/t7ix/xYWEf8AAAAqAAAAAAAAAAAAAACXYGBW+7m5x/+iosf/DQ1c/01Ojf+Mjbb/Fxlz/56gx/96fK3/ISSL/xQTZ/+xstD/ZWam/wAAZP/ExeD/q6Om/9bOxf+lpbz/NDVo/3R2q/89Qoz/cXSk/zA0fv8tMZL/AABs/2turP/Iysj/ycTG/2Ngqv+Bg7n/qarQ/5OTwf9gYab/Cgtt/0RGm/8MC23/bW6i////9//R0OD/Q0KL/wAAQv8WF2H/l5fK/7e5uf8WFg/jAAAAAAAAAAAAAAAAAAAAdHp5Wf//////v8Do/yEhc/+LjcL/Ki6a/3J2vP+andL/2N3y/zw9jf9hYqn/l5rM/wAAWP+oqdD/ZWGk/3JurP/P0uf/Jyd1/zAwhf84PZb/MjqR/4yRuf81OJz/ISag/6So1v9cXan/ami0/ysui/99f7f/qqrS/zs6i/+srtP/g4bC/8/Q5f9XWKT/qKrS/7Cww//m5/P/l5rR/wAAVv+cnML/nZ7A/+Lj9f+AgHj/AAAAAAAAAAAICAa3mpqN/7i65f9JSoz/QEGM/zo8mP+ChcH/DBGJ/w8Qjf8fJqD/Ji6i/3+ByP/p6/f/09Pp/wAAY/9CSar/OUGf/2Vor/+Gld7/AAB3/1RbsP9DTqf/YGKm/7W63P9QVbn/ERao/87Q5//Y2OP/TlSt/0lOpv8fIID/h4rF/xgalf9GSqj/Gh6B/7Ozzv9mZ6T/JSeD/w4Xo/8AAIz/Gh6Q/wAAZf92d7v////x/8TDrv8fHyH5AAAAAAAAAABHRjj//////ywtkv8AAD//AABW/wAAX/+Ul8T/W168/x0ip/8cJKr/Bg6W/1Rrxv+jo83/gILA/yIkkf8AAIr/i6Tz/9/Zw/+2sZ7/bXbQ/wg1v/82U8P/PkW9/xAbs/9mbNb/19vz/+7y9/93iOv/Fx+4/3B+zP9TVKH/cnSx/zNCxv9yftf/Q0ec/zQ1if8rLH//RESO/8/T3/+Kjbv/SlC3/wIDjP8DBGr/KCh6/5eYxv96emb/ISEbpRMTEwgNDQrJgICA/8LB3//Hx/n/zM7v/w8Pcf8GB3z/q7Lq/+vr+/8LE6v/r7jq/9Xa7v8AAGf/AABs/wAHjP8AAJX/Rl3p/7jW0P/kwYD/tcjz/2SQ/v+KqPv/XXze/x4wyv8wMsv/ztXy////9P/Kz9r/FjHK/1Jo4f/i6P//9fX6/yIkuv9FUcz/X2vB/z1Hrf8wOJT/Pj6V/9HRu//g3sH/8fT//xIUnP8JDH//XFyi/1lcw//FyP//y8zB/yYmIvEAAAAAAAAAQEdGOveQkIn/x8an/32Byv8RFrL/4OLe/+fmzP8BDbP/U1nB//////9bXrD/JSeJ/zw+r/8AAZz/AACL/w4v2f+T1f/////1/8C2nv/c48T/kKP5/0FT5P/i6fv/g5Dh/8HK8v/c1rX/srri/5ag2P+4tqL////+/2dv2/8iM8T/KzSz/zhAsf94gMj/AABl/6Wlxf////j/7PL//wAAn/8ICI7//v/9/5iXiP+en8H//////1tbV/8AAAAAAAAAAAAAAAAAAABihIJu/6qu//8lKs//x8jc/7q6p/99hej/hYjR/3+Dfv+mp5//y8nJ/7O1sf+nobb/lI28/zUprv8AIcr/RIT7/5ulq//m47//aIr5/5SZ2f/d3ev/KS/V/42W7//28/D//////+Tgxf+JjJv/YG3h/5+n5v/DzfH/O0nI/x0or/9FTK7/R0ao/5aWov9PTz7/m5+i/5+j5P+ysuP/jo6K/wQDAP8mJhn9PDw+9Q8PEMcAAAAAAAAAAAAAAAAAAAAAQkE7+c3Q6v/h6P//cnFz/1xcWP/a2sz/qKiY/0hRbP9AVnv/XnuK/1GDnv9riZf/iZef/7Osm/+4mbb/boTe/0xY6P94gvL/1N7//4yPfP9ucGz/39bc/3qCh/9aY3D/o6S3/9vSu/+wsPH/Mjfu/yQt2/8sPsz/XmnR/xwnsf80OZ7/5ef//5GSff8eKTr/XWdx/4eIdP+Iinv/TFNd/1Vcaf8AAADjAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACDg3KvNraFP7AAAAgyYmKuvW19b/8vX1/9vb5P9ygq7/U3at/3Ggxf8/hc//EFGx/yFnqv9VgJX/g4t//6aio/+OiLv/r6ng/+zo7/9ZX1r/WG9q/zRxoP8hd7D/L3yX/x5mhv94hob/uLiv/7a50/9xb7//V1C9/x4nvf8AAID/JSd9/7Wzvv9qb2n/aniN/2lygP9faXX/iJOg/1pgaP8AAAC9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgqKirrtbS0///////Jxs7/YW+c/196pP9znL7/bqnf/2Sg5v+Fwe//K3vB/2Sovf9rop//TmR//5ePjv87V3r/B2XB/1Oq4f+T1vn/e878/xeV1P+Cvtn/jq64/2p+gv+us5z/q7mz/7exsv+fnLz/VVia/3R1w//f3N//Y2Vk/32HmP+Un6z/c3uG/zY5Pv8AAAA+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMz8vKyv//////ubjH/2N1pP93mbv/fajP/2ibyP+Tv9r/f6fW/2+36P9YreD/FEGa/wMwef8+p9j/U63v/y55wP9EmNT/kcvu/z6S0P92uOv/r939/3ecyf86hc7/hKXO/6yrqf9xjpz/wrus/5KSov/Ews7/ZGVk/5Kdrv+Fjpn/BgYH6QAAAHYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACIhIff//////////66uv/9tg6z/Y4ay/2OItf+ZweH/lrfW/0J3tf87Z6z/RYm9/0GAzP9Jmtn/UZ/K/0WAxP9jr97/VLHc/zydzf8xhL7/rMHX/4zC6v9Ljs//h4WX/0mFyv+93v//p6m2/1BbZf9pcHT/b3iJ/6Osvf85PED/AAAA2QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGJ+fn/////////////MydT/coSp/3yex/+40fH/rczq/3Ws1/9fmcT/Yp7H/2CYxP9aib7/NYrS/0SQzf+e2u//bqrV/3G21v9OqcT/UpTH/4645v/Lxcz/IFqR/4a34f/v7O//kJ21/52mt/+XobD/v8nX/4GIkv8CAQL/AAAA7QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4YWJi/87Ozf//////6OLm/4uSq/9qirP/jbDa/6PD6f+IsNb/VoO2/2CXxP9yqtH/UKvh/1ecy/9epc//Qoq//2io0v93str/cprG/5ylvv91pM7/kL7n/6ahqP+YoLH/1d/q/7K5xP+gp7L/srrD/5agr/82OkL/AAAAowAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMNra2v/+/v5//35+P+2s77/doal/2V/rf9bdbD/VXSu/2OHuf96pdD/cpvG/2SUv/+Dttr/f7DU/0+Fs/+rxN3/oL7Z/1mVxP+Fo8b/3tvn/3F4jf8TGTH/jZSh/8bO1//a4ev/ydLf/5qktf8lJy33AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmPz8/+fP08/////////v6/8TCzP9/h6P/anmg/1Fnm/9bdq3/b4+//3icyP+HqNH/h6jO/3abw/9tmML/d5q//6uyyf+1tMb/ucLU/9vj7/9wdYr/Ehk1/0tTaP9scHX/bXJ5/zE1Of0AAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADERERPvMzM3/+/z7////////////6ebn/7i6xv+fo7f/jJWw/4WRsP96iKv/hJS0/6Cpwf+sr8T/urrL/8XG0//U3OX/09jf/8XJ0f/o7vX/4efr/xYaI/8AAABWHh8gKgAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFBQa3MjIz80hISPeVlZX///////////////////////v4+f/39Pf/8e/y/+/t7//7+vn//////////////////P///+Tr8f//////sbW8/wAAAPUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABmPDw998DAwf/z8/L/9vb2/9LS0f/i4+L//////////////////////9LS0v97e3v/Y2Vn/7u9wP+XmJj/Hx8h7wAAAFQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMDA58+Pj7zUVFS+wYFBr0LCwvFPT09+a+wsv/Dw8P/o6Ol/xscHPEhIiIYBAQEBAEBAZ8CAgNyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZGRo2IyMjXAAAAAAAAAAAAAAAUCMjJPMyMjH7HR0e8wAAAFwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAP///////wAA////////AAD///////8AAP//4P///wAA///Af///AAD/+AAx//8AAP/gAAB//wAA/8AAAD//AAD/wAAAP/8AAP8AAAAf/wAA/gAAAAH/AAD8AAAAAP8AAPgAAAAA/wAA/AAAAAB/AAD8AAAAAH8AAPgAAAAAfwAA8AAAAAB/AADwAAAAAD8AAMAAAAAADwAAgAAAAAAHAAAAAAAAAAcAAAAAAAAABwAAAAAAAAADAADAAAAAAAMAAAAAAAAAAwAAAAAAAAABAAAAAAAAAAAAAMAAAAAAAAAA8AAAAAAAAADwAAAAAAMAAPgAAAAAAwAA/4AAAAAHAAD/wAAAAA8AAP/gAAAADwAA//AAAAAPAAD/+AAAAA8AAP/8AAAAHwAA//8AAAA/AAD//4AAAf8AAP//wAAB/wAA///8AAP/AAD///4Ab/8AAP////j//wAA////////AAD///////8AAP///////wAA////////AAA=",
			keywords: ["地下城与勇士", "DNF"],
			followings: [
				102176172, // 地下城与勇士官方号的 UID
				90179837, // dnf老搬
				27253173, // DNF面码
				8233456, // DNF枪魂冰子
				332349, // DNF死兔子
				168090912, // 17173DNF官方
				353944511, // DNF手游假猪
			]
		},
		{
			displayName: "绝地求生",
			displayIcon: "data:image/x-icon;base64,AAABAAQAMDAAAAEAIACoJQAARgAAACAgAAABACAAqBAAAO4lAAAQEAAAAQAgAGgEAACWNgAAGBgAAAEAIACICQAA/joAACgAAAAwAAAAYAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AAACAYQFKTr+Bjlp/wFSh/8FSoP/BEqO/wFTl/8FZKv/Am+4/wVGov8IWqf/ARgv/wJWlf8DXqL/A2Oh/wQ8bv8EP3f/BS1t/wUsU/8GKFT/BE6Q/wRHf/8CN3//CEeS/wJIl/8DTZv/BlKb/wVDhf8DSIj/Bi1S/wZgkv8GQ3//CDd5/wVSkv8CTJP/BFic/wNo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if8SiJb/FY+Y/xCEof8Tiqf/Eo2r/xWLqf8VjqX/EYet/xKCnf8Sk6X/EpWw/w+Nmv8Re4P/Cl1r/wozQv4BBQPE////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///////8AAP///////wAA////////AAD///////8AAP///////wAA////////AAD///////8AAP///////wAA8AAAAAAHAADAAAAAAAMAAMAAAAAAAwAAwAAAAAADAADAAAAAAAMAAMAAAAAAAwAAwAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAMAAAAAAAwAAwAAAAAADAADAAAAAAAMAAOAAAAAAAwAA4AAAAAADAADAAAAAAAMAAOAAAAAAAwAA4AAAAAADAADgAAAAAAMAAOAAAAAAAwAA4AAAAAADAADAAAAAAAMAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAwAAAAAADAADAAAAAAAMAAMAAAAAAAwAAwAAAAAADAADAAAAAAAMAAMAAAAAAAwAA4AAAAAAPAAD///////8AAP///////wAA////////AAD///////8AAP///////wAA////////AAAoAAAAIAAAAEAAAAABACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AOfn5gCLkJEABENk/wVcnP8FXJz/BFys/wRwv/8GZMX/BkGJ/wRFg/8Fc8P/BlSU/wZBif8FN2r/BER8/wRVo/8FRZf/BVSp/wRcrP8FVKn/BEWD/wdckf8HTpr/B06a/wRVo/8FYqv/BGal/wRsqf8Fc8P/BVyc/wITHP+wsLAAGSAnAAEVIf8ItOT/Ba39/weK/v8Hm///B4r+/wl67P8Hev3/B3r9/wai//8GhOv/BnT2/wdv2f8Ie93/B4r+/wVs+f8GdPb/B4T//weE//8Hev3/B4r+/wZ09v8Idf7/CF7d/whw1v8Hm///B5v//web//8JpfX/BTdq/wwMDAADQ2QAAkhl/wml9f8Il/H/BpTs/waU7P8JiN3/B4DC/wdwzP8Giu3/BaDv/wVzw/8GfOT/B5Ll/wWE3P8GfOT/BXzp/wZ85P8GhOv/Bort/waE6/8FfOn/BoTr/wh73f8IV7z/B3DM/wWg7/8FftX/B5Ll/wa0//8CS3r/AAAAAAIlNgAEW3r/Br3+/wdckf8EGxv/AiEd/wQb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///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP//////////////////////////wAAAAYAAAAGAAAABgAAAAYAAAAEAAAAAAAAAAAAAAACAAAABgAAAAYAAAAGAAAABgAAAAYAAAAGAAAABgAAAAQAAAAAAAAAAAAAAAIAAAAGAAAABgAAAAYAAAAH/////////////////////KAAAABAAAAAgAAAAAQAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFluT6BHjb9AR94PIGduTyBVnE/gR40vIFU7TyBWjK/gRZzfIEadnyBmfI/gZpxvIGWszyB3zT/wWQ5fYGl+X/BJfn/wWa//8HmPf/CX/T/wd97v8Gh+f/Bob1/waI+/8Ee/r/BYX4/waN//8EjP//B3/z/wWR6v8FmfX/BJfn/wOJ2v8BFA7/AAYA/gITBf4AGhb+AQ0L/gAPBv4AFRH+AB4g/gANCf4AEw/+AB4j/gAVDP4AExD+AA0J/wOJ2v8EesT/AAAA/wW3//4CX5n+AAAA/gV1sP4Iqf/+BVul/gAAAP4Gk/X+BmS0/gAAAP4IcNL+CLD7/gABAP4EesT/BpDQ/wAAAP4Gwv/+AV6O/gAAAP4Eo+z+AAAA/gVuvv4AAAD+Am20/hav3P4AAAD+A2q6/gSi6v4ACQr+BpDQ/w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",
			keywords: ["绝地求生", "PUBG"],
			followings: [
				449704680, // 意识DT
				6528910, // 小贝的游戏食堂
				46708782, // 鲁大能
				50329485, // 吃鸡赛事
				552064023, // 吃鸡小表弟
			]
		},
		{
			displayName: "英雄联盟",
			displayIcon: "data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAAAAAzcoXhV4yk8GSFmvBki5/wUoGc8D13mPA5dZPwOXOR8DdujPA1a4zwNGuM8DZwkPAxcJPwMG6O8Dx/n/Azb4ThK3OS9FMnJv99JRL/hSIR/4MVB/9ZCgX/gw8C/3cRA/+OJgf/hyUH/4w0CP+INQj/hjMM/6U0D/9rLin/KHKT9ChrifAlDxL/OAAA/wQiNv8dV3b/H1Zz/zFZcf8oWG7/NGJ6/z5vgv9Fd4T/QHuM/z9LTv/HOQD/dCgU/yFqjPAhbY3wRRoY/7swAP9EIBv/D2CZ/y6Uzv8qksj/MJ7V/zWu7f8zq+v/L6zt/0DN//9Crsb/hCEA/4UxFv84eZbwI2uN8DUZF//ARgD/iCYA/wAtWf85msL/OZS6/wdKfv8IQGv/CUhy/wpflv8ijMj/RMj0/2pFLf+SPBH/NXSS8CJkiPAoEhb/uzQA/7AsAf8DLVj/QafQ/1y+yf8AAgj/EAAA/yoGAP84EAP/KR8u/x1+sv9ZdXn/fy0M/yVliPAdXX/wNBQU/8cjAP+gHAH/AzRf/0eu1/9YusX/PQoA/7A8Bf/cbBP/0l4B/5MpAP9GFw7/J0BR/1glHf8fXoHwI1988DYWFf+2HAD/jB8B/wg2X/9Grdf/Uq++/3wtEf/ddyH/6IQO/+KHEf/FbQ7/kDMA/3IwCf9FLib/I1l68Cllf/BFHRX/vygA/3wiAf8QOGP/TbTf/0qkuf9yKhL/0HUo/9dyCf/YgxX/3Iof/9VsBf++TQP/NBoU/yFZffAyZX3wPhwY/5ooAP+VNAD/ETlg/0Kw4f9Jprz/disR/8lpH//IYwL/xWMC/89vB//IYwP/oDYA/ywWFP8jVnjwOF5x8BoTGv9pIQD/mj8C/wo1XP8+qtj/Tqu9/4k/Fv/VeCb/ymoM/8NeAv/FYAb/xV0E/6I9AP8vGhr/Hk1t8EluhPAXFBv/aykA/5E8AP8MNFz/Q6nT/06ovf+SQQ7/zm4c/8VlEv+6WAP/tVAC/7NHAv+cNgD/Nhwa/zNhf/BRdo7wIhoc/6c8AP+HKwf/EU99/0Gr3P9AocX/eSkK/8VkHv+2WQ7/o0sD/5k9A/+bOQH/kSsA/zgdG/9EbYzwOmuJ8CsUFf9UBQD/OEpR/yZ4oP8YYpL/G22e/yEvP/+EMQv/rkAC/444AP9zJgD/hiIA/3gTAP8iEBT/M2SG8DdnjPQrICr/OBUW/yccIf8eERf/HRMW/yMUGP8jGiL/QhsY/1MbFP9KHhj/RB4Z/0YYFv9FFxX/NSQs/zhni/QqWXfhOW6W8DtskPBDcJTwNmOE8C1be/AvYIHwLGSF8C1kiPAnY4jwMG+R8DN1lvAvdJfwMHKS8Dl8oPAwX33hAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==",
			keywords: ["英雄联盟", "LOL"],
			followings: [
				50329118, // 哔哩哔哩英雄联盟赛事官方号的 UID
				4895244, // LOL丶诺诺
				470840543, // LOL楠神李青
				178778949, // 英雄联盟
				50329220, // 哔哩哔哩LOL赛事直播
				302651406, // WBG英雄联盟分部
				652663378, // LOL小超梦
				23364027, // 英雄联盟-小白鸦
			]
		},
		{
			displayName: "第五人格",
			displayIcon: "https://i0.hdslb.com/bfs/face/c4cbdafecef76836b94f2ba8832d0a04d709a499.jpg@100w_100h.webp",
			keywords: ["第五人格", "#第五人格", "互动抽奖 #第五人格"],
			followings: [
				211005705, // 网易第五人格手游官方号的 UID
				105022844, // 第五人格赛事
				452627895, // 狼队电竞第五人格分部
				1385707562, // TE溯第五人格分部
			]
		},
		{
			displayName: "蛋仔派对",
			displayIcon: "https://i0.hdslb.com/bfs/face/6afedb4d85ea6c4115f5548146dc8d7127886ca0.jpg@100w_100h.webp",
			keywords: ["蛋仔派对", "#蛋仔派对", "互动抽奖 #蛋仔派对"],
			followings: [
				1306451842, // 网易蛋仔派对官方号的 UID
			]
		},
		{
			displayName: "GLITCH",
			displayIcon: "https://i0.hdslb.com/bfs/face/06ea197a6b245ff730c8d9abd684abdff3193ef3.jpg@100w_100h.webp",
			keywords: ["格历奇GLITCH", "YouTube GLITCH", "GLITCH入驻b站", "无机杀手", "Murder Drones", "神奇数字马戏团", "The Amazing Digital Circus"],
			followings: [
				49442838, // 格历奇GLITCH官方号的 UID
			]
		},
		{
			displayName: "狗汉奸",
			displayIcon: `<color style="color:red">耻</color>`,
			followings: [
				3493114748603275, // 迷因猫猫的 UID
			],
			blacklist: [
				3493114748603275, // 迷因猫猫的 UID
			]
		},
		/*
		虽然在这写了这些人格，但其实啥用没有，即使有，也没法测出
		{
			displayName: "物流师型人格",
			displayIcon: "I",
			keywords: ["ISTJ"],
			followings: []
		}, {
			displayName: "守卫者型人格",
			displayIcon: "I",
			keywords: ["ISFJ"],
			followings: []
		}, {
			displayName: "提倡者型人格",
			displayIcon: "I",
			keywords: ["INFJ"],
			followings: []
		}, {
			displayName: "建筑师型人格",
			displayIcon: "I",
			keywords: ["INTJ"],
			followings: []
		}, {
			displayName: "鉴赏家型人格",
			displayIcon: "I",
			keywords: ["ISTP"],
			followings: []
		}, {
			displayName: "探险家型人格",
			displayIcon: "I",
			keywords: ["ISFP"],
			followings: []
		}, {
			displayName: "调停者型人格",
			displayIcon: "I",
			keywords: ["INFP"],
			followings: []
		}, {
			displayName: "逻辑学家型人格",
			displayIcon: "I",
			keywords: ["INTP"],
			followings: []
		}, {
			displayName: "企业家型人格",
			displayIcon: "E",
			keywords: ["ESTP"],
			followings: []
		}, {
			displayName: "表演者型人格",
			displayIcon: "E",
			keywords: ["ESFP"],
			followings: []
		}, {
			displayName: "竞选者型人格",
			displayIcon: "E",
			keywords: ["ENFP"],
			followings: []
		}, {
			displayName: "辩论家型人格",
			displayIcon: "E",
			keywords: ["ENTP"],
			followings: []
		}, {
			displayName: "总经理型人格",
			displayIcon: "E",
			keywords: ["ESTJ"],
			followings: []
		}, {
			displayName: "执政官型人格",
			displayIcon: "E",
			keywords: ["ESFJ"],
			followings: []
		}, {
			displayName: "主人公型人格",
			displayIcon: "E",
			keywords: ["ENFJ"],
			followings: []
		}, {
			displayName: "指挥官型人格",
			displayIcon: "E",
			keywords: ["ENTJ"],
			followings: []
		}*/
	]

	/*
	防止代码因其他原因被执行多次
	这段代码出自 Via轻插件，作者谷花泰
	*/
	let key = encodeURIComponent('（改）B站成分检测器:主代码');
	if (window[key]) return;
	window[key] = true;
	console.log("【（改）B站成分检测器】即时\n运行中...")

	// 创建样式
	addCheckerStyle();

	// 空间动态api
	const cardApiUrl = 'https://api.bilibili.com/x/web-interface/card?mid='
	const spaceApiUrl = 'https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/space?host_mid='
	const followingApiUrl = 'https://api.bilibili.com/x/relation/followings?vmid='
	const searchIcon = `<svg width="12" height="12" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.3451 15.2003C16.6377 15.4915 16.4752 15.772 16.1934 16.0632C16.15 16.1279 16.0958 16.1818 16.0525 16.2249C15.7707 16.473 15.4456 16.624 15.1854 16.3652L11.6848 12.8815C10.4709 13.8198 8.97529 14.3267 7.44714 14.3267C3.62134 14.3267 0.5 11.2314 0.5 7.41337C0.5 3.60616 3.6105 0.5 7.44714 0.5C11.2729 0.5 14.3943 3.59538 14.3943 7.41337C14.3943 8.98802 13.8524 10.5087 12.8661 11.7383L16.3451 15.2003ZM2.13647 7.4026C2.13647 10.3146 4.52083 12.6766 7.43624 12.6766C10.3517 12.6766 12.736 10.3146 12.736 7.4026C12.736 4.49058 10.3517 2.1286 7.43624 2.1286C4.50999 2.1286 2.13647 4.50136 2.13647 7.4026Z" fill="currentColor"></path></svg>`
	const checked = {}
	const checking = {}
	const checkButton = `<div class="composition-checkable"><div class="composition-badge-control"><a class="composition-name-control" title="点击查询用户成分">${searchIcon}</a></div></div>`
	let dom = ''

	// 2024版评论
	waitForKeyElements("div#info div#user-name[data-user-profile-id]", (element) => {
		if (element && element.length > 0) {
			let style = document.createElement("style");
			style.rel = 'stylesheet';
			style.innerHTML = addCheckerStyle(true)
			element.before(style)

			let button = $(checkButton)
			element.after(button)
			button.on('click', function () {
				checkComposition(element.attr("data-user-profile-id"), element, button.find(".composition-name-control"), element, '')
			})
			if (GM_getValue('Auto') === 'true') button.click()
		}
	});

	// 2024版 回复、纯@评论
	waitForKeyElements("p#contents a[data-user-profile-id]", (element) => {
		if (element && element.length > 0) {
			let style = document.createElement("style");
			style.rel = 'stylesheet';
			style.innerHTML = addCheckerStyle(true)
			element.before(style)

			let button = $(checkButton)
			element.after(button)
			button.on('click', function () {
				checkComposition(element.attr("data-user-profile-id"), element, button.find(".composition-name-control"), element, '')
			})
			if (GM_getValue('Auto') === 'true') button.click()
		}
	});

	// 2024版用户卡片
	waitForKeyElements("div#wrap div#view div#body div#title a#name", (element) => {
		if (element && element.length > 0 && element.parent().parent().find('a[href*="space.bilibili.com"]').attr('href').match(/space\.bilibili\.com\/(\d+)/)[1].length > 0) {
			let style = document.createElement("style");
			style.rel = 'stylesheet';
			style.innerHTML = addCheckerStyle(true)
			element.parent().parent().before(style)
			console.log("111111")

			let button = $(checkButton)
			let initialText = element.text().trim();

			if (element.parent().parent().parent().find(".composition-checkable, .composition-checked"))
				element.parent().parent().parent().find(".composition-checkable, .composition-checked").remove()

			button.css({ "margin": "8px 5px" });
			button.on('click', function () {
				checkComposition(element.parent().parent().find('a[href*="space.bilibili.com"]').attr('href').match(/space\.bilibili\.com\/(\d+)/)[1], element, button.find(".composition-name-control"), element.parent().parent(), { "margin": "0 0 10px" })
			})
			element.parent().parent().after(button);
			if (GM_getValue('Auto') === 'true') button.click()

			const observer = new MutationObserver(mutations => {
				mutations.forEach(mutation => {
					if (mutation.type === 'childList' || mutation.type === 'characterData') {
						let button = $(checkButton)
						let currentText = element.text().trim();
						console.log("222222", currentText, initialText);
						if (currentText === initialText) return;

						initialText = currentText;
						if (element.parent().parent().parent().find(".composition-checkable, .composition-checked"))
							element.parent().parent().parent().find(".composition-checkable, .composition-checked").remove();

						button.css({ "margin": "8px 5px" });
						button.off('click').on('click', function () {
							checkComposition(element.parent().parent().find('a[href*="space.bilibili.com"]').attr('href').match(/space\.bilibili\.com\/(\d+)/)[1], element, button.find(".composition-name-control"), element.parent().parent(), { "margin": "0 0 10px" });
						});

						element.parent().parent().after(button);
						if (GM_getValue('Auto') === 'true') button.click();
					}
				});
			});

			// 配置观察器
			observer.observe(element.get(0), {
				childList: true,
				subtree: true,
				characterData: true
			});

			// 清理观察器的函数
			element.data('observer', observer);
		}
	});

	// 2022版评论
	waitForKeyElements("div.content-warp div.user-info div.user-name[data-user-id]", (element) => {
		if (element && element.length > 0) {
			let button = $(checkButton)
			element.after(button)
			button.on('click', function () {
				checkComposition(element.attr("data-user-id"), element, button.find(".composition-name-control"), element, '')
			})
			if (GM_getValue('Auto') === 'true') button.click()
		}
	});

	// 2022版子评论
	waitForKeyElements("div > div.sub-user-info div.sub-user-name[data-user-id]", (element) => {
		if (element && element.length > 0) {
			let button = $(checkButton)
			element.after(button)
			button.on('click', function () {
				checkComposition(element.attr("data-user-id"), element, button.find(".composition-name-control"), element, '')
			})
			if (GM_getValue('Auto') === 'true') button.click()
		}
	});

	// 2022版含@的评论
	waitForKeyElements("span a.jump-link.user[data-user-id]", (element) => {
		if (element && element.length > 0) {
			let button = $(checkButton)
			element.after(button)
			button.on('click', function () {
				checkComposition(element.attr("data-user-id"), element, button.find(".composition-name-control"), element, '')
			})
			if (GM_getValue('Auto') === 'true') button.click()
		}
	});

	// 2022版用户卡片
	waitForKeyElements("div.user-card div.card-content div.card-user-info a.card-user-name", (element) => {
		if (element && element.length > 0 && element.parent().find('a[href*="space.bilibili.com"]').attr('href').match(/space\.bilibili\.com\/(\d+)/)[1].length > 0) {
			let button = $(checkButton)
			element.parent().parent().after(button);
			button.css({ "margin": "8px 5px" });
			button.on('click', function () {
				checkComposition(element.parent().find('a[href*="space.bilibili.com"]').attr('href').match(/space\.bilibili\.com\/(\d+)/)[1], element, button.find(".composition-name-control"), element.parent().parent(), { "margin": "0 0 10px" })
			})
			if (GM_getValue('Auto') === 'true') button.click()
		}
	});

	// 2022版动态用户卡片
	waitForKeyElements("div.bili-user-profile div.bili-user-profile-view div.bili-user-profile-view__info div.bili-user-profile-view__info__header a.bili-user-profile-view__info__uname", (element) => {
		if (element && element.length > 0 && element.parent().find('a[href*="space.bilibili.com"]').attr('href').match(/space\.bilibili\.com\/(\d+)/)[1].length > 0) {
			let button = $(checkButton)
			let initialText = element.text().trim();

			if (element.parent().parent().parent().parent().find(".composition-checkable, .composition-checked"))
				element.parent().parent().parent().parent().find(".composition-checkable, .composition-checked").remove()

			element.parent().parent().parent().after(button);
			button.css({ "margin": "8px 5px" });
			button.on('click', function () {
				checkComposition(element.parent().find('a[href*="space.bilibili.com"]').attr('href').match(/space\.bilibili\.com\/(\d+)/)[1], element, button.find(".composition-name-control"), element.parent().parent().parent(), { "margin": "0 0 10px" })
			})
			if (GM_getValue('Auto') === 'true') button.click()

			// 可能只会有一个元素，所以监听用户名刷新
			element.on('DOMSubtreeModified', function () {
				let button = $(checkButton)
				let currentText = $(this).text().trim();
				if (currentText === initialText) return;

				initialText = currentText;
				if (element.parent().parent().parent().parent().find(".composition-checkable, .composition-checked"))
					element.parent().parent().parent().parent().find(".composition-checkable, .composition-checked").remove()

				button.css({ "margin": "8px 5px" });
				button.off('click').on('click', function () {
					checkComposition(element.parent().find('a[href*="space.bilibili.com"]').attr('href').match(/space\.bilibili\.com\/(\d+)/)[1], element, button.find(".composition-name-control"), element.parent().parent().parent(), { "margin": "0 0 10px" })
				})

				element.parent().parent().parent().after(button);
				if (GM_getValue('Auto') === 'true') button.click()
			})
		}
	});

	// 旧版评论
	waitForKeyElements("div.reply-wrap > div > div.user a.name[data-usercard-mid]", (element) => {
		if (element && element.length > 0) {
			let button = $(checkButton)
			element.after(button)
			button.on('click', function () {
				checkComposition(element.attr("data-usercard-mid"), element, button.find(".composition-name-control"), element, '')
			})
			if (GM_getValue('Auto') === 'true') button.click()
		}
	});

	// 旧版用户卡片
	waitForKeyElements("div.user-card div.info p.user a.name", (element) => {
		if (element && element.length > 0 && element.parent().parent().parent().find("a.like").attr("mid")) {
			let button = $(checkButton)
			element.parent().parent().parent().find("div.btn-box").after(button);
			button.css({ "margin": "8px 5px" });
			button.on('click', function () {
				checkComposition(element.parent().parent().parent().find("a.like").attr("mid"), element, button.find(".composition-name-control"), element.parent().parent().parent().find("div.btn-box"), { "margin": "0 0 10px" })
			})
			if (GM_getValue('Auto') === 'true') button.click()
		}
	});

	// 用户中心 关注列表、粉丝列表
	waitForKeyElements("div.content a.title span.fans-name", (element) => {
		if (element && element.length > 0) {
			if (element.parent().parent().find('a[href*="space.bilibili.com"]').attr('href').match(/space\.bilibili\.com\/(\d+)/)[1].length > 0) {
				let button = $(checkButton)
				button.css({ "overflow": "hidden", "margin-bottom": "10px" });
				element.parent().after(button)
				button.on('click', function () {
					checkComposition(element.parent().parent().find('a[href*="space.bilibili.com"]').attr('href').match(/space\.bilibili\.com\/(\d+)/)[1], element, button.find(".composition-name-control"), element.parent(), { "overflow": "hidden", "margin-bottom": "10px" })
				})
				if (GM_getValue('Auto') === 'true') button.click()
			}
		}
	});

	// 旧版包含@的评论
	waitForKeyElements("div.reply-wrap > div > p.text a[data-usercard-mid]", (element) => {
		if (element && element.length > 0) {
			let button = $(checkButton)
			element.after(button)
			button.on('click', function () {
				checkComposition(element.attr("data-usercard-mid"), element, button.find(".composition-name-control"), element, '')
			})
			if (GM_getValue('Auto') === 'true') button.click()
		}
	});

	// 旧版 回复、纯@评论
	waitForKeyElements("span.text-con a[data-usercard-mid]", (element) => {
		if (element && element.length > 0) {
			let button = $(checkButton)
			element.after(button)
			button.on('click', function () {
				checkComposition(element.attr("data-usercard-mid"), element, button.find(".composition-name-control"), element, '')
			})
			if (GM_getValue('Auto') === 'true') button.click()
		}
	});

	// 添加标签
	function installComposition(rule, elemload, eleminst, elemcss) {
		let badge = $(`<div class="composition-checked"><div class="composition-badge">
			<a class="composition-name" title="点击查看已识别用户">${rule.displayName}</a>
			${rule.displayIcon ? (
				rule.displayIcon.match("https:") ? `<img src="${rule.displayIcon}" class="composition-icon">` :
					rule.displayIcon.match("data:") ? `<img src="${rule.displayIcon}" class="composition-icon">` :
						`<span class="composition-icon">${rule.displayIcon}</span>`
			) : ''}
			</div></div>`)
		badge.on('click', function () {
			showAllUser()
		})
		if (elemcss) badge.css(elemcss);
		if (eleminst) eleminst.after(badge);
		elemload.parent().parent().remove();
	}

	// 检查标签
	function checkComposition(id, element, elemload, eleminst, elemcss) {
		// 用户名称获取
		let eltx = element.text().trim()
		let name = eltx.charAt(0) == "@" ? eltx.substring(1) : eltx

		elemload.text('等待...')
		elemload.attr('title', '正在查询中，等下吧...')

		if (checked[id] != undefined) {
			let found = checked[id]
			if (found.length > 0) {
				for (let rule of found) {
					installComposition(rule, elemload, eleminst, elemcss)
				}
				console.log(`【（改）B站成分检测器】缓存\n检测到 ${name} ${id} 的成分为\n`, JSON.parse(JSON.stringify(found.map(it => { return { name: it.displayName, reason: it.reason, item: it.item, keyword: it.keyword, uid: it.uid, full: it.full } }))))
			} else {
				console.log(`【（改）B站成分检测器】缓存\n检测到 ${name} ${id} 的成分为 无`)
				elemload.text('无')
				elemload.attr('title', '点击查看已查询过的用户')
				elemload.on('click', function () {
					showAllUser()
				})
			}
		} else if (checking[id] != undefined) {
			if (checking[id].indexOf(element) < 0)
				checking[id].push({
					element: element,
					elemload: elemload,
					eleminst: eleminst,
					elemcss: elemcss,
				});
		} else {
			checking[id] = [{
				element: element,
				elemload: elemload,
				eleminst: eleminst,
				elemcss: elemcss
			}];
			detectComposition(id, name, true)
				.then((found) => {
					if (found.length > 0) {
						value = found.map(it => ({
							name: it.displayName,
							img: it.displayIcon,
							reason: it.reason,
							item: it.item,
							keyword: it.keyword,
							uid: it.uid,
							full: it.full
						}))
						dom += `
						<div style="margin-top: 25px">
							<span style="margin:0">${name}</span>
							<div id="tips" style="color: #fb7299;"><a href="https://space.bilibili.com/${id}/" target="_blank" style="color: #fb7299;">UID ${id}</a></div>
							`;
						for (let i = 0; i < value.length; i++) {
							let reason = value[i].keyword || value[i].uid
							let icon = value[i].img ? (
								value[i].img.match("https:") ? `<img src="${value[i].img}" class="composition-icon">` :
									value[i].img.match("data:") ? `<img src="${value[i].img}" class="composition-icon">` :
										`<span class="composition-icon">${value[i].img}</span>`
							) : ''
							dom += `
							<div style="margin-top: 10px;">
								<div class="composition-badge">
									<a class="composition-name">${value[i].name}</a>
									${icon}
								</div>
								<div style="margin-top: 8px;">
									<div class="composition-name">原因：${value[i].reason}</div>
									<div class="composition-name">匹配：${reason}</div>
								</div>
							</div>`;
						}
						dom += `</div>`

						let displayNameSet = new Set();
						found = found.filter(item => {
							if (displayNameSet.has(item.displayName)) {
								return false;
							} else {
								displayNameSet.add(item.displayName);
								return true;
							}
						});

						// 给所有用到的地方添加标签
						for (let elements of checking[id]) {
							if (found.length > 0) {
								for (let rule of found) {
									installComposition(rule, elements.elemload, elements.eleminst, elements.elemcss);
								}
							} else {
								elements.elemload.text('无');
								elements.elemload.attr('title', '点击查看已查询过的用户');
								elements.elemload.on('click', function () {
									showAllUser();
								});
							}
						}
					} else {
						for (let elements of checking[id]) {
							elements.elemload.text('无');
							elements.elemload.attr('title', '点击查看已查询过的用户');
							elements.elemload.on('click', function () {
								showAllUser();
							});
						}
					}
					delete checking[id];
					checked[id] = found
				})
				.catch((error) => {
					if (debug) console.error(`【（改）B站成分检测器】即时\n检测 ${name} ${id} 的成分失败`, error);
					for (let elements of checking[id]) {
						elements.elemload.text('重试')
						elements.elemload.attr('title', '点击重新查询此用户成分')
						elements.elemload.on('click', function () {
							checkComposition(id, elements.element, elements.elemload, elements.eleminst, elements.elemcss)
						})
					}
					delete checking[id];
				});
		}
	}
	dom = `<div id="Identified">
	<div id="tips">因判断关键词较为广泛，可能会出现误杀的现象</div>
	<div id="tips">脚本还在测试阶段，喜欢的话还请留下你的评论</div>
	<div id="tips">Ctrl+F 可以快速搜索</div>
	${dom}</div>`;
	function showAllUser() {
		Swal.fire({
			title: '已识别用户',
			html: dom,
			icon: 'info',
			heightAuto: false,
			scrollbarPadding: false,
			showCloseButton: true,
			confirmButtonText: '关闭'
		})
	}

	GM_registerMenuCommand("查看已检查的用户", () => {
		showAllUser();
	});
	GM_registerMenuCommand("手动输入 ID 检查", () => {
		uidChecker();
	});

	function request(option) {
		return new Promise((resolve, reject) => {
			let httpRequest = typeof GM_xmlhttpRequest !== "undefined" ? GM_xmlhttpRequest : GM.xmlHttpRequest;
			httpRequest({
				method: 'get',
				...option,
				onload: (response) => {
					let res = JSON.parse(response.responseText);
					resolve(res);
				},
				onerror: (error) => {
					reject(error);
				},
			});
		});
	}

	function setting(conf_name, tips) {
		if (GM_getValue(conf_name) === 'true') {
			GM_setValue(conf_name, 'false');
			message.info('<span>已禁用 ' + tips + '<br/>刷新后生效，点我将刷新页面。</span>');
		} else {
			GM_setValue(conf_name, 'true');
			message.info('<span>已启用 ' + tips + '<br/>刷新后生效，点我将刷新页面。</span>');
		}
	}

	function uidChecker() {
		Swal.fire({
			title: '成分检测',
			imageUrl: 'https://www.bilibili.com/favicon.ico',
			imageAlt: `哔哩哔哩 干杯~`,
			imageWidth: 40,
			imageHeight: 40,
			input: 'number',
			inputAttributes: {
				autocapitalize: 'off'
			},
			allowOutsideClick: false,
			showCloseButton: true,
			confirmButtonText: '确定并查询',
			showLoaderOnConfirm: true,
			heightAuto: false,
			scrollbarPadding: false,
			text: '请输入要查询的 UID 号码',
			preConfirm: (uid) => {
				return new Promise(async (resolve, reject) => {
					// 检查用户卡片
					try {
						if (!uid) throw new CodeError("请输入完整的用户 UID")
						let cardRequest = await request({
							url: cardApiUrl + uid,
							headers: {
								"user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
								"referer": "https://www.bilibili.com",
								"cookies": {
									"buvid3": generateBuvid3(),
								},
							},
						});
						let cardContent = cardRequest;
						if (cardContent.code === 0) {
							let card = cardContent.data.card
							detectComposition(card.mid, card.name, true)
								.then((found) => {
									let result = {
										mid: card.mid,
										name: card.name,
										level: card.level_info.current_level,
										face: card.face,
										sign: card.sign ? card.sign : '',
										official_title: card.Official.title ? card.Official.title : '',
										official_desc: card.Official.desc ? card.Official.desc : '',
										official_role: card.Official.role !== 0 ? (
											card.Official.role === 1 ? '个人认证 - 知名UP主' : card.Official.role === 2 ? '个人认证 - 大V达人' : card.Official.role === 3 ? '机构认证 - 企业' : card.Official.role === 4 ? '机构认证 - 组织' : card.Official.role === 5 ? '机构认证 - 媒体' : card.Official.role === 6 ? '机构认证 - 政府' : card.Official.role === 7 ? '个人认证 - 高能主播' : card.Official.role === 9 ? '个人认证 - 社会知名人士' : '未知认证角色(' + card.Official.role + ')'
										) : '',
										official_type: card.Official.type !== -1 ? (
											card.Official.type === 0 ? 'UP主认证' : card.Official.type === 1 ? '机构认证' : '未知认证类型(' + card.Official.type + ')'
										) : '',
										vip: card.vip.vipType !== 0 ? (
											card.vip.vipType === 1 ? '月度大会员' : card.vip.vipType === 2 ? '年度大会员(或以上)' : '未知会员(' + card.vip.vipType + ')'
										) : '',
										found: found.map(it => ({
											name: it.displayName,
											img: it.displayIcon,
											reason: it.reason,
											item: it.item,
											keyword: it.keyword,
											uid: it.uid,
											full: it.full
										}))
									}
									resolve(result)
								})
								.catch(error => {
									throw error
								})
						} else {
							throw new CodeError(`获取用户信息失败，错误码：${cardContent.code}`)
						}
					} catch (error) {
						resolve(null);
						Swal.showValidationMessage(`失败: ${error}`)
					}
				})
			},
		}).then((result) => {
			if (result.value) {
				let info = result.value
				let value = result.value.found;
				let final = '';
				for (let i = 0; i < value.length; i++) {
					let reason = value[i].keyword || value[i].uid
					let icon = value[i].img ? (
						value[i].img.match("https:") ? `<img src="${value[i].img}" class="composition-icon">` :
							value[i].img.match("data:") ? `<img src="${value[i].img}" class="composition-icon">` :
								`<span class="composition-icon">${value[i].img}</span>`
					) : ''
					final += `
					<div style="margin-top: 25px;">
						<div class="composition-badge">
							<a class="composition-name">${value[i].name}</a>
							${icon}
						</div>
						<div style="margin-top: 12px;">
							<div class="composition-name">原因：${value[i].reason}</div>
							<div class="composition-name">匹配：${reason}</div>
						</div>
					</div>`;
				}
				Swal.fire({
					title: info.name,
					imageUrl: info.face,
					imageAlt: `${info.name}的头像`,
					imageWidth: 200,
					imageHeight: 200,
					html: `<div id="Identified">
							<div id="tips">${info.sign}</div>
							<br/>
							<div id="tips" style="color: #fb7299;">LV${info.level}</div>
							<div id="tips" style="color: #fb7299;"><a href="https://space.bilibili.com/${info.mid}/" target="_blank" style="color: #fb7299;">UID ${info.mid}</a></div>
							<div id="tips" style="color: #fb7299;">${info.vip}</div>
							<br/>
							<div id="tips" style="color: #ffd700;">${info.official_type}</div>
							<div id="tips" style="color: #ffd700;">${info.official_role}</div>
							<div id="tips" style="color: #ffd700;">${info.official_title}</div>
							<div id="tips" style="color: #ffd700;">${info.official_desc}</div>
							<br/>
							<div id="tips">因判断关键词较为广泛，可能会出现识别错误的现象<br/>脚本还在测试阶段，喜欢的话还请留下你的评论</div>
							${final}
						</div>`,
					allowOutsideClick: false,
					showCloseButton: true,
					showConfirmButton: false,
					heightAuto: false,
					scrollbarPadding: false,
				})
			}
		})
	}

	if (GM_getValue('Auto') === 'true') {
		GM_registerMenuCommand('自动检测用户成分：✅ 已启用', function () {
			setting('Auto', '自动检测用户成分')
		});
	} else {
		GM_registerMenuCommand('自动检测用户成分：❌ 已禁用', function () {
			setting('Auto', '自动检测用户成分')
		});
	}

	function addStyle(id, tag, css) {
		tag = tag || 'style';
		let doc = document, styleDom = doc.getElementById(id);
		if (styleDom) styleDom.remove();
		let style = doc.createElement(tag);
		style.rel = 'stylesheet';
		style.id = id;
		tag === 'style' ? style.innerHTML = css : style.href = css;
		doc.getElementsByTagName('head')[0].appendChild(style);
	}

	function addCheckerStyle(text) {
		let color = "#574AB8";

		let swalcss = `
			.swal2-styled{transition: all 0.2s ease;}
			.swal2-loader{display:none;align-items:center;justify-content:center;width:2.2em;height:2.2em;margin:0 1.875em;-webkit-animation:swal2-rotate-loading 1.5s linear 0s infinite normal;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border-width:.25em;border-style:solid;border-radius:100%;border-color:${color} transparent }
			.swal2-styled.swal2-confirm{border:0;border-radius:.25em;background:initial;background-color:${color};color:#fff;font-size:1em}
			.swal2-styled.swal2-confirm:hover,.swal2-styled.swal2-deny:hover{opacity:0.8;background-image:none!important}
			.swal2-styled.swal2-confirm:focus{box-shadow:0 0 0 3px ${color}80}
			.swal2-styled.swal2-deny:focus{box-shadow:0 0 0 3px #dc374180}
			.swal2-timer-progress-bar-container{position:absolute;right:0;bottom:0;left:0;grid-column:auto;overflow:hidden;border-bottom-right-radius:5px;border-bottom-left-radius:5px}
			.swal2-timer-progress-bar{width:100%;height:.25em;background:${color}33 }
			.swal2-progress-steps .swal2-progress-step{z-index:20;flex-shrink:0;width:2em;height:2em;border-radius:2em;background:${color};color:#fff;line-height:2em;text-align:center}
			.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:${color} }
			.swal2-progress-steps .swal2-progress-step-line{z-index:10;flex-shrink:0;width:2.5em;height:.4em;margin:0 -1px;background:${color}}
			.swal2-popup {padding:1.25em 0 1.25em;flex-direction:column}
			.swal2-close {position:absolute;top:1px;right:1px;transition: all 0.2s ease;}
			div:where(.swal2-container) .swal2-html-container{padding: 1.3em 1.3em 0.3em;}
			div:where(.swal2-container) button:where(.swal2-close):hover {color:${color}!important;font-size:60px!important}
			div:where(.swal2-icon) {
				position: relative !important;
				box-sizing: content-box !important;
				justify-content: center !important;
				width: 5em !important;
				height: 5em !important;
				margin: 2.5em auto .6em !important;
				border: 0.25em solid !important;
				border-radius: 50% !important;
				font-family: inherit !important;
				line-height: 5em !important;
				cursor: default !important;
				user-select: none !important;
			}`;
		let bilicss = `
			[class^="composition-check"] {
				display: inline-block !important;
				cursor: pointer !important;
			}

			.composition-badge {
				display: inline-flex !important;
 				justify-content: center !important;
 				align-items: center !important;
				width: fit-content !important;
 				background: ${color}25 !important;
 				border-radius: 10px !important;
 				margin: 0 6px 0 6px !important;
 				font-family: PingFang SC, HarmonyOS_Regular, Helvetica Neue, Microsoft YaHei, sans-serif !important;
				font-weight: normal !important;
				cursor: pointer !important;
			}

			.composition-name {
 				line-height: 13px !important;
 				font-size: 13px !important;
				color: ${color} !important;
				padding: 2px 8px !important;
			}

			.composition-icon {
				color: ${color} !important;
				background: transparent !important;
				border-radius: 50% !important;
				width: 25px !important;
				height: 25px !important;
				border: 2px solid ${color}80 !important;
				margin: -6px !important;
				margin-right: 6px !important;
				display: flex !important;
				justify-content: center !important;
				align-items: center !important;
				font-size: 20px !important;
			}

			.composition-badge-control {
				display: inline-flex !important;
				justify-content: center !important;
				align-items: center !important;
				width: fit-content !important;
				background: #00000008 !important;
				border-radius: 10px !important;
				margin: 0 5px !important;
				font-family: PingFang SC, HarmonyOS_Regular, Helvetica Neue, Microsoft YaHei, sans-serif;
			}

			.composition-name-control {
				line-height: 13px !important;
				font-size: 12px !important;
				color: #00000050 !important;
				padding: 2px 8px !important;
			}
			`;
		if (text) return bilicss;

		// 先监听颜色方案变化 SweetAlert2-Default
		window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
			if (e.matches) {
				// 切换到暗色主题
				addStyle('swal-pub-style', 'style', GM_getResourceText('SwalDark'));
			} else {
				// 切换到浅色主题
				addStyle('swal-pub-style', 'style', GM_getResourceText('Swal'));
			}
		});

		// 再修改主题 SweetAlert2-Default
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			// 切换到暗色主题
			addStyle('swal-pub-style', 'style', GM_getResourceText('SwalDark'));
		} else {
			// 切换到浅色主题
			addStyle('swal-pub-style', 'style', GM_getResourceText('Swal'));
		}
		addStyle('SweetAlert2-User', 'style', swalcss);
		addStyle('BiliChecker-Style', 'style', bilicss);
	};

	// 准备好右上角的Toast提示
	let toast = Swal.mixin({
		toast: true,
		position: 'bottom-end',
		showConfirmButton: false,
		timer: 2700,
		heightAuto: false,
		scrollbarPadding: false,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener('mouseenter', Swal.stopTimer);
			toast.addEventListener('mouseleave', Swal.resumeTimer);
			toast.addEventListener('click', () => {
				window.location.reload(); // 刷新
			});
		}
	});

	// 提示信息
	const message = {
		success: (text) => {
			toast.fire({ html: text, icon: 'success' });
		},
		error: (text) => {
			toast.fire({ html: text, icon: 'error' });
		},
		warning: (text) => {
			toast.fire({ html: text, icon: 'warning' });
		},
		info: (text) => {
			toast.fire({ html: text, icon: 'info' });
		},
		question: (text) => {
			toast.fire({ html: text, icon: 'question' });
		}
	};

	class CodeError extends Error {
		constructor(message) {
			super(message);
			this.name = '';
		}
	}

	function generateBuvid3() {
		const uuid = () => {
			return 'xxxxxx'.replace(/[x]/g, function () {
				return Math.floor(Math.random() * 16).toString(16);
			});
		};
		const randomInt = Math.floor(Math.random() * 99999) + 1;
		const buvid3 = `${uuid()}${randomInt.toString().padStart(5, '0')}infoc`;
		return buvid3;
	}

	function detectComposition(id, name, single) {
		return new Promise(async (resolve, reject) => {
			try {
				// 存储检测结果的数组
				let found = [];

				// 设定请求
				let spaceRequest = request({
					url: spaceApiUrl + id,
					headers: {
						"user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
						"referer": "https://www.bilibili.com"
					},
				});

				let followingRequest = request({
					url: followingApiUrl + id,
					headers: {
						'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
					},
				});

				console.log(`【（改）B站成分检测器】即时\n正在检查用户 ${name} ${id} 的成分...`);

				// 检查用户是否在黑名单中
				try {
					for (let rule of checkers) {
						if (rule.blacklist) {
							for (let mid of rule.blacklist) {
								if (id.includes(mid)) {
									if (!found.includes(rule)) {
										found.push({
											...rule,
											reason: `黑名单`,
											keyword: "uid" + mid
										});
										if (single) break;
									}
								}
							}
						}
					}
				} catch (error) {
					if (debug) console.error(`【（改）B站成分检测器】即时\n获取 ${name} ${id} 是否在命中名单失败`, error);
				}

				// 检查动态内容
				try {
					let spaceContent = await spaceRequest;
					if (spaceContent.code === 0) {
						let items = spaceContent.data.items;
						for (let rule of checkers) {
							if (rule.keywords) {
								for (let i = 0; i < items.length; i++) {
									let itemContent = items[i]
									let spacefull = items;
									let pendant = itemContent.modules?.module_author?.avatar?.pendant?.text
									let content = itemContent.modules?.module_dynamic?.desc?.text
									if (
										pendant && spacefull && content &&
										rule.keywords.find(keyword => JSON.stringify(pendant).includes(keyword)) &&
										rule.keywords.find(keyword => JSON.stringify(spacefull).includes(keyword)) &&
										rule.keywords.find(keyword => JSON.stringify(content).includes(keyword))
									) {
										found.push({
											...rule,
											full: items[i],
											reason: `空间动态正文`,
											item: content,
											keyword: rule.keywords.find(keyword => JSON.stringify(spacefull).includes(keyword))
										});
										if (single) break;
									} else if (spacefull && rule.keywords.find(keyword => JSON.stringify(spacefull).includes(keyword))) {
										found.push({
											...rule,
											reason: `用户空间内容(动态/简介/认证)`,
											item: items,
											keyword: rule.keywords.find(keyword => JSON.stringify(items).includes(keyword))
										});
										if (single) break;
									}
								}
							}
						}
					} else if (spaceContent.code === -352) {
						console.error(`【（改）B站成分检测器】即时\n获取 ${name} ${id} 的空间动态失败，已触发哔哩哔哩风控，错误码：${spaceContent.code}`);
					} else {
						if (found.length > 0) {
							if (debug) console.error(`【（改）B站成分检测器】即时\n获取 ${name} ${id} 的空间动态失败，错误码：${spaceContent.code}`);
						} else {
							reject(new CodeError(`获取空间动态失败，错误码：${spaceContent.code}`));
						}
					}
				} catch (error) {
					if (debug) console.error(`【（改）B站成分检测器】即时\n获取 ${name} ${id} 的空间动态失败`, error);
				}

				// 检查关注列表
				try {
					let followingContent = await followingRequest;
					if (followingContent.code === 0) {
						let following = followingContent.data.list.map(it => it.mid)
						for (let rule of checkers) {
							if (rule.followings) {
								for (let mid of rule.followings) {
									if (following.includes(mid)) {
										if (!found.includes(rule)) {
											found.push({
												...rule,
												uid: "uid" + mid,
												reason: `关注列表`
											});
											if (single) break;
										}
									}
								}
							}
						}
					} else if (followingContent.code === 22115) {
						console.warn(`【（改）B站成分检测器】即时\n获取 ${name} ${id} 的关注列表失败，对方已关闭展示关注列表，错误码：${followingContent.code}`);
					} else if (followingContent.code === -352) {
						console.error(`【（改）B站成分检测器】即时\n获取 ${name} ${id} 的关注列表失败，已触发哔哩哔哩风控，错误码：${followingContent.code}`);
					} else {
						if (found.length > 0) {
							if (debug) console.error(`【（改）B站成分检测器】即时\n获取 ${name} ${id} 的关注列表失败，错误码：${followingContent.code}`);
						} else {
							reject(new CodeError(`获取关注列表失败，错误码：${followingContent.code}`));
						}
					}
				} catch (error) {
					if (debug) console.error(`【（改）B站成分检测器】即时\n获取 ${name} ${id} 的关注列表失败`, error);
				}

				// 返回检测结果
				if (found.length > 0) {
					console.log(`【（改）B站成分检测器】即时\n检测到 ${name} ${id} 的成分为\n`, JSON.parse(JSON.stringify(found.map(it => { return { name: it.displayName, reason: it.reason, item: it.item, keyword: it.keyword, uid: it.uid, full: it.full } }))))
				}
				resolve(found);
			} catch (error) {
				if (debug) console.error(`【（改）B站成分检测器】即时\n检测 ${name} ${id} 的成分失败`, error);
				reject(error)
			}
		})
	}

	function waitForKeyElements(selectorTxt, actionFunction, bWaitOnce, iframeSelector) {
		function findInShadowRoots(root, selector) {
			let elements = $(root).find(selector).toArray();

			$(root).find('*').each(function () {
				const shadowRoot = this.shadowRoot;
				if (shadowRoot) {
					elements = elements.concat(findInShadowRoots(shadowRoot, selector));
				}
			});

			return elements;
		}

		var targetElements;
		if (iframeSelector) {
			targetElements = $(iframeSelector).contents();
		} else {
			targetElements = $(document);
		}

		let allElements = findInShadowRoots(targetElements, selectorTxt);

		if (allElements.length > 0) {
			allElements.forEach(function (element) {
				var jThis = $(element);
				var alreadyFound = jThis.data('alreadyFound') || false;
				if (!alreadyFound) {
					var cancelFound = actionFunction(jThis);
					if (cancelFound) {
						// 停止查找
						return false;
					} else {
						jThis.data('alreadyFound', true);
					}
				}
			});
		}

		var controlObj = waitForKeyElements.controlObj || {};
		var controlKey = selectorTxt.replace(/[^\w]/g, "_");
		var timeControl = controlObj[controlKey];

		if (allElements.length > 0 && bWaitOnce && timeControl) {
			clearInterval(timeControl);
			delete controlObj[controlKey];
		} else {
			if (!timeControl) {
				timeControl = setInterval(function () {
					waitForKeyElements(selectorTxt, actionFunction, bWaitOnce, iframeSelector);
				}, 1000);
				controlObj[controlKey] = timeControl;
			}
		}

		waitForKeyElements.controlObj = controlObj;
	}


})
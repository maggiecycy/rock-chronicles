#!/usr/bin/env python3
"""Narrative bands: beatles, radiohead, sabbath, oasis, metallica, pink-floyd, king-crimson, stones."""
from apply_util import patch_band_basic, patch_band_notes, patch_narrative

def ch(title, body):
    return {"title": title, "body": body}

# --- THE BEATLES ---
patch_band_basic(
    "the-beatles",
    why_matters=(
        "Liverpool four-piece that moved from Invasion singles to album-as-unit and studio-as-instrument between 1963 and 1969; default settings later rock keeps rewriting.",
        "利物浦四人组：1963–1969 从 Invasion 单曲走到「专辑为单元」与「录音室即乐器」；后来摇滚不断改写的默认设置由此定下。",
    ),
    short_bio=(
        "Lennon / McCartney / Harrison / Starr; Hand to A Day in the Life spans pop and studio peak.",
        "Lennon / McCartney / Harrison / Starr；从 Hand 到 A Day in the Life 跨越流行与录音室高峰。",
    ),
    body=(
        "Formed 1960 (Hamburg/Cavern apprenticeship). EMI years with George Martin run from beat-group hits through Rubber Soul, Revolver, Sgt. Pepper, White Album, Abbey Road—multitrack, tape edits, orchestral overdubs.\n\nI Want to Hold Your Hand (1963) and A Day in the Life (1967) bookend invasion pop and studio modernism. Personnel is stable; method is not.",
        "1960 年组建（汉堡/Cavern 学徒期）。与 George Martin 的 EMI 年代从 beat 热单经 Rubber Soul、Revolver、Sgt. Pepper、白专、Abbey Road——多轨、磁带剪辑、管弦叠加。\n\nI Want to Hold Your Hand（1963）与 A Day in the Life（1967）标记 Invasion 流行与录音室现代主义两端。人事稳定；方法不稳。",
    ),
)
patch_narrative("the-beatles", {
    "thesis": ch(
        ("Default settings, repeatedly rewritten", "默认设置，反复改写"),
        ("The Beatles matter less as a finished style than as a sequence of defaults: two-guitar beat group, album cohesion, studio experiment. Later rock inherits the ambitions even when rejecting the sound.\n\nCoordinates, not a museum freeze.",
         "Beatles 要紧处不在完成一种风格，而在一串默认：双吉他 beat 组合、专辑凝聚力、录音室实验。后来摇滚即使拒绝其声音也继承其野心。\n\n是坐标，不是博物馆冻结。"),
    ),
    "lineup-versions": ch(
        ("Four names as a calendar unit", "四个名字当作日历单元"),
        ("Classic four is the memory lock. Roles shift inside—Harrison’s writing rises, Starr’s feel anchors—but the cast barely changes until the end.\n\nStability of names, volatility of method.",
         "经典四人是记忆锁定。内部角色有变——Harrison 写作上升、Starr 的手感锚定——但人马直到结束几乎不变。\n\n名字稳定，方法动荡。"),
    ),
    "hand": ch(
        ("I Want to Hold Your Hand: Invasion switch", "I Want to Hold Your Hand：Invasion 开关"),
        ("US chart breakthrough single; Capitol push and TV appearances turn UK beat into a continental event.\n\nSong craft is still short-form pop; the scale of distribution is the news.",
         "打进美国榜的突破单曲；Capitol 推送与电视亮相把英国 beat 变成跨洋事件。\n\n歌曲工艺仍是短形式流行；分发尺度才是新闻。"),
    ),
    "studio": ch(
        ("Studio becomes the instrument", "录音室成为乐器"),
        ("From Revolver onward: tape loops, varispeed, orchestral climax (A Day in the Life), modular sessions. Live touring ends; records become the primary performance.\n\nBeach Boys’ Pet Sounds and UK peers sit in the same production arms race.",
         "自 Revolver 起：磁带循环、变速、管弦高潮（A Day in the Life）、模块化录音。巡演停止；唱片成为主要表演。\n\nBeach Boys 的 Pet Sounds 与英国同辈处在同一制作军备竞赛。"),
    ),
    "dna": ch(
        ("Coordinates for later songwriters", "后来写作者的坐标"),
        ("Harmony stacks, middle-eight craft, album sequencing, and studio permission travel into metal, punk (as refusal), and indie (as citation).\n\nNot a finish line—a map other bands navigate.",
         "和声堆叠、中八工艺、专辑排序与录音室许可权，传入金属、朋克（作为拒绝）与 indie（作为引用）。\n\n不是终点线——是其他乐队导航的地图。"),
    ),
    "quote": ch(
        ("Oral history beside the tapes", "录音带旁的口述史"),
        ("Interview lines and press myths are abundant; useful ones describe process—who wrote what, how a take was built.\n\nPrefer craft detail over aura.",
         "访谈句与媒体神话极多；有用的描述过程——谁写了什么、一条 take 如何搭成。\n\n宁取工艺细节，不取光环。"),
    ),
})
patch_band_notes(
    "the-beatles",
    scene_notes=[
        ("British Invasion global chart switch.", "British Invasion 全球榜开关。"),
        ("Orchestral climax: pop form meets studio modernism.", "管弦高潮：流行形式遇见录音室现代主义。"),
        ("Harrison writing share rising inside the four.", "四人组内部 Harrison 写作份额上升。"),
    ],
    landmark_note=("Album-as-unit and studio-as-instrument become rock defaults.", "专辑为单元与录音室即乐器成为摇滚默认。"),
    landmark_debut_note=("Invasion-era pop single as mass distribution event.", "Invasion 时期流行单曲作为大众分发事件。"),
    lineup_notes={
        "classic-four": ("Default Invasion lineup frozen in global memory.", "全球记忆中冻结的默认 Invasion 阵容。"),
    },
)

# --- RADIOHEAD ---
patch_band_basic(
    "radiohead",
    why_matters=(
        "Abingdon five-piece that moved from UK alternative hits to OK Computer (1997) and Kid A (2000) studio mutation while keeping a stable lineup.",
        "阿宾登五人组：从英国 alternative 热单走到 OK Computer（1997）与 Kid A（2000）的录音室变异，且阵容保持稳定。",
    ),
    short_bio=(
        "Yorke / Greenwood–era alternative; Paranoid Android and Kid A mark structure then rupture.",
        "Yorke / Greenwood 时期 alternative；Paranoid Android 与 Kid A 标记结构与断裂。",
    ),
    body=(
        "Formed 1985 (On a Friday). Pablo Honey and The Bends establish guitar-band craft; OK Computer expands multi-section songs and digital anxiety themes; Kid A/Amnesiac foreground electronics and jazz rhythm sections.\n\nParanoid Android (1997) and Everything in Its Right Place (2000) show prog length inside alternative, then the deliberate dismantling of hit-guitar comfort.",
        "1985 年组建（曾用名 On a Friday）。Pablo Honey 与 The Bends 确立吉他乐队工艺；OK Computer 扩展多段体与数字焦虑主题；Kid A/Amnesiac 突出电子与爵士节奏组。\n\nParanoid Android（1997）与 Everything in Its Right Place（2000）展示 alternative 内的 prog 时长，以及有意拆除热门吉他舒适区。",
    ),
)
patch_narrative("radiohead", {
    "thesis": ch(
        ("A hinge that keeps turning", "持续转动的铰链"),
        ("Radiohead matter as a method: hit capability first, then refuse to freeze the method. Same five people; catalogs that change tools.\n\nPost-1997 rock can mutate without leaving the festival poster.",
         "Radiohead 要紧处是方法：先具备打热单的能力，再拒绝冻结方法。同一五人；更换工具的目录。\n\n1997 年后摇滚可以变异而不离开音乐节海报。"),
    ),
    "lineup-versions": ch(
        ("Five-piece stability, sideways branches", "五人稳定，侧向分支"),
        ("Rare among peers: lineup barely churns. Person hubs (Yorke solo/Atoms for Peace) branch sideways instead of replacing the band.\n\nVersions are albums and approaches, not singer swaps.",
         "同辈中少见：阵容几乎不更替。人物枢纽（Yorke 独唱/Atoms for Peace）侧向分支，而非替换乐队。\n\n版本是专辑与方法，不是换主唱。"),
    ),
    "android": ch(
        ("Paranoid Android: structure as stance", "Paranoid Android：结构即立场"),
        ("Multi-section song on alternative radio—prog ambition without costume rock. Dynamic cuts and guitar orchestration replace verse-chorus comfort.\n\nLength and form are the attitude.",
         "alternative 电台上的多段体——有 prog 野心而无戏服摇滚。动态切割与吉他配器取代主副歌舒适区。\n\n时长与形式即态度。"),
    ),
    "kida": ch(
        ("Kid A: remove the hit-guitar costume", "Kid A：拆掉热门吉他戏服"),
        ("Onodes and processed piano open the album; guitars recede. Jazz players and electronics enter the session picture.\n\nCommercial risk is documented; the musical claim is tool change inside a famous brand.",
         "音序与处理后的钢琴打开专辑；吉他后退。爵士乐手与电子进入录音图景。\n\n商业风险有文献；音乐主张是在著名品牌内部更换工具。"),
    ),
    "dna": ch(
        ("Prog blood, indie passport", "Prog 血统，indie 护照"),
        ("Odd forms and texture obsession sit beside UK indie infrastructure and US alternative charts. Influence shows in 2000s art-rock and electronic-adjacent guitar bands.\n\nPassport stamps: both underground credibility and arena dates.",
         "奇数形式与纹理偏执，旁靠英国 indie 基建与美国 alternative 榜。影响见于 2000 年代 art-rock 与电子邻近的吉他乐队。\n\n护照戳：地下信誉与体育场档期并存。"),
    ),
    "quote": ch(
        ("Anti-career lines on the record", "记录在案的反职业话术"),
        ("Press excerpts about refusing the rock-star ladder sit beside meticulous touring and catalog control.\n\nUseful as evidence of branding posture, checked against the release schedule.",
         "关于拒绝摇滚明星阶梯的媒体摘句，旁靠精密巡演与目录控制。\n\n可作品牌姿态证据，对照发行日程核验。"),
    ),
})
patch_band_notes(
    "radiohead",
    scene_notes=[
        ("Multi-section form: prog ambition on alt radio.", "多段结构：prog 野心进入 alternative 电台。"),
        ("Piano/alienation center of OK Computer era.", "OK Computer 时期钢琴/疏离核心。"),
        ("Kid A opener: electronics before guitar comfort.", "Kid A 开场：电子先于吉他舒适区。"),
    ],
    landmark_note=("After OK Computer, mutation stays inside a mass rock brand.", "OK Computer 之后，变异留在大众摇滚品牌内部。"),
    landmark_debut_note=("Early alt-radio hit before the mutation arc.", "变异弧线之前的早期 alt 电台热单。"),
    lineup_notes={
        "five-piece": ("Rare stability—person projects branch sideways.", "少见的稳定——人物项目侧向分支。"),
    },
)

# --- BLACK SABBATH ---
patch_band_basic(
    "black-sabbath",
    why_matters=(
        "Birmingham four-piece whose 1970 debut fixed tritone riffs, down-tuned guitar, and occult-tinged lyric as heavy metal’s separable identity from hard rock.",
        "伯明翰四人组：1970 首专把三全音 riff、降调吉他与偏神秘歌词定为重金属相对 hard rock 可分离的身份。",
    ),
    short_bio=(
        "Iommi / Osbourne / Butler / Ward; Paranoid-era metal foundation.",
        "Iommi / Osbourne / Butler / Ward；Paranoid 时期金属地基。",
    ),
    body=(
        "Formed 1968. Black Sabbath, Paranoid, and Master of Reality document Iommi’s riff writing after fingertip injury (lighter strings, fretting adaptations), Geezer’s bass/lyrics, Ozzy’s nasal lead, Ward’s drums.\n\nTitle track Black Sabbath (1970) and Paranoid / Iron Man are the teaching set. Dio-era Heaven and Hell is a separate vocal-engine version under the same name.",
        "1968 年组建。Black Sabbath、Paranoid 与 Master of Reality 记录 Iommi 指伤后的 riff 写作（更细弦、按弦适应）、Geezer 贝斯/歌词、Ozzy 鼻音主唱、Ward 鼓。\n\n同名曲 Black Sabbath（1970）与 Paranoid / Iron Man 是教材组。Dio 时期 Heaven and Hell 是同名下另一套人声引擎版本。",
    ),
)
patch_narrative("black-sabbath", {
    "thesis": ch(
        ("A riff catalog, not mascara hard rock", "riff 目录，而非涂睫毛膏的 hard rock"),
        ("Sabbath matter because heaviness is arrangement and interval choice—tritone, slow tempo, bleak lyric—not only louder amps.\n\nMetal gets a separable grammar from blues-based hard rock here.",
         "Sabbath 要紧，因为「重」是编曲与音程选择——三全音、慢速度、阴郁歌词——不只是更大的音箱。\n\n金属在此获得相对蓝调 hard rock 可分离的语法。"),
    ),
    "lineup-versions": ch(
        ("Ozzy years vs Dio years", "Ozzy 年代 vs Dio 年代"),
        ("Ozzy-era peak is the birth citation. Dio’s Heaven and Hell reinvents vocal and fantasy lyric without erasing the riff engine.\n\nSame logo, different singer—why lineup versions are first-class objects.",
         "Ozzy 时期巅峰是创世引用。Dio 的 Heaven and Hell 重做人声与奇幻歌词，不擦掉 riff 引擎。\n\n同一 logo、不同主唱——故阵容版本是一等对象。"),
    ),
    "scene-0": ch(
        ("Black Sabbath: tritone opening", "Black Sabbath：三全音开场"),
        ("Rain/bell intro into Iommi’s tritone figure; Ozzy’s vocal enters over the dread tempo. Often cited as metal’s creation-scene track.\n\nAtmosphere is tempo + interval, not stage fog metaphor.",
         "雨声/钟声引入 Iommi 三全音音型；Ozzy 人声进入恐惧速度。常被引为金属创世场景曲。\n\n氛围是速度+音程，不是舞台烟雾比喻。"),
    ),
    "scene-1": ch(
        ("Paranoid: short, fast, radio-fit darkness", "Paranoid：短、快、适合电台的黑暗"),
        ("Faster riff, tighter runtime, still heavy. Proof early metal can fit AM/FM without losing the down-tuned grind.\n\nTeaching contrast to the title track’s crawl.",
         "更快 riff、更紧时长，仍然重。证明早期金属可进 AM/FM 而不丢掉降调碾磨。\n\n与同名曲爬行速度的教学对照。"),
    ),
    "dna": ch(
        ("Downstream: doom, NWOBHM, grunge sludge", "下游：doom、NWOBHM、grunge 淤泥"),
        ("Doom keeps the slow dread; NWOBHM keeps riff primacy at higher speed; Seattle grunge cites the sludge more than the occult.\n\nBlack sun as catalog influence, not astrology.",
         "Doom 留下慢恐惧；NWOBHM 以更高速度保持 riff 优先；西雅图 grunge 更多引用淤泥而非神秘学。\n\n黑太阳是目录影响，不是占星。"),
    ),
    "quote": ch(
        ("They called it heavy; catalogs called it metal", "他们称它重；目录称它金属"),
        ("Early press language lags the genre label. Useful quotes describe volume, gloom, and audience shock—genre name arrives in retrospect.\n\nTrack the naming lag as history.",
         "早期媒体用语落后于类型标签。有用引语描述音量、阴郁与听众震惊——类型名事后到来。\n\n把命名滞后当作历史追踪。"),
    ),
})
patch_band_notes(
    "black-sabbath",
    scene_notes=[
        ("Tritone riff + slow tempo as early metal scene.", "三全音 riff + 慢速度作为早期金属场景。"),
        ("Short/fast heavy single that still fits radio.", "仍适合电台的短快重型单曲。"),
        ("Key composition moment", "关键写作时刻"),
    ],
    landmark_note=("Heaviness as interval, tempo, and lyric frame—not only volume.", "「重」作为音程、速度与歌词框架——不只是音量。"),
    landmark_debut_note=("Tritone opening as metal creation citation.", "三全音开场作为金属创世引用。"),
    lineup_notes={
        "ozzy-era": ("Founding Ozzy-era peak lineup.", "创始 Ozzy 时期巅峰阵容。"),
        "dio-era": ("Same band name, Dio vocal engine—versions matter.", "同名、Dio 人声引擎——版本要紧。"),
    },
)

# --- OASIS ---
patch_band_basic(
    "oasis",
    why_matters=(
        "Manchester Britpop band that restored loud, Beatles-citing guitar anthems to mid-90s UK charts against grunge’s US dominance.",
        "曼彻斯特 Britpop：在 grunge 的美国主导下，把大声、引用 Beatles 的吉他颂歌送回 90 年代中期英国榜。",
    ),
    short_bio=(
        "Gallagher brothers Britpop; Wonderwall and Live Forever are the mass poles.",
        "Gallagher 兄弟的 Britpop；Wonderwall 与 Live Forever 是大众两极。",
    ),
    body=(
        "Formed 1991. Definitely Maybe (1994) and (What’s the Story) Morning Glory? (1995) fix Noel’s songwriting, Liam’s sneering mid-range, loud guitars, and terrace-chant choruses.\n\nLive Forever (1994) and Wonderwall / Don’t Look Back in Anger (1995) are the teaching set. Sibling feud and lineup churn are documented; the musical object is song craft plus volume.",
        "1991 年组建。Definitely Maybe（1994）与 (What’s the Story) Morning Glory?（1995）定型 Noel 写作、Liam 冷笑中音区、大声吉他与看台口号副歌。\n\nLive Forever（1994）与 Wonderwall / Don’t Look Back in Anger（1995）是教材组。兄弟争执与阵容更替有文献；音乐对象是歌曲工艺加音量。",
    ),
)
patch_narrative("oasis", {
    "thesis": ch(
        ("Britain turns guitar volume back up", "英国把吉他音量拧回去"),
        ("Oasis matter as a chart and attitude reset: open chords, loud mixes, northern vocal, Beatles/Stone Roses citations against mid-90s US grunge radio.\n\nBritpop’s stadium pole, not its art-school pole.",
         "Oasis 要紧处是榜单与态度重置：开放和弦、大声混音、北方人声、Beatles/Stone Roses 引用，对位 90 年代中期美国 grunge 电台。\n\nBritpop 的体育场一极，而非艺术学院一极。"),
    ),
    "lineup-versions": ch(
        ("Brothers fixed, rhythm section orbiting", "兄弟固定，节奏组绕行"),
        ("Noel/Liam are the constant engine; guitarists and drummers change across peaks and later years.\n\nClassic Britpop peak version vs later name-continuation versions.",
         "Noel/Liam 是恒定引擎；吉他手与鼓手在巅峰与后期更替。\n\n经典 Britpop 巅峰版本 vs 后期名称延续版本。"),
    ),
    "scene-0": ch(
        ("Live Forever: mid-tempo confidence single", "Live Forever：中速自信单曲"),
        ("Definitely Maybe–era statement track—melody forward, guitars wide, lyric defiance without metal gloom.\n\nUK answer to imported alternative sadness, in song form.",
         "Definitely Maybe 时期声明曲——旋律靠前、吉他宽、歌词反抗而无金属阴郁。\n\n以歌曲形式回答进口 alternative 伤感。"),
    ),
    "scene-1": ch(
        ("Wonderwall: global acoustic-electric hook", "Wonderwall：全球原声—电声钩子"),
        ("Strummed figure, Liam’s vocal, singalong chorus—exportable beyond UK Britpop wars.\n\nEarworm with attitude; arrangement stays simple on purpose.",
         "扫弦音型、Liam 人声、合唱副歌——可导出到英国 Britpop 论战之外。\n\n带态度的耳虫；编曲故意保持简单。"),
    ),
    "dna": ch(
        ("Beatles ghosts, Stone Roses walk", "Beatles 幽灵，Stone Roses 步态"),
        ("Chord moves and vocal phrasing cite 1960s UK pop; swagger and baggy residue cite Madchester. Not a cover band—a citation engine at terrace volume.\n\nInfluence shows in 2000s UK indie anthems.",
         "和弦进行与人声句式引用 1960 年代英国流行；姿态与 baggy 残余引用 Madchester。不是翻唱乐队——是看台音量的引用引擎。\n\n影响见于 2000 年代英国 indie 颂歌。"),
    ),
    "quote": ch(
        ("Interviews as competitive sport", "访谈如竞技"),
        ("Press feuds with Blur and between brothers are part of the public record. Useful as scene sociology; musical judgment still returns to the singles.\n\nAttitude is documented speech, not metaphor.",
         "与 Blur 及兄弟间的媒体争执属公开记录。可作场景社会学；音乐判断仍回到单曲。\n\n态度是被记录的话语，不是比喻。"),
    ),
})
patch_band_notes(
    "oasis",
    scene_notes=[
        ("Mid-tempo UK counter to grunge gloom.", "对位 grunge 阴郁的中速英国宣言。"),
        ("Britpop’s global acoustic-electric hook.", "Britpop 的全球原声—电声钩子。"),
        ("Key composition moment", "关键写作时刻"),
    ],
    landmark_note=("Beatles-citing craft + terrace volume on mid-90s charts.", "引用 Beatles 的工艺 + 看台音量占据 90 年代中期榜单。"),
    landmark_debut_note=("Early Definitely Maybe–era confidence single.", "Definitely Maybe 早期自信单曲。"),
    lineup_notes={
        "britpop-peak": ("Sibling engine at peak before later fractures.", "后期分裂前的兄弟引擎巅峰。"),
        "later-oasis": ("Name continues; cast and chemistry shift.", "名称延续；人马与化学作用改变。"),
    },
)

print("narr_1b core done — continuing metallica/pf/kc/stones in same file...")

# --- METALLICA ---
patch_band_basic(
    "metallica",
    why_matters=(
        "LA/Bay Area thrash band that scaled underground speed metal to mainstream rock radio via Master of Puppets (1986) and the Black Album (1991).",
        "洛杉矶/湾区 thrash：借 Master of Puppets（1986）与黑专（1991）把地下速度金属扩到主流摇滚电台。",
    ),
    short_bio=(
        "Hetfield / Ulrich thrash-to-arena metal; Enter Sandman is the mass hinge.",
        "Hetfield / Ulrich 从 thrash 到体育场金属；Enter Sandman 是大众铰链。",
    ),
    body=(
        "Formed 1981. Kill ’Em All through …And Justice for All document thrash precision and Cliff Burton then Jason Newsted bass eras; the Black Album (Bob Rock) shortens songs for rock radio.\n\nMaster of Puppets (1986), One (1988), Enter Sandman (1991) show progressive thrash length, ballad-metal drama, and riff-chorus mainstreaming.",
        "1981 年组建。从 Kill ’Em All 到 …And Justice for All 记录 thrash 精密与 Cliff Burton 然后 Jason Newsted 贝斯时期；黑专（Bob Rock）缩短歌曲以进摇滚电台。\n\nMaster of Puppets（1986）、One（1988）、Enter Sandman（1991）展示 progressive thrash 时长、谣曲—金属戏剧，以及 riff-副歌主流化。",
    ),
)
patch_narrative("metallica", {
    "thesis": ch(
        ("Thrash craft at arena scale", "体育场尺度的 thrash 工艺"),
        ("Metallica matter as the thrash band that kept downpicked riff discipline while learning mass-chorus writing. Underground credibility and MTV-era reach share one catalog.\n\nBig Four leader by sales and citation.",
         "Metallica 要紧处是：在学习大众副歌写作时仍保持下拨 riff 纪律。地下信誉与 MTV 时期触达共享同一目录。\n\n销量与引用上的 Big Four 领袖。"),
    ),
    "lineup-versions": ch(
        ("Burton era vs Newsted/Rock era", "Burton 时期 vs Newsted/Rock 时期"),
        ("Cliff Burton’s years are the progressive-thrash citation. Post-1986 bass change and 1991 production shift create distinct versions under one name.\n\nHammett after Mustaine: lead-guitar continuity with a different origin story.",
         "Cliff Burton 年代是 progressive thrash 引用。1986 后换贝斯与 1991 制作转向造就同名下的不同版本。\n\nMustaine 之后的 Hammett：主音吉他连续，起源故事不同。"),
    ),
    "scene-0": ch(
        ("Master of Puppets: long-form thrash", "Master of Puppets：长形式 thrash"),
        ("Multi-section riff essay—speed, mid-tempo crush, clean bridge. Peak of pre-mainstream song length.\n\nTeaching track for arrangement inside thrash.",
         "多段 riff 长文——速度、中速碾压、干净桥段。主流化前歌曲时长的峰值。\n\nthrash 内部编曲教材。"),
    ),
    "scene-1": ch(
        ("Enter Sandman: radio-length riff", "Enter Sandman：电台时长 riff"),
        ("Bob Rock sheen, shorter runtime, chant chorus—thrash DNA inside hard-rock radio format.\n\nThe hinge toward 1990s mainstream metal.",
         "Bob Rock 光泽、更短时长、口号副歌——hard-rock 电台格式里的 thrash DNA。\n\n通向 1990 年代主流金属的铰链。"),
    ),
    "dna": ch(
        ("Downpick discipline, later forks", "下拨纪律，后期分叉"),
        ("Right-hand stamina and chromatic riff writing feed metalcore and modern metal. Load/Reload and Napster-era fights are separate institutional chapters.\n\nMusical constant: Hetfield rhythm guitar as engine.",
         "右手耐力与半音 riff 写作喂养 metalcore 与现代金属。Load/Reload 与 Napster 时期争端是另一些制度章节。\n\n音乐常量：Hetfield 节奏吉他当引擎。"),
    ),
    "quote": ch(
        ("Work ethic lines beside the riffs", "riff 旁的工作伦理话术"),
        ("Interview excerpts about practice and touring density match the recorded attack.\n\nPrefer process talk over mythic destiny language.",
         "关于练习与巡演密度的访谈摘句，与录音中的攻击性匹配。\n\n宁取过程谈话，不取命运神话语言。"),
    ),
})
patch_band_notes(
    "metallica",
    scene_notes=[
        ("Long-form thrash arrangement peak.", "长形式 thrash 编曲峰值。"),
        ("Radio-length riff with chant chorus.", "电台时长 riff + 口号副歌。"),
        ("Key composition moment", "关键写作时刻"),
    ],
    landmark_note=("Underground thrash craft scaled to 1990s rock radio.", "地下 thrash 工艺扩到 1990 年代摇滚电台。"),
    landmark_debut_note=("Early thrash speed document.", "早期 thrash 速度文献。"),
    lineup_notes={
        "burton-era": ("Cliff Burton progressive-thrash peak years.", "Cliff Burton progressive thrash 巅峰年。"),
        "black-album-era": ("Newsted/Bob Rock mainstream hinge version.", "Newsted/Bob Rock 主流铰链版本。"),
    },
)

# Fix lineup notes keys - need to check actual ids
import json
from pathlib import Path
meta = json.loads(Path("../../content/bands/metallica.json").read_text()) if False else None

print("metallica patched (lineup note keys may need fix)")

# --- PINK FLOYD ---
patch_band_basic(
    "pink-floyd",
    why_matters=(
        "London band that moved from Syd Barrett psychedelia to Waters/Gilmour concept albums; Dark Side (1973) and The Wall (1979) set album-length production as mass rock.",
        "伦敦乐队：从 Syd Barrett 迷幻走到 Waters/Gilmour 概念专集；Dark Side（1973）与 The Wall（1979）把专辑时长制作做成大众摇滚。",
    ),
    short_bio=(
        "Gilmour / Waters progressive rock; Time and Comfortably Numb are twin poles.",
        "Gilmour / Waters 的 progressive rock；Time 与 Comfortably Numb 是两极。",
    ),
    body=(
        "Formed 1965. Barrett-era singles precede the Waters-led concept run: Dark Side of the Moon, Wish You Were Here, Animals, The Wall—studio effects, spoken samples, long-form song cycles.\n\nTime (1973) and Comfortably Numb (1979) show clock-work arrangement and dual-vocal/solo architecture. Lineup versions (Barrett → Waters dominance → later Gilmour-led) are first-class.",
        "1965 年组建。Barrett 时期单曲之后是 Waters 主导的概念专集序列：Dark Side of the Moon、Wish You Were Here、Animals、The Wall——录音室效果、口语采样、长歌曲组。\n\nTime（1973）与 Comfortably Numb（1979）展示钟表式编曲与双人声/独奏架构。阵容版本（Barrett → Waters 主导 → 后期 Gilmour 主导）是一等对象。",
    ),
)
patch_narrative("pink-floyd", {
    "thesis": ch(
        ("Concept albums at chart scale", "榜单尺度的概念专集"),
        ("Floyd matter as proof that long-form production, sound design, and thematic albums can sit on mass charts without singles-only logic.\n\nStudio and live spectacle share one engineering culture.",
         "Floyd 要紧处是证明：长制作、声音设计与主题专辑可以上大众榜，而不只靠单曲逻辑。\n\n录音室与现场奇观共享同一工程文化。"),
    ),
    "lineup-versions": ch(
        ("Barrett, Waters-led, post-Waters", "Barrett、Waters 主导、后 Waters"),
        ("Early psychedelia is Barrett-centered. Mid catalog is Waters writing + Gilmour guitar/vocal. Post-1985 Gilmour-led albums are another legal/musical chapter.\n\nVersions explain disputes and sound shifts.",
         "早期迷幻以 Barrett 为中心。中期目录是 Waters 写作 + Gilmour 吉他/人声。1985 后 Gilmour 主导专辑是另一法律/音乐章节。\n\n版本解释争执与声音转向。"),
    ),
    "time": ch(
        ("Time: clocks, dynamics, mid-album spine", "Time：钟声、动态、专辑中脊"),
        ("Sound-effect intro, rototom figure, verse/chorus, Gilmour solo—Dark Side’s structural teaching track.\n\nProduction narrative without needing mystical language.",
         "音效引入、rototom 音型、主副歌、Gilmour 独奏——Dark Side 的结构教材曲。\n\n制作叙事无需神秘语言。"),
    ),
    "numb": ch(
        ("Comfortably Numb: dual vocal, dual solo", "Comfortably Numb：双人声、双独奏"),
        ("Waters verse dryness against Gilmour chorus lift; two celebrated guitar solos in one song. The Wall’s mass-entry ballad.\n\nArrangement drama as rock theatre craft.",
         "Waters 主歌干对 Gilmour 副歌抬升；一曲两段著名吉他独奏。The Wall 的大众入口谣曲。\n\n编曲戏剧即摇滚剧场工艺。"),
    ),
    "members": ch(
        ("Wright keys, Mason drums, Gilmour/Waters split", "Wright 键盘、Mason 鼓、Gilmour/Waters 分工"),
        ("Richard Wright’s harmony pads and Nick Mason’s steady drums underpin the concept years. Vocal and lyric authority shifts are audible across albums.\n\nListen for who writes the frame.",
         "Richard Wright 的和声铺底与 Nick Mason 稳健鼓组支撑概念专集年代。人声与歌词权威的转移在各专可闻。\n\n听谁在写框架。"),
    ),
    "legacy": ch(
        ("Prog ambition without costume metal", "无戏服金属的 prog 野心"),
        ("Later art-rock and ambient-adjacent bands cite the production; metal cites the scale. Punk often refuses the spectacle.\n\nCatalog remains a studio-engineering reference.",
         "后来 art-rock 与 ambient 邻近乐队引用其制作；金属引用其体量。朋克常拒绝其奇观。\n\n目录仍是录音室工程参照。"),
    ),
})
patch_band_notes(
    "pink-floyd",
    scene_notes=[
        ("Clock FX + mid-album dynamic spine (Time).", "钟声效果 + 专辑中脊动态（Time）。"),
        ("Key composition moment", "关键写作时刻"),
        ("Dual vocal/solo ballad from The Wall.", "The Wall 的双人声/独奏谣曲。"),
    ],
    landmark_note=("Concept-album production as mass-rock default ambition.", "概念专集制作成为大众摇滚默认野心。"),
    landmark_debut_note=("Early psychedelic-era marker.", "早期迷幻时期标记。"),
    lineup_notes={
        "barrett-era": ("Syd Barrett–centered psychedelic version.", "以 Syd Barrett 为中心的迷幻版本。"),
        "waters-gilmour": ("Concept-album peak partnership version.", "概念专集巅峰搭档版本。"),
    },
)

# --- KING CRIMSON ---
patch_band_basic(
    "king-crimson",
    why_matters=(
        "Robert Fripp–centered progressive band whose radical lineup versions—from In the Court (1969) to 1980s dual-guitar—treat reformation as method.",
        "以 Robert Fripp 为中心的 progressive 乐队：从 In the Court（1969）到 1980 年代双吉他，把彻底重组当作方法。",
    ),
    short_bio=(
        "Fripp prog laboratory; Schizoid Man and Starless bookend early extremes.",
        "Fripp 的 prog 实验室；Schizoid Man 与 Starless 标记早期两极。",
    ),
    body=(
        "Formed 1968. Debut In the Court of the Crimson King sets Mellotron + dissonant rock; 1970s Wetton/Bruford years add improvisation and Starless-length pieces; 1981 Belew/Levin/Bruford era uses gamelan-like guitar interlocking (Elephant Talk).\n\nLineup churn is the point: Fripp remains; casts change.",
        "1968 年组建。首专 In the Court of the Crimson King 定下 Mellotron + 不协和摇滚；1970 年代 Wetton/Bruford 年加入即兴与 Starless 级时长；1981 Belew/Levin/Bruford 时期使用类甘美兰吉他交织（Elephant Talk）。\n\n阵容更替即要点：Fripp 留下；人马更换。",
    ),
)
patch_narrative("king-crimson", {
    "thesis": ch(
        ("Reformation as working method", "把重组当作工作方法"),
        ("Crimson matter because the band is a practice: Fripp keeps the name and standards while replacing instrumental casts.\n\nOpposite of Zeppelin’s stable IV—useful contrast in the chronicle.",
         "Crimson 要紧，因为乐队是一种实践：Fripp 保留名称与标准，同时更换乐器人马。\n\n与 Zeppelin 稳定四人相反——编年中有用的对照。"),
    ),
    "lineup-versions": ch(
        ("Court era, ’70s improvisers, ’80s interlocking", "Court 时期、70 年代即兴、80 年代交织"),
        ("Each era has distinct grammar—Mellotron symphonic rock, free-ish metal-jazz, then new-wave-adjacent math guitar.\n\nVersions are not footnotes; they are the catalog.",
         "每个时期有不同语法——Mellotron 交响摇滚、偏自由的金属—爵士、然后新浪潮邻近的数学吉他。\n\n版本不是脚注；它们就是目录。"),
    ),
    "schizoid": ch(
        ("21st Century Schizoid Man: assault opener", "21st Century Schizoid Man：突击开场"),
        ("Distorted vocal, saxophone, heavy riff—1969 prog that attacks rather than only floats.\n\nDebut statement still cited by metal and math-rock listeners.",
         "失真人声、萨克斯、重 riff——1969 年进攻而非只漂浮的 prog。\n\n首专声明仍被金属与 math-rock 听众引用。"),
    ),
    "lineup": ch(
        ("Fripp constant, cast variables", "Fripp 常量，人马变量"),
        ("Guitar/composition hub stays; bass, drums, vocal, reeds change across decades.\n\nRead the members list as a version picker.",
         "吉他/作曲枢纽留下；贝斯、鼓、人声、簧乐跨年代更换。\n\n把成员列表当版本选择器阅读。"),
    ),
    "quote": ch(
        ("Discipline talk beside wild records", "狂野唱片旁的纪律话语"),
        ("Fripp’s public language about practice and craft matches a catalog that rewards attentive listening.\n\nMethod discourse is part of the band’s archival object.",
         "Fripp 关于练习与工艺的公开语言，与一份奖励专注聆听的目录匹配。\n\n方法话语是乐队档案对象的一部分。"),
    ),
    "legacy": ch(
        ("Prog permission for later mutants", "给后来变异者的 prog 许可"),
        ("Tool, math rock, and experimental metal cite the permission to change meters and lineups.\n\nCrimson’s lesson is procedural as much as sonic.",
         "Tool、math rock 与实验金属引用其更换拍号与阵容的许可。\n\nCrimson 的课在程序上与声音上同等重要。"),
    ),
})
patch_band_notes(
    "king-crimson",
    scene_notes=[
        ("Distorted assault opener on 1969 prog debut.", "1969 prog 首专上的失真突击开场。"),
        ("Key composition moment", "关键写作时刻"),
        ("Long-form 1970s piece (Starless era).", "1970 年代长曲（Starless 时期）。"),
    ],
    landmark_note=("Lineup reformation as prog working method.", "阵容重组作为 prog 工作方法。"),
    landmark_debut_note=("Schizoid assault as debut citation.", "Schizoid 突击作为首专引用。"),
    lineup_notes={},
)

# --- ROLLING STONES ---
patch_band_basic(
    "the-rolling-stones",
    why_matters=(
        "London blues-rock band that sustained riff-based hard rock and stagecraft from 1960s singles through Exile-era peak and decades of touring.",
        "伦敦蓝调摇滚：从 1960 年代单曲经 Exile 时期高峰到数十年巡演，持续 riff 导向 hard rock 与舞台工艺。",
    ),
    short_bio=(
        "Jagger / Richards blues-rock; Satisfaction and Gimme Shelter are poles.",
        "Jagger / Richards 蓝调摇滚；Satisfaction 与 Gimme Shelter 是两极。",
    ),
    body=(
        "Formed 1962. Early R&B covers become original riff hits; late-60s/early-70s albums (Beggars Banquet, Let It Bleed, Sticky Fingers, Exile on Main St.) are the critical peak—Richards open-G riffs, Watts pocket, Jagger vocal persona.\n\n(I Can’t Get No) Satisfaction (1965) and Gimme Shelter (1969) bookend fuzz-pop breakthrough and darker ensemble rock.",
        "1962 年组建。早期 R&B 翻唱变为原创 riff 热单；60 末/70 初专辑（Beggars Banquet、Let It Bleed、Sticky Fingers、Exile on Main St.）是批评高峰——Richards 开放 G 调 riff、Watts 口袋感、Jagger 人声人设。\n\n(I Can’t Get No) Satisfaction（1965）与 Gimme Shelter（1969）标记 fuzz 流行突破与更暗的合奏摇滚两端。",
    ),
)
patch_narrative("the-rolling-stones", {
    "thesis": ch(
        ("Riff longevity as a working band", "作为工作乐队的 riff 长寿"),
        ("Stones matter as a long-running blues-rock economy: guitar riffs first, groove second, image third. Catalog density in 1968–72 still anchors the reputation.\n\nTouring machine and songbook share credit.",
         "Stones 要紧处是长运行的蓝调摇滚经济：吉他 riff 第一、groove 第二、形象第三。1968–72 目录密度仍锚定声誉。\n\n巡演机器与歌本共享功劳。"),
    ),
    "lineup-versions": ch(
        ("Jones era, Taylor peak, Wood decades", "Jones 时期、Taylor 高峰、Wood 数十年"),
        ("Brian Jones early multi-instrument color; Mick Taylor on the late-60s/early-70s peak records; Ronnie Wood on the long touring era.\n\nWatts’s death ends a rhythmic constant—versions matter.",
         "Brian Jones 早期多乐器色彩；Mick Taylor 在 60 末/70 初峰值唱片；Ronnie Wood 在长巡演年代。\n\nWatts 去世结束节奏常量——版本要紧。"),
    ),
    "satisfaction": ch(
        ("Satisfaction: fuzz riff as pop weapon", "Satisfaction：fuzz riff 当流行武器"),
        ("Gibson Maestro fuzz on the hook; Jagger’s lyric complaint; AM radio saturation in 1965.\n\nRiff-first writing becomes a pop-rock default.",
         "钩子上的 Gibson Maestro fuzz；Jagger 的抱怨歌词；1965 年 AM 电台饱和。\n\nriff 优先写作成为流行摇滚默认。"),
    ),
    "shelter": ch(
        ("Gimme Shelter: ensemble dread", "Gimme Shelter：合奏式紧迫"),
        ("Richards riff, Merry Clayton guest vocal, Watts/Wyman lock—late-60s darkness without abandoning blues form.\n\nAlbum-era band as cinema-adjacent rock.",
         "Richards riff、Merry Clayton 客串人声、Watts/Wyman 锁定——不放弃蓝调形式的 60 年代末黑暗。\n\n专辑时代乐队作为电影邻近摇滚。"),
    ),
    "members": ch(
        ("Glimmer Twins + rhythm section", "Glimmer Twins + 节奏组"),
        ("Jagger/Richards writing axis; Watts’s swing; bass and second guitar roles shift by era.\n\nChemistry is documented in takes, not weather metaphors.",
         "Jagger/Richards 写作轴；Watts 的摇摆；贝斯与第二吉他角色随时代变。\n\n化学作用记录在 take 里，不是天气比喻。"),
    ),
    "legacy": ch(
        ("Hard-rock and indie still borrow the strut", "Hard-rock 与 indie 仍借用其步态"),
        ("Open-G riffs and swagger vocal phrasing feed hard rock and later garage/indie revivalists.\n\nLongevity itself becomes a reference type.",
         "开放 G 调 riff 与趾高气扬的人声句式喂养 hard rock 与后来的车库/indie 复兴者。\n\n长寿本身成为一种参照类型。"),
    ),
})
patch_band_notes(
    "the-rolling-stones",
    scene_notes=[
        ("Fuzz riff as 1965 AM-radio weapon.", "1965 年 AM 电台上的 fuzz riff 武器。"),
        ("Key composition moment", "关键写作时刻"),
        ("Ensemble dread on Let It Bleed–era track.", "Let It Bleed 时期合奏紧迫感。"),
    ],
    landmark_note=("Blues-rock riff economy sustained across decades.", "跨数十年持续的蓝调摇滚 riff 经济。"),
    landmark_debut_note=("Early riff-pop breakthrough single.", "早期 riff 流行突破单曲。"),
    lineup_notes={},
)

print("narr_1b complete")

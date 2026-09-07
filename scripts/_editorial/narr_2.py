#!/usr/bin/env python3
"""Remaining narrative bands + arctic/joy division/clash/who/hendrix/elvis/chuck/strokes/fontaines/tame."""
from apply_util import patch_band_basic, patch_band_notes, patch_narrative

def ch(title, body):
    return {"title": title, "body": body}

# --- ARCTIC MONKEYS ---
patch_band_basic(
    "arctic-monkeys",
    why_matters=(
        "Sheffield band that rose via mid-2000s online demos then Whatever People Say I Am (2006); later records shifted toward slower, R&B-tinged rock without lineup break.",
        "谢菲尔德乐队：经 2000 年代中期网络 demo 再到 Whatever People Say I Am（2006）；后期专辑转向更慢、偏 R&B 的摇滚且阵容未裂。",
    ),
    short_bio=(
        "Turner-led indie/alt; Dancefloor and Do I Wanna Know? mark early and mid eras.",
        "Turner 领衔的 indie/alt；Dancefloor 与 Do I Wanna Know? 标记早期与中期。",
    ),
    body=(
        "Formed 2002. Debut album set rapid indie-punk diction and Helders’s drums; Favourite Worst Nightmare kept speed; AM (2013) slowed grooves and added falsetto hooks for global rock radio.\n\nI Bet You Look Good on the Dancefloor (2005) and Do I Wanna Know? (2013) are the era poles. Online word-of-mouth is part of the distribution history.",
        "2002 年组建。首专定下快速 indie-punk 吐字与 Helders 鼓；Favourite Worst Nightmare 保持速度；AM（2013）放慢 groove 并加入假声钩子打进全球摇滚电台。\n\nI Bet You Look Good on the Dancefloor（2005）与 Do I Wanna Know?（2013）是时代两极。网络口碑属分发史的一部分。",
    ),
)
patch_narrative("arctic-monkeys", {
    "thesis": ch(
        ("UK indie speed, then deliberate slowdown", "英国 indie 速度，然后有意减速"),
        ("Arctic Monkeys matter as a two-gear catalog: early Sheffield urgency, later polished mid-tempo rock. Same core four (with O’Malley replacing early bassist).\n\nInternet-era debut logistics plus song craft.",
         "Arctic Monkeys 要紧处是双档目录：早期谢菲尔德紧迫，后期抛光中速摇滚。核心四人大致稳定（O’Malley 替换早期贝斯）。\n\n互联网时代出道后勤加歌曲工艺。"),
    ),
    "dancefloor": ch(
        ("Dancefloor: debut-era sprint single", "Dancefloor：出道期冲刺单曲"),
        ("Fast downstrokes, Turner’s syllable density, Helders fill—2005/06 UK indie chart weapon.\n\nLive wire energy before the AM sheen.",
         "快速下行扫弦、Turner 音节密度、Helders 加花——2005/06 英国 indie 榜武器。\n\nAM 光泽之前的带电能量。"),
    ),
    "diwk": ch(
        ("Do I Wanna Know?: riff at ballad tempo", "Do I Wanna Know?：谣曲速度的 riff"),
        ("Sticky guitar figure, roomy drums, falsetto hook—AM’s global radio object.\n\nProof the band can change tempo identity without changing logo.",
         "黏着吉他音型、宽鼓组、假声钩子——AM 的全球电台对象。\n\n证明乐队可改速度身份而不改 logo。"),
    ),
    "dna": ch(
        ("Northern diction, later studio gloss", "北方吐字，后期录音室光泽"),
        ("Early records foreground local detail in lyrics; later production borrows from US rock/R&B radio compression.\n\nDNA is writing voice + willingness to retune the groove.",
         "早期唱片突出歌词地方细节；后期制作借用美国摇滚/R&B 电台压缩。\n\nDNA 是写作声线 + 愿意重调 groove。"),
    ),
    "quote": ch(
        ("Press lines about pace and fame", "关于节奏与成名的媒体句子"),
        ("Interview excerpts track discomfort with early hype and later stylistic turns.\n\nUseful as timeline markers beside the albums.",
         "访谈摘句追踪对早期炒作的不适与后期风格转向。\n\n可作专辑旁的时间线标记。"),
    ),
})
patch_band_notes(
    "arctic-monkeys",
    scene_notes=[
        ("Debut-era sprint indie single.", "出道期冲刺 indie 单曲。"),
        ("Key composition moment", "关键写作时刻"),
        ("AM-era slow riff for global rock radio.", "AM 时期打进全球摇滚电台的慢 riff。"),
    ],
)

# --- JOY DIVISION ---
patch_band_basic(
    "joy-division",
    why_matters=(
        "Salford/Manchester post-punk four-piece; Unknown Pleasures (1979) and Closer (1980) fixed cold bass-led songs and Martin Hannett production before Curtis’s death ended the band.",
        "索尔福德/曼彻斯特后朋克四人组；Unknown Pleasures（1979）与 Closer（1980）在 Curtis 去世结束乐队前，定下冷贝斯主导歌曲与 Martin Hannett 制作。",
    ),
    short_bio=(
        "Curtis / Sumner / Hook / Morris post-punk; Love Will Tear Us Apart is the mass single.",
        "Curtis / Sumner / Hook / Morris 后朋克；Love Will Tear Us Apart 是大众单曲。",
    ),
    body=(
        "Formed 1976 (Warsaw). Factory Records albums with Hannett: spacious drums, Hook’s high melodic bass, Sumner’s brittle guitar, Curtis’s baritone.\n\nTransmission, Atmosphere, Love Will Tear Us Apart (1980) are the entry set. Survivors continue as New Order—same bloodline, different tools.",
        "1976 年组建（曾用名 Warsaw）。与 Hannett 的 Factory 专辑：宽鼓组、Hook 高音旋律贝斯、Sumner 脆吉他、Curtis 男中音。\n\nTransmission、Atmosphere、Love Will Tear Us Apart（1980）是入口组。幸存者续为 New Order——同一血脉，不同工具。",
    ),
)
patch_narrative("joy-division", {
    "thesis": ch(
        ("Post-punk bass and space as method", "后朋克贝斯与空间作为方法"),
        ("Joy Division matter for arrangement: bass often above guitar, drums gated/spaciously produced, vocal deadpan. Short catalog, high citation in goth/post-punk/indie.\n\nEnded 1980; influence is structural.",
         "Joy Division 要紧在编曲：贝斯常高于吉他、鼓经门限/宽空间制作、人声冷脸。目录短，哥特/后朋克/indie 引用高。\n\n1980 年结束；影响是结构层面的。"),
    ),
    "scene-0": ch(
        ("Love Will Tear Us Apart: melodic single", "Love Will Tear Us Apart：旋律单曲"),
        ("Hook bass hook, Curtis vocal, danceable mid-tempo—widest public entry beyond the albums’ frost.\n\nPosthumous chart life is part of the document.",
         "Hook 贝斯钩子、Curtis 人声、可跳的中速——超越专辑冷感的最宽公众入口。\n\n身后上榜属文献的一部分。"),
    ),
    "scene-1": ch(
        ("Atmosphere: slow, wide production", "Atmosphere：慢、宽的制作"),
        ("Hannett space, synth pads, Curtis vocal further back—ballad form inside post-punk.\n\nTeaching track for production as emotion carrier.",
         "Hannett 空间、合成器铺底、Curtis 人声更靠后——后朋克里的谣曲形式。\n\n制作作为情绪载体的教材曲。"),
    ),
    "dna": ch(
        ("Factory method → New Order tools", "Factory 方法 → New Order 工具"),
        ("Same players adopt sequencers and club bass after 1980. JD’s DNA is the melodic bass + dry vocal template many revival bands copy.\n\nContinuity is personnel, not costume.",
         "同一批乐手在 1980 年后采用音序器与俱乐部贝斯。JD 的 DNA 是旋律贝斯 + 干人声模板，许多复兴乐队照抄。\n\n连续的是人事，不是戏服。"),
    ),
    "quote": ch(
        ("Sparse public speech, dense myth later", "公开话语 sparce，事后神话变密"),
        ("Contemporary quotes are limited; later oral history fills gaps. Prefer musical description over romantic fatalism.\n\nRecords first.",
         "同时代引语有限；后来口述史填空。宁取音乐描述，不取浪漫宿命论。\n\n唱片优先。"),
    ),
})
patch_band_notes(
    "joy-division",
    scene_notes=[
        ("Melodic single with Hook bass hook.", "带 Hook 贝斯钩子的旋律单曲。"),
        ("Slow wide Hannett production ballad.", "Hannett 慢宽制作谣曲。"),
        ("Key composition moment", "关键写作时刻"),
    ],
)

# --- THE CLASH ---
patch_band_basic(
    "the-clash",
    why_matters=(
        "London punk band that widened UK punk into reggae, rockabilly, and album-length politics; London Calling (1979) is the double-album hinge.",
        "伦敦朋克：把英国朋克拓宽到雷鬼、rockabilly 与专辑尺度政治；London Calling（1979）是双专铰链。",
    ),
    short_bio=(
        "Strummer / Jones punk-to-post-punk; London Calling is the mass document.",
        "Strummer / Jones 从朋克到后朋克；London Calling 是大众文献。",
    ),
    body=(
        "Formed 1976. Early CBS singles and The Clash debut are fast punk; Give ’Em Enough Rope and London Calling expand styles; Sandinista! overshoots length; Combat Rock yields radio hits.\n\nLondon Calling (1979) and Should I Stay or Should I Go / Straight to Hell (1982) show range. Longer fuse than the Pistols.",
        "1976 年组建。早期 CBS 单曲与首专是快朋克；Give ’Em Enough Rope 与 London Calling 扩展风格；Sandinista! 时长过载；Combat Rock 交出电台热单。\n\nLondon Calling（1979）与 Should I Stay or Should I Go / Straight to Hell（1982）展示幅度。引信长过 Pistols。",
    ),
)
patch_narrative("the-clash", {
    "thesis": ch(
        ("Punk as expandable toolkit", "把朋克当可扩展工具箱"),
        ("The Clash matter because they treat punk energy as a base layer under reggae riddims, piano rockers, and reportage lyrics—not a purity test.\n\nAlbum ambition inside a punk generation.",
         "The Clash 要紧，因为他们把朋克能量当雷鬼 riddim、钢琴摇滚与报道歌词下的底层——而非纯度测验。\n\n朋克一代内部的专辑野心。"),
    ),
    "scene-0": ch(
        ("London Calling: title-track warning", "London Calling：同名曲警告"),
        ("Strummer vocal, Jones guitar, Topper drums—opening statement of the 1979 double album.\n\nScene + songcraft fused.",
         "Strummer 人声、Jones 吉他、Topper 鼓——1979 双专开场声明。\n\n场景与歌曲工艺融合。"),
    ),
    "scene-1": ch(
        ("Should I Stay: rock’n’roll hook export", "Should I Stay：摇滚钩子出口"),
        ("Simple chord cycle, gang vocal—Combat Rock radio object that outlives scene politics for casual listeners.\n\nExportable craft beside the experimental tracks.",
         "简单和弦循环、群吼——让休闲听众记过场景政治的 Combat Rock 电台对象。\n\n实验曲旁的可导出工艺。"),
    ),
    "dna": ch(
        ("Politics + genre tourism", "政治 + 类型旅游"),
        ("Later political punk and indie cite the permission to mix styles. DNA is curiosity under urgency, not a single tempo.\n\nJones vs Strummer tensions are documented personnel history.",
         "后来政治朋克与 indie 引用其混搭风格许可。DNA 是紧迫下的好奇，而非单一速度。\n\nJones 与 Strummer 张力属有文献的人事史。"),
    ),
    "quote": ch(
        ("Manifesto lines in the press", "媒体里的宣言句"),
        ("Interview slogans about boredom and engagement match the lyric reportage.\n\nCheck them against the records’ stylistic spread.",
         "关于无聊与介入的访谈口号，与歌词报道匹配。\n\n对照唱片的风格跨度核验。"),
    ),
})
patch_band_notes(
    "the-clash",
    scene_notes=[
        ("1979 title-track opening statement.", "1979 同名曲开场声明。"),
        ("Combat Rock radio hook export.", "Combat Rock 电台钩子出口。"),
        ("Key composition moment", "关键写作时刻"),
    ],
)

# --- THE WHO ---
patch_band_basic(
    "the-who",
    why_matters=(
        "London four-piece that fused power-chord pop, live destruction lore, and Townshend concept albums (Tommy, Who’s Next) into hard-rock theatre.",
        "伦敦四人组：把强力和弦流行、现场破坏传说与 Townshend 概念专集（Tommy、Who’s Next）融进 hard-rock 剧场。",
    ),
    short_bio=(
        "Townshend / Daltrey / Entwistle / Moon; Baba O’Riley and My Generation are poles.",
        "Townshend / Daltrey / Entwistle / Moon；Baba O’Riley 与 My Generation 是两极。",
    ),
    body=(
        "Formed 1964. Mid-60s singles (My Generation) establish stutter vocal and feedback; Tommy invents rock-opera scale; Who’s Next (synthesizer/sequencer experiments) yields Baba O’Riley and Won’t Get Fooled Again.\n\nMoon’s drums and Entwistle’s lead-bass are instrumental signatures. Live volume is part of the historical record.",
        "1964 年组建。60 年代中期单曲（My Generation）确立口吃人声与反馈；Tommy 发明摇滚歌剧尺度；Who’s Next（合成器/音序实验）交出 Baba O’Riley 与 Won’t Get Fooled Again。\n\nMoon 的鼓与 Entwistle 的主奏式贝斯是乐器签名。现场音量属历史记录的一部分。",
    ),
)
patch_narrative("the-who", {
    "thesis": ch(
        ("Power chords + concept ambition", "强力和弦 + 概念野心"),
        ("The Who matter as the band that kept singles craft while inventing album-length narrative and synth-rock experiments for arenas.\n\nViolence onstage is lore; arrangement is the durable export.",
         "The Who 要紧处是：保持单曲工艺的同时，为体育场发明专辑时长叙事与合成器摇滚实验。\n\n舞台暴力是传说；编曲才是耐久输出。"),
    ),
    "scene-0": ch(
        ("My Generation: 1965 stutter single", "My Generation：1965 口吃单曲"),
        ("Feedback, Entwistle solo break, Daltrey’s stutter—mod-era youth single that still reads as hard-rock proto.\n\nTempo and attitude first.",
         "反馈、Entwistle 独奏段、Daltrey 口吃——仍可读作 hard-rock 原型的 mod 时代青年单曲。\n\n速度与态度优先。"),
    ),
    "scene-1": ch(
        ("Baba O’Riley: sequencer into power chord", "Baba O’Riley：音序接入强力和弦"),
        ("ARP/Lowrey figure into full-band crash; violin solo; Daltrey vocal—Who’s Next teaching track.\n\nElectronics without abandoning guitar war.",
         "ARP/Lowrey 音型接入全乐队撞击；小提琴独奏；Daltrey 人声——Who’s Next 教材曲。\n\n不放弃吉他战争的电子。"),
    ),
    "dna": ch(
        ("Moon volume, Townshend writing", "Moon 音量，Townshend 写作"),
        ("Later hard rock cites the live assault; prog and concept acts cite Tommy/Quadrophenia permission.\n\nDNA splits into volume culture and writer culture.",
         "后来 hard rock 引用现场突击；prog 与概念乐队引用 Tommy/Quadrophenia 许可。\n\nDNA 裂为音量文化与写作者文化。"),
    ),
    "quote": ch(
        ("Townshend on craft and destruction", "Townshend 谈工艺与破坏"),
        ("Interview lines about songwriting systems sit beside smashed-instrument stories.\n\nHold both as documented practices.",
         "关于歌曲写作系统的访谈句，旁靠砸乐器故事。\n\n二者都当作有文献的实践。"),
    ),
})
patch_band_notes(
    "the-who",
    scene_notes=[
        ("1965 stutter/feedback youth single.", "1965 口吃/反馈青年单曲。"),
        ("Sequencer intro into arena power chords.", "音序引入接入体育场强力和弦。"),
        ("Key composition moment", "关键写作时刻"),
    ],
)

# --- JIMI HENDRIX EXPERIENCE ---
patch_band_basic(
    "the-jimi-hendrix-experience",
    why_matters=(
        "London-based trio (1966–69) that made feedback, wah, and studio guitar effects a lead vocabulary on Are You Experienced and Electric Ladyland.",
        "伦敦基地三人组（1966–69）：在 Are You Experienced 与 Electric Ladyland 上把反馈、wah 与录音室吉他效果做成主奏语汇。",
    ),
    short_bio=(
        "Hendrix / Redding / Mitchell; Purple Haze and Watchtower are the mass poles.",
        "Hendrix / Redding / Mitchell；Purple Haze 与 Watchtower 是大众两极。",
    ),
    body=(
        "Formed 1966 with Chas Chandler. Debut singles and Are You Experienced set psychedelic blues; Axis and Electric Ladyland expand studio layering. Monterey and Woodstock performances are media documents.\n\nPurple Haze (1967) and All Along the Watchtower (1968) show original riff writing and transformative cover craft. Short timeline; permanent guitar technique export.",
        "1966 年与 Chas Chandler 组建。首批单曲与 Are You Experienced 定下迷幻蓝调；Axis 与 Electric Ladyland 扩展录音室分层。Monterey 与 Woodstock 演出是媒介文献。\n\nPurple Haze（1967）与 All Along the Watchtower（1968）展示原创 riff 与改造性翻唱工艺。时间线短；吉他技术输出永久。",
    ),
)
patch_narrative("the-jimi-hendrix-experience", {
    "thesis": ch(
        ("Guitar effects as lead voice", "吉他效果当主奏声部"),
        ("The Experience matter because Hendrix treats amp noise, wah, and studio mixing as melodic tools equal to blues licks.\n\nTrio format: Mitchell’s jazz drums, Redding’s solid bass.",
         "Experience 要紧，因为 Hendrix 把音箱噪声、wah 与录音室混音当作与蓝调乐句同等的旋律工具。\n\n三人编制：Mitchell 的爵士鼓、Redding 的稳健贝斯。"),
    ),
    "scene-0": ch(
        ("Purple Haze: riff + effect vocabulary", "Purple Haze：riff + 效果语汇"),
        ("Iconic interval riff, octave/fuzz colors, Mitchell fills—1967 psychedelic single template.\n\nTechnique on display inside pop runtime.",
         "标志音程 riff、八度/fuzz 色彩、Mitchell 加花——1967 迷幻单曲模板。\n\n流行时长内的技术展示。"),
    ),
    "scene-1": ch(
        ("Watchtower: cover as rebuild", "Watchtower：翻唱即重建"),
        ("Dylan song rebuilt with layered guitars and dramatic dynamic curve—cover as authorship claim.\n\nStudio craft citation for later rock.",
         "用多层吉他与戏剧动态曲线重建 Dylan 歌曲——翻唱即作者权主张。\n\n后来摇滚的录音室工艺引用。"),
    ),
    "dna": ch(
        ("Feedback lineage into hard rock/metal", "反馈谱系进入 hard rock/金属"),
        ("Page, metal lead players, and alternative noise guitarists cite the permission to use noise melodically.\n\nDNA is touch + technology, not only speed.",
         "Page、金属主音与 alternative 噪声吉他手引用把噪声当旋律使用的许可。\n\nDNA 是触感+技术，不只是速度。"),
    ),
    "quote": ch(
        ("Hendrix on sound and stage", "Hendrix 谈声音与舞台"),
        ("Interview fragments about wanting new sounds match the recorded experiments.\n\nPrefer gear/process detail over cosmic adjectives.",
         "关于想要新声音的访谈碎片，与录音实验匹配。\n\n宁取设备/过程细节，不取宇宙形容词。"),
    ),
})
patch_band_notes(
    "the-jimi-hendrix-experience",
    scene_notes=[
        ("1967 riff + effect single template.", "1967 riff + 效果单曲模板。"),
        ("Dylan cover rebuilt in the studio.", "录音室重建的 Dylan 翻唱。"),
        ("Key composition moment", "关键写作时刻"),
    ],
)

# --- ELVIS ---
patch_band_basic(
    "elvis-presley",
    why_matters=(
        "Memphis artist filed as band-node: 1954–58 Sun/RCA singles made rock’n’roll a mass US youth format via radio, TV, and film.",
        "以乐队节点收录的孟菲斯艺人：1954–58 Sun/RCA 单曲经电台、电视与电影把摇滚做成美国大众青年格式。",
    ),
    short_bio=(
        "Presley rock’n’roll; That’s All Right to Jailhouse Rock mark the breakthrough arc.",
        "Presley 摇滚；从 That’s All Right 到 Jailhouse Rock 标记突破弧线。",
    ),
    body=(
        "Sun Records sides with Scotty Moore and Bill Black fuse country and R&B; RCA nationalizes the sound; TV appearances and movies scale the image.\n\nThat’s All Right (1954), Hound Dog (1956), Jailhouse Rock (1957) are the teaching singles. Later Vegas/comeback eras are separate chapters; this page tracks the rock’n’roll ignition set.",
        "与 Scotty Moore、Bill Black 的 Sun 录音融合乡村与 R&B；RCA 将其全国化；电视与电影放大形象。\n\nThat’s All Right（1954）、Hound Dog（1956）、Jailhouse Rock（1957）是教学单曲。后期拉斯维加斯/复出是另章；本页追踪摇滚点火组。",
    ),
)
patch_narrative("elvis-presley", {
    "thesis": ch(
        ("Rock’n’roll as mass youth format", "摇滚作为大众青年格式"),
        ("Elvis matters here as the distribution event: regional hybrid music becomes national via new media. Musical materials are Black and white Southern forms in contact.\n\nCatalog of early singles is the chronicle object.",
         "Elvis 在此处要紧的是分发事件：地区混成音乐经新媒体变成全国。音乐材料是南方黑白形式的接触。\n\n早期单曲目录是编年对象。"),
    ),
    "scene-0": ch(
        ("That’s All Right: Sun spark", "That’s All Right：Sun 火花"),
        ("1954 Sun session energy—tempo flip on blues material, Moore’s guitar, Presley’s vocal attack.\n\nLocal label, national consequences.",
         "1954 Sun 录音能量——蓝调材料的速度翻转、Moore 吉他、Presley 人声攻击。\n\n本地厂牌，全国后果。"),
    ),
    "scene-1": ch(
        ("Hound Dog: TV-era shock single", "Hound Dog：电视时代冲击单曲"),
        ("Big Otis cover rewritten for mass TV; performance controversy is media history beside the arrangement.\n\nRiff and vocal hook at national scale.",
         "改写 Big Mama Thornton 作品打进大众电视；表演争议是编曲旁的媒介史。\n\n全国尺度的 riff 与人声钩子。"),
    ),
    "dna": ch(
        ("Template for rock stardom logistics", "摇滚明星后勤模板"),
        ("Later rock inherits the singer-as-brand plus band-as-support model, for better and worse.\n\nDNA is media + rhythm hybrid, not only vocal myth.",
         "后来摇滚继承「主唱即品牌 + 乐队即支持」模型，利弊并存。\n\nDNA 是媒介 + 节奏混成，不只是人声神话。"),
    ),
    "quote": ch(
        ("Press and TV soundbites", "媒体与电视原话"),
        ("Abundant quotes; useful ones describe work rate and repertoire choice.\n\nSkip destiny language.",
         "引语极多；有用的描述工作强度与曲目选择。\n\n跳过命运语言。"),
    ),
})
patch_band_notes(
    "elvis-presley",
    scene_notes=[
        ("1954 Sun session spark single.", "1954 Sun 录音火花单曲。"),
        ("TV-era national shock cover.", "电视时代全国冲击翻唱。"),
        ("Key composition moment", "关键写作时刻"),
    ],
)

# --- CHUCK BERRY ---
patch_band_basic(
    "chuck-berry",
    why_matters=(
        "St. Louis guitarist/writer whose Chess singles (1955–58) fixed duck-walk showmanship and double-stop guitar intros as rock’n’roll’s teaching dialect.",
        "圣路易斯吉他手/写作者：Chess 单曲（1955–58）把鸭步表演与双音吉他前奏定为摇滚教学方言。",
    ),
    short_bio=(
        "Berry rock’n’roll; Johnny B. Goode is the guitar-hero syllabus.",
        "Berry 摇滚；Johnny B. Goode 是吉他英雄教学大纲。",
    ),
    body=(
        "Chess Records run: Maybellene, Roll Over Beethoven, Johnny B. Goode—narrative lyrics about cars, youth, and guitar ambition over Johnny Johnson piano and driving backbeats.\n\nJohnny B. Goode (1958) is the eternal intro riff. Beatles, Stones, and garage bands learn the dialect from these 45s.",
        "Chess 厂牌系列：Maybellene、Roll Over Beethoven、Johnny B. Goode——汽车、青年与吉他野心叙事歌词，叠 Johnny Johnson 钢琴与驱动性后拍。\n\nJohnny B. Goode（1958）是永恒前奏 riff。Beatles、Stones 与车库乐队从这些 45 转学会方言。",
    ),
)
patch_narrative("chuck-berry", {
    "thesis": ch(
        ("Guitar intro as rock curriculum", "吉他前奏当摇滚课程"),
        ("Berry matters as songwriter-guitarist: verse stories + signature intros. Rock bands treat his singles as homework.\n\nShowmanship is documented; the riffs are the export.",
         "Berry 作为词曲-吉他手要紧：主歌故事 + 标志前奏。摇滚乐队把他的单曲当作业。\n\n表演术有文献；riff 才是输出。"),
    ),
    "scene-0": ch(
        ("Johnny B. Goode: syllabus riff", "Johnny B. Goode：教学大纲 riff"),
        ("Double-stop intro everyone learns; lyric about a guitar kid—meta and practical.\n\n1958 Chess clarity.",
         "人人会弹的双音前奏；关于吉他少年的歌词——既元又实用。\n\n1958 Chess 清晰度。"),
    ),
    "scene-1": ch(
        ("Maybellene: car-chase narrative single", "Maybellene：追车叙事单曲"),
        ("Country/R&B hybrid beat, storytelling verse—1955 breakthrough side.\n\nTemplate for rock lyric as short story.",
         "乡村/R&B 混成节拍、叙事主歌——1955 突破面。\n\n摇滚歌词作短篇故事的模板。"),
    ),
    "dna": ch(
        ("British Invasion homework", "British Invasion 作业"),
        ("UK beat groups cover Berry before writing originals; guitar education pipelines through his intros.\n\nDNA is lick + lyric craft.",
         "英国 beat 组合在写原创前翻唱 Berry；吉他教育管道经他的前奏。\n\nDNA 是乐句 + 歌词工艺。"),
    ),
    "quote": ch(
        ("Berry on writing and show", "Berry 谈写作与表演"),
        ("When quotes exist, they often stress craft and audience. Prefer that over romance.\n\nRecords remain primary.",
         "有引语时，常强调工艺与观众。宁取此而非浪漫。\n\n唱片仍是第一手。"),
    ),
})
patch_band_notes(
    "chuck-berry",
    scene_notes=[
        ("Double-stop intro everyone learns.", "人人会弹的双音前奏。"),
        ("1955 car-chase narrative breakthrough.", "1955 追车叙事突破。"),
        ("Key composition moment", "关键写作时刻"),
    ],
)

# --- THE STROKES ---
patch_band_basic(
    "the-strokes",
    why_matters=(
        "NYC five-piece whose Is This It (2001) reset early-2000s indie toward compressed garage-pop and leather-jacket cool after nu-metal radio.",
        "纽约五人组：Is This It（2001）在 nu-metal 电台之后，把 2000 年代初 indie 扳向压缩车库流行与皮衣酷感。",
    ),
    short_bio=(
        "Casablancas-led post-punk revival; Last Nite is the debut-era hook.",
        "Casablancas 领衔的后朋克复兴；Last Nite 是出道期钩子。",
    ),
    body=(
        "Formed 1998. Is This It and Room on Fire fix Julian’s half-spoken vocal, interlocking Valensi/Hammond guitars, Fraiture bass, Moretti drums—lo-fi sheen as aesthetic.\n\nLast Nite (2001) and Reptilia (2003) are the citation singles. UK/US indie boom follows their template for several years.",
        "1998 年组建。Is This It 与 Room on Fire 定型 Julian 半说唱人声、Valensi/Hammond 交织吉他、Fraiture 贝斯、Moretti 鼓——把 lo-fi 光泽当美学。\n\nLast Nite（2001）与 Reptilia（2003）是引用单曲。此后数年英美 indie 热潮跟随其模板。",
    ),
)
patch_narrative("the-strokes", {
    "thesis": ch(
        ("Garage-pop reset after nu-metal", "nu-metal 之后的车库流行重置"),
        ("The Strokes matter as a format reset: short songs, dry production, NYC cool, post-punk guitar chatter against early-2000s heavy radio.\n\nIs This It timing is half the story.",
         "The Strokes 要紧处是格式重置：短歌、干制作、纽约酷感、后朋克吉他碎语，对位 2000 年代初重型电台。\n\nIs This It 的时机是故事的一半。"),
    ),
    "scene-0": ch(
        ("Last Nite: debut hook single", "Last Nite：出道钩子单曲"),
        ("Stones-ish guitar figure, Casablancas vocal fry, tight runtime—2001 indie radio object.\n\nAccessible entry to the album’s cool.",
         "偏 Stones 的吉他音型、Casablancas 声带摩擦、紧时长——2001 indie 电台对象。\n\n专辑酷感的易入口。"),
    ),
    "scene-1": ch(
        ("Reptilia: dual-guitar chatter", "Reptilia：双吉他碎语"),
        ("Interlocking parts, urgent vocal—Room on Fire precision.\n\nShows the band as arrangement, not only image.",
         "交织声部、紧迫人声——Room on Fire 精度。\n\n展示乐队是编曲，不只是形象。"),
    ),
    "dna": ch(
        ("Template for 2000s indie uniform", "2000 年代 indie 制服模板"),
        ("Leather, skinny ties, compressed mixes—copied hard by peers. Later Strokes records experiment; the debut DNA dominates citations.\n\nInfluence is sonic and sartorial.",
         "皮衣、瘦领带、压缩混音——被同辈狠抄。后期 Strokes 唱片有实验；引用仍被首专 DNA 主导。\n\n影响在声音与着装。"),
    ),
    "quote": ch(
        ("Cool minimalism in interviews", "访谈里的酷极简"),
        ("Early press often mirrors the laconic vocal style. Useful as branding evidence.\n\nMusic still judged on the singles’ compression and hooks.",
         "早期媒体常镜像其寡言人声风格。可作品牌证据。\n\n音乐判断仍看单曲的压缩与钩子。"),
    ),
})
patch_band_notes(
    "the-strokes",
    scene_notes=[
        ("2001 debut hook single.", "2001 出道钩子单曲。"),
        ("Dual-guitar Room on Fire precision.", "Room on Fire 双吉他精度。"),
        ("Key composition moment", "关键写作时刻"),
    ],
)

# --- FONTAINES DC ---
patch_band_basic(
    "fontaines-dc",
    why_matters=(
        "Dublin post-punk band; Dogrel (2019) onward put Irish place-name lyric and dry, driving guitars on late-2010s/2020s indie festival stages.",
        "都柏林后朋克；自 Dogrel（2019）起把爱尔兰地名歌词与干、驱动的吉他送上 2010 末/2020 年代 indie 音乐节舞台。",
    ),
    short_bio=(
        "Chatten-fronted post-punk; Boys in the Better Land is the early statement.",
        "Chatten 领衔的后朋克；Boys in the Better Land 是早期声明。",
    ),
    body=(
        "Formed 2017. Dogrel and A Hero’s Death establish Chatten’s spoken-sung Dublin diction, twin guitars, and taut rhythm section; later albums (Skinty Fia, Romance) widen dynamics and production.\n\nBoys in the Better Land (2019) and Jackie Down the Line / Starburster show early drive and later single craft.",
        "2017 年组建。Dogrel 与 A Hero’s Death 确立 Chatten 半说唱都柏林吐字、双吉他与紧绷节奏组；后期专辑（Skinty Fia、Romance）拓宽动态与制作。\n\nBoys in the Better Land（2019）与 Jackie Down the Line / Starburster 展示早期驱动与后期单曲工艺。",
    ),
)
patch_narrative("fontaines-dc", {
    "thesis": ch(
        ("Place-name post-punk on festival stages", "音乐节舞台上的地名后朋克"),
        ("Fontaines DC matter as a 2010s/20s UK/Irish post-punk wave node: literary local detail, dry production, high live work rate.\n\nNot revival cosplay—current touring grammar.",
         "Fontaines DC 要紧处是 2010/20 年代英爱后朋克浪潮节点：文学地方细节、干制作、高现场工作量。\n\n不是复古扮相——是当下巡演语法。"),
    ),
    "scene-0": ch(
        ("Boys in the Better Land: debut drive", "Boys in the Better Land：出道驱动"),
        ("Fast tempo, place lyric, gang energy—Dogrel-era statement.\n\nEntry to the early sound.",
         "快速度、地名歌词、群体能量——Dogrel 时期声明。\n\n早期声音入口。"),
    ),
    "scene-1": ch(
        ("Jackie Down the Line: later single craft", "Jackie Down the Line：后期单曲工艺"),
        ("Wider dynamics, clearer hook writing—post-Dogrel chart/festival reach.\n\nShows growth without abandoning diction.",
         "更宽动态、更清晰钩子写作——Dogrel 之后的榜单/音乐节触达。\n\n展示成长且不放弃吐字。"),
    ),
    "dna": ch(
        ("Irish diction in anglophone indie", "英语 indie 里的爱尔兰吐字"),
        ("Peers in UK post-punk cite the permission to keep local accent and reportage lyric.\n\nDNA is voice + tempo discipline.",
         "英国后朋克同辈引用保留地方口音与报道歌词的许可。\n\nDNA 是声线 + 速度纪律。"),
    ),
    "quote": ch(
        ("Band on work rate and place", "乐队谈工作量与地方"),
        ("Interviews often stress Dublin/Ireland specificity and touring density.\n\nUseful sociology beside the records.",
         "访谈常强调都柏林/爱尔兰具体性与巡演密度。\n\n唱片旁的有用社会学。"),
    ),
})
patch_band_notes(
    "fontaines-dc",
    scene_notes=[
        ("Dogrel-era drive statement.", "Dogrel 时期驱动声明。"),
        ("Later single with wider dynamics.", "动态更宽的后期单曲。"),
        ("Key composition moment", "关键写作时刻"),
    ],
)

# --- TAME IMPALA ---
patch_band_basic(
    "tame-impala",
    why_matters=(
        "Kevin Parker’s Perth project; Lonerism (2012) and Currents (2015) made solo-studio psychedelic pop a festival-headliner format.",
        "Kevin Parker 的珀斯项目；Lonerism（2012）与 Currents（2015）把一人录音室迷幻流行做成音乐节头条格式。",
    ),
    short_bio=(
        "Parker psychedelic pop; Let It Happen and Less I Know are Currents poles.",
        "Parker 迷幻流行；Let It Happen 与 Less I Know 是 Currents 两极。",
    ),
    body=(
        "Begun mid-2000s; Parker writes/plays/produces most parts, touring band separate. Innerspeaker and Lonerism revive psych guitar; Currents pivots to disco-bass and processed vocal for global crossover.\n\nLet It Happen (2015) and The Less I Know the Better (2015) show extended electronic build and concise funk-psych hook.",
        "2000 年代中期起步；Parker 写作/演奏/制作大部分声部，巡演乐队另组。Innerspeaker 与 Lonerism 复兴迷幻吉他；Currents 转向迪斯科贝斯与处理人声以全球跨界。\n\nLet It Happen（2015）与 The Less I Know the Better（2015）展示延长电子推进与紧凑 funk-迷幻钩子。",
    ),
)
patch_narrative("tame-impala", {
    "thesis": ch(
        ("Solo studio psych as headliner brand", "一人录音室迷幻作为头条品牌"),
        ("Tame Impala matter as proof a mostly-solo recording project can scale to festivals via meticulous production and a live band shell.\n\nParker’s method is the band.",
         "Tame Impala 要紧处是证明：主要一人录音的项目可经精密制作与现场乐队外壳扩到音乐节。\n\nParker 的方法即乐队。"),
    ),
    "scene-0": ch(
        ("Let It Happen: long electronic build", "Let It Happen：长电子推进"),
        ("Loop breakdown mid-song, dance pulse, psych harmony—Currents’ extended single.\n\nStudio accident/glitch aesthetic as arrangement.",
         "曲中循环崩解、舞曲脉冲、迷幻和声——Currents 的延长单曲。\n\n把录音室事故/毛刺美学当编曲。"),
    ),
    "scene-1": ch(
        ("Less I Know: compact funk-psych hook", "Less I Know：紧凑 funk-迷幻钩子"),
        ("Bass hook, falsetto, short runtime—streaming-era crossover object.\n\nConcise where Let It Happen is expansive.",
         "贝斯钩子、假声、短时长——流媒体时代跨界对象。\n\n相对 Let It Happen 的扩展，此曲紧凑。"),
    ),
    "dna": ch(
        ("DIY studio maximalism", "DIY 录音室最大化"),
        ("Bedroom-to-arena path influences 2010s psych and indie-pop producers.\n\nDNA is mix craft + melody, not jam length.",
         "卧室到舞台的路径影响 2010 年代迷幻与 indie-pop 制作人。\n\nDNA 是混音工艺 + 旋律，不是即兴时长。"),
    ),
    "quote": ch(
        ("Parker on process and control", "Parker 谈过程与控制"),
        ("Interviews emphasize home-studio control and endless tweaking.\n\nMethod talk matches the credits list.",
         "访谈强调家庭录音室控制与无尽微调。\n\n方法谈话与credits 列表匹配。"),
    ),
})
patch_band_notes(
    "tame-impala",
    scene_notes=[
        ("Currents long electronic build single.", "Currents 长电子推进单曲。"),
        ("Compact funk-psych streaming hook.", "紧凑 funk-迷幻流媒体钩子。"),
        ("Key composition moment", "关键写作时刻"),
    ],
)

print("narr_2 complete")

#!/usr/bin/env python3
"""Rewrite stub band editorials — batch B (27)."""
from apply_util import patch_band_basic

STUBS = {
    "pulp": {
        "why": (
            "Sheffield Britpop band that treated class and sex as narrative detail; Different Class (1995) and Common People are the document.",
            "谢菲尔德 Britpop：把阶级与性写成叙事细节；Different Class（1995）与 Common People 是文献。",
        ),
        "short": (
            "Jarvis Cocker–led Britpop; Common People is the class-satire single.",
            "Jarvis Cocker 领衔的 Britpop；Common People 是阶级讽刺单曲。",
        ),
        "body": (
            "Formed 1978; commercial peak is mid-1990s after His ’n’ Hers. Different Class put Cocker’s spoken-sung delivery and glam-tinged arrangements on UK charts beside Oasis/Blur.\n\nCommon People (1995) is the structural and lyrical reference—verse reportage into chant chorus. They matter as Britpop’s literary/observational pole against laddish stadium rock.",
            "1978 年组建；商业高峰在 His ’n’ Hers 之后的 1990 年代中期。Different Class 把 Cocker 的说唱式演唱与偏 glam 编曲送上英国榜，与 Oasis/Blur 并列。\n\nCommon People（1995）是结构与歌词参照——主歌报道推进到口号副歌。他们是 Britpop 里文学/观察一极，对位兄弟会式体育场摇滚。",
        ),
    },
    "rage-against-the-machine": {
        "why": (
            "LA four-piece that fused rap vocals with hard-rock/funk riffs; Rage Against the Machine (1992) made political slogan rock a mainstream format.",
            "洛杉矶四人组：rap 人声焊 hard-rock/funk riff；同名专辑（1992）让政治口号摇滚成为主流格式。",
        ),
        "short": (
            "Zack de la Rocha / Tom Morello rap-metal; Killing in the Name is the entry riot.",
            "Zack de la Rocha / Tom Morello 的 rap-metal；Killing in the Name 是入口暴动曲。",
        ),
        "body": (
            "Formed 1991. Debut album and Evil Empire paired de la Rocha’s cadence with Morello’s effects-as-solos, Tim Commerford’s funk bass, Brad Wilk’s dry drums—no samples required for the “DJ” textures.\n\nKilling in the Name (1992) is the citation track. They sit at the 1990s intersection of metal radio and protest lyric without nu-metal’s later pop polish.",
            "1991 年组建。首专与 Evil Empire 把 de la Rocha 的节奏腔与 Morello 的效果器当独奏、Tim Commerford 的 funk 贝斯、Brad Wilk 的干鼓组配在一起——「DJ」质感无需采样。\n\nKilling in the Name（1992）是引用曲。位于 1990 年代金属电台与抗议歌词交汇处，尚未有后期 nu-metal 的流行抛光。",
        ),
    },
    "ramones": {
        "why": (
            "Queens, NYC band that compressed rock’n’roll into two-minute, downstroked bursts; Ramones (1976) is the US punk timing blueprint.",
            "纽约皇后区：把摇滚压成两分钟下行扫弦爆发；Ramones（1976）是美国朋克时值蓝图。",
        ),
        "short": (
            "US punk prototype; Blitzkrieg Bop teaches the 1-2-3-4 count-in.",
            "美国朋克原型；Blitzkrieg Bop 教会 1-2-3-4 起拍。",
        ),
        "body": (
            "Formed 1974. Early Sire albums (Ramones, Leave Home, Rocket to Russia) fixed leather-jacket image, Joey’s deadpan vocal, Johnny’s strict downstrokes, Dee Dee’s bass count-ins.\n\nBlitzkrieg Bop (1976) is the essential cue. Influence is structural—short songs, few chords, high tempo—absorbed by UK punk, hardcore, and later pop-punk.",
            "1974 年组建。早期 Sire 专辑（Ramones、Leave Home、Rocket to Russia）定型皮衣形象、Joey 的冷脸人声、Johnny 的严格下行扫弦、Dee Dee 的贝斯起拍。\n\nBlitzkrieg Bop（1976）是必听提示。影响是结构层面——短歌、少和弦、高速度——被英国朋克、hardcore 与后来的流行朋克吸收。",
        ),
    },
    "red-hot-chili-peppers": {
        "why": (
            "LA funk-rock band; Blood Sugar Sex Magik (1991) and Californication (1999) scaled slap bass and Frusciante guitar to global alternative radio.",
            "洛杉矶 funk-rock；Blood Sugar Sex Magik（1991）与 Californication（1999）把打点贝斯与 Frusciante 吉他扩到全球 alternative 电台。",
        ),
        "short": (
            "Kiedis / Flea / Frusciante funk-alt; Californication is the late-90s mass single.",
            "Kiedis / Flea / Frusciante 的 funk-alt；Californication 是 90 年代末大众单曲。",
        ),
        "body": (
            "Formed 1983. Mother’s Milk and Blood Sugar Sex Magik (Rick Rubin) are the hard-funk peak; Californication and By the Way add melodic ballad craft after lineup churn.\n\nCalifornication (1999) is the track listed here. The musical constants: Flea’s bass as lead instrument, Chad Smith’s pocket, Frusciante’s clean-to-crunch chord voicings.",
            "1983 年组建。Mother’s Milk 与 Blood Sugar Sex Magik（Rick Rubin）是硬 funk 高峰；Californication 与 By the Way 在阵容动荡后加入旋律谣曲工艺。\n\nCalifornication（1999）是此处列出曲目。音乐常量：Flea 贝斯当主奏、Chad Smith 的口袋感、Frusciante 从干净到 crunch 的和弦声部。",
        ),
    },
    "rush": {
        "why": (
            "Toronto trio that kept prog-length writing and instrumental virtuosity on rock radio through the 1970s–80s; Moving Pictures (1981) is the mass hinge.",
            "多伦多三人组：1970–80 年代把 prog 时长写作与乐器炫技留在摇滚电台；Moving Pictures（1981）是大众铰链。",
        ),
        "short": (
            "Lee / Lifeson / Peart prog-rock; Tom Sawyer is the synthesizer-era hit.",
            "Lee / Lifeson / Peart 的 progressive rock；Tom Sawyer 是合成器时期热单。",
        ),
        "body": (
            "Formed 1968; Neil Peart joined 1974. 2112 and Hemispheres document long-form side suites; Permanent Waves and Moving Pictures compress prog into radio-length precision.\n\nTom Sawyer (1981) shows the mid-era mix—Minimoog hooks, odd-meter drums, Geddy’s high vocal. They prove a power trio can sustain prog ambition without a theatrical frontman brand.",
            "1968 年组建；Neil Peart 1974 年加入。2112 与 Hemispheres 记录长篇组曲；Permanent Waves 与 Moving Pictures 把 prog 压成电台长度的精密曲。\n\nTom Sawyer（1981）展示中期混音——Minimoog 钩子、奇数拍鼓、Geddy 高音人声。证明三件套也能维持 prog 野心，无需戏剧化主唱品牌。",
        ),
    },
    "sigur-ros": {
        "why": (
            "Reykjavík band that put bowed guitar, falsetto, and invented-language vocals into post-rock/ambient crossover; Takk… (2005) widened the audience.",
            "雷克雅未克乐队：把弓奏吉他、假声与自造语言人声送进 post-rock/ambient 跨界；Takk…（2005）扩大听众。",
        ),
        "short": (
            "Icelandic post-rock/dream pop; Hoppípolla is the accessible single.",
            "冰岛 post-rock/dream pop；Hoppípolla 是易入口单曲。",
        ),
        "body": (
            "Formed 1994. Ágætis byrjun (1999) and ( ) established Jónsi’s falsetto, reverb-drenched guitars, and orchestral builds; Takk… added clearer melodic singles.\n\nHoppípolla (2005) is the chart/licensing entry. They sit with Mogwai/Godspeed on the post-rock map but keep song-shaped hooks and vocal melody as primary carriers.",
            "1994 年组建。Ágætis byrjun（1999）与 ( ) 确立 Jónsi 假声、混响吉他与管弦渐强；Takk… 加入更清晰的旋律单曲。\n\nHoppípolla（2005）是榜单/授权入口。与 Mogwai/Godspeed 同在 post-rock 地图，但以歌曲形钩子与人声旋律为主要载体。",
        ),
    },
    "slayer": {
        "why": (
            "Huntington Park thrash band; Reign in Blood (1986, Rick Rubin) set extreme speed and short-track density for metal’s outer lane.",
            "亨廷顿公园 thrash；Reign in Blood（1986，Rick Rubin）为金属外道定下极端速度与短曲密度。",
        ),
        "short": (
            "Hanneman / King thrash; Raining Blood is the side-B detonation.",
            "Hanneman / King 的 thrash；Raining Blood 是 B 面引爆。",
        ),
        "body": (
            "Formed 1981. Show No Mercy through South of Heaven document the classic Araya / Hanneman / King / Lombardo lineup—chromatic riffs, blast-adjacent tempos, dry vocal bark.\n\nRaining Blood (1986) closes Reign in Blood’s 29-minute runtime. They are the Big Four’s most extreme commercial reference: less melody than Metallica, less technical display than Megadeth, more relentless tempo.",
            "1981 年组建。从 Show No Mercy 到 South of Heaven 记录经典 Araya / Hanneman / King / Lombardo 阵容——半音 riff、近 blast 速度、干吠人声。\n\nRaining Blood（1986）收束 Reign in Blood 约 29 分钟片长。他们是 Big Four 里最极端的商业参照：旋律少于 Metallica，炫技少于 Megadeth，速度更不停歇。",
        ),
    },
    "slowdive": {
        "why": (
            "Reading shoegaze/dream-pop band; Souvlaki (1993) fixed gentle vocals inside thick guitar fog as the softer Creation-era pole opposite MBV’s abrasion.",
            "雷丁 shoegaze/dream-pop；Souvlaki（1993）把轻人声放进厚吉他雾，作为 Creation 时期相对 MBV 摩擦感的柔软一极。",
        ),
        "short": (
            "Neil Halstead / Rachel Goswell shoegaze; Alison is the Souvlaki entry.",
            "Neil Halstead / Rachel Goswell 的 shoegaze；Alison 是 Souvlaki 入口。",
        ),
        "body": (
            "Formed 1989. Just for a Day and Souvlaki (with some Brian Eno input) use delay/reverb stacks, whispered dual vocals, and mid-tempo drums rather than noise assault.\n\nAlison (1993) is the listed track. 2010s reunion albums confirmed a lasting template for dream-pop revival bands citing UK shoegaze.",
            "1989 年组建。Just for a Day 与 Souvlaki（含部分 Brian Eno 参与）用延时/混响堆叠、低语双人声与中速鼓，而非噪声突击。\n\nAlison（1993）是列出曲目。2010 年代重组专辑坐实了英国 shoegaze 被 dream-pop 复兴乐队持续引用的模板。",
        ),
    },
    "smashing-pumpkins": {
        "why": (
            "Chicago alternative band; Siamese Dream (1993) and Mellon Collie (1995) stacked wall-of-guitar production with dream-pop and metal dynamics.",
            "芝加哥 alternative；Siamese Dream（1993）与 Mellon Collie（1995）把墙式吉他制作叠上 dream-pop 与金属动态。",
        ),
        "short": (
            "Billy Corgan–led alt-rock; 1979 is the mid-90s melodic single.",
            "Billy Corgan 领衔的 alt-rock；1979 是 90 年代中期旋律单曲。",
        ),
        "body": (
            "Formed 1988. Gish and Siamese Dream (Butch Vig) established Corgan’s layered guitars, Chamberlin/Wretzky rhythm section, and loud-quiet pivots; Mellon Collie expanded to double-album scope.\n\n1979 (1996) shows the electronic-tinged, mid-tempo side. They occupy 1990s alt radio beside Nirvana/Pearl Jam with more prog ambition and studio maximalism.",
            "1988 年组建。Gish 与 Siamese Dream（Butch Vig）确立 Corgan 多层吉他、Chamberlin/Wretzky 节奏组与强弱转折；Mellon Collie 扩到双专体量。\n\n1979（1996）展示偏电子的中速面。与 Nirvana/Pearl Jam 同在 1990 年代 alt 电台，prog 野心与录音室最大化更强。",
        ),
    },
    "sonic-youth": {
        "why": (
            "NYC noise-rock band that treated alternate tunings and prepared guitar as composition method; Daydream Nation (1988) is the indie landmark.",
            "纽约 noise-rock：把另类调弦与预制吉他当作曲方法；Daydream Nation（1988）是 indie 地标。",
        ),
        "short": (
            "Moore / Gordon / Ranaldo noise-indie; Teen Age Riot opens Daydream Nation.",
            "Moore / Gordon / Ranaldo 的 noise-indie；Teen Age Riot 打开 Daydream Nation。",
        ),
        "body": (
            "Formed 1981. Bad Moon Rising through Sister and Daydream Nation moved from No Wave residue to long-form indie with song hooks inside dissonance.\n\nTeen Age Riot (1988) is the accessible gate. Influence runs through 1990s alternative and DIY: tunings as identity, feedback as arrangement, dual/triple guitar roles without classic-rock solos.",
            "1981 年组建。从 Bad Moon Rising 到 Sister 与 Daydream Nation，从 No Wave 残余走到在不协和里仍有歌曲钩子的长篇 indie。\n\nTeen Age Riot（1988）是易入口。影响贯穿 1990 年代 alternative 与 DIY：调弦即身份、反馈即编曲、双/三吉他角色而不走经典摇滚独奏。",
        ),
    },
    "soundgarden": {
        "why": (
            "Seattle band that kept 1970s hard-rock riff craft inside grunge; Badmotorfinger (1991) and Superunknown (1994) are the peak documents.",
            "西雅图乐队：把 1970 年代 hard-rock riff 工艺留在 grunge 里；Badmotorfinger（1991）与 Superunknown（1994）是峰值文献。",
        ),
        "short": (
            "Cornell / Thayil heavy grunge; Black Hole Sun is the mass single.",
            "Cornell / Thayil 的重型 grunge；Black Hole Sun 是大众单曲。",
        ),
        "body": (
            "Formed 1984. Ultramega OK and Louder Than Love preceded the breakthrough; Badmotorfinger and Superunknown paired Chris Cornell’s wide vocal range with Kim Thayil’s odd-time, drop-tuned riffs.\n\nBlack Hole Sun (1994) is the listed hit—psychedelic chord color over a slow groove. They are Seattle’s most explicit Sabbath/Zeppelin riff lineage inside the grunge cohort.",
            "1984 年组建。Ultramega OK 与 Louder Than Love 在突破之前；Badmotorfinger 与 Superunknown 把 Chris Cornell 宽音域人声与 Kim Thayil 奇数拍、降调 riff 配对。\n\nBlack Hole Sun（1994）是列出热单——慢 groove 上的迷幻和弦色彩。西雅图 grunge 同辈里，他们的 Sabbath/Zeppelin riff 谱系最明确。",
        ),
    },
    "suede": {
        "why": (
            "London band often cited at Britpop’s start; Suede (1993) and Dog Man Star put glam guitar and dramatic vocal ahead of laddish peer pressure.",
            "常被算作 Britpop 起点的伦敦乐队；Suede（1993）与 Dog Man Star 把 glam 吉他与戏剧人声放在兄弟会同侪压力之前。",
        ),
        "short": (
            "Brett Anderson / Bernard Butler glam-Britpop; Beautiful Ones is a later single peak.",
            "Brett Anderson / Bernard Butler 的 glam-Britpop；Beautiful Ones 是后期单曲高峰。",
        ),
        "body": (
            "Formed 1989. Debut Suede and Bernard Butler’s exit into Dog Man Star define early drama; Coming Up (1996) with Richard Oakes returned sharper pop singles.\n\nBeautiful Ones (1996) is the track listed. They matter as Britpop’s androgynous/glam opening move before Oasis’s stadium consensus.",
            "1989 年组建。首专 Suede 与 Bernard Butler 离队后的 Dog Man Star 定义早期戏剧；Richard Oakes 加入的 Coming Up（1996）回到更锐利的流行单曲。\n\nBeautiful Ones（1996）是列出曲目。意义是 Britpop 中性/glam 开局，早于 Oasis 的体育场共识。",
        ),
    },
    "system-of-a-down": {
        "why": (
            "LA Armenian-American metal band; Toxicity (2001) put odd meters, shouted politics, and abrupt dynamic cuts on nu-metal radio.",
            "洛杉矶亚美裔金属乐队；Toxicity（2001）把奇数拍、喊叫政治与突然动态切磋送上 nu-metal 电台。",
        ),
        "short": (
            "Tankian / Malakian alt-metal; Chop Suey! is the structural spike.",
            "Tankian / Malakian 的 alt-metal；Chop Suey! 是结构尖峰。",
        ),
        "body": (
            "Formed 1994. Self-titled debut and Toxicity fused Serj Tankian’s theatrical vocal, Daron Malakian’s riff cuts, odd-time drums, and Middle Eastern melodic ornaments.\n\nChop Suey! (2001) is the citation—tempo and intensity change mid-song without a bridge cliché. They sit beside Linkin Park on early-2000s charts with less hip-hop and more prog abruptness.",
            "1994 年组建。同名首专与 Toxicity 融合 Serj Tankian 戏剧人声、Daron Malakian 的 riff 切割、奇数拍鼓与中东旋律装饰。\n\nChop Suey!（2001）是引用——曲中速度与强度切换，不靠俗套桥段。与 Linkin Park 同在 2000 年代初榜单，更少 hip-hop、更多 prog 式突然性。",
        ),
    },
    "talking-heads": {
        "why": (
            "CBGB-origin art-funk band; Remain in Light (1980, Eno) fused polyrhythm, looped guitar, and Byrne’s vocal into new-wave’s densest studio peak.",
            "源自 CBGB 的 art-funk；Remain in Light（1980，Eno）把复合节奏、循环吉他与 Byrne 人声做成 new wave 最密的录音室高峰。",
        ),
        "short": (
            "Byrne / Harrison / Weymouth / Frantz new wave; Once in a Lifetime is the mass entry.",
            "Byrne / Harrison / Weymouth / Frantz 的 new wave；Once in a Lifetime 是大众入口。",
        ),
        "body": (
            "Formed 1975. Talking Heads: 77 and More Songs… established nervous funk; Fear of Music and Remain in Light expanded African/American rhythm collaboration and studio layering.\n\nOnce in a Lifetime (1980) is the listed track. They show post-punk can be dance music and art school without glam costume—groove and lyric dissociation as method.",
            "1975 年组建。Talking Heads: 77 与 More Songs… 确立紧张 funk；Fear of Music 与 Remain in Light 扩展非裔/美洲节奏合作与录音室分层。\n\nOnce in a Lifetime（1980）是列出曲目。证明后朋克可以是舞曲与艺术学院产物而无 glam 戏服——groove 与歌词抽离即方法。",
        ),
    },
    "the-beach-boys": {
        "why": (
            "California group that turned studio harmony and modular arrangement into rock’s production frontier; Pet Sounds (1966) and Good Vibrations are the hinge.",
            "加州组合：把录音室和声与模块化编曲推成摇滚制作前沿；Pet Sounds（1966）与 Good Vibrations 是铰链。",
        ),
        "short": (
            "Brian Wilson–era studio pop; Good Vibrations is the modular single.",
            "Brian Wilson 时期录音室流行；Good Vibrations 是模块化单曲。",
        ),
        "body": (
            "Formed 1961. Early surf hits precede the studio peak: Pet Sounds and the Smile sessions treated the studio as instrument—theremin, bicycle bells, stacked vocals, sectional recording.\n\nGood Vibrations (1966) is the essential track here. Influence on Beatles’ late-60s studio work and later indie psych is documentary, not metaphor.",
            "1961 年组建。早期冲浪热单之后是录音室高峰：Pet Sounds 与 Smile 录音把录音室当乐器——theremin、自行车铃、堆叠人声、分段录音。\n\nGood Vibrations（1966）是此处必听。对 Beatles 60 年代末录音室工作与后来 indie 迷幻的影响有文献可查，而非比喻。",
        ),
    },
    "the-cure": {
        "why": (
            "Crawley band that moved from post-punk minimalism to goth and then mainstream goth-pop; Disintegration (1989) and Kiss Me–era singles mark the arc.",
            "克劳利乐队：从后朋克极简走到哥特再进主流哥特流行；Disintegration（1989）与 Kiss Me 时期单曲标记弧线。",
        ),
        "short": (
            "Robert Smith–led post-punk/goth-pop; Just Like Heaven is the bright single.",
            "Robert Smith 领衔的后朋克/哥特流行；Just Like Heaven 是明亮单曲。",
        ),
        "body": (
            "Formed 1978. Three Imaginary Boys and Pornography define the cold early sound; The Head on the Door and Kiss Me, Kiss Me, Kiss Me add pop hooks; Disintegration returns to long-form gloom at stadium scale.\n\nJust Like Heaven (1987) is the listed entry. Constants: Smith’s chorus-heavy guitar, extended song lengths, and a fan culture that spans indie and goth clubs.",
            "1978 年组建。Three Imaginary Boys 与 Pornography 定义早期冷声；The Head on the Door 与 Kiss Me, Kiss Me, Kiss Me 加入流行钩子；Disintegration 以体育场体量回到长篇阴郁。\n\nJust Like Heaven（1987）是列出入口。常量：Smith 的 chorus 效果吉他、偏长歌曲、跨越 indie 与哥特俱乐部的粉丝文化。",
        ),
    },
    "the-doors": {
        "why": (
            "LA four-piece without a bass player onstage; The Doors (1967) put organ-led blues-psych and Morrison’s baritone on AM radio.",
            "洛杉矶四人组、舞台无贝斯手；同名首专（1967）把管风琴导向的蓝调迷幻与 Morrison 男中音送上 AM 电台。",
        ),
        "short": (
            "Morrison / Manzarek psych-rock; Light My Fire is the breakthrough edit.",
            "Morrison / Manzarek 的迷幻摇滚；Light My Fire 是突破剪辑版。",
        ),
        "body": (
            "Formed 1965. Debut album and Strange Days feature Ray Manzarek’s keyboard bass + organ, Robbie Krieger’s jazz-folk guitar, John Densmore’s jazz-inflected drums.\n\nLight My Fire (1967) is the mass single (radio edit vs album length). They sit in US psychedelia with blues structure and spoken-word passages rather than San Francisco jam culture.",
            "1965 年组建。首专与 Strange Days 以 Ray Manzarek 的键盘贝斯+管风琴、Robbie Krieger 的爵士民谣吉他、John Densmore 偏爵士鼓组为骨架。\n\nLight My Fire（1967）是大众单曲（电台剪辑 vs 专辑时长）。位于美国迷幻版图，偏蓝调结构与口语段落，而非旧金山长即兴文化。",
        ),
    },
    "the-killers": {
        "why": (
            "Las Vegas new-wave revival band; Hot Fuss (2004) put synth hooks and Springsteen-scale choruses on 2000s indie/alt radio.",
            "拉斯维加斯新浪潮复兴；Hot Fuss（2004）把合成器钩子与 Springsteen 体量副歌送上 2000 年代 indie/alt 电台。",
        ),
        "short": (
            "Brandon Flowers–led stadium indie; Mr. Brightside is the durable single.",
            "Brandon Flowers 领衔的体育场 indie；Mr. Brightside 是长寿单曲。",
        ),
        "body": (
            "Formed 2001. Hot Fuss and Sam’s Town established Flowers’s baritone, Dave Keuning’s delayed guitar, synth leads, and anthemic choruses aimed at arenas from the start.\n\nMr. Brightside (2003) is the permanent radio object. They continue the post-Strokes indie boom into explicit stadium design without garage rawness.",
            "2001 年组建。Hot Fuss 与 Sam’s Town 确立 Flowers 男中音、Dave Keuning 延时吉他、合成器主音，以及从一开始就瞄准体育场的副歌。\n\nMr. Brightside（2003）是永久电台对象。把后 Strokes 的 indie 热潮推进到明确的体育场设计，不保留车库毛边。",
        ),
    },
    "the-kinks": {
        "why": (
            "London band whose early singles pioneered distorted power-chord rock; You Really Got Me (1964) is a hard-rock / garage root citation.",
            "伦敦乐队：早期单曲开创失真强力和弦摇滚；You Really Got Me（1964）是 hard-rock / garage 根源引用。",
        ),
        "short": (
            "Davies brothers rock’n’roll; You Really Got Me is the riff prototype.",
            "Davies 兄弟的摇滚；You Really Got Me 是 riff 原型。",
        ),
        "body": (
            "Formed 1963. Mid-1960s Pye singles (You Really Got Me, All Day and All of the Night) used sliced-speaker distortion and Ray Davies’s songwriting; later Village Green–era work turned toward English observational pop.\n\nYou Really Got Me (1964) is the essential track here—two-chord riff, Dave Davies’s guitar grind. Cited by Van Halen and countless garage/hard-rock bands as a distortion template.",
            "1963 年组建。1960 年代中期 Pye 单曲（You Really Got Me、All Day and All of the Night）使用划破扬声器的失真与 Ray Davies 写作；后期 Village Green 时期转向英式观察流行。\n\nYou Really Got Me（1964）是此处必听——两和弦 riff、Dave Davies 的吉他碾磨。被 Van Halen 与大量 garage/hard-rock 乐队引为失真模板。",
        ),
    },
    "the-libertines": {
        "why": (
            "London garage-punk band; Up the Bracket (2002) and the Doherty–Barât partnership became mid-2000s UK indie’s chaos document.",
            "伦敦车库朋克；Up the Bracket（2002）与 Doherty–Barât 搭档成为 2000 年代中期英国 indie 的混乱文献。",
        ),
        "short": (
            "UK indie/garage; Can’t Stand Me Now is the dual-vocal single.",
            "英国 indie/garage；Can’t Stand Me Now 是双人声单曲。",
        ),
        "body": (
            "Formed 1997. Early Rough Trade releases and Mick Jones production put raw dual vocals, loose drums, and music-hall lyric references on the post-Strokes UK map.\n\nCan’t Stand Me Now (2004) is the listed track. Career interruptions and tabloid coverage are part of the public record; musically they export urgency and song craft over polish.",
            "1997 年组建。早期 Rough Trade 发行与 Mick Jones 制作把毛糙双人声、松鼓组与音乐厅式歌词指涉放上后 Strokes 英国地图。\n\nCan’t Stand Me Now（2004）是列出曲目。事业中断与小报报道属公开记录；音乐上输出的是紧迫感与歌曲工艺，而非抛光。",
        ),
    },
    "the-smiths": {
        "why": (
            "Manchester four-piece that set jangle guitar and literary lyric as 1980s UK indie’s default; The Queen Is Dead (1986) is the peak album citation.",
            "曼彻斯特四人组：把 jangle 吉他与文学歌词定为 1980 年代英国 indie 默认；The Queen Is Dead（1986）是峰值专辑引用。",
        ),
        "short": (
            "Morrissey / Marr indie; There Is a Light That Never Goes Out is the lasting single.",
            "Morrissey / Marr 的 indie；There Is a Light That Never Goes Out 是长寿单曲。",
        ),
        "body": (
            "Formed 1982. Rough Trade singles and albums through Strangeways… pair Johnny Marr’s multi-tracked jangle with Morrissey’s baritone and UK-specific references—no synth-pop compromise.\n\nThere Is a Light That Never Goes Out (1986) is the entry. They are the bridge from post-punk to 1990s Britpop guitar bands that cite Marr’s voicings and Morrissey’s persona separately.",
            "1982 年组建。Rough Trade 单曲与直至 Strangeways… 的专辑：Johnny Marr 多层 jangle 对 Morrissey 男中音与英国本土指涉——不做 synth-pop 妥协。\n\nThere Is a Light That Never Goes Out（1986）是入口。他们是后朋克到 1990 年代 Britpop 吉他乐队的桥：后者分别引用 Marr 声部与 Morrissey 人设。",
        ),
    },
    "the-stone-roses": {
        "why": (
            "Manchester band that fused indie guitar with dance grooves before Britpop’s chart boom; The Stone Roses (1989) and Fools Gold are the documents.",
            "曼彻斯特乐队：在 Britpop 榜单热潮前把 indie 吉他与舞曲 groove 融合；同名专辑（1989）与 Fools Gold 是文献。",
        ),
        "short": (
            "Madchester guitar-dance; Fools Gold is the extended groove single.",
            "Madchester 吉他—舞曲；Fools Gold 是延长 groove 单曲。",
        ),
        "body": (
            "Formed 1983. Debut album with John Leckie production set Ian Brown’s slack vocal, John Squire’s wah/jangle leads, Mani’s bass, Reni’s funk drums—baggy culture’s guitar wing.\n\nFools Gold (1989) is the listed track (long 12\" form). Second Coming delays and internal conflict limited the catalog; influence on Oasis and Britpop guitar bands is still cited.",
            "1983 年组建。John Leckie 制作的首专定型 Ian Brown 松弛人声、John Squire 的 wah/jangle 主音、Mani 贝斯、Reni 的 funk 鼓——baggy 文化的吉他翼。\n\nFools Gold（1989）是列出曲目（长 12 寸形态）。Second Coming 延期与内部冲突限制了目录；对 Oasis 与 Britpop 吉他乐队的影响仍常被引用。",
        ),
    },
    "the-velvet-underground": {
        "why": (
            "NYC band with Warhol association; The Velvet Underground & Nico (1967) delayed-influence blueprint for punk, noise, and indie’s drone/dissonance.",
            "与 Warhol 关联的纽约乐队；The Velvet Underground & Nico（1967）是朋克、噪声与 indie 持续音/不协和的延迟影响蓝图。",
        ),
        "short": (
            "Reed / Cale avant-rock; Heroin is the early drone-narrative piece.",
            "Reed / Cale 的前卫摇滚；Heroin 是早期持续音叙事曲。",
        ),
        "body": (
            "Formed 1964. Debut with Nico, White Light/White Heat, and later Reed-led albums used viola drone, feedback, deadpan lyric, and minimal chord vamps outside AM-psych fashion.\n\nHeroin (1967) is the listed track. Commercial failure at release; citation density in punk/post-punk/indie histories is the measure of impact.",
            "1964 年组建。与 Nico 的首专、White Light/White Heat 及后期 Reed 主导专辑：中提琴持续音、反馈、冷脸歌词、极少和弦反复，落在 AM 迷幻时尚之外。\n\nHeroin（1967）是列出曲目。发行时商业失败；朋克/后朋克/indie 史中的引用密度才是影响尺度。",
        ),
    },
    "the-verve": {
        "why": (
            "Wigan band that put string loops and Richard Ashcroft’s vocal on late-Britpop stadium scale; Urban Hymns (1997) is the mass record.",
            "威根乐队：把弦乐循环与 Richard Ashcroft 人声推上后 Britpop 体育场体量；Urban Hymns（1997）是大众唱片。",
        ),
        "short": (
            "Britpop-era psych-rock; Bitter Sweet Symphony is the sample-era hit.",
            "Britpop 时期迷幻摇滚；Bitter Sweet Symphony 是采样时代热单。",
        ),
        "body": (
            "Formed 1990. A Northern Soul and early EPs built space-rock length; Urban Hymns after a breakup/reunion delivered the chart peak with Nick McCabe’s guitar wash and orchestral samples.\n\nBitter Sweet Symphony (1997) is the essential track (and rights-dispute case study). They close Britpop’s commercial arc with melancholic, mid-tempo maximalism.",
            "1990 年组建。A Northern Soul 与早期 EP 建立太空摇滚时长；解散/重组后的 Urban Hymns 以 Nick McCabe 吉他铺底与管弦采样交出榜单高峰。\n\nBitter Sweet Symphony（1997）是必听（也是版权纠纷案例）。以忧郁中速的最大化制作收束 Britpop 商业弧线。",
        ),
    },
    "the-white-stripes": {
        "why": (
            "Detroit duo that stripped blues-garage to guitar/drums/vocal; Elephant (2003) and Seven Nation Army made minimal lineup a global riff brand.",
            "底特律双人组：把蓝调车库压成吉他/鼓/人声；Elephant（2003）与 Seven Nation Army 让最小编制成为全球 riff 品牌。",
        ),
        "short": (
            "Jack / Meg White blues-garage; Seven Nation Army is the stadium chant riff.",
            "Jack / Meg White 的蓝调车库；Seven Nation Army 是体育场口号 riff。",
        ),
        "body": (
            "Formed 1997. Early Sympathy for the Record Industry releases and White Blood Cells kept recording raw; Elephant (Liam Watson / Toe Rag) hit mainstream without adding bass.\n\nSeven Nation Army (2003) is the listed riff—octave pedal illusion of bass. Proof that early-2000s rock radio still answered to garage reduction, not only nu-metal density.",
            "1997 年组建。早期 Sympathy for the Record Industry 发行与 White Blood Cells 保持毛糙录音；Elephant（Liam Watson / Toe Rag）打进主流且不加贝斯。\n\nSeven Nation Army（2003）是列出 riff——八度效果器制造的假贝斯。证明 2000 年代初摇滚电台仍回应车库减法，而非只有 nu-metal 密度。",
        ),
    },
    "tool": {
        "why": (
            "LA progressive metal band; Lateralus (2001) and Ænima put polymeter, long-form structures, and art-video culture on metal radio.",
            "洛杉矶 progressive metal；Lateralus（2001）与 Ænima 把复合节拍、长结构与艺术录像文化送上金属电台。",
        ),
        "short": (
            "Keenan / Jones / Chancellor / Carey prog-metal; Schism is the odd-meter single.",
            "Keenan / Jones / Chancellor / Carey 的 prog-metal；Schism 是奇数拍单曲。",
        ),
        "body": (
            "Formed 1990. Undertow through Fear Inoculum use drop-tuned riffs, Danny Carey’s polyrhythms, Maynard Keenan’s mid-range vocal, and album gaps measured in years.\n\nSchism (2001) is the listed track—time-signature shifts as hook. They occupy metal-adjacent charts with prog length and visual art packaging rather than thrash speed.",
            "1990 年组建。从 Undertow 到 Fear Inoculum：降调 riff、Danny Carey 的复合节奏、Maynard Keenan 中音区人声，以及以年计的专辑间隔。\n\nSchism（2001）是列出曲目——拍号切换即钩子。占据金属邻近榜单，靠 prog 时长与视觉艺术包装，而非 thrash 速度。",
        ),
    },
    "van-halen": {
        "why": (
            "Pasadena hard-rock band that made two-handed tapping and high-gain precision a guitar-hero standard; Van Halen (1978) is the debut shock.",
            "帕萨迪纳 hard-rock：把双手 tapping 与高增益精度做成吉他英雄标准；同名首专（1978）是出道冲击。",
        ),
        "short": (
            "Eddie Van Halen–era hard rock; Eruption is the technique showcase.",
            "Eddie Van Halen 时期 hard rock；Eruption 是技术展示。",
        ),
        "body": (
            "Formed 1972. Debut album with Ted Templeman production put Eddie’s tapping, harmonics, and brown-sound midrange beside David Lee Roth’s showman vocal and Michael Anthony’s harmony.\n\nEruption (1978) is the instrumental citation. 1980s Roth-to-Hagar lineup change is a separate commercial chapter; the technique export is early and permanent.",
            "1972 年组建。Ted Templeman 制作的首专把 Eddie 的 tapping、泛音与棕色中频，配上 David Lee Roth 的表演人声与 Michael Anthony 和声。\n\nEruption（1978）是器乐引用。1980 年代 Roth 到 Hagar 的阵容更替是另一商业章节；技术输出早且持久。",
        ),
    },
}

def main():
    n = 0
    for slug, c in STUBS.items():
        patch_band_basic(slug, why_matters=c["why"], short_bio=c["short"], body=c["body"])
        n += 1
    print(f"patched {n} stub bands (batch B)")

if __name__ == "__main__":
    main()

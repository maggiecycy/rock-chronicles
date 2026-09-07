#!/usr/bin/env python3
"""Rewrite stub band editorials — batch A (27)."""
from apply_util import patch_band_basic

STUBS = {
    "alice-in-chains": {
        "why": (
            "Seattle four-piece that put twin-harmony vocals over down-tuned hard-rock riffs; Facelift (1990) and Dirt (1992) sit on the metal side of grunge radio.",
            "西雅图四人组：双人声和谐叠在降调 hard-rock riff 上；Facelift（1990）与 Dirt（1992）站在 grunge 电台里更偏 metal 的一侧。",
        ),
        "short": (
            "Grunge/metal border band known for Layne Staley–Jerry Cantrell harmony and Dirt-era riffs.",
            "Grunge/metal 交界乐队：以 Layne Staley 与 Jerry Cantrell 的和声及 Dirt 时期 riff 著称。",
        ),
        "body": (
            "Formed in Seattle in 1987. Early singles and Facelift brought them onto US rock radio; Dirt (1992) fixed the template—sludgy guitar, close vocal thirds, addiction-era lyrics.\n\nMan in the Box (1990) remains the entry point. They sit beside Soundgarden and Pearl Jam on the Seattle map but keep a clearer metal lineage via Cantrell’s riff writing.",
            "1987 年于西雅图组建。早期单曲与 Facelift 打进美国摇滚电台；Dirt（1992）定型：淤泥感吉他、贴近的三度人声、成瘾题材歌词。\n\nMan in the Box（1990）仍是入口。地图上与 Soundgarden、Pearl Jam 同属西雅图，但 Cantrell 的 riff 写作更贴近 metal 谱系。",
        ),
    },
    "blur": {
        "why": (
            "Colchester/London Britpop flagship: Parklife (1994) framed English observational pop; later albums (13, Think Tank) pushed art-rock and electronic edges against Oasis’s stadium lane.",
            "科尔切斯特/伦敦 Britpop 主力：Parklife（1994）框定英式观察式流行；后期专辑（13、Think Tank）把 art-rock 与电子边缘推到 Oasis 体育场路线的对面。",
        ),
        "short": (
            "Britpop band led by Damon Albarn and Graham Coxon; Parklife to Song 2 spans satire and loud/quiet radio hits.",
            "Damon Albarn 与 Graham Coxon 领衔的 Britpop 乐队；从 Parklife 到 Song 2 覆盖讽刺小品与强弱电台单曲。",
        ),
        "body": (
            "Formed 1988. Leisure and Modern Life Is Rubbish set up the Britpop frame; Parklife (1994) and The Great Escape locked chart rivalry with Oasis.\n\nSong 2 (1997) is the US loud/quiet hook. Coxon’s guitar vocabulary—noise, feedback, anti-virtuoso chops—anchors the band’s art-school side beyond the Blur vs Oasis headline.",
            "1988 年组建。Leisure 与 Modern Life Is Rubbish 铺好 Britpop 框架；Parklife（1994）与 The Great Escape 坐实与 Oasis 的榜单对峙。\n\nSong 2（1997）是打进美国的强弱钩子。Coxon 的吉他语汇——噪声、反馈、反炫技切分——撑住乐队在「Blur vs Oasis」标题之外的艺术学院一面。",
        ),
    },
    "coldplay": {
        "why": (
            "Post-Britpop London four-piece that scaled piano-led alternative into global stadium pop from Parachutes (2000) through Viva la Vida-era production.",
            "后 Britpop 伦敦四人组：从 Parachutes（2000）到 Viva la Vida 时期制作，把钢琴导向的 alternative 扩成全球体育场流行。",
        ),
        "short": (
            "Chris Martin–led band; Yellow and Clocks made early-2000s alternative a mass radio format.",
            "Chris Martin 领衔；Yellow 与 Clocks 把 2000 年代初 alternative 做成大众电台格式。",
        ),
        "body": (
            "Formed in London in 1996. Parachutes (2000) and A Rush of Blood to the Head (2002) established delay-soaked guitars, piano hooks, and falsetto leads as arena grammar.\n\nYellow (2000) is the debut-era marker. Later records lean on Brian Eno–style production and chart maximalism; the early catalog is the rock-chronicle hinge from Britpop hangover to 2000s stadium alternative.",
            "1996 年于伦敦组建。Parachutes（2000）与 A Rush of Blood to the Head（2002）把延时吉他、钢琴钩子与假声主唱做成体育场语法。\n\nYellow（2000）是出道期标记。后期唱片靠 Brian Eno 式制作与榜单最大化；早期目录才是编年史里从 Britpop 余波接到 2000 年代体育场 alternative 的铰链。",
        ),
    },
    "david-bowie": {
        "why": (
            "Solo artist filed here as a band-node: glam, Berlin trilogy, and Let’s Dance show persona and production shifts as a working method from 1969 onward.",
            "以乐队节点收录的独唱歌手：从 1969 年起，glam、柏林三部曲与 Let’s Dance 把人设与制作切换当成工作方法。",
        ),
        "short": (
            "English songwriter/performer; Ziggy, Berlin, and 1980s pop eras reset rock’s costume-and-studio playbook.",
            "英国词曲/表演者；Ziggy、柏林与 1980 年代流行时期重置了摇滚的造型与录音室剧本。",
        ),
        "body": (
            "Career hinge tracks run from Space Oddity (1969) through Ziggy Stardust (1972), the Eno collaborations Low/Heroes (1977), and Let’s Dance (1983).\n\nBowie’s value in this graph is procedural: lineup and style change on purpose, not as crisis. Session players and producers (Mick Ronson, Tony Visconti, Nile Rodgers) matter as much as the characters.",
            "关键曲目从 Space Oddity（1969）经 Ziggy Stardust（1972）、与 Eno 合作的 Low/Heroes（1977），到 Let’s Dance（1983）。\n\n在本图谱里 Bowie 的价值是程序化的：阵容与风格有意切换，而非危机产物。录音室乐手与制作人（Mick Ronson、Tony Visconti、Nile Rodgers）与角色人设同等重要。",
        ),
    },
    "deep-purple": {
        "why": (
            "Mark II lineup (Blackmore / Gillan / Glover / Lord / Paice) set hard rock’s organ-plus-riff classroom: Machine Head (1972) and the Made in Japan live document.",
            "Mark II 阵容（Blackmore / Gillan / Glover / Lord / Paice）定下 hard rock「管风琴 + riff」课堂：Machine Head（1972）与现场专辑 Made in Japan。",
        ),
        "short": (
            "British hard-rock band; Smoke on the Water made the open-fifth riff a global teaching tool.",
            "英国 hard-rock 乐队；Smoke on the Water 把开放五度 riff 做成全球教学工具。",
        ),
        "body": (
            "Formed 1968; the commercially decisive era is 1970–73 Mark II. In Rock We Trust and Machine Head fused Jon Lord’s Hammond with Blackmore’s blues-classical guitar figures.\n\nSmoke on the Water (1972) is the riff everyone learns; Highway Star and Lazy show the speed and jazz-blues stretch. They sit with Sabbath and Zeppelin as early-70s hard-rock pillars, more organ-forward than either.",
            "1968 年组建；商业与风格决定期是 1970–73 的 Mark II。In Rock 与 Machine Head 把 Jon Lord 的 Hammond 与 Blackmore 的蓝调—古典吉他音型焊在一起。\n\nSmoke on the Water（1972）是人人会弹的 riff；Highway Star、Lazy 展示速度与爵士蓝调延伸。与 Sabbath、Zeppelin 同属 70 年代初 hard-rock 支柱，管风琴比重更高。",
        ),
    },
    "deftones": {
        "why": (
            "Sacramento band that welded nu-metal rhythm weight to shoegaze/dream-pop guitar wash; White Pony (2000) is the catalog hinge.",
            "萨克拉门托乐队：把 nu-metal 节奏重量焊上 shoegaze/dream-pop 吉他铺底；White Pony（2000）是目录铰链。",
        ),
        "short": (
            "Alt-metal group led by Chino Moreno; Change and Digitized atmospheres bridge metal and shoegaze listeners.",
            "Chino Moreno 领衔的 alt-metal；Change 等曲目把金属听众与 shoegaze 听众接到同一套氛围制作上。",
        ),
        "body": (
            "Formed 1988. Adrenaline and Around the Fur hit 1990s heavy radio; White Pony (2000) widened the palette—trip-hop tempos, layered vocals, Stephen Carpenter’s low tunings against Moreno’s clean/scream split.\n\nChange (In the House of Flies) (2000) is the crossover single. Later records keep the dual audience: metal festival stages and indie/shoegaze playlists.",
            "1988 年组建。Adrenaline 与 Around the Fur 打进 1990 年代重金属电台；White Pony（2000）拓宽调色板——trip-hop 速度、多层人声、Stephen Carpenter 的降调对 Moreno 的清唱/嘶吼分工。\n\nChange (In the House of Flies)（2000）是跨界单曲。后期作品仍维持双观众：金属音乐节舞台与 indie/shoegaze 播放列表。",
        ),
    },
    "depeche-mode": {
        "why": (
            "Basildon synth group that scaled electronic songwriting to rock-arena size; Violator (1990) made synth-pop a stadium rock peer.",
            "巴西尔登合成器组合：把电子歌曲写作扩到摇滚体育场体量；Violator（1990）让 synth-pop 与体育场摇滚平起平坐。",
        ),
        "short": (
            "Martin Gore / Dave Gahan–era electronic rock; Enjoy the Silence is the mass-entry single.",
            "Martin Gore / Dave Gahan 时期电子摇滚；Enjoy the Silence 是大众入口单曲。",
        ),
        "body": (
            "Formed 1980. Early Mute Records singles and Black Celebration built a dark synth vocabulary; Music for the Masses and the 1988 Pasadena Rose Bowl show proved the live scale.\n\nViolator (1990)—Personal Jesus, Enjoy the Silence—crossed into US rock radio without guitar-band cosplay. They belong in a rock chronicle as proof that sequenced bass and industrial percussion can carry arena dynamics.",
            "1980 年组建。早期 Mute 单曲与 Black Celebration 建立暗色合成器语汇；Music for the Masses 与 1988 年帕萨迪纳玫瑰碗演出坐实现场体量。\n\nViolator（1990）——Personal Jesus、Enjoy the Silence——打进美国摇滚电台，无需假装吉他乐队。收入摇滚编年是为了证明：音序低音与工业打击乐也能撑住体育场动态。",
        ),
    },
    "evanescence": {
        "why": (
            "Little Rock–origin act that fused goth-piano hooks with nu-metal guitars; Fallen (2003) dominated early-2000s rock radio.",
            "小石城起家：哥特钢琴钩子叠 nu-metal 吉他；Fallen（2003）占领 2000 年代初摇滚电台。",
        ),
        "short": (
            "Amy Lee–fronted goth/nu-metal crossover; Bring Me to Life is the chart spike.",
            "Amy Lee 领衔的哥特/nu-metal 跨界；Bring Me to Life 是榜单峰值。",
        ),
        "body": (
            "Formed mid-1990s in Arkansas; Fallen (2003) is the commercial record that matters here—Ben Moody–era guitars, string/choir arrangements, Lee’s mezzo lead.\n\nBring Me to Life (2003) with Paul McCoy’s guest vocal is the nu-metal radio handshake. The page tracks how early-2000s rock radio absorbed goth-pop melody without leaving the heavy playlist.",
            "1990 年代中期于阿肯色组建；Fallen（2003）是此处关键的商业唱片——Ben Moody 时期吉他、弦乐/合唱编曲、Lee 的女中音主唱。\n\n与 Paul McCoy 客串的 Bring Me to Life（2003）是 nu-metal 电台握手礼。本页追踪 2000 年代初摇滚电台如何在不离开重型播放列表的前提下吸收哥特流行旋律。",
        ),
    },
    "explosions-in-the-sky": {
        "why": (
            "Austin instrumental post-rock quartet; The Earth Is Not a Cold Dead Place (2003) set US crescendo-guitar grammar beside Mogwai/Godspeed.",
            "奥斯汀器乐 post-rock 四重奏；The Earth Is Not a Cold Dead Place（2003）在 Mogwai/Godspeed 旁定下美国渐强吉他语法。",
        ),
        "short": (
            "Wordless post-rock band; Your Hand in Mine is the signature long-form build.",
            "无人声 post-rock；Your Hand in Mine 是标志性长结构渐强。",
        ),
        "body": (
            "Formed 1999 in Austin. Early Temporary Residence releases and the 2003 album fixed delay-heavy interlocking guitars, soft-to-loud arcs, and film/TV licensing reach (Friday Night Lights association).\n\nYour Hand in Mine (2003) is the entry cue. No vocals, no verse-chorus pop—narrative load sits in arrangement dynamics and recorded room.",
            "1999 年于奥斯汀组建。早期 Temporary Residence 发行与 2003 专辑定型：大量延时交织吉他、弱到强弧线，以及影视授权触达（与 Friday Night Lights 关联）。\n\nYour Hand in Mine（2003）是入口。无人声、无主歌副歌流行结构——叙事载荷落在编曲动态与录音空间。",
        ),
    },
    "fleetwood-mac": {
        "why": (
            "British-American band whose 1975–77 Buckingham–Nicks lineup turned soft-rock harmony and studio polish into Rumours-scale pop architecture.",
            "英美乐队：1975–77 Buckingham–Nicks 阵容把软摇滚和声与录音室抛光做成 Rumours 级流行结构。",
        ),
        "short": (
            "Lineup-drama soft rock; Go Your Own Way and Rumours define late-70s radio craft.",
            "阵容戏剧化的软摇滚；Go Your Own Way 与 Rumours 定义 70 年代末电台工艺。",
        ),
        "body": (
            "Started 1967 as a UK blues band (Peter Green era). The chronicle hinge is the California pop era: Fleetwood Mac (1975) and Rumours (1977) with Lindsey Buckingham, Stevie Nicks, Christine McVie, John McVie, Mick Fleetwood.\n\nGo Your Own Way (1977) shows the production—layered acoustics, precise drums, stacked vocals. Interpersonal conflict is documented; the musical object is arrangement density and radio longevity.",
            "1967 年起家为英国蓝调乐队（Peter Green 时期）。编年铰链是加州流行时期：Fleetwood Mac（1975）与 Rumours（1977），阵容含 Lindsey Buckingham、Stevie Nicks、Christine McVie、John McVie、Mick Fleetwood。\n\nGo Your Own Way（1977）展示制作——多层原声、精确鼓组、堆叠人声。人际冲突有文献；音乐对象是编曲密度与电台寿命。",
        ),
    },
    "franz-ferdinand": {
        "why": (
            "Glasgow art-rock four-piece that put angular dance-punk guitars on mid-2000s indie charts; Take Me Out (2004) is the structural hook lesson.",
            "格拉斯哥 art-rock 四人组：把棱角 dance-punk 吉他送上 2000 年代中期 indie 榜；Take Me Out（2004）是结构钩子教材。",
        ),
        "short": (
            "Post-punk revival dance-rock; Take Me Out’s mid-song tempo drop became a club/indie staple.",
            "后朋克复兴期的舞曲摇滚；Take Me Out 的曲中速度降落成为俱乐部/indie 常备。",
        ),
        "body": (
            "Formed 2002. Debut Franz Ferdinand (2004) and You Could Have It So Much Better married wire-tight rhythm guitar to disco bass figures and Alex Kapranos’s deadpan vocal.\n\nTake Me Out (2004) splits verse and chorus tempos on purpose—teaching arrangement as drama without prog length. They sit with Interpol/Strokes-era revival but aim at dance floors more than NYC cool.",
            "2002 年组建。首专 Franz Ferdinand（2004）与 You Could Have It So Much Better 把绷紧节奏吉他焊上迪斯科低音型与 Alex Kapranos 的冷脸人声。\n\nTake Me Out（2004）故意拆开主副歌速度——用编曲制造戏剧，却不走 prog 时长。与 Interpol/Strokes 同期复兴为邻，但更瞄准舞池而非纽约酷感。",
        ),
    },
    "godspeed-you-black-emperor": {
        "why": (
            "Montreal collective; F♯ A♯ ∞ (1997) and Lift Your Skinny Fists (2000) set anarchic, field-recording post-rock as long-form composition.",
            "蒙特利尔集体；F♯ A♯ ∞（1997）与 Lift Your Skinny Fists（2000）把无政府、田野录音式 post-rock 做成大型曲式。",
        ),
        "short": (
            "Instrumental post-rock ensemble; East Hastings is the early cinema-drone landmark.",
            "器乐 post-rock 大编制；East Hastings 是早期电影感持续音地标。",
        ),
        "body": (
            "Active from 1994 (name stylization varies). Early Constellation Records releases use spoken samples, tape hiss, and slow orchestral builds instead of verse-chorus.\n\nEast Hastings (1998 era circulation) and the Skinny Fists double album are reference points for European/US post-rock that rejects indie-song length. Membership is fluid; the method—crescendo architecture + found sound—is the constant.",
            "自 1994 年活动（名称拼写多变）。早期 Constellation 厂牌作品用口语采样、磁带底噪与缓慢管弦渐强，而非主副歌。\n\nEast Hastings（约 1998 年流传）与 Skinny Fists 双专是欧美 post-rock 拒绝 indie 歌曲长度的参照。成员流动；方法——渐强结构 + 拾得声音——是常量。",
        ),
    },
    "idles": {
        "why": (
            "Bristol post-punk/hardcore band; Brutalism (2017) and Joy as an Act of Resistance (2018) put shouted political lyrics over dry, heavy rhythm sections.",
            "布里斯托后朋克/硬核乐队；Brutalism（2017）与 Joy as an Act of Resistance（2018）把喊叫政治歌词叠在干、重的节奏组上。",
        ),
        "short": (
            "Modern UK post-punk; Never Fight a Man With a Perm shows the chant-riff live mode.",
            "当代英国后朋克；Never Fight a Man With a Perm 展示口号—riff 现场模式。",
        ),
        "body": (
            "Formed 2009. Mid-2010s albums made them a festival circuit staple: Joe Talbot’s bark, Mark Bowen/Lee Kiernan guitar scrapes, Jon Beavis’s hardcore-adjacent drums.\n\nNever Fight a Man With a Perm (2018) is a typical set piece—short riffs, gang vocals, on-stage physicality. They update 2010s post-punk without revival costume; lyrics name class, masculinity, and NHS-era Britain directly.",
            "2009 年组建。2010 年代中期专辑使其成为音乐节线路常客：Joe Talbot 的吠叫、Mark Bowen/Lee Kiernan 的刮擦吉他、Jon Beavis 偏硬核的鼓。\n\nNever Fight a Man With a Perm（2018）是典型曲目——短 riff、群吼、舞台肢体。更新 2010 年代后朋克而不穿复古戏服；歌词直接点名阶级、男性气质与 NHS 时代的英国。",
        ),
    },
    "interpol": {
        "why": (
            "NYC post-punk revival four-piece; Turn on the Bright Lights (2002) restored Joy Division–echo bass and reverb guitar as early-2000s indie default.",
            "纽约后朋克复兴四人组；Turn on the Bright Lights（2002）把 Joy Division 回声式贝斯与混响吉他恢复成 2000 年代初 indie 默认。",
        ),
        "short": (
            "Paul Banks / Carlos Dengler–era gloom rock; Obstacle 1 is the debut-era single.",
            "Paul Banks / Carlos Dengler 时期暗色摇滚；Obstacle 1 是出道期单曲。",
        ),
        "body": (
            "Formed 1997. Bright Lights and Antics (2004) defined a look and mix: black suits, delayed dual guitars, high-register bass, dry vocal.\n\nObstacle 1 (2002) is the structural sample—tight verse, open chorus, Dengler’s melodic bass. They sit with The Strokes/Yeah Yeah Yeahs on the NYC revival map but aim colder and more mid-tempo than garage peers.",
            "1997 年组建。Bright Lights 与 Antics（2004）定义外形与混音：黑西装、双延时吉他、高音域贝斯、干人声。\n\nObstacle 1（2002）是结构样本——紧主歌、开副歌、Dengler 的旋律贝斯。与 The Strokes/Yeah Yeah Yeahs 同在纽约复兴地图，但比 garage 同伴更冷、更中速。",
        ),
    },
    "iron-maiden": {
        "why": (
            "NWOBHM flagship; the Dickinson–Murray–Smith twin-guitar era and Number of the Beast (1982) set gallop rhythm and concept-lyric metal as global touring grammar.",
            "NWOBHM 旗舰；Dickinson–Murray–Smith 双吉他时期与 Number of the Beast（1982）把疾驰节奏与概念歌词金属做成全球巡语法。",
        ),
        "short": (
            "British heavy metal; The Trooper exemplifies gallop riff and dual-lead writing.",
            "英国重金属；The Trooper 示范疾驰 riff 与双主音写作。",
        ),
        "body": (
            "Formed London 1975 by Steve Harris. Breakthrough is early-1980s: Killers, Number of the Beast, Piece of Mind—Harris’s eighth-note bass gallop, twin leads, Bruce Dickinson’s operatic mid range.\n\nThe Trooper (1983) is the textbook track. Eddie mascot and long tours matter as brand tech; musically they standardize New Wave of British Heavy Metal for arenas without thrash speed.",
            "1975 年由 Steve Harris 于伦敦组建。突破在 1980 年代初：Killers、Number of the Beast、Piece of Mind——Harris 的八分音符贝斯疾驰、双主音、Bruce Dickinson 的歌剧式中音区。\n\nThe Trooper（1983）是教科书曲目。Eddie 吉祥物与长巡演是品牌技术；音乐上他们把 NWOBHM 标准化进体育场，却不走 thrash 速度。",
        ),
    },
    "judas-priest": {
        "why": (
            "Birmingham metal band that codified leather-and-studs image plus twin-guitar attack; British Steel (1980) and Painkiller (1990) bookend classic and speed eras.",
            "伯明翰金属乐队：编码皮衣铆钉形象与双吉他攻击；British Steel（1980）与 Painkiller（1990）标记经典与速度两端。",
        ),
        "short": (
            "Halford / Tipton / Downing metal grammar; Painkiller is the late-peak speed document.",
            "Halford / Tipton / Downing 金属语法；Painkiller 是后期峰值速度文献。",
        ),
        "body": (
            "Formed 1969. Mid/late-1970s albums (Sad Wings, Hell Bent for Leather) and British Steel moved metal from blues-rock residue toward tighter riff songs and Halford’s high register.\n\nPainkiller (1990) with Scott Travis’s double-kick is the extreme update. They are a reference for how heavy metal separated from 1970s hard rock: shorter hooks, chrome production, dual guitar leads as default.",
            "1969 年组建。1970 年代中后期专辑（Sad Wings、Hell Bent for Leather）与 British Steel 把金属从蓝调摇滚残余推进到更紧的 riff 歌曲与 Halford 高音区。\n\nPainkiller（1990）加上 Scott Travis 双踩是极端更新。他们是重金属如何脱离 1970 年代 hard rock 的参照：更短钩子、镀铬制作、双吉他主音成默认。",
        ),
    },
    "kings-of-leon": {
        "why": (
            "Nashville Followill family band that moved from garage Southern rock to arena alt-radio with Only by the Night (2008).",
            "纳什维尔 Followill 家族乐队：从车库南方摇滚转到 Only by the Night（2008）的体育场 alternative 电台。",
        ),
        "short": (
            "US indie/alt rock; Sex on Fire and Use Somebody are the late-2000s crossover singles.",
            "美国 indie/alt rock；Sex on Fire 与 Use Somebody 是 2000 年代末跨界单曲。",
        ),
        "body": (
            "Formed 1999. Early albums (Youth & Young Manhood, Aha Shake Heartbreak) pushed rawer riffs and Caleb Followill’s strained vocal; Because of the Times expanded dynamics.\n\nSex on Fire (2008) is the chart object. They matter here as a US path into the same stadium-indie space Coldplay/Killers occupied in the UK/US charts—Southern rock DNA under delay-guitar polish.",
            "1999 年组建。早期专辑（Youth & Young Manhood、Aha Shake Heartbreak）更毛糙的 riff 与 Caleb Followill 绷紧人声；Because of the Times 扩展动态。\n\nSex on Fire（2008）是榜单对象。此处意义是美国路径进入 Coldplay/Killers 占据的体育场 indie 空间——延时吉他抛光下仍有南方摇滚 DNA。",
        ),
    },
    "linkin-park": {
        "why": (
            "Agoura Hills six-piece that made rap-rock/nu-metal the default millennial rock radio format via Hybrid Theory (2000).",
            "阿古拉山六人组：借 Hybrid Theory（2000）把 rap-rock/nu-metal 做成千禧一代摇滚电台默认格式。",
        ),
        "short": (
            "Chester Bennington / Mike Shinoda dual-vocal nu-metal; In the End is the global hook.",
            "Chester Bennington / Mike Shinoda 双人声 nu-metal；In the End 是全球钩子。",
        ),
        "body": (
            "Formed 1996 (earlier name Xero). Hybrid Theory and Meteora fused DJ/sample beds, downtuned guitars, Shinoda’s rap verses, Bennington’s melodic chorus.\n\nIn the End (2000) is the structural template taught to a decade of bands. Later catalogs add electronic and concept-album turns; the chronicle weight is how 2000–03 rock radio sounded in malls and MTV.",
            "1996 年组建（曾用名 Xero）。Hybrid Theory 与 Meteora 融合 DJ/采样铺底、降调吉他、Shinoda 的 rap 主歌、Bennington 的旋律副歌。\n\nIn the End（2000）是教给整整十年乐队的结构模板。后期目录加入电子与概念专集转向；编年分量是 2000–03 商场与 MTV 上的摇滚电台声景。",
        ),
    },
    "megadeth": {
        "why": (
            "Dave Mustaine’s thrash project after Metallica; Rust in Peace (1990) set technical riff density and political lyric as thrash’s precision pole.",
            "Dave Mustaine 离开 Metallica 后的 thrash 项目；Rust in Peace（1990）把技术性 riff 密度与政治歌词定为 thrash 的精密一极。",
        ),
        "short": (
            "Technical thrash; Holy Wars… The Punishment Due is the early-90s peak document.",
            "技术 thrash；Holy Wars… The Punishment Due 是 90 年代初峰值文献。",
        ),
        "body": (
            "Formed Los Angeles 1983 by Mustaine with Dave Ellefson. Peace Sells… and So Far, So Good… built the catalog; Rust in Peace with Friedman/Menza is the consensus technical high.\n\nHoly Wars… The Punishment Due (1990) stacks odd-phrase riffs and tight rhythm guitar. They sit in the Big Four thrash map opposite Metallica’s broader mainstream path—more chromatic runs, more explicit geopolitics in lyrics.",
            "1983 年由 Mustaine 与 Dave Ellefson 于洛杉矶组建。Peace Sells… 与 So Far, So Good… 建立目录；与 Friedman/Menza 的 Rust in Peace 是共识技术高峰。\n\nHoly Wars… The Punishment Due（1990）堆叠奇数乐句 riff 与紧节奏吉他。在 Big Four thrash 地图上对 Metallica 更宽的主流路径——更多半音跑动、歌词地缘政治更直接。",
        ),
    },
    "mogwai": {
        "why": (
            "Glasgow post-rock band; Young Team (1997) and later scores made quiet-loud instrumental dynamics a UK festival and film language.",
            "格拉斯哥 post-rock；Young Team（1997）与后期配乐把强弱器乐动态做成英国音乐节与电影语言。",
        ),
        "short": (
            "Scottish crescendo rock; Auto Rock shows piano-led build without vocals.",
            "苏格兰渐强摇滚；Auto Rock 展示无人声的钢琴导向推进。",
        ),
        "body": (
            "Formed 1995. Early Chemikal Underground/Matador-era records used volume as structure—long clean passages, sudden distortion walls, occasional spoken samples.\n\nAuto Rock (2006, from Mr Beast) is a compact example of piano motif into full-band swell. They parallel Explosions in the Sky/Godspeed with a drier Scottish indie infrastructure and more soundtrack commissions.",
            "1995 年组建。早期 Chemikal Underground/Matador 时期唱片把音量当结构——长段干净段落、突然的失真墙、偶尔口语采样。\n\nAuto Rock（2006，出自 Mr Beast）是钢琴动机推进到全乐队膨胀的紧凑例子。与 Explosions in the Sky/Godspeed 平行，苏格兰 indie 基建更干，影视委托更多。",
        ),
    },
    "motorhead": {
        "why": (
            "Lemmy’s power-trio bridge between punk tempo and metal volume; Ace of Spades (1980) fixed speed-as-attitude for both scenes.",
            "Lemmy 的三件套：连接朋克速度与金属音量；Ace of Spades（1980）把「速度即态度」钉给两边场景。",
        ),
        "short": (
            "UK speed/heavy rock; Ace of Spades is the three-chord velocity blueprint.",
            "英国速度/重型摇滚；Ace of Spades 是三和弦速度蓝图。",
        ),
        "body": (
            "Formed 1975 after Lemmy left Hawkwind. Overkill, Ace of Spades, and No Sleep ’til Hammersmith document the classic Lemmy / Eddie Clarke / Phil Taylor attack—bass as rhythm guitar, shouted vocal, 4/4 charge.\n\nAce of Spades (1980) is the citation track for thrash and hardcore bands naming Motörhead as tempo ancestor. Not progressive; the craft is relentlessness and midrange grit in the mix.",
            "Lemmy 离开 Hawkwind 后于 1975 年组建。Overkill、Ace of Spades 与 No Sleep ’til Hammersmith 记录经典 Lemmy / Eddie Clarke / Phil Taylor 攻击——贝斯当节奏吉他、喊叫人声、4/4 冲锋。\n\nAce of Spades（1980）是 thrash 与 hardcore 乐队点名 Motörhead 为速度祖先时的引用曲。不走 progressive；工艺在于不停歇与混音中频的砂感。",
        ),
    },
    "muse": {
        "why": (
            "Teignmouth trio that scaled prog/alt riffs, falsetto leads, and classical pastiche into 2000s arena rock; Black Holes and Absolution–era peak.",
            "廷茅斯三人组：把 prog/alt riff、假声主唱与古典拼贴扩成 2000 年代体育场摇滚；Black Holes 与 Absolution 时期为峰。",
        ),
        "short": (
            "Matt Bellamy–led arena alternative; Knights of Cydonia is the maximal single.",
            "Matt Bellamy 领衔的体育场 alternative；Knights of Cydonia 是最大化单曲。",
        ),
        "body": (
            "Formed 1994. Origin of Symmetry (2001) and Absolution (2003) built the template—heavily compressed guitars, arp synths, operatic falsetto, conspiracy/sci-fi lyric frames.\n\nKnights of Cydonia (2006) stacks Morricone pastiche and stadium riff. They occupy the UK arena lane beside Radiohead’s experimental path: same generation, louder crowd-chant design.",
            "1994 年组建。Origin of Symmetry（2001）与 Absolution（2003）建立模板——高压缩吉他、琶音合成器、歌剧式假声、阴谋/科幻歌词框架。\n\nKnights of Cydonia（2006）堆叠 Morricone 拼贴与体育场 riff。与 Radiohead 的实验路径同代，占据英国体育场车道，更强调集体口号设计。",
        ),
    },
    "my-bloody-valentine": {
        "why": (
            "Dublin/London shoegaze core; Loveless (1991) set extreme guitar blur, pitch bends, and buried vocals as a production ceiling still cited in indie.",
            "都柏林/伦敦 shoegaze 核心；Loveless（1991）把极端吉他模糊、弯音与埋人声定为 indie 仍在引用的制作上限。",
        ),
        "short": (
            "Kevin Shields–led shoegaze; Only Shallow opens the Loveless method.",
            "Kevin Shields 领衔的 shoegaze；Only Shallow 打开 Loveless 方法。",
        ),
        "body": (
            "Formed 1983. Isn’t Anything (1988) and Loveless (1991) on Creation Records define the sound: tremolo-arm pitch glide, sampled guitar layers, Bilinda Butcher/Shields vocal blend low in the mix.\n\nOnly Shallow (1991) is the entry cut—drums upfront, guitars as harmonic fog. Studio time and Shields’s process are part of the historical object; the musical claim is texture as composition.",
            "1983 年组建。Creation 厂牌上的 Isn’t Anything（1988）与 Loveless（1991）定义声音：颤音臂音高滑动、采样吉他层、Bilinda Butcher/Shields 人声埋在混音低处。\n\nOnly Shallow（1991）是入口——鼓靠前，吉他作和声雾。录音室时间与 Shields 工艺是历史对象的一部分；音乐主张是把纹理当作曲。",
        ),
    },
    "nine-inch-nails": {
        "why": (
            "Trent Reznor’s industrial-rock project; The Downward Spiral (1994) brought sequenced aggression and studio-as-instrument to US rock mass media.",
            "Trent Reznor 的工业摇滚项目；The Downward Spiral（1994）把音序攻击与「录音室即乐器」送进美国摇滚大众媒介。",
        ),
        "short": (
            "Industrial rock as one-man studio band; Closer is the 1994 crossover single.",
            "一人录音室编制的工业摇滚；Closer 是 1994 跨界单曲。",
        ),
        "body": (
            "Started Cleveland 1988. Pretty Hate Machine and Broken EPs built the live/industrial hybrid; The Downward Spiral and The Fragile are the dense studio peaks—sampling, distorted vocals, programmed drums beside live kits.\n\nCloser (1994) is the MTV/radio spike. NIN matters in a guitar-band chronicle as the 1990s proof that rock dynamics can be built from machines without exiting rock radio.",
            "1988 年于克利夫兰起步。Pretty Hate Machine 与 Broken EP 建立现场/工业混合；The Downward Spiral 与 The Fragile 是密集录音室高峰——采样、失真人声、程序鼓与真人鼓组并存。\n\nCloser（1994）是 MTV/电台尖峰。在吉他乐队编年里，NIN 证明 1990 年代摇滚动态可用机器搭建且不退出摇滚电台。",
        ),
    },
    "pantera": {
        "why": (
            "Texas band that replaced glam residue with down-tuned groove metal; Vulgar Display of Power (1992) and Far Beyond Driven set mid-90s US metal radio weight.",
            "德州乐队：用降调 groove metal 替换 glam 残余；Vulgar Display of Power（1992）与 Far Beyond Driven 定下 90 年代中期美国金属电台重量。",
        ),
        "short": (
            "Dimebag / Anselmo groove metal; Walk is the mid-tempo riff lesson.",
            "Dimebag / Anselmo 的 groove metal；Walk 是中速 riff 教材。",
        ),
        "body": (
            "Formed 1981 (early glam albums exist). Cowboys from Hell (1990) onward is the relevant era—Dimebag Darrell’s pinched harmonics, Rex Brown’s bass, Vinnie Paul’s clicky kick, Phil Anselmo’s bark.\n\nWalk (1992) teaches groove over speed. They shift US metal away from thrash racing toward stalled, palm-muted riffs that nu-metal and metalcore later inherit.",
            "1981 年组建（早期有 glam 专辑）。自 Cowboys from Hell（1990）起为相关时期——Dimebag Darrell 的捏音泛音、Rex Brown 贝斯、Vinnie Paul 咔嗒底鼓、Phil Anselmo 吠叫。\n\nWalk（1992）教的是 groove 重于速度。他们把美国金属从 thrash 竞速推向停顿式掌闷 riff，后为 nu-metal 与 metalcore 继承。",
        ),
    },
    "pearl-jam": {
        "why": (
            "Seattle grunge band that outlasted the early-90s boom as a touring and Ticketmaster-fight institution; Ten (1991) remains the mass entry.",
            "西雅图 grunge：在 90 年代初热潮后仍以巡演与 Ticketmaster 抗争体制存续；Ten（1991）仍是大众入口。",
        ),
        "short": (
            "Vedder-fronted grunge; Alive and Jeremy define the debut-era radio face.",
            "Vedder 领衔的 grunge；Alive 与 Jeremy 定义出道期电台面孔。",
        ),
        "body": (
            "Formed 1990 from Green River/Mother Love Bone fragments with Eddie Vedder. Ten and Vs. made them stadium-scale alongside Nirvana/Soundgarden; Vitalogy onward tracked a longer career arc.\n\nAlive (1991) is the essential-track marker here. Musically: open chords, McCready leads, Vedder’s baritone. Institutionally: anti-scalping fights and bootleg-heavy touring culture.",
            "1990 年由 Green River/Mother Love Bone 碎片与 Eddie Vedder 组建。Ten 与 Vs. 使其与 Nirvana/Soundgarden 同级体育场体量；Vitalogy 起进入更长职业弧线。\n\nAlive（1991）是此处必听标记。音乐上：开放和弦、McCready 主音、Vedder 男中音。制度上：反黄牛斗争与重现场录音的巡演文化。",
        ),
    },
    "pixies": {
        "why": (
            "Boston four-piece whose Surfer Rosa/Doolittle quiet-loud song forms became the template Nirvana and 1990s alternative openly cited.",
            "波士顿四人组：Surfer Rosa/Doolittle 的强弱歌曲形式成为 Nirvana 与 1990 年代 alternative 公开引用的模板。",
        ),
        "short": (
            "Black Francis / Kim Deal alternative; Where Is My Mind? is the lasting hook.",
            "Black Francis / Kim Deal 的 alternative；Where Is My Mind? 是长寿钩子。",
        ),
        "body": (
            "Formed 1986. Come On Pilgrim, Surfer Rosa (1988, Steve Albini), and Doolittle (1989) fixed soft verse / explosive chorus, surreal lyrics, and Deal’s harmony/bass role.\n\nWhere Is My Mind? (1988) is the entry. Dynamics, not virtuosity, are the export—later taught as “Pixies structure” in alt-rock songwriting.",
            "1986 年组建。Come On Pilgrim、Surfer Rosa（1988，Steve Albini）与 Doolittle（1989）定型：轻主歌/爆副歌、超现实歌词、Deal 的和声与贝斯角色。\n\nWhere Is My Mind?（1988）是入口。输出的是动态而非炫技——后来在 alt-rock 歌曲写作里被称作「Pixies 结构」。",
        ),
    },
}

def main():
    n = 0
    for slug, c in STUBS.items():
        patch_band_basic(slug, why_matters=c["why"], short_bio=c["short"], body=c["body"])
        n += 1
    print(f"patched {n} stub bands (batch A)")

if __name__ == "__main__":
    main()

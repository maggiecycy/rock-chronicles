#!/usr/bin/env python3
"""Rewrite non-narrative full band editorials (+ add missing whyMatters)."""
import json
from apply_util import BANDS, bi, load, save, patch_band_basic

DATA = {
    "ac-dc": {
        "why": (
            "Australian hard-rock band that treated open-chord riffs and fixed lineup craft as a durable product line from the Bon Scott era through Back in Black (1980).",
            "澳大利亚 hard-rock：从 Bon Scott 时期到 Back in Black（1980），把开放和弦 riff 与固定编制工艺做成可持续产品线。",
        ),
        "short": (
            "Young brothers’ hard rock; Highway to Hell and Back in Black are the mass curriculum.",
            "Young 兄弟的 hard rock；Highway to Hell 与 Back in Black 是大众课程。",
        ),
        "body": (
            "Formed Sydney 1973. High Voltage through Highway to Hell fix Malcolm’s rhythm grind, Angus’s pentatonic leads, Bon Scott’s bark. After Scott’s death (1980), Back in Black with Brian Johnson kept the same right-hand discipline at larger scale.\n\nThunderstruck (1990) shows the later Young/Johnson touring machine. Few chords, high gain, no prog detours—the export is consistency as method.",
            "1973 年于悉尼组建。从 High Voltage 到 Highway to Hell 定型 Malcolm 的节奏碾磨、Angus 的五声音阶主音、Bon Scott 的吠叫。Scott 去世（1980）后，Brian Johnson 的 Back in Black 以更大尺度保持同一套右手纪律。\n\nThunderstruck（1990）展示后期 Young/Johnson 巡演机器。少和弦、高增益、无 prog 绕路——输出的是把一致性当作方法。",
        ),
    },
    "cream": {
        "why": (
            "London power trio (Clapton / Bruce / Baker) that pushed blues improvisation to hard-rock volume in 1966–68.",
            "伦敦三件套（Clapton / Bruce / Baker）：1966–68 把蓝调即兴推到 hard-rock 音量。",
        ),
        "short": (
            "Blues-rock power trio; Sunshine of Your Love is the classroom riff.",
            "蓝调摇滚三件套；Sunshine of Your Love 是课堂 riff。",
        ),
        "body": (
            "Formed 1966 after Clapton left the Yardbirds. Fresh Cream, Disraeli Gears, and Wheels of Fire document extended live jams, Bruce’s high vocal/bass, Baker’s jazz-informed drums.\n\nSunshine of Your Love (1967) and the live Crossroads are the citation tracks. Short career; lasting role as the bridge from British blues clubs to stadium-volume trio hard rock.",
            "Clapton 离开 Yardbirds 后于 1966 年组建。Fresh Cream、Disraeli Gears 与 Wheels of Fire 记录长现场即兴、Bruce 的高音人声/贝斯、Baker 偏爵士的鼓。\n\nSunshine of Your Love（1967）与现场 Crossroads 是引用曲。生涯短；作用是英国蓝调俱乐部到体育场音量三件套 hard rock 的桥。",
        ),
    },
    "foo-fighters": {
        "why": (
            "Dave Grohl’s post-Nirvana band; Foo Fighters (1995) onward turned a one-man demo project into a durable alternative/hard-rock touring act.",
            "Dave Grohl 在 Nirvana 之后的乐队；自同名专辑（1995）起把一人 demo 项目做成持久的 alternative/hard-rock 巡演编制。",
        ),
        "short": (
            "Grohl-fronted alt-rock; drummer-to-frontman career after 1994.",
            "Grohl 领衔的 alt-rock；1994 年后鼓手转主唱的职业路径。",
        ),
        "body": (
            "Started 1994 with Grohl playing most instruments on the debut; Nate Mendel, Pat Smear, and later Taylor Hawkins stabilized the live band. The Colour and the Shape fixed loud-quiet radio hooks.\n\nBridge node in this graph: Nirvana drummer → Foo Fighters frontman → Them Crooked Vultures. Musical constants—compressed guitars, stacked choruses, live reliability—matter more than mythology.",
            "1994 起步，首专大半乐器由 Grohl 亲自演奏；Nate Mendel、Pat Smear 与后来的 Taylor Hawkins 稳定现场编制。The Colour and the Shape 定型强弱电台钩子。\n\n本图谱桥接节点：Nirvana 鼓手 → Foo Fighters 主唱 → Them Crooked Vultures。音乐常量——压缩吉他、堆叠副歌、现场稳定——重于神话。",
        ),
    },
    "guns-n-roses": {
        "why": (
            "LA hard-rock band; Appetite for Destruction (1987) reset late-80s metal radio toward street-blues riffs before grunge’s chart takeover.",
            "洛杉矶 hard-rock；Appetite for Destruction（1987）在 grunge 占榜前，把 80 年代末金属电台扳向街头蓝调 riff。",
        ),
        "short": (
            "Classic five-piece hard rock; Sweet Child O’ Mine is the Trojan-horse ballad.",
            "经典五人 hard rock；Sweet Child O’ Mine 是特洛伊木马式谣曲。",
        ),
        "body": (
            "Formed 1985. Appetite paired Axl Rose’s scream, Slash’s Les Paul leads, Izzy’s rhythm, Duff’s punk bass, Adler’s swing—against hair-metal gloss. Use Your Illusion (1991) expanded epics (November Rain) and lineup strain.\n\nWelcome to the Jungle and Sweet Child O’ Mine (1987) are the dual entry. They are the late golden-age hard-rock commercial peak immediately before alternative redraws US rock radio.",
            "1985 年组建。Appetite 把 Axl Rose 的尖叫、Slash 的 Les Paul 主音、Izzy 节奏、Duff 朋克贝斯、Adler 的摇摆，对上 hair-metal 光泽。Use Your Illusion（1991）扩展史诗（November Rain）并加剧阵容紧张。\n\nWelcome to the Jungle 与 Sweet Child O’ Mine（1987）是双入口。他们是 alternative 重画美国摇滚电台之前，硬摇滚商业黄金晚期的峰值。",
        ),
    },
    "new-order": {
        "why": (
            "Post–Joy Division Manchester band; same core players plus synth/bass-dance grammar from Movement (1981) through Technique.",
            "Joy Division 之后的曼彻斯特乐队；自 Movement（1981）到 Technique，同一核心成员加上合成器/舞曲贝斯语法。",
        ),
        "short": (
            "Sumner / Hook / Morris + Gillian Gilbert; post-punk into club electronics.",
            "Sumner / Hook / Morris + Gillian Gilbert；后朋克进入俱乐部电子。",
        ),
        "body": (
            "Formed 1980 after Ian Curtis’s death. Early Factory Records singles (Blue Monday) and Power, Corruption & Lies fused sequenced bass, Hook’s high melodic basslines, and Sumner’s dry vocal.\n\nBridge page for Joy Division → dancefloor continuity. Catalog shows how post-punk personnel adopted drum machines without abandoning song form.",
            "Ian Curtis 去世后于 1980 年组建。早期 Factory 单曲（Blue Monday）与 Power, Corruption & Lies 融合音序低音、Hook 的高音旋律贝斯与 Sumner 的干人声。\n\nJoy Division → 舞池连续性的桥页。目录展示后朋克人事如何采用鼓机而不放弃歌曲形式。",
        ),
    },
    "queen": {
        "why": (
            "London four-piece that combined multi-section songwriting, stacked vocals, and hard-rock guitar on 1970s FM radio; A Night at the Opera (1975) is the proof album.",
            "伦敦四人组：在 1970 年代 FM 电台上结合多段体写作、堆叠人声与 hard-rock 吉他；A Night at the Opera（1975）是证明专辑。",
        ),
        "short": (
            "Mercury / May / Taylor / Deacon; Bohemian Rhapsody is the multi-section hit.",
            "Mercury / May / Taylor / Deacon；Bohemian Rhapsody 是多段体热单。",
        ),
        "body": (
            "Formed 1970. Mid-70s albums through News of the World fuse Brian May’s layered guitars, Freddie Mercury’s range, and studio vocal choirs. Later hits (We Will Rock You, Don’t Stop Me Now) simplify for stadium chant.\n\nBohemian Rhapsody (1975) is the structural citation—ballad, opera pastiche, hard outro without a single verse-chorus loop. Craft and theatricality share the same sessions.",
            "1970 年组建。70 年代中期至 News of the World 的专辑融合 Brian May 多层吉他、Freddie Mercury 音域与录音室人声合唱。后期热单（We Will Rock You、Don’t Stop Me Now）为体育场口号简化。\n\nBohemian Rhapsody（1975）是结构引用——谣曲、歌剧拼贴、硬摇滚尾奏，而非单一主副歌循环。工艺与剧场性在同一录音会话里。",
        ),
    },
    "queens-of-the-stone-age": {
        "why": (
            "Josh Homme’s desert-rock project after Kyuss; Queens of the Stone Age (1998) onward built hypnotic, dry riffs that feed later Homme collaborations.",
            "Josh Homme 在 Kyuss 之后的沙漠摇滚项目；自同名专辑（1998）起建立催眠、干的 riff，并喂养后期 Homme 合作。",
        ),
        "short": (
            "Homme-led hard rock/alt; riff machine behind Them Crooked Vultures link.",
            "Homme 领衔的 hard rock/alt；通向 Them Crooked Vultures 的 riff 机器。",
        ),
        "body": (
            "Formed 1996 in California. Early records and Songs for the Deaf (2002, with Dave Grohl on drums) fix Homme’s tuned-down, repetitive riff writing, Nick Oliveri’s bass era, and Mark Lanegan guest vocals.\n\nBridge node: QOTSA method → Them Crooked Vultures with Grohl and John Paul Jones. Emphasis is groove lock and dry desert production, not shred display.",
            "1996 年于加州组建。早期唱片与 Songs for the Deaf（2002，Dave Grohl 鼓）定型 Homme 降调反复 riff、Nick Oliveri 贝斯时期与 Mark Lanegan 客串人声。\n\n桥接节点：QOTSA 方法 → 与 Grohl、John Paul Jones 的 Them Crooked Vultures。重点是 groove 锁定与干燥沙漠制作，而非速弹展示。",
        ),
    },
    "rainbow": {
        "why": (
            "Ritchie Blackmore’s post–Deep Purple band; Rising (1976) and the Dio years set fantasy-lyric hard rock with classical guitar figures.",
            "Ritchie Blackmore 离开 Deep Purple 后的乐队；Rising（1976）与 Dio 时期定下奇幻歌词 hard rock 与古典吉他音型。",
        ),
        "short": (
            "Blackmore / Dio hard rock; bridge from Purple to Sabbath’s Dio era.",
            "Blackmore / Dio 的 hard rock；从 Purple 到 Sabbath Dio 时期的桥。",
        ),
        "body": (
            "Formed 1975. Ritchie Blackmore’s Rainbow through Long Live Rock ’n’ Roll pair Blackmore’s neoclassical leads with Ronnie James Dio’s operatic mid-range and Cozy Powell’s drums on key records.\n\nPerson-graph bridge: Dio arrives battle-tested before Black Sabbath’s Heaven and Hell. Later Graham Bonnet/Joe Lynn Turner lineups are separate commercial chapters.",
            "1975 年组建。从 Ritchie Blackmore’s Rainbow 到 Long Live Rock ’n’ Roll：Blackmore 新古典主音对 Ronnie James Dio 歌剧式中音区，关键唱片含 Cozy Powell 鼓。\n\n人物图谱桥：Dio 在加入 Black Sabbath 的 Heaven and Hell 前已在此练兵。后期 Graham Bonnet/Joe Lynn Turner 阵容是另一商业章节。",
        ),
    },
    "sex-pistols": {
        "why": (
            "London punk band whose 1976–77 singles and Never Mind the Bollocks reset UK rock’s tempo, manners, and tabloid scale in under two years.",
            "伦敦朋克：1976–77 单曲与 Never Mind the Bollocks 在不到两年内重置英国摇滚的速度、礼仪与小报尺度。",
        ),
        "short": (
            "Rotten / Jones / Cook / Matlock–Vicious; Anarchy in the U.K. is the rupture single.",
            "Rotten / Jones / Cook / Matlock–Vicious；Anarchy in the U.K. 是断裂单曲。",
        ),
        "body": (
            "Formed 1975. EMI/Virgin singles—Anarchy in the U.K., God Save the Queen, Pretty Vacant—and the 1977 album document Steve Jones’s brickwall guitar, Paul Cook’s straight drums, Lydon’s sneer, Matlock’s early writing then Vicious’s bass tenure.\n\nShort discography; long citation list for UK punk and later hardcore. Beside The Clash they are the brief detonator versus a longer political songbook.",
            "1975 年组建。EMI/Virgin 单曲——Anarchy in the U.K.、God Save the Queen、Pretty Vacant——与 1977 专辑记录 Steve Jones 砖墙吉他、Paul Cook 直线鼓、Lydon 冷笑、Matlock 早期写作与 Vicious 贝斯任期。\n\n作品目录短；对英国朋克与后来 hardcore 的引用列表长。与 The Clash 并列：短暂引爆器对更长的政治歌本。",
        ),
    },
    "the-police": {
        "why": (
            "London trio that fused reggae upstrokes, new-wave tightness, and pop melody into early-1980s global rock radio.",
            "伦敦三人组：把雷鬼上击、new wave 紧凑与流行旋律融进 1980 年代初全球摇滚电台。",
        ),
        "short": (
            "Sting / Summers / Copeland; Every Breath You Take is the mass ballad.",
            "Sting / Summers / Copeland；Every Breath You Take 是大众谣曲。",
        ),
        "body": (
            "Formed 1977. Outlandos d’Amour through Synchronicity track rising scale: Copeland’s hi-hat reggae grammar, Summers’s chorus/delay angles, Sting’s high melodic bass and vocal.\n\nRoxanne (1978) and Every Breath You Take (1983) bookend club tension and global pop. They show post-punk energy can chart without punk orthodoxy or soft-rock surrender.",
            "1977 年组建。从 Outlandos d’Amour 到 Synchronicity 追踪体量上升：Copeland 的踩镲雷鬼语法、Summers 的 chorus/延时棱角、Sting 的高音旋律贝斯与人声。\n\nRoxanne（1978）与 Every Breath You Take（1983）标记俱乐部张力与全球流行两端。证明后朋克能量可以上榜，无需朋克正统，也不向软摇滚投降。",
        ),
    },
    "the-yardbirds": {
        "why": (
            "British R&B band that successively featured Clapton, Beck, and Page—personnel lab for Cream and Led Zeppelin.",
            "英国 R&B 乐队：相继拥有 Clapton、Beck、Page——通向 Cream 与 Led Zeppelin 的人事实验室。",
        ),
        "short": (
            "1960s blues-rock lab; guitar-hero pipeline out of London clubs.",
            "1960 年代蓝调摇滚实验室；伦敦俱乐部输出的吉他英雄管道。",
        ),
        "body": (
            "Formed 1963. Early hits (For Your Love) and the Beck/Page eras document feedback, rave-ups, and studio experimentation beyond strict blues covers.\n\nBridge page in the person graph: Clapton exits to Cream; Page carries unfinished business into Led Zeppelin. Catalog is secondary to the personnel flow it enabled.",
            "1963 年组建。早期热单（For Your Love）与 Beck/Page 时期记录反馈、rave-up 与超出严格蓝调翻唱的录音室实验。\n\n人物图谱桥页：Clapton 离开组建 Cream；Page 把未完成事务带进 Led Zeppelin。目录次要于它所促成的人事流动。",
        ),
    },
    "them-crooked-vultures": {
        "why": (
            "2009–10 hard-rock trio: Josh Homme, Dave Grohl, John Paul Jones—cross-decade personnel experiment with one self-titled album.",
            "2009–10 hard-rock 三人组：Josh Homme、Dave Grohl、John Paul Jones——跨年代人事实验，一张同名专辑。",
        ),
        "short": (
            "Homme / Grohl / Jones supergroup; one-album hard-rock summit.",
            "Homme / Grohl / Jones 超级组合；一张专辑的 hard-rock 峰会。",
        ),
        "body": (
            "Active mainly 2009–2010. Debut album stacks Homme’s desert riffs, Grohl’s drums (and some vocal), Jones’s bass/keys—Zeppelin lineage meeting QOTSA/Foo methods.\n\nBridge exhibit for the chronicle: proof mid/late-career players still form short-run hard-rock units. Not a long catalog; the lineup itself is the object.",
            "主要活动于 2009–2010。首专堆叠 Homme 沙漠 riff、Grohl 鼓（及部分人声）、Jones 贝斯/键盘——Zeppelin 谱系遇见 QOTSA/Foo 方法。\n\n编年桥接展品：证明中后期职业乐手仍可组成短周期 hard-rock 单位。目录不长；阵容本身即对象。",
        ),
    },
    "wings": {
        "why": (
            "Paul McCartney’s 1971–81 post-Beatles band; Band on the Run (1973) proved stadium/pop craft continued under a new logo.",
            "Paul McCartney 1971–81 在 Beatles 之后的乐队；Band on the Run（1973）证明体育场/流行工艺在新 logo 下延续。",
        ),
        "short": (
            "McCartney-led 1970s rock/pop; person continuity after Beatles.",
            "McCartney 领衔的 1970 年代摇滚/流行；Beatles 之后的人物连续性。",
        ),
        "body": (
            "Formed 1971 with Linda McCartney and Denny Laine (lineups shifted). Wild Life through Back to the Egg mix music-hall pop, hard rockers, and touring logistics McCartney rebuilt from scratch.\n\nBridge page: Beatles → Wings in the person graph. Band on the Run is the usual citation; the structural point is songwriter continuity across brand change.",
            "1971 年与 Linda McCartney、Denny Laine 组建（阵容有变）。从 Wild Life 到 Back to the Egg 混合音乐厅流行、硬摇滚曲与 McCartney 从头重建的巡演后勤。\n\n桥页：人物图谱中的 Beatles → Wings。Band on the Run 是常见引用；结构要点是品牌更换后的词曲作者连续性。",
        ),
    },
}


def main():
    n = 0
    for slug, c in DATA.items():
        path = BANDS / f"{slug}.json"
        data = load(path)
        data["whyMatters"] = bi(*c["why"])
        data["shortBio"] = bi(*c["short"])
        data["body"] = bi(*c["body"])
        save(path, data)
        n += 1
    print(f"patched {n} non-narrative full bands")

if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""Narrative bands batch 1: nirvana, led-zeppelin, beatles, radiohead, black-sabbath, oasis, metallica, pink-floyd, king-crimson, the-rolling-stones."""
from apply_util import (
    patch_band_basic,
    patch_band_notes,
    patch_narrative,
)

def ch(title, body):
    return {"title": title, "body": body}

# --- NIRVANA ---
patch_band_basic(
    "nirvana",
    why_matters=(
        "Aberdeen/Seattle trio whose Nevermind (1991) made quiet-loud dynamics and anti-idol posture the early-90s alternative default on MTV and rock radio.",
        "阿伯丁/西雅图三人组：Nevermind（1991）让强弱动态与反偶像姿态成为 90 年代初 MTV 与摇滚电台的 alternative 默认。",
    ),
    short_bio=(
        "Cobain / Novoselic / Grohl grunge; Smells Like Teen Spirit is the 1991 switch.",
        "Cobain / Novoselic / Grohl 的 grunge；Smells Like Teen Spirit 是 1991 年开关。",
    ),
    body=(
        "Formed 1987; Bleach (1989) precedes the peak trio with Dave Grohl (1990). Nevermind (Butch Vig) and In Utero (Albini) bookend mainstream takeover and pushback.\n\nQuiet verse / loud chorus, Cobain’s melodic under noise, Novoselic’s elastic bass, Grohl’s hard kick. Influence is measurable in 1990s radio formats and in bands that copied the dynamics more than the reluctance.",
        "1987 年组建；Bleach（1989）早于 Dave Grohl（1990）加入的巅峰三人组。Nevermind（Butch Vig）与 In Utero（Albini）标记主流占领与反推。\n\n轻主歌/响副歌、噪声下的 Cobain 旋律、Novoselic 弹性贝斯、Grohl 硬底鼓。影响可在 1990 年代电台格式与大量只抄动态、难抄「不情愿」的乐队中度量。",
    ),
)
patch_narrative("nirvana", {
    "thesis": ch(
        ("Quiet-loud goes global in 1991", "1991：强弱动态全球化"),
        ("After Teen Spirit, US rock radio briefly shares playlist space with underground ethics. Nirvana matter because they pair punk roughness with hard-rock weight, then refuse the usual hero script in interviews and videos.\n\nThe chronicle gains a template: mass fame that documents its own discomfort.",
         "Teen Spirit 之后，美国摇滚电台短暂与地下伦理共用播放列表。Nirvana 要紧，因为他们把朋克粗糙与 hard-rock 重量配对，又在访谈与录像里拒绝常规英雄剧本。\n\n编年史多了一种模板：记录自身不适的大众成名。"),
    ),
    "lineup-versions": ch(
        ("Pre-Grohl Bleach vs classic trio", "Bleach 前期 vs 经典三人组"),
        ("Chad Channing–era Bleach is the Sub Pop document. Cobain, Novoselic, and Grohl lock the fingerprint the world cites—short run, high citation density.\n\nEarlier drummers matter to collectors; MTV-scale memory starts with Grohl’s kit.",
         "Chad Channing 时期的 Bleach 是 Sub Pop 文献。Cobain、Novoselic 与 Grohl 锁死世界引用的声纹——周期短、引用密度高。\n\n早期鼓手留给收藏家；MTV 尺度的记忆从 Grohl 的鼓组开始。"),
    ),
    "spirit": ch(
        ("Teen Spirit: dynamics as radio grammar", "Teen Spirit：动态成为电台语法"),
        ("Quiet-loud is not new (Pixies are cited). MTV and rock radio amplify it until a Seattle trio becomes default 1990s programming.\n\nCheerleader satire in the video is part of the media event; the musical switch is the drop into distortion.",
         "强弱动态并不新鲜（常引 Pixies）。MTV 与摇滚电台把它放大，直到西雅图三人组成为 1990 年代默认编排。\n\n录像里的啦啦队讽刺是媒介事件的一部分；音乐开关是切入失真的那一下。"),
    ),
    "lineup": ch(
        ("Melody under sludge, kick as punctuation", "淤泥下的旋律，底鼓作标点"),
        ("Cobain’s tunes sit under fuzz; Novoselic’s bass is melodic and wide; Grohl’s kick arrives like a hard cut. Later bands often copy the dynamic shape alone.\n\nWhat travels less easily is the public refusal of rock-star cosplay.",
         "Cobain 的旋律坐在 fuzz 下；Novoselic 贝斯宽而旋律化；Grohl 底鼓像硬剪辑。后来乐队常只抄动态外形。\n\n较难复制的是公开拒绝摇滚明星扮相。"),
    ),
    "quote": ch(
        ("Interview negation beside stage volume", "舞台音量旁的访谈否定"),
        ("Short circulated lines keep the oral tension: fame argued with in public. The wall quotes are evidence of posture, not tragedy merch.\n\nRead them against the records: the contradiction is part of the historical object.",
         "流传短句保留口述张力：当众与成名争辩。墙上引语是姿态证据，不是悲剧周边。\n\n对照唱片阅读：矛盾是历史对象的一部分。"),
    ),
    "legacy": ch(
        ("Post-1991 forks: Britpop, DIY, mutation", "1991 年后分叉：Britpop、DIY、变异"),
        ("Britpop answers with brighter chords. Indie keeps DIY scale. Radiohead chooses studio mutation over flannel costume.\n\nNirvana remain the early-90s hinge: later acts salute or flee the template.",
         "Britpop 用更亮和弦回答。Indie 守住 DIY 尺度。Radiohead 选择录音室变异而非法兰绒戏服。\n\nNirvana 仍是 90 年代初铰链：后来者致敬或逃离该模板。"),
    ),
})
patch_band_notes(
    "nirvana",
    scene_notes=[
        ("Quiet-loud as 1991 youth-radio takeover.", "强弱动态成为 1991 青年电台占领语法。"),
        ("Delay-tinged hook; alternative enters mass rock radio.", "偏延时钩子；alternative 进入大众摇滚电台。"),
        ("In Utero-era closer: fragile vocal over restrained band.", "In Utero 时期收束：克制乐队上的脆弱人声。"),
    ],
    landmark_note=("Underground ethics meet MTV scale within one release cycle.", "地下伦理在同一发行周期内撞上 MTV 尺度。"),
    landmark_debut_note=("Quiet-loud structure as global rock-radio default.", "强弱结构成为全球摇滚电台默认。"),
    lineup_notes={
        "pre-grohl": ("Bleach-era lineup before the Grohl trio.", "Grohl 三人组之前的 Bleach 时期阵容。"),
        "classic-trio": ("Peak trio the catalog cites; Grohl’s exit path starts here.", "目录引用的巅峰三人组；Grohl 的离开路径自此开始。"),
    },
)

# --- LED ZEPPELIN ---
patch_band_basic(
    "led-zeppelin",
    why_matters=(
        "London four-piece that scaled blues and folk forms to arena hard rock; Led Zeppelin II–IV and Physical Graffiti remain the citation set for riff weight and dynamic range.",
        "伦敦四人组：把蓝调与民谣形式扩到体育场 hard rock；Led Zeppelin II–IV 与 Physical Graffiti 仍是 riff 重量与动态幅度的引用集。",
    ),
    short_bio=(
        "Page / Plant / Jones / Bonham hard rock; Whole Lotta Love and Stairway are the twin poles.",
        "Page / Plant / Jones / Bonham 的 hard rock；Whole Lotta Love 与 Stairway 是两极。",
    ),
    body=(
        "Formed 1968 from Yardbirds residue. Early albums document Page’s production, Bonham’s drums, Jones’s arrangements, Plant’s high register—studio and stage as one system.\n\nWhole Lotta Love (1969), Stairway to Heaven (1971), Kashmir (1975) show theremin breakdown, acoustic-to-electric arc, and ostinato epic. Stable classic-IV lineup is itself a historical fact in a scene of churn.",
        "1968 年由 Yardbirds 残余组建。早期专辑记录 Page 制作、Bonham 鼓、Jones 编曲、Plant 高音区——录音室与舞台同一系统。\n\nWhole Lotta Love（1969）、Stairway to Heaven（1971）、Kashmir（1975）展示 theremin 崩解段、原声到电声弧线与固定音型史诗。经典四人稳定阵容本身即人事动荡场景中的历史事实。",
    ),
)
patch_narrative("led-zeppelin", {
    "thesis": ch(
        ("Four players, one production system", "四人，一套制作系统"),
        ("Zeppelin matter as a closed instrumental economy: Page’s guitar/production, Plant’s vocal, Jones’s bass/keys/arranging, Bonham’s drums. Blues and folk sources are scaled, not merely covered.\n\nArena hard rock’s default grammar—riff + dynamic swing—gets a durable catalog here.",
         "Zeppelin 要紧处是封闭的乐器经济：Page 吉他/制作、Plant 人声、Jones 贝斯/键盘/编曲、Bonham 鼓。蓝调与民谣来源被扩写，而非仅翻唱。\n\n体育场 hard rock 的默认语法——riff + 动态摆动——在此留下耐久目录。"),
    ),
    "lineup-versions": ch(
        ("Classic IV with almost no churn", "几乎无更替的经典四人"),
        ("Unlike many peers, the peak version is one cast. Session origins (Page, Jones) explain arrangement density; Bonham’s death ends the original run.\n\nLineup stability is part of why the silhouette stays sharp.",
         "与许多同辈不同，巅峰版本几乎是一套人马。录音室出身（Page、Jones）解释编曲密度；Bonham 去世结束原班运行。\n\n阵容稳定是剪影清晰的原因之一。"),
    ),
    "lineup": ch(
        ("Roles: guitar/production, vocal, arrange, drums", "分工：吉他/制作、人声、编曲、鼓"),
        ("Page builds parts and mixes; Plant carries melody and lyric myth frames; Jones supplies bass, keys, and charts; Bonham supplies the groove weight later metal cites.\n\nFour roles, few substitutes—configuration as method.",
         "Page 写分声部并混音；Plant 扛旋律与歌词神话框架；Jones 提供贝斯、键盘与谱面；Bonham 提供后来金属常引的 groove 重量。\n\n四个角色、极少替补——编制即方法。"),
    ),
    "wll": ch(
        ("Whole Lotta Love: riff then breakdown", "Whole Lotta Love：先 riff 后崩解"),
        ("Open riff, Plant’s vocal, then theremin/feedback middle before the return. Hard rock learns mid-song studio drama without prog suite length.\n\nBody-first listening: the drop is structural, not ornamental.",
         "开放 riff、Plant 人声，然后 theremin/反馈中段再返回。Hard rock 学到曲中录音室戏剧，却不走 prog 组曲时长。\n\n身体优先的听法：落下是结构，不是装饰。"),
    ),
    "stairway": ch(
        ("Stairway: acoustic climb to hard ending", "Stairway：原声爬升到硬收束"),
        ("Fingerpicked opening, layered guitars, then Bonham’s entry and solo section. FM radio turns a long form into a request-line standard.\n\nDynamic narrative—folk start, heavy finish—becomes a teaching template.",
         "指弹开场、多层吉他，然后 Bonham 进入与独奏段。FM 电台把长曲变成点播标准。\n\n动态叙事——民谣起、重型收——成为教学模板。"),
    ),
    "quote": ch(
        ("Four sounds, locked takes", "四种声音，锁定的录音"),
        ("Interview and lore lines stress chemistry over costume. The useful claim is musical: arrangement and performance lock, not mystique for its own sake.\n\nRead quotes as production notes in oral form.",
         "访谈与传说强调化学作用而非戏服。有用的主张是音乐上的：编曲与演奏锁定，而非为神秘而神秘。\n\n把引语当口述形式的制作笔记。"),
    ),
    "legacy": ch(
        ("Answers: metal, punk refusal, grunge weight", "回应：金属、朋克拒绝、grunge 重量"),
        ("NWOBHM and metal inherit riff weight; punk often refuses the excess; grunge keeps the sludge and drops the fantasy lyric.\n\nZeppelin remain a reference to salute, sample, or overthrow.",
         "NWOBHM 与金属继承 riff 重量；朋克常拒绝其过量；grunge 留下淤泥并丢掉奇幻歌词。\n\nZeppelin 仍是致敬、采样或推翻的参照。"),
    ),
})
patch_band_notes(
    "led-zeppelin",
    scene_notes=[
        ("Theremin breakdown inside hard-rock single form.", "Hard-rock 单曲形式内的 theremin 崩解段。"),
        ("Acoustic-to-electric arc as FM-request template.", "原声到电声弧线成为 FM 点播模板。"),
        ("Ostinato epic with non-blues modal color (Kashmir).", "固定音型史诗与非蓝调调式色彩（Kashmir）。"),
    ],
    landmark_note=("Blues/folk forms scaled to arena; metal and grunge still answer the catalog.", "蓝调/民谣形式扩到体育场；金属与 grunge 仍回应此目录。"),
    landmark_debut_note=("Early riff weight as hard-rock teaching track.", "早期 riff 重量作为 hard-rock 教学曲。"),
    lineup_notes={
        "classic-iv": ("Stable peak version—minimal churn, maximal catalog citation.", "稳定巅峰版本——更替极少，目录引用最多。"),
    },
)

print("batch1 part A done")

#!/usr/bin/env python3
"""Rewrite all people editorial fields (en+zh) + tenure notes."""
from apply_util import patch_person, patch_person_tenure_notes, PEOPLE, load, save, bi

PEOPLE_DATA = {
    "kurt-cobain": {
        "short": (
            "Nirvana singer-guitarist; quiet-loud songwriting center of the 1990–94 trio.",
            "Nirvana 主唱兼吉他手；1990–94 三人组强弱歌曲写作的中心。",
        ),
        "why": (
            "Person-node for the Grohl-era Nirvana version—not a multi-band hopper, but the fixed writer/voice of that lineup.",
            "Grohl 时期 Nirvana 版本的人物节点——不是多队跳槽者，而是该阵容的固定写作者/声线。",
        ),
        "body": (
            "Born 1967, Aberdeen, WA. Primary songwriter and vocalist on Bleach, Nevermind, In Utero. Melodic sense under fuzz, dynamic soft/loud forms, and public refusal of rock-hero cosplay define the page.\n\nPair with Dave Grohl to read Nirvana as people + version, not only a brand name. Died 1994; catalog and media archive remain the sources.",
            "1967 年生于华盛顿州阿伯丁。Bleach、Nevermind、In Utero 的主要词曲与主唱。fuzz 下的旋律感、强弱曲式，以及公开拒绝摇滚英雄扮相，定义本页。\n\n与 Dave Grohl 对照，把 Nirvana 读成「人 + 版本」，而不只是品牌名。1994 年去世；目录与媒体档案仍是来源。",
        ),
    },
    "dave-grohl": {
        "short": (
            "Nirvana drummer (1990–94) who became Foo Fighters frontman and later drummed in Them Crooked Vultures.",
            "Nirvana 鼓手（1990–94），后任 Foo Fighters 主唱，并在 Them Crooked Vultures 司鼓。",
        ),
        "why": (
            "Connects Nirvana → Foo Fighters → Them Crooked Vultures: role change (drums to frontman) as career structure.",
            "连接 Nirvana → Foo Fighters → Them Crooked Vultures：角色转换（鼓手到主唱）即职业结构。",
        ),
        "body": (
            "Born 1969. Locks Nirvana’s peak trio with Cobain/Novoselic; after 1994 builds Foo Fighters from solo demos into a touring alternative/hard-rock band; 2009–10 joins Homme and John Paul Jones in Them Crooked Vultures.\n\nHub value is personnel flow across logos. Musical constants: hard kick as drummer, stacked choruses as singer.",
            "1969 年生。与 Cobain/Novoselic 锁定 Nirvana 巅峰三人组；1994 年后从独唱 demo 建成 Foo Fighters 巡演 alternative/hard-rock 乐队；2009–10 与 Homme、John Paul Jones 组成 Them Crooked Vultures。\n\n枢纽价值是跨 logo 的人事流动。音乐常量：司鼓时的硬底鼓，主唱时的堆叠副歌。",
        ),
        "tenure_notes": {
            "nirvana": ("Peak trio drums, 1990–94.", "巅峰三人组鼓手，1990–94。"),
            "them-crooked-vultures": ("Supergroup drums/vocals, short run.", "超级组合鼓/人声，短周期。"),
        },
    },
    "jimmy-page": {
        "short": (
            "Session guitarist who led the Yardbirds’ late era then founded Led Zeppelin as guitarist-producer.",
            "录音室吉他手：主导 Yardbirds 后期，再以吉他手-制作人身份创立 Led Zeppelin。",
        ),
        "why": (
            "Yardbirds unfinished business → Led Zeppelin production system: personnel bridge into hard-rock’s classic IV.",
            "Yardbirds 未竟事务 → Led Zeppelin 制作系统：通向 hard-rock 经典四人的人事桥。",
        ),
        "body": (
            "Born 1944. Studio years precede Yardbirds (post-Beck); forms Led Zeppelin 1968 with Plant, Jones, Bonham—writes riffs, produces albums, layers guitars.\n\nHub page for how rock personnel flow: session player → group → new band that redefines arena hard rock. Technique and production credits matter as much as stage myth.",
            "1944 年生。录音室年代早于 Yardbirds（接 Beck 之后）；1968 与 Plant、Jones、Bonham 组建 Led Zeppelin——写 riff、制作专辑、多层吉他。\n\n枢纽页展示摇滚人事如何流动：录音室乐手 → 组合 → 重定义体育场 hard rock 的新乐队。技术与制作 credits 与舞台神话同等重要。",
        ),
        "tenure_notes": {
            "the-yardbirds": ("Post-Beck Yardbirds; lab before Zeppelin.", "Beck 之后的 Yardbirds；Zeppelin 前的实验室。"),
        },
    },
    "robert-plant": {
        "short": (
            "Led Zeppelin vocalist; high-register hard-rock voice who continued solo and collaborative work after 1980.",
            "Led Zeppelin 主唱；高音区 hard-rock 声线，1980 年后继续独唱与合作。",
        ),
        "why": (
            "Frontman as evolving person: arena vocal of the classic IV, then reinvention beyond the band logo.",
            "作为持续演化的主唱人物：经典四人的体育场人声，然后在乐队 logo 之外再发明。",
        ),
        "body": (
            "Born 1948. Zeppelin years define the mythic high vocal over blues/folk/epic forms. After Bonham’s death, solo albums and later collaborations (e.g. with Alison Krauss) refuse to freeze 1971.\n\nUse this page to exit the band bubble into post-Zeppelin listening—same person, different frames.",
            "1948 年生。Zeppelin 年代定义蓝调/民谣/史诗形式上的神话高音。Bonham 去世后，独唱专辑与后期合作（如与 Alison Krauss）拒绝冻结在 1971。\n\n用本页离开乐队气泡进入后 Zeppelin 聆听——同一人，不同框架。",
        ),
        "tenure_notes": {
            # solo tenure may use different slug
        },
    },
    "john-paul-jones": {
        "short": (
            "Led Zeppelin bassist/keyboardist/arranger; later resurfaced with Grohl and Homme in Them Crooked Vultures.",
            "Led Zeppelin 贝斯手/键盘手/编曲；后与 Grohl、Homme 出现在 Them Crooked Vultures。",
        ),
        "why": (
            "Zeppelin’s arrangement spine—then a 2009 hard-rock cross-link via Them Crooked Vultures.",
            "Zeppelin 的编曲脊梁——再经 Them Crooked Vultures 做 2009 hard-rock 交叉链接。",
        ),
        "body": (
            "Born 1946. Session arranging background feeds Zeppelin’s folk-to-heavy dynamics, bass lines, and keyboard textures. Rarely chased frontman myth; structural credit is the hub value.\n\nThem Crooked Vultures shows late-career mobility among hard-rock peers.",
            "1946 年生。录音室编曲背景喂养 Zeppelin 从民谣到重型的动态、贝斯线与键盘纹理。很少追逐主唱神话；结构 credits 即枢纽价值。\n\nThem Crooked Vultures 展示 hard-rock 同辈间的后期职业流动。",
        ),
    },
    "eric-clapton": {
        "short": (
            "Yardbirds then Cream guitarist; early career defines the British blues-to-hard-rock solo pipeline.",
            "Yardbirds 而后 Cream 吉他手；早期生涯定义英国蓝调到 hard-rock 独奏管道。",
        ),
        "why": (
            "Yardbirds → Cream: guitar-hero exit path that feeds hard-rock mythology and technique culture.",
            "Yardbirds → Cream：喂养 hard-rock 神话与技术文化的吉他英雄离开路径。",
        ),
        "body": (
            "Born 1945. Yardbirds blues years, then Cream’s power-trio volume with Bruce/Baker (1966–68). Later solo/Blind Faith chapters sprawl; this chronicle emphasizes the early exits that invent louder blues argument.\n\nHub for shared-member graphs into Zeppelin’s generation.",
            "1945 年生。Yardbirds 蓝调年代，再与 Bruce/Baker 组成 Cream 三件套音量（1966–68）。后期独唱/Blind Faith 章节绵长；本编年强调发明更响蓝调论证的早期离开。\n\n通向 Zeppelin 一代共享成员图的枢纽。",
        ),
    },
    "paul-mccartney": {
        "short": (
            "Beatles bassist/songwriter who continued with Wings (1971–81) after the Beatles ended.",
            "Beatles 贝斯手/词曲作者；Beatles 结束后以 Wings（1971–81）延续。",
        ),
        "why": (
            "Beatles → Wings: clearest logo-change case where listeners still follow one writer’s ear.",
            "Beatles → Wings：听众仍跟随同一写作者耳朵的最清晰 logo 更换案例。",
        ),
        "body": (
            "Born 1942. Inside The Beatles: melody engine, bass melodic lines, co-writing with Lennon. Wings rebuilds a touring/pop-rock vehicle under a new name—Band on the Run as the usual citation.\n\nTeach beginners that bands end and songwriting continues; person > brand in the graph.",
            "1942 年生。在 Beatles 内：旋律引擎、旋律化贝斯、与 Lennon 合写。Wings 在新名称下重建巡演/流行摇滚载具——Band on the Run 为常见引用。\n\n教初学者：乐队会结束，写作继续；图谱里人物 > 品牌。",
        ),
    },
    "ozzy-osbourne": {
        "short": (
            "Black Sabbath’s original vocalist; solo career after 1979 firing, with later Sabbath reunions.",
            "Black Sabbath 原主唱；1979 被撤后展开独唱生涯，并有后期 Sabbath 重聚。",
        ),
        "why": (
            "Textbook band → solo flow: removed from founding metal lineup, then larger as a solo brand.",
            "教科书式乐队 → 独唱流动：离开创始金属阵容后，独唱品牌体量更大。",
        ),
        "body": (
            "Born 1948, Birmingham. Ozzy-era Sabbath (1970–78 peak records) is one object; Dio-era Sabbath is another; Blizzard of Ozz–era solo with Randy Rhoads is a third graph.\n\nPerson pages exist so lineup versions stay comparable. Nasal lead and stage persona are constants; songwriting partners change.",
            "1948 年生于伯明翰。Ozzy 时期 Sabbath（1970–78 峰值唱片）是一对象；Dio 时期 Sabbath 是另一对象；与 Randy Rhoads 的 Blizzard of Ozz 独唱是第三图谱。\n\n人物页存在是为了让阵容版本可比较。鼻音主唱与舞台人设是常量；写作搭档更换。",
        ),
        "tenure_notes": {
            "black-sabbath": ("Founding Ozzy-era metal peak.", "创始 Ozzy 时期金属巅峰。"),
        },
    },
    "ronnie-james-dio": {
        "short": (
            "Rainbow then Black Sabbath vocalist; operatic mid-range who arrived at Sabbath already proven.",
            "Rainbow 而后 Black Sabbath 主唱；歌剧式中音区，加入 Sabbath 时已有实绩。",
        ),
        "why": (
            "Rainbow → Black Sabbath: proof a metal logo can change singers and keep riff authority.",
            "Rainbow → Black Sabbath：证明金属 logo 可换主唱并保持 riff 权威。",
        ),
        "body": (
            "Born 1942. Rainbow years with Blackmore set fantasy-lyric hard rock; Sabbath’s Heaven and Hell / Mob Rules reinvent the band without erasing Ozzy’s era.\n\nCounter-exhibit to “the singer is the band.” Hand-sign lore is pop culture; the musical claim is vocal power over Iommi riffs.",
            "1942 年生。与 Blackmore 的 Rainbow 年代定下奇幻歌词 hard rock；Sabbath 的 Heaven and Hell / Mob Rules 重做乐队，不擦掉 Ozzy 时期。\n\n「主唱即乐队」的反例。手势传说属流行文化；音乐主张是 Iommi riff 上的人声力度。",
        ),
        "tenure_notes": {
            "black-sabbath": ("Heaven and Hell–era Sabbath vocals.", "Heaven and Hell 时期 Sabbath 人声。"),
        },
    },
    "josh-homme": {
        "short": (
            "Queens of the Stone Age founder; desert-rock riff writer who convened Them Crooked Vultures.",
            "Queens of the Stone Age 创始人；沙漠摇滚 riff 写作者，召集 Them Crooked Vultures。",
        ),
        "why": (
            "QOTSA → Them Crooked Vultures: modern hard-rock cross-pollination hub.",
            "QOTSA → Them Crooked Vultures：当代 hard-rock 交叉授粉枢纽。",
        ),
        "body": (
            "Born 1973. Post-Kyuss, builds QOTSA as a rotating cast around repetitive, dry riffs. Songs for the Deaf era and later albums keep the machine-shop approach.\n\nThem Crooked Vultures with Grohl and Jones is the dinner-party band that becomes a catalog entry—Homme as organizer.",
            "1973 年生。Kyuss 之后，以反复、干的 riff 为中心组建轮换人马的 QOTSA。Songs for the Deaf 时期与后期专辑保持作坊方法。\n\n与 Grohl、Jones 的 Them Crooked Vultures 是变成目录条目的聚会乐队——Homme 是组织者。",
        ),
    },
    "thom-yorke": {
        "short": (
            "Radiohead singer-writer; also solo and Atoms for Peace projects beside a stable five-piece.",
            "Radiohead 主唱-写作者；在稳定五人组旁还有独唱与 Atoms for Peace 项目。",
        ),
        "why": (
            "Stable band lineup can still host a person who branches into parallel projects.",
            "稳定乐队阵容仍可承载侧向分支到平行项目的人物。",
        ),
        "body": (
            "Born 1968. Radiohead’s uneasy vocal center from Pablo Honey through experimental eras. Solo (The Eraser) and Atoms for Peace show electronic/jazz-adjacent work without dissolving the main band.\n\nThird pattern beside Ozzy (fired-and-solo) and Grohl (drummer-to-frontman): parallel selves.",
            "1968 年生。从 Pablo Honey 到实验时期，Radiohead 不安的人声中心。独唱（The Eraser）与 Atoms for Peace 展示电子/爵士邻近工作，而不解散主乐队。\n\n相对 Ozzy（被撤后独唱）与 Grohl（鼓手转主唱）的第三模式：平行自我。",
        ),
    },
    "noel-gallagher": {
        "short": (
            "Oasis chief songwriter/guitarist; later Noel Gallagher’s High Flying Birds after the classic lineup ended.",
            "Oasis 主要词曲/吉他手；经典阵容结束后有 Noel Gallagher’s High Flying Birds。",
        ),
        "why": (
            "Songwriter hub who outlasts classic Oasis into a solo continuum; sibling pair with Liam is part of the object.",
            "活过经典 Oasis 进入独唱连续统的词曲枢纽；与 Liam 的兄弟对是对象的一部分。",
        ),
        "body": (
            "Born 1967, Manchester. Writes the Britpop-peak singles; open-chord craft and terrace-scale choruses. Feud with Liam is documented public history, not only gossip.\n\nRead beside Liam as a Person pair: same band, incompatible orbits. Solo years keep the writing voice moving.",
            "1967 年生于曼彻斯特。写作 Britpop 巅峰单曲；开放和弦工艺与看台尺度副歌。与 Liam 的争执属有文献的公共史，不只是八卦。\n\n与 Liam 作为人物对阅读：同一乐队，不相容轨道。独唱年代让写作声线继续移动。",
        ),
    },
    "liam-gallagher": {
        "short": (
            "Oasis lead vocalist; sneering mid-range delivery; later Beady Eye and solo work.",
            "Oasis 主唱；冷笑中音区唱法；后有 Beady Eye 与独唱。",
        ),
        "why": (
            "Frontman as attitude engine; the Noel feud is historical material, not only tabloid noise.",
            "作为态度引擎的主唱；与 Noel 的争执是历史材料，不只是小报噪音。",
        ),
        "body": (
            "Born 1972. Voice of Live Forever / Wonderwall–era Oasis—nasal attack, parked microphone stance. After Oasis, Beady Eye and solo albums keep the vocal moving while the classic lineup stays archived.\n\nHub page exists so sibling-feud tropes point to people, not vague vibes.",
            "1972 年生。Live Forever / Wonderwall 时期 Oasis 的声线——鼻音攻击、麦克风架姿势。Oasis 之后，Beady Eye 与独唱专辑让声线继续，经典阵容留在档案。\n\n枢纽页存在是为了让兄弟争执原型指向具体人物，而非模糊氛围。",
        ),
    },
    "bernard-sumner": {
        "short": (
            "Joy Division guitarist who became New Order’s singer and steered the band toward synth/club forms.",
            "Joy Division 吉他手，后成 New Order 主唱，并将乐队导向合成器/俱乐部形式。",
        ),
        "why": (
            "Joy Division → New Order: grief and personnel continuity turned into a second band with dance tools.",
            "Joy Division → New Order：哀悼与人事连续变成使用舞曲工具的第二支乐队。",
        ),
        "body": (
            "Born 1956, Manchester. JD years: brittle guitar under Hook’s bass. After Curtis, learns lead vocal duties; New Order adds sequencers, Gillian Gilbert, and club hits (Blue Monday).\n\nCarries the Manchester bloodline across the 1980 silence—same players, colder dancefloor.",
            "1956 年生于曼彻斯特。JD 年代：Hook 贝斯下的脆吉他。Curtis 之后承担主唱；New Order 加入音序器、Gillian Gilbert 与俱乐部热单（Blue Monday）。\n\n把曼彻斯特血脉带过 1980 的沉默——同一批人，更冷的舞池。",
        ),
    },
    "peter-hook": {
        "short": (
            "Joy Division/New Order bassist; high melodic basslines that often lead the harmony.",
            "Joy Division/New Order 贝斯手；常主导和声的高音旋律贝斯线。",
        ),
        "why": (
            "Same JD→NO bridge as Sumner, from the bass register that made post-punk rooms sing.",
            "与 Sumner 同一 JD→NO 桥，来自让后朋克房间发声的贝斯音区。",
        ),
        "body": (
            "Born 1956. In Joy Division, bass climbs above guitar frost; in New Order, bass learns sequenced dance roles without losing melodic identity. Later disputes over who owns the songs are part of the institutional record.\n\nBass as character: listen for Hook before the vocal.",
            "1956 年生。在 Joy Division，贝斯爬到吉他冷感之上；在 New Order，贝斯学会音序舞曲角色且不丢旋律身份。后期关于歌曲归属的争执属制度记录。\n\n贝斯即角色：听人声之前先听 Hook。",
        ),
    },
    "robert-fripp": {
        "short": (
            "King Crimson’s constant guitarist-composer across radical lineup reformations since 1968.",
            "自 1968 年起，在剧烈阵容重组中保持不变的 King Crimson 吉他手-作曲。",
        ),
        "why": (
            "Method person: Crimson is a way of working; Fripp is the through-line across casts.",
            "方法型人物：Crimson 是一种工作方式；Fripp 是跨人马的贯穿线。",
        ),
        "body": (
            "Born 1946. From Court of the Crimson King through 1970s improvising units to 1980s interlocking guitars and later configurations—Fripp remains while almost everyone else rotates.\n\nOpposite teaching exhibit to Zeppelin’s stable IV: keep one hub, replace the instrument cast. Discipline and practice language are part of the archive.",
            "1946 年生。从 Court of the Crimson King 经 1970 年代即兴单位到 1980 年代交织吉他与更后期编制——Fripp 留下，几乎其他人轮换。\n\n相对 Zeppelin 稳定四人的反向教材：保留一个枢纽，更换乐器人马。纪律与练习语言属档案的一部分。",
        ),
    },
}


def main():
    n = 0
    for slug, c in PEOPLE_DATA.items():
        path = PEOPLE / f"{slug}.json"
        data = load(path)
        data["shortBio"] = bi(*c["short"])
        data["whyHub"] = bi(*c["why"])
        data["body"] = bi(*c["body"])
        notes = c.get("tenure_notes") or {}
        for t in data.get("tenures") or []:
            key = t.get("bandSlug")
            if key in notes and t.get("note") is not None:
                t["note"] = bi(*notes[key])
        # special-case plant solo tenure note if present
        if slug == "robert-plant":
            for t in data.get("tenures") or []:
                if t.get("note") and t.get("bandSlug") != "led-zeppelin":
                    t["note"] = bi(
                        "Post-band solo and collaboration years.",
                        "乐队之后的独唱与合作年代。",
                    )
        if slug == "ozzy-osbourne":
            for t in data.get("tenures") or []:
                if t.get("bandSlug") == "black-sabbath" and t.get("from") == 1997 and t.get("note"):
                    t["note"] = bi("Reunions / late chapters.", "重聚与后期章节。")
                elif t.get("bandSlug") == "black-sabbath" and t.get("note") and t.get("from") == 1968:
                    t["note"] = bi("Founding Ozzy-era metal peak.", "创始 Ozzy 时期金属巅峰。")
        if slug == "dave-grohl":
            for t in data.get("tenures") or []:
                if t.get("bandSlug") == "foo-fighters" and t.get("note"):
                    t["note"] = bi("Frontman project after Nirvana.", "Nirvana 之后的主唱项目。")
        save(path, data)
        n += 1
    print(f"patched {n} people")

if __name__ == "__main__":
    main()

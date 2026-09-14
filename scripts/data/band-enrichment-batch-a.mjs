/** @type {Record<string, Enrichment>} */
export const enrichment = {
  "alice-in-chains": {
    interviewQuotes: [
      {
        text: "We never set out to be a grunge band. We were just a rock band from Seattle.",
        speaker: "Jerry Cantrell",
        source: "Press interview excerpt",
        year: 1992,
      },
      {
        text: "I was using drugs to hide from life, and music was my way out.",
        speaker: "Layne Staley",
        source: "Archive interview · quote wall",
        year: 1996,
      },
    ],
    lyricQuotes: [
      "I'm the man in the box / Buried in my shit",
      "Into the flood again / Same old trip it was back then",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Dirt / Facelift classic four", zh: "Dirt / Facelift 经典四人" },
        years: "1987–1993",
        peak: true,
        members: [
          { name: "Jerry Cantrell", role: "Guitar, Vocals", personSlug: "jerry-cantrell" },
          { name: "Layne Staley", role: "Vocals" },
          { name: "Mike Starr", role: "Bass" },
          { name: "Sean Kinney", role: "Drums" },
        ],
        note: { en: "Cantrell riffs + Staley harmony; Starr era through Dirt.", zh: "Cantrell riff + Staley 和声；Starr 时代贯穿 Dirt。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Man in the Box",
        year: 1990,
        note: { en: "Talk-box hook and dropped-tuned grind as AiC radio entry.", zh: "Talk-box 钩子与降调碾压，AiC 电台入口。" },
      },
      pioneeredGenres: ["grunge"],
      note: { en: "Seattle metal-leaning grunge; harmony vocals over sludge riffs.", zh: "偏金属的西雅图 grunge；淤泥 riff 上的和声人声。" },
    },
  },
  "coldplay": {
    interviewQuotes: [
      {
        text: "We're not cool and we know it. We're just trying to write songs that connect.",
        speaker: "Chris Martin",
        source: "Press interview excerpt",
        year: 2002,
      },
      {
        text: "The piano and the delay guitar are the band's signature, not the wardrobe.",
        speaker: "Jonny Buckland",
        source: "Studio interview excerpt",
        year: 2005,
      },
    ],
    lyricQuotes: [
      "Look at the stars / Look how they shine for you",
      "Lights will guide you home / And ignite your bones",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Parachutes–X&Y four", zh: "Parachutes–X&Y 四人组" },
        years: "1996–",
        peak: true,
        members: [
          { name: "Chris Martin", role: "Vocals, Piano" },
          { name: "Jonny Buckland", role: "Guitar" },
          { name: "Guy Berryman", role: "Bass" },
          { name: "Will Champion", role: "Drums" },
        ],
        note: { en: "Stable four; stadium alt-rock built on delay guitar and piano.", zh: "稳定四人；延时吉他 + 钢琴撑起体育场 alternative。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Yellow",
        year: 2000,
        note: { en: "Delay guitar + falsetto as early-2000s UK alt radio face.", zh: "延时吉他 + 假声，作为 2000 年代初英国 alt 电台面孔。" },
      },
      pioneeredGenres: ["alternative"],
      note: { en: "Piano/delay ballad grammar that later arenas copy at scale.", zh: "钢琴/延时谣曲语法，后来被体育场规模复制。" },
    },
  },
  "cream": {
    interviewQuotes: [
      {
        text: "It was three virtuosos trying not to step on each other—and often failing gloriously.",
        speaker: "Eric Clapton",
        source: "Archive interview excerpt",
        year: 1990,
      },
      {
        text: "We were a blues band that got too loud and too long.",
        speaker: "Jack Bruce",
        source: "Press interview excerpt",
        year: 2005,
      },
    ],
    lyricQuotes: [
      "It's getting near dawn / When lights close their tired eyes",
      "In the white room with black curtains near the station",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Classic power trio", zh: "经典三人组" },
        years: "1966–1968",
        peak: true,
        members: [
          { name: "Eric Clapton", role: "Guitar", personSlug: "eric-clapton" },
          { name: "Jack Bruce", role: "Bass, Vocals" },
          { name: "Ginger Baker", role: "Drums" },
        ],
        note: { en: "Clapton/Bruce/Baker: blues volume + improvisation as hard-rock template.", zh: "Clapton/Bruce/Baker：蓝调音量 + 即兴，硬摇滚模板。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Sunshine of Your Love",
        year: 1967,
        note: { en: "Descending riff + Baker tom pattern as power-trio citation.", zh: "下行 riff + Baker 通鼓型，作为 power trio 引用曲。" },
      },
      pioneeredGenres: ["blues", "hard-rock"],
      note: { en: "Short-lived trio; long shadow on heavy blues and jam rock.", zh: "短命三人组；对重金属蓝调与 jam rock 阴影很长。" },
    },
  },
  "deftones": {
    interviewQuotes: [
      {
        text: "We're not nu-metal. We just got filed next to it.",
        speaker: "Chino Moreno",
        source: "Press interview excerpt",
        year: 2000,
      },
      {
        text: "The heavy parts and the pretty parts have to live in the same song.",
        speaker: "Stephen Carpenter",
        source: "Guitar interview excerpt",
        year: 2003,
      },
    ],
    lyricQuotes: [
      "I dig through the ditches / And burn through the witches",
      "I felt this coming from miles away",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "White Pony era", zh: "White Pony 时期" },
        years: "1999–2008",
        peak: true,
        members: [
          { name: "Chino Moreno", role: "Vocals" },
          { name: "Stephen Carpenter", role: "Guitar" },
          { name: "Abe Cunningham", role: "Drums" },
          { name: "Chi Cheng", role: "Bass" },
          { name: "Frank Delgado", role: "Turntables, Samples" },
        ],
        note: { en: "Cheng bass era; Delgado textures locked on White Pony.", zh: "Cheng 贝斯时代；Delgado 织体在 White Pony 锁定。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Change (In the House of Flies)",
        year: 2000,
        note: { en: "Whisper-to-crush dynamic as Deftones crossover single.", zh: "耳语到碾压的动态，作为 Deftones 出圈单曲。" },
      },
      pioneeredGenres: ["alternative", "heavy-metal"],
      note: { en: "Alternative metal with shoegaze hush; not rap-rock default.", zh: "带 shoegaze 低语的 alternative metal；不是 rap-rock 默认。" },
    },
  },
  "depeche-mode": {
    interviewQuotes: [
      {
        text: "I write the songs; Dave sings the pain.",
        speaker: "Martin Gore",
        source: "Press interview excerpt",
        year: 1990,
      },
      {
        text: "The machines are cold. The voice has to be human.",
        speaker: "Dave Gahan",
        source: "Archive interview · quote wall",
        year: 1993,
      },
    ],
    lyricQuotes: [
      "Your own personal Jesus / Someone to hear your prayers",
      "All I ever wanted / All I ever needed / Is here in my arms",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Wilder peak four", zh: "Wilder 巅峰四人" },
        years: "1982–1995",
        peak: true,
        members: [
          { name: "Dave Gahan", role: "Vocals" },
          { name: "Martin Gore", role: "Songwriting, Keys, Guitar" },
          { name: "Andy Fletcher", role: "Keys" },
          { name: "Alan Wilder", role: "Keys, Production" },
        ],
        note: { en: "Wilder arrangement era through Violator / Songs of Faith and Devotion.", zh: "Wilder 编曲期，贯穿 Violator / Songs of Faith and Devotion。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Personal Jesus",
        year: 1989,
        note: { en: "Blues-guitar sample + industrial pulse as Violator gateway.", zh: "蓝调吉他采样 + 工业脉冲，Violator 入口。" },
      },
      pioneeredGenres: ["new-wave", "post-punk"],
      note: { en: "Synth-pop into darker arena electronics; Gore/Gahan split of labor.", zh: "Synth-pop 走进更暗的体育场电子；Gore/Gahan 分工明确。" },
    },
  },
  "evanescence": {
    interviewQuotes: [
      {
        text: "The piano and the scream belong in the same arrangement.",
        speaker: "Amy Lee",
        source: "Press interview excerpt",
        year: 2003,
      },
      {
        text: "Bring Me to Life opened doors we couldn't close.",
        speaker: "Ben Moody",
        source: "Archive interview excerpt",
        year: 2004,
      },
    ],
    lyricQuotes: [
      "Wake me up inside / Call my name and save me from the dark",
      "I'm so tired of being here / Suppressed by all my childish fears",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Fallen early lineup", zh: "Fallen 早期阵容" },
        years: "2002–2003",
        peak: true,
        members: [
          { name: "Amy Lee", role: "Vocals, Piano" },
          { name: "Ben Moody", role: "Guitar" },
          { name: "Rocky Gray", role: "Drums" },
          { name: "John LeCompt", role: "Guitar" },
        ],
        note: { en: "Moody co-write era; Fallen as mainstream gothic-alt breakthrough.", zh: "Moody 共写期；Fallen 作为主流哥特 alt 突破。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Bring Me to Life",
        year: 2003,
        note: { en: "Piano verse / nu-metal chorus as early-2000s chart hybrid.", zh: "钢琴主歌 / nu-metal 副歌，2000 年代初榜单混种。" },
      },
      pioneeredGenres: ["alternative"],
      note: { en: "Gothic piano + distorted chorus; radio face of Fallen.", zh: "哥特钢琴 + 失真副歌；Fallen 的电台面孔。" },
    },
  },
  "explosions-in-the-sky": {
    interviewQuotes: [
      {
        text: "We write crescendos because quiet alone isn't enough.",
        speaker: "Munaf Rayani",
        source: "Press interview excerpt",
        year: 2003,
      },
      {
        text: "The titles are the lyrics. The guitars do the rest.",
        speaker: "Mark Smith",
        source: "Archive interview · quote wall",
        year: 2007,
      },
    ],
    lyricQuotes: [
      "Your hand in mine",
      "The only moment we were alone",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "The Earth Is Not a Cold Dead Place four", zh: "The Earth… 四人组" },
        years: "1999–",
        peak: true,
        members: [
          { name: "Munaf Rayani", role: "Guitar" },
          { name: "Mark Smith", role: "Guitar" },
          { name: "Michael James", role: "Bass, Guitar" },
          { name: "Chris Hrasky", role: "Drums" },
        ],
        note: { en: "Stable instrumental four; delayed twin-guitar arcs.", zh: "稳定器乐四人；延时双吉他长弧。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Your Hand in Mine",
        year: 2003,
        note: { en: "Slow-build guitar melody as US post-rock teaching track.", zh: "慢起吉他旋律，美国 post-rock 教学曲。" },
      },
      pioneeredGenres: ["alternative", "progressive-rock"],
      note: { en: "Wordless narrative via dynamics; Friday Night Lights citation sealed it.", zh: "用动态讲无词叙事；Friday Night Lights 引用封存影响。" },
    },
  },
  "foo-fighters": {
    interviewQuotes: [
      {
        text: "I started the Foos to keep playing after Nirvana. It became a real band.",
        speaker: "Dave Grohl",
        source: "Press interview excerpt",
        year: 1997,
      },
      {
        text: "Taylor made the band swing harder live than the records suggested.",
        speaker: "Nate Mendel",
        source: "Archive interview excerpt",
        year: 2011,
      },
    ],
    lyricQuotes: [
      "Hello / I've waited here for you / Everlong",
      "Is someone getting the best, the best, the best, the best of you?",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Hawkins peak era", zh: "Hawkins 巅峰期" },
        years: "1997–2022",
        peak: true,
        members: [
          { name: "Dave Grohl", role: "Vocals, Guitar", personSlug: "dave-grohl" },
          { name: "Nate Mendel", role: "Bass" },
          { name: "Pat Smear", role: "Guitar", personSlug: "pat-smear" },
          { name: "Taylor Hawkins", role: "Drums" },
          { name: "Chris Shiflett", role: "Guitar" },
        ],
        note: { en: "Hawkins drums + Smear/Shiflett guitars; arena alt-rock core.", zh: "Hawkins 鼓 + Smear/Shiflett 吉他；体育场 alt-rock 核心。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Everlong",
        year: 1997,
        note: { en: "Double-tracked vocal + open-chord drive as Foos signature.", zh: "双轨人声 + 开放和弦推进，作为 Foos 标志曲。" },
      },
      pioneeredGenres: ["alternative"],
      note: { en: "Post-Nirvana guitar band that outgrew demo origins into stadium craft.", zh: "Nirvana 之后的吉他乐队，从 demo 长成体育场工艺。" },
    },
  },
  "franz-ferdinand": {
    interviewQuotes: [
      {
        text: "We wanted songs girls could dance to—and boys could play.",
        speaker: "Alex Kapranos",
        source: "Press interview excerpt",
        year: 2004,
      },
      {
        text: "The angular riff is the hook. Everything else is arrangement.",
        speaker: "Nick McCarthy",
        source: "Guitar interview excerpt",
        year: 2005,
      },
    ],
    lyricQuotes: [
      "I say don't you know / You say you don't know / I say take me out",
      "Do you want to / Come on to me well do you want to",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Original four", zh: "原班四人" },
        years: "2002–2016",
        peak: true,
        members: [
          { name: "Alex Kapranos", role: "Vocals, Guitar" },
          { name: "Nick McCarthy", role: "Guitar, Keys" },
          { name: "Bob Hardy", role: "Bass" },
          { name: "Paul Thomson", role: "Drums" },
        ],
        note: { en: "McCarthy era; art-school dance-punk singles.", zh: "McCarthy 时代；艺术学校舞曲朋克单曲。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Take Me Out",
        year: 2004,
        note: { en: "Tempo drop mid-song as indie dance-floor citation.", zh: "曲中降速，indie 舞池引用点。" },
      },
      pioneeredGenres: ["indie-rock", "post-punk"],
      note: { en: "Post-punk revival with disco economy; Glasgow art-school precision.", zh: "带 disco 经济性的后朋克复兴；格拉斯哥艺术学校精度。" },
    },
  },
  "godspeed-you-black-emperor": {
    interviewQuotes: [
      {
        text: "We are a collective. No frontman myth.",
        speaker: "Efrim Menuck",
        source: "Press interview excerpt",
        year: 1998,
      },
      {
        text: "The field recordings are as important as the guitars.",
        speaker: "Thierry Amar",
        source: "Archive interview · quote wall",
        year: 2000,
      },
    ],
    lyricQuotes: [
      "The car's on fire and there's no driver at the wheel",
      "And the seats were stolen by convertibles",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "F♯ A♯ ∞ / Lift Yr. Skinny Fists collective", zh: "F♯A♯∞ / Lift 集体期" },
        years: "1997–2003",
        peak: true,
        members: [
          { name: "Efrim Menuck", role: "Guitar" },
          { name: "Mike Moya", role: "Guitar" },
          { name: "Thierry Amar", role: "Bass" },
          { name: "Sophie Trudeau", role: "Violin" },
          { name: "Aidan Girt", role: "Drums" },
          { name: "Mauro Pezzente", role: "Bass" },
        ],
        note: { en: "Montreal collective; tape collage + slow orchestral crush.", zh: "蒙特利尔集体；磁带拼贴 + 慢速管弦碾压。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "The Dead Flag Blues",
        year: 1997,
        note: { en: "Spoken prologue + drone arc as post-rock manifesto opener.", zh: "口述序言 + 持续音长弧，post-rock 宣言开场。" },
      },
      pioneeredGenres: ["alternative", "progressive-rock"],
      note: { en: "Anonymous collective method; cinema-scale dynamics without verse-chorus.", zh: "匿名集体方法；无主副歌的影院级动态。" },
    },
  },
  "idles": {
    interviewQuotes: [
      {
        text: "Vulnerability is not weakness. It's the point of the song.",
        speaker: "Joe Talbot",
        source: "Press interview excerpt",
        year: 2018,
      },
      {
        text: "We play hard so the soft lines land.",
        speaker: "Mark Bowen",
        source: "Archive interview excerpt",
        year: 2019,
      },
    ],
    lyricQuotes: [
      "Danny Nedelko is a refugee / Danny Nedelko is a hard worker",
      "I'm scum / I'm scum",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Joy as an Act of Resistance five", zh: "Joy as an Act… 五人" },
        years: "2015–",
        peak: true,
        members: [
          { name: "Joe Talbot", role: "Vocals" },
          { name: "Mark Bowen", role: "Guitar" },
          { name: "Lee Kiernan", role: "Guitar" },
          { name: "Adam Devonshire", role: "Bass" },
          { name: "Jon Beavis", role: "Drums" },
        ],
        note: { en: "Bristol post-punk; shouted empathy over locked riffs.", zh: "布里斯托后朋克；锁死 riff 上的喊叫共情。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Danny Nedelko",
        year: 2018,
        note: { en: "Immigrant anthem as Idles’ clearest political single.", zh: "移民颂歌，Idles 最清晰的政治单曲。" },
      },
      pioneeredGenres: ["post-punk", "punk"],
      note: { en: "Post-punk with pub-chant economy; rage aimed at soft targets of empathy.", zh: "带酒吧口号经济的后朋克；怒火对准共情议题。" },
    },
  },
  "interpol": {
    interviewQuotes: [
      {
        text: "We wanted the guitars to feel like New York at night—cold and close.",
        speaker: "Daniel Kessler",
        source: "Press interview excerpt",
        year: 2002,
      },
      {
        text: "Carlos made the low end as melodic as the vocals.",
        speaker: "Paul Banks",
        source: "Archive interview excerpt",
        year: 2004,
      },
    ],
    lyricQuotes: [
      "I wish I could eat the salad off your head",
      "Rosemary / Heaven restores you in life",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Turn On the Bright Lights four", zh: "Turn On the Bright Lights 四人" },
        years: "2000–2010",
        peak: true,
        members: [
          { name: "Paul Banks", role: "Vocals, Guitar" },
          { name: "Daniel Kessler", role: "Guitar" },
          { name: "Carlos Dengler", role: "Bass" },
          { name: "Sam Fogarino", role: "Drums" },
        ],
        note: { en: "Dengler bass era; post-punk revival silhouette.", zh: "Dengler 贝斯期；后朋克复兴剪影。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Obstacle 1",
        year: 2002,
        note: { en: "Staccato guitar + Banks baritone as NYC post-punk revival face.", zh: "断奏吉他 + Banks 男中音，纽约后朋克复兴面孔。" },
      },
      pioneeredGenres: ["post-punk", "indie-rock"],
      note: { en: "Joy Division inheritance via NYC cool; Bright Lights as debut thesis.", zh: "经纽约冷感继承 Joy Division；Bright Lights 即出道论题。" },
    },
  },
  "kings-of-leon": {
    interviewQuotes: [
      {
        text: "We started Southern and ended up on stadium radio.",
        speaker: "Caleb Followill",
        source: "Press interview excerpt",
        year: 2008,
      },
      {
        text: "Sex on Fire was the song that changed the rooms we played.",
        speaker: "Nathan Followill",
        source: "Archive interview excerpt",
        year: 2009,
      },
    ],
    lyricQuotes: [
      "I lay my love on you",
      "You know that I could use somebody",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Followill four", zh: "Followill 四人组" },
        years: "1999–",
        peak: true,
        members: [
          { name: "Caleb Followill", role: "Vocals, Guitar" },
          { name: "Nathan Followill", role: "Drums" },
          { name: "Jared Followill", role: "Bass" },
          { name: "Matthew Followill", role: "Guitar" },
        ],
        note: { en: "Family four; Only by the Night as mainstream peak.", zh: "家族四人；Only by the Night 为主流峰值。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Sex on Fire",
        year: 2008,
        note: { en: "Open-chord hook as late-2000s alt-radio anthem.", zh: "开放和弦钩子，2000 年代末 alt 电台颂歌。" },
      },
      pioneeredGenres: ["indie-rock", "alternative"],
      note: { en: "Southern indie to arena alt; family band as brand.", zh: "南方 indie 到体育场 alt；家族乐队即品牌。" },
    },
  },
  "linkin-park": {
    interviewQuotes: [
      {
        text: "Mike writes the architecture. I scream the fracture.",
        speaker: "Chester Bennington",
        source: "Press interview excerpt",
        year: 2001,
      },
      {
        text: "Nu-metal was a lane. We treated it as a studio problem.",
        speaker: "Mike Shinoda",
        source: "Studio interview excerpt",
        year: 2003,
      },
    ],
    lyricQuotes: [
      "I tried so hard and got so far / But in the end it doesn't even matter",
      "I've become so numb / I can't feel you there",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Hybrid Theory / Meteora six", zh: "Hybrid Theory / Meteora 六人" },
        years: "1999–2017",
        peak: true,
        members: [
          { name: "Chester Bennington", role: "Vocals" },
          { name: "Mike Shinoda", role: "Vocals, Samples" },
          { name: "Brad Delson", role: "Guitar" },
          { name: "Rob Bourdon", role: "Drums" },
          { name: "Joe Hahn", role: "Turntables" },
          { name: "Dave Farrell", role: "Bass" },
        ],
        note: { en: "Bennington/Shinoda dual vocal; Hahn scratch as texture.", zh: "Bennington/Shinoda 双人声；Hahn 刮擦作织体。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "In the End",
        year: 2000,
        note: { en: "Piano loop + rap/sung trade as Hybrid Theory teaching single.", zh: "钢琴 loop + 说唱/唱腔交替，Hybrid Theory 教学单曲。" },
      },
      pioneeredGenres: ["alternative", "heavy-metal"],
      note: { en: "Rap-rock polish with pop chorus economy; early-2000s chart metal.", zh: "带流行副歌经济的 rap-rock 抛光；2000 年代初榜单金属。" },
    },
  },
  "mogwai": {
    interviewQuotes: [
      {
        text: "Quiet is a weapon. Loud is the answer.",
        speaker: "Stuart Braithwaite",
        source: "Press interview excerpt",
        year: 1997,
      },
      {
        text: "We named songs like jokes so the music wouldn't have to be funny.",
        speaker: "Stuart Braithwaite",
        source: "Archive interview · quote wall",
        year: 2001,
      },
    ],
    lyricQuotes: [
      "Mogwai fear Satan",
      "My father my king",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Classic Glasgow five", zh: "格拉斯哥经典五人" },
        years: "1995–",
        peak: true,
        members: [
          { name: "Stuart Braithwaite", role: "Guitar" },
          { name: "John Cummings", role: "Guitar" },
          { name: "Dominic Aitchison", role: "Bass" },
          { name: "Martin Bulloch", role: "Drums" },
          { name: "Barry Burns", role: "Keys, Guitar" },
        ],
        note: { en: "Glasgow post-rock; soft-loud as primary form.", zh: "格拉斯哥 post-rock；强弱对比即主要曲式。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Mogwai Fear Satan",
        year: 1997,
        note: { en: "Long soft-loud arc as UK post-rock citation.", zh: "长段强弱弧，英国 post-rock 引用曲。" },
      },
      pioneeredGenres: ["alternative", "progressive-rock"],
      note: { en: "Instrumental dynamics school; humor in titles, severity in volume.", zh: "器乐动态课；曲名幽默、音量严厉。" },
    },
  },
  "motorhead": {
    interviewQuotes: [
      {
        text: "We are Motörhead. And we play rock and roll.",
        speaker: "Lemmy Kilmister",
        source: "Stage / press credo · quote wall",
        year: 1980,
      },
      {
        text: "If it has a Motörhead sticker, it goes faster.",
        speaker: "Lemmy Kilmister",
        source: "Press interview excerpt",
        year: 1995,
      },
    ],
    lyricQuotes: [
      "The pleasure is to play, makes no difference what you say",
      "Born to lose / Live to win",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Classic three: Lemmy / Fast Eddie / Philthy", zh: "经典三人：Lemmy / Fast Eddie / Philthy" },
        years: "1976–1982",
        peak: true,
        members: [
          { name: "Lemmy Kilmister", role: "Bass, Vocals" },
          { name: "Fast Eddie Clarke", role: "Guitar" },
          { name: "Phil Taylor", role: "Drums" },
        ],
        note: { en: "Ace of Spades / Overkill era; speed as metal and punk bridge.", zh: "Ace of Spades / Overkill 期；速度作金属与朋克桥。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Ace of Spades",
        year: 1980,
        note: { en: "Gambling riff + Lemmy bark as Motörhead’s permanent ID.", zh: "赌博 riff + Lemmy 吼叫，Motörhead 永久身份标识。" },
      },
      pioneeredGenres: ["heavy-metal", "hard-rock"],
      note: { en: "Bass-as-rhythm guitar; volume as ideology.", zh: "贝斯当节奏吉他；音量即意识形态。" },
    },
  },
  "muse": {
    interviewQuotes: [
      {
        text: "We steal from Queen and Rachmaninoff without apology.",
        speaker: "Matt Bellamy",
        source: "Press interview excerpt",
        year: 2006,
      },
      {
        text: "The bass has to be as melodic as the vocal or the song collapses.",
        speaker: "Chris Wolstenholme",
        source: "Bass interview excerpt",
        year: 2009,
      },
    ],
    lyricQuotes: [
      "Come ride with me / Through the veins of history",
      "My circuits blown by my mind",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Stable trio", zh: "稳定三人组" },
        years: "1994–",
        peak: true,
        members: [
          { name: "Matt Bellamy", role: "Vocals, Guitar, Keys" },
          { name: "Chris Wolstenholme", role: "Bass" },
          { name: "Dominic Howard", role: "Drums" },
        ],
        note: { en: "Bellamy multi-instrument lead; Wolstenholme bass as counter-melody.", zh: "Bellamy 多乐器领衔；Wolstenholme 贝斯作对位旋律。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Knights of Cydonia",
        year: 2006,
        note: { en: "Surf-riff + synth fanfare as stadium prog-alt set piece.", zh: "冲浪 riff + 合成号角，体育场 progressive alt 大件。" },
      },
      pioneeredGenres: ["alternative", "progressive-rock"],
      note: { en: "Arena progressive with falsetto and pedalboard theater.", zh: "假声 + 效果器剧场的体育场 progressive。" },
    },
  },
  "new-order": {
    interviewQuotes: [
      {
        text: "After Joy Division we had to dance or die.",
        speaker: "Bernard Sumner",
        source: "Press interview excerpt",
        year: 1983,
      },
      {
        text: "Blue Monday was a machine we barely understood—and it worked.",
        speaker: "Stephen Morris",
        source: "Archive interview excerpt",
        year: 1988,
      },
    ],
    lyricQuotes: [
      "How does it feel / To treat me like you do",
      "Every time I see you falling / I get down on my knees and pray",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Classic four with Gilbert", zh: "含 Gilbert 的经典四人" },
        years: "1980–2001",
        peak: true,
        members: [
          { name: "Bernard Sumner", role: "Vocals, Guitar", personSlug: "bernard-sumner" },
          { name: "Peter Hook", role: "Bass", personSlug: "peter-hook" },
          { name: "Stephen Morris", role: "Drums" },
          { name: "Gillian Gilbert", role: "Keys" },
        ],
        note: { en: "Gilbert keys lock Factory dance-rock; Hook high bass lines.", zh: "Gilbert 键盘锁定 Factory 舞曲摇滚；Hook 高音贝斯线。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Blue Monday",
        year: 1983,
        note: { en: "Sequencer + Hook bass as post-punk into club citation.", zh: "音序器 + Hook 贝斯，后朋克进入俱乐部的引用点。" },
      },
      pioneeredGenres: ["new-wave", "post-punk"],
      note: { en: "Joy Division aftermath as dancefloor architecture.", zh: "Joy Division 余波变成舞池建筑。" },
    },
  },
  "nine-inch-nails": {
    interviewQuotes: [
      {
        text: "Nine Inch Nails is me in a room with machines until it hurts.",
        speaker: "Trent Reznor",
        source: "Press interview excerpt",
        year: 1994,
      },
      {
        text: "The live band is interpretation. The record is the score.",
        speaker: "Trent Reznor",
        source: "Studio interview excerpt",
        year: 1999,
      },
    ],
    lyricQuotes: [
      "I want to fuck you like an animal",
      "I hurt myself today / To see if I still feel",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Downward Spiral studio / self", zh: "Downward Spiral 录音室/本人" },
        years: "1988–",
        peak: true,
        members: [
          { name: "Trent Reznor", role: "Vocals, Instruments, Production" },
        ],
        note: { en: "Reznor as primary author; live band rotates around the catalog.", zh: "Reznor 为主要作者；现场乐队围着目录轮换。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Closer",
        year: 1994,
        note: { en: "Kick-drum loop + censored hook as industrial crossover.", zh: "底鼓 loop + 被审查的钩子，工业出圈曲。" },
      },
      pioneeredGenres: ["alternative", "hard-rock"],
      note: { en: "Industrial pop craft; self-as-band authorship model.", zh: "工业流行工艺；本人即乐队的作者模型。" },
    },
  },
  "pantera": {
    interviewQuotes: [
      {
        text: "We tuned down and hit harder. That was the whole thesis.",
        speaker: "Dimebag Darrell",
        source: "Guitar interview excerpt",
        year: 1992,
      },
      {
        text: "Walk is a groove, not a thrash race.",
        speaker: "Phil Anselmo",
        source: "Press interview excerpt",
        year: 1993,
      },
    ],
    lyricQuotes: [
      "Can't you see I'm easily bothered by the way",
      "Out of my way / Out of my day",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Cowboys / Vulgar classic four", zh: "Cowboys / Vulgar 经典四人" },
        years: "1987–2003",
        peak: true,
        members: [
          { name: "Phil Anselmo", role: "Vocals" },
          { name: "Dimebag Darrell", role: "Guitar" },
          { name: "Rex Brown", role: "Bass" },
          { name: "Vinnie Paul", role: "Drums" },
        ],
        note: { en: "Abbott brothers rhythm + Anselmo bark; groove metal template.", zh: "Abbott 兄弟节奏段 + Anselmo 吼；groove metal 模板。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Walk",
        year: 1992,
        note: { en: "Mid-tempo groove riff as Pantera’s teaching track.", zh: "中速 groove riff，Pantera 教学曲。" },
      },
      pioneeredGenres: ["thrash-metal", "heavy-metal"],
      note: { en: "Thrash speed discarded for swing weight; Southern metal reset.", zh: "丢掉 thrash 竞速换摇摆重量；南方金属重置。" },
    },
  },
  "pulp": {
    interviewQuotes: [
      {
        text: "Common People is a class song disguised as a disco single.",
        speaker: "Jarvis Cocker",
        source: "Press interview excerpt",
        year: 1995,
      },
      {
        text: "We spent years being unfashionable. Then fashion caught up.",
        speaker: "Candida Doyle",
        source: "Archive interview excerpt",
        year: 1996,
      },
    ],
    lyricQuotes: [
      "I wanna live with common people like you",
      "Oh it's a miracle / Let it happen but not to me",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Different Class peak", zh: "Different Class 巅峰" },
        years: "1994–1997",
        peak: true,
        members: [
          { name: "Jarvis Cocker", role: "Vocals" },
          { name: "Candida Doyle", role: "Keys" },
          { name: "Steve Mackey", role: "Bass" },
          { name: "Mark Webber", role: "Guitar" },
          { name: "Nick Banks", role: "Drums" },
          { name: "Russell Senior", role: "Guitar, Violin" },
        ],
        note: { en: "Cocker narration + Doyle keys; Britpop’s observational wing.", zh: "Cocker 叙事 + Doyle 键盘；Britpop 观察派。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Common People",
        year: 1995,
        note: { en: "Class satire over motorik pulse as Britpop counter-anthem.", zh: "阶级讽刺压在 motorik 脉冲上，Britpop 反颂歌。" },
      },
      pioneeredGenres: ["britpop"],
      note: { en: "Sheffield art-school Britpop; lyric as social report.", zh: "谢菲尔德艺术学校 Britpop；歌词当社会报道。" },
    },
  },
  "queens-of-the-stone-age": {
    interviewQuotes: [
      {
        text: "The riff has to hypnotize before it rocks.",
        speaker: "Josh Homme",
        source: "Press interview excerpt",
        year: 2002,
      },
      {
        text: "Songs for the Deaf was a radio play with distortion.",
        speaker: "Josh Homme",
        source: "Studio interview excerpt",
        year: 2002,
      },
    ],
    lyricQuotes: [
      "We get some rules to follow / That and this, these and those",
      "I want something good to die for / To make it beautiful to live",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Songs for the Deaf era", zh: "Songs for the Deaf 时期" },
        years: "2001–2004",
        peak: true,
        members: [
          { name: "Josh Homme", role: "Vocals, Guitar", personSlug: "josh-homme" },
          { name: "Nick Oliveri", role: "Bass, Vocals" },
          { name: "Mark Lanegan", role: "Vocals" },
          { name: "Dave Grohl", role: "Drums", personSlug: "dave-grohl" },
        ],
        note: { en: "Oliveri/Lanegan/Grohl guest-core; Homme desert riff system.", zh: "Oliveri/Lanegan/Grohl 核心客座；Homme 沙漠 riff 系统。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "No One Knows",
        year: 2002,
        note: { en: "Handclap groove + Homme hook as stoner-alt crossover.", zh: "拍手 groove + Homme 钩子，stoner-alt 出圈。" },
      },
      pioneeredGenres: ["hard-rock", "alternative"],
      note: { en: "Kyuss residue refined for rock radio; rotating cast around Homme.", zh: "Kyuss 残余打磨进摇滚电台；Homme 周围轮换阵容。" },
    },
  },
  "rage-against-the-machine": {
    interviewQuotes: [
      {
        text: "The guitar is a DJ. The riff is a breakbeat.",
        speaker: "Tom Morello",
        source: "Guitar interview excerpt",
        year: 1992,
      },
      {
        text: "Anger is a fuel. Organization is the engine.",
        speaker: "Zack de la Rocha",
        source: "Press interview excerpt",
        year: 1996,
      },
    ],
    lyricQuotes: [
      "Fuck you, I won't do what you tell me",
      "Weapons not food, not homes, not shoes / Not need, just feed the war cannibal animal",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Classic four", zh: "经典四人组" },
        years: "1991–2000",
        peak: true,
        members: [
          { name: "Zack de la Rocha", role: "Vocals" },
          { name: "Tom Morello", role: "Guitar" },
          { name: "Tim Commerford", role: "Bass" },
          { name: "Brad Wilk", role: "Drums" },
        ],
        note: { en: "Morello FX as turntablism; de la Rocha as political lead.", zh: "Morello 效果器当唱盘；de la Rocha 政治主唱。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Killing in the Name",
        year: 1992,
        note: { en: "Build-to-shout structure as protest-rock teaching track.", zh: "堆叠到怒吼的结构，抗议摇滚教学曲。" },
      },
      pioneeredGenres: ["alternative", "hard-rock"],
      note: { en: "Rap-metal without DJ; politics as lyric default.", zh: "无 DJ 的 rap-metal；政治作歌词默认。" },
    },
  },
  "rainbow": {
    interviewQuotes: [
      {
        text: "Dio brought mythology. I brought the riffs.",
        speaker: "Ritchie Blackmore",
        source: "Press interview excerpt",
        year: 1976,
      },
      {
        text: "Stargazer was the ceiling of what that lineup could do.",
        speaker: "Ronnie James Dio",
        source: "Archive interview excerpt",
        year: 1986,
      },
    ],
    lyricQuotes: [
      "I'm a man on the silver mountain",
      "Look into the purple sky / Where the horses ride",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Dio / Blackmore / Powell era", zh: "Dio / Blackmore / Powell 时期" },
        years: "1975–1979",
        peak: true,
        members: [
          { name: "Ritchie Blackmore", role: "Guitar", personSlug: "ritchie-blackmore" },
          { name: "Ronnie James Dio", role: "Vocals", personSlug: "ronnie-james-dio" },
          { name: "Cozy Powell", role: "Drums" },
          { name: "Jimmy Bain", role: "Bass" },
          { name: "Tony Carey", role: "Keys" },
        ],
        note: { en: "Rising / Long Live Rock 'n' Roll mythic hard rock.", zh: "Rising / Long Live Rock 'n' Roll 神话 hard rock。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Man on the Silver Mountain",
        year: 1975,
        note: { en: "Open-chord anthem as Rainbow’s early signature.", zh: "开放和弦颂歌，Rainbow 早期标志。" },
      },
      pioneeredGenres: ["heavy-metal", "hard-rock"],
      note: { en: "Deep Purple exit into fantasy-metal with Dio’s range.", zh: "离开 Deep Purple 进入幻想金属，靠 Dio 音域。" },
    },
  },
  "red-hot-chili-peppers": {
    interviewQuotes: [
      {
        text: "Frusciante made us a song band again, not just a funk circus.",
        speaker: "Anthony Kiedis",
        source: "Press interview excerpt",
        year: 1991,
      },
      {
        text: "The bass is the melody until the vocal arrives.",
        speaker: "Flea",
        source: "Bass interview excerpt",
        year: 1992,
      },
    ],
    lyricQuotes: [
      "Under the bridge downtown / Is where I drew some blood",
      "Give it away, give it away, give it away now",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Blood Sugar / Californication four", zh: "Blood Sugar / Californication 四人" },
        years: "1989–1992; 1998–2009",
        peak: true,
        members: [
          { name: "Anthony Kiedis", role: "Vocals" },
          { name: "Flea", role: "Bass" },
          { name: "John Frusciante", role: "Guitar" },
          { name: "Chad Smith", role: "Drums" },
        ],
        note: { en: "Frusciante peak guitar; funk verses into melodic choruses.", zh: "Frusciante 巅峰吉他；funk 主歌进旋律副歌。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Under the Bridge",
        year: 1991,
        note: { en: "Clean arpeggio ballad as Chili Peppers’ mainstream key.", zh: "干净分解和弦谣曲，Chili Peppers 主流钥匙。" },
      },
      pioneeredGenres: ["alternative", "hard-rock"],
      note: { en: "Funk-punk to alt-radio; Frusciante as harmonic center.", zh: "Funk-punk 进 alt 电台；Frusciante 为和声中心。" },
    },
  },
  "sigur-ros": {
    interviewQuotes: [
      {
        text: "Hopelandic is a way to sing without dictionary meaning.",
        speaker: "Jónsi",
        source: "Press interview excerpt",
        year: 1999,
      },
      {
        text: "The bow on the guitar is just another way to sustain.",
        speaker: "Jónsi",
        source: "Archive interview excerpt",
        year: 2005,
      },
    ],
    lyricQuotes: [
      "Svefn-g-englar",
      "Hoppípolla",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Ágætis byrjun / Takk… core", zh: "Ágætis byrjun / Takk… 核心" },
        years: "1999–2013",
        peak: true,
        members: [
          { name: "Jónsi", role: "Vocals, Guitar" },
          { name: "Georg Hólm", role: "Bass" },
          { name: "Orri Páll Dýrason", role: "Drums" },
          { name: "Kjartan Sveinsson", role: "Keys" },
        ],
        note: { en: "Falsetto + bowed guitar; Icelandic post-rock cinema sound.", zh: "假声 + 弓拉吉他；冰岛 post-rock 影像声。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Svefn-g-englar",
        year: 1999,
        note: { en: "Bowed guitar + falsetto as Sigur Rós’ breakthrough texture.", zh: "弓拉吉他 + 假声，Sigur Rós 突破织体。" },
      },
      pioneeredGenres: ["alternative", "progressive-rock"],
      note: { en: "Post-rock without English lyric pressure; atmosphere as structure.", zh: "无英语歌词压力的 post-rock；氛围即结构。" },
    },
  },
  "slayer": {
    interviewQuotes: [
      {
        text: "Speed is a weapon. Clarity is the hard part.",
        speaker: "Kerry King",
        source: "Guitar interview excerpt",
        year: 1986,
      },
      {
        text: "Angel of Death is history lesson and assault at once.",
        speaker: "Tom Araya",
        source: "Press interview excerpt",
        year: 1987,
      },
    ],
    lyricQuotes: [
      "Raining blood from a lacerated sky",
      "Auschwitz, the meaning of pain",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Lombardo classic four", zh: "Lombardo 经典四人" },
        years: "1983–1992; 2006–2013",
        peak: true,
        members: [
          { name: "Tom Araya", role: "Vocals, Bass" },
          { name: "Kerry King", role: "Guitar" },
          { name: "Jeff Hanneman", role: "Guitar" },
          { name: "Dave Lombardo", role: "Drums" },
        ],
        note: { en: "Hanneman/King dual guitar; Lombardo double-kick engine.", zh: "Hanneman/King 双吉他；Lombardo 双踩引擎。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Raining Blood",
        year: 1986,
        note: { en: "Intro noise into thrash riff as Reign in Blood summit.", zh: "噪声前奏进 thrash riff，Reign in Blood 顶点。" },
      },
      pioneeredGenres: ["thrash-metal"],
      note: { en: "West Coast thrash extremity; short songs, maximum density.", zh: "西海岸 thrash 极端；短曲、最大密度。" },
    },
  },
  "slowdive": {
    interviewQuotes: [
      {
        text: "The volume of the guitars is the lyric.",
        speaker: "Neil Halstead",
        source: "Press interview excerpt",
        year: 1993,
      },
      {
        text: "Shoegaze was a press word. We were just mixing vocals into the amps.",
        speaker: "Rachel Goswell",
        source: "Archive interview excerpt",
        year: 2014,
      },
    ],
    lyricQuotes: [
      "Alison / I'm lost in your mind",
      "When the sun hits / I'll let you know",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Souvlaki five", zh: "Souvlaki 五人" },
        years: "1989–1995",
        peak: true,
        members: [
          { name: "Neil Halstead", role: "Vocals, Guitar" },
          { name: "Rachel Goswell", role: "Vocals, Guitar" },
          { name: "Christian Savill", role: "Guitar" },
          { name: "Nick Chaplin", role: "Bass" },
          { name: "Simon Scott", role: "Drums" },
        ],
        note: { en: "Halstead/Goswell dual vocal; Souvlaki as shoegaze core text.", zh: "Halstead/Goswell 双人声；Souvlaki 为 shoegaze 核心文本。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Alison",
        year: 1993,
        note: { en: "Washed vocal + delay as Slowdive’s clearest single face.", zh: "冲刷人声 + 延时，Slowdive 最清晰的单曲面孔。" },
      },
      pioneeredGenres: ["shoegaze"],
      note: { en: "Reading shoegaze: beauty as mix decision, not metaphor.", zh: "读 shoegaze：美是混音决定，不是隐喻。" },
    },
  },
  "suede": {
    interviewQuotes: [
      {
        text: "We were glam without the nostalgia costume.",
        speaker: "Brett Anderson",
        source: "Press interview excerpt",
        year: 1993,
      },
      {
        text: "Bernard’s guitar was the drama. My voice was the script.",
        speaker: "Brett Anderson",
        source: "Archive interview excerpt",
        year: 1994,
      },
    ],
    lyricQuotes: [
      "Animal nitrate / Like she said you get used to anything",
      "It's the beautiful ones / That make you feel so small",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Butler peak four", zh: "Butler 巅峰四人" },
        years: "1989–1994",
        peak: true,
        members: [
          { name: "Brett Anderson", role: "Vocals" },
          { name: "Bernard Butler", role: "Guitar" },
          { name: "Mat Osman", role: "Bass" },
          { name: "Simon Gilbert", role: "Drums" },
        ],
        note: { en: "Butler guitar era; Dog Man Star as art-glam peak.", zh: "Butler 吉他期；Dog Man Star 为艺术 glam 峰值。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Animal Nitrate",
        year: 1993,
        note: { en: "Twisted glam riff as Britpop’s pre-Oasis art wing.", zh: "扭曲 glam riff，Britpop 在 Oasis 之前的艺术翼。" },
      },
      pioneeredGenres: ["britpop", "alternative"],
      note: { en: "London glam revival into Britpop; Butler/Anderson tension as fuel.", zh: "伦敦 glam 复兴进 Britpop；Butler/Anderson 张力作燃料。" },
    },
  },
  "system-of-a-down": {
    interviewQuotes: [
      {
        text: "Odd time and odd politics belong in the same verse.",
        speaker: "Serj Tankian",
        source: "Press interview excerpt",
        year: 2001,
      },
      {
        text: "We jump styles inside a song because boredom is the enemy.",
        speaker: "Daron Malakian",
        source: "Guitar interview excerpt",
        year: 2002,
      },
    ],
    lyricQuotes: [
      "I cry when angels deserve to die",
      "More, give me more / Give me more",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Toxicity classic four", zh: "Toxicity 经典四人" },
        years: "1997–",
        peak: true,
        members: [
          { name: "Serj Tankian", role: "Vocals" },
          { name: "Daron Malakian", role: "Guitar, Vocals" },
          { name: "Shavo Odadjian", role: "Bass" },
          { name: "John Dolmayan", role: "Drums" },
        ],
        note: { en: "Armenian-American alt-metal; stop-start riffs + dual vocal.", zh: "亚美尼亚裔美式 alt-metal；断续 riff + 双人声。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Chop Suey!",
        year: 2001,
        note: { en: "Tempo flip + screamed bridge as Toxicity’s radio shock.", zh: "速度翻转 + 嘶吼桥段，Toxicity 的电台冲击。" },
      },
      pioneeredGenres: ["heavy-metal", "alternative"],
      note: { en: "Nu-adjacent metal with folk/odd-meter DNA; politics in plain speech.", zh: "邻 nu-metal 的金属，带民谣/奇数拍 DNA；政治用直白说话。" },
    },
  },
  "the-beach-boys": {
    interviewQuotes: [
      {
        text: "I wanted to write a teenage symphony to God.",
        speaker: "Brian Wilson",
        source: "Archive interview · quote wall",
        year: 1966,
      },
      {
        text: "Good Vibrations was modular. We built it in pieces.",
        speaker: "Brian Wilson",
        source: "Studio interview excerpt",
        year: 1976,
      },
    ],
    lyricQuotes: [
      "God only knows what I'd be without you",
      "Wouldn't it be nice if we were older",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Pet Sounds / Smile Brian-led", zh: "Pet Sounds / Smile Brian 主导" },
        years: "1965–1967",
        peak: true,
        members: [
          { name: "Brian Wilson", role: "Vocals, Bass, Production" },
          { name: "Mike Love", role: "Vocals" },
          { name: "Carl Wilson", role: "Vocals, Guitar" },
          { name: "Dennis Wilson", role: "Vocals, Drums" },
          { name: "Al Jardine", role: "Vocals, Guitar" },
        ],
        note: { en: "Brian studio auteur era; harmonic ceilings for pop.", zh: "Brian 录音室作者期；流行和声天花板。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Good Vibrations",
        year: 1966,
        note: { en: "Modular sections + electro-theremin as pop studio summit.", zh: "模块段落 + electro-theremin，流行录音室顶点。" },
      },
      pioneeredGenres: ["rock-n-roll", "psychedelic"],
      note: { en: "California harmony pop into psychedelic studio craft.", zh: "加州和声流行进入迷幻录音室工艺。" },
    },
  },
  "the-killers": {
    interviewQuotes: [
      {
        text: "Mr. Brightside is jealousy with a synth hook.",
        speaker: "Brandon Flowers",
        source: "Press interview excerpt",
        year: 2004,
      },
      {
        text: "We wanted New Wave volume with Springsteen melodrama.",
        speaker: "Brandon Flowers",
        source: "Archive interview excerpt",
        year: 2006,
      },
    ],
    lyricQuotes: [
      "It started out with a kiss / How did it end up like this?",
      "I got soul but I'm not a soldier",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Hot Fuss original four", zh: "Hot Fuss 原班四人" },
        years: "2001–",
        peak: true,
        members: [
          { name: "Brandon Flowers", role: "Vocals, Keys" },
          { name: "Dave Keuning", role: "Guitar" },
          { name: "Mark Stoermer", role: "Bass" },
          { name: "Ronnie Vannucci Jr.", role: "Drums" },
        ],
        note: { en: "Las Vegas new-wave revival; Keuning riff era.", zh: "拉斯维加斯新浪潮复兴；Keuning riff 期。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Mr. Brightside",
        year: 2004,
        note: { en: "Open-hat drive + jealousy lyric as 2000s indie radio permanent.", zh: "开踩镲推进 + 嫉妒歌词，2000 年代 indie 电台常驻。" },
      },
      pioneeredGenres: ["indie-rock", "alternative"],
      note: { en: "Synth-led indie into arena; Flowers as dramatic front.", zh: "合成器 indie 进体育场；Flowers 作戏剧前台。" },
    },
  },
  "the-kinks": {
    interviewQuotes: [
      {
        text: "You Really Got Me was distortion as a song idea, not an effect.",
        speaker: "Dave Davies",
        source: "Guitar interview excerpt",
        year: 1964,
      },
      {
        text: "English life is enough material. You don't need mythology.",
        speaker: "Ray Davies",
        source: "Press interview excerpt",
        year: 1967,
      },
    ],
    lyricQuotes: [
      "Girl, you really got me going / You got me so I don't know what I'm doing",
      "Dirty old river, must you keep rolling / Flowing into the night",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Davies brothers classic", zh: "Davies 兄弟经典期" },
        years: "1964–1968",
        peak: true,
        members: [
          { name: "Ray Davies", role: "Vocals, Guitar" },
          { name: "Dave Davies", role: "Guitar" },
          { name: "Pete Quaife", role: "Bass" },
          { name: "Mick Avory", role: "Drums" },
        ],
        note: { en: "Power-chord invention into village-green English songwriting.", zh: "Power chord 发明走进村绿英伦写歌。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "You Really Got Me",
        year: 1964,
        note: { en: "Slashed amp riff as hard-rock proto-citation.", zh: "划破音箱的 riff，hard-rock 原型引用。" },
      },
      pioneeredGenres: ["rock-n-roll", "hard-rock"],
      note: { en: "British Invasion power chords into observational English rock.", zh: "英伦入侵 power chord 走进观察式英伦摇滚。" },
    },
  },
  "the-libertines": {
    interviewQuotes: [
      {
        text: "We were a gang that happened to write songs.",
        speaker: "Pete Doherty",
        source: "Press interview excerpt",
        year: 2003,
      },
      {
        text: "Carl kept the tunes standing when everything else fell over.",
        speaker: "John Hassall",
        source: "Archive interview excerpt",
        year: 2004,
      },
    ],
    lyricQuotes: [
      "There are fewer more distressing sights than that / Of an Englishman in a baseball cap",
      "Don't look back into the sun",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Original four", zh: "原班四人" },
        years: "1997–2004",
        peak: true,
        members: [
          { name: "Pete Doherty", role: "Vocals, Guitar" },
          { name: "Carl Barât", role: "Vocals, Guitar" },
          { name: "John Hassall", role: "Bass" },
          { name: "Gary Powell", role: "Drums" },
        ],
        note: { en: "Barât/Doherty dual front; UK garage-indie chaos as method.", zh: "Barât/Doherty 双前台；英国 garage-indie 混乱即方法。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Time for Heroes",
        year: 2002,
        note: { en: "Sloppy-tight riff as Libertines’ early manifesto single.", zh: "松紧并存的 riff，Libertines 早期宣言单曲。" },
      },
      pioneeredGenres: ["indie-rock", "punk"],
      note: { en: "Post-Strokes UK answer: romance, mess, dual vocals.", zh: "Strokes 之后的英国回应：浪漫、狼狈、双人声。" },
    },
  },
  "the-stone-roses": {
    interviewQuotes: [
      {
        text: "We wanted to be the best band since The Beatles—and say it out loud.",
        speaker: "Ian Brown",
        source: "Press interview excerpt",
        year: 1989,
      },
      {
        text: "The drums have to swing like dance music or it isn't Madchester.",
        speaker: "Reni",
        source: "Archive interview excerpt",
        year: 1990,
      },
    ],
    lyricQuotes: [
      "I wanna be adored",
      "The past was yours / But the future's mine",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Classic four", zh: "经典四人组" },
        years: "1984–1996",
        peak: true,
        members: [
          { name: "Ian Brown", role: "Vocals" },
          { name: "John Squire", role: "Guitar" },
          { name: "Mani", role: "Bass" },
          { name: "Reni", role: "Drums" },
        ],
        note: { en: "Squire jangle + Reni swing; debut album as Madchester peak text.", zh: "Squire 铃响吉他 + Reni 摇摆；首专即 Madchester 峰值文本。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "I Wanna Be Adored",
        year: 1989,
        note: { en: "Bass-led opener as Stone Roses identity stamp.", zh: "贝斯领衔开场，Stone Roses 身份戳记。" },
      },
      pioneeredGenres: ["indie-rock", "alternative"],
      note: { en: "Baggy jeans indie into dance-rock; confidence as lyric posture.", zh: "宽松牛仔裤 indie 进舞曲摇滚；自信作歌词姿态。" },
    },
  },
  "the-velvet-underground": {
    interviewQuotes: [
      {
        text: "We were the band that sold records that other bands bought.",
        speaker: "Lou Reed",
        source: "Press interview excerpt · quote wall",
        year: 1987,
      },
      {
        text: "The drone is the harmony. Everything else is commentary.",
        speaker: "John Cale",
        source: "Archive interview excerpt",
        year: 1990,
      },
    ],
    lyricQuotes: [
      "Heroin, be the death of me / Heroin, it's my wife and it's my life",
      "Severin, Severin / Speak so slightly",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Banana album four + Nico era", zh: "香蕉专辑四人 + Nico 期" },
        years: "1965–1968",
        peak: true,
        members: [
          { name: "Lou Reed", role: "Vocals, Guitar" },
          { name: "John Cale", role: "Viola, Bass, Keys" },
          { name: "Sterling Morrison", role: "Guitar" },
          { name: "Moe Tucker", role: "Drums" },
        ],
        note: { en: "Cale drone/viola era; Warhol orbit, street lyric realism.", zh: "Cale 持续音/中提琴期；Warhol 轨道，街头写实歌词。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Heroin",
        year: 1967,
        note: { en: "Accelerating drone form as art-rock / proto-punk teaching piece.", zh: "加速持续音曲式，art-rock / proto-punk 教学曲。" },
      },
      pioneeredGenres: ["alternative", "post-punk"],
      note: { en: "NYC art-rock before punk vocabulary existed.", zh: "朋克词汇出现前的纽约 art-rock。" },
    },
  },
  "the-verve": {
    interviewQuotes: [
      {
        text: "Bitter Sweet Symphony is a loop we fought over—and a song people never forgot.",
        speaker: "Richard Ashcroft",
        source: "Press interview excerpt",
        year: 1997,
      },
      {
        text: "Nick’s guitar is the weather system. I just walk through it.",
        speaker: "Richard Ashcroft",
        source: "Archive interview excerpt",
        year: 1998,
      },
    ],
    lyricQuotes: [
      "Cause it's a bittersweet symphony, this life",
      "The drugs don't work / They just make you worse",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Urban Hymns five", zh: "Urban Hymns 五人" },
        years: "1996–1999",
        peak: true,
        members: [
          { name: "Richard Ashcroft", role: "Vocals" },
          { name: "Nick McCabe", role: "Guitar" },
          { name: "Simon Jones", role: "Bass" },
          { name: "Peter Salisbury", role: "Drums" },
          { name: "Simon Tong", role: "Guitar, Keys" },
        ],
        note: { en: "McCabe wash + Ashcroft baritone; Britpop’s psychedelic wing.", zh: "McCabe 冲刷 + Ashcroft 男中音；Britpop 迷幻翼。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Bitter Sweet Symphony",
        year: 1997,
        note: { en: "Orchestral loop + strut vocal as late-Britpop monument.", zh: "管弦 loop + 踱步人声，晚期 Britpop 纪念碑。" },
      },
      pioneeredGenres: ["britpop", "alternative"],
      note: { en: "Sample litigation aside: the arrangement still teaches scale.", zh: "采样官司另说：编曲仍在教规模感。" },
    },
  },
  "the-white-stripes": {
    interviewQuotes: [
      {
        text: "Limitation is the point. Two colors, two people, no bass.",
        speaker: "Jack White",
        source: "Press interview excerpt",
        year: 2001,
      },
      {
        text: "Meg’s drums are the swing. Overplaying would kill it.",
        speaker: "Jack White",
        source: "Archive interview excerpt",
        year: 2003,
      },
    ],
    lyricQuotes: [
      "I'm gonna fight 'em off / A seven nation army couldn't hold me back",
      "Red blood / Can't be found on a white dress",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Duo", zh: "二人组" },
        years: "1997–2011",
        peak: true,
        members: [
          { name: "Jack White", role: "Vocals, Guitar" },
          { name: "Meg White", role: "Drums" },
        ],
        note: { en: "No bass; red/white visual rule; garage minimalism as hit craft.", zh: "无贝斯；红白视觉规则；garage 极简当热单工艺。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Seven Nation Army",
        year: 2003,
        note: { en: "Octave pedal riff as stadium chant from a duo.", zh: "八度踏板 riff，二人组变成体育场口号。" },
      },
      pioneeredGenres: ["indie-rock", "blues"],
      note: { en: "Detroit garage revival with blues economy.", zh: "底特律 garage 复兴，带蓝调经济性。" },
    },
  },
  "the-yardbirds": {
    interviewQuotes: [
      {
        text: "The rave-ups were arranged chaos. That was the lesson.",
        speaker: "Jeff Beck",
        source: "Press interview excerpt",
        year: 1966,
      },
      {
        text: "Shapes of Things was feedback as composition.",
        speaker: "Jeff Beck",
        source: "Guitar interview excerpt",
        year: 1967,
      },
    ],
    lyricQuotes: [
      "For your love / I'd give the moon and the stars above",
      "Shapes of things before my eyes / Just teach me to despise",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Jeff Beck peak", zh: "Jeff Beck 巅峰期" },
        years: "1965–1966",
        peak: true,
        members: [
          { name: "Keith Relf", role: "Vocals, Harmonica" },
          { name: "Jeff Beck", role: "Guitar" },
          { name: "Chris Dreja", role: "Guitar, Bass" },
          { name: "Jim McCarty", role: "Drums" },
          { name: "Paul Samwell-Smith", role: "Bass" },
        ],
        note: { en: "Beck between Clapton and Page; fuzz and feedback as pop singles.", zh: "Beck 介于 Clapton 与 Page；fuzz 与反馈当作流行单曲。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Shapes of Things",
        year: 1966,
        note: { en: "Feedback solo as psychedelic guitar pop citation.", zh: "反馈独奏，迷幻吉他流行引用点。" },
      },
      pioneeredGenres: ["blues", "rock-n-roll"],
      note: { en: "Blues-rock finishing school for Clapton/Beck/Page lineage.", zh: "Clapton/Beck/Page 谱系的蓝调摇滚进修学校。" },
    },
  },
  "them-crooked-vultures": {
    interviewQuotes: [
      {
        text: "It's three people who already know how to finish each other's riffs.",
        speaker: "Josh Homme",
        source: "Press interview excerpt",
        year: 2009,
      },
      {
        text: "John Paul Jones made the low end feel like arrangement, not just bass.",
        speaker: "Dave Grohl",
        source: "Archive interview excerpt",
        year: 2010,
      },
    ],
    lyricQuotes: [
      "New fang, new fang / Got it in my mouth",
      "Mind eraser, no chaser",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Supergroup trio", zh: "超级组合三人" },
        years: "2009–2010",
        peak: true,
        members: [
          { name: "Josh Homme", role: "Vocals, Guitar", personSlug: "josh-homme" },
          { name: "John Paul Jones", role: "Bass, Keys", personSlug: "john-paul-jones" },
          { name: "Dave Grohl", role: "Drums", personSlug: "dave-grohl" },
        ],
        note: { en: "Homme/Jones/Grohl one-album hard-rock summit.", zh: "Homme/Jones/Grohl 一张专的 hard-rock 高峰。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "New Fang",
        year: 2009,
        note: { en: "Stop-start riff as Vultures’ debut single stamp.", zh: "断续 riff，Vultures 出道单曲戳记。" },
      },
      pioneeredGenres: ["hard-rock", "alternative"],
      note: { en: "Desert rock meets Zeppelin arranging instincts.", zh: "沙漠摇滚遇上 Zeppelin 编曲本能。" },
    },
  },
  "tool": {
    interviewQuotes: [
      {
        text: "The odd times aren't math homework. They're grooves that lean.",
        speaker: "Danny Carey",
        source: "Drum interview excerpt",
        year: 2001,
      },
      {
        text: "We leave space. That silence is part of the riff.",
        speaker: "Adam Jones",
        source: "Guitar interview excerpt",
        year: 2001,
      },
    ],
    lyricQuotes: [
      "I know the pieces fit / 'Cause I watched them fall away",
      "Black then white are all I see / In my infancy",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Chancellor classic four", zh: "Chancellor 经典四人" },
        years: "1995–",
        peak: true,
        members: [
          { name: "Maynard James Keenan", role: "Vocals" },
          { name: "Adam Jones", role: "Guitar" },
          { name: "Justin Chancellor", role: "Bass" },
          { name: "Danny Carey", role: "Drums" },
        ],
        note: { en: "Chancellor replaces Keenan-era early bass; Lateralus peak form.", zh: "Chancellor 接替早期贝斯；Lateralus 峰值形态。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Schism",
        year: 2001,
        note: { en: "5/8–7/8 bass figure as progressive-metal radio anomaly.", zh: "5/8–7/8 贝斯型，progressive metal 电台异数。" },
      },
      pioneeredGenres: ["progressive-rock", "alternative"],
      note: { en: "Art-metal with video and polyrhythm as equal pillars.", zh: "艺术金属；影像与复节奏同等支柱。" },
    },
  },
  "wings": {
    interviewQuotes: [
      {
        text: "Wings was a band, not a solo disguise—though I wrote most of it.",
        speaker: "Paul McCartney",
        source: "Press interview excerpt",
        year: 1974,
      },
      {
        text: "Band on the Run was made under pressure and it sounds like freedom.",
        speaker: "Paul McCartney",
        source: "Archive interview excerpt",
        year: 1980,
      },
    ],
    lyricQuotes: [
      "Stuck inside these four walls / Sent inside forever",
      "Jet, Jet!",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Band on the Run core", zh: "Band on the Run 核心" },
        years: "1971–1981",
        peak: true,
        members: [
          { name: "Paul McCartney", role: "Vocals, Bass", personSlug: "paul-mccartney" },
          { name: "Linda McCartney", role: "Keys, Vocals" },
          { name: "Denny Laine", role: "Guitar, Vocals" },
        ],
        note: { en: "McCartney/Linda/Laine core through Band on the Run peak.", zh: "McCartney/Linda/Laine 核心，贯穿 Band on the Run 峰值。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Band on the Run",
        year: 1973,
        note: { en: "Multi-section pop-rock as Wings’ structural showcase.", zh: "多段体流行摇滚，Wings 结构展示曲。" },
      },
      pioneeredGenres: ["rock-n-roll", "hard-rock"],
      note: { en: "Post-Beatles McCartney band craft; hit economy with suite ambition.", zh: "后 Beatles 的 McCartney 乐队工艺；热单经济配组曲野心。" },
    },
  },
  "arctic-monkeys": {
    interviewQuotes: [
      {
        text: "I just wanted to be one of The Strokes.",
        speaker: "Alex Turner",
        source: "Lyric / interview crossover · quote wall",
        year: 2006,
      },
      {
        text: "We're still a guitar band. That hasn't changed.",
        speaker: "Matt Helders",
        source: "Press excerpt",
        year: 2018,
      },
    ],
    lyricQuotes: [
      "I just wanted to be one of The Strokes",
      "Do I wanna know if this feeling flows both ways?",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Whatever People Say / AM four", zh: "Whatever People Say / AM 四人" },
        years: "2002–",
        peak: true,
        members: [
          { name: "Alex Turner", role: "Vocals, Guitar" },
          { name: "Jamie Cook", role: "Guitar" },
          { name: "Nick O'Malley", role: "Bass" },
          { name: "Matt Helders", role: "Drums" },
        ],
        note: { en: "Sheffield indie to desert-rock polish; O’Malley locked after early churn.", zh: "谢菲尔德 indie 到沙漠摇滚抛光；早期更替后 O’Malley 锁定。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "I Bet You Look Good on the Dancefloor",
        year: 2006,
        note: { en: "Fast talk-sing + angular riff as mid-2000s UK indie ignition.", zh: "快嘴说唱 + 棱角 riff，2000 年代中期英国 indie 点火。" },
      },
      pioneeredGenres: ["indie-rock", "alternative"],
      note: { en: "Barstool observation into global guitar-band brand.", zh: "吧台观察变成全球吉他乐队品牌。" },
    },
  },
  "black-sabbath": {
    interviewQuotes: [
      {
        text: "We knew we had something different.",
        speaker: "Tony Iommi",
        source: "Interview excerpt",
        year: 2000,
      },
      {
        text: "The tritone was the devil's interval. We just made it a riff.",
        speaker: "Geezer Butler",
        source: "Press interview excerpt",
        year: 1992,
      },
    ],
    lyricQuotes: [
      "What is this that stands before me?",
      "Iron man / Has won the war",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Ozzy classic four", zh: "Ozzy 经典四人" },
        years: "1969–1979",
        peak: true,
        members: [
          { name: "Ozzy Osbourne", role: "Vocals", personSlug: "ozzy-osbourne" },
          { name: "Tony Iommi", role: "Guitar" },
          { name: "Geezer Butler", role: "Bass" },
          { name: "Bill Ward", role: "Drums" },
        ],
        note: { en: "Iommi downtune + Butler lyric myth; Paranoid era peak.", zh: "Iommi 降调 + Butler 神话歌词；Paranoid 期峰值。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Black Sabbath",
        year: 1970,
        note: { en: "Rain/bell intro into tritone riff as metal’s origin citation.", zh: "雨声/钟声进三全音 riff，金属起源引用。" },
      },
      pioneeredGenres: ["heavy-metal", "hard-rock"],
      note: { en: "Birmingham blues into heavy metal grammar.", zh: "伯明翰蓝调走进重金属语法。" },
    },
  },
  "chuck-berry": {
    interviewQuotes: [
      {
        text: "The guitar is the most important thing.",
        speaker: "Chuck Berry",
        source: "Interview excerpt",
        year: 1987,
      },
      {
        text: "If you can play the duck walk and the double-stops, you've got the show.",
        speaker: "Chuck Berry",
        source: "Archive interview · quote wall",
        year: 1972,
      },
    ],
    lyricQuotes: [
      "Go, Johnny, go",
      "Hail, hail rock and roll / Deliver me from the days of old",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Chuck + classic rock and roll band", zh: "Chuck + 经典摇滚乐队" },
        years: "1955–1965",
        peak: true,
        members: [
          { name: "Chuck Berry", role: "Vocals, Guitar" },
          { name: "Johnnie Johnson", role: "Piano" },
          { name: "Willie Dixon", role: "Bass" },
          { name: "Ebby Hardy", role: "Drums" },
        ],
        note: { en: "Berry as front + Chicago session rhythm; double-stop guitar school.", zh: "Berry 前台 + 芝加哥录音室节奏段；双音吉他课。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Johnny B. Goode",
        year: 1958,
        note: { en: "Intro lick as rock guitar’s first universal password.", zh: "前奏 lick，摇滚吉他的第一个通用口令。" },
      },
      pioneeredGenres: ["rock-n-roll", "blues"],
      note: { en: "Songwriting + showmanship template for guitar rock.", zh: "吉他摇滚的写歌 + 舞台模板。" },
    },
  },
  "elvis-presley": {
    interviewQuotes: [
      {
        text: "I don't know anything about music. In my line you don't have to.",
        speaker: "Elvis Presley",
        source: "Widely cited remark · quote wall",
        year: 1957,
      },
      {
        text: "Rhythm is something you either have or don't have.",
        speaker: "Elvis Presley",
        source: "Press interview excerpt",
        year: 1956,
      },
    ],
    lyricQuotes: [
      "You ain't nothin' but a hound dog",
      "Wise men say / Only fools rush in",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Sun / early RCA + TCB orbit", zh: "Sun / 早期 RCA + TCB 轨道" },
        years: "1954–1958",
        peak: true,
        members: [
          { name: "Elvis Presley", role: "Vocals, Guitar" },
          { name: "Scotty Moore", role: "Guitar" },
          { name: "Bill Black", role: "Bass" },
          { name: "D.J. Fontana", role: "Drums" },
        ],
        note: { en: "Moore/Black/Fontana as rockabilly engine behind the voice.", zh: "Moore/Black/Fontana 作人声背后的 rockabilly 引擎。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "That's All Right",
        year: 1954,
        note: { en: "Sun Studios jump-blues cover as rock and roll ignition tape.", zh: "Sun 录音室跳跃蓝调翻唱，摇滚点火带。" },
      },
      pioneeredGenres: ["rock-n-roll"],
      note: { en: "Voice + band chemistry as mass culture break.", zh: "人声 + 乐队化学反应，大众文化断裂点。" },
    },
  },
  "fleetwood-mac": {
    interviewQuotes: [
      {
        text: "We made Rumours while breaking up with each other.",
        speaker: "Lindsey Buckingham",
        source: "Press interview excerpt",
        year: 1977,
      },
      {
        text: "The arrangements had to be tighter than the relationships.",
        speaker: "Stevie Nicks",
        source: "Archive interview excerpt",
        year: 1978,
      },
    ],
    lyricQuotes: [
      "If I could / Baby I'd give you my world",
      "Thunder only happens when it's raining",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Rumours five", zh: "Rumours 五人组" },
        years: "1975–1987",
        peak: true,
        members: [
          { name: "Lindsey Buckingham", role: "Guitar, Vocals", personSlug: "lindsey-buckingham" },
          { name: "Stevie Nicks", role: "Vocals", personSlug: "stevie-nicks" },
          { name: "Christine McVie", role: "Keys, Vocals" },
          { name: "John McVie", role: "Bass" },
          { name: "Mick Fleetwood", role: "Drums" },
        ],
        note: { en: "Buckingham/Nicks/McVie writing triangle; studio pop-rock peak.", zh: "Buckingham/Nicks/McVie 写作三角；录音室流行摇滚峰值。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Go Your Own Way",
        year: 1977,
        note: { en: "Breakup letter as rock single; Buckingham guitar as argument.", zh: "分手信当摇滚单曲；Buckingham 吉他当争辩。" },
      },
      pioneeredGenres: ["rock-n-roll", "blues"],
      note: { en: "Blues-band name into California soft-rock machine.", zh: "蓝调乐队之名变成加州软摇滚机器。" },
    },
  },
  "fontaines-dc": {
    interviewQuotes: [
      {
        text: "We're a rock band from Dublin. That's enough.",
        speaker: "Grian Chatten",
        source: "Interview paraphrase",
        year: 2020,
      },
      {
        text: "The poems have to survive the volume.",
        speaker: "Grian Chatten",
        source: "Press interview excerpt",
        year: 2022,
      },
    ],
    lyricQuotes: [
      "I was started in the better land",
      "A hero's death / Is only for the brave",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Dogrel / A Hero's Death five", zh: "Dogrel / A Hero's Death 五人" },
        years: "2017–",
        peak: true,
        members: [
          { name: "Grian Chatten", role: "Vocals" },
          { name: "Carlos O'Connell", role: "Guitar" },
          { name: "Conor Curley", role: "Guitar" },
          { name: "Conor Deegan III", role: "Bass" },
          { name: "Tom Coll", role: "Drums" },
        ],
        note: { en: "Dublin post-punk; Chatten baritone over locked twin guitars.", zh: "都柏林后朋克；Chatten 男中音压在锁死双吉他上。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Boys in the Better Land",
        year: 2019,
        note: { en: "Motorik sprint + Dublin reportage as breakthrough single.", zh: "Motorik 疾跑 + 都柏林纪实，突破单曲。" },
      },
      pioneeredGenres: ["post-punk", "indie-rock"],
      note: { en: "Post-punk revival with literary swagger.", zh: "带文学姿态的后朋克复兴。" },
    },
  },
  "guns-n-roses": {
    interviewQuotes: [
      {
        text: "We were a real band from the street.",
        speaker: "Slash",
        source: "Press interview excerpt",
        year: 1992,
      },
      {
        text: "Appetite was recorded like a live wire. That's why it still cuts.",
        speaker: "Axl Rose",
        source: "Archive interview excerpt",
        year: 1988,
      },
    ],
    lyricQuotes: [
      "Welcome to the jungle, we got fun and games",
      "She's got a smile that it seems to me",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Appetite classic five", zh: "Appetite 经典五人" },
        years: "1985–1990",
        peak: true,
        members: [
          { name: "Axl Rose", role: "Vocals", personSlug: "axl-rose" },
          { name: "Slash", role: "Guitar", personSlug: "slash" },
          { name: "Izzy Stradlin", role: "Guitar", personSlug: "izzy-stradlin" },
          { name: "Duff McKagan", role: "Bass", personSlug: "duff-mckagan" },
          { name: "Steven Adler", role: "Drums", personSlug: "steven-adler" },
        ],
        note: { en: "Adler swing + Slash/Izzy guitars; Appetite as hard-rock reset.", zh: "Adler 摇摆 + Slash/Izzy 吉他；Appetite 作 hard-rock 重置。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Welcome to the Jungle",
        year: 1987,
        note: { en: "Whistle + divebomb intro as late-80s hard-rock ignition.", zh: "口哨 + 俯冲突进前奏，80 年代末 hard-rock 点火。" },
      },
      pioneeredGenres: ["hard-rock"],
      note: { en: "LA street hard rock against glam excess.", zh: "洛杉矶街头 hard rock，对上 glam 过量。" },
    },
  },
  "joy-division": {
    interviewQuotes: [
      {
        text: "I used to think of myself as an artist.",
        speaker: "Ian Curtis",
        source: "Letter / interview material",
        year: 1979,
      },
      {
        text: "The space between the notes was the atmosphere.",
        speaker: "Bernard Sumner",
        source: "Press interview excerpt",
        year: 1988,
      },
    ],
    lyricQuotes: [
      "Love will tear us apart again",
      "She's lost control again",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Classic four", zh: "经典四人组" },
        years: "1976–1980",
        peak: true,
        members: [
          { name: "Ian Curtis", role: "Vocals" },
          { name: "Bernard Sumner", role: "Guitar", personSlug: "bernard-sumner" },
          { name: "Peter Hook", role: "Bass", personSlug: "peter-hook" },
          { name: "Stephen Morris", role: "Drums" },
        ],
        note: { en: "Hook high bass + Morris machine drums; Curtis as baritone center.", zh: "Hook 高音贝斯 + Morris 机械鼓；Curtis 男中音中心。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Love Will Tear Us Apart",
        year: 1980,
        note: { en: "Synth hook + Curtis vocal as post-punk’s most cited single.", zh: "合成钩子 + Curtis 人声，后朋克最高频引用单曲。" },
      },
      pioneeredGenres: ["post-punk"],
      note: { en: "Manchester post-punk austerity; Factory as method.", zh: "曼彻斯特后朋克克制；Factory 即方法。" },
    },
  },
  "judas-priest": {
    interviewQuotes: [
      {
        text: "Leather and studs became the uniform because it looked like the music sounded.",
        speaker: "Rob Halford",
        source: "Press interview excerpt",
        year: 1984,
      },
      {
        text: "Twin leads are the grammar. Everything else is dialect.",
        speaker: "Glenn Tipton",
        source: "Guitar interview excerpt",
        year: 1980,
      },
    ],
    lyricQuotes: [
      "There I was completely wasting, out of work and down",
      "Faster than a bullet / Terrifying scream",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "British Steel / Screaming for Vengeance", zh: "British Steel / Screaming for Vengeance" },
        years: "1978–1990",
        peak: true,
        members: [
          { name: "Rob Halford", role: "Vocals", personSlug: "rob-halford" },
          { name: "Glenn Tipton", role: "Guitar", personSlug: "glenn-tipton" },
          { name: "K.K. Downing", role: "Guitar" },
          { name: "Ian Hill", role: "Bass" },
          { name: "Dave Holland", role: "Drums" },
        ],
        note: { en: "Halford range + Tipton/Downing twin leads; metal uniform codified.", zh: "Halford 音域 + Tipton/Downing 双主音；金属制服法典化。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Breaking the Law",
        year: 1980,
        note: { en: "Short riff + Halford shout as NWOBHM radio face.", zh: "短 riff + Halford 喊叫，NWOBHM 电台面孔。" },
      },
      pioneeredGenres: ["heavy-metal"],
      note: { en: "Leather-metal archetype; twin-guitar heavy metal school.", zh: "皮衣金属原型；双吉他重金属课。" },
    },
  },
  "megadeth": {
    interviewQuotes: [
      {
        text: "I was kicked out of Metallica for drinking too much and being an asshole.",
        speaker: "Dave Mustaine",
        source: "Press interview excerpt",
        year: 1990,
      },
      {
        text: "Marty and I wrote parts that chase each other.",
        speaker: "Dave Mustaine",
        source: "Guitar interview excerpt",
        year: 1992,
      },
    ],
    lyricQuotes: [
      "What do you mean I don't believe in God? / I talk to him every day",
      "Holy wars / The punishment due",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Countdown / Rust in Peace four", zh: "Countdown / Rust in Peace 四人" },
        years: "1990–1998",
        peak: true,
        members: [
          { name: "Dave Mustaine", role: "Vocals, Guitar", personSlug: "dave-mustaine" },
          { name: "David Ellefson", role: "Bass", personSlug: "dave-ellefson" },
          { name: "Marty Friedman", role: "Guitar", personSlug: "marty-friedman" },
          { name: "Nick Menza", role: "Drums" },
        ],
        note: { en: "Friedman lead era; technical thrash peak.", zh: "Friedman 主音期；技术 thrash 峰值。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Holy Wars... The Punishment Due",
        year: 1990,
        note: { en: "Two-part thrash suite as Rust in Peace teaching track.", zh: "两段 thrash 组曲，Rust in Peace 教学曲。" },
      },
      pioneeredGenres: ["thrash-metal", "heavy-metal"],
      note: { en: "Mustaine thrash after Metallica exile; precision as revenge.", zh: "Mustaine 在 Metallica 开除后的 thrash；精度当复仇。" },
    },
  },
  "metallica": {
    interviewQuotes: [
      {
        text: "We play metal. That's what we do.",
        speaker: "James Hetfield",
        source: "Interview excerpt",
        year: 1991,
      },
      {
        text: "Cliff taught us that the bass can be a lead voice.",
        speaker: "Lars Ulrich",
        source: "Archive interview excerpt",
        year: 1986,
      },
    ],
    lyricQuotes: [
      "Exit light, enter night",
      "Master of puppets, I'm pulling your strings",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Cliff Burton classic four", zh: "Cliff Burton 经典四人" },
        years: "1982–1986",
        peak: true,
        members: [
          { name: "James Hetfield", role: "Vocals, Guitar" },
          { name: "Lars Ulrich", role: "Drums" },
          { name: "Kirk Hammett", role: "Guitar" },
          { name: "Cliff Burton", role: "Bass" },
        ],
        note: { en: "Burton era through Master of Puppets; thrash arrangement summit.", zh: "Burton 时代贯穿 Master of Puppets；thrash 编曲顶点。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Seek & Destroy",
        year: 1983,
        note: { en: "Early thrash riff school as Kill 'Em All teaching cut.", zh: "早期 thrash riff 课，Kill 'Em All 教学曲。" },
      },
      pioneeredGenres: ["heavy-metal"],
      note: { en: "Bay Area thrash into global metal standard.", zh: "湾区 thrash 变成全球金属标准。" },
    },
  },
  "oasis": {
    interviewQuotes: [
      {
        text: "We're the best band in the world.",
        speaker: "Noel Gallagher",
        source: "Press bravado · quote wall",
        year: 1996,
      },
      {
        text: "Noel writes them. I sing them like I mean every word.",
        speaker: "Liam Gallagher",
        source: "Press interview excerpt",
        year: 1995,
      },
    ],
    lyricQuotes: [
      "Maybe you're gonna be the one that saves me",
      "Today is gonna be the day that they're gonna throw it back to you",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Definitely Maybe / Morning Glory five", zh: "Definitely Maybe / Morning Glory 五人" },
        years: "1991–1999",
        peak: true,
        members: [
          { name: "Liam Gallagher", role: "Vocals", personSlug: "liam-gallagher" },
          { name: "Noel Gallagher", role: "Guitar, Vocals", personSlug: "noel-gallagher" },
          { name: "Paul Arthurs", role: "Guitar" },
          { name: "Paul McGuigan", role: "Bass" },
          { name: "Alan White", role: "Drums" },
        ],
        note: { en: "Gallagher brothers core; Bonehead/Guigsy early rhythm.", zh: "Gallagher 兄弟核心；Bonehead/Guigsy 早期节奏段。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Live Forever",
        year: 1994,
        note: { en: "Optimistic climb as Britpop’s emotional counter to grunge.", zh: "乐观爬升，Britpop 对 grunge 的情绪对位。" },
      },
      pioneeredGenres: ["britpop", "alternative"],
      note: { en: "Manchester swagger + Beatles chords at stadium volume.", zh: "曼彻斯特狂妄 + Beatles 和弦的体育场音量。" },
    },
  },
  "pixies": {
    interviewQuotes: [
      {
        text: "We were trying to be the next Husker Du and failed into something better.",
        speaker: "Black Francis",
        source: "Press interview excerpt",
        year: 1989,
      },
      {
        text: "The quiet-loud thing was just dynamics. Nirvana made it a movement.",
        speaker: "Kim Deal",
        source: "Archive interview excerpt",
        year: 1994,
      },
    ],
    lyricQuotes: [
      "With your feet on the air and your head on the ground",
      "Got me a movie / I want you to know",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Classic four", zh: "经典四人组" },
        years: "1986–1993",
        peak: true,
        members: [
          { name: "Black Francis", role: "Vocals, Guitar", personSlug: "black-francis" },
          { name: "Kim Deal", role: "Bass, Vocals", personSlug: "kim-deal" },
          { name: "Joey Santiago", role: "Guitar" },
          { name: "David Lovering", role: "Drums" },
        ],
        note: { en: "Francis/Deal dual vocal; Surfer Rosa / Doolittle soft-loud school.", zh: "Francis/Deal 双人声；Surfer Rosa / Doolittle 强弱课。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Debaser",
        year: 1989,
        note: { en: "Un Chien Andalou shout + stop-start riff as Pixies ID.", zh: "《一条安达鲁狗》喊叫 + 断续 riff，Pixies 身份。" },
      },
      pioneeredGenres: ["alternative", "indie-rock"],
      note: { en: "Boston indie: surreal lyric + soft-loud template for 90s alt.", zh: "波士顿 indie：超现实歌词 + 90 年代 alt 的强弱模板。" },
    },
  },
  "smashing-pumpkins": {
    interviewQuotes: [
      {
        text: "I multi-tracked until the guitars were a wall.",
        speaker: "Billy Corgan",
        source: "Studio interview excerpt",
        year: 1993,
      },
      {
        text: "Jimmy’s drums have to be as melodic as the guitars.",
        speaker: "Billy Corgan",
        source: "Press interview excerpt",
        year: 1995,
      },
    ],
    lyricQuotes: [
      "Despite all my rage I am still just a rat in a cage",
      "Shakedown 1979 / Cool kids never have the time",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Siamese / Mellon Collie four", zh: "Siamese / Mellon Collie 四人" },
        years: "1988–1996",
        peak: true,
        members: [
          { name: "Billy Corgan", role: "Vocals, Guitar", personSlug: "billy-corgan" },
          { name: "James Iha", role: "Guitar" },
          { name: "D'arcy Wretzky", role: "Bass" },
          { name: "Jimmy Chamberlin", role: "Drums", personSlug: "jimmy-chamberlin" },
        ],
        note: { en: "Corgan multi-track auteur; Chamberlin jazz-metal drums.", zh: "Corgan 多轨作者；Chamberlin 爵士-金属鼓。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Today",
        year: 1993,
        note: { en: "Bright chords over dark lyric as Siamese Dream radio face.", zh: "明亮和弦压黑暗歌词，Siamese Dream 电台面孔。" },
      },
      pioneeredGenres: ["alternative", "indie-rock"],
      note: { en: "Chicago alt: wall-of-guitar ambition against punk minimalism.", zh: "芝加哥 alt：墙式吉他野心对上朋克极简。" },
    },
  },
  "sonic-youth": {
    interviewQuotes: [
      {
        text: "The tuning is the song before the song.",
        speaker: "Thurston Moore",
        source: "Guitar interview excerpt",
        year: 1988,
      },
      {
        text: "Kim’s voice and bass made the art-noise into songs.",
        speaker: "Lee Ranaldo",
        source: "Press interview excerpt",
        year: 1990,
      },
    ],
    lyricQuotes: [
      "It is an anthem for the kids of today",
      "Kool thing sitting with a butt like that",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Daydream / Goo / Dirty four", zh: "Daydream / Goo / Dirty 四人" },
        years: "1985–2011",
        peak: true,
        members: [
          { name: "Thurston Moore", role: "Guitar, Vocals", personSlug: "thurston-moore" },
          { name: "Kim Gordon", role: "Bass, Vocals", personSlug: "kim-gordon" },
          { name: "Lee Ranaldo", role: "Guitar, Vocals" },
          { name: "Steve Shelley", role: "Drums" },
        ],
        note: { en: "Alternate tunings as method; Gordon/Moore dual front.", zh: "非常规调弦即方法；Gordon/Moore 双前台。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Teen Age Riot",
        year: 1988,
        note: { en: "Open tuning anthem as Daydream Nation gateway.", zh: "开放调弦颂歌，Daydream Nation 入口。" },
      },
      pioneeredGenres: ["alternative", "indie-rock"],
      note: { en: "NYC noise into alt-rock song form.", zh: "纽约 noise 走进 alt-rock 歌曲形式。" },
    },
  },
  "soundgarden": {
    interviewQuotes: [
      {
        text: "We were a hard-rock band that happened to be from Seattle.",
        speaker: "Kim Thayil",
        source: "Press interview excerpt",
        year: 1994,
      },
      {
        text: "Odd meters aren't prog. They're just how the riff wants to sit.",
        speaker: "Matt Cameron",
        source: "Drum interview excerpt",
        year: 1994,
      },
    ],
    lyricQuotes: [
      "Times are gone for honest men",
      "In my eyes / Indisposed",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Badmotorfinger / Superunknown four", zh: "Badmotorfinger / Superunknown 四人" },
        years: "1990–1997",
        peak: true,
        members: [
          { name: "Chris Cornell", role: "Vocals", personSlug: "chris-cornell" },
          { name: "Kim Thayil", role: "Guitar" },
          { name: "Ben Shepherd", role: "Bass" },
          { name: "Matt Cameron", role: "Drums", personSlug: "matt-cameron" },
        ],
        note: { en: "Cornell range + Thayil drop tunings; Shepherd era peak.", zh: "Cornell 音域 + Thayil 降调；Shepherd 时代峰值。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Black Hole Sun",
        year: 1994,
        note: { en: "Psychedelic chorus as Superunknown’s unlikely radio smash.", zh: "迷幻副歌，Superunknown 出人意料的电台热单。" },
      },
      pioneeredGenres: ["grunge", "hard-rock"],
      note: { en: "Seattle hard rock with Sabbath DNA; not flannel stereotype.", zh: "带 Sabbath DNA 的西雅图 hard rock；不是法兰绒刻板。" },
    },
  },
  "tame-impala": {
    interviewQuotes: [
      {
        text: "I just follow what sounds good.",
        speaker: "Kevin Parker",
        source: "Interview excerpt",
        year: 2015,
      },
      {
        text: "The band onstage is interpretation. The record is me.",
        speaker: "Kevin Parker",
        source: "Press interview excerpt",
        year: 2015,
      },
    ],
    lyricQuotes: [
      "I feel like I was living for you",
      "Let it happen / Let it happen",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Kevin Parker project", zh: "Kevin Parker 个人项目" },
        years: "2007–",
        peak: true,
        members: [
          { name: "Kevin Parker", role: "Vocals, Instruments, Production" },
        ],
        note: { en: "Studio-as-band; live members rotate around Parker’s mixes.", zh: "录音室即乐队；现场成员围着 Parker 混音轮换。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Let It Happen",
        year: 2015,
        note: { en: "Loop-breakdown single as Currents’ dance-psych thesis.", zh: "Loop 崩解单曲，Currents 的舞曲迷幻论题。" },
      },
      pioneeredGenres: ["psychedelic", "indie-rock"],
      note: { en: "One-man psychedelic pop; disco pulse under guitar haze.", zh: "一人迷幻流行；吉他雾下的 disco 脉冲。" },
    },
  },
  "the-clash": {
    interviewQuotes: [
      {
        text: "The future is unwritten.",
        speaker: "Joe Strummer",
        source: "Later credo / interview · quote wall",
        year: 2002,
      },
      {
        text: "We're a garage band that learned the world was bigger than garage.",
        speaker: "Mick Jones",
        source: "Press interview excerpt",
        year: 1980,
      },
    ],
    lyricQuotes: [
      "London calling to the faraway towns",
      "Should I stay or should I go?",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Classic four", zh: "经典四人组" },
        years: "1977–1982",
        peak: true,
        members: [
          { name: "Joe Strummer", role: "Vocals, Guitar" },
          { name: "Mick Jones", role: "Guitar, Vocals" },
          { name: "Paul Simonon", role: "Bass" },
          { name: "Topper Headon", role: "Drums" },
        ],
        note: { en: "Strummer/Jones writing; reggae/funk into punk expansion.", zh: "Strummer/Jones 写作；reggae/funk 扩写朋克。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "London Calling",
        year: 1979,
        note: { en: "Alarm-bell intro as punk-into-world citation.", zh: "警钟前奏，朋克走向世界的引用点。" },
      },
      pioneeredGenres: ["punk", "post-punk"],
      note: { en: "Political punk with musical appetite beyond three chords.", zh: "政治朋克，音乐胃口超出三和弦。" },
    },
  },
  "the-cure": {
    interviewQuotes: [
      {
        text: "I think of the Cure as a continuum.",
        speaker: "Robert Smith",
        source: "Press interview excerpt",
        year: 1989,
      },
      {
        text: "The bass has to carry the gloom so the guitar can bloom.",
        speaker: "Simon Gallup",
        source: "Archive interview excerpt",
        year: 1985,
      },
    ],
    lyricQuotes: [
      "Show me how you do it and I promise you / I promise that I'll run away with you",
      "Whenever I'm alone with you / You make me feel like I am home again",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Head on the Door / Kiss Me era", zh: "Head on the Door / Kiss Me 时期" },
        years: "1985–1992",
        peak: true,
        members: [
          { name: "Robert Smith", role: "Vocals, Guitar", personSlug: "robert-smith" },
          { name: "Simon Gallup", role: "Bass", personSlug: "simon-gallup" },
          { name: "Porl Thompson", role: "Guitar" },
          { name: "Boris Williams", role: "Drums" },
          { name: "Lol Tolhurst", role: "Keys" },
        ],
        note: { en: "Smith as constant; Gallup bass as gloom engine.", zh: "Smith 为常量；Gallup 贝斯作阴郁引擎。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "A Forest",
        year: 1980,
        note: { en: "Delay guitar + Gallup bass as Cure’s early post-punk stamp.", zh: "延时吉他 + Gallup 贝斯，Cure 早期后朋克戳记。" },
      },
      pioneeredGenres: ["post-punk", "new-wave"],
      note: { en: "Goth-adjacent post-punk into alt-pop longevity.", zh: "邻哥特的后朋克，走进 alt-pop 长寿。" },
    },
  },
  "the-doors": {
    interviewQuotes: [
      {
        text: "Expose yourself to your deepest fear; after that, fear has no power.",
        speaker: "Jim Morrison",
        source: "Press/poetry interview excerpt",
        year: 1969,
      },
      {
        text: "No bass player. Ray’s left hand was the bass.",
        speaker: "Robby Krieger",
        source: "Archive interview excerpt",
        year: 1970,
      },
    ],
    lyricQuotes: [
      "You know that it would be untrue / You know that I would be a liar",
      "Riders on the storm",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Classic four", zh: "经典四人组" },
        years: "1965–1971",
        peak: true,
        members: [
          { name: "Jim Morrison", role: "Vocals", personSlug: "jim-morrison" },
          { name: "Ray Manzarek", role: "Keys", personSlug: "ray-manzarek" },
          { name: "Robby Krieger", role: "Guitar" },
          { name: "John Densmore", role: "Drums" },
        ],
        note: { en: "Manzarek left-hand bass; Morrison as baritone theater.", zh: "Manzarek 左手贝斯；Morrison 男中音剧场。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Light My Fire",
        year: 1967,
        note: { en: "Organ solo + Krieger melody as psychedelic radio breakthrough.", zh: "风琴独奏 + Krieger 旋律，迷幻电台突破。" },
      },
      pioneeredGenres: ["psychedelic", "blues"],
      note: { en: "LA psychedelic rock with blues and poetry posture.", zh: "洛杉矶迷幻摇滚，带蓝调与诗姿态。" },
    },
  },
  "the-jimi-hendrix-experience": {
    interviewQuotes: [
      {
        text: "Knowledge speaks, but wisdom listens.",
        speaker: "Jimi Hendrix",
        source: "Attributed remark · quote wall",
        year: 1969,
      },
      {
        text: "Mitch and Noel gave me room to set the guitar on fire—literally and not.",
        speaker: "Jimi Hendrix",
        source: "Press interview excerpt",
        year: 1967,
      },
    ],
    lyricQuotes: [
      "Excuse me while I kiss the sky",
      "Purple haze all in my brain",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Experience trio", zh: "Experience 三人组" },
        years: "1966–1969",
        peak: true,
        members: [
          { name: "Jimi Hendrix", role: "Vocals, Guitar" },
          { name: "Noel Redding", role: "Bass" },
          { name: "Mitch Mitchell", role: "Drums" },
        ],
        note: { en: "Hendrix as guitar/voice; Mitchell jazz-rock drums.", zh: "Hendrix 吉他/人声；Mitchell 爵士摇滚鼓。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Purple Haze",
        year: 1967,
        note: { en: "Haze riff + octave solo as psychedelic guitar’s passport.", zh: "Haze riff + 八度独奏，迷幻吉他通行证。" },
      },
      pioneeredGenres: ["psychedelic", "hard-rock"],
      note: { en: "Electric blues into psychedelic hard rock in a trio format.", zh: "电蓝调在三人编制里走进迷幻 hard rock。" },
    },
  },
  "the-police": {
    interviewQuotes: [
      {
        text: "We were a trio. That was the discipline.",
        speaker: "Stewart Copeland",
        source: "Press interview excerpt",
        year: 2007,
      },
      {
        text: "Reggae space made the songs breathe. Punk would have filled every gap.",
        speaker: "Sting",
        source: "Archive interview excerpt",
        year: 1983,
      },
    ],
    lyricQuotes: [
      "Roxanne, you don't have to put on the red light",
      "Every breath you take, every move you make",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Classic trio", zh: "经典三人组" },
        years: "1977–1986",
        peak: true,
        members: [
          { name: "Sting", role: "Vocals, Bass", personSlug: "sting" },
          { name: "Andy Summers", role: "Guitar", personSlug: "andy-summers" },
          { name: "Stewart Copeland", role: "Drums", personSlug: "stewart-copeland" },
        ],
        note: { en: "Reggae-punk economy; Summers chorus/delay as texture.", zh: "Reggae-朋克经济；Summers 合唱/延时作织体。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Roxanne",
        year: 1978,
        note: { en: "Sparse reggae-rock as Police’s first permanent ID.", zh: "稀疏 reggae-rock，Police 第一个永久身份。" },
      },
      pioneeredGenres: ["rock-n-roll", "alternative"],
      note: { en: "Trio discipline: space, harmony, Copeland’s hi-hat language.", zh: "三人纪律：留白、和声、Copeland 踩镲语言。" },
    },
  },
  "the-strokes": {
    interviewQuotes: [
      {
        text: "We just wanted to make cool music.",
        speaker: "Julian Casablancas",
        source: "Interview excerpt",
        year: 2002,
      },
      {
        text: "The guitars lock like one instrument. That’s the New York part.",
        speaker: "Nick Valensi",
        source: "Press interview excerpt",
        year: 2003,
      },
    ],
    lyricQuotes: [
      "Last night she said, oh baby I don't know",
      "Is this it?",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Is This It five", zh: "Is This It 五人" },
        years: "1998–",
        peak: true,
        members: [
          { name: "Julian Casablancas", role: "Vocals" },
          { name: "Nick Valensi", role: "Guitar" },
          { name: "Albert Hammond Jr.", role: "Guitar" },
          { name: "Nikolai Fraiture", role: "Bass" },
          { name: "Fabrizio Moretti", role: "Drums" },
        ],
        note: { en: "Twin-guitar NYC revival; Is This It as garage-indie reset.", zh: "双吉他纽约复兴；Is This It 作 garage-indie 重置。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "Last Nite",
        year: 2001,
        note: { en: "Compressed riff + deadpan vocal as early-2000s indie ignition.", zh: "压缩 riff + 面无表情人声，2000 年代初 indie 点火。" },
      },
      pioneeredGenres: ["indie-rock", "post-punk"],
      note: { en: "Garage revival that re-centered guitar bands for a decade.", zh: "车库复兴，让吉他乐队重新成为十年中心。" },
    },
  },
  "the-who": {
    interviewQuotes: [
      {
        text: "Rock is art and the stuff of life.",
        speaker: "Pete Townshend",
        source: "Interview excerpt",
        year: 1970,
      },
      {
        text: "Keith played the drums like a lead instrument. We arranged around that.",
        speaker: "Pete Townshend",
        source: "Archive interview excerpt",
        year: 1971,
      },
    ],
    lyricQuotes: [
      "I hope I die before I get old",
      "People try to put us d-down / Just because we get around",
    ],
    lineupVersions: [
      {
        id: "peak",
        label: { en: "Classic four", zh: "经典四人组" },
        years: "1964–1978",
        peak: true,
        members: [
          { name: "Roger Daltrey", role: "Vocals" },
          { name: "Pete Townshend", role: "Guitar" },
          { name: "John Entwistle", role: "Bass" },
          { name: "Keith Moon", role: "Drums" },
        ],
        note: { en: "Townshend windmill + Moon lead drums; Entwistle as melodic bass.", zh: "Townshend 风车 + Moon 主奏式鼓；Entwistle 旋律贝斯。" },
      },
    ],
    landmark: {
      debutTrack: {
        title: "My Generation",
        year: 1965,
        note: { en: "Stutter vocal + Entwistle solo as mod-rock manifesto.", zh: "口吃人声 + Entwistle 独奏，mod-rock 宣言。" },
      },
      pioneeredGenres: ["rock-n-roll", "hard-rock"],
      note: { en: "Maximum R&B into rock opera ambition; destruction as theater.", zh: "Maximum R&B 走进摇滚歌剧野心；毁坏当剧场。" },
    },
  },
};

/**
 * ===================================================================
 * 🎂 BIRTHDAY SURPRISE WEBSITE CONFIGURATION 🎂
 * ===================================================================
 * Easily customize this entire website by editing the values below!
 * You can change texts, the passcode, photos, videos, memories, and more.
 * (Supports .jpg, .png, .webp, .svg images & .mp4 videos)
 */

export const birthdayConfig = {
  // 💖 Basic Details
  herName: "Cutie", // Her name displayed throughout the site
  nickname: "Cutie", // Cute nickname used in little notes
  passcode: "1108", // 4-digit passcode to unlock the surprise (e.g. birthday or anniversary)
  birthdayDate: "October 10, 2026", // Formatted birthday date string

  // 🎵 Music Settings (Disabled as requested)
  music: "",

  // 🖼️ Profile Photo (First Screen)
  profilePhoto: "assets/gallery/upload_1790755261827.png",
  profilePhotoCaption: "For my favorite person in the whole universe ✨",

  // 🌟 Wish Page Photo (Replaces the cake cats emoji)
  wishPhoto: "assets/gallery/upload_1790756322098.png",

  // 📸 Screen 7: Our Memories (Scrapbook Gallery & Video Reels)
  gift1Memories: [
    {
      type: 'note',
      title: '<span class="lyric-small">We were just</span><br><span class="lyric-large" style="font-size: 5.5rem;">Kids</span>',
      message: '<span class="lyric-small" style="margin-top: 15px; display: block;">when we fell in love...</span>',
    },
    {
      type: 'photo',
      image: 'assets/gallery/upload_1790628274481.png',
      caption: 'Jab hum dono sath hote hain, toh sab kuch ekdum perfect lagta hai 💖',
      date: 'Meri life ki sabse khoobsurat memory tumhare sath hai.',
    },
    {
      type: 'photo',
      image: 'assets/gallery/upload_1790628294333.png',
      caption: 'Jhumke, aur tumhari pyari si smile... you look absolutely stunning! ✨',
      date: 'Aise hi hamesha khush rehna, meri pyari Sheetal.',
    },
    {
      type: 'note',
      title: '<span class="lyric-small">Not knowing</span><br><span class="lyric-large" style="font-size: 3.5rem;">what it was</span>',
      message: '',
    },
    {
      type: 'photo',
      image: 'assets/gallery/upload_1790628311780.png',
      caption: 'Teri smile aur simplicity hi tujhe sabse zyada pretty banati hai. ♡',
      date: 'Sach kahu toh tum Indian attire mein sabse sundar lagti ho 💖',
    },
    {
      type: 'photo',
      image: 'shinchan/bubu-dudu-kiss-0.gif',
      caption: 'Tumhare gale lagna duniya ki sabse sukoon wali feeling hai 💖',
      date: 'Bas man karta hai ki hamesha aise hi tumhare paas rahun.',
    },
    {
      type: 'note',
      title: '<span class="lyric-small">I will not</span><br><span class="lyric-large" style="font-size: 4.2rem;">give you up</span>',
      message: '<span class="lyric-small" style="margin-top: 15px; display: block;">this time.</span>',
    },
    {
      type: 'photo',
      image: 'assets/gallery/upload_1790628335096.png',
      caption: 'Tum meri life mein itni warmth aur roshni le aati ho 🏡',
      date: 'Tum hi mera ghar ho, mera sukoon ho, aur meri khushi.',
    },
    {
      type: 'photo',
      image: 'shinchan/peach-cat-hug-0.gif',
      caption: 'Chahe kuch bhi ho jaye, main hamesha tumhare saath khada rahunga 🫂',
      date: 'Har mushkil mein tumhara haath thame hue.',
    },
    {
      type: 'note',
      title: '<span class="lyric-large" style="font-size: 3.5rem;">Baby, I\'m</span><br><span class="lyric-small">dancing in the dark...</span>',
      message: '',
    },
    {
      type: 'photo',
      image: 'shinchan/bubu-dudu-1.gif',
      caption: 'Mujhe hamari aadhi raat wali random ladiya bahut pasand hai and tumko irritate krne mein bhut majee aate hain 💬',
      date: 'Aur hamari bina baat ki pagalon wali hasi... sach me tum meri best friend ho.',
    },
    {
      type: 'photo',
      image: 'shinchan/cat-kiss-0.gif',
      caption: 'Mere sabse bekar dino mein bhi, sirf tumhe dekh kar sab theek ho jata hai 🌸',
      date: 'Tumhara saath hi meri sabse badi dawai hai.',
    },
    {
      type: 'photo',
      image: 'shinchan/mochi-cat-love-0.gif',
      caption: 'Main roz raat taro se yahi kehta hu ki main kitna lucky hu jo tum mujhe mili 🤫',
      date: 'My girl, tum hi meri puri duniya ho.',
    },
    {
      type: 'note',
      title: '<span class="lyric-small">You look</span><br><span class="lyric-large" style="font-size: 4rem;">Perfect</span>',
      message: '<span class="lyric-small" style="margin-top: 15px; display: block;">tonight.</span>',
    },
    {
      type: 'photo',
      image: 'gifs/peach-goma.gif',
      caption: 'Happiest Birthday to the love of my life! 🎉🎂',
      date: 'You look perfect tonight, and I will love you endlessly.',
    }
  ],

  // 💌 Screen 6: Birthday Letter
  letterTitle: "Happiest Birthday Sheetal ♡",
  letterGreeting: "Happiest Birthday Sheetal ♡",
  letterParagraphs: [
    "I wish bhagwan tumhe saari khushiyan aur duniya bhar ki happiness de. May you always be the happiest person and keep smiling .",
    "Hope this year brings you more joy aur tumhe wo sab mile jo tum chahti ho.",
    "You are the most beautiful part of my life. Tum sach mein meri fav. person ho. You make me the happiest and annoy me too 😂",
    "Thank you for staying in my life, mujhe itna samajhne ke liye. Thank you hamesha mere liye hone ke liye.",
    "Once again happiest birthday! May we celebrate all your birthdays in life together aise hi."
  ],

fiveThings: [
  `You were the best unplanned thing that ever happened in my life... Jis din aap merko pasand aaye, woh din hamesha mere liye bohot special rahega. ♡`,
  `School mein jab apn dono ek dusre ko dekh kar khush ho jaate the... kitna acha time tha woh, bina kuch bole bhi sab samajh aa jata tha.`,
  `Terko school mein dekhna, isharo mein baat karna, tere saath Ludo khelna... yeh sab meri life ki sabse achhi aur favourite memories mein se hain.`,
  `Pichli baar tere birthday par apn saath toh nahi the, par kam se kam ek dusre ko samajhte the, dekh sakte the aur khush the... woh din sach mein bohot ache the.`,
  `Aur last baat — tu genuinely bohot achhi hai, kaafi caring hai aur sabse alag hai. Tune genuinely merse pyaar kiya, uske liye aur meri life mein aane ke liye, meri zindagi ka itna special hissa banne ke liye thank you, Sheetal. Hamesha aise hi khush rehna aur haste rehna... God bless you always ♡`
],
  // 📸 Screen 7: Our Memories (Scrapbook Gallery & Video Reels)
  // Supports both photos and interactive videos!
  memories: [
    {
      type: "video",
      video: "assets/video1.mp4",
      image: "assets/images/photo1.svg",
      caption: "Our Special Birthday Reel 🎬✨",
      date: "Special Video",
      rotation: -3,
      tag: "Video Memory"
    },
    {
      type: "video",
      video: "assets/video2.mp4",
      image: "assets/images/photo2.svg",
      caption: "Sweet moments that make me smile every time 💕",
      date: "Special Video",
      rotation: 3,
      tag: "Video Reel"
    },
    {
      type: "image",
      image: "assets/images/photo3.svg",
      caption: "Every little moment with you is an adventure 💕",
      date: "Sweet Moments",
      rotation: -2,
      tag: "Adventures"
    },
    {
      type: "image",
      image: "assets/images/photo4.svg",
      caption: "Laughed until our stomachs hurt that afternoon 😂",
      date: "Silly Times",
      rotation: 4,
      tag: "Laughter"
    },
    {
      type: "image",
      image: "assets/images/photo5.svg",
      caption: "Golden hour and your golden heart 🌅",
      date: "Forever Treasured",
      rotation: -3,
      tag: "Sunset Walks"
    },
    {
      type: "image",
      image: "assets/images/photo6.svg",
      caption: "Just you being the absolute cutest 🧸",
      date: "My Favorite View",
      rotation: 1,
      tag: "Heartthrob"
    }
  ],

  // 💖 Screen 8: Things That Make You Special (Interactive Reveal Cards)
  specialThings: [
    {
      id: 1,
      title: "Your Sweet Smile",
      icon: "✨",
      color: "#F9EBEA",
      description: "How your whole face lights up and instantly makes everything in the room ten times better."
    },
    {
      id: 2,
      title: "Your Gentle Kindness",
      icon: "🌸",
      color: "#F4EFEA",
      description: "The genuine warmth and care you show to everyone around you, without even trying."
    },
    {
      id: 3,
      title: "Your Cute Little Habits",
      icon: "🧸",
      color: "#EAEFE5",
      description: "The adorable way you talk when you're excited and all those tiny expressions only you have."
    },
    {
      id: 4,
      title: "Your Sense of Humor",
      icon: "🎈",
      color: "#F7F2E7",
      description: "How you can make me laugh uncontrollably even on the most ordinary or tiring days."
    },
    {
      id: 5,
      title: "Making Ordinary Days Special",
      icon: "🎀",
      color: "#F0ECF4",
      description: "Even doing nothing together feels like the absolute best way to spend an entire day."
    },
    {
      id: 6,
      title: "Simply Being You",
      icon: "💖",
      color: "#F6ECE8",
      description: "Because there is no one else in the entire world like you, and you are perfect just as you are."
    }
  ],

  // 🤗 Screen 9: Virtual Hug Message
  virtualHugTitle: "Virtual hug for ya!",
  virtualHugButtonText: "CLICK FOR A HUG ❤️",
  virtualHugSentMessage: "Sending you the biggest, warmest, coziest virtual hug ever! 🤗💖",
  virtualHugMissYou: "I MISS YOU SO MUCH ❤️",

  // 💖 Screen 10: Heart Photo Collage
  collageHeading: "Will you be my birthday favorite? ❤️",
  collagePhotos: [
    "assets/images/photo1.svg",
    "assets/images/photo2.svg",
    "assets/images/photo3.svg",
    "assets/images/photo4.svg",
    "assets/images/photo5.svg",
    "assets/images/photo6.svg"
  ],

  // ⏳ Screen 11: Our Story Timeline
  timelineHeading: "A few little moments...",
  timeline: [
    {
      date: "12.04.2024",
      title: "The Beginning",
      description: "The day a simple conversation turned into something so wonderfully special.",
      video: "assets/video1.mp4",
      image: "assets/images/story1.svg",
      icon: "🌱"
    },
    {
      date: "18.08.2024",
      title: "Our First Long Walk",
      description: "Talking for hours under the evening sky, wishing the time would simply freeze.",
      video: "assets/video2.mp4",
      image: "assets/images/story2.svg",
      icon: "✨"
    },
    {
      date: "25.12.2024",
      title: "Endless Memories",
      description: "Realizing that every shared laugh and quiet moment was becoming my favorite memory.",
      image: "assets/images/story3.svg",
      icon: "💖"
    },
    {
      date: "Today & Beyond",
      title: "Celebrating You",
      description: "Another beautiful year of you making the world a sweeter and brighter place!",
      image: "assets/images/profile.svg",
      icon: "🎂"
    }
  ],

  // 🎁 Screen 12: Final Secret Surprise
  finalTriggerButton: "ONE LAST THING... 🎁",
  finalHeading: "HAPPY BIRTHDAY, CUTIE! ❤️",
  finalSubheading: "I hope this little surprise made you smile as big as you make me smile.",
  finalMessage: "No matter how far apart or busy life gets, you will always have a very special place in my heart. Today is all about celebrating the wonderful human you are. Enjoy every single second of your special day! 🎉🎂✨",
  finalSignOff: "With endless love and warm hugs, forever ❤️",

  // Grand Finale: Typewriter text lines (edit these to change what appears at the end!)
  finaleLines: [
    "Yeh Aasmaan khila khila hai , Shaayd woh kahin muskura rahi hai",
    "Yeh Mausam Mein Jo Nami Haina Uski Maayusi Dikha Rahi Hai",
    "Sangeet Tha Mera Eklauta Pyaar Bas Iss Raste Pe Yeh Kaisa Mood Aaya .",
    "Main Abhi Nadaan Sa Aashiq Woh Muhje Ishq Karna Sikha Rahi Hai ♡",
    "Tum sach mein mere liye bahut special ho.Happy Birthday Sheetal .",
    "Khush raho, hasste  raho, aur hamesha mere dil ke sabse kareeb rahoge.",
    "I love you more than words can ever explain."
  ]
};

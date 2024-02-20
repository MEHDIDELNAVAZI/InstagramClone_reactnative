import Users from "./users";
export default [
  {
    image: "https://picsum.photos/id/8/1000/800",
    user: Users[0].username,
    title: "Amazing Landscape",
    caption:
      "Check out this breathtaking view I stumbled upon during my hike! #nature #adventure",
    profile_img: Users[0].image,
    likes: "534",
    comments: [
      {
        user: Users[1].username,
        comment:
          "Wow, that looks incredible! I wish I could be there right now.",
      },
      {
        user: Users[3].username,
        comment: "Absolutely stunning! Nature never fails to amaze me.",
      },
    ],
  },
  {
    image: "https://picsum.photos/id/66/1000/800",
    user: Users[1].username,
    title: "Fun Times with Friends",
    caption:
      "Had a blast with my friends at the beach yesterday! #friends #sunshine",
    profile_img: Users[1].image,
    likes: "744",
    comments: [
      {
        user: Users[2].username,
        comment: "Looks like you guys had a great time!",
      },
    ],
  },
  // Add more posts here
  {
    image: "https://picsum.photos/id/1024/1000/800",
    user: Users[2].username,
    title: "Exploring the City",
    caption:
      "Roaming the streets of the city, discovering hidden gems around every corner. #citylife #exploration",
    profile_img: Users[2].image,
    likes: "320",
    comments: [
      {
        user: Users[0].username,
        comment: "Love this city! So much to see and do.",
      },
      {
        user: Users[4].username,
        comment: "Which city is this? Looks amazing!",
      },
    ],
  },
  {
    image: "https://picsum.photos/id/1035/1000/800",
    user: Users[3].username,
    title: "Cozy Evening",
    caption:
      "Nothing beats a cozy evening at home with a good book and a warm cup of tea. #relaxation #metime",
    profile_img: Users[3].image,
    likes: "210",
    comments: [
      {
        user: Users[5].username,
        comment: "Sounds perfect! What book are you reading?",
      },
    ],
  },
  // Add more posts here
  // Continue adding posts for other users
];

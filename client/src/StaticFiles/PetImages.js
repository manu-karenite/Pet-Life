const object = {
  Cats: [
    "https://res.cloudinary.com/techbuy/image/upload/v1648820182/cat-g930f542fa_1920_s8z7j2.jpg",
    "https://res.cloudinary.com/techbuy/image/upload/v1648820181/cat-g3cbc0b4bb_1920_csltyx.jpg",
    "https://res.cloudinary.com/techbuy/image/upload/v1648820176/cat-g98026c007_1920_vw5sp4.jpg",
    "https://res.cloudinary.com/techbuy/image/upload/v1648820176/cat-g15f49b624_1920_vdd7ua.jpg",
    "https://res.cloudinary.com/techbuy/image/upload/v1648820175/cat-g9ff46c1b5_1920_bdlbr0.jpg",
  ],
  Dogs: [
    "https://res.cloudinary.com/techbuy/image/upload/v1648820081/dog-gb5ecf4839_1920_gz3wio.jpg",
    "https://res.cloudinary.com/techbuy/image/upload/v1648820071/puppy-g6d7fa9e90_1920_riluqi.jpg",
    "https://res.cloudinary.com/techbuy/image/upload/v1648819991/dog-g3c21b7886_1920_nliyan.jpg",
    "https://res.cloudinary.com/techbuy/image/upload/v1648819991/puppy-g7dc61665a_1920_aikwax.jpg",
    "https://res.cloudinary.com/techbuy/image/upload/v1648819991/dog-g8f4a7d739_1920_g1lh9e.jpg",
  ],
  Birds: [
    "https://res.cloudinary.com/techbuy/image/upload/v1648808980/bird_pkyyg5.png",
    "https://res.cloudinary.com/techbuy/image/upload/v1648820738/canary-gd0a4ce737_1920_qfnygf.jpg",
    "https://res.cloudinary.com/techbuy/image/upload/v1648820734/birds-gbbdf054c9_1920_juu1jw.jpg",
  ],
  Rabbits: [
    "https://res.cloudinary.com/techbuy/image/upload/v1648820318/rabbit-g7a642bf93_1920_toaphj.jpg",
    "https://res.cloudinary.com/techbuy/image/upload/v1648820305/rabbit-g504967374_1920_prcc0e.jpg",
    "https://res.cloudinary.com/techbuy/image/upload/v1648820304/rabbits-g849ef7734_1920_fqtynk.jpg",
    "https://res.cloudinary.com/techbuy/image/upload/v1648820304/rabbits-gd79288cbc_1920_ncmkmx.jpg",
    "https://res.cloudinary.com/techbuy/image/upload/v1648820304/rabbit-g14063549f_1920_bhwps1.jpg",
  ],
  Fishes: [
    "https://res.cloudinary.com/techbuy/image/upload/v1648820740/fish-g7c010552a_1920_kwic5m.jpg",
    "https://res.cloudinary.com/techbuy/image/upload/v1648820734/goldfish-g42174f3e6_1920_tosjgy.jpg",
    "https://res.cloudinary.com/techbuy/image/upload/v1648820733/fish-gc5b147629_1920_stjadk.jpg",
  ],
};

const getAnImage = (category) => {
  const arr = object[category];
  //   we have got the array, generate a random number from 0 to length-1
  //   min->0
  //   max=length-1
  let min = 0;
  let max = arr.length - 1;

  const random = Math.trunc(Math.random() * (max - min) + min);
  return arr[random];
};
const toReturn = { getAnImage };
module.exports = toReturn;

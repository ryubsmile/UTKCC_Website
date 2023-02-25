const PRESIDENT_MAIL_22_23 = 'jamie.shin@mail.utoronto.ca';
const VICE_PRESIDENT_MAIL_22_23 = 'chae.kang@mail.utoronto.ca';
const SPONSER_DIRECTOR_MAIL_22_23 = 'seohyun.kang@mail.utoronto.ca';

const home_sponser_photo_left = [
  '/img/home/sponser/jjin1.jpg',
  '/img/home/sponser/kkar1.jpg',
  '/img/home/sponser/lash1.jpg',
  '/img/home/sponser/maple1.jpg',
  '/img/home/sponser/sinjeon1.jpg',
  '/img/home/sponser/wooriart1.jpg',
];

const home_sponser_photo_right = [
  '/img/home/sponser/jjin2.jpg',
  '/img/home/sponser/kkar2.jpg',
  '/img/home/sponser/lash2.jpg',
  '/img/home/sponser/maple2.jpg',
  '/img/home/sponser/sinjeon2.jpg',
  '/img/home/sponser/wooriart2.jpg',
];

let sponser_photo_index = 0;

window.onload = () => {
  updateFooterMailAddress(
    PRESIDENT_MAIL_22_23,
    VICE_PRESIDENT_MAIL_22_23,
    SPONSER_DIRECTOR_MAIL_22_23
  );

  // updateAnchorRel();
  setInterval(() => {
    console.log(sponser_photo_index);
    // update slide index
    sponser_photo_index++;
    if (sponser_photo_index > 5) sponser_photo_index = 0;

    // execute function
    updateSponserPhoto(sponser_photo_index);
  }, 5000);
};

/**
 * Not Yet Implemented.
 * @param {String} pageName the name of the page to be implemented.
 */
function navToPage(pageName) {
  console.log(`NAVIGATION TO ${pageName} TO BE IMPLEMENTED`);
}

/**
 * updates the footer mail address tag of given <id> have the link as its href attribute.
 * precondition: the query is anchor, i.e. has an href attr.
 */
function updateMailAddress(id, email) {
  const anchor = document.getElementById(id);
  anchor.textContent = email;
  anchor.href = 'mailto:' + email;
}

const updateFooterMailAddress = (
  president,
  vice_president,
  sponser_director
) => {
  updateMailAddress('president', president);
  updateMailAddress('vice_president', vice_president);
  updateMailAddress('sponser_director', sponser_director);
};

function updateAnchorRel() {
  const anchors = document.querySelectorAll('a');
  for (const anchor in anchors) {
    anchor.rel = 'noopener noreferrer';
  }
}

function updateSponserPhoto(index) {
  const imgList = document.querySelectorAll('.sponser-photos');

  // old image: hide
  // new image: change src, reveal

  if (!(index % 2)) {
    // even index: even is old,
    updateAnimationName(imgList[0], 'img-hide');
    updateAnimationName(imgList[2], 'img-hide');

    imgList[1].src = home_sponser_photo_left[index];
    imgList[3].src = home_sponser_photo_right[index];

    updateAnimationName(imgList[1], 'img-reveal');
    updateAnimationName(imgList[3], 'img-reveal');
  } else {
    // odd index: odd is old
    updateAnimationName(imgList[1], 'img-hide');
    updateAnimationName(imgList[3], 'img-hide');

    imgList[0].src = home_sponser_photo_left[index];
    imgList[2].src = home_sponser_photo_right[index];

    updateAnimationName(imgList[0], 'img-reveal');
    updateAnimationName(imgList[2], 'img-reveal');
  }
}

const updateAnimationName = (element, animationName) => {
  element.style.animationName = '';
  element.style.animationName = animationName;
};

// the scroll function that is triggered
// when about-us button is pressed.
function scrollToAboutUs() {
  aboutUs = document.getElementById('about-us-scroll-point');
  aboutUs.scrollIntoView({ behavior: 'smooth' });
}

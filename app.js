/* --- constants --- */
const PRESIDENT_MAIL_23_24 = 'seohyun.kang@mail.utoronto.ca';
const VICE_PRESIDENT_MAIL_23_24 = 'suye.han@mail.utoronto.ca';
const ER_DIRECTOR_MAIL_23_24 = 'yujin.shim@mail.utoronto.ca';

const home_sponsor_photo_left = [
  '/img/home/sponsor/jjin1.jpg',
  '/img/home/sponsor/kkar1.jpg',
  '/img/home/sponsor/lash1.jpg',
  '/img/home/sponsor/maple1.jpg',
  '/img/home/sponsor/sinjeon1.jpg',
  '/img/home/sponsor/wooriart1.jpg',
];

const home_sponsor_photo_right = [
  '/img/home/sponsor/jjin2.jpg',
  '/img/home/sponsor/kkar2.jpg',
  '/img/home/sponsor/lash2.jpg',
  '/img/home/sponsor/maple2.jpg',
  '/img/home/sponsor/sinjeon2.jpg',
  '/img/home/sponsor/wooriart2.jpg',
];

/* --- end of constants ---*/

window.onload = () => {
  updateFooterMailAddress(
    PRESIDENT_MAIL_23_24,
    VICE_PRESIDENT_MAIL_23_24,
    ER_DIRECTOR_MAIL_23_24
  );
  repeatUpdateSponsor();
  displayEvents('social');
  displayEvents('professional');
  displayEvents('academic');
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
 * @param {String} president - the email address string of current president
 * @param {String} vice_president - that of current vice_president
 * @param {String} er_director - that of current ER director
 */
function updateFooterMailAddress(president, vice_president, er_director) {
  updateMailAddress('president', president);
  updateMailAddress('vice_president', vice_president);
  updateMailAddress('sponsor_director', er_director);
}

const updateMailAddress = (id, email) => {
  const anchor = document.getElementById(id);
  anchor.textContent = email;
  anchor.href = 'mailto:' + email;
};

const updateAnchorRel = () => {
  const anchors = document.querySelectorAll('a');
  for (const anchor in anchors) {
    anchor.rel = 'noopener noreferrer';
  }
};

let sponsor_photo_index = 0;

/**
 * Repetitively updates sponsor images in the main page.
 * Update `home_sponsor_photo_left`and `home_sponsor_photo_right` for changing images.
 */
function repeatUpdateSponsor() {
  setInterval(() => {
    console.log(sponsor_photo_index);
    // update slide index
    sponsor_photo_index++;
    if (sponsor_photo_index > 5) sponsor_photo_index = 0;

    // execute function
    updateSponsorPhoto(sponsor_photo_index);
  }, 5000);
}

const updateSponsorPhoto = index => {
  const imgList = document.querySelectorAll('img.sponsor-photos');
  if (!imgList || !imgList[0]?.src) return;

  // old image: hide
  // new image: change src, reveal

  if (!(index % 2)) {
    // even index: even is old,
    updateAnimationName(imgList[0], 'img-hide');
    updateAnimationName(imgList[2], 'img-hide');

    imgList[1].src = home_sponsor_photo_left[index];
    imgList[3].src = home_sponsor_photo_right[index];

    updateAnimationName(imgList[1], 'img-reveal');
    updateAnimationName(imgList[3], 'img-reveal');
  } else {
    // odd index: odd is old
    updateAnimationName(imgList[1], 'img-hide');
    updateAnimationName(imgList[3], 'img-hide');

    imgList[0].src = home_sponsor_photo_left[index];
    imgList[2].src = home_sponsor_photo_right[index];

    updateAnimationName(imgList[0], 'img-reveal');
    updateAnimationName(imgList[2], 'img-reveal');
  }
};

const updateAnimationName = (element, animationName) => {
  if (!element) return;

  element.style.animationName = '';
  element.style.animationName = animationName;
};

/**
 * Using `makeEventDiv(eventDict)`, construct event items based on social-events.json and update the DOM.
 * @param {String} eventId is one of social, professional, academic
 */
function displayEvents(eventId) {
  const targetElement = document.getElementById(eventId);
  if (!targetElement) return;

  // Gets data from {eventId}-events.json
  fetch(`./events/${eventId}-events.json`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      targetElement.append(
        ...data.Events.slice(1).map(eventDict => makeEventDiv(eventDict))
      );
    });
}

/**
 * Make an HTML element that contains info about a single event
 * ```{HTML}
 * <div> <!-- this is eventWrapperDiv -->
 *   <img src={eventDict.image}/>
 *   <div> <!-- this is miniDiv -->
 *     <h2>{eventDict.name}</h2> <!-- this is name -->
 *     <p>{eventDict.explanation}</p> <!-- this is exp -->
 *   </div>
 * </div>
 * ```
 *
 * Preconditions:
 *  @param {Object} eventDict is a valid event dictionary with three string key-value pairs: name, explanation, image. Refer to social-events.json for more details.
 */
const makeEventDiv = eventDict => {
  if (!eventDict) throw MediaError;

  // create img element
  const image = document.createElement('img');
  image.src = eventDict.image;

  // create h2 element
  const name = document.createElement('h2');
  name.append(eventDict.name);

  // create p element
  const exp = document.createElement('p');
  exp.innerHTML = eventDict.explanation;

  // create h2 + p wrapper div element, append.
  const miniDiv = document.createElement('div');
  miniDiv.append(name, exp);

  // create parent div element
  const eventWrapperDiv = document.createElement('div');
  eventWrapperDiv.append(image, miniDiv);

  return eventWrapperDiv;
};

// the scroll function that is triggered
// when about-us button is pressed.
function scrollToAboutUs() {
  aboutUs = document.getElementById('about-us-scroll-point');
  aboutUs.scrollIntoView({ behavior: 'smooth' });
}

var noOfRows;
const shapeContainer = document.querySelectorAll(".overlayContainer");
const moreBtn = document.getElementById("moreBtn");
const lessBtn = document.getElementById("lessBtn");

// when window loads, calculate and draw the polygon grid
window.addEventListener('load', drawPolygonGrid);
// when window resizes, calculate and draw the polygon grid
window.addEventListener('resize', drawPolygonGrid);
// animate education and skills elements on scroll
window.addEventListener('scroll', animateAbout);
// animate main projects on scroll
window.addEventListener('scroll', animateMainProjects);
// show more other projects button
moreBtn.addEventListener('click', showMoreProjects);
// show less other projects button
lessBtn.addEventListener('click', showLessProjects);
// animate intro text on hover
animateTextHover();
// animate github and linkedin icons on hover
animateIconsHover();
// add main project images
addMainProjectImages();
// add other projects
addOtherProjects();

// change the number of polygon rows in the grid
function drawPolygonGrid() {
    var widthOfGrid;
    
    shapeContainer.forEach((container) => {
        // calculate width of grid container
        widthOfGrid = container.getBoundingClientRect().right-container.getBoundingClientRect().left;

        // remove all row divs (existing polygon grid)
        for (var i = 0; i < noOfRows; i++) {
            container.innerHTML = "";
        }
    })
    
    // calculate the number of rows needed
    noOfRows = Math.floor(widthOfGrid/37);
    
    // add polygon row div
    addPolygonDiv();
    
    // add svgs in row divs child div
    addPolygonSvg();
    
    // animate polygon shapes on hover
    animatePolygonHover();
}

// animate intro text on hover
function animateTextHover() {
    const introText = document.getElementsByClassName("intro");
    for(var i = 0; i < introText.length; i++) {
        introText[i].childNodes.forEach((letter) => {

            // start animation when mouse over
            letter.addEventListener("mouseover", function (e) {
                letter.classList.add("animate__animated");
                letter.classList.add("animate__bounceIn");
            });

            // make font size larger when animation starts
            letter.addEventListener("animationstart", function(o) {
                var originalFontSize = Number(window.getComputedStyle(letter).fontSize.match(/\d+/)[0]);
                letter.style.fontSize = originalFontSize * 1.25 + "px";
            });

            // animation end
            letter.addEventListener("animationend", function (e) {
                var originalFontSize = Number(window.getComputedStyle(letter).fontSize.match(/\d+/)[0]);
                letter.classList.remove("animate__animated");
                letter.classList.remove("animate__bounceIn");

                // make font size back to original when animation ends
                letter.style.fontSize = originalFontSize / 1.25 + "px";
            });
        });
    }
}

// add polygon row div
function addPolygonDiv() {
    const shapeRow = `<div class="d-flex flex-row overlayRow">
                        <div class="drawShape"></div>
                    </div>`;
    shapeContainer.forEach((container) => {
        // create polygon row as per the umber of rows calculated previously 
        // (based on window width)
        for (var i = 0; i < noOfRows; i++) {
            container.innerHTML += shapeRow;
        }
    });
}

// add svgs in row's child div (drawShape)
function addPolygonSvg() {
    // get inner div (drawShape) of the row div previously created
    const drawShape = document.querySelectorAll(".drawShape");
    // add svg within the div
    drawShape.forEach((shape, index) => {
        // index/2 is used to created triangle grid
        for (var j = 0; j < index/2; j++) {
            shape.innerHTML +=
            `
                <svg id="shape-${index}-${j}" version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                width="50px" height="50px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
                    <polygon fill="none" stroke="rgba(95, 158, 160, 0.3)" stroke-width="1" stroke-miterlimit="10" points="16.675,59 1.351,32 16.675,5 47.325,5 62.649,32 47.325,59"/>
                </svg>
            `;
        }
    });
}

// animate polygon shapes on hover
function animatePolygonHover() {
    for (var i = 0; i < noOfRows; i++) {
        for (var j = 0; j < i/2; j++) {
            const polyShape = document.getElementById(`shape-${i}-${j}`);
            polyShape.addEventListener("mouseover", function (e) {
                // remove blink class (from previous blink)
                polyShape.classList.remove("blink");
                // add hover style and bounceIn animation
                polyShape.classList.add("polyHoverAnimate");
                polyShape.classList.add("animate__animated");
                polyShape.classList.add("animate__bounceIn");
            });

            polyShape.addEventListener("animationend", function (e) {
                // add blink class when animation ends
                polyShape.classList.add("blink");
                // remove hover style and bounceIn animation
                polyShape.classList.remove("polyHoverAnimate");
                polyShape.classList.remove("animate__animated");
                polyShape.classList.remove("animate__bounceIn");
            });
        }
    }
}

// animate github and linkedin icons on hover
function animateIconsHover() {
    const animateIcon = document.querySelectorAll(".animateIcon");
    animateIcon.forEach((icon) => {
        // moouse hovered, add bounceIn animation
        icon.addEventListener("mouseover", function (e) {
            icon.classList.add("animate__bounceIn");
        });

        // animation end, remove bounceIn animation
        icon.addEventListener("animationend", function (e) {
            icon.classList.remove("animate__bounceIn");
        });
    });
}

// animate education and skills elements on scroll
function animateAbout() {
    const aboutDes = document.querySelectorAll(".about");
    const edu_skills = document.querySelectorAll(".edu_skills");
    const edu = document.querySelectorAll(".education");
    const skills = document.querySelectorAll(".skills");
    
    const triggerBottom = window.innerHeight*(4/5);
    const aboutRow = aboutDes[0].getBoundingClientRect().top;
    const EduSkillsRow = edu_skills[0].getBoundingClientRect().top;
    
    // about row active
    if(aboutRow < triggerBottom) {
        aboutDes[0].classList.remove("animate__fadeOut");
        aboutDes[0].classList.add("animate__animated");
        aboutDes[0].classList.add("animate__fadeIn");
    }
    else {
        aboutDes[0].classList.remove("animate__fadeIn");
        aboutDes[0].classList.add("animate__fadeOut");
    }
    
    // edu skills row active
    if(EduSkillsRow < triggerBottom) {
        // slide out education (left)
        edu[0].classList.remove("animate__slideOutLeft");
        edu[0].classList.add("animate__animated");
        edu[0].classList.add("animate__slideInLeft");
        
        // slide in skills (right)
        skills[0].classList.remove("animate__slideOutRight");
        skills[0].classList.add("animate__animated");
        skills[0].classList.add("animate__slideInRight");
    }
    else {
        // slide out education (left)
        edu[0].classList.remove("animate__slideInLeft");
        edu[0].classList.add("animate__slideOutLeft");
        
        // slide out skills (right)
        skills[0].classList.remove("animate__slideInRight");
        skills[0].classList.add("animate__slideOutRight");
    }
}

// add main project images
function addMainProjectImages() {
    const carouselIndicators = document.querySelectorAll('.carousel-indicators');
    const carouselInner = document.querySelectorAll('.carousel-inner');
    // project images fil ename
    const project1_fileName = ["register", "login", "sideMenu", "sideMenu_dark", "editProfile", 
                               "colorPicker", "taskList", "taskGrid", "taskFilter", "deleteOne", 
                               "deleteMultiple", "addTask1", "addTask2", "addNewIcon", "canvas", 
                               "attachmentOptions", "search", "timer", "stopwatch"];
    const project2_fileName = ["register", "login", "logout", "home1", "home2",
                               "profile", "friendlist", "editProfile", "search", "otherUser",
                               "sendFriendRequest", "cancelFriendRequest", "recieveFriendRequest","acceptFriendRequest", "acceptFriendRequest_after", 
                               "declineFriendRequest", "unfriend_dropdown", "unfriend", "chatroom", "chatroom_2acc", 
                               "api/createUserApi", "api/userAccountListApi", "api/userAccountDetailApi", "api/createPostApi", "api/userPostApi",
                               "api/friendDetailApi", "api/friendRequestApi", "api/chatListApi"];
    const project3_fileName = ["home_light", "category_light", "search_light", "search2_light",
                               "home_dark", "category_dark", "search_dark", "search2_dark"];
    // project images file path
    const project1_fileTitle = ["Register screen", "Login screen", "Side Menu", "Side Menu - Dark mode", "Edit Profile screen",
                                "Color Picker", "Task screen - List view", "Task screen - Grid view", "Task Filter Modal", "Delete One Task",
                               "Delete Multiple Task", "Add Task screen - 1", "Add Task screen - 2", "Add New Icon Modal", "Canvas",
                               "Attachment Options" , "Search screen", "Timer", "Stopwatch"];
    const project2_fileTitle = ["Register screen", "Login screen", "Logout screen", "Home screen - 1", "Home screen - 2",
                                "Profile sccreen", "Friend List", "Edit Profile", "Search screen", "Other user's account",
                                "Send Friend Request", "Cancel Friend Request", "Recieve Friend Request", "Accept Friend Request", "Accept Friend Request - After",
                                "Decline Friend Request", "Unfriend - Dropdown Option", "Unfriend", "Chatroom", "Chatroom - 2 accounts",
                                "Api - Create User", "Api - User Account List", "Api - User Account Detail", "Api - Creat Post", "Api - User Post",
                                "Api - Friend Detail", "Api - Friend Request", "Api - Chat List"];
    const project3_fileTitle = ["Home screen - light", "Category screen - light",
                                "Search screen 1 - light", "Search screen 2 - light",
                                "Home screen - dark", "Category screen - dark", 
                                "Search screen 1 - dark", "Search screen 2 - dark"];

    carouselInner.forEach((container, index) => {
        var fileName;
        var imgPath;
        var fileTitle;
        var classStyle;

        // first project
        if (index == 0) {
            imgPath = "taskManager_ss";
            fileName = project1_fileName;
            fileTitle = project1_fileTitle;
            classStyle = "extraScreen";
        }
        // second project
        else if (index == 1) {
            imgPath = "facebookClone_ss";
            fileName = project2_fileName;
            fileTitle = project2_fileTitle;
            classStyle = "img-fluid";
        }
        // third project
        else if (index == 2) {
            imgPath = "newsApp_ss";
            fileName = project3_fileName;
            fileTitle = project3_fileTitle;
            classStyle = "extraScreen";
        }

        // add images according to the number of images for the project
        for(var i = 0; i < fileName.length; i++) {
            var inner;

            // if is the first slide, add an active class
            if (i == 0) {
                inner = `<div class="carousel-item active">
                            <p class="modalScreenText text-center">${fileTitle[i]}</p>
                            <div class="d-flex justify-content-center">
                                <img src="resources/${imgPath}/${fileName[i]}.png" class="${classStyle}"/>
                            </div>
                        </div>`;
            }
            else {
                inner = `<div class="carousel-item">
                            <p class="modalScreenText text-center">${fileTitle[i]}</p>
                            <div class="d-flex justify-content-center">
                                <img src="resources/${imgPath}/${fileName[i]}.png" class="${classStyle}"/>
                            </div>
                        </div>`;
            }

            carouselInner[index].innerHTML += inner;
        }
    });

    carouselIndicators.forEach((container, index) => {
        var project;
        var noOfIndicators;


        // first project
        if (index == 0) {
            project = "project1";
            noOfIndicators = 19;
        }
        // second project
        else if (index == 1) {
            project = "project2";
            noOfIndicators = 28;
        }
        // third project
        else if (index == 2) {
            project = "project3";
            noOfIndicators = 8;
        }

        // add indicator buttons according to number of images for the project
        for(var i = 0; i < noOfIndicators; i++) {
            var indicator;
            var inner;

            // if is the first slide, add an active class
            if (i == 0) {
                indicator = `<button type="button" data-bs-target="#carousel_${project}" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>`;
            }
            else {
                indicator = `<button type="button" data-bs-target="#carousel_${project}" data-bs-slide-to="${i}" aria-label="Slide ${i+1}"></button>`;
            }

            carouselIndicators[index].innerHTML += indicator;
        }
    })
}

// animate sections on scroll
function animateMainProjects() {
    const mainProjects = document.querySelectorAll(".mainProj");
    const triggerBottom = window.innerHeight*(4/5);
    
    mainProjects.forEach((project, index) => {
        const boxTop = project.getBoundingClientRect().top;
        
        const leftComponent = document.querySelectorAll(".leftComponent")[index];
        const rightComponent = document.querySelectorAll(".rightComponent")[index];
        
        if(boxTop < triggerBottom) {
            // slide out component (left)
            leftComponent.classList.remove("animate__slideOutLeft");
            leftComponent.classList.add("animate__animated");
            leftComponent.classList.add("animate__slideInLeft");

            // slide in component (right)
            rightComponent.classList.remove("animate__slideOutDown");
            rightComponent.classList.add("animate__animated");
            rightComponent.classList.add("animate__slideInUp");
        }
        else {
            // slide out component (left)
            leftComponent.classList.remove("animate__slideInLeft");
            leftComponent.classList.add("animate__slideOutLeft");

            // slide out component (right)
            rightComponent.classList.remove("animate__slideInUp");
            rightComponent.classList.add("animate__slideOutDown");
        }
    });
}

// add other projects
function addOtherProjects() {
    const otherProjContainer = document.getElementById("otherProjContainer");

    const otherProjectImg = ["lungCancerPredictor", "obstacleRunner", 
                             "fruitJungle", "bookstoreCRUD", 
                             "bioWebApp", "calculator", 
                             "webcamPiano", "instagramFilter", 
                             "averageFace", "sineGame",
                             "angryBird", "asteroid",
                             "noisyGrid", "smartHome",
                             "djApp", "tradingBot",
                             "fitogram", "covid",
                             "drawingApp", "coinCollector",
                             "news", "themePark"
                            ];
    
    const otherProjectTitle = ["Cancer Predictor", "Obstacle Runner", 
                               "Fruit Jungle", "Bookstore CRUD App", 
                               "Bio Web App", "Calculator", 
                               "Webcam Piano", "Instagram Filter", 
                               "Average Face", "3D Sine Game",
                               "Angry Bird Clone", "Asteroid Game Clone",
                               "Noisy Grid", "Smart Home Web App",
                               "DJ App" ,"Trading Bot",
                               "Fitogram", "Covid19 Research",
                               "Drawing App", "Coin Collector",
                               "News Website", "Theme Park Website"
                              ];
    
    const otherProjectDescription = 
          [
              "This data science project involves building a regression model for predicting lung cancer with Python, using Jupyter Notebook.", 
              "This is a simple game done with Unity and C#. It involves a user-controlled character, that aims to pass through all obstacles to reach the finishing line.", 
              "This is a simple game done with Unity and C#. It involves a user-controlled character, that collects a stated number of fruits to finish the game.",
              "This is a CRUD bookstore web application done with Javascript and Node.js. It allows querying of the bookstore data such as books, authors, publishers etc.", 
              "This is a RESTFUL API application done with Python and Django, that contains gene data from the csv file, to allow researchers to query data from the database as and when they need. ",
              "A calculator, with basic logic implemented, done with React Native.", 
              "This is a mini project done with P5.js, which plays sound according to the position of where the movement is detected.",
              "This is a mini project done with P5.js, which filters the image via in-built filters.", 
              "This is a mini project done with P5.js. Pixels from the image are loaded, calculated, and lerp through to transition between the average face and selected image.",
              "This is a mini project done with P5.js, which uses sin to translate each box to their correct position. Lerp is used for smooth colour change of the boxes. Sliders are used to allow confetti count, box height and camera speed adjustment.",
              "This is a mini project done with P5.js, which uses several user controls to knock the boxes out of the frame.",
              "This is a mini project done with P5.js, which uses several controls to knock down all asteroids, while making sure the spaceship is not in contact with the earth.",
              "Noisy grid uses noise and mouseX position to map the colour change, as well as the compass needles' angle of rotation.",
              "SmartHome is an dynamic web application that allows users to interact with the dashboard and connect with their devices at home.",
              "In this project, I developed on a DJ application. Several playback functions have been implemented, allowing users to have more control over the audio.",
              "This is a trading advisor bot created with C++ to guide users through their trading process.",
              "The project aims to improve and promote a healthy lifestyle to the users. The main advantage of this app is that it lets users chat real-time with nutritionists and fitness instructors, might they have had any queries.",
              "A research on Covid-19, vaccines, efficacy etc..",
              "A drawing App done with p5.js.",
              "A simple coin collecting game using Javascript and P5.js library.",
              "This is a responsive news website is done with HTML, CSS and Javascript, along with Mustache templating system for the content of the website.",
              "In this module, we (group of 5) were tasked to develop a simple theme park website with HTML, CSS and Javascript.",
            ];
    
    const githubLink = 
          [
              "https://github.com/wanqian99/Lung-Cancer-Predictor-Model", 
              "https://github.com/wanqian99/Obstacle-Runner-Game", 
              "https://github.com/wanqian99/Fruit-Jungle",
              "https://github.com/wanqian99/Bookstore-CRUD-App",
              "https://github.com/wanqian99/Bio-Web-Application",
              "https://github.com/wanqian99/Mobile-Development-Midterm/tree/main/Creating_A_Calculator",
              "https://github.com/wanqian99/Webcam-Piano",
              "https://github.com/wanqian99/Instagram-Filter",
              "https://github.com/wanqian99/Average-Face",
              "https://github.com/wanqian99/3D-Sine-Game",
              "https://github.com/wanqian99/Graphics-Programming-Midterm/tree/main/angryBirdClone",
              "https://github.com/wanqian99/Graphics-Programming-Midterm/tree/main/asteroidGameClone",
              "https://github.com/wanqian99/Graphics-Programming-Midterm/tree/main/noisyGrid",
              "https://github.com/wanqian99/Smart-Home-Web-Application",
              "https://github.com/wanqian99/DJ-App",
              "https://github.com/wanqian99/Trading-Bot",
              "https://github.com/wanqian99/Fitogram-Project",
              "https://github.com/wanqian99/Covid19-Research",
              "https://github.com/wanqian99/Drawing-App",
              "https://github.com/wanqian99/Coin-Collector-Game",
              "https://github.com/wanqian99/News-Website",
              "https://github.com/wanqian99/Theme-Park-Website",
          ];
    
    for(var i = 0; i < otherProjectImg.length; i++) {
        // show 6 box by default
        if(i < 6) {
            otherProjContainer.innerHTML += 
                `<div class="box m-3">
                    <div class="imgBx">
                       <img src="resources/otherProj/${otherProjectImg[i]}.png">
                    </div>
                    <div class="content">
                        <div class="otherProjBox">
                            <div class="d-flex flex-row justify-content-between mb-2">
                                <!-- Project Title -->
                                <p class="my-auto otherProjTitle">
                                    ${otherProjectTitle[i]}
                                </p>
                                <div class="my-auto justify-content-center justify-content-sm-start text-sm-end">
                                    <!-- GitHub Icon -->
                                    <a href="${githubLink[i]}" target="_blank" aria-label="Github" class="animateIcon">
                                        <svg fill="#000000" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <g data-name="Layer 2">
                                                <rect width="24" height="24" opacity="0"/>
                                                <path d="M16.24 22a1 1 0 0 1-1-1v-2.6a2.15 2.15 0 0 0-.54-1.66 1 1 0 0 1 .61-1.67C17.75 14.78 20 14 20 9.77a4 4 0 0 0-.67-2.22 2.75 2.75 0 0 1-.41-2.06 3.71 3.71 0 0 0 0-1.41 7.65 7.65 0 0 0-2.09 1.09 1 1 0 0 1-.84.15 10.15 10.15 0 0 0-5.52 0 1 1 0 0 1-.84-.15 7.4 7.4 0 0 0-2.11-1.09 3.52 3.52 0 0 0 0 1.41 2.84 2.84 0 0 1-.43 2.08 4.07 4.07 0 0 0-.67 2.23c0 3.89 1.88 4.93 4.7 5.29a1 1 0 0 1 .82.66 1 1 0 0 1-.21 1 2.06 2.06 0 0 0-.55 1.56V21a1 1 0 0 1-2 0v-.57a6 6 0 0 1-5.27-2.09 3.9 3.9 0 0 0-1.16-.88 1 1 0 1 1 .5-1.94 4.93 4.93 0 0 1 2 1.36c1 1 2 1.88 3.9 1.52a3.89 3.89 0 0 1 .23-1.58c-2.06-.52-5-2-5-7a6 6 0 0 1 1-3.33.85.85 0 0 0 .13-.62 5.69 5.69 0 0 1 .33-3.21 1 1 0 0 1 .63-.57c.34-.1 1.56-.3 3.87 1.2a12.16 12.16 0 0 1 5.69 0c2.31-1.5 3.53-1.31 3.86-1.2a1 1 0 0 1 .63.57 5.71 5.71 0 0 1 .33 3.22.75.75 0 0 0 .11.57 6 6 0 0 1 1 3.34c0 5.07-2.92 6.54-5 7a4.28 4.28 0 0 1 .22 1.67V21a1 1 0 0 1-.94 1z"/>
                                            </g>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <!-- Project Description -->
                            <p class="otherProjDes">${otherProjectDescription[i]}</p>
                            <!-- Project Techs -->
                            <div class="my-auto otherProjTechList"></div>
                        </div>
                    </div>
                </div>`;
        }
        // hide the other boxes by default
        else {
            otherProjContainer.innerHTML += 
                `<div class="box m-3 d-none">
                    <div class="imgBx">
                       <img src="resources/otherProj/${otherProjectImg[i]}.png">
                    </div>
                    <div class="content">
                        <div class="otherProjBox">
                            <div class="d-flex flex-row justify-content-between mb-2">
                                <!-- Project Title -->
                                <p class="my-auto otherProjTitle">
                                    ${otherProjectTitle[i]}
                                </p>
                                <div class="my-auto justify-content-center justify-content-sm-start text-sm-end">
                                    <!-- GitHub Icon -->
                                    <a href="${githubLink[i]}" target="_blank" aria-label="Github" class="animateIcon">
                                        <svg fill="#000000" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <g data-name="Layer 2">
                                                <rect width="24" height="24" opacity="0"/>
                                                <path d="M16.24 22a1 1 0 0 1-1-1v-2.6a2.15 2.15 0 0 0-.54-1.66 1 1 0 0 1 .61-1.67C17.75 14.78 20 14 20 9.77a4 4 0 0 0-.67-2.22 2.75 2.75 0 0 1-.41-2.06 3.71 3.71 0 0 0 0-1.41 7.65 7.65 0 0 0-2.09 1.09 1 1 0 0 1-.84.15 10.15 10.15 0 0 0-5.52 0 1 1 0 0 1-.84-.15 7.4 7.4 0 0 0-2.11-1.09 3.52 3.52 0 0 0 0 1.41 2.84 2.84 0 0 1-.43 2.08 4.07 4.07 0 0 0-.67 2.23c0 3.89 1.88 4.93 4.7 5.29a1 1 0 0 1 .82.66 1 1 0 0 1-.21 1 2.06 2.06 0 0 0-.55 1.56V21a1 1 0 0 1-2 0v-.57a6 6 0 0 1-5.27-2.09 3.9 3.9 0 0 0-1.16-.88 1 1 0 1 1 .5-1.94 4.93 4.93 0 0 1 2 1.36c1 1 2 1.88 3.9 1.52a3.89 3.89 0 0 1 .23-1.58c-2.06-.52-5-2-5-7a6 6 0 0 1 1-3.33.85.85 0 0 0 .13-.62 5.69 5.69 0 0 1 .33-3.21 1 1 0 0 1 .63-.57c.34-.1 1.56-.3 3.87 1.2a12.16 12.16 0 0 1 5.69 0c2.31-1.5 3.53-1.31 3.86-1.2a1 1 0 0 1 .63.57 5.71 5.71 0 0 1 .33 3.22.75.75 0 0 0 .11.57 6 6 0 0 1 1 3.34c0 5.07-2.92 6.54-5 7a4.28 4.28 0 0 1 .22 1.67V21a1 1 0 0 1-.94 1z"/>
                                            </g>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <!-- Project Description -->
                            <p class="otherProjDes">${otherProjectDescription[i]}</p>
                            <!-- Project Techs -->
                            <div class="my-auto otherProjTechList"></div>
                        </div>
                    </div>
                </div>`;
        }
    }
    
    addOtherProjectTechs();
}

// add techs to other projects
function addOtherProjectTechs() {
    const allTechList = [["Python", "Regression Models", "Pandas", "MatPlotLib", "Seaborn"], 
                         ["Unity", "C#"], 
                         ["Unity", "C#"], 
                         ["Node.js", "MySQL", "Express.JS", "JavaScript", "HTML", "CSS", "EJS"],
                         ["Python", "Django", "RESTFUL API"],
                         ["React Native"],
                         ["JavaScript", "p5.js"],
                         ["JavaScript", "p5.js"],
                         ["JavaScript", "p5.js"],
                         ["JavaScript", "p5.js"],
                         ["JavaScript", "p5.js"],
                         ["JavaScript", "p5.js"],
                         ["JavaScript", "p5.js"],
                         ["Node.js", "MySQL", "Express.JS", "JavaScript", "HTML", "CSS", "EJS"],
                         ["C++", "Juce"],
                         ["C++"],
                         ["HTML", "CSS", "JavaScript", "Apache Cordova"],
                         ["Python", "Pandas", "Numpy", "Matplotlib", "BeautifulSoup4", "SQLite", "WebScraping"],
                         ["p5.js"],
                         ["p5.js"],
                         ["HTML", "CSS", "JavaScript"],
                         ["HTML", "CSS", "JavaScript"],
                        ];
    
    const otherProjTechList = document.querySelectorAll(".otherProjTechList");
    otherProjTechList.forEach((techList, index) => {
        for(var i = 0; i < allTechList[index].length; i++) {
            techList.innerHTML += `<span>${allTechList[index][i]}</span>`;
        }
    });
}

// show more other projects button
function showMoreProjects() {
    const boxes = document.querySelectorAll(".box");
    var boxNum;
    
    boxes.forEach((box, index) => {
        // get index of last shown box
        if(!box.classList.contains("d-none")) {
            boxNum = index;
        }
    });
    
    for(var i = boxNum+1; i < boxNum+7; i++) {
        // remove d-none to show 6 more boxes
        if(i <= boxes.length-1) {
            boxes[i].classList.remove("d-none");
            lessBtn.classList.remove("d-none");
        }
        // if i > boxes length, hide moreBtn, show lessBtn
        else {
            moreBtn.classList.add("d-none");
            lessBtn.classList.remove("d-none");
        }
    }
}

// show less other projects button
function showLessProjects() {
    const boxes = document.querySelectorAll(".box");
    
    boxes.forEach((box, index) => {
        if(!box.classList.contains("d-none")) {
            // show the 6 default boxes
            if(index > 5) {
                box.classList.add("d-none");
            }
        }
    });
    
    // show moreBtn, hide lessBtn
    moreBtn.classList.remove("d-none");
    lessBtn.classList.add("d-none");
}
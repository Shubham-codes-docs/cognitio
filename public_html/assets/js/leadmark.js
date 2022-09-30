//firebase config

const firebaseConfig = {
    apiKey: "AIzaSyAwTMvEui9p0X1V_qtHxIPvyuFTWz083VE",
    authDomain: "cognitio-2022.firebaseapp.com",
    projectId: "cognitio-2022",
    storageBucket: "cognitio-2022.appspot.com",
    messagingSenderId: "481340855725",
    appId: "1:481340855725:web:fb4b0f60059b484184fd24",
    measurementId: "G-WT928RYLD5"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

// smooth scroll
$(document).ready(function(){
    $(".navbar .nav-link").on('click', function(event) {

        if (this.hash !== "") {

            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function(){
                window.location.hash = hash;
            });
        } 
    });
});

// protfolio filters
$(window).on("load", function() {
    var t = $(".portfolio-container");
    t.isotope({
        filter: ".new",
        animationOptions: {
            duration: 750,
            easing: "linear",
            queue: !1
        }
    }), $(".filters a").click(function() {
        $(".filters .active").removeClass("active"), $(this).addClass("active");
        var i = $(this).attr("data-filter");
        return t.isotope({
            filter: i,
            animationOptions: {
                duration: 750,
                easing: "linear",
                queue: !1
            }
        }), !1
    })
})

//check if registration number is to disable payment

const regnTag = document.querySelector("input[name='register']");
const transId = document.querySelector("input[name='transId']");
regnTag.addEventListener('change',(e)=>{
    let regnValue = e.target.value;
    let regex = /^2020UGME/i;
    if(regex.test(regnValue))
    {
        transId.disabled = true;
    }
})

let submitBtn = document.querySelector(".submit");
submitBtn.addEventListener('click',async(e)=>{
    e.preventDefault();
   let sname = e.target.parentElement[name='name'].value;
   let regnNo = e.target.parentElement[name='register'].value;
   let email = e.target.parentElement[name='email'].value;
   let batch = e.target.parentElement[name='batch'].value;
   let transIdValue = transId.value;
   let number = e.target.parentElement[name='number'].value;
   let college = e.target.parentElement[name='college'].value;
   let branch = e.target.parentElement[name='branch'].value;
   if(sname===''||regnNo===''||email==''||number=='')
   {
      let p = document.createElement('p');
      p.textContent = "Incomplete Fields";
      p.style.color="red";
      e.target.parentElement.insertBefore(p,e.target.parentElement.firstChild);
      setTimeout(()=>{
        p.remove();
      },5000)
       return;
   }
   let events = Array.from(e.target.parentElement.querySelectorAll('input[name=check]:checked')).map(e=>e.defaultValue);
   let refUser = firebase.database().ref('registered_user');
   let newRefUser = refUser.push();
   newRefUser.set({
    name:sname,
    regnNo,
    email,
    batch,
    transId,
    college,
    branch,
    events

   })
})